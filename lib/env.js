/**
 * Server-side env (Vercel + local .env). Not exposed to the client bundle.
 */

function parseEmailList(value) {
  if (!value) return []
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function getEnv(name, { required = false } = {}) {
  const value = process.env[name]
  if (required && !value) {
    throw new Error(`${name} is not configured`)
  }
  return value
}

/** Pull bare address from "email@domain.com" or "Name <email@domain.com>". */
export function parseEmailAddress(value) {
  if (!value) return ''
  const trimmed = value.trim()
  const angle = trimmed.match(/<([^>]+)>/)
  if (angle) return angle[1].trim()
  return trimmed
}

/**
 * Resend "from"  plain email by default (best for domain verification).
 * Set RESEND_FROM_NAME only if you want "Name <email@domain.com>".
 */
export function buildFromAddress() {
  const email = parseEmailAddress(
    getEnv('RESEND_FROM_EMAIL') || 'onboarding@resend.dev',
  )
  const displayName = getEnv('RESEND_FROM_NAME')?.trim()
  if (displayName) {
    return `${displayName} <${email}>`
  }
  return email
}

/** Addresses that receive internal “new submission” alerts. */
export function getNotifyRecipients() {
  const listed = parseEmailList(getEnv('RESEND_NOTIFY_EMAILS'))
  if (listed.length) return listed

  const legacy = getEnv('RESEND_TO_EMAIL')
  if (legacy) return [legacy]

  return ['hello@gosocialsect.com']
}

/** Optional CC on internal alerts (comma-separated). */
export function getNotifyCc() {
  return parseEmailList(getEnv('RESEND_CC_EMAILS'))
}

export function getResendConfig() {
  return {
    apiKey: getEnv('RESEND_API_KEY', { required: true }),
    from: buildFromAddress(),
    fromEmail: parseEmailAddress(getEnv('RESEND_FROM_EMAIL') || 'onboarding@resend.dev'),
    notifyTo: getNotifyRecipients(),
    notifyCc: getNotifyCc(),
  }
}
