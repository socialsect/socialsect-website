/**
 * Healthcare marketing consultant using OpenRouter
 * Analyzes websites and answers questions about healthcare marketing
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
        max_tokens: 500
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenRouter error:', response.status, errorData)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const analysis = data.choices?.[0]?.message?.content || ''

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

- Website optimization for healthcare
- Patient conversion funnels
- Local search visibility (Google Maps, local SEO)
- Healthcare advertising and compliance
- Patient review management
- Appointment booking systems
- Healthcare content strategy
- Digital patient experience

When analyzing websites, focus on:
1. Revenue leaks (missing phone numbers, broken CTAs, friction in booking)
2. Conversion bottlenecks (where patients drop off)
3. Patient acquisition opportunities (untapped channels, missing content)
4. Local visibility issues (maps optimization, local citations, reviews)

IMPORTANT GUIDELINES:
- Avoid technical SEO jargon. Explain things in business terms.
- Focus on patient impact and revenue, not technical metrics.
- Be specific and actionable. Give 2-3 high-impact recommendations.
- Acknowledge what they're doing well before suggesting improvements.
- Recommend a conversation with our team for implementation help.
- Never make promises about patient volume or revenue increases.
- Always comply with healthcare advertising regulations.

When you identify issues, explain them like this:
"We noticed [issue], which typically means [patient impact], resulting in [revenue impact]. To fix this, you could [action]."

Keep responses conversational, warm, and genuinely helpful. This is a consultation, not a sales pitch.`

function buildConsultantPrompt(websiteData, conversationContext) {
  const { checks, domain } = websiteData

  return `I just analyzed the website for ${domain}. Here's what I found:

**SEO Foundation:**
- Page title: ${checks.seo.hasTitle ? 'Present' : 'Missing'}
- Meta description: ${checks.seo.hasMetaDescription ? 'Present' : 'Missing'}
- Main heading (H1): ${checks.seo.hasH1 ? 'Present' : 'Missing'}
- Mobile optimized: ${checks.seo.hasMobileOptimized ? 'Yes' : 'No'}
- Schema markup: ${checks.seo.hasSchema ? 'Yes' : 'No'}

**Patient Conversion Elements:**
- Phone number visible: ${checks.conversion.hasPhone ? 'Yes' : 'No'}
- Contact/appointment form: ${checks.conversion.hasContactForm ? 'Yes' : 'No'}
- Clear call-to-action: ${checks.conversion.hasCTA ? 'Yes' : 'No'}
- Online booking system: ${checks.conversion.hasAppointmentBooking ? 'Yes' : 'No'}

**Healthcare-Specific:**
- Insurance information: ${checks.healthcare.hasInsuranceInfo ? 'Present' : 'Missing'}
- Patient testimonials/reviews: ${checks.healthcare.hasTestimonials ? 'Present' : 'Missing'}
- Location pages: ${checks.healthcare.hasLocationPages ? 'Present' : 'Missing'}
- Provider bios: ${checks.healthcare.hasProviderBios ? 'Present' : 'Missing'}
- Condition/service pages: ${checks.healthcare.hasConditionPages ? 'Present' : 'Missing'}

${conversationContext ? `User notes: ${conversationContext}` : ''}

Please provide a healthcare marketing consultant's analysis. Focus on revenue leaks, conversion bottlenecks, and patient acquisition opportunities. Be specific and actionable. Conclude by recommending a 10-15 minute strategy call to discuss implementation.`
}
