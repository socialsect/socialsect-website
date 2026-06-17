# Chat Architecture Implementation Checklist

## Backend ✅ DONE

### Files Created
- [x] `lib/ai/conversation-generator.js` - LLM interface with system prompt
- [x] `lib/ai/SYSTEM_PROMPT.md` - System prompt documentation
- [x] `ARCHITECTURE_REFINED.md` - Detailed architecture
- [x] `MIGRATION_INTENT_TO_LLM.md` - Migration guide
- [x] `CHAT_ARCHITECTURE_SUMMARY.md` - High-level summary

### Files Modified
- [x] `lib/handlers/chat.js` - Updated to use LLM for non-audit intents
- [x] Removed imports: `getSocialsectResponse`, `answerMarketingQuestion`
- [x] Added import: `generateConversationResponse`
- [x] Added support for `conversationHistory` in payload
- [x] Kept intent router unchanged
- [x] Kept audit_request deterministic

### Verification
- [x] Intent router still classifies correctly
- [x] Audit requests still trigger deterministic flow
- [x] Non-audit intents call LLM
- [x] Error handling in place
- [x] System prompt embedded in code
- [x] Backwards compatible (conversationHistory optional)

---

## Frontend ⏳ TODO

### 1. Track Conversation History

**File**: `src/components/growth-auditor/GrowthAuditorWidget.jsx` (or wherever chat state lives)

**Tasks**:
- [ ] Import `useState` from React (if not already)
- [ ] Add state: `const [messages, setMessages] = useState([])`
- [ ] On message send: Add user message to state
- [ ] On API response: Add assistant message to state
- [ ] Limit history to last 10 messages: `messages.slice(-10)`
- [ ] Pass history to API: `conversationHistory: messages.slice(-10)`

**Code template**:
```javascript
const [messages, setMessages] = useState([])

const handleSendMessage = async (userMessage) => {
  // Add user message
  setMessages(prev => [...prev, { role: 'user', content: userMessage }])

  // Call API with history
  const history = messages.slice(-10)
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: userMessage,
      conversationHistory: history
    })
  })

  const data = await response.json()

  // Add assistant message
  setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
  
  return data
}
```

### 2. Add Suggestion Chips

**File**: `src/components/growth-auditor/SuggestionChips.jsx` (new) OR add to widget

**Tasks**:
- [ ] Create component or add to existing widget
- [ ] Three buttons: "Learn About Socialsect", "Audit My Business", "Ask a Question"
- [ ] Wire click handlers:
  - Learn → `handleSendMessage('Tell me about Socialsect and your services')`
  - Audit → Trigger audit flow directly (call `handleAuditFlow()` or similar)
  - Ask → Focus input field
- [ ] Style with existing design tokens
- [ ] Place below message area, above input

**HTML structure**:
```jsx
<div className="suggestion-chips">
  <button 
    className="chip chip-primary"
    onClick={() => handleSendMessage('Tell me about Socialsect and your services')}
  >
    Learn About Socialsect
  </button>

  <button 
    className="chip chip-primary"
    onClick={handleAuditFlow}
  >
    Audit My Business
  </button>

  <button 
    className="chip chip-secondary"
    onClick={() => inputRef.current?.focus()}
  >
    Ask a Question
  </button>
</div>
```

### 3. Update API Call

**File**: Where message is sent to API

**Tasks**:
- [ ] Extract conversation history from state
- [ ] Add `conversationHistory` to request payload
- [ ] Verify API call includes history

**Current**:
```javascript
await fetch('/api/chat', {
  body: JSON.stringify({ message: userMessage })
})
```

**Updated**:
```javascript
await fetch('/api/chat', {
  body: JSON.stringify({
    message: userMessage,
    conversationHistory: messages.slice(-10)
  })
})
```

### 4. Optional: Persist History

**Tasks** (for MVP, can skip):
- [ ] On component mount: Load history from sessionStorage
- [ ] On message send: Save history to sessionStorage
- [ ] Handle edge cases: empty storage, corrupted data

**Code**:
```javascript
// On mount
useEffect(() => {
  const saved = sessionStorage.getItem('chat-history')
  if (saved) {
    try {
      setMessages(JSON.parse(saved))
    } catch (e) {
      console.error('Failed to restore history', e)
    }
  }
}, [])

// On message add
useEffect(() => {
  sessionStorage.setItem('chat-history', JSON.stringify(messages))
}, [messages])
```

---

## Testing ⏳ TODO

### Unit Tests

- [ ] Intent router classifies "hello" as casual_chat
- [ ] Intent router classifies "audit my site" as audit_request
- [ ] Intent router classifies "what services" as socialsect_info
- [ ] Intent router classifies "how to get patients" as healthcare_marketing_question
- [ ] Chat handler returns nextAction for audit_request
- [ ] Chat handler calls generateConversationResponse for others
- [ ] Conversation history is passed correctly
- [ ] Empty history doesn't break LLM call
- [ ] API validates conversationHistory is array (if provided)

### Integration Tests

- [ ] "I'm a dentist in Texas" → Response acknowledges dentistry
- [ ] "hello" → Response is contextual (not "How can I help?")
- [ ] "tell me about socialsect" → Response includes services info
- [ ] "audit my website" → Returns nextAction: "audit_flow"
- [ ] Multi-turn: First msg + follow-up → LLM sees history
- [ ] Error handling: LLM down → Graceful fallback response

### Manual Testing (20 Examples)

Run through these and verify responses are natural, contextual:

1. [ ] "hey" - Should get warm, contextual greeting
2. [ ] "hello" - Should get warm, contextual greeting
3. [ ] "tell me about socialsect" - Should explain services
4. [ ] "what services do you offer" - Should list services naturally
5. [ ] "who are you" - Should introduce Socialsect
6. [ ] "audit my website" - Should trigger audit flow
7. [ ] "review my business" - Should trigger audit flow
8. [ ] "check my clinic website" - Should trigger audit flow
9. [ ] "can you audit my site" - Should trigger audit flow
10. [ ] "how much should dentists spend on ads" - Should give advice
11. [ ] "what is local SEO" - Should explain concept
12. [ ] "should I run Google Ads" - Should discuss pros/cons
13. [ ] "what can you help me with" - Should explain capabilities
14. [ ] "I need more patients" - Should ask follow-ups about practice
15. [ ] "my website is not converting" - Should offer to audit
16. [ ] "I'm a dentist in Texas" - Should acknowledge and engage
17. [ ] "what makes Socialsect different" - Should differentiate
18. [ ] "book a call" - Should offer to schedule call
19. [ ] "pricing" - Should explain pricing model
20. [ ] "can you help my practice grow" - Should show interest

### Performance Testing

- [ ] Response latency <2 seconds (typical)
- [ ] No timeout errors
- [ ] Mobile devices handle it smoothly
- [ ] Multiple messages in succession don't break

---

## Documentation ✅ DONE

- [x] `ARCHITECTURE_REFINED.md` - Architecture overview
- [x] `MIGRATION_INTENT_TO_LLM.md` - Migration guide
- [x] `CHAT_ARCHITECTURE_SUMMARY.md` - Executive summary
- [x] `lib/ai/SYSTEM_PROMPT.md` - System prompt docs
- [x] Code comments in `conversation-generator.js`
- [x] Code comments in `chat.js`

### Additional Docs (Optional)

- [ ] Update README with chat architecture
- [ ] Add troubleshooting guide
- [ ] Create system prompt iteration guide

---

## Deployment ⏳ TODO

### Pre-Deployment

- [ ] Backend code reviewed
- [ ] Frontend code reviewed
- [ ] All tests passing
- [ ] Performance acceptable
- [ ] Error handling tested
- [ ] System prompt reviewed for quality

### Staging

- [ ] Deploy backend to staging
- [ ] Deploy frontend to staging
- [ ] Run 20-example manual test
- [ ] Check logs for errors
- [ ] Verify API calls working
- [ ] Measure response latency

### Production

- [ ] Deploy backend to production
- [ ] Deploy frontend to production
- [ ] Monitor for errors (first 1 hour)
- [ ] Monitor for LLM API failures
- [ ] Track response quality
- [ ] Collect user feedback

---

## Monitoring ⏳ TODO

### Metrics to Track

- [ ] LLM response time (should be <2s)
- [ ] LLM error rate (should be <2%)
- [ ] API call count (verify budget)
- [ ] User engagement (clicks, continues)
- [ ] Conversion rate (audits started, calls booked)
- [ ] User satisfaction (if survey added)

### Alerts to Set Up

- [ ] LLM error rate exceeds 5%
- [ ] Response latency exceeds 3 seconds
- [ ] Daily API cost exceeds $0.50
- [ ] Chat widget has 50+ errors in 1 hour

### Logging

- [ ] Log every LLM call (intent, message, response)
- [ ] Log errors with full stack trace
- [ ] Log response latency for analysis
- [ ] Log user flow (which chip clicked, message sent, etc.)

---

## Rollback Plan ⏳ TODO (if needed)

### If Quality Issues

1. [ ] Revert `lib/handlers/chat.js` to previous version
2. [ ] Restore old imports and logic
3. [ ] Remove `conversationHistory` from frontend
4. [ ] Deploy both
5. [ ] Verify chat works with old system

**Time to rollback**: ~10 minutes

---

## Success Criteria

✅ **Complete when all of the following are true**:

- [x] Backend code deployed (conversation-generator.js, chat.js updated)
- [ ] Frontend code deployed (history tracking, chips visible)
- [ ] 20-example manual test all passing
- [ ] Response quality looks good (not generic/canned)
- [ ] Error rate <2%
- [ ] Response latency <2s average
- [ ] Cost <$20/month
- [ ] No user complaints about response quality
- [ ] Engagement metrics look good
- [ ] Audit conversion rate maintained or improved

---

## Timeline Estimate

- **Backend**: ✅ DONE (~1 hour)
- **Frontend**: ~1-2 days
  - History tracking: ~1-2 hours
  - Chips UI: ~1-2 hours
  - API integration: ~30 minutes
  - Testing: ~2-4 hours
- **Testing**: ~1 day
- **Deployment**: ~2 hours
- **Monitoring**: ongoing

**Total**: 3-4 days

---

## Questions / Notes

- [ ] Should history persist across sessions? (Currently no, sessionStorage only)
- [ ] Should we rate-limit? (Currently no, but can add if needed)
- [ ] Should we cache similar responses? (Currently no)
- [ ] Any specific system prompt changes before launch?
- [ ] Do we want A/B testing? (old vs new)
- [ ] Should we get user feedback on response quality?

---

## Sign-Off

- [ ] Product Manager: Approve architecture
- [ ] Founder/CTO: Review and approve
- [ ] QA: Testing complete
- [ ] DevOps: Deployment ready
