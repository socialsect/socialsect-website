/**
 * Handle audit mode in conversational chat
 * Collects info, scans website, sends findings email
 */

import { HttpError } from '../http-error.js'
import { scanWebsite } from '../chat/website-scanner.js'
import { analyzeWebsiteAsConsultant } from '../ai/healthcare-consultant.js'
import { sendNotificationEmail } from '../email.js'

export async function processAuditChat(payload = {}) {
  const { name, email, website, conversationTranscript } = payload

  // Validate inputs
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError('Valid email address is required', 400)
  }

  if (!name || name.trim().length === 0) {
    throw new HttpError('Name is required', 400)
  }

  if (!website || website.trim().length === 0) {
    throw new HttpError('Website URL is required', 400)
  }

  // Normalize URL
  let urlToScan = website.trim()
  if (!urlToScan.startsWith('http')) {
    urlToScan = 'https://' + urlToScan
  }

  // Validate URL format
  try {
    const urlObj = new URL(urlToScan)
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error()
    }
  } catch {
    throw new HttpError('Invalid URL format', 400)
  }

  // Scan website
  const scanResult = await scanWebsite(urlToScan)

  if (!scanResult.success) {
    throw new HttpError(`Website scan failed: ${scanResult.error}`, 400)
  }

  // Analyze with healthcare consultant
  // Build websiteData object with both checks and domain
  const websiteData = {
    checks: scanResult.checks,
    domain: scanResult.website
  }
  const analysisResult = await analyzeWebsiteAsConsultant(websiteData, conversationTranscript)

  if (!analysisResult.success) {
    throw new HttpError('Failed to generate analysis', 500)
  }

  // Send internal notification email
  try {
    await sendNotificationEmail({
      subject: `Website Audit: ${scanResult.checks.domain} — ${name}`,
      replyTo: email,
      html: buildAuditEmailHtml(name, email, website, scanResult.checks, analysisResult.analysis, conversationTranscript)
    })
  } catch (e) {
    console.error('Failed to send audit email:', e.message)
    // Continue anyway - don't fail the response
  }

  // Return analysis to frontend
  return {
    success: true,
    name: name,
    email: email,
    website: scanResult.checks.domain,
    analysis: analysisResult.analysis,
    nextStep: 'Strategy call scheduled via email confirmation'
  }
}

function buildAuditEmailHtml(name, email, website, checks, analysis, transcript) {
  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #1a1c1d; line-height: 1.6; max-width: 700px;">
      <h2>Website Audit Lead</h2>
      
      <h3>Contact Information</h3>
      <p>
        <strong>Name:</strong> ${escapeHtml(name)}<br>
        <strong>Email:</strong> ${escapeHtml(email)}<br>
        <strong>Website:</strong> ${escapeHtml(website)}
      </p>

      <h3>Audit Findings</h3>
      <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
        <tr style="background: #f5f5f7;">
          <td style="padding: 8px; border: 1px solid #e2e2e2;"><strong>Category</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e2e2;"><strong>Finding</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e2e2;"><strong>SEO</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e2e2;">
            Title: ${checks.seo.hasTitle ? '✓' : '✗'} | 
            Meta: ${checks.seo.hasMetaDescription ? '✓' : '✗'} | 
            H1: ${checks.seo.hasH1 ? '✓' : '✗'} | 
            Mobile: ${checks.seo.hasMobileOptimized ? '✓' : '✗'} | 
            Schema: ${checks.seo.hasSchema ? '✓' : '✗'}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e2e2;"><strong>Conversion</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e2e2;">
            Phone: ${checks.conversion.hasPhone ? '✓' : '✗'} | 
            Form: ${checks.conversion.hasContactForm ? '✓' : '✗'} | 
            CTA: ${checks.conversion.hasCTA ? '✓' : '✗'} | 
            Booking: ${checks.conversion.hasAppointmentBooking ? '✓' : '✗'}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e2e2;"><strong>Healthcare</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e2e2;">
            Insurance: ${checks.healthcare.hasInsuranceInfo ? '✓' : '✗'} | 
            Testimonials: ${checks.healthcare.hasTestimonials ? '✓' : '✗'} | 
            Locations: ${checks.healthcare.hasLocationPages ? '✓' : '✗'} | 
            Providers: ${checks.healthcare.hasProviderBios ? '✓' : '✗'} | 
            Services: ${checks.healthcare.hasConditionPages ? '✓' : '✗'}
          </td>
        </tr>
      </table>

      <h3>AI Analysis</h3>
      <div style="background: #f9f9fb; padding: 16px; border-left: 3px solid #695af2; border-radius: 4px;">
        ${analysis.split('\n').map(line => `<p style="margin: 8px 0;">${escapeHtml(line)}</p>`).join('')}
      </div>

      <h3>Conversation Transcript</h3>
      <pre style="background: #f5f5f7; padding: 12px; border-radius: 4px; font-size: 12px; overflow-x: auto;">
${escapeHtml(transcript || 'No transcript')}
      </pre>

      <p style="margin-top: 24px; font-size: 14px; color: #474555;">
        This lead should be contacted to schedule a 10-15 minute strategy call to discuss findings and next steps.
      </p>
    </div>
  `
}

function escapeHtml(text) {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
