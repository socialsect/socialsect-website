import { createClient } from '@supabase/supabase-js'
import { getEnv } from './env.js'

let adminClient = null

/**
 * Supabase JS expects the project root URL, not the REST endpoint.
 * Dashboard sometimes shows: https://xxx.supabase.co/rest/v1/ — strip that suffix.
 */
export function normalizeSupabaseUrl(raw) {
  if (!raw) return ''
  return raw.trim().replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '')
}

export function isSupabaseConfigured() {
  return Boolean(getEnv('SUPABASE_URL') && getEnv('SUPABASE_SERVICE_ROLE_KEY'))
}

/** Server-only client (service role). Never expose this key to the browser. */
export function getSupabaseAdmin() {
  if (adminClient) return adminClient

  const url = normalizeSupabaseUrl(getEnv('SUPABASE_URL'))
  const serviceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY')?.trim()
  if (!url || !serviceRoleKey) return null

  if (!url.includes('.supabase.co')) {
    console.warn('[supabase] SUPABASE_URL should look like https://YOUR_REF.supabase.co')
  }

  adminClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return adminClient
}
