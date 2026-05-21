import { HttpError } from '../http-error.js'
import {
  escapeHtml,
  linesToHtml,
  sendNotificationEmail,
  sendVisitorConfirmation,
} from '../email.js'
import { referenceRequestConfirmationEmail } from '../email-templates/confirmations.js'
import { finalizeSubmission } from '../finalize-submission.js'
import { submissionMetaRows } from '../submission-meta.js'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function processReferenceRequest(payload = {}, requestMeta = {}) {
  const name = String(payload.name ?? '').trim()
  const email = String(payload.email ?? '').trim()
  const practiceName = String(payload.practiceName ?? '').trim()
  const location = String(payload.location ?? '').trim()
  const note = String(payload.note ?? '').trim()
  const referenceClient = String(payload.referenceClient ?? '').trim()
  const referenceCaseMeta = String(payload.referenceCaseMeta ?? '').trim()
  const pageSpecialty = String(payload.pageSpecialty ?? '').trim()
  const pageSlug = String(payload.pageSlug ?? '').trim()

  if (!name) throw new HttpError('Name is required')
  if (!email || !isValidEmail(email)) throw new HttpError('A valid email address is required')
  if (!practiceName) throw new HttpError('Practice name is required')
  if (!location) throw new HttpError('Location is required')

  const table = linesToHtml([
    ...submissionMetaRows(payload, '/api/reference-request'),
    ['Name', name],
    ['Email', email],
    ['Practice', practiceName],
    ['Practice location', location],
    ['Viewing specialty page', pageSpecialty || ''],
    ['Page slug', pageSlug || ''],
    ['Reference client', referenceClient || 'Closest match'],
    ['Case study', referenceCaseMeta || ''],
    ['Note', note || ''],
  ])

  const intro = referenceClient
    ? `<strong>${escapeHtml(name)}</strong> requested a reference call with <strong>${escapeHtml(referenceClient)}</strong>.`
    : `<strong>${escapeHtml(name)}</strong> requested a reference call from a current client.`

  const teamHtml = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1A1C1D"><p style="margin:0 0 24px">${intro}</p><table style="border-collapse:collapse;width:100%;max-width:560px">${table}</table></div>`

  return finalizeSubmission({
    endpoint: '/api/reference-request',
    payload,
    requestMeta,
    sendTeamEmail: () =>
      sendNotificationEmail({
        subject: `Reference request: ${practiceName} — ${name}`,
        replyTo: email,
        html: teamHtml,
      }),
    sendVisitorEmail: () =>
      sendVisitorConfirmation({
        to: email,
        subject: 'We\u2019ve received your reference request — Socialsect',
        html: referenceRequestConfirmationEmail({
          name,
          referenceClient: referenceClient || 'a practice we\u2019ve worked with',
        }),
      }),
  })
}
