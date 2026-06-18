/**
 * Website Audit Handler
 * 
 * Collects user info (name, email, website URL)
 * Runs PageSpeed analysis
 * Sends results to LLM for formatting
 * Returns formatted audit report
 */

import { HttpError } from '../http-error.js'
import { analyzePageSpeed } from '../ai/pagespeed-analyzer.js'
import { generateAuditReport } from '../ai/audit-formatter.js'

export async function processAudit(payload = {}) {
  console.log('[AUDIT] Received payload:', JSON.stringify(payload))
  
  const { name, email, website, conversationHistory = [] } = payload

  // Validate inputs
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new HttpError('Name is required', 400)
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new HttpError('Valid email is required', 400)
  }

  if (!website || typeof website !== 'string' || website.trim().length === 0) {
    throw new HttpError('Website URL is required', 400)
  }

  try {
    console.log('[AUDIT] Processing audit for:', website)

    // Normalize URL (add https:// if missing)
    let normalizedURL = website.trim()
    if (!normalizedURL.startsWith('http://') && !normalizedURL.startsWith('https://')) {
      normalizedURL = 'https://' + normalizedURL
    }

    // Step 1: Analyze website with PageSpeed
    console.log('[AUDIT] Running PageSpeed analysis...')
    const pagespeedResult = await analyzePageSpeed(normalizedURL)

    if (!pagespeedResult.success) {
      console.error('[AUDIT] PageSpeed analysis failed:', pagespeedResult.error)
      throw new HttpError(`Website analysis failed: ${pagespeedResult.error}`, 500)
    }

    const pageSpeedAnalysis = pagespeedResult.analysis

    // Step 2: Generate formatted report using LLM
    console.log('[AUDIT] Generating formatted report...')
    const reportResult = await generateAuditReport(
      name,
      website,
      pageSpeedAnalysis,
      conversationHistory
    )

    if (!reportResult.success) {
      console.error('[AUDIT] Report generation failed:', reportResult.error)
      throw new HttpError(`Failed to generate report: ${reportResult.error}`, 500)
    }

    // Step 3: Return results
    console.log('[AUDIT] Audit complete')
    return {
      success: true,
      audit: {
        name,
        email,
        website: normalizedURL,
        timestamp: new Date().toISOString(),
        pageSpeedData: pageSpeedAnalysis,
        formattedReport: reportResult.report,
        recommendations: reportResult.recommendations
      }
    }
  } catch (error) {
    console.error('[AUDIT] Error:', error)
    throw error
  }
}
