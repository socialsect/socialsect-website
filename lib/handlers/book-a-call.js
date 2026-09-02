import { HttpError } from '../http-error.js'
import {
  escapeHtml,
  linesToHtml,
  sendNotificationEmail,
  sendVisitorConfirmation,
} from '../email.js'
import { bookACallConfirmationEmail } from '../email-templates/confirmations.js'
import { finalizeSubmission } from '../finalize-submission.js'
import { submissionMetaRows } from '../submission-meta.js'

function requireField(payload, key, label = key) {
  const value = payload[key]
  if (value == null || String(value).trim() === '') {
    throw new HttpError(`${label} is required`)
  }
  return String(value).trim()
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function processBookACall(payload = {}, requestMeta = {}) {
  const name = requireField(payload, 'name', 'Name')
  const email = requireField(payload, 'email', 'Email')
  if (!isValidEmail(email)) {
    throw new HttpError('A valid email address is required')
  }

  const practiceName = requireField(payload, 'practiceName', 'Practice name')
  const specialty =
    payload.specialty === 'Other'
      ? (payload.specialtyOther || 'Other')
      : requireField(payload, 'specialty', 'Specialty')
  const whatsapp = payload.whatsapp || ''
  const challenge = payload.challenge || ''
  const referral = payload.referral || ''
  const location = payload.location || ''
  const locations = payload.locations || ''
  const marketing = payload.marketing || ''
  const goals = Array.isArray(payload.goals) ? payload.goals : []

  const rows = [
    ['Name', name],
    ['WhatsApp', whatsapp],
    ['Practice', practiceName],
    ['Specialty', specialty],
  ]
  if (location) rows.push(['Location', location])
  if (locations) rows.push(['Locations', locations])
  if (marketing) rows.push(['Marketing', marketing])
  if (challenge) rows.push(['Challenge', challenge])
  if (referral) rows.push(['How they found us', referral])
  if (goals.length) rows.push(['Goals', goals])

  const table = linesToHtml([
    ...submissionMetaRows(payload, '/api/book-a-call'),
    ...rows,
  ])

  const intro = `New book-a-call submission from <strong>${escapeHtml(name)}</strong> at <strong>${escapeHtml(practiceName)}</strong>.`
  const teamHtml = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1A1C1D"><p style="margin:0 0 24px">${intro}</p><table style="border-collapse:collapse;width:100%;max-width:560px">${table}</table></div>`

  return finalizeSubmission({
    endpoint: '/api/book-a-call',
    payload,
    requestMeta,
    sendTeamEmail: () =>
      sendNotificationEmail({
        subject: `Book a call: ${practiceName}  ${name}`,
        replyTo: email,
        html: teamHtml,
      }),
    sendVisitorEmail: () =>
      sendVisitorConfirmation({
        to: email,
        subject: 'We\u2019ve received your submission  Socialsect',
        html: bookACallConfirmationEmail({ name, practiceName }),
      }),
  })
}
