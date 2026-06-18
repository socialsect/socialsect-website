/**
 * Chat Reviewer - Generates AI overview of chat conversations
 * 
 * Takes conversation history and generates a summary for internal team review
 */

import { getEnv } from '../env.js'

const REVIEW_PROMPT = `You are an AI assistant reviewing customer service conversations for a healthcare marketing agency called Socialsect.

Your task: Analyze the conversation transcript below and provide a concise executive overview that includes:

1. Key Topics: What was the main topic/concern discussed?
2. Customer Intent: What does the customer want to do or achieve?
3. Engagement Level: How engaged was the customer? (High, Medium, Low)
4. Sentiment: Overall tone/mood of the customer (Positive, Neutral, Negative)
5. Action Items: What follow-up is needed or what happened (e.g., "Audit triggered", "Question answered", "Needs callback", etc.)?
6. Next Steps: What should the team do next?

Keep the overview concise (5-8 sentences max) and actionable.

---

CONVERSATION TRANSCRIPT:
`

export async function generateChatOverview(conversationHistory = []) {
  try {
    const apiKey = getEnv('OPENROUTER_API_KEY')
    
    if (!apiKey) {
      console.error('[CHAT-REVIEWER] OPENROUTER_API_KEY not configured')
      return {
        success: false,
        overview: 'Could not generate overview'
      }
    }

    // Build transcript from conversation history
    const transcript = conversationHistory
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n')

    if (!transcript.trim()) {
      return {
        success: true,
        overview: 'No conversation to review.'
      }
    }

    const fullPrompt = REVIEW_PROMPT + transcript

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://gosocialsect.com',
        'X-Title': 'Socialsect',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3',
        messages: [
          { role: 'user', content: fullPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[CHAT-REVIEWER] OpenRouter error:', response.status, errorData)
      return {
        success: false,
        overview: 'Failed to generate overview'
      }
    }

    const data = await response.json()
    const overview = data.choices?.[0]?.message?.content || 'Could not generate overview'

    console.log('[CHAT-REVIEWER] Generated overview')

    return {
      success: true,
      overview: overview
    }
  } catch (error) {
    console.error('[CHAT-REVIEWER] Error:', error.message)
    return {
      success: false,
      overview: 'Error generating overview'
    }
  }
}
