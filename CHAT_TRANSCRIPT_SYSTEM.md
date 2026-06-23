# Chat Transcript & Overview System

## Overview

Every chat conversation is now automatically reviewed by the AI model and sent to `vinayak@gosocialsect.com` with:
1. **AI-generated overview** of the conversation (key topics, intent, sentiment, action items)
2. **Full conversation transcript** in an easy-to-read format

## How It Works

### 1. Chat Handler (`lib/handlers/chat.js`)
- Accepts optional `userId` parameter for tracking
- After each chat response, sends the complete conversation to the team
- Sends transcripts for:
  - Normal chat messages
  - Audit-triggered conversations
  - Failed responses (where LLM returned an error)

### 2. Chat Reviewer (`lib/ai/chat-reviewer.js`)
- Uses OpenRouter API (same as main chat)
- Generates AI overview that includes:
  - **Key Topics**: Main subjects discussed
  - **Customer Intent**: What the customer wants to do
  - **Engagement Level**: High/Medium/Low
  - **Sentiment**: Positive/Neutral/Negative
  - **Action Items**: What happened (e.g., "Audit triggered", "Question answered")
  - **Next Steps**: What the team should do

### 3. Lead Detection (`lib/chat-transcript-mailer.js`)
- Automatically extracts **email addresses** and **website URLs** from conversation
- If BOTH email and website are present → conversation is marked as a **QUALIFIED LEAD**
- Lead emails get:
  - **🔥 LEAD badge** in email subject line
  - **Highlighted golden section** at top of email
  - **Clickable email link** (mailto)
  - **Clickable website link** (opens in browser)
  - **"Recommended action: Follow up within 24 hours"** reminder

### 4. Chat Transcript Mailer (`lib/chat-transcript-mailer.js`)
- Generates formatted HTML email with:
  - AI overview section (highlighted)
  - Full conversation transcript with color-coded speaker roles
  - Timestamp and metadata
- Sends to `vinayak@gosocialsect.com`
- Runs asynchronously (doesn't block chat response)

## Email Format

**Subject**: `Chat Transcript Review - [timestamp]` or `Chat Transcript Review 🔥 LEAD - [timestamp]` (if qualified lead detected)

**Content**:
```
🔥 QUALIFIED LEAD DETECTED (if both email + website found)
├─ Email: [clickable link]
└─ Website: [clickable link]

AI Overview (highlighted in purple)
├─ Key topics, intent, sentiment
├─ Engagement level
└─ Action items & next steps

Conversation Transcript
├─ User messages (blue)
├─ Assistant responses (green)
└─ Formatted for readability
```

## API Changes

### Chat Endpoint (`/api/chat`)

**Input** (no changes to existing fields):
```json
{
  "message": "string",
  "conversationHistory": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ],
  "userId": "optional-string-identifier"
}
```

**Output** (no changes to response):
```json
{
  "success": true,
  "intent": "string",
  "response": "string",
  "auditTriggered": true,  // if audit was triggered
  "auditResult": {...}     // if audit was triggered
}
```

## Implementation Details

### Async Email Sending
- Email sending happens in background (doesn't block chat response)
- If email fails, error is logged but chat response still returned
- No user-facing impact if email delivery fails

### Error Handling
- Failed chat responses are still sent to Vinayak for team review
- AI overview generation errors are gracefully handled
- All email errors are logged to console

### Performance
- Email sending is asynchronous
- Average email generation time: <5 seconds
- Zero impact on chat response time

## Files Modified/Created

**Created**:
- `lib/ai/chat-reviewer.js` - AI overview generation
- `lib/chat-transcript-mailer.js` - Email formatting and sending
- `CHAT_TRANSCRIPT_SYSTEM.md` - This documentation

**Modified**:
- `lib/handlers/chat.js` - Added transcript email sending
- `lib/ai/conversation-generator.js` - Added audit trigger instructions

## Testing

To test:

1. Send a message to the chat
2. Check `vinayak@gosocialsect.com` inbox
3. You should receive an email with the conversation

Example email timeline:
- User sends message → Chat responds (instant)
- Email generated and sent (background, ~3-5 seconds)

## Future Enhancements

- Store transcripts in database for audit trail
- Add transcript search/filtering for team
- Create dashboard showing all conversations
- Add sentiment trends over time
- Integrate with CRM
