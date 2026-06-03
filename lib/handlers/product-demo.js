import { HttpError } from '../http-error.js'
import {
  escapeHtml,
  linesToHtml,
  sendNotificationEmail,
  sendVisitorConfirmation,
} from '../email.js'
import { productDemoConfirmationEmail } from '../email-templates/confirmations.js'
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

function normalizeDemoOption(option) {
  const map = {
    whisper: 'Whisper',
    dashboard: 'Client Dashboard',
    both: 'Both',
  }
  return map[String(option || '').trim().toLowerCase()] ?? ''
}

export async function processProductDemo(payload = {}, requestMeta = {}) {
  const name = requireField(payload, 'name', 'Name')
  const email = requireField(payload, 'email', 'Email')
  if (!isValidEmail(email)) {
    throw new HttpError('A valid email address is required')
  }

  const company = String(payload.company ?? '').trim()
  const demoOption = normalizeDemoOption(requireField(payload, 'demoOption', 'Demo request'))
  if (!demoOption) {
    throw new HttpError('Choose Whisper, Client Dashboard, or Both.')
  }

  const message = String(payload.message ?? '').trim()

  const table = linesToHtml([
    ...submissionMetaRows(payload, '/api/product-demo'),
    ['Name', name],
    ['Email', email],
    ['Practice or company', company || 'Not provided'],
    ['Requested demo', demoOption],
    ['Message', message],
  ])

  const intro = `New demo request from <strong>${escapeHtml(name)}</strong> ${company ? `at <strong>${escapeHtml(company)}</strong>` : ''}.`
  const teamHtml = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1A1C1D"><p style="margin:0 0 24px">${intro}</p><table style="border-collapse:collapse;width:100%;max-width:560px">${table}</table></div>`

  return finalizeSubmission({
    endpoint: '/api/product-demo',
    payload,
    requestMeta,
    sendTeamEmail: () =>
      sendNotificationEmail({
        subject: `Product demo request: ${demoOption} — ${name}`,
        replyTo: email,
        html: teamHtml,
      }),
    sendVisitorEmail: () =>
      sendVisitorConfirmation({
        to: email,
        subject: 'Thanks for requesting a demo — Socialsect',
        html: productDemoConfirmationEmail({ name, demoOption }),
      }),
  })
}
