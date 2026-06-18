/**
 * Handle conversational chat requests with intent routing and LLM responses
 */

import { HttpError } from '../http-error.js'
import { classifyIntent } from '../chat/intent-router.js'
import { generateConversationResponse } from '../ai/conversation-generator.js'
import { processAuditChat } from './audit-chat.js'
import { sendChatTranscriptToTeam } from '../chat-transcript-mailer.js'

export async function processChat(payload = {}) {
  console.log('[CHAT API] Received payload:', JSON.stringify(payload, null, 2))
  
  const { message, conversationHistory = [], userId = null } = payload

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
            conversationTranscript: transcript
          })
          
          // Remove the trigger tag from response and return audit result
          const cleanResponse = response.replace(/<AUDIT_TRIGGER>[\s\S]*?<\/AUDIT_TRIGGER>/g, '').trim()
          
          // Send chat transcript to team (async, don't wait)
          const updatedHistory = [
            ...conversationHistory,
            { role: 'user', content: message },
            { role: 'assistant', content: cleanResponse }
          ]
          sendChatTranscriptToTeam(updatedHistory, { userId, intent: 'audit', auditTriggered: true })
            .catch(err => console.error('[CHAT API] Failed to send transcript:', err.message))
          
          return {
            success: true,
            intent: 'audit',
            response: cleanResponse,
            auditTriggered: true,
            auditResult: auditResult
          }
        } catch (auditError) {
          console.error('[CHAT API] Audit processing failed:', auditError)
          
          // Still return the conversation response, but indicate audit failed
          const cleanResponse = response.replace(/<AUDIT_TRIGGER>[\s\S]*?<\/AUDIT_TRIGGER>/g, '').trim()
          
          // Send chat transcript to team (async, don't wait)
          const updatedHistory = [
            ...conversationHistory,
            { role: 'user', content: message },
            { role: 'assistant', content: cleanResponse }
          ]
          sendChatTranscriptToTeam(updatedHistory, { userId, intent: 'audit', auditTriggered: false })
            .catch(err => console.error('[CHAT API] Failed to send transcript:', err.message))
          
          return {
            success: true,
            intent: intent,
            response: cleanResponse + ' (Note: There was an issue starting the audit. Please try again or use the audit form directly.)',
            auditTriggered: false,
            auditError: auditError.message
          }
        }
      }
      
      // No audit trigger - send normal chat transcript to team (async, don't wait)
      const updatedHistory = [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      ]
      sendChatTranscriptToTeam(updatedHistory, { userId, intent })
        .catch(err => console.error('[CHAT API] Failed to send transcript:', err.message))
      
      return {
        success: true,
        intent: intent,
        response: response
      }
    } else {
      console.error('[CHAT API] LLM generation failed:', result.error)
      
      const fallbackResponse = 'I had a moment of trouble there, but I\'d love to help. Can you rephrase that or let me know what specific challenge you\'re facing?'
      
      // Send failed transcript to team (async, don't wait)
      const updatedHistory = [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: fallbackResponse }
      ]
      sendChatTranscriptToTeam(updatedHistory, { userId, intent, failed: true })
        .catch(err => console.error('[CHAT API] Failed to send transcript:', err.message))
      
      return {
        success: true,
        intent: intent,
        response: fallbackResponse
      }
    }
  } catch (error) {
    console.error('[CHAT API] Error:', error)
    throw error
  }
}
