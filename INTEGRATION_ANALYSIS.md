# Socialsect AI Growth Assistant Integration Analysis

## Executive Summary

This document provides a comprehensive analysis of the existing Socialsect website architecture and a detailed integration plan for adding an AI-powered Growth Auditor chatbot. The chatbot will be integrated directly into the existing codebase without creating a separate standalone application.

---

## Part 1: Current Website Architecture

### 1.1 Tech Stack

**Frontend:**
- React 19.2.6 with React Router 7.15.0
- Vite (build tool with HMR support)
- Framer Motion 12.38.0 (animations)
- GSAP 3.15.0 (advanced animations)
- Lucide React 1.14.0 (icons)
- React Draggable 4.6.0

**Backend:**
- Node.js (Vercel serverless functions)
- API routes via `/api/*` endpoint structure
- Middleware for SEO (middleware.js)
- Resend for email (6.12.3)
- Supabase for database (@supabase/supabase-js 2.106.1)
- Sanity for CMS (@sanity/client 7.22.1)

**Styling:**
- CSS custom properties (CSS variables)
- CSS Modules pattern (component.jsx + component.css)
- Responsive design with clamp() and media queries
- Font system: Newsreader (display) + Inter (body)

### 1.2 Design System

**Color Tokens:**
- Primary: #695AF2 (purple)
- Primary Dark: #503DD8 (for hover states)
- Charcoal: #1A1C1D (main text)
- Dark Gray: #474555 (secondary text)
- Gray: #E2E2E2 (borders, rules)
- Light Gray: #F5F5F7 (hover states)
- Surface: #F9F9FB (alternate backgrounds)
- White: #FFFFFF

**Typography:**
- Display: Newsreader serif (400–600 weights)
- Body: Inter sans-serif (400–600 weights)
- Loaded via Google Fonts

**Spacing Scale (8px base):**
- xs: 4px
- sm: 16px
- md: 32px
- lg: 60px
- xl: 128px

**Layout:**
- Container max: 1440px
- Gutter: 24px horizontal padding
- Section vertical rhythm: clamp(48px, 8vw, 64px)

### 1.3 Project Structure

```
socialsect-website/
├── api/                          # Serverless functions
│   ├── articles/
│   │   └── [slug].js
│   ├── book-a-call.js
│   ├── newsletter.js
│   ├── product-demo.js
│   ├── reference-request.js
│   └── resource-download.js
├── lib/                          # Shared backend utilities
│   ├── api-response.js           # CORS, JSON response helpers
│   ├── email.js                  # Email utilities
│   ├── env.js                    # Environment config
│   ├── handlers/                 # Request handlers
│   │   ├── book-a-call.js
│   │   ├── newsletter.js
│   │   ├── product-demo.js
│   │   ├── reference-request.js
│   │   └── resource-download.js
│   ├── email-templates/
│   ├── finalize-submission.js    # Logging + email dispatch
│   ├── log-submission.js         # Supabase logging
│   ├── submission-meta.js        # Metadata helpers
│   └── supabase.js               # DB client
├── src/                          # Frontend React app
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── [Other components]
│   ├── pages/
│   │   ├── homepage/
│   │   ├── services/
│   │   ├── book-a-call/
│   │   └── [Other pages]
│   ├── App.jsx                   # Main routing
│   ├── App.css                   # Global design tokens
│   └── index.css                 # Global typography
├── public/                       # Static assets
│   ├── icons/
│   ├── client-logos/
│   └── fonts/
├── middleware.js                 # SEO middleware for crawlers
├── package.json
└── README.md
```

### 1.4 Existing API Pattern

**Structure:**
```
/api/[endpoint].js  →  handler(req, res)
                      ↓
            runHandler(req, res, processor)
                      ↓
            processor(payload, requestMeta)
                      ↓
            Response: { data } or { error }
```

**Example: `/api/book-a-call.js`**
```javascript
import { runHandler } from '../lib/api-response.js'
import { processBookACall } from '../lib/handlers/book-a-call.js'

export default function handler(req, res) {
  return runHandler(req, res, processBookACall)
}
```

**Utilities:**
- `setCorsHeaders(res)` - CORS headers
- `sendJson(res, statusCode, body)` - JSON response
- `runHandler(req, res, processor)` - Standard middleware

**Environment Management:**
- `getEnv(name, { required })` - Safe env access
- `getResendConfig()` - Email config
- Environment variables via `.env` or Vercel settings

### 1.5 Email & Logging System

**Resend Integration:**
- `sendNotificationEmail()` - Internal alerts
- `sendVisitorConfirmation()` - Lead confirmation emails
- From address: `RESEND_FROM_EMAIL` (with optional `RESEND_FROM_NAME`)
- Recipients: `RESEND_NOTIFY_EMAILS` (comma-separated)

**Supabase Logging:**
- `logSubmission()` in `lib/log-submission.js`
- Stores: name, email, endpoint, timestamp, user agent

**Email Templates:**
- Located in `lib/email-templates/`
- HTML-based templates with layout wrapper

---

## Part 2: Integration Plan

### 2.1 Scope & Objectives

**Primary Goal:**
Create an AI-powered Website Growth Auditor that captures website URLs, performs audits, generates insights, and drives strategy call bookings.

**Not A Generic Support Chatbot:**
- Specialized for lead generation
- Focuses on website audit + recommendations
- Final CTA: Strategy call booking

**Deliverables:**
1. Floating chatbot launcher (bottom-right)
2. Multi-step conversation flow
3. Website audit engine
4. AI-powered insights
5. Lead capture form
6. Premium report UI
7. Strategy call CTA

### 2.2 Architecture Decisions

#### Backend Architecture

**Decision: Colocate API routes (no separate backend service required)**

Rationale:
- Existing Vercel serverless setup handles API requests efficiently
- No need for a separate FastAPI or Express service
- Can add new routes alongside existing `/api/*` endpoints
- Email & logging infrastructure already in place

**New API Routes:**
```
/api/audit/scan          - Submit website URL, trigger audit
/api/audit/report        - Retrieve full audit report
/api/audit/lead-capture  - Store lead information
```

#### Frontend Architecture

**Decision: Integrate as a global component (like PodcastBanner)**

Rationale:
- Persistent across all pages
- Matches existing pattern (PodcastBanner is global in App.jsx)
- Minimal footprint on page load
- Can be easily toggled or dismissed

**Component Structure:**
```
src/components/growth-auditor/
├── GrowthAuditorLauncher.jsx     # Floating button
├── GrowthAuditorWidget.jsx        # Main chat interface
├── AuditStepsFlow.jsx             # Multi-step conversation
├── AuditReport.jsx                # Premium report display
└── GrowthAuditorWidget.css        # All styling
```

### 2.3 Integration Points

#### Frontend Integration

**In `src/App.jsx`:**
```javascript
// Add import at top
import GrowthAuditorLauncher from './components/growth-auditor/GrowthAuditorLauncher'

// Add component in JSX before closing BrowserRouter
<GrowthAuditorLauncher />
```

**In `src/App.css` (or dedicated file):**
Add CSS variables for chatbot styling (reuse existing tokens where possible)

#### Backend Integration

**New Files:**
```
lib/handlers/website-audit.js      # Audit logic
lib/audit-engine.js                # Core audit service
lib/ai-insights.js                 # OpenRouter integration
api/audit/scan.js                  # API endpoint
api/audit/report.js                # API endpoint
api/audit/lead-capture.js          # API endpoint
```

**Existing Utilities to Reuse:**
- `runHandler()` from `lib/api-response.js`
- `getEnv()` from `lib/env.js`
- `sendNotificationEmail()` from `lib/email.js`
- `finializeSubmission()` from `lib/finalize-submission.js`
- `logSubmission()` from `lib/log-submission.js`
- Supabase client from `lib/supabase.js`

---

## Part 3: Folder Structure Changes

### 3.1 New Frontend Directories

```
src/components/growth-auditor/
├── GrowthAuditorLauncher.jsx
├── GrowthAuditorLauncher.css
├── GrowthAuditorWidget.jsx
├── GrowthAuditorWidget.css
├── AuditStepsFlow.jsx
├── AuditStepsFlow.css
├── AuditReport.jsx
├── AuditReport.css
├── ReportSection.jsx
├── ReportSection.css
└── utils/
    ├── auditEngine.js            # Client-side audit helpers
    └── formatters.js             # Data formatting utilities
```

### 3.2 New Backend Directories

```
lib/
├── audit/
│   ├── website-scanner.js        # Fetch & parse websites
│   ├── seo-analyzer.js           # SEO checks
│   ├── conversion-analyzer.js    # CTA/form detection
│   ├── healthcare-detector.js    # Healthcare-specific checks
│   └── report-generator.js       # JSON report generation
├── ai/
│   ├── openrouter-client.js      # OpenRouter API wrapper
│   └── prompt-templates.js       # AI prompts
└── audit-service.js              # Main orchestrator

api/audit/
├── scan.js                       # POST /api/audit/scan
├── report.js                     # GET /api/audit/report?id=...
└── lead-capture.js               # POST /api/audit/lead-capture
```

### 3.3 Database Schema

**New Supabase Table: `audit_submissions`**
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
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Part 4: Components to be Added

### 4.1 Frontend Components

#### 1. **GrowthAuditorLauncher** (Container)
- Floating button (bottom-right, fixed position)
- Matches Socialsect branding (purple primary color)
- Smooth animation on hover
- Mobile responsive
- Opens/closes main widget

#### 2. **GrowthAuditorWidget** (Main Interface)
- Slide-in panel from bottom-right
- Modal backdrop (semi-transparent)
- Header with title + close button
- Content area with step navigation
- Matches design system (colors, typography, spacing)

#### 3. **AuditStepsFlow** (Conversation Flow)
- **Step 1:** URL input
- **Step 2:** Audit in progress (loader)
- **Step 3:** Partial findings (preview)
- **Step 4:** Lead capture form
- **Step 5:** Full report + strategy call CTA
- Progress indicator or step counter

#### 4. **AuditReport** (Premium Report)
- Sectioned layout (SEO, Performance, Conversion, AI Recommendations)
- Score cards with visual indicators
- Expandable sections
- Professional styling (matches website aesthetic)

#### 5. **ReportSection** (Reusable Report Block)
- Title, score/status, findings list
- Icon + color coding (good/warning/issue)
- Expandable/collapsible

### 4.2 Styling Approach

**Reuse Design System:**
- Primary color: `#695AF2`
- Typography: Newsreader (headings), Inter (body)
- Spacing scale: Use existing CSS variables
- Border radius: Match button radius (4px)
- Shadows: Subtle elevation (consistent with cards)

**New Component-Specific Tokens:**
```css
/* In GrowthAuditorWidget.css */
--auditor-panel-width: min(90vw, 420px)
--auditor-panel-height: min(80vh, 600px)
--auditor-animation-duration: 0.3s
```

---

## Part 5: API Endpoints to be Created

### 5.1 Endpoint: `POST /api/audit/scan`

**Purpose:** Initiate website audit

**Request:**
```json
{
  "url": "https://example.com",
  "sessionId": "session-uuid"
}
```

**Response:**
```json
{
  "auditId": "audit-uuid",
  "status": "analyzing",
  "message": "Scanning your website..."
}
```

**Backend Logic:**
1. Validate URL format
2. Fetch website content
3. Parse HTML (SEO, structure, tags)
4. Detect forms, CTAs, buttons
5. Check healthcare-specific elements
6. Store audit data in Supabase
7. Return audit ID + status

---

### 5.2 Endpoint: `GET /api/audit/report`

**Purpose:** Retrieve audit findings

**Query Params:**
```
?auditId=audit-uuid&unlock=true&includeAi=true
```

**Response:**
```json
{
  "auditId": "audit-uuid",
  "website": "https://example.com",
  "audit": {
    "seo": { /* checks */ },
    "conversion": { /* checks */ },
    "healthcare": { /* checks */ },
    "performance": { /* PageSpeed data */ }
  },
  "aiInsights": {
    "strengths": ["..."],
    "weaknesses": ["..."],
    "businessImpact": "...",
    "nextActions": ["..."]
  },
  "opportunityCount": 7
}
```

**Backend Logic:**
1. Fetch audit data from Supabase
2. If `unlock=true`: Generate full AI insights
3. If `includeAi=true`: Call OpenRouter API
4. Return comprehensive report

---

### 5.3 Endpoint: `POST /api/audit/lead-capture`

**Purpose:** Store lead information + unlock full report

**Request:**
```json
{
  "auditId": "audit-uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Practice",
  "calendlyUrl": "from-env"
}
```

**Response:**
```json
{
  "leadId": "lead-uuid",
  "message": "Lead captured successfully",
  "reportUrl": "/api/audit/report?auditId=...",
  "calendlyUrl": "..."
}
```

**Backend Logic:**
1. Validate lead data
2. Store in Supabase (audit_submissions)
3. Send internal notification email
4. Send visitor confirmation email (with Calendly link)
5. Log submission
6. Return report URL + Calendly link

---

### 5.4 Endpoint: `GET /api/audit/health`

**Purpose:** Health check for dependencies

**Response:**
```json
{
  "status": "ok",
  "dependencies": {
    "supabase": "connected",
    "openrouter": "connected",
    "pagespeed": "configured"
  }
}
```

---

## Part 6: Environment Variables

### 6.1 New Environment Variables

**Google PageSpeed Insights API:**
```
GOOGLE_PAGESPEED_API_KEY=your_key
```

**OpenRouter API:**
```
OPENROUTER_API_KEY=your_key
OPENROUTER_MODEL=deepseek/deepseek-chat-v3
OPENROUTER_ORGANIZATION_ID=optional
```

**Calendly Integration:**
```
CALENDLY_BOOKING_URL=https://calendly.com/socialsect/strategy
```

**Audit Service Configuration:**
```
AUDIT_SESSION_EXPIRY_HOURS=24
AUDIT_MAX_WEBSITE_SIZE_KB=5000
AUDIT_TIMEOUT_MS=30000
```

### 6.2 Existing Environment Variables (Reused)

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_NOTIFY_EMAILS`

---

## Part 7: Key Implementation Details

### 7.1 Website Audit Engine

**SEO Checks:**
- Title tag (present, length 30–60 chars)
- Meta description (present, length 120–160 chars)
- H1 count (exactly 1)
- H2 count (presence)
- Canonical tag (present, valid)
- Open Graph tags (present)
- Twitter card tags (present)
- Schema markup (present, valid JSON-LD)
- Sitemap.xml (accessible, valid)
- Robots.txt (accessible)

**Conversion Checks:**
- Phone numbers (visible, clickable)
- Contact forms (present, accessible)
- Email addresses (present, obfuscated)
- Appointment buttons (present)
- Booking buttons (present)
- CTA buttons (count, placement)

**Healthcare-Specific:**
- Insurance pages (detected)
- FAQ pages (detected)
- Testimonials/reviews (detected)
- Provider bios (detected)
- Location pages (detected)

**Performance (via Google PageSpeed API):**
- Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals (LCP, CLS, INP, FCP, TTFB)

---

### 7.2 AI Layer (OpenRouter)

**Model:** `deepseek/deepseek-chat-v3`

**Prompt Structure:**
```
Analyze this website audit and provide business-focused insights:

[Audit JSON]

Respond with:
1. 2-3 key strengths
2. 3-5 biggest weaknesses (business impact)
3. Potential revenue impact
4. 3 recommended next actions

Explain in plain language, not technical jargon.
```

**Output Format:**
```json
{
  "strengths": ["..."],
  "weaknesses": ["..."],
  "businessImpact": "...",
  "nextActions": ["..."]
}
```

---

### 7.3 Lead Capture & Email Flow

**On Lead Capture:**

1. **Internal Notification** (to `RESEND_NOTIFY_EMAILS`):
   - Subject: "Website Audit Lead: [Company]"
   - Body: Lead details + audit summary

2. **Visitor Confirmation** (to lead's email):
   - Subject: "Your Website Growth Audit — Socialsect"
   - Body: Report preview + Calendly booking link

3. **Database Logging:**
   - Store in `audit_submissions` table
   - Timestamp + user agent

---

## Part 8: Data Flow Diagram

```
User enters website URL
        ↓
POST /api/audit/scan
        ↓
Backend: scan, parse, analyze website
        ↓
Store audit data in Supabase
        ↓
Return partial findings
        ↓
User enters name, email, company
        ↓
POST /api/audit/lead-capture
        ↓
Backend: generate AI insights, send emails
        ↓
Display full report + Calendly CTA
```

---

## Part 9: Reusability of Existing Code

### 9.1 What We'll Reuse

| Component | Reused From | Usage |
|-----------|-------------|-------|
| Button styling | `Button.jsx` + `Button.css` | Audit widgets |
| Color tokens | `App.css` | Global styling |
| Typography | `index.css` | All text |
| Spacing scale | `App.css` (--sm, --md, --lg, etc.) | Layout |
| API patterns | `lib/api-response.js` | New endpoints |
| Email utilities | `lib/email.js` | Lead notifications |
| Environment config | `lib/env.js` | API key access |
| Supabase client | `lib/supabase.js` | Database operations |
| Logging | `lib/log-submission.js` | Audit logging |

### 9.2 What We'll Create New

| Component | Purpose |
|-----------|---------|
| Website scanner library | Fetch & parse websites |
| SEO analyzer library | Audit SEO elements |
| Conversion detector | Identify CTAs/forms |
| Healthcare checker | Detect healthcare elements |
| OpenRouter client | AI insights generation |
| Audit React components | UI for chat flow |
| Audit service | Backend orchestration |

---

## Part 10: Production Readiness Checklist

- [ ] Error handling for all network requests
- [ ] Rate limiting on `/api/audit/scan` (prevent abuse)
- [ ] Input validation (URL, email, company name)
- [ ] CORS headers configured
- [ ] Environment variables documented
- [ ] Supabase migrations tested
- [ ] Email templates tested
- [ ] AI prompt tuned for consistent output
- [ ] Mobile responsive design tested
- [ ] Accessibility (a11y) review
- [ ] Performance optimized (lazy load widget)
- [ ] Security: sanitize website content
- [ ] Logging & monitoring configured
- [ ] Documentation updated

---

## Part 11: Summary of Changes

### Frontend Changes
1. Add `GrowthAuditorLauncher` component to `src/App.jsx`
2. Create `src/components/growth-auditor/` directory with 5 new components
3. Add component-specific CSS (reuse design tokens)
4. Add client-side audit helper utilities

### Backend Changes
1. Create `/api/audit/` directory with 3 new endpoints
2. Create `lib/audit/` directory with audit engine modules
3. Create `lib/ai/` directory with OpenRouter integration
4. Create new Supabase table for audit submissions
5. Update `.env.example` with new variables

### No Changes Needed
- App.jsx routing (chatbot is global component, like PodcastBanner)
- Existing API patterns (reuse runHandler, sendJson, etc.)
- Design system (reuse colors, typography, spacing)
- Build configuration (Vite handles everything)

---

## Next Steps

1. **Requirements & Design Phase** → Create detailed spec
2. **Backend Implementation** → Website scanner + API endpoints
3. **Frontend Implementation** → Chat UI components
4. **Integration Testing** → End-to-end flow
5. **Deployment** → Deploy to Vercel
6. **Monitoring** → Track conversions & quality

