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
import { getNotifyBcc } from '../env.js'

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

  const phone = requireField(payload, 'phone', 'Phone number')
  const website = requireField(payload, 'website', 'Practice website')
  const specialty =
    payload.specialty === 'Other'
      ? (payload.specialtyOther || 'Other')
      : requireField(payload, 'specialty', 'Specialty')
  const challenge = payload.challenge || ''

  // Optional fields kept for backward compatibility (e.g. BookMeetingModal)
  const practiceName = payload.practiceName || ''
  const whatsapp = payload.whatsapp || ''
  const referral = payload.referral || ''
  const location = payload.location || ''
  const locations = payload.locations || ''
  const marketing = payload.marketing || ''
  const goals = Array.isArray(payload.goals) ? payload.goals : []
  const role = payload.role || ''

  const ROLE_LABELS = {
    clinic_owner: 'Clinic Owner / Manager',
    doctor: 'Doctor / Clinician',
    patient: 'Patient',
  }

  const rows = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone],
    ['Website', website],
    ['Specialty', specialty],
  ]
  if (practiceName) rows.push(['Practice', practiceName])
  if (whatsapp) rows.push(['WhatsApp', whatsapp])
  if (role) rows.push(['Role', ROLE_LABELS[role] || role])
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

  const practiceLabel = practiceName || specialty
  const intro = `New book-a-call submission from <strong>${escapeHtml(name)}</strong>${practiceLabel ? ` at <strong>${escapeHtml(practiceLabel)}</strong>` : ''}.`
  const teamHtml = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1A1C1D"><p style="margin:0 0 24px">${intro}</p><table style="border-collapse:collapse;width:100%;max-width:560px">${table}</table></div>`

  const bcc = getNotifyBcc()

  return finalizeSubmission({
    endpoint: '/api/book-a-call',
    payload,
    requestMeta,
    sendTeamEmail: () =>
      sendNotificationEmail({
        subject: `Book a call: ${practiceLabel} — ${name}`,
        replyTo: email,
        html: teamHtml,
        bcc,
      }),
    sendVisitorEmail: () =>
      sendVisitorConfirmation({
        to: email,
        subject: 'We\u2019ve received your submission \u2014 Socialsect',
        html: bookACallConfirmationEmail({ name, practiceName, specialty }),
      }),
  })
}
