import { HttpError } from '../http-error.js'
import { escapeHtml, linesToHtml, sendNotificationEmail } from '../email.js'
import { finalizeSubmission } from '../finalize-submission.js'
import { submissionMetaRows } from '../submission-meta.js'

function requireField(payload, key, label = key) {
  const value = payload[key]
  if (value == null || String(value).trim() === '') {
    throw new HttpError(`${label} is required`)
  }
  return String(value).trim()
}

export async function processUaeKarak(payload = {}, requestMeta = {}) {
  const name = requireField(payload, 'name', 'Name')
  const clinic = requireField(payload, 'clinic', 'Clinic name')
  const location = requireField(payload, 'location', 'UAE location')
  const goal = requireField(payload, 'goal', 'Goal')
  const whatsapp = requireField(payload, 'whatsapp', 'WhatsApp number')
  const language = requireField(payload, 'language', 'Preferred language')

  const website = String(payload.website ?? '').trim()
  const consent = payload.consent === true || payload.consent === 'true'

  const table = linesToHtml([
    ...submissionMetaRows(payload, '/api/uae-karak'),
    ['Name', name],
    ['Clinic', clinic],
    ['Website / Instagram', website || '—'],
    ['UAE Location', location],
    ['Goal', goal],
    ['WhatsApp', whatsapp],
    ['Preferred Language', language],
    ['Consent', consent ? 'Yes' : 'No'],
  ])

  const intro = `New UAE karak submission from <strong>${escapeHtml(name)}</strong> at <strong>${escapeHtml(clinic)}</strong>.`
  const teamHtml = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1A1C1D"><p style="margin:0 0 24px">${intro}</p><table style="border-collapse:collapse;width:100%;max-width:560px">${table}</table></div>`

  return finalizeSubmission({
    endpoint: '/api/uae-karak',
    payload,
    requestMeta,
    sendTeamEmail: () =>
      sendNotificationEmail({
        subject: `UAE Karak: ${clinic} — ${name}`,
        replyTo: undefined,
        html: teamHtml,
      }),
    sendVisitorEmail: () => Promise.resolve(),
  })
}
