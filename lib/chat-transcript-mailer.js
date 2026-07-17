/**
 * Chat Transcript Mailer
 * 
 * Sends chat conversations with AI overview to Vinayak for review.
 * Debounced — only fires after the user has been idle for 12+ seconds.
 * Includes visitor IP and country geolocation.
 */

import { sendEmail } from './email.js'
import { generateChatOverview } from './ai/chat-reviewer.js'

const VINAYAK_EMAIL = 'vinayakxsingh21@gmail.com'

/**
 * Look up geographic info for an IP address using ip-api.com (free, no key).
 * Returns { ip, country, countryCode } or null on failure.
 */
async function geoLookup(ip) {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
    return { ip: ip || 'unknown', country: 'Localhost', countryCode: '—' }
  }

  try {
    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,country,countryCode,query`, {
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) return null
    const data = await res.json()
    if (data.status !== 'success') return null

    return {
      ip: data.query || ip,
      country: data.country || 'Unknown',
      countryCode: data.countryCode || '—',
    }
  } catch {
    return null
  }
}

export async function sendChatTranscriptToTeam(conversationHistory = [], metadata = {}) {
  try {
    console.log('[CHAT-MAILER] Generating chat overview...')

    // Extract email and website from conversation (lead indicators)
    const leadInfo = extractLeadInfo(conversationHistory)

    // Generate AI overview
    const reviewResult = await generateChatOverview(conversationHistory)
    const overview = reviewResult.overview || 'No overview available'

    console.log('[CHAT-MAILER] Overview generated, preparing email...')

    // Geo-locate the visitor
    const visitorIp = metadata?.ip || null
    const geo = visitorIp ? await geoLookup(visitorIp) : null

    // Build HTML email with transcript, overview, and visitor info
    const html = buildChatEmailHtml(conversationHistory, overview, leadInfo, metadata, geo)

    // Send to Vinayak
    await sendEmail({
      to: VINAYAK_EMAIL,
      subject: `Chat Transcript Review${leadInfo.isLead ? ' 🔥 LEAD' : ''} - ${new Date().toLocaleString()}`,
      html: html,
    })

    console.log('[CHAT-MAILER] Chat transcript sent to', VINAYAK_EMAIL)

    return {
      success: true,
      sent: true,
      email: VINAYAK_EMAIL,
      isLead: leadInfo.isLead,
      leadInfo: leadInfo,
      geo: geo,
    }
  } catch (error) {
    console.error('[CHAT-MAILER] Error:', error.message)
    return {
      success: false,
      error: error.message,
    }
  }
}

function buildChatEmailHtml(conversationHistory = [], overview, leadInfo = {}, metadata = {}, geo = null) {
  const timestamp = new Date().toLocaleString()
  const isLead = leadInfo.isLead || false
  const email = leadInfo.email || null
  const website = leadInfo.website || null

  // Visitor location block
  const locationBlock = geo
    ? `
    <div style="background: #f0f4ff; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #d0d9f5;">
      <p style="margin: 0; font-size: 13px; color: #334;">
        <strong>📍 Visitor Location</strong><br/>
        IP: <code style="background: #e4e9f5; padding: 1px 6px; border-radius: 3px;">${escapeHtml(geo.ip)}</code>
        &nbsp;·&nbsp; ${escapeHtml(geo.country)} ${geo.countryCode ? '(' + escapeHtml(geo.countryCode) + ')' : ''}
      </p>
    </div>`
    : ''

  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #1a1c1d; line-height: 1.6; max-width: 800px;">
      <h2 style="color: #695af2; margin-bottom: 8px;">Chat Conversation Review</h2>
      <p style="color: #666; margin: 0 0 24px 0; font-size: 14px;">
        <strong>Timestamp:</strong> ${escapeHtml(timestamp)}
      </p>

      ${locationBlock}

      ${isLead ? `
        <div style="background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); padding: 16px; border-radius: 8px; margin-bottom: 24px; border: 2px solid #f0c000;">
          <h3 style="margin-top: 0; margin-bottom: 12px; color: #333; font-size: 18px;">🔥 QUALIFIED LEAD DETECTED</h3>
          <div style="background: rgba(255, 255, 255, 0.9); padding: 12px; border-radius: 4px; margin-bottom: 12px;">
            ${email ? `<p style="margin: 8px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #695af2; font-weight: bold;">${escapeHtml(email)}</a></p>` : ''}
            ${website ? `<p style="margin: 8px 0; font-size: 14px;"><strong>Website:</strong> <a href="https://${escapeHtml(website)}" style="color: #695af2; font-weight: bold;" target="_blank">${escapeHtml(website)}</a></p>` : ''}
          </div>
          <p style="margin: 0; font-size: 13px; color: #333;">Lead information extracted from conversation. Recommended action: Follow up within 24 hours.</p>
        </div>
      ` : ''}

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

function extractLeadInfo(conversationHistory = []) {
  let email = null
  let website = null

  // Combine all conversation text
  const fullText = conversationHistory
    .map(msg => msg.content)
    .join(' ')

  // Extract email (basic regex)
  const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i)
  if (emailMatch) {
    email = emailMatch[0]
  }

  // Extract website URL (domain pattern)
  const websiteMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i)
  if (websiteMatch) {
    website = websiteMatch[1] || websiteMatch[0]
    // Clean up the website
    website = website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
  }

  return {
    isLead: !!(email && website),
    email: email,
    website: website,
  }
}
