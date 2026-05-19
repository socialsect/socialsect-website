import { HttpError } from '../http-error.js'
import {
  escapeHtml,
  linesToHtml,
  sendNotificationEmail,
  sendVisitorConfirmation,
} from '../email.js'
import { bookACallConfirmationEmail } from '../email-templates/confirmations.js'

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

export async function processBookACall(payload = {}) {
  const name = requireField(payload, 'name', 'Name')
  const email = requireField(payload, 'email', 'Email')
  if (!isValidEmail(email)) {
    throw new HttpError('A valid email address is required')
  }

  const practiceName = requireField(payload, 'practiceName', 'Practice name')
  const specialty =
    payload.specialty === 'Other'
      ? requireField(payload, 'specialtyOther', 'Specialty')
      : requireField(payload, 'specialty', 'Specialty')
  const location = requireField(payload, 'location', 'Location')
  const locations = requireField(payload, 'locations', 'Number of locations')
  const marketing = requireField(payload, 'marketing', 'Current marketing')
  const challenge = requireField(payload, 'challenge', 'Challenge')
  const referral = requireField(payload, 'referral', 'Referral source')
  const goals = Array.isArray(payload.goals) ? payload.goals : []

  const table = linesToHtml([
    ['Name', name],
    ['Email', email],
    ['Practice', practiceName],
    ['Specialty', specialty],
    ['Location', location],
    ['Locations', locations],
    ['Marketing', marketing],
    ['Goals', goals.length ? goals : ''],
    ['Challenge', challenge],
    ['How they found us', referral],
  ])

  const intro = `New book-a-call submission from <strong>${escapeHtml(name)}</strong> at <strong>${escapeHtml(practiceName)}</strong>.`
  const teamHtml = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1A1C1D"><p style="margin:0 0 24px">${intro}</p><table style="border-collapse:collapse;width:100%;max-width:560px">${table}</table></div>`

  await sendNotificationEmail({
    subject: `Book a call: ${practiceName}  ${name}`,
    replyTo: email,
    html: teamHtml,
  })

  try {
    await sendVisitorConfirmation({
      to: email,
      subject: 'We\u2019ve received your submission  Socialsect',
      html: bookACallConfirmationEmail({ name, practiceName }),
    })
  } catch (visitorErr) {
    console.error('[book-a-call] Visitor confirmation failed:', visitorErr.message)
  }

  return { ok: true }
}
