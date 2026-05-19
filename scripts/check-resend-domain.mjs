/**
 * Run from socialsect-website/: node scripts/check-resend-domain.mjs
 * Loads .env and prints Resend domain status vs your RESEND_FROM_EMAIL.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import { Resend } from 'resend'
import { buildFromAddress, parseEmailAddress } from '../lib/env.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
Object.assign(process.env, loadEnv('development', root, ''))

const apiKey = process.env.RESEND_API_KEY
const fromRaw = process.env.RESEND_FROM_EMAIL || ''
const fromSent = buildFromAddress()
const fromAddress = parseEmailAddress(fromRaw || fromSent)
const fromDomain = fromAddress.includes('@') ? fromAddress.split('@')[1] : '(could not parse)'

if (!apiKey) {
  console.error('Missing RESEND_API_KEY in socialsect-website/.env')
  process.exit(1)
}

console.log('\n--- Your .env sender ---')
console.log('RESEND_FROM_EMAIL (raw):', fromRaw || '(not set)')
console.log('Actually sent as FROM:', fromSent)
console.log('Parsed domain:', fromDomain)

const resend = new Resend(apiKey)
const { data, error } = await resend.domains.list()

if (error) {
  console.error('\nResend API error:', error.message)
  process.exit(1)
}

console.log('\n--- Domains on THIS API key\'s account ---')
if (!data?.data?.length) {
  console.log('(none — add gosocialsect.com under Resend → Domains)')
} else {
  for (const d of data.data) {
    const mark = d.name === fromDomain ? ' ← should match FROM domain' : ''
    console.log(`  ${d.name}  status: ${d.status}${mark}`)
  }
}

console.log('\nIf status is not "verified" for', fromDomain + ', emails will fail in the dashboard.')
console.log('Quick test sender (only to your Resend login email): RESEND_FROM_EMAIL=onboarding@resend.dev\n')
