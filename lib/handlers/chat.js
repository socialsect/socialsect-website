/**
 * Handle conversational chat requests with intent routing and LLM responses
 */

import { HttpError } from '../http-error.js'
import { classifyIntent } from '../chat/intent-router.js'
import { generateConversationResponse } from '../ai/conversation-generator.js'

export async function processChat(payload = {}) {
  console.log('[CHAT API] Received payload:', JSON.stringify(payload, null, 2))
  
  const { message, conversationHistory = [] } = payload

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

    // Audit requests are deterministic - no LLM
    if (intent === 'audit_request') {
      return {
        success: true,
        intent: intent,
        response: 'I can definitely help with that. To get started, I\'ll need a few details:',
        nextAction: 'audit_flow'
      }
    }

    // All other intents: use LLM for natural, contextual responses
    // Intent router still helps shape the system prompt behavior
    console.log('[CHAT API] Generating LLM response for intent:', intent)
    
    const result = await generateConversationResponse(
      intent,
      message,
      conversationHistory
    )

    if (result.success) {
      return {
        success: true,
        intent: intent,
        response: result.response
      }
    } else {
      console.error('[CHAT API] LLM generation failed:', result.error)
      return {
        success: true,
        intent: intent,
        response: 'I had a moment of trouble there, but I\'d love to help. Can you rephrase that or let me know what specific challenge you\'re facing?'
      }
    }
  } catch (error) {
    console.error('[CHAT API] Error:', error)
    throw error
  }
}
