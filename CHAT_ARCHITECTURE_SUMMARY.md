# Chat Architecture Summary: Intent Router + LLM

## Executive Summary

**Problem**: Current chat system returns canned responses for many intents, resulting in weak UX for edge cases.

**Solution**: Keep intent router (navigation layer), add LLM for all non-audit responses (conversation layer).

**Result**: Intent router handles WHERE to route. LLM handles WHAT to say.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│ User Message                                        │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  Intent Classification     │
        │  (Keyword Matching)        │
        │  - audit_request           │
        │  - socialsect_info         │
        │  - healthcare_marketing_q  │
        │  - casual_chat             │
        └────────────────┬───────────┘
                         │
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
   ┌──────────────┐         ┌──────────────────────────┐
   │ audit_request│         │ All Other Intents        │
   │ (deterministic)         │ casual_chat              │
   │              │         │ socialsect_info          │
   │ Return:      │         │ healthcare_marketing_q   │
   │ nextAction:  │         │                          │
   │ audit_flow   │         │ Call LLM with:           │
   └──────────────┘         │ - System Prompt          │
                            │ - Intent (context)       │
                            │ - User Message           │
                            │ - Conv. History (10 msgs)│
                            │                          │
                            │ Return LLM Response      │
                            └──────────────────────────┘
                                     │
                                     ▼
                         ┌─────────────────────────────┐
                         │ Return Response to Client   │
                         └─────────────────────────────┘
```

---

## Files Structure

### Backend

```
lib/
├── ai/
│   ├── conversation-generator.js        ← NEW: LLM interface
│   ├── SYSTEM_PROMPT.md                 ← NEW: Prompt documentation
│   └── healthcare-consultant.js         ← (still used for audits, if needed)
│
├── chat/
│   ├── intent-router.js                 ← UNCHANGED: Classification logic
│   └── socialsect-knowledge.js          ← (no longer used for main flow)
│
└── handlers/
    └── chat.js                          ← MODIFIED: Use LLM for non-audits
```

### Frontend

```
src/components/growth-auditor/
├── GrowthAuditorWidget.jsx              ← MODIFIED: Track conv. history
├── AuditStepsFlow.jsx                   ← (handles audit steps)
└── components/
    └── SuggestionChips.jsx              ← NEW (or add to widget)
```

---

## Intent Router: Still in Use

The intent router is NOT replaced. It still does exactly what it did before:

```javascript
function classifyIntent(message) {
  // Audit requests
  if (msg.match(/\baudit\b|\bcheck\b|\bscan\b/i)) {
    return 'audit_request'
  }

  // Socialsect info
  if (msg.match(/\bwhat.*do.*you.*do\b|\bservices\b/i)) {
    return 'socialsect_info'
  }

  // Healthcare marketing questions
  if (msg.match(/\bhow\b.*\b(spend|budget|market)/i)) {
    return 'healthcare_marketing_question'
  }

  // Default
  return 'casual_chat'
}
```

**It still**:
- Classifies every message
- Returns one of 4 intents
- Is fast (deterministic, no LLM)
- Is used to route AND inform LLM context

**It does NOT**:
- Generate responses (LLM does that)
- Replace itself with LLM (both work together)

---

## The LLM Layer

### When LLM is Called

```
if (intent === 'audit_request')
  → Skip LLM, trigger audit flow deterministically

else (casual_chat, socialsect_info, healthcare_marketing_q)
  → Call LLM
  → Use system prompt + intent + history
  → Return response
```

### System Prompt Includes

1. **Socialsect Context**
   - What Socialsect is
   - Services offered
   - Industries served
   - Results/metrics

2. **Communication Guidelines**
   - Tone: conversational, warm, professional
   - Not salesy or pushy
   - Match user's energy
   - Plain text (no markdown)

3. **Lead Qualification**
   - When to suggest audits
   - When to suggest calls
   - What to avoid

4. **Healthcare Focus**
   - Acknowledge if user is a practice owner
   - Ask relevant follow-ups
   - Use healthcare examples

5. **Example Flows**
   - "I'm a dentist in Texas"
   - "How much should I spend on ads"
   - "Can you audit my website"
   - etc.

### Conversation History

**Passed to LLM**: Last 10 messages (5 user + 5 assistant)

**Enables**:
- Follow-up questions with context
- Remembering what user already asked
- Building on previous responses
- Avoid repeating advice

**Example**:
```
User 1: "I'm a dentist"
Bot: "Great. What's your biggest challenge?"
User 2: "Getting more patients"
Bot: [Remembers they're a dentist + need patients → contextual response]
```

---

## API Changes

### Request

```json
{
  "message": "I'm a dentist in Texas, can you help me?",
  "conversationHistory": [
    { "role": "user", "content": "hey" },
    { "role": "assistant", "content": "Hi there! How can I help?" }
  ]
}
```

### Response

```json
{
  "success": true,
  "intent": "casual_chat",
  "response": "Absolutely. We work with practices all over Texas, and dentistry is a big focus for us. We typically help dentists attract more qualified patient inquiries and improve their website's booking rate. What's the biggest challenge you're facing right now?"
}
```

---

## Key Differences: Before vs After

### "I'm a dentist in Texas"

**Before**:
```
Intent: casual_chat
Response: "How can I help you today?" (canned)
Problem: Generic, lost context
```

**After**:
```
Intent: casual_chat (same)
Response: LLM generates contextual response
  "Absolutely. We work with practices all over Texas..."
Benefit: Acknowledges dentistry, shows expertise, asks relevant question
```

### "What services do you offer?"

**Before**:
```
Intent: socialsect_info
Response: hardcoded lookup or fallback
Problem: Static, no personalization
```

**After**:
```
Intent: socialsect_info (same)
Response: LLM generates based on system prompt
  "We offer five main services focused on patient acquisition..."
Benefit: Dynamic, personalizable, conversational
```

### "Audit my website"

**Before**:
```
Intent: audit_request
Response: "I can help. To get started, I need a few details:"
Action: Trigger audit flow
```

**After**:
```
Intent: audit_request (SAME)
Response: "I can help. To get started, I need a few details:" (SAME)
Action: Trigger audit flow (SAME)
Benefit: No change for this path - it's deterministic and working
```

---

## Implementation Status

### ✅ Completed

- [x] Architecture design
- [x] System prompt documentation
- [x] `conversation-generator.js` implementation
- [x] Chat handler updated (`lib/handlers/chat.js`)
- [x] Intent router kept unchanged
- [x] Backwards compatible API

### ⏳ Pending (Frontend)

- [ ] Update `GrowthAuditorWidget.jsx` to track message history
- [ ] Add suggestion chips UI component
- [ ] Pass `conversationHistory` to API
- [ ] Test with 20-example suite
- [ ] Deploy and monitor

---

## Testing Strategy

### Automated Tests

1. **Intent Classification**: Verify intent router still works
2. **API Integration**: Verify chat handler calls LLM
3. **Error Handling**: Verify fallback when LLM fails

### Manual Testing (20 Examples)

```
✓ "hey" → Contextual response (not canned)
✓ "tell me about socialsect" → LLM response (not hardcoded)
✓ "I'm a dentist in Texas" → Acknowledges healthcare context
✓ "what services do you offer" → Lists services naturally
✓ "audit my website" → Triggers audit flow
✓ "I need more patients" → Healthcare marketing advice
✓ "how much does it cost" → Explains pricing naturally
... (14 more)
```

### Metrics to Monitor

- Response quality (subjective)
- Response latency (<2 seconds)
- Error rate (<2%)
- API cost (~$15/month)
- User engagement (clicks, continues, dropoff)

---

## Cost Analysis

**Per message**: ~$0.001 (deepseek model)

**Estimate**:
- 100 sessions/day × 5 messages × 90% LLM = 450 calls/day
- 450 × $0.001 = $0.45/day
- $0.45 × 30 = $13.50/month

**Budget**: <$20/month ✅

---

## Production Readiness

**Before deploying**:
- [ ] System prompt tuned and tested
- [ ] Error handling in place (graceful fallback)
- [ ] Conversation history passed correctly from frontend
- [ ] Suggestion chips UI implemented
- [ ] Performance acceptable (<2s latency)
- [ ] Cost monitoring set up
- [ ] Rate limiting if needed
- [ ] Markdown stripping working (if LLM uses it)
- [ ] Mobile responsive tested
- [ ] Accessibility (a11y) reviewed

---

## Rollback Plan

If issues arise, rollback is simple:

1. Revert `lib/handlers/chat.js` to old version
2. Restore old imports (`getSocialsectResponse`, `answerMarketingQuestion`)
3. Remove `conversationHistory` from frontend
4. Time: ~10 minutes

---

## Next Steps

1. **Frontend Implementation** (1-2 days)
   - Update `GrowthAuditorWidget.jsx` to track history
   - Add suggestion chips
   - Pass history to API

2. **Testing** (1 day)
   - Run 20-example suite
   - Verify responses are contextual
   - Check performance

3. **Deployment** (1 day)
   - Push to staging
   - Monitor for errors
   - Deploy to production

4. **Monitoring** (ongoing)
   - Track response quality
   - Monitor cost
   - Collect user feedback
   - Iterate on system prompt

---

## Success Definition

✅ **Successful when**:
- All non-audit messages use LLM
- Responses are contextual (not canned)
- Edge cases like "I'm a dentist in Texas" are handled well
- Conversation history is preserved
- Cost is <$20/month
- Error rate <2%
- User engagement increases
