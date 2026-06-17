# Refined Chat Architecture: Intent Router + LLM Conversation

## Overview

**Goal**: Use intent routing for navigation + LLM for conversation quality.

**Not** intent router OR LLM. Use **both**.

---

## Architecture Flow

```
User message
  ↓
classifyIntent() → keyword matching (deterministic)
  ↓
Route by intent:

┌─────────────────────────────────────┐
│ if intent == 'audit_request':       │
│   → Trigger audit flow directly     │
│   → No LLM call                      │
│   → Return: { nextAction: audit... }│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ else (casual_chat, socialsect_info, │
│       healthcare_marketing_q):      │
│                                     │
│   Send to OpenRouter:               │
│   - System prompt (Socialsect      │
│     guidelines + tone)              │
│   - Last 10 messages (history)      │
│   - Current user message            │
│                                     │
│   Get LLM response                  │
│   Return response                   │
└─────────────────────────────────────┘
```

---

## What Changes

### Before (Intent-Based + Canned Responses)

```javascript
if (intent === 'casual_chat') {
  return {
    response: 'Hey! How can I help you today?' // canned
  }
}

if (intent === 'socialsect_info') {
  return {
    response: getSocialsectResponse(message) // hardcoded lookup
  }
}
```

**Problem**: Messages like "I'm a dentist in Texas" → classified as casual_chat → canned response → weak UX

### After (Intent-Based + LLM Responses)

```javascript
if (intent === 'audit_request') {
  // Keep audit deterministic
  return { nextAction: 'audit_flow' }
}

// All other intents → LLM
const response = await generateConversationResponse(
  intent,
  message,
  conversationHistory, // last 10 messages
  systemPrompt
)
return { response }
```

**Benefit**: Same message → LLM sees context + Socialsect guidelines → thoughtful response

---

## System Prompt

Embedded in code. Covers:

- Who Socialsect is
- Services offered
- Tone (conversational, not salesy)
- Healthcare focus
- Lead qualification rules
- When to suggest audits/calls
- Example responses

```javascript
const SYSTEM_PROMPT = `
You are the AI assistant for Socialsect...
[See separate SYSTEM_PROMPT.md file for full text]
`
```

---

## Conversation History

**Maximum**: Last 10 messages (5 user + 5 assistant)

**Sent as**:
```json
{
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." },
    ...
  ]
}
```

**Stored where**: Client-side (sessionStorage or state) or server-side (Supabase)?

- **Client-side**: Faster, simpler, no DB calls
- **Server-side**: Persists across sessions, enables multi-device

**Recommendation**: Client-side for MVP (widget is ephemeral anyway)

---

## New Helper Function

**Location**: `lib/ai/conversation-generator.js`

**Function**: `generateConversationResponse()`

```javascript
export async function generateConversationResponse(
  intent,
  userMessage,
  conversationHistory = [],
  systemPrompt
) {
  // Build OpenRouter payload
  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory,
    { role: 'user', content: userMessage }
  ]

  // Call OpenRouter
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { ... },
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat-v3',
      messages,
      temperature: 0.7,
      max_tokens: 400
    })
  })

  // Extract and return
  return {
    success: true,
    response: data.choices[0].message.content
  }
}
```

---

## Modified Chat Handler

**File**: `lib/handlers/chat.js`

**Changes**:

1. Import `generateConversationResponse()` instead of `getSocialsectResponse()`
2. Keep intent classification unchanged
3. Keep audit_request deterministic
4. For all other intents: call LLM
5. Pass conversation history in payload

**Payload structure** (from frontend):

```json
{
  "message": "I'm a dentist in Texas",
  "conversationHistory": [
    { "role": "user", "content": "hey" },
    { "role": "assistant", "content": "Hi there!" },
    ...
  ]
}
```

---

## Frontend Changes

### 1. Track Conversation History

In `GrowthAuditorWidget.jsx` or state container:

```javascript
const [messages, setMessages] = useState([])

// When user sends message:
const handleSendMessage = async (userMessage) => {
  setMessages([...messages, { role: 'user', content: userMessage }])

  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      message: userMessage,
      conversationHistory: messages.slice(-10) // last 10
    })
  })

  const data = await response.json()
  setMessages([...messages, { role: 'assistant', content: data.response }])
}
```

### 2. Add Suggestion Chips

Always visible:

```jsx
<div className="suggestion-chips">
  <button onClick={() => handleSendMessage('Tell me about Socialsect and your services')}>
    Learn About Socialsect
  </button>
  <button onClick={() => handleAuditFlow()}>
    Audit My Business
  </button>
  <button onClick={() => focusInput()}>
    Ask a Question
  </button>
</div>
```

---

## Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Cold Start** | "Hey! How can I help?" | LLM generates contextual response |
| **Healthcare Context** | Lost after first msg | Carried through conversation |
| **Practice Owners** | Must phrase correctly | Natural language works |
| **Differentiation** | Socialsect knowledge hardcoded | System prompt guides LLM |
| **Flexibility** | Update = code change | Update = system prompt change |
| **Cost** | Lower (fewer LLM calls) | Higher (all non-audit msgs) |
| **Latency** | Instant (canned) | ~1-2s (LLM) |

---

## Cost Estimate

**Per message cost**: ~$0.001 (deepseek is cheap)

**If 100 chat sessions/day × 5 msgs avg**: ~$0.50/day = ~$15/month

---

## Implementation Steps

1. **Create `lib/ai/conversation-generator.js`**
   - Build OpenRouter helper
   - Implement message formatting

2. **Create `SYSTEM_PROMPT.md`**
   - Document full system prompt
   - Examples of desired behavior

3. **Update `lib/handlers/chat.js`**
   - Import new helper
   - Keep intent router
   - Replace canned responses with LLM calls
   - Add conversation history support

4. **Update frontend (React)**
   - Track message history in state
   - Pass history to API
   - Add suggestion chips

5. **Test**
   - Run 20-example suite from analysis
   - Verify intent classification still works
   - Verify audit_request still triggers flow
   - Verify LLM responses are contextual

---

## Backwards Compatibility

- ✅ Existing audit endpoints unchanged
- ✅ Intent router logic unchanged
- ✅ API signature compatible (just add conversationHistory field)
- ✅ No database schema changes

---

## Future Enhancements

1. **Persistent history**: Store in Supabase per session
2. **Multi-turn audit**: Ask follow-up questions before triggering audit
3. **Lead qualification**: LLM scores lead quality before capture
4. **A/B testing**: Compare LLM responses vs. hardcoded for conversion
5. **Fine-tuned model**: Train on Socialsect FAQs for higher accuracy
