/**
 * Audit Report Formatter
 * 
 * Takes PageSpeed data and formats it through LLM
 * for a professional, actionable audit report
 */

import { getEnv } from '../env.js'

const AUDIT_SYSTEM_PROMPT = `You are a healthcare marketing consultant presenting website audit findings to a practice owner.

Your job is to take technical performance data and present it in a warm, professional way that:
1. Acknowledges what they're doing well
2. Identifies the top 3 revenue-impacting issues
3. Explains each issue in business terms (not technical jargon)
4. Provides 1-2 specific, actionable next steps for each issue
5. Ends with a clear call-to-action for a strategy call

Format your response as plain text. No markdown, no em dashes, no bullet points. Use natural paragraphs and conversational language.

Remember: You're speaking to a busy practice owner, not a developer. Focus on patient impact and revenue, not technical metrics.`

export async function generateAuditReport(name, website, pageSpeedData, conversationHistory = []) {
  try {
    const apiKey = getEnv('OPENROUTER_API_KEY')
    
    if (!apiKey) {
      console.error('[AUDIT-FMT] OPENROUTER_API_KEY not configured')
      return {
        success: false,
        error: 'API not configured'
      }
    }

    // Build the audit data summary for the prompt
    const auditSummary = buildAuditSummary(name, website, pageSpeedData)

    // Build messages array for LLM
    const messages = [
      { role: 'system', content: AUDIT_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: auditSummary }
    ]

    console.log('[AUDIT-FMT] Calling OpenRouter to format audit report...')

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
        messages: messages,
        temperature: 0.7,
        max_tokens: 800
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[AUDIT-FMT] OpenRouter error:', response.status, errorData)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const formattedReport = data.choices?.[0]?.message?.content || ''

    if (!formattedReport) {
      console.error('[AUDIT-FMT] Empty response from OpenRouter')
      return {
        success: false,
        error: 'No response from API'
      }
    }

    // Extract key recommendations from PageSpeed data
    const recommendations = extractRecommendations(pageSpeedData)

    console.log('[AUDIT-FMT] Report generated successfully')

    return {
      success: true,
      report: formattedReport,
      recommendations: recommendations
    }
  } catch (error) {
    console.error('[AUDIT-FMT] Error:', error.message)
    return {
      success: false,
      error: error.message || 'Failed to format audit report'
    }
  }
}

function buildAuditSummary(name, website, pageSpeedData) {
  const scores = pageSpeedData.scores
  const vitals = pageSpeedData.coreWebVitals
  const opps = pageSpeedData.opportunities

  return `You are conducting a website audit for ${name} at ${website}.

Here are the technical findings:

Performance Scores:
- Performance: ${scores.performance}/100 (${scores.performanceStatus})
- SEO: ${scores.seo}/100 (${scores.seoStatus})
- Accessibility: ${scores.accessibility}/100 (${scores.accessibilityStatus})
- Best Practices: ${scores.bestPractices}/100 (${scores.bestPracticesStatus})

Core Web Vitals (how visitors experience the site):
- Page Loading Speed (LCP): ${vitals.lcp}ms (${vitals.lcpStatus})
- Interaction Speed (FID): ${vitals.fid}ms (${vitals.fidStatus})
- Visual Stability (CLS): ${vitals.cls} (${vitals.clsStatus})

Top Issues Found:
${opps.map((opp, i) => `${i + 1}. ${opp.title}`).join('\n')}

Additional Context:
${pageSpeedData.summary}

Please write a warm, professional audit summary for ${name}. Start by acknowledging what's working, then explain the main issues in business terms (not technical), focus on patient impact, and give clear next steps.`
}

function extractRecommendations(pageSpeedData) {
  const recommendations = []
  const scores = pageSpeedData.scores
  const vitals = pageSpeedData.coreWebVitals

  // Performance recommendation
  if (scores.performance < 50) {
    recommendations.push({
      category: 'Performance',
      priority: 'high',
      issue: 'Site loads slowly',
      impact: 'Visitors leave before seeing your services',
      action: 'Optimize images, reduce JavaScript'
    })
  }

  // SEO recommendation
  if (scores.seo < 50) {
    recommendations.push({
      category: 'SEO',
      priority: 'high',
      issue: 'Hard to find in search results',
      impact: 'Fewer patients discovering your practice',
      action: 'Add title tags, meta descriptions, fix mobile issues'
    })
  }

  // Accessibility recommendation
  if (scores.accessibility < 50) {
    recommendations.push({
      category: 'Accessibility',
      priority: 'medium',
      issue: 'Site hard to use',
      impact: 'Some visitors can\'t interact with your site',
      action: 'Add alt text to images, improve color contrast'
    })
  }

  // Core Web Vitals recommendation
  if (vitals.lcp > 4000 || vitals.cls > 0.25) {
    recommendations.push({
      category: 'User Experience',
      priority: 'high',
      issue: 'Poor browsing experience',
      impact: 'Visitors bounce, fewer appointment requests',
      action: 'Work with developer to optimize Core Web Vitals'
    })
  }

  return recommendations.slice(0, 3) // Top 3 recommendations
}
