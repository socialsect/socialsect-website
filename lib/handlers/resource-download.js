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
  const name = String(payload.name ?? '').trim()
  const email = String(payload.email ?? '').trim()
  const specialty = String(payload.specialty ?? '').trim()
  const resourceTitle = String(payload.resourceTitle ?? '').trim()
  const resourceType = String(payload.resourceType ?? '').trim()

  if (!name) throw new HttpError('Name is required')
  if (!email || !isValidEmail(email)) throw new HttpError('A valid email address is required')
  if (!specialty) throw new HttpError('Specialty is required')
  if (!resourceTitle) throw new HttpError('Resource is required')

  const table = linesToHtml([
    ...submissionMetaRows(payload, '/api/resource-download'),
    ['Name', name],
    ['Email', email],
    ['Specialty', specialty],
    ['Resource', resourceTitle],
    ['Type', resourceType || ''],
  ])

  const teamHtml = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#1A1C1D"><p style="margin:0 0 24px"><strong>${escapeHtml(name)}</strong> requested <strong>${escapeHtml(resourceTitle)}</strong>.</p><table style="border-collapse:collapse">${table}</table></div>`

  return finalizeSubmission({
    endpoint: '/api/resource-download',
    payload,
    requestMeta,
    sendTeamEmail: () =>
      sendNotificationEmail({
        subject: `Resource download: ${resourceTitle}`,
        replyTo: email,
        html: teamHtml,
      }),
    sendVisitorEmail: () =>
      sendVisitorConfirmation({
        to: email,
        subject: 'Your resource request — Socialsect',
        html: resourceDownloadConfirmationEmail({ name, resourceTitle }),
      }),
  })
}
