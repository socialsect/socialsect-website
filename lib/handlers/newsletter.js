import { HttpError } from '../http-error.js'
import { escapeHtml, linesToHtml, sendNotificationEmail, sendVisitorConfirmation } from '../email.js'
import { newsletterConfirmationEmail } from '../email-templates/confirmations.js'
import { finalizeSubmission } from '../finalize-submission.js'
import { submissionMetaRows } from '../submission-meta.js'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function processNewsletter(payload = {}, requestMeta = {}) {
  const email = String(payload.email ?? '').trim()
  if (!email || !isValidEmail(email)) {
    throw new HttpError('A valid email address is required')
  }

  const source = String(payload.source ?? 'website').trim() || 'website'

  const table = linesToHtml([
    ...submissionMetaRows(payload, '/api/newsletter'),
    ['Email', email],
    ['Placement', source],
  ])

  const teamHtml = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1A1C1D"><p style="margin:0 0 24px"><strong>${escapeHtml(email)}</strong> subscribed to the newsletter.</p><table style="border-collapse:collapse;width:100%;max-width:560px">${table}</table></div>`

  return finalizeSubmission({
    endpoint: '/api/newsletter',
    payload,
    requestMeta,
    sendTeamEmail: () =>
      sendNotificationEmail({
        subject: `Newsletter signup (${source})`,
        replyTo: email,
        html: teamHtml,
      }),
    sendVisitorEmail: () =>
      sendVisitorConfirmation({
        to: email,
        subject: 'You\u2019re on the list — Socialsect',
        html: newsletterConfirmationEmail({ source }),
      }),
  })
}
