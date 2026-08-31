import { HttpError } from '../http-error.js'
import { escapeHtml, linesToHtml, sendNotificationEmail, sendVisitorConfirmation } from '../email.js'
import { finalizeSubmission } from '../finalize-submission.js'
import { submissionMetaRows } from '../submission-meta.js'

function requireField(payload, key, label = key) {
  const value = payload[key]
  if (value == null || String(value).trim() === '') {
    throw new HttpError(`${label} is required`)
  }
  return String(value).trim()
}

export async function processTalkToRay(payload = {}, requestMeta = {}) {
  const name = requireField(payload, 'name', 'Name')
  const email = requireField(payload, 'email', 'Email')
  const message = requireField(payload, 'message', 'Message')

  const table = linesToHtml([
    ...submissionMetaRows(payload, '/api/talk-to-ray'),
    ['Name', name],
    ['Email', email],
    ['Message', message],
  ])

  const intro = `New "Talk to Ray" submission from <strong>${escapeHtml(name)}</strong>.`
  const teamHtml = `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.5;color:#1A1C1D"><p style="margin:0 0 24px">${intro}</p><table style="border-collapse:collapse;width:100%;max-width:560px">${table}</table></div>`

  const visitorHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family:'Inter',-apple-system,sans-serif;line-height:1.6;color:#1a1c1d;margin:0;padding:0">
<div style="max-width:600px;margin:0 auto;background:#ffffff">
  <div style="background:linear-gradient(135deg,#695AF2,#8f83ff);padding:40px 20px;text-align:center;color:#fff">
    <h1 style="margin:0;font-size:24px">We got your message</h1>
  </div>
  <div style="padding:40px 20px">
    <p>Hi ${escapeHtml(name)},</p>
    <p>Thanks for reaching out. Ray will review your message and get back to you within 24 hours.</p>
    <p>If there\u2019s something worth discussing, he\u2019ll come meet you personally in the UAE.</p>
    <p style="color:#888;font-size:14px;margin-top:32px">\u2014 Ray &amp; the Socialsect team</p>
  </div>
  <div style="background:#f9f9f9;padding:20px;text-align:center;font-size:12px;color:#999;border-top:1px solid #e0e0e0">
    <p style="margin:0">\u00a9 2024 Socialsect. Marketing for private medical practices.</p>
  </div>
</div>
</body>
</html>`

  return finalizeSubmission({
    endpoint: '/api/talk-to-ray',
    payload,
    requestMeta,
    sendTeamEmail: () =>
      sendNotificationEmail({
        subject: `Talk to Ray: ${name} — ${email}`,
        replyTo: email,
        html: teamHtml,
      }),
    sendVisitorEmail: () =>
      sendVisitorConfirmation({
        to: email,
        subject: 'Thanks for reaching out \u2014 Ray will be in touch',
        html: visitorHtml,
      }),
  })
}
