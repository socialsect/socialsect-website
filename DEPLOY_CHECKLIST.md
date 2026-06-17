# Website Audit Feature - Deployment Checklist

## Pre-Launch Verification

### ✅ Code Ready
- [x] All files created
- [x] Build passes (`npm run build`)
- [x] No TypeScript errors
- [x] All imports resolved
- [x] React components tested locally

### ⚠️ Required Before Launch

#### 1. Supabase Setup
- [ ] Create `audits` table using SQL from `AUDIT_SETUP.md`
- [ ] Verify table structure (id, session_id, website_url, scores, checks, summary, lead_name, lead_email, created_at, updated_at)
- [ ] Create indexes on session_id and lead_email
- [ ] Enable RLS (Row Level Security)
- [ ] Grant permissions to anon role

#### 2. Environment Variables (Vercel)
Add to Vercel project settings:

```
OPENROUTER_API_KEY = sk_live_...
CALENDLY_BOOKING_URL = https://calendly.com/socialsect/strategy
```

Verify existing variables are set:
```
SUPABASE_URL
SUPABASE_ANON_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_NOTIFY_EMAILS
```

#### 3. API Testing
- [ ] Test POST /api/audit/scan with sample URL
- [ ] Test POST /api/audit/lead-capture with sample lead
- [ ] Verify internal notification email sent
- [ ] Verify visitor confirmation email sent

#### 4. Frontend Testing
- [ ] Floating button appears (bottom-right)
- [ ] Button opens modal on click
- [ ] URL input accepts valid URLs
- [ ] Loading state displays correctly
- [ ] Score card displays with correct colors
- [ ] Lead form captures name/email
- [ ] Calendly link opens correctly
- [ ] Mobile responsive (full screen on mobile)

---

## Deployment Steps

### Step 1: Push Code
```bash
cd /Users/mac/Desktop/socialsect/socialsect-website
git add -A
git commit -m "feat: add AI website growth auditor"
git push origin main
```

### Step 2: Verify Deployment
- [ ] Vercel build succeeds
- [ ] No deployment errors
- [ ] Site is accessible at gosocialsect.com

### Step 3: Setup Database
- [ ] Run SQL migration in Supabase
- [ ] Verify table exists and is accessible

### Step 4: Final Testing (Production)
- [ ] Floating button visible on site
- [ ] Scan a test website and verify results
- [ ] Submit lead form
- [ ] Receive internal notification email
- [ ] Receive visitor confirmation email
- [ ] Verify data stored in Supabase

---

## Files Created/Modified

### New Files (12)
```
src/components/growth-auditor/
├── GrowthAuditorLauncher.jsx     (100 lines)
├── GrowthAuditorLauncher.css     (40 lines)
├── GrowthAuditorWidget.jsx       (250 lines)
└── GrowthAuditorWidget.css       (400 lines)

lib/audit/
├── quick-scanner.js             (120 lines)

lib/ai/
├── quick-summary.js             (130 lines)

lib/handlers/
├── audit.js                      (25 lines)
├── audit-lead.js                 (150 lines)

api/audit/
├── scan.js                       (6 lines)
└── lead-capture.js               (6 lines)

lib/
└── audit-service.js              (80 lines)

scripts/
└── create-audit-table.sql        (45 lines)

Root:
├── AUDIT_SETUP.md                (170 lines)
├── .env.example                  (18 lines)
└── DEPLOY_CHECKLIST.md           (this file)
```

### Modified Files (1)
```
src/App.jsx                        (+2 lines)
```

### Total Code Added
- **Frontend:** ~800 lines (JSX + CSS)
- **Backend:** ~500 lines (API + services)
- **Database:** 45 lines (SQL)

---

## Rollback Plan (if needed)

### Quick Rollback
```bash
# Revert last commit
git revert HEAD
git push origin main
```

### Remove Database Table
```sql
DROP TABLE IF EXISTS public.audits;
```

### Remove Component from UI
Comment out in `src/App.jsx`:
```javascript
// import GrowthAuditorLauncher from './components/growth-auditor/GrowthAuditorLauncher'
// <GrowthAuditorLauncher />
```

---

## Monitoring After Launch

### Check Email Deliverability
- [ ] Monitor Resend dashboard
- [ ] Check bounce rates
- [ ] Verify sender reputation

### Monitor API Performance
- [ ] Check Vercel function execution times
- [ ] Monitor error rates
- [ ] Track timeout issues

### Track Lead Quality
- [ ] Monitor conversion rate (leads / audits)
- [ ] Check lead email quality
- [ ] Track Calendly booking conversion

### Database Monitoring
- [ ] Monitor Supabase query performance
- [ ] Check storage usage
- [ ] Verify backups are working

---

## Performance Baselines

Expected metrics:
- **Scan time:** 10-15 seconds
- **AI summary generation:** 2-5 seconds
- **Total UX flow:** 15-20 seconds
- **Lead capture success:** >90%
- **Email delivery:** >99% (Resend)

---

## Next Steps (Phase 2)

After successful launch, consider:
- [ ] Add more audit checks (healthcare-specific)
- [ ] Create detailed report UI (multi-page)
- [ ] Integrate with CRM (HubSpot, Pipedrive)
- [ ] Add performance metrics (PageSpeed Insights)
- [ ] Implement user authentication
- [ ] Create admin dashboard
- [ ] Add A/B testing for button placement
- [ ] Create export-to-PDF functionality

---

## Support

### If Scan Fails
- Check website URL format
- Verify website is publicly accessible
- Check `AUDIT_TIMEOUT_MS` (increase if needed)
- Check browser console for errors

### If Emails Don't Send
- Verify `RESEND_API_KEY` is valid
- Check `RESEND_FROM_EMAIL` is verified in Resend
- Check `RESEND_NOTIFY_EMAILS` is correct
- Check Resend dashboard for bounces

### If AI Doesn't Generate Summary
- Verify `OPENROUTER_API_KEY` is valid
- Check OpenRouter API usage/credits
- Check OpenRouter API status
- Verify `CALENDLY_BOOKING_URL` format

---

## Questions?

Refer to:
- `AUDIT_SETUP.md` - Setup instructions
- `MVP_SPEC.md` - Feature specifications
- `INTEGRATION_ANALYSIS.md` - Architecture details
- `ARCHITECTURE_DIAGRAMS.md` - Visual diagrams

