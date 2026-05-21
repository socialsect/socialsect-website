import { logSubmission } from './log-submission.js'

/**
 * Order: 1) team notify email  2) visitor confirmation  3) Supabase log.
 * Supabase failures are logged but do not fail the HTTP response.
 */
export async function finalizeSubmission({
  endpoint,
  payload,
  requestMeta = {},
  sendTeamEmail,
  sendVisitorEmail,
}) {
  const teamResult = await sendTeamEmail()

  let visitorEmailSent = false
  try {
    await sendVisitorEmail()
    visitorEmailSent = true
  } catch (visitorErr) {
    console.error(`[${endpoint}] Visitor confirmation failed:`, visitorErr.message)
  }

  await logSubmission({
    endpoint,
    payload,
    requestMeta,
    visitorEmailSent,
    teamEmailId: teamResult?.id ?? null,
  })

  return { ok: true }
}
