/**
 * PageSpeed Insights API Integration
 * 
 * Analyzes website performance, Core Web Vitals, and SEO using Google's PageSpeed API
 * Returns: Lighthouse scores, Core Web Vitals, and performance recommendations
 */

import { getEnv } from '../env.js'

const PAGESPEED_API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

export async function analyzePageSpeed(url) {
  try {
    const apiKey = getEnv('GOOGLE_PAGESPEED_API_KEY')
    
    if (!apiKey) {
      console.log('[PAGESPEED] API key not configured, skipping analysis')
      return {
        success: false,
        error: 'PageSpeed API not configured',
        skipped: true
      }
    }

    console.log('[PAGESPEED] Analyzing:', url)

    // Fetch PageSpeed report
    const response = await fetch(
      `${PAGESPEED_API}?url=${encodeURIComponent(url)}&key=${apiKey}&category=performance&category=accessibility&category=best-practices&category=seo`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[PAGESPEED] API error:', response.status, errorData)
      return {
        success: false,
        error: `PageSpeed API error: ${response.status}`
      }
    }

    const data = await response.json()

    if (!data.lighthouseResult) {
      console.error('[PAGESPEED] No lighthouse result in response')
      return {
        success: false,
        error: 'Invalid PageSpeed response'
      }
    }

    // Extract scores
    const scores = {
      performance: data.lighthouseResult.categories.performance?.score * 100 || 0,
      accessibility: data.lighthouseResult.categories.accessibility?.score * 100 || 0,
      bestPractices: data.lighthouseResult.categories['best-practices']?.score * 100 || 0,
      seo: data.lighthouseResult.categories.seo?.score * 100 || 0
    }

    // Extract Core Web Vitals
    const metrics = data.lighthouseResult.audits.metrics?.details?.items?.[0] || {}
    const coreWebVitals = {
      lcp: metrics.largest_contentful_paint_ms ? Math.round(metrics.largest_contentful_paint_ms) : null,
      fid: metrics.first_input_delay_ms ? Math.round(metrics.first_input_delay_ms) : null,
      cls: metrics.cumulative_layout_shift ? Math.round(metrics.cumulative_layout_shift * 1000) / 1000 : null,
      fcp: metrics.first_contentful_paint_ms ? Math.round(metrics.first_contentful_paint_ms) : null,
      ttfb: metrics.server_response_time_ms ? Math.round(metrics.server_response_time_ms) : null
    }

    // Extract key opportunities (top 3)
    const opportunities = extractOpportunities(data.lighthouseResult.audits)

    // Score interpretation
    const scoreStatus = (score) => {
      if (score >= 90) return 'excellent'
      if (score >= 50) return 'good'
      return 'poor'
    }

    const analysis = {
      url,
      timestamp: new Date().toISOString(),
      scores: {
        performance: Math.round(scores.performance),
        accessibility: Math.round(scores.accessibility),
        bestPractices: Math.round(scores.bestPractices),
        seo: Math.round(scores.seo),
        performanceStatus: scoreStatus(scores.performance),
        accessibilityStatus: scoreStatus(scores.accessibility),
        bestPracticesStatus: scoreStatus(scores.bestPractices),
        seoStatus: scoreStatus(scores.seo)
      },
      coreWebVitals: {
        lcp: coreWebVitals.lcp,
        lcpStatus: lcpStatus(coreWebVitals.lcp),
        fid: coreWebVitals.fid,
        fidStatus: fidStatus(coreWebVitals.fid),
        cls: coreWebVitals.cls,
        clsStatus: clsStatus(coreWebVitals.cls),
        fcp: coreWebVitals.fcp,
        ttfb: coreWebVitals.ttfb
      },
      opportunities: opportunities,
      summary: generateSummary(scores, coreWebVitals)
    }

    console.log('[PAGESPEED] Analysis complete:', analysis.scores)

    return {
      success: true,
      analysis: analysis
    }
  } catch (error) {
    console.error('[PAGESPEED] Error:', error.message)
    return {
      success: false,
      error: error.message || 'PageSpeed analysis failed'
    }
  }
}

function extractOpportunities(audits) {
  const opportunities = []

  // Key opportunity audits to check
  const opportunityAudits = [
    { key: 'unused-css', title: 'Remove unused CSS' },
    { key: 'unused-javascript', title: 'Remove unused JavaScript' },
    { key: 'modern-image-formats', title: 'Serve images in modern formats' },
    { key: 'offscreen-images', title: 'Defer offscreen images' },
    { key: 'minify-css', title: 'Minify CSS' },
    { key: 'minify-javascript', title: 'Minify JavaScript' },
    { key: 'render-blocking-resources', title: 'Eliminate render-blocking resources' }
  ]

  for (const opp of opportunityAudits) {
    const audit = audits[opp.key]
    if (audit && audit.score < 1) {
      opportunities.push({
        title: opp.title,
        impact: audit.metricSavings?.savings || null,
        description: audit.description
      })
      if (opportunities.length >= 3) break
    }
  }

  return opportunities
}

function generateSummary(scores, coreWebVitals) {
  const avgScore = (scores.performance + scores.accessibility + scores.bestPractices + scores.seo) / 4
  
  const issues = []
  
  if (scores.performance < 50) issues.push('Performance is poor')
  if (scores.seo < 50) issues.push('SEO needs improvement')
  if (scores.accessibility < 50) issues.push('Accessibility needs work')
  if (coreWebVitals.lcp && coreWebVitals.lcp > 4000) issues.push('Loading time is slow')

  if (issues.length === 0) {
    return 'Your website is performing well overall. Keep monitoring and optimizing.'
  }

  return `Key issues to address: ${issues.join(', ')}.`
}

// Core Web Vitals status helpers
function lcpStatus(lcp) {
  if (!lcp) return 'unknown'
  if (lcp <= 2500) return 'good'
  if (lcp <= 4000) return 'needs-improvement'
  return 'poor'
}

function fidStatus(fid) {
  if (!fid) return 'unknown'
  if (fid <= 100) return 'good'
  if (fid <= 300) return 'needs-improvement'
  return 'poor'
}

function clsStatus(cls) {
  if (!cls) return 'unknown'
  if (cls <= 0.1) return 'good'
  if (cls <= 0.25) return 'needs-improvement'
  return 'poor'
}
