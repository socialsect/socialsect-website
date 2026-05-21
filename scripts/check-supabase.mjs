/**
 * Run from socialsect-website/: node scripts/check-supabase.mjs
 * Loads .env and tests one insert into public.submissions (then deletes the test row).
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { createClient } from '@supabase/supabase-js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
Object.assign(process.env, loadEnv('development', root, ''))

function normalizeSupabaseUrl(raw) {
  if (!raw) return ''
  return raw.trim().replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '')
}

const url = normalizeSupabaseUrl(process.env.SUPABASE_URL)
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

console.log('Using URL:', url)

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const testRow = {
  form_type: 'Health check',
  endpoint: '/scripts/check-supabase',
  submitter_email: 'healthcheck@gosocialsect.com',
  payload: { test: true },
}

const { data, error } = await supabase.from('submissions').insert(testRow).select('id').single()

if (error) {
  console.error('Insert failed:', error.message)
  if (/invalid path/i.test(error.message)) {
    console.error('\nFix .env: SUPABASE_URL should be https://YOUR_REF.supabase.co (no /rest/v1/)')
  }
  process.exit(1)
}

console.log('Insert OK, id:', data.id)

const { error: delErr } = await supabase.from('submissions').delete().eq('id', data.id)
if (delErr) console.warn('Cleanup delete failed (you can remove the test row manually):', delErr.message)
else console.log('Test row removed.')
