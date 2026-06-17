# Implementation Summary: Socialsect AI Growth Assistant

## Quick Reference

### Current Stack
- **Frontend:** React 19 + Vite + React Router
- **Backend:** Vercel serverless functions (Node.js)
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend
- **Design:** CSS custom properties + component-scoped styling

### Decision: Colocate Everything
✅ NO separate backend service (FastAPI)  
✅ Extend existing `/api/*` structure  
✅ Reuse existing Vercel infrastructure  
✅ Integrate as global component (like PodcastBanner)  

---

## Folder Structure (What We're Adding)

### Frontend
```
src/components/growth-auditor/
├── GrowthAuditorLauncher.jsx      ← Floating button
├── GrowthAuditorLauncher.css
├── GrowthAuditorWidget.jsx         ← Main chat panel
├── GrowthAuditorWidget.css
├── AuditStepsFlow.jsx              ← Multi-step conversation
├── AuditStepsFlow.css
├── AuditReport.jsx                 ← Premium report display
├── AuditReport.css
├── ReportSection.jsx               ← Reusable report block
├── ReportSection.css
└── utils/
    ├── auditEngine.js              ← Client helpers
    └── formatters.js
```

### Backend
```
lib/
├── audit/
│   ├── website-scanner.js          ← Fetch & parse
│   ├── seo-analyzer.js             ← SEO checks
│   ├── conversion-analyzer.js      ← CTA/form detection
│   ├── healthcare-detector.js      ← Healthcare checks
│   └── report-generator.js         ← JSON report
├── ai/
│   ├── openrouter-client.js        ← API wrapper
│   └── prompt-templates.js         ← AI prompts
└── audit-service.js                ← Orchestrator

api/audit/
├── scan.js                         ← POST /api/audit/scan
├── report.js                       ← GET /api/audit/report
└── lead-capture.js                 ← POST /api/audit/lead-capture
```

---

## Component Architecture

### 5 React Components

| Component | Responsibility |
|-----------|---|
| **GrowthAuditorLauncher** | Fixed button, bottom-right, opens widget |
| **GrowthAuditorWidget** | Main container, slide-in panel, backdrop |
| **AuditStepsFlow** | State machine: step 1→5, form handling |
| **AuditReport** | Display report sections (SEO, Performance, Conversion, AI) |
| **ReportSection** | Reusable section block with score + findings list |

### Component Flow
```
App.jsx
  └─ GrowthAuditorLauncher (fixed button)
      └─ GrowthAuditorWidget (modal panel)
          └─ AuditStepsFlow (manages steps 1-5)
              ├─ Step 1: URL input
              ├─ Step 2: Loading...
              ├─ Step 3: Partial findings
              ├─ Step 4: Lead form
              └─ Step 5: AuditReport
                  └─ ReportSection × N (SEO, Performance, Conversion, AI)
```

---

## API Endpoints (3 New Routes)

### 1. POST /api/audit/scan
Initiate website audit

**Request:**
```json
{ "url": "https://example.com", "sessionId": "uuid" }
```

**Response:**
```json
{ "auditId": "uuid", "status": "analyzing", "message": "..." }
```

**Backend:**
- Validate URL
- Fetch website content
- Parse HTML (SEO, structure, forms)
- Detect CTAs, buttons, healthcare elements
- Store audit data in Supabase
- Return audit ID

---

### 2. GET /api/audit/report
Retrieve audit findings

**Query:**
```
?auditId=uuid&unlock=true&includeAi=true
```

**Response:**
```json
{
  "auditId": "uuid",
  "website": "https://example.com",
  "audit": {
    "seo": { ... },
    "conversion": { ... },
    "healthcare": { ... },
    "performance": { ... }
  },
  "aiInsights": { ... },
  "opportunityCount": 7
}
```

**Backend:**
- Fetch audit from Supabase
- If `unlock=true`: call OpenRouter for AI insights
- Return comprehensive report

---

### 3. POST /api/audit/lead-capture
Store lead info + unlock full report

**Request:**
```json
{
  "auditId": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Practice"
}
```

**Response:**
```json
{
  "leadId": "uuid",
  "message": "Lead captured successfully",
  "reportUrl": "/api/audit/report?auditId=...",
  "calendlyUrl": "..."
}
```

**Backend:**
- Validate lead data
- Store in Supabase (audit_submissions table)
- Send internal notification email (Resend)
- Send visitor confirmation email with Calendly link
- Log submission
- Return report URL + Calendly link

---

## Website Audit Checks

### SEO (10 checks)
- ✓ Title tag (present, 30–60 chars)
- ✓ Meta description (present, 120–160 chars)
- ✓ H1 count (exactly 1)
- ✓ H2 count (presence)
- ✓ Canonical tag
- ✓ Open Graph tags
- ✓ Twitter card tags
- ✓ Schema markup (JSON-LD)
- ✓ Sitemap.xml
- ✓ Robots.txt

### Conversion (6 checks)
- ✓ Phone numbers
- ✓ Contact forms
- ✓ Email addresses
- ✓ Appointment buttons
- ✓ Booking buttons
- ✓ CTA buttons (count)

### Healthcare-Specific (5 checks)
- ✓ Insurance pages
- ✓ FAQ pages
- ✓ Testimonials/reviews
- ✓ Provider bios
- ✓ Location pages

### Performance (via Google PageSpeed API)
- ✓ Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- ✓ Core Web Vitals (LCP, CLS, INP, FCP, TTFB)

---

## Environment Variables

### NEW (8 vars)
```
GOOGLE_PAGESPEED_API_KEY=...
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=deepseek/deepseek-chat-v3
OPENROUTER_ORGANIZATION_ID=optional
CALENDLY_BOOKING_URL=https://calendly.com/socialsect/strategy
AUDIT_SESSION_EXPIRY_HOURS=24
AUDIT_MAX_WEBSITE_SIZE_KB=5000
AUDIT_TIMEOUT_MS=30000
```

### EXISTING (reused)
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
RESEND_NOTIFY_EMAILS=...
```

---

## Database

### New Supabase Table: audit_submissions
```sql
CREATE TABLE audit_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  website_url TEXT NOT NULL,
  audit_data JSONB,
  ai_insights JSONB,
  lead_name TEXT,
  lead_email TEXT,
  lead_company TEXT,
  report_unlocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_session_id (session_id),
  INDEX idx_email (lead_email)
);
```

---

## Code Reuse (9 Utilities)

| Utility | From | Usage |
|---------|------|-------|
| `runHandler()` | `lib/api-response.js` | API middleware |
| `sendJson()` | `lib/api-response.js` | Response formatter |
| `setCorsHeaders()` | `lib/api-response.js` | CORS headers |
| `getEnv()` | `lib/env.js` | Env config |
| `sendNotificationEmail()` | `lib/email.js` | Internal alerts |
| `sendVisitorConfirmation()` | `lib/email.js` | Lead emails |
| `finializeSubmission()` | `lib/finalize-submission.js` | Email + logging |
| `logSubmission()` | `lib/log-submission.js` | Supabase logging |
| Supabase client | `lib/supabase.js` | DB operations |

---

## Integration Checklist

### Frontend (Step 1)
- [ ] Import `GrowthAuditorLauncher` in `src/App.jsx`
- [ ] Add component before closing `</BrowserRouter>`
- [ ] Create `src/components/growth-auditor/` directory
- [ ] Build 5 React components (use existing Button + CSS patterns)

### Backend (Step 2)
- [ ] Create `/api/audit/` directory (3 endpoints)
- [ ] Create `lib/audit/` directory (5 modules)
- [ ] Create `lib/ai/` directory (2 modules)
- [ ] Implement website-scanner (jsdom or cheerio)
- [ ] Implement SEO/conversion/healthcare analyzers
- [ ] Implement OpenRouter client

### Database (Step 3)
- [ ] Create `audit_submissions` table
- [ ] Add indexes on session_id, lead_email
- [ ] Create migration script

### Configuration (Step 4)
- [ ] Add new env vars to `.env.example`
- [ ] Document in README
- [ ] Update Vercel environment settings

### Testing (Step 5)
- [ ] Unit tests for audit engine
- [ ] End-to-end tests for API endpoints
- [ ] UI tests for React components
- [ ] Email template testing

---

## Reuse of Design System

### Colors (reuse `App.css`)
```css
--primary: #695AF2           /* buttons, links *)
--primary-dark: #503DD8      /* hover states *)
--charcoal: #1A1C1D          /* text *)
--dark-gray: #474555         /* secondary text *)
--gray: #E2E2E2              /* borders *)
--light-gray: #F5F5F7        /* hover *)
--surface: #F9F9FB           /* alt bg *)
--white: #FFFFFF
```

### Typography (reuse `index.css`)
```css
--font-display: 'Newsreader', serif      /* headings *)
--font-body: 'Inter', sans-serif         /* body *)
```

### Spacing Scale (reuse `App.css`)
```css
--xs: 4px
--sm: 16px
--md: 32px
--lg: 60px
--xl: 128px
```

### Component Patterns (reuse Button.jsx)
- `.btn .btn-primary .btn-secondary` classes
- CTA links with variant modifiers
- Mobile-responsive padding

---

## Conversation Flow (5 Steps)

### Step 1: URL Input
```
"Hi, I'm Socialsect's AI Growth Assistant.
I can analyze your website and identify opportunities
to improve visibility, performance, and conversions.

What's your website URL?"

[Input field] [Submit button]
```

### Step 2: Analyzing
```
"Scanning your website..."

[Loader animation]
[Progress: "Checking SEO, conversion elements..."]
```

### Step 3: Partial Findings
```
"We identified 7 opportunities.

Unlock the full report to see detailed insights
and our AI recommendations."

[Form: Name, Email, Company]
[Unlock button]
```

### Step 4: (Intermediate - not shown to user)
Backend generates AI insights via OpenRouter

### Step 5: Full Report
```
[SEO Section]    [Conversion Section]
[Performance]    [AI Recommendations]

"Want help implementing these recommendations?

[Book Free Strategy Call] ← Calendly link
```

---

## Styling Pattern (CSS Modules)

Each component gets `.jsx` + `.css` file:

```javascript
// GrowthAuditorWidget.jsx
import './GrowthAuditorWidget.css'

export default function GrowthAuditorWidget() {
  return (
    <div className="growth-auditor-widget">
      <div className="growth-auditor-widget__header">...</div>
      <div className="growth-auditor-widget__content">...</div>
    </div>
  )
}
```

```css
/* GrowthAuditorWidget.css */
.growth-auditor-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: min(90vw, 420px);
  height: min(80vh, 600px);
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  animation: slideInUp 0.3s ease;
  z-index: 9999;
}

@media (max-width: 768px) {
  .growth-auditor-widget {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }
}
```

---

## Files to Modify

### 1 file to edit:
- `src/App.jsx` ← Add component import + JSX

### 0 files to delete:
(None - only additions)

### 0 files with breaking changes:
(Fully backward compatible)

---

## No Changes to:
- ✅ Routing system (App.jsx routes unchanged)
- ✅ API patterns (reuse existing runHandler)
- ✅ Design system (reuse tokens)
- ✅ Build config (Vite works as-is)
- ✅ Supabase setup (extend existing DB)
- ✅ Email system (reuse Resend)

---

## Production Ready?

Before launch:
- [ ] Rate limiting on `/api/audit/scan`
- [ ] Input validation (URL, email format)
- [ ] Error handling (network, timeout, invalid website)
- [ ] CORS headers configured
- [ ] Environment variables documented
- [ ] Supabase table migrated to production
- [ ] Email templates tested
- [ ] AI prompts tuned & tested
- [ ] Mobile responsive tested
- [ ] Accessibility (a11y) reviewed
- [ ] Performance optimized
- [ ] Security: sanitize website content
- [ ] Logging & monitoring set up

---

## Implementation Order

1. **Backend Foundation** (Week 1)
   - Create `/api/audit/*` endpoints
   - Build website-scanner, analyzers
   - Set up OpenRouter client
   - Create Supabase table

2. **Frontend Components** (Week 1-2)
   - Create 5 React components
   - Wire up to API endpoints
   - Implement conversation flow
   - Style with design system

3. **Integration & Testing** (Week 2)
   - End-to-end flow testing
   - Email template testing
   - Mobile responsive testing
   - Error handling

4. **Polish & Deploy** (Week 2-3)
   - Performance optimization
   - Accessibility review
   - Documentation
   - Deploy to Vercel

---

## Next: Create Spec

Once this analysis is approved, we'll move to the next phase:
1. **Requirements spec** ← Document user needs
2. **Design spec** ← Detailed architecture
3. **Task list** ← Actionable implementation steps

This ensures we're building exactly what you need before any code is written.

