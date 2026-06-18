import { HttpError } from '../http-error.js'
import {
  escapeHtml,
  linesToHtml,
  sendNotificationEmail,
  sendVisitorConfirmation,
} from '../email.js'
import { resourceDownloadConfirmationEmail } from '../email-templates/confirmations.js'
import { finalizeSubmission } from '../finalize-submission.js'
import { submissionMetaRows } from '../submission-meta.js'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function processResourceDownload(payload = {}, requestMeta = {}) {
  const email = String(payload.email ?? '').trim()
  const name = String(payload.name ?? '').trim()
  const website = String(payload.website ?? '').trim()
  const location = String(payload.location ?? '').trim()
  const resourceTitle = String(payload.resourceTitle ?? '').trim()
  const resourceType = String(payload.resourceType ?? '').trim()

  if (!name) throw new HttpError('Your name is required')
  if (!email || !isValidEmail(email)) throw new HttpError('A valid email address is required')
  if (!website) throw new HttpError('Business website is required')
  if (!location) throw new HttpError('Location is required')
  if (!resourceTitle) throw new HttpError('Resource is required')

  const table = linesToHtml([
    ...submissionMetaRows(payload, '/api/resource-download'),
    ['Name', name],
    ['Email', email],
    ['Website', website],
    ['Location', location],
    ['Requested resource', resourceTitle],
    ['Type', resourceType || ''],
  ])

  const teamHtml = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#1A1C1D"><p style="margin:0 0 24px"><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) from <strong>${escapeHtml(location)}</strong> requested <strong>${escapeHtml(resourceTitle)}</strong>.</p><p style="margin:0 0 16px;font-size:13px"><strong>Website:</strong> ${escapeHtml(website)}</p><table style="border-collapse:collapse">${table}</table></div>`

  return finalizeSubmission({
    endpoint: '/api/resource-download',
    payload,
    requestMeta,
    sendTeamEmail: () =>
      sendNotificationEmail({
        subject: `Resource download: ${resourceTitle} — ${name}`,
        replyTo: email,
        html: teamHtml,
      }),
    sendVisitorEmail: () =>
      sendVisitorConfirmation({
        to: email,
        subject: 'Your resource is on the way — Socialsect',
        html: resourceDownloadConfirmationEmail({ resourceTitle }),
      }),
  })
}
