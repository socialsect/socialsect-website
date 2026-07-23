/**
 * Handle conversational chat requests with intent routing and LLM responses
 */

import { HttpError } from '../http-error.js'
import { classifyIntent } from '../chat/intent-router.js'
import { generateConversationResponse } from '../ai/conversation-generator.js'
import { processAuditChat } from './audit-chat.js'
import { sendChatTranscriptToTeam } from '../chat-transcript-mailer.js'

// Debounce timer map — wait 5s after the user's last message before emailing transcript
const transcriptTimers = new Map()
const sentSessions = new Set()

function debouncedSendTranscript(userIp, conversationHistory, metadata = {}) {
  const key = userIp || 'unknown'

  // Clear existing timer for this user
  if (transcriptTimers.has(key)) {
    clearTimeout(transcriptTimers.get(key))
  }

  // First message of a new session — send immediately, then debounce for follow-ups
  const isFirstMessage = !sentSessions.has(key)
  const delay = isFirstMessage ? 0 : 5000

  if (isFirstMessage) {
    sentSessions.add(key)
    // Clear session flag after 30 minutes of inactivity
    setTimeout(() => sentSessions.delete(key), 30 * 60 * 1000)
  }

  const timer = setTimeout(async () => {
    transcriptTimers.delete(key)
    try {
      await sendChatTranscriptToTeam(conversationHistory, {
        ...metadata,
        debounced: true,
        ip: userIp,
      })
      console.log(`[CHAT] Transcript sent for ${key} (${isFirstMessage ? 'immediate' : 'debounced'})`)
    } catch (err) {
      console.error('[CHAT] Debounced transcript send failed:', err.message)
    }
  }, delay)

  transcriptTimers.set(key, timer)
}

export async function processChat(payload = {}, requestMeta = {}) {
  console.log('[CHAT API] Received payload:', JSON.stringify(payload, null, 2))

  const { message, conversationHistory = [], userId = null } = payload
  const userIp = requestMeta?.ip || null

  if (!message || typeof message !== 'string') {
    throw new HttpError('Message is required', 400)
  }

  // Validate conversation history format
  if (conversationHistory && !Array.isArray(conversationHistory)) {
    throw new HttpError('conversationHistory must be an array', 400)
  }

  try {
    // Classify intent
    const intent = classifyIntent(message)
    console.log('[CHAT API] Classified intent:', intent)

    if (intent === 'off_topic') {
      const response =
        "I'm here to help with healthcare marketing, practice growth, and Socialsect's services. I can't help with coding or general tech questions, but I'd love to talk about how to get more patients or improve your practice website. What's your specialty or biggest growth challenge right now?"

      const updatedHistory = [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: response },
      ]

      debouncedSendTranscript(userIp, updatedHistory, { userId, intent })

      return {
        success: true,
        intent,
        response,
      }
    }

    // All intents: use LLM for natural, contextual responses
    console.log('[CHAT API] Generating LLM response for intent:', intent)

    const result = await generateConversationResponse(
      intent,
      message,
      conversationHistory
    )

    if (result.success) {
      const response = result.response

      // Check if response contains AUDIT_TRIGGER
      const auditTriggerMatch = response.match(/<AUDIT_TRIGGER>\s*name:\s*(.+?)\s*email:\s*(.+?)\s*website:\s*(.+?)\s*<\/AUDIT_TRIGGER>/s)

      if (auditTriggerMatch) {
        const [, name, email, website] = auditTriggerMatch

        console.log('[CHAT API] Audit trigger detected')
        console.log('[CHAT API] Audit details:', { name, email, website })

        // Build conversation transcript from history + current message
        const transcript = conversationHistory
          .map(msg => `${msg.role}: ${msg.content}`)
          .join('\n') + `\nuser: ${message}`

        try {
          // Process the audit
          const auditResult = await processAuditChat({
            name: name.trim(),
            email: email.trim(),
            website: website.trim(),
            conversationTranscript: transcript,
          })

          // Remove the trigger tag from response and return audit result
          const cleanResponse = response.replace(/<AUDIT_TRIGGER>[\s\S]*?<\/AUDIT_TRIGGER>/g, '').trim()

          // Debounce transcript send (async, don't wait)
          const updatedHistory = [
            ...conversationHistory,
            { role: 'user', content: message },
            { role: 'assistant', content: cleanResponse },
          ]
          debouncedSendTranscript(userIp, updatedHistory, { userId, intent: 'audit', auditTriggered: true })

          return {
            success: true,
            intent: 'audit',
            response: cleanResponse,
            auditTriggered: true,
            auditResult: auditResult,
          }
        } catch (auditError) {
          console.error('[CHAT API] Audit processing failed:', auditError)

          // Still return the conversation response, but indicate audit failed
          const cleanResponse = response.replace(/<AUDIT_TRIGGER>[\s\S]*?<\/AUDIT_TRIGGER>/g, '').trim()

          const updatedHistory = [
            ...conversationHistory,
            { role: 'user', content: message },
            { role: 'assistant', content: cleanResponse },
          ]
          debouncedSendTranscript(userIp, updatedHistory, { userId, intent: 'audit', auditTriggered: false })

          return {
            success: true,
            intent: intent,
            response: cleanResponse + ' (Note: There was an issue starting the audit. Please try again or use the audit form directly.)',
            auditTriggered: false,
            auditError: auditError.message,
          }
        }
      }

      // No audit trigger — debounce transcript send
      const updatedHistory = [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: response },
      ]
      debouncedSendTranscript(userIp, updatedHistory, { userId, intent })

      return {
        success: true,
        intent: intent,
        response: response,
      }
    } else {
      console.error('[CHAT API] LLM generation failed:', result.error)

      const fallbackResponse =
        "I had a moment of trouble there, but I'd love to help. Can you rephrase that or let me know what specific challenge you're facing?"

      const updatedHistory = [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: fallbackResponse },
      ]
      debouncedSendTranscript(userIp, updatedHistory, { userId, intent, failed: true })

      return {
        success: true,
        intent: intent,
        response: fallbackResponse,
      }
    }
  } catch (error) {
    console.error('[CHAT API] Error:', error)
    throw error
  }
}
