# PageSpeed Insights API Setup

## Overview

The PageSpeed Insights API analyzes website performance and provides:
- Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
- Actionable optimization opportunities
- Performance improvement recommendations

## Getting Your API Key

### Step 1: Google Cloud Console Setup

1. Go to https://console.cloud.google.com
2. Create a new project (or select existing)
3. Go to "APIs & Services" → "Dashboard"
4. Click "Enable APIs and Services"
5. Search for "PageSpeed Insights API"
6. Click it and hit "Enable"

### Step 2: Create API Key

1. In Google Cloud Console: "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key
4. (Optional) Restrict it to PageSpeed Insights API only for security

### Step 3: Add to Vercel

1. Go to Vercel Dashboard → socialsect-website → Settings
2. Environment Variables
3. Add:
   - Name: `GOOGLE_PAGESPEED_API_KEY`
   - Value: (your API key from step 2)
   - Environments: Production, Preview
4. Save

### Step 4: Add to Local .env

```
GOOGLE_PAGESPEED_API_KEY=your_key_here
```

## How It Works

### API Integration

**File**: `lib/ai/pagespeed-analyzer.js`

**Function**: `analyzePageSpeed(url)`

```javascript
import { analyzePageSpeed } from '../ai/pagespeed-analyzer.js'

const result = await analyzePageSpeed('https://example.com')
// Returns:
// {
//   success: true,
//   analysis: {
//     scores: { performance, accessibility, bestPractices, seo },
//     coreWebVitals: { lcp, fid, cls, fcp, ttfb },
//     opportunities: [...],
//     summary: "..."
//   }
// }
```

### Scores

Each score is 0-100:
- **90+**: Excellent
- **50-89**: Good
- **<50**: Poor

### Core Web Vitals

| Metric | Good | Needs Work | Poor |
|--------|------|-----------|------|
| LCP (Largest Contentful Paint) | ≤2.5s | 2.5-4s | >4s |
| FID (First Input Delay) | ≤100ms | 100-300ms | >300ms |
| CLS (Cumulative Layout Shift) | ≤0.1 | 0.1-0.25 | >0.25 |

## Usage in Chat

### When to Call

- User asks about website performance
- User mentions "slow site" or "loading time"
- User wants a website audit
- Use with conversation history for context

### Example

```javascript
// In chat handler
const { analyzePageSpeed } = require('../ai/pagespeed-analyzer.js')

if (userMentionsPerformance) {
  const result = await analyzePageSpeed(websiteURL)
  
  if (result.success) {
    const response = `Your site's performance score is ${result.analysis.scores.performance}/100. 
    Loading time (LCP): ${result.analysis.coreWebVitals.lcp}ms. 
    ${result.analysis.summary}`
  }
}
```

## Error Handling

If API key is not configured:
- Function returns `{ success: false, error: '...', skipped: true }`
- Chat continues without performance data
- No breaking changes

## Cost

**Free**: 25,000 requests/day (usually enough)
**Paid**: Beyond free tier (~$0.0007 per request)

For reference:
- 100 audits/day × 1 request = 100 requests
- Well under free tier

## Limitations

- Cached results (may not be fresh)
- Cannot test password-protected sites
- Mobile and desktop scores separate
- Takes ~30-60 seconds to analyze

## Testing

```bash
# Test API manually
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&key=YOUR_API_KEY"
```

## Troubleshooting

### Issue: "API key not valid"

- Verify key is correct in Vercel
- Check key is enabled for PageSpeed Insights API
- Try creating a new key

### Issue: "URL not accessible"

- Website may be down
- May have robots.txt blocking Google
- Check site is publicly accessible

### Issue: "Quota exceeded"

- Exceeded 25,000 daily requests
- Check if other processes calling API
- May need to upgrade to paid plan

## Integration with Chat Widget

The PageSpeed analyzer will be called when:
1. User asks about performance
2. User mentions audit
3. System prompt prompts LLM to suggest analysis

Example prompt addition:
"If user asks about website performance, speed, loading time, or Core Web Vitals, offer to run a PageSpeed analysis if you have their website URL."

## Security

- API key only works with PageSpeed Insights API
- Add to Vercel environment (not committed to git)
- Restrict key in Google Cloud Console if possible
- Monitor usage in Google Cloud Console

## Next Steps

1. Get API key from Google Cloud Console
2. Add to Vercel environment variables
3. Verify integration works
4. Update chat system prompt if needed
5. Test with real websites

## References

- https://developers.google.com/speed/pagespeed/insights
- https://developers.google.com/speed/docs/insights/v5/about
- https://web.dev/vitals/ (Core Web Vitals)
