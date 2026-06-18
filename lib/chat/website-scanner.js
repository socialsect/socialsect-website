/**
 * Website scanner for conversational audit
 * Fetches PageSpeed metrics and lightweight checks
 */

import { getEnv } from '../env.js'

const MAX_SIZE_KB = 5000
const TIMEOUT_MS = 30000

export async function scanWebsite(url) {
  try {
    const urlObj = new URL(url)
    const fetchUrl = urlObj.href

    console.log('[SCANNER] Starting website scan for:', fetchUrl)

    // Fetch PageSpeed metrics (non-blocking - continue even if it fails)
    console.log('[SCANNER] Fetching PageSpeed metrics...')
    const pageSpeedData = await fetchPageSpeedMetrics(fetchUrl).catch(err => {
      console.error('[SCANNER] PageSpeed fetch failed, continuing with static checks:', err.message)
      return { metrics: {}, score: null }
    })

    // Fetch basic HTML for static checks
    console.log('[SCANNER] Fetching HTML for static checks...')
    const htmlData = await fetchWebsiteHtml(fetchUrl)

    // Parse HTML for static checks
    const staticChecks = parseHtml(htmlData, urlObj.hostname)

    // Combine all checks
    const checks = {
      ...staticChecks,
      pageSpeed: pageSpeedData.metrics || {},
      pageSpeedScore: pageSpeedData.score || null,
      pageSpeedUrl: pageSpeedData.url || fetchUrl
    }

    console.log('[SCANNER] Website scan complete')

    return {
      success: true,
      website: urlObj.hostname,
      checks: checks
    }
  } catch (error) {
    console.error('[SCANNER] Error:', error.message)
    return {
      success: false,
      error: error.message || 'Failed to scan website'
    }
  }
}

async function fetchPageSpeedMetrics(url) {
  try {
    const apiKey = getEnv('GOOGLE_PAGESPEED_API_KEY')
    
    if (!apiKey) {
      console.warn('[PAGESPEED] API key not configured, skipping PageSpeed analysis')
      return { metrics: {}, score: null }
    }

    // Request mobile metrics (primary)
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${apiKey}&strategy=mobile`

    console.log('[PAGESPEED] Calling API for URL:', url)
    
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

    let response
    try {
      response = await fetch(apiUrl, {
        headers: {
          'User-Agent': 'Socialsect-Auditor/1.0'
        },
        signal: controller.signal
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error text')
      console.error('[PAGESPEED] API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText.substring(0, 200)
      })
      throw new Error(`PageSpeed API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('[PAGESPEED] Response received successfully')

    // Extract key metrics
    const lighthouseResult = data.lighthouseResult
    if (!lighthouseResult) {
      console.error('[PAGESPEED] No Lighthouse result in response')
      console.error('[PAGESPEED] Available keys:', Object.keys(data))
      // Return empty metrics but don't fail - we'll continue with static checks
      return { metrics: {}, score: null, url: url }
    }

    const categories = lighthouseResult.categories || {}
    const audits = lighthouseResult.audits || {}

    const metrics = {
      // Overall scores
      performance: (categories.performance?.score || 0) * 100,
      accessibility: (categories.accessibility?.score || 0) * 100,
      bestPractices: (categories['best-practices']?.score || 0) * 100,
      seo: (categories.seo?.score || 0) * 100,
      
      // Core Web Vitals (in milliseconds for time-based, unitless for CLS)
      firstContentfulPaint: Math.round(audits['first-contentful-paint']?.numericValue || 0),
      largestContentfulPaint: Math.round(audits['largest-contentful-paint']?.numericValue || 0),
      cumulativeLayoutShift: Number((audits['cumulative-layout-shift']?.numericValue || 0).toFixed(3)),
      speedIndex: Math.round(audits['speed-index']?.numericValue || 0),
      totalBlockingTime: Math.round(audits['total-blocking-time']?.numericValue || 0),
      timeToFirstByte: Math.round(audits['server-response-time']?.numericValue || 0)
    }

    console.log('[PAGESPEED] Metrics extracted:', {
      performance: metrics.performance,
      fcp: metrics.firstContentfulPaint,
      lcp: metrics.largestContentfulPaint
    })

    return {
      metrics: metrics,
      score: (categories.performance?.score || 0) * 100,
      url: url
    }
  } catch (error) {
    console.error('[PAGESPEED] Error fetching metrics:', {
      message: error.message,
      code: error.code,
      stack: error.stack?.substring(0, 200)
    })
    // Return graceful fallback - don't throw, let scanning continue
    return { metrics: {}, score: null }
  }
}

async function fetchWebsiteHtml(url) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

    let response
    try {
      response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        signal: controller.signal
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const contentLength = response.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > MAX_SIZE_KB * 1024) {
      throw new Error(`Website exceeds ${MAX_SIZE_KB}KB limit`)
    }

    const html = await response.text()

    if (html.length > MAX_SIZE_KB * 1024) {
      throw new Error(`Website content exceeds ${MAX_SIZE_KB}KB limit`)
    }

    return html
  } catch (error) {
    console.error('[HTML_FETCH] Error:', error.message)
    throw error
  }
}

function parseHtml(html, domain) {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : 'No title'

  const descMatch = html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']*)["']/i)
  const description = descMatch ? descMatch[1].trim() : 'No description'

  const h1Match = html.match(/<h1[^>]*>([^<]*)<\/h1>/i)
  const hasH1 = h1Match && h1Match[1].trim().length > 0

  const phoneMatch = html.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b|tel:/i)
  const hasPhone = !!phoneMatch

  const formMatch = html.match(/<form[^>]*>|<input[^>]*type=["']?email/i)
  const hasForm = !!formMatch

  const ctaMatch = html.match(/\b(book|contact|call|schedule|appointment|demo|consultation|request)\b/i)
  const hasCTA = !!ctaMatch

  const schemaMatch = html.includes('application/ld+json') || html.includes('schema.org')

  const mobileMatch = html.includes('viewport')

  // Healthcare-specific
  const hasInsurance = /insurance|aetna|bcbs|cigna|united|humana/i.test(html)
  const hasTestimonial = /testimonial|review|patient\s+says|what\s+patients/i.test(html)
  const hasLocationPage = /location|office|clinic|address/i.test(html) && phoneMatch
  const hasProviders = /provider|doctor|physician|nurse|staff|meet\s+our|our\s+team/i.test(html)
  const hasConditions = /condition|treatment|procedure|service|speciali/i.test(html)

  return {
    seo: {
      hasTitle: !!title && title !== 'No title',
      hasMetaDescription: !!description && description !== 'No description',
      hasH1: hasH1,
      hasMobileOptimized: mobileMatch,
      hasSchema: schemaMatch
    },
    conversion: {
      hasPhone: hasPhone,
      hasContactForm: hasForm,
      hasCTA: hasCTA,
      hasAppointmentBooking: /booking|schedule|book\s+appointment/i.test(html)
    },
    healthcare: {
      hasInsuranceInfo: hasInsurance,
      hasTestimonials: hasTestimonial,
      hasLocationPages: hasLocationPage,
      hasProviderBios: hasProviders,
      hasConditionPages: hasConditions
    },
    domain: domain,
    title: title,
    description: description
  }
}
