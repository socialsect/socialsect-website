# PageSpeed API - Quick Start

## What's Ready

✅ `lib/ai/pagespeed-analyzer.js` - Full API integration
✅ `.env.example` - Updated with GOOGLE_PAGESPEED_API_KEY
✅ Documentation - Full setup guide

## To Enable (3 Steps)

### Step 1: Get API Key (2 minutes)

1. Go to https://console.cloud.google.com
2. Create project → APIs & Services → Search "PageSpeed Insights API" → Enable
3. Credentials → Create API Key → Copy it

### Step 2: Add to Vercel (1 minute)

1. Vercel Dashboard → socialsect-website → Settings → Environment Variables
2. Add: `GOOGLE_PAGESPEED_API_KEY = (your key)`
3. Save

### Step 3: Add to Local .env

```bash
GOOGLE_PAGESPEED_API_KEY=your_key_here
```

## What It Does

Analyzes websites for:
- Performance score (0-100)
- SEO score (0-100)
- Accessibility score (0-100)
- Best Practices score (0-100)
- Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
- Top 3 optimization opportunities

## Usage Example

```javascript
import { analyzePageSpeed } from '../ai/pagespeed-analyzer.js'

const result = await analyzePageSpeed('https://example.com')

console.log(result.analysis.scores.performance) // e.g., 85
console.log(result.analysis.coreWebVitals.lcp) // e.g., 2400ms
console.log(result.analysis.opportunities) // Top 3 fixes
```

## Free Tier

- 25,000 requests/day (free)
- No credit card required for free tier
- Costs ~$0.0007/request above free tier

## Estimated Cost

- 100 websites/day × 1 API call = 100 requests
- Comfortably in free tier
- Monthly cost: $0 (free)

## Error Handling

If API key missing:
- Returns `{ success: false, skipped: true }`
- Chat continues without performance data
- No breaking changes

## Next: Integrate with Chat

Add to system prompt:
```
If user asks about website performance, speed, loading time, or Core Web Vitals, 
offer to analyze their site with PageSpeed Insights.
```

Then in response handler:
```javascript
if (userAsksAboutPerformance && hasWebsiteURL) {
  const perfAnalysis = await analyzePageSpeed(websiteURL)
  // Include results in response
}
```

## Documentation

- Full setup: `PAGESPEED_SETUP.md`
- Code file: `lib/ai/pagespeed-analyzer.js`
- API reference: https://developers.google.com/speed/pagespeed/insights

---

**Ready to deploy?** Just add the API key to Vercel and you're good to go!
