# Migration Guide: Intent Router + LLM Architecture

## What Changed

### Backend Changes ✅

**Before**:
- Intent router classified messages
- Routes to handlers for specific intents
- Some intents returned canned responses (casual_chat, socialsect_info)
- Other intents called LLM (healthcare_marketing_question)
- Inconsistent response quality

**After**:
- Intent router still classifies messages
- Audit requests still trigger deterministic flow (no LLM)
- All other intents use LLM + system prompt + conversation history
- Consistent, contextual response quality across all intents
- Support for conversation history (last 10 messages)

### Files Modified

**`lib/handlers/chat.js`**
- Removed hardcoded `getSocialsectResponse()` calls
- Removed hardcoded casual response array
- Removed separate `answerMarketingQuestion()` calls
- Added support for `conversationHistory` in payload
- Now calls `generateConversationResponse()` for all non-audit intents

**Files Created**:
- `lib/ai/conversation-generator.js` - Main LLM interface
- `lib/ai/SYSTEM_PROMPT.md` - Complete system prompt documentation
- `ARCHITECTURE_REFINED.md` - Architecture overview
- `MIGRATION_INTENT_TO_LLM.md` - This file

**Files NOT Changed** (fully backwards compatible):
- `lib/chat/intent-router.js` - Intent classification logic unchanged
- `api/chat.js` - API endpoint unchanged
- All audit endpoints - Unchanged
- All other handlers - Unchanged

---

## API Changes

### Request Format (New)

**Old**:
```json
{
  "message": "tell me about socialsect"
}
```

**New** (compatible with old, adds optional history):
```json
{
  "message": "tell me about socialsect",
  "conversationHistory": [
    { "role": "user", "content": "hey" },
    { "role": "assistant", "content": "Hi there! How can I help?" },
    ...
  ]
}
```

**Note**: `conversationHistory` is optional. If not provided, treated as empty array (first message in conversation).

### Response Format (Unchanged)

```json
{
  "success": true,
  "intent": "casual_chat",
  "response": "Absolutely. We work with dentists all the time..."
}
```

**For audit requests**:
```json
{
  "success": true,
  "intent": "audit_request",
  "response": "I can definitely help with that...",
  "nextAction": "audit_flow"
}
```

---

## Frontend Changes Needed

### 1. Track Conversation History

Store last 10 messages in component state.

```javascript
// In GrowthAuditorWidget.jsx or AuditStepsFlow.jsx

const [messages, setMessages] = useState([])

const handleSendMessage = async (userMessage) => {
  // Add user message to local state
  const userMsg = { role: 'user', content: userMessage }
  setMessages([...messages, userMsg])

  // Build conversation history (last 10 messages)
  const history = messages.slice(-10)

  // Call API with history
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: userMessage,
      conversationHistory: history
    })
  })

  const data = await response.json()

  // Add assistant response to local state
  const assistantMsg = { role: 'assistant', content: data.response }
  setMessages(prev => [...prev, userMsg, assistantMsg])

  return data
}
```

### 2. Add Suggestion Chips

Create UI for 3 suggestion chips (always visible):

```jsx
<div className="suggestion-chips">
  <button 
    className="chip"
    onClick={() => handleSendMessage('Tell me about Socialsect and your services')}
  >
    Learn About Socialsect
  </button>

  <button 
    className="chip"
    onClick={() => {
      // Trigger audit flow directly
      setCurrentStep('audit')
    }}
  >
    Audit My Business
  </button>

  <button 
    className="chip"
    onClick={() => focusInput()}
  >
    Ask a Question
  </button>
</div>
```

### 3. Optional: Persist History

For better UX, persist history to sessionStorage or Supabase (optional for MVP).

```javascript
// On message send
sessionStorage.setItem('chat-history', JSON.stringify(messages))

// On component mount
const savedHistory = sessionStorage.getItem('chat-history')
if (savedHistory) {
  setMessages(JSON.parse(savedHistory))
}
```

---

## Testing Checklist

### Unit Tests

- [ ] Intent router still classifies correctly
- [ ] Audit requests still return deterministic response
- [ ] Non-audit intents call LLM
- [ ] Conversation history is passed correctly
- [ ] Error handling when LLM fails

### Integration Tests

- [ ] "I'm a dentist in Texas" → Gets contextual response (not canned)
- [ ] "hello" → Gets contextual response (not generic)
- [ ] "audit my website" → Triggers audit flow
- [ ] Multi-turn conversation → LLM sees history
- [ ] Empty history → LLM works with just current message

### Manual Testing

- [ ] Open chat widget
- [ ] Send "hey" → Should get a thoughtful response (not "How can I help?")
- [ ] Send "I'm a dentist" → Should acknowledge and ask relevant follow-up
- [ ] Send "audit my site" → Should trigger audit flow
- [ ] Send question about marketing → Should get practical answer
- [ ] Follow-up message → Should reference previous context
- [ ] Click chips → Should work as expected

---

## Cost Impact

**Before**: Only healthcare_marketing_question intent called LLM (~10% of messages)

**After**: All non-audit intents call LLM (~90% of messages)

**Cost per message**: ~$0.001 (deepseek is cheap)

**Estimated**: 
- 100 chat sessions/day × 5 messages = 500 messages
- 90% × 500 = 450 LLM calls
- 450 × $0.001 = $0.45/day ≈ $13/month

**Acceptable for MVP. Can optimize later with**:
- Caching responses for identical questions
- Switching to cheaper model if needed
- Rate limiting per session

---

## Rollback Plan

If LLM responses are poor quality:

1. Revert `lib/handlers/chat.js` to use old imports and logic
2. Keep `conversation-generator.js` (not used)
3. Restore `getSocialsectResponse()` and `answerMarketingQuestion()` calls
4. Revert frontend to not pass `conversationHistory`

**Time to rollback**: ~5 minutes

---

## Validation: 20-Example Test

Run these through the new system and verify responses are contextual, not canned:

| Example | Old Response | New Response |
|---------|-------------|--------------|
| "hey" | "How can I help?" (canned) | LLM context (personalized) |
| "hello" | "What's on your mind?" (canned) | LLM context |
| "I'm a dentist in Texas" | "How can I help?" (canned) | LLM acknowledges dentistry |
| "tell me about socialsect" | hardcoded lookup | LLM uses system prompt knowledge |
| "what services do you offer" | hardcoded lookup | LLM uses system prompt knowledge |
| "how much does it cost" | hardcoded response | LLM explains pricing |
| "audit my website" | Audit flow | Audit flow (unchanged) |
| "I need more patients" | LLM (already worked) | LLM + history (improved) |
| "what is local SEO" | LLM (already worked) | LLM + history (improved) |

---

## System Prompt Key Points

The system prompt (in `conversation-generator.js`) includes:

- Socialsect context and services
- Healthcare focus
- Lead qualification rules
- When to suggest audits/calls
- Communication style guide
- Example responses
- Instruction to use plain text (no markdown)

**To update responses**, edit the system prompt in `lib/ai/conversation-generator.js`.

---

## Next Steps

1. **Update frontend** to pass `conversationHistory`
2. **Add suggestion chips** to UI
3. **Test with 20 examples**
4. **Monitor LLM response quality** for 1 week
5. **Iterate on system prompt** if needed
6. **Measure conversion impact** against old version

---

## Troubleshooting

### Issue: LLM returns markdown formatting

**Solution**: System prompt has explicit instruction: "Do NOT use markdown formatting. Use plain text only."

If still happening, ensure system prompt in `conversation-generator.js` includes this section.

### Issue: LLM response is too long

**Solution**: Reduce `max_tokens` in OpenRouter call (currently 400). Try 300 or 250.

### Issue: LLM doesn't know about Socialsect

**Solution**: System prompt might have been truncated. Verify full system prompt is in `conversation-generator.js`. It should be ~2000 tokens.

### Issue: Conversation history isn't being used

**Solution**: Verify frontend is passing `conversationHistory` array in request body. Check API logs for payload structure.

### Issue: Response latency is too high

**Solution**: 
- Current model is `deepseek/deepseek-chat-v3` (reasonably fast)
- If needed, switch to faster model (e.g., `gpt-3.5-turbo`)
- Or add client-side loading animation to mask latency

---

## Performance Metrics to Track

Once deployed, monitor:

1. **LLM response time**: Should be 0.5-2 seconds (including network)
2. **Error rate**: Should be <2% (API failures)
3. **User satisfaction**: Track if contextual responses improve engagement
4. **Conversion rate**: Did chat lead to more audits/calls?
5. **Cost**: Verify actual cost matches estimate

---

## Success Criteria

✅ **Done when**:
- All non-audit messages use LLM
- Responses are contextual (not canned)
- Conversation history is tracked
- Suggestion chips are visible
- Cost is <$20/month
- Error rate is <2%
- User engagement increases (tracked via analytics)
