# Architecture Diagrams

## 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────┐                   │
│  │  Socialsect Website (React + Vite)   │                   │
│  ├──────────────────────────────────────┤                   │
│  │  - Navbar, Homepage, Services, etc   │                   │
│  │  - GrowthAuditorLauncher (global)    │                   │
│  │    └─ GrowthAuditorWidget            │                   │
│  │       └─ AuditStepsFlow              │                   │
│  │          └─ AuditReport              │                   │
│  └──────────────────────────────────────┘                   │
│           │                                                   │
│           ├─→ POST /api/audit/scan                          │
│           ├─→ GET /api/audit/report                         │
│           └─→ POST /api/audit/lead-capture                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
           │
           │ HTTPS
           │
┌──────────────────────────────────────────────────────────────┐
│           Vercel Serverless (Node.js)                         │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐  │
│  │ /api/audit/scan │  │/api/audit/report│  │ lead-capture │  │
│  └────────┬────────┘  └────────┬────────┘  └──────┬───────┘  │
│           │                    │                  │           │
│           └────────┬───────────┴──────────────────┘           │
│                    │                                           │
│           ┌────────▼──────────┐                                │
│           │ lib/audit-service │ (orchestrator)                │
│           └────────┬──────────┘                                │
│                    │                                           │
│    ┌───────────────┼───────────────┐                          │
│    │               │               │                          │
│    ▼               ▼               ▼                          │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│ │ website- │  │   seo-   │  │conversion│                     │
│ │ scanner  │  │ analyzer │  │-analyzer │                     │
│ └──────────┘  └──────────┘  └──────────┘                     │
│    │               │               │                          │
│    │               └───────┬───────┘                          │
│    │                       │                                   │
│    │          ┌────────────▼────────────┐                    │
│    └──────────┤ healthcare-detector    │                    │
│               │ report-generator       │                    │
│               └────────────┬────────────┘                    │
│                            │                                   │
│    ┌───────────────────────┘                                 │
│    │                                                           │
│    ▼                                                           │
│ lib/ai/                                                       │
│ ├─ openrouter-client.js ──→ OpenRouter API                   │
│ │  (deepseek/deepseek-chat-v3)                               │
│ └─ prompt-templates.js                                       │
│                                                                │
└──────────────────────────────────────────────────────────────┘
           │
           ├─→ Supabase (PostgreSQL)
           ├─→ Resend (Email)
           ├─→ Google PageSpeed API
           └─→ OpenRouter API
```

## 2. React Component Hierarchy

```
App.jsx
│
├─ Navbar
├─ HomePage / Services / ... (other pages)
├─ GrowthAuditorLauncher
│  └─ GrowthAuditorWidget (state container)
│     │
│     ├─ Modal backdrop (click to close)
│     ├─ Header (title + close button)
│     │
│     └─ AuditStepsFlow (step router)
│        │
│        ├─ Step 1: URL Input
│        │  └─ <input type="url" />
│        │     <button onClick={handleScan} />
│        │
│        ├─ Step 2: Loading
│        │  └─ <Loader /> + <ProgressMessage />
│        │
│        ├─ Step 3: Partial Findings Preview
│        │  └─ "We identified X opportunities"
│        │     <Form: name, email, company />
│        │
│        ├─ Step 4: [internal - no UI]
│        │  └─ Fetch full report from API
│        │
│        └─ Step 5: AuditReport
│           ├─ <ReportSection> (SEO)
│           ├─ <ReportSection> (Performance)
│           ├─ <ReportSection> (Conversion)
│           ├─ <ReportSection> (Healthcare)
│           └─ <ReportSection> (AI Insights)
│              └─ [Book Strategy Call CTA]
│
├─ PodcastBanner (existing)
└─ Footer
```

## 3. Data Flow: User Submits URL

```
┌─────────────┐
│ User enters │
│  URL in UI  │
└──────┬──────┘
       │
       ▼
┌────────────────────────────┐
│ Validate URL format        │
│ Generate sessionId         │
└──────┬─────────────────────┘
       │
       ▼
┌────────────────────────────┐
│ POST /api/audit/scan       │
│ { url, sessionId }         │
└──────┬─────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│ Server: website-scanner.js          │
│ - Fetch website HTML                │
│ - Parse with jsdom/cheerio          │
│ - Extract metadata                  │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│ Server: Run all analyzers           │
│ ├─ seo-analyzer.js                  │
│ ├─ conversion-analyzer.js           │
│ ├─ healthcare-detector.js           │
│ └─ (fetch PageSpeed data)           │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│ Store audit data in Supabase        │
│ audit_submissions table             │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│ Return to client:                   │
│ { auditId, status, message }        │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│ Client: Step 2 → Step 3             │
│ Show partial findings               │
│ Display lead capture form           │
└─────────────────────────────────────┘
```

## 4. Data Flow: User Captures Lead

```
┌──────────────────┐
│ User fills form: │
│ - Name           │
│ - Email          │
│ - Company        │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Validate email format            │
│ Generate leadId                  │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ POST /api/audit/lead-capture     │
│ { auditId, name, email, company }│
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Server: Validate & store lead    │
│ - Update audit_submissions       │
│ - Mark report_unlocked = true    │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Server: Call OpenRouter API      │
│ lib/ai/openrouter-client.js      │
│ → deepseek/deepseek-chat-v3      │
│ → Generate AI insights           │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Server: Send emails              │
│                                  │
│ 1. Internal notification         │
│    (to RESEND_NOTIFY_EMAILS)     │
│                                  │
│ 2. Visitor confirmation          │
│    (to lead email + Calendly URL)│
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Server: Log submission           │
│ - Supabase logging               │
│ - Metadata (user agent, etc)     │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Return to client:                │
│ { leadId, reportUrl,             │
│   calendlyUrl }                  │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Client: Step 5 → Full Report     │
│ - Display AuditReport component  │
│ - Show Strategy Call CTA         │
└──────────────────────────────────┘
```

## 5. API Endpoint Architecture

```
Request Format:
┌─────────────────────────────────┐
│  POST /api/audit/scan           │
├─────────────────────────────────┤
│ Content-Type: application/json  │
│ CORS: * (allowed)               │
├─────────────────────────────────┤
│ Body:                           │
│ {                               │
│   "url": "https://example.com"  │
│   "sessionId": "uuid"           │
│ }                               │
└─────────────────────────────────┘

Handler Chain:
┌───────────────────────────────────┐
│ api/audit/scan.js                 │
└───────────────┬─────────────────────┘
                │
                ▼
┌───────────────────────────────────┐
│ runHandler(req, res, processor)   │
│ - Set CORS headers                │
│ - Parse request body              │
│ - Handle OPTIONS request          │
└───────────────┬─────────────────────┘
                │
                ▼
┌───────────────────────────────────┐
│ processor = processAuditScan()    │
│ - Validate URL                    │
│ - Call audit-service.js           │
│ - Handle errors                   │
└───────────────┬─────────────────────┘
                │
                ▼
┌───────────────────────────────────┐
│ sendJson(res, 200, result)        │
│ Content-Type: application/json    │
└───────────────────────────────────┘
```

## 6. Database Schema

```
audit_submissions table:

id (UUID)                    ← Primary key
├─ session_id (TEXT)        ← User browser session
├─ website_url (TEXT)       ← Submitted URL
├─ audit_data (JSONB)       ← Raw scan results
│  └─ {
│      seo: {...},
│      conversion: {...},
│      healthcare: {...},
│      performance: {...}
│     }
├─ ai_insights (JSONB)      ← OpenRouter response
│  └─ {
│      strengths: [...],
│      weaknesses: [...],
│      businessImpact: "",
│      nextActions: [...]
│     }
├─ lead_name (TEXT)         ← From form
├─ lead_email (TEXT)        ← From form (indexed)
├─ lead_company (TEXT)      ← From form
├─ report_unlocked (BOOL)   ← After form submission
├─ created_at (TIMESTAMP)   ← Auto-set
└─ updated_at (TIMESTAMP)   ← Auto-update

Indexes:
- PRIMARY KEY on id
- BTREE on session_id
- BTREE on lead_email
```

## 7. Styling Architecture

```
Global CSS Tokens (App.css)
├─ Colors
│  ├─ --primary: #695AF2
│  ├─ --primary-dark: #503DD8
│  ├─ --charcoal: #1A1C1D
│  ├─ --dark-gray: #474555
│  ├─ --gray: #E2E2E2
│  ├─ --light-gray: #F5F5F7
│  ├─ --surface: #F9F9FB
│  └─ --white: #FFFFFF
├─ Typography
│  ├─ --font-display: 'Newsreader', serif
│  └─ --font-body: 'Inter', sans-serif
└─ Spacing
   ├─ --xs: 4px
   ├─ --sm: 16px
   ├─ --md: 32px
   ├─ --lg: 60px
   └─ --xl: 128px

Component CSS Modules:
GrowthAuditorWidget.css
├─ .growth-auditor-widget (fixed positioning)
├─ .growth-auditor-widget__header
├─ .growth-auditor-widget__content
├─ .growth-auditor-widget__backdrop
└─ @media (max-width: 768px) { mobile styles }

ReportSection.css
├─ .report-section
├─ .report-section__title
├─ .report-section__score
├─ .report-section__findings
└─ .report-section--expanded

Color Coding:
✓ Good     → --primary (#695AF2)
⚠ Warning  → #F59E0B (amber)
✗ Issue    → #EF4444 (red)
```

## 8. Error Handling Flow

```
┌─────────────────────────────────┐
│ User submits URL                │
└────────┬────────────────────────┘
         │
         ▼
    Valid? ─── NO ──→ Show error: "Invalid URL format"
    │
   YES
    │
    ▼
POST /api/audit/scan
    │
    ├─ Network timeout? ──→ "Request timed out. Try again."
    │
    ├─ Invalid domain? ──→ "Website not found. Check URL."
    │
    ├─ Website too large? ──→ "Website exceeds size limit."
    │
    ├─ Server error? ──→ "Something went wrong. Try again."
    │
   ✓
    ▼
Store audit data
    │
    ├─ Supabase down? ──→ Log error, retry with exponential backoff
    │
   ✓
    ▼
Return audit results
    │
    ├─ Display partial findings
    └─ Show lead capture form
```

## 9. Performance Optimization

```
Code Splitting:
├─ Main bundle
│  └─ Navbar, Footer, HomePage (loaded immediately)
│
├─ growth-auditor/ (lazy loaded)
│  ├─ GrowthAuditorLauncher
│  ├─ GrowthAuditorWidget
│  ├─ AuditStepsFlow
│  ├─ AuditReport
│  └─ ReportSection
│
└─ Other pages (already lazy loaded)

Widget Load Timing:
1. Page loads (no growth-auditor bundle yet)
2. User scrolls down (or waits 5s)
3. Lazy-load growth-auditor bundle
4. Mount GrowthAuditorLauncher button
5. User clicks button → Mount GrowthAuditorWidget

API Caching:
├─ Audit data cached in Supabase (24h)
├─ AI insights generated once, cached
└─ Client-side caching of report (sessionStorage)

Mobile Optimization:
├─ Widget takes full screen on mobile (100vw, 100vh)
├─ Form inputs optimized for touch
├─ Minimal animations on low-end devices
└─ Lazy-loaded images in report sections
```

## 10. Security Considerations

```
Input Validation:
├─ URL format (regex + URL parsing)
├─ Email format (regex + verification)
├─ Company name (sanitize HTML)
├─ Form length limits

Content Security:
├─ Fetch external websites only (verify domain)
├─ Sanitize HTML before parsing
├─ Remove scripts/iframes
├─ Limit crawl depth

API Security:
├─ CORS headers (allow *) [audit is public lead-gen]
├─ Rate limiting (10 audits per IP per hour)
├─ Request timeout (30s)
├─ Max website size (5MB)

Database Security:
├─ All queries parameterized (Supabase ORM)
├─ Sensitive data encrypted at rest
├─ Access logs retained
└─ Regular backups

Email Security:
├─ Verify Resend domain
├─ Unsubscribe links in confirmation
├─ SPF/DKIM/DMARC configured
└─ No sensitive data in email subject
```

