/**
 * Website scanner for conversational audit
 * Lightweight checks suitable for healthcare practices
 */

const MAX_SIZE_KB = 5000
const TIMEOUT_MS = 30000

export async function scanWebsite(url) {
  try {
    const urlObj = new URL(url)
    const fetchUrl = urlObj.href

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

    let response
    try {
      response = await fetch(fetchUrl, {
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

    const checks = parseHtml(html, urlObj.hostname)

    return {
      success: true,
      website: urlObj.hostname,
      checks: checks
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to scan website'
    }
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
    domain: domain
  }
}
