import { HttpError } from '../http-error.js'
import { escapeHtml, sendNotificationEmail, sendVisitorConfirmation } from '../email.js'
import { newsletterConfirmationEmail } from '../email-templates/confirmations.js'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function processNewsletter(payload = {}) {
  const email = String(payload.email ?? '').trim()
  if (!email || !isValidEmail(email)) {
    throw new HttpError('A valid email address is required')
  }

  const source = String(payload.source ?? 'website').trim() || 'website'

  await sendNotificationEmail({
    subject: `Newsletter signup (${source})`,
    replyTo: email,
    html: `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#1A1C1D"><p style="margin:0"><strong>${escapeHtml(email)}</strong> subscribed via <strong>${escapeHtml(source)}</strong>.</p></div>`,
  })

  try {
    await sendVisitorConfirmation({
      to: email,
      subject: 'You\u2019re on the list — Socialsect',
      html: newsletterConfirmationEmail({ source }),
    })
  } catch (visitorErr) {
    console.error('[newsletter] Visitor confirmation failed:', visitorErr.message)
  }

  return { ok: true }
}
