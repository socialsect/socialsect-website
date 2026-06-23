# Environment Variables Documentation

## Overview
This document lists all environment variables used by Socialsect and the Visibility Snapshot page.

---

## Global Environment Variables (All Pages)

### Supabase (Database)
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```
**Used for:** Form submissions, audit logs, database storage
**Required:** Yes

### Resend (Email Service)
```env
RESEND_API_KEY=re_your_key
RESEND_FROM_EMAIL=noreply@gosocialsect.com
RESEND_NOTIFY_EMAILS=team@gosocialsect.com
RESEND_CC_EMAILS=admin@gosocialsect.com  (optional)
```
**Used for:** Sending confirmation emails and internal notifications
**Required:** Yes for email features
**Notes:** 
- `RESEND_API_KEY` - Resend API key (format: `re_xxxx`)
- `RESEND_FROM_EMAIL` - Sender email address
- `RESEND_NOTIFY_EMAILS` - Comma-separated list of emails to notify (internal team)
- `RESEND_CC_EMAILS` - Comma-separated list for CC'd emails

### OpenRouter (AI/LLM)
```env
OPENROUTER_API_KEY=sk-or-v1-your_key
OPENROUTER_MODEL=deepseek/deepseek-chat-v3
```
**Used for:** AI consulting features, chat systems
**Required:** No (optional for AI features)

### Google PageSpeed Insights API
```env
GOOGLE_PAGESPEED_API_KEY=your_google_api_key
```
**Used for:** Website performance analysis (Visibility Snapshot page)
**Required:** No (falls back to mock data if not configured)
**Setup:** https://developers.google.com/speed/pagespeed/insights

### Sanity CMS
```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```
**Used for:** Blog articles, content management
**Required:** No (optional for content features)

---

## Visibility Snapshot Page Specific Variables

The visibility snapshot page (`/where-your-implant-practice-is-going-wrong`) uses these environment variables:

### Required
1. **GOOGLE_PAGESPEED_API_KEY** - For fetching real website performance data
   - Always tries to fetch real data first
   - Falls back to mock data if API key missing or request fails
   - Logs to console what data source was used

2. **Resend Email Variables** - For sending snapshot reports
   - `RESEND_API_KEY` - Required to send emails
   - `RESEND_FROM_EMAIL` - Sender address
   - `RESEND_NOTIFY_EMAILS` - Internal team notifications

3. **SUPABASE_URL** + **SUPABASE_ANON_KEY** - For logging submissions

### Optional
- `OPENROUTER_API_KEY` - Not used by visibility page

---

## How Visibility Snapshot Page Works with These Variables

### 1. Form Submission Flow
```
User submits form
    ↓
Validates email & website URL
    ↓
API calls /api/visibility-snapshot
    ↓
Handler checks GOOGLE_PAGESPEED_API_KEY
    ↓
If key exists: Fetches real data from Google PageSpeed API
If key missing: Uses mock data (logs this to console)
    ↓
Generates snapshot report
    ↓
Stores in database (Supabase)
    ↓
Sends email via Resend
    ↓
Returns snapshot to frontend
```

### 2. Data Sources
- **Real Data:** Google PageSpeed Insights API (if `GOOGLE_PAGESPEED_API_KEY` configured)
- **Fallback Data:** Generated mock data (realistic values)
- **Both sources:** Console logs which data source was used

---

## Configuration Examples

### Development (Local)
```env
# Local dev - PageSpeed will use mock data
SUPABASE_URL=https://local.supabase.co
SUPABASE_ANON_KEY=dev-key
RESEND_API_KEY=re_dev_key
RESEND_FROM_EMAIL=noreply@localhost:3000
RESEND_NOTIFY_EMAILS=dev@localhost
# GOOGLE_PAGESPEED_API_KEY not needed for testing (will use mock data)
```

### Production
```env
# Production - All services required
SUPABASE_URL=https://prod-project.supabase.co
SUPABASE_ANON_KEY=prod-anon-key
RESEND_API_KEY=re_prod_key_here
RESEND_FROM_EMAIL=noreply@gosocialsect.com
RESEND_NOTIFY_EMAILS=team@gosocialsect.com,admin@gosocialsect.com
GOOGLE_PAGESPEED_API_KEY=AIzaSy... (real Google API key)
OPENROUTER_API_KEY=sk-or-v1-... (if using AI features)
```

---

## Debugging

### Check what data source is being used
Open browser DevTools → Console, submit a form, look for:
```
"Fetching PageSpeed data for: https://example.com"
"PageSpeed API response status: 200"
"Successfully parsed PageSpeed data: { performance: 72, mobile: 68, fcp: 2.3 }"
```

Or for fallback:
```
"GOOGLE_PAGESPEED_API_KEY not configured, using mock data"
```

### Email Issues
If emails aren't sending:
1. Check `RESEND_API_KEY` is correct format (`re_xxxx`)
2. Check `RESEND_FROM_EMAIL` is verified in Resend dashboard
3. Check `RESEND_NOTIFY_EMAILS` has correct email addresses
4. Look for errors in console: `"Failed to send confirmation email"`

### Database Issues
If submissions aren't being logged:
1. Verify `SUPABASE_URL` is correct
2. Verify `SUPABASE_ANON_KEY` is correct
3. Check Supabase tables exist
4. Look for errors: `"Failed to log submission"`

---

## Security Notes

- **Never commit .env files** - Keep production keys private
- **Rotate API keys regularly** - Especially `RESEND_API_KEY` and `GOOGLE_PAGESPEED_API_KEY`
- **Use separate keys for dev/prod** - Don't reuse production keys in development
- **Monitor API usage** - PageSpeed and Resend have usage limits

---

## Summary Table

| Variable | Required | Used For | Fallback |
|----------|----------|----------|----------|
| SUPABASE_URL | Yes | Database | None |
| SUPABASE_ANON_KEY | Yes | Database auth | None |
| RESEND_API_KEY | Yes* | Email sending | None |
| RESEND_FROM_EMAIL | Yes* | Email sender | None |
| RESEND_NOTIFY_EMAILS | Yes* | Internal emails | None |
| GOOGLE_PAGESPEED_API_KEY | No | Real perf data | Mock data |
| OPENROUTER_API_KEY | No | AI features | None |
| VITE_SANITY_PROJECT_ID | No | Blog content | None |

*Required if email features are used

---

## Getting API Keys

### Google PageSpeed Insights API
1. Go to https://developers.google.com/speed/pagespeed/insights
2. Click "Get Started"
3. Create a new project in Google Cloud Console
4. Enable PageSpeed Insights API
5. Create an API key
6. Copy the key to `GOOGLE_PAGESPEED_API_KEY`

### Resend
1. Go to https://resend.com
2. Sign up or log in
3. Go to API Keys
4. Create new API key
5. Copy to `RESEND_API_KEY`
6. Configure sender domain and verify

### Supabase
1. Go to https://supabase.com
2. Create a new project
3. Copy `URL` to `SUPABASE_URL`
4. Go to Settings → API Keys → Copy anon key to `SUPABASE_ANON_KEY`
