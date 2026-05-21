import { getSupabaseAdmin, isSupabaseConfigured } from './supabase.js'
import { resolveFormType, resolveSourcePageUrl } from './submission-meta.js'

function parseUrlParts(sourcePageUrl) {
  if (!sourcePageUrl) {
    return {
      source_page_url: null,
      source_page_path: null,
      source_page_host: null,
    }
  }
  try {
    const u = new URL(sourcePageUrl)
    return {
      source_page_url: sourcePageUrl,
      source_page_path: `${u.pathname}${u.search}`,
      source_page_host: u.host,
    }
  } catch {
    return {
      source_page_url: sourcePageUrl,
      source_page_path: null,
      source_page_host: null,
    }
  }
}

/** Full submission body for export / tally (no secrets). */
function buildPayloadSnapshot(payload = {}) {
  const copy = { ...payload }
  delete copy._meta
  return copy
}

function resolveSpecialty(payload) {
  if (payload.specialty === 'Other' && payload.specialtyOther) {
    return String(payload.specialtyOther).trim()
  }
  return (
    String(payload.specialty ?? '').trim() ||
    String(payload.pageSpecialty ?? '').trim() ||
    null
  )
}

/**
 * Insert one row after team + visitor emails. Never throws to the caller.
 */
export async function logSubmission({
  endpoint,
  payload = {},
  visitorEmailSent = false,
  teamEmailId = null,
  requestMeta = {},
}) {
  if (!isSupabaseConfigured()) {
    console.warn('[submission-log] Supabase not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
    return null
  }

  const client = getSupabaseAdmin()
  if (!client) return null

  const formType = resolveFormType(payload, endpoint)
  const sourcePageUrl = resolveSourcePageUrl(payload)
  const urlParts = parseUrlParts(sourcePageUrl)
  const goals = Array.isArray(payload.goals) ? payload.goals : []

  const row = {
    form_type: formType || endpoint,
    endpoint,
    ...urlParts,
    submitter_name: String(payload.name ?? '').trim() || null,
    submitter_email: String(payload.email ?? '').trim() || null,
    practice_name: String(payload.practiceName ?? '').trim() || null,
    specialty: resolveSpecialty(payload),
    practice_location: String(payload.location ?? '').trim() || null,
    locations_count: String(payload.locations ?? '').trim() || null,
    marketing_status: String(payload.marketing ?? '').trim() || null,
    challenge_text: String(payload.challenge ?? '').trim() || null,
    referral_source: String(payload.referral ?? '').trim() || null,
    note: String(payload.note ?? '').trim() || null,
    newsletter_placement: String(payload.source ?? '').trim() || null,
    resource_title: String(payload.resourceTitle ?? '').trim() || null,
    resource_type: String(payload.resourceType ?? '').trim() || null,
    reference_client: String(payload.referenceClient ?? '').trim() || null,
    reference_case_meta: String(payload.referenceCaseMeta ?? '').trim() || null,
    page_specialty: String(payload.pageSpecialty ?? '').trim() || null,
    page_slug: String(payload.pageSlug ?? '').trim() || null,
    team_email_sent: true,
    visitor_email_sent: Boolean(visitorEmailSent),
    team_email_id: teamEmailId ? String(teamEmailId) : null,
    user_agent: String(requestMeta.userAgent ?? '').trim() || null,
    environment:
      process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    payload: {
      ...buildPayloadSnapshot(payload),
      goals: goals.length ? goals : undefined,
    },
  }

  try {
    const { data, error } = await client
      .from('submissions')
      .insert(row)
      .select('id')
      .single()

    if (error) {
      console.error('[submission-log] Supabase insert failed:', error.message)
      return null
    }

    return data
  } catch (err) {
    console.error('[submission-log] Unexpected error:', err.message)
    return null
  }
}
