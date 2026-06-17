# Website Audit Feature Setup

## Quick Start

The AI Growth Auditor is fully integrated into the Socialsect website. Here's what you need to do to launch it.

---

## 1. Environment Variables

Add these to your `.env.local` and Vercel environment:

### Required
```bash
OPENROUTER_API_KEY=sk_live_...                    # Get from https://openrouter.ai
CALENDLY_BOOKING_URL=https://calendly.com/...    # Your Calendly strategy call link
```

### Optional
```bash
OPENROUTER_MODEL=deepseek/deepseek-chat-v3      # Default model (can change)
AUDIT_TIMEOUT_MS=30000                           # Scan timeout (ms)
AUDIT_MAX_WEBSITE_SIZE_KB=5000                   # Max website size
```

---

## 2. Database Setup

### Create Supabase Table

Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS public.audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  website_url TEXT NOT NULL,
  scores JSONB,
  checks JSONB,
  summary TEXT,
  lead_name TEXT,
  lead_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audits_session_id ON public.audits(session_id);
CREATE INDEX IF NOT EXISTS idx_audits_lead_email ON public.audits(lead_email);

ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to insert audits" ON public.audits
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select own audit" ON public.audits
  FOR SELECT USING (true);

CREATE POLICY "Allow update own audit" ON public.audits
  FOR UPDATE USING (true);

GRANT ALL ON TABLE public.audits TO anon;
```

Or use the script:
```bash
# Run in Supabase SQL editor
scripts/create-audit-table.sql
```

---

## 3. Email Configuration

The feature sends two emails:

1. **Internal notification** → Team inbox (configured in existing RESEND_NOTIFY_EMAILS)
2. **Visitor confirmation** → Lead's email with Calendly link

Make sure you have:
- `RESEND_API_KEY` configured
- `RESEND_FROM_EMAIL` set
- `RESEND_NOTIFY_EMAILS` set to your team inbox

---

## 4. OpenRouter API Setup

1. Go to https://openrouter.ai
2. Sign up or log in
3. Create an API key under "Keys"
4. Add `OPENROUTER_API_KEY` to environment

The feature uses `deepseek/deepseek-chat-v3` by default. You can change this with `OPENROUTER_MODEL`.

---

## 5. Deploy to Vercel

1. Push to main branch
2. Vercel auto-deploys
3. Add environment variables in Vercel settings
4. Test the floating button on your site

---

## API Endpoints

### POST /api/audit/scan
Scan a website and return instant score + AI summary

**Request:**
```json
{
  "url": "https://example.com",
  "sessionId": "optional-uuid"
}
```

**Response:**
```json
{
  "success": true,
  "website": "https://example.com",
  "score": {
    "seo": 66,
    "structure": 100,
    "conversion": 33,
    "overall": 66
  },
  "summary": "Your website has solid SEO basics...",
  "topIssues": ["Missing contact form", "No schema markup"]
}
```

### POST /api/audit/lead-capture
Capture lead and trigger confirmation emails

**Request:**
```json
{
  "url": "https://example.com",
  "score": { "seo": 66, "structure": 100, "conversion": 33, "overall": 66 },
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead captured!",
  "calendlyUrl": "https://calendly.com/socialsect/strategy"
}
```

---

## Scoring System

**9 Checks Total:**

SEO (3):
- Title tag present
- Meta description present
- H1 tag present

Structure (3):
- Schema markup (JSON-LD)
- Robots.txt accessible
- Sitemap.xml accessible

Conversion (3):
- Phone number visible
- Contact form present
- CTA button present

**Score Calculation:**
```
seoScore = (checks passed / 3) × 100
structureScore = (checks passed / 3) × 100
conversionScore = (checks passed / 3) × 100
overallScore = (seoScore + structureScore + conversionScore) / 3
```

---

## Frontend Components

### GrowthAuditorLauncher
Floating button (bottom-right) that opens the audit widget.

**Location:** `src/components/growth-auditor/GrowthAuditorLauncher.jsx`

Automatically integrated into `src/App.jsx`. No additional setup needed.

### GrowthAuditorWidget
Main audit interface with 3 screens:
1. URL input
2. Loading/scanning
3. Score + AI summary
4. Lead capture form

**Location:** `src/components/growth-auditor/GrowthAuditorWidget.jsx`

---

## Troubleshooting

### "Failed to scan website"
- Website might be blocking requests
- Check `AUDIT_TIMEOUT_MS` (increase if needed)
- Verify URL format (must include http:// or https://)

### "Invalid API key" (OpenRouter)
- Verify `OPENROUTER_API_KEY` is set correctly
- Check Vercel environment variables
- Restart dev server after setting variables

### "Network error" (frontend)
- Check browser console for errors
- Verify `/api/audit/scan` endpoint is accessible
- Check CORS headers (should be set by default)

### No emails sent
- Verify `RESEND_API_KEY` is configured
- Check `RESEND_FROM_EMAIL` is verified in Resend
- Check `RESEND_NOTIFY_EMAILS` is set

---

## Performance Notes

- Website scanning: 10-15 seconds (depends on site size)
- AI summary generation: 2-5 seconds
- Total UX flow: 15-20 seconds
- Results cached for 30 minutes

---

## Analytics

All audits are logged in Supabase `audits` table:
- `website_url` - Scanned website
- `scores` - SEO/Structure/Conversion scores
- `summary` - AI-generated summary
- `lead_name`, `lead_email` - Lead info (if captured)
- `created_at` - When audit was created

Query leads:
```sql
SELECT * FROM audits WHERE lead_email IS NOT NULL ORDER BY created_at DESC;
```

---

## Next Steps

- Monitor conversion rate (leads / audits)
- A/B test button placement if needed
- Collect feedback from team
- Add more checks (healthcare-specific, performance, etc.)
- Integrate with CRM (HubSpot, Pipedrive, etc.)

