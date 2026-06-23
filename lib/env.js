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
resend email check if fails fall bac to onboardig one 
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

export function getNotifyRecipients() {
  const listed = parseEmailList(getEnv('RESEND_NOTIFY_EMAILS'))
  if (listed.length) return listed

  const legacy = getEnv('RESEND_TO_EMAIL')
  if (legacy) return [legacy]

  return ['hello@gosocialsect.com']
}

export function getNotifyCc() {
  return parseEmailList(getEnv('RESEND_CC_EMAILS'))
}

export function getResendConfig() {
  const timestamp = new Date().toISOString();
  const apiKey = getEnv('RESEND_API_KEY');
  const fromEmail = getEnv('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
  const notifyTo = getNotifyRecipients();
  const notifyCc = getNotifyCc();

  console.log(`[${timestamp}] RESEND CONFIG:`, {
    apiKeyConfigured: !!apiKey,
    apiKeyFormat: apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET',
    fromEmail,
    notifyTo: notifyTo.join(', '),
    notifyCc: notifyCc.length > 0 ? notifyCc.join(', ') : 'NONE',
  });

  if (!apiKey) {
    console.warn(`[${timestamp}] WARNING: RESEND_API_KEY not configured!`);
  }
  if (!fromEmail) {
    console.warn(`[${timestamp}] WARNING: RESEND_FROM_EMAIL not configured!`);
  }
  if (!notifyTo || notifyTo.length === 0) {
    console.warn(`[${timestamp}] WARNING: RESEND_NOTIFY_EMAILS not configured!`);
  }

  return {
    apiKey: apiKey,
    from: buildFromAddress(),
    fromEmail: parseEmailAddress(fromEmail),
    notifyTo,
    notifyCc,
  }
}

export function getPageSpeedApiKey() {
  const timestamp = new Date().toISOString();
  const key = getEnv('GOOGLE_PAGESPEED_API_KEY') || getEnv('PAGESPEED_API_KEY');
  
  if (!key) {
    console.warn(`[${timestamp}] WARNING: GOOGLE_PAGESPEED_API_KEY not configured! Will use mock data.`);
  } else {
    console.log(`[${timestamp}] ✓ GOOGLE_PAGESPEED_API_KEY configured (${key.substring(0, 10)}...)`);
  }
  
  return key;
}
