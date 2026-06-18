#!/usr/bin/env node

/**
 * PageSpeed API Key Verification Script
 * 
 * Tests if your GOOGLE_PAGESPEED_API_KEY is valid and working
 * Usage: node verify-pagespeed.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { analyzePageSpeed } from './lib/ai/pagespeed-analyzer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Read .env file manually
function loadEnv() {
  const envPath = path.join(__dirname, '.env')
  if (!fs.existsSync(envPath)) {
    return {}
  }
  
  const envContent = fs.readFileSync(envPath, 'utf-8')
  const env = {}
  
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value && !key.startsWith('#')) {
      env[key.trim()] = value.trim()
    }
  })
  
  return env
}

const env = loadEnv()

async function verifyPageSpeedAPI() {
  console.log('════════════════════════════════════════════════════════════')
  console.log('🔍 PageSpeed API Verification')
  console.log('════════════════════════════════════════════════════════════\n')

  try {
    // Step 1: Check if API key exists
    console.log('Step 1: Checking if API key is configured...')
    const apiKey = env.GOOGLE_PAGESPEED_API_KEY || process.env.GOOGLE_PAGESPEED_API_KEY
    
    if (!apiKey) {
      console.log('❌ GOOGLE_PAGESPEED_API_KEY not found in environment')
      console.log('\nTo fix:')
      console.log('1. Add to .env: GOOGLE_PAGESPEED_API_KEY=your_key_here')
      console.log('2. Or add to Vercel: Settings → Environment Variables')
      process.exit(1)
    }

    console.log('✅ API key found')
    console.log(`   Key (first 10 chars): ${apiKey.substring(0, 10)}...`)
    console.log(`   Key length: ${apiKey.length} characters\n`)

    // Step 2: Test with a known website
    console.log('Step 2: Testing API call with google.com...')
    console.log('(This may take 30-60 seconds)\n')

    const result = await analyzePageSpeed('https://www.google.com')

    if (!result.success) {
      console.log(`❌ API call failed: ${result.error}`)
      console.log('\nPossible fixes:')
      console.log('1. Verify API key is correct')
      console.log('2. Check API key is enabled for PageSpeed Insights API')
      console.log('3. Check Google Cloud Console quota')
      console.log('4. Verify API key has the right permissions')
      process.exit(1)
    }

    console.log('✅ API call successful!\n')

    // Step 3: Display results
    console.log('Step 3: Displaying analysis results...\n')
    
    const { analysis } = result
    
    console.log('Lighthouse Scores:')
    console.log(`  Performance:     ${analysis.scores.performance}/100 (${analysis.scores.performanceStatus})`)
    console.log(`  Accessibility:   ${analysis.scores.accessibility}/100 (${analysis.scores.accessibilityStatus})`)
    console.log(`  Best Practices:  ${analysis.scores.bestPractices}/100 (${analysis.scores.bestPracticesStatus})`)
    console.log(`  SEO:             ${analysis.scores.seo}/100 (${analysis.scores.seoStatus})\n`)

    console.log('Core Web Vitals:')
    console.log(`  LCP (Loading):   ${analysis.coreWebVitals.lcp}ms (${analysis.coreWebVitals.lcpStatus})`)
    console.log(`  FID (Interaction): ${analysis.coreWebVitals.fid}ms (${analysis.coreWebVitals.fidStatus})`)
    console.log(`  CLS (Stability):   ${analysis.coreWebVitals.cls} (${analysis.coreWebVitals.clsStatus})`)
    console.log(`  FCP (Paint):     ${analysis.coreWebVitals.fcp}ms`)
    console.log(`  TTFB (Server):   ${analysis.coreWebVitals.ttfb}ms\n`)

    if (analysis.opportunities.length > 0) {
      console.log('Top Optimization Opportunities:')
      analysis.opportunities.forEach((opp, i) => {
        console.log(`  ${i + 1}. ${opp.title}`)
        if (opp.impact) {
          console.log(`     Potential savings: ${opp.impact}ms`)
        }
      })
      console.log()
    }

    console.log('Summary:')
    console.log(`  ${analysis.summary}\n`)

    console.log('════════════════════════════════════════════════════════════')
    console.log('✅ PageSpeed API is working correctly!')
    console.log('════════════════════════════════════════════════════════════\n')

    console.log('Next steps:')
    console.log('1. Test with your own website (update URL in code)')
    console.log('2. Integrate with chat system')
    console.log('3. Update system prompt to suggest PageSpeed analysis\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Verification failed:', error.message)
    console.error('\nFull error:', error)
    process.exit(1)
  }
}

// Run verification
verifyPageSpeedAPI()
