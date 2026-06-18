/**
 * Chat Transcript Mailer
 * 
 * Sends chat conversations with AI overview to Vinayak for review
 */

import { sendEmail } from './email.js'
import { generateChatOverview } from './ai/chat-reviewer.js'

const VINAYAK_EMAIL = 'vinayak@gosocialsect.com'

export async function sendChatTranscriptToTeam(conversationHistory = [], metadata = {}) {
  try {
    console.log('[CHAT-MAILER] Generating chat overview...')
    
    // Generate AI overview
    const reviewResult = await generateChatOverview(conversationHistory)
    const overview = reviewResult.overview || 'No overview available'

    console.log('[CHAT-MAILER] Overview generated, preparing email...')

    // Build HTML email with transcript and overview
    const html = buildChatEmailHtml(conversationHistory, overview, metadata)

    // Send to Vinayak
    await sendEmail({
      to: VINAYAK_EMAIL,
      subject: `Chat Transcript Review - ${new Date().toLocaleString()}`,
      html: html
    })

    console.log('[CHAT-MAILER] Chat transcript sent to', VINAYAK_EMAIL)

    return {
      success: true,
      sent: true,
      email: VINAYAK_EMAIL
    }
  } catch (error) {
    console.error('[CHAT-MAILER] Error:', error.message)
    return {
      success: false,
      error: error.message
    }
  }
}

function buildChatEmailHtml(conversationHistory = [], overview, metadata = {}) {
  const timestamp = new Date().toLocaleString()

  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #1a1c1d; line-height: 1.6; max-width: 800px;">
      <h2 style="color: #695af2; margin-bottom: 8px;">Chat Conversation Review</h2>
      <p style="color: #666; margin: 0 0 24px 0; font-size: 14px;">
        <strong>Timestamp:</strong> ${escapeHtml(timestamp)}
      </p>

      ${metadata && metadata.userId ? `
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          <strong>User ID:</strong> ${escapeHtml(metadata.userId)}
        </p>
      ` : ''}

      <div style="background: #f5f5f7; padding: 16px; border-left: 4px solid #695af2; border-radius: 4px; margin-bottom: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 12px; color: #695af2;">AI Overview</h3>
        <div style="color: #1a1c1d; line-height: 1.7;">
          ${overview.split('\n').map(line => `<p style="margin: 8px 0;">${escapeHtml(line)}</p>`).join('')}
        </div>
      </div>

      <div style="background: #f9f9fb; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
        <h3 style="margin-top: 0; margin-bottom: 12px; color: #1a1c1d;">Conversation Transcript</h3>
        <div style="font-family: 'Monaco', 'Courier New', monospace; font-size: 13px; line-height: 1.5; color: #333; background: #fff; padding: 12px; border-radius: 3px; overflow-x: auto; max-height: 600px; overflow-y: auto;">
          ${conversationHistory.map(msg => {
            const role = msg.role === 'user' ? '👤 CUSTOMER' : '🤖 ASSISTANT'
            const content = escapeHtml(msg.content)
            return `<div style="margin-bottom: 12px; border-left: 2px solid ${msg.role === 'user' ? '#695af2' : '#27ae60'}; padding-left: 12px;">
              <strong style="color: ${msg.role === 'user' ? '#695af2' : '#27ae60'};">${role}</strong>
              <div style="margin-top: 4px; color: #333; white-space: pre-wrap; word-break: break-word;">${content}</div>
            </div>`
          }).join('')}
        </div>
      </div>

      <div style="border-top: 1px solid #e2e2e2; padding-top: 16px; color: #666; font-size: 12px;">
        <p style="margin: 0;">This is an automated message from Socialsect chat system. No action needed unless specified in the overview above.</p>
      </div>
    </div>
  `
}

function escapeHtml(text) {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
