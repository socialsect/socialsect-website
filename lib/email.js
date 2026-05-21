import { Resend } from 'resend'
import { getResendConfig } from './env.js'

function getClient() {
  const { apiKey } = getResendConfig()
  return new Resend(apiKey)
}

function formatResendError(error) {
  const message = error?.message || 'Failed to send email'
  const name = error?.name ? `${error.name}: ` : ''

  if (/domain|verify|not verified|403/i.test(message)) {
    return `${name}${message}  In Resend, open Domains → add gosocialsect.com → add all DNS records → wait until status is Verified. Until then, set RESEND_FROM_EMAIL=onboarding@resend.dev (test only).`
  }

  if (/only send.*your own email|testing/i.test(message)) {
    return `${name}${message}  With onboarding@resend.dev you can only send to the email address on your Resend account. Use a verified custom domain to email visitors.`
  }

  return `${name}${message}`
}

function dedupeEmails(addresses) {
  const seen = new Set()
  return addresses.filter((addr) => {
    const key = addr.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export async function sendEmail({ to, cc, subject, html, replyTo }) {
  const { from } = getResendConfig()
  const resend = getClient()

  const toList = dedupeEmails(Array.isArray(to) ? to : [to])
  const ccList = dedupeEmails(
    (cc ?? []).filter((addr) => !toList.some((t) => t.toLowerCase() === addr.toLowerCase())),
  )

  const { data, error } = await resend.emails.send({
    from,
    to: toList,
    cc: ccList.length ? ccList : undefined,
    subject,
    html,
    replyTo: replyTo || undefined,
  })

  if (error) {
    throw new Error(formatResendError(error))
  }

  if (!data?.id) {
    throw new Error('Resend did not return a message id. Check your API key and sender domain.')
  }

  return data
}

/** Internal team alert (book a call, newsletter signup, resource request). */
export async function sendNotificationEmail({ subject, html, replyTo }) {
  const { notifyTo, notifyCc } = getResendConfig()
  return sendEmail({
    to: notifyTo,
    cc: notifyCc,
    subject,
    html,
    replyTo,
  })
}

/** Branded confirmation to the person who submitted a form. */
export async function sendVisitorConfirmation({ to, subject, html }) {
  return sendEmail({ to, subject, html })
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatTableCell(value) {
  const text = Array.isArray(value) ? value.join(', ') : String(value ?? '')
  const trimmed = text.trim()
  if (/^https?:\/\//i.test(trimmed)) {
    const safe = escapeHtml(trimmed)
    return `<a href="${safe}" style="color:#695AF2;word-break:break-all">${safe}</a>`
  }
  return escapeHtml(text)
}

export function linesToHtml(rows) {
  return rows
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(([label, value]) => {
      const safe = formatTableCell(value)
      return `<tr><td style="padding:8px 16px 8px 0;color:#474555;vertical-align:top;white-space:nowrap;font-size:14px">${escapeHtml(label)}</td><td style="padding:8px 0;color:#1A1C1D;font-size:14px">${safe}</td></tr>`
    })
    .join('')
}
