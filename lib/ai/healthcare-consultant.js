/**
 * Healthcare marketing consultant using OpenRouter
 * Analyzes websites with PageSpeed metrics and answers questions about healthcare marketing
 */

import { getEnv } from '../env.js'

export async function analyzeWebsiteAsConsultant(websiteData, conversationContext) {
  try {
    const apiKey = getEnv('OPENROUTER_API_KEY')
    
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not configured')
      return {
        success: false,
        error: 'API not configured'
      }
    }

    const prompt = buildConsultantPrompt(websiteData, conversationContext)

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://gosocialsect.com',
        'X-Title': 'Socialsect',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3',
        messages: [
          {
            role: 'system',
            content: CONSULTANT_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1200
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenRouter error:', response.status, errorData)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    let analysis = data.choices?.[0]?.message?.content || ''

    // Clean the response - remove markdown formatting
    analysis = cleanMarkdownResponse(analysis)

    return {
      success: true,
      analysis: analysis
    }
  } catch (error) {
    console.error('Consultant analysis failed:', error.message)
    return {
      success: false,
      error: error.message || 'Analysis failed'
    }
  }
}

export async function answerMarketingQuestion(question, userContext = {}) {
  try {
    console.log('[AI] answerMarketingQuestion called with:', question)
    
    const apiKey = getEnv('OPENROUTER_API_KEY')
    
    if (!apiKey) {
      console.error('[AI] OPENROUTER_API_KEY not configured')
      return {
        success: false,
        error: 'API not configured'
      }
    }

    const prompt = `The user asked: "${question}"

User context: ${userContext.website ? `They mentioned their website: ${userContext.website}` : 'No website mentioned'}

Provide a practical, actionable answer focused on healthcare patient acquisition. Keep it conversational and avoid jargon.

IMPORTANT: Respond with plain text only. Do NOT use markdown formatting (no **bold**, no ###, no *, no - bullets). Just plain sentences.`

    console.log('[AI] Calling OpenRouter API...')
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://gosocialsect.com',
        'X-Title': 'Socialsect',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3',
        messages: [
          {
            role: 'system',
            content: CONSULTANT_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 400
      })
    })

    console.log('[AI] OpenRouter response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[AI] OpenRouter error:', response.status, errorData)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    let answer = data.choices?.[0]?.message?.content || ''

    // Strip markdown formatting
    answer = stripMarkdown(answer)

    console.log('[AI] Got answer:', answer.substring(0, 50))

    return {
      success: true,
      answer: answer
    }
  } catch (error) {
    console.error('[AI] answerMarketingQuestion failed:', error.message, error.stack)
    return {
      success: false,
      error: error.message || 'Failed to answer question'
    }
  }
}

function cleanMarkdownResponse(text) {
  if (!text) return text
  
  // Remove markdown headers (###, ##, #)
  text = text.replace(/^#+\s+/gm, '')
  
  // Remove horizontal rules
  text = text.replace(/^---+$/gm, '')
  
  // Remove bold (**text** → text)
  text = text.replace(/\*\*([^\*]+)\*\*/g, '$1')
  
  // Remove italic (*text* → text)
  text = text.replace(/\*([^\*]+)\*/g, '$1')
  text = text.replace(/_([^_]+)_/g, '$1')
  
  // Remove inline code (`code` → code)
  text = text.replace(/`([^`]+)`/g, '$1')
  
  // Remove code blocks (```code``` → code)
  text = text.replace(/```[\s\S]*?```/g, '')
  
  // Clean up multiple spaces
  text = text.replace(/  +/g, ' ')
  
  // Clean up multiple newlines
  text = text.replace(/\n\n\n+/g, '\n\n')
  
  return text.trim()
}

function stripMarkdown(text) {
  if (!text) return text
  
  // Remove markdown headers (### text → text)
  text = text.replace(/^#+\s+/gm, '')
  
  // Remove bold (**text** → text)
  text = text.replace(/\*\*([^\*]+)\*\*/g, '$1')
  
  // Remove italic (*text* → text)
  text = text.replace(/\*([^\*]+)\*/g, '$1')
  text = text.replace(/_([^_]+)_/g, '$1')
  
  // Remove inline code (`code` → code)
  text = text.replace(/`([^`]+)`/g, '$1')
  
  // Convert markdown lists to plain text
  text = text.replace(/^\s*[-*+]\s+/gm, '• ')
  
  // Remove markdown links [text](url) → text
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
  
  return text
}

const CONSULTANT_SYSTEM_PROMPT = `You are a healthcare marketing consultant specializing in patient acquisition for private medical practices. You have deep expertise in:

- Website optimization for healthcare (performance, UX, conversion)
- Patient conversion funnels
- Local search visibility (Google Maps, local SEO)
- Healthcare advertising and compliance
- Patient review management
- Appointment booking systems
- Healthcare content strategy
- Digital patient experience
- Web performance and Core Web Vitals

When analyzing websites, focus on:
1. Performance metrics and their patient impact (slow sites lose patients)
2. Revenue leaks (missing phone numbers, broken CTAs, friction in booking)
3. Conversion bottlenecks (where patients drop off)
4. Patient acquisition opportunities (untapped channels, missing content)
5. Local visibility issues (maps optimization, local citations, reviews)

IMPORTANT - DO NOT USE MARKDOWN:
- Do NOT use ###, ##, #, **, __, or any markdown formatting
- Write in plain text with simple paragraphs
- Use line breaks between sections
- Avoid technical jargon when discussing performance. Translate to patient impact: "Your site's 4-second load time means 20% of mobile visitors leave before it loads"
- Focus on patient impact and revenue, not technical metrics alone.
- Be specific and actionable. Give 2-3 high-impact recommendations ranked by revenue impact.
- Acknowledge what they're doing well before suggesting improvements.
- Recommend a conversation with our team for implementation help.
- Never make promises about patient volume or revenue increases.
- Always comply with healthcare advertising regulations.

When you identify performance issues, frame them like this:
"Your site takes 4 seconds to load on mobile. That's a problem because 25% of mobile users abandon sites that take more than 3 seconds. We could optimize images and caching to get this under 2 seconds, which would likely keep 15% more patients engaged."

When you identify conversion issues:
"Your appointment booking button is buried below the fold. Most visitors never reach it. Moving it to the top of the page or adding a floating widget could increase bookings by 30%."

Keep responses conversational but data-driven. This is a consultation backed by specific metrics and recommendations.`

function buildConsultantPrompt(websiteData, conversationContext) {
  const { checks = {}, domain } = websiteData

  // Safe access to nested objects
  const seo = checks.seo || {}
  const conversion = checks.conversion || {}
  const healthcare = checks.healthcare || {}
  const pageSpeed = checks.pageSpeed || {}
  const siteDomain = domain || checks.domain || 'the website'

  // Format PageSpeed metrics if available
  let pageSpeedSection = ''
  if (pageSpeed && Object.keys(pageSpeed).length > 0) {
    pageSpeedSection = `
**PageSpeed Insights (Google Lighthouse):**
- Performance Score: ${Math.round(pageSpeed.performance || 0)}/100
- Accessibility Score: ${Math.round(pageSpeed.accessibility || 0)}/100
- Best Practices Score: ${Math.round(pageSpeed.bestPractices || 0)}/100
- SEO Score: ${Math.round(pageSpeed.seo || 0)}/100

**Core Web Vitals:**
- First Contentful Paint: ${Math.round(pageSpeed.firstContentfulPaint || 0)}ms
- Largest Contentful Paint: ${Math.round(pageSpeed.largestContentfulPaint || 0)}ms
- Cumulative Layout Shift: ${(pageSpeed.cumulativeLayoutShift || 0).toFixed(3)}
- Speed Index: ${Math.round(pageSpeed.speedIndex || 0)}ms
- Total Blocking Time: ${Math.round(pageSpeed.totalBlockingTime || 0)}ms
`
  }

  return `I just analyzed the website for ${siteDomain}. Here's what I found:

${pageSpeedSection}

**SEO Foundation:**
- Page title: ${seo.hasTitle ? 'Present' : 'Missing'}
- Meta description: ${seo.hasMetaDescription ? 'Present' : 'Missing'}
- Main heading (H1): ${seo.hasH1 ? 'Present' : 'Missing'}
- Mobile optimized: ${seo.hasMobileOptimized ? 'Yes' : 'No'}
- Schema markup: ${seo.hasSchema ? 'Yes' : 'No'}

**Patient Conversion Elements:**
- Phone number visible: ${conversion.hasPhone ? 'Yes' : 'No'}
- Contact/appointment form: ${conversion.hasContactForm ? 'Yes' : 'No'}
- Clear call-to-action: ${conversion.hasCTA ? 'Yes' : 'No'}
- Online booking system: ${conversion.hasAppointmentBooking ? 'Yes' : 'No'}

**Healthcare-Specific:**
- Insurance information: ${healthcare.hasInsuranceInfo ? 'Present' : 'Missing'}
- Patient testimonials/reviews: ${healthcare.hasTestimonials ? 'Present' : 'Missing'}
- Location pages: ${healthcare.hasLocationPages ? 'Present' : 'Missing'}
- Provider bios: ${healthcare.hasProviderBios ? 'Present' : 'Missing'}
- Condition/service pages: ${healthcare.hasConditionPages ? 'Present' : 'Missing'}

${conversationContext ? `User notes: ${conversationContext}` : ''}

Please provide a website audit analysis focused on:
1. Performance opportunities (use the PageSpeed metrics as a baseline)
2. Conversion optimization - what's preventing users from booking appointments or contacting?
3. SEO and visibility improvements
4. User experience issues that could be costing them patients
5. Specific, actionable recommendations

Be direct and specific. Avoid generic advice. Focus on what will have the biggest impact on patient acquisition. Format your response clearly with sections and concrete next steps.`
}
