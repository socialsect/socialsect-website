# MVP Specification: Socialsect AI Growth Assistant

**Goal:** Production-ready, deployable in hours.  
**Scope:** Minimal viable feature set, maximum impact.  
**Deployment:** Same-day to Vercel.

---

## What We're Building

### User Journey (3 Steps)
1. Click floating button → Enter website URL
2. See instant score + AI summary (150 words)
3. Enter name/email → Book Calendly call

### Not Building (for now)
- ❌ Public report URLs / session restoration
- ❌ Multi-page report UI / expandable sections
- ❌ CRM integrations / Notion / HubSpot
- ❌ Advanced competitor analysis
- ❌ User accounts / authentication

---

## Frontend (Simplified)

### 2 Components Only

**1. GrowthAuditorLauncher**
- Fixed button (bottom-right)
- Opens/closes modal
- 50 lines of code

**2. GrowthAuditorWidget**
- Modal panel with 2 screens:
  - Screen 1: URL input → Loading → Quick score
  - Screen 2: Lead form (name, email)
- 200 lines of code

**Total Frontend:** ~300 lines of React + 150 lines of CSS

### No Sub-Components
- Forget AuditReport, ReportSection, AuditStepsFlow
- One component handles all 2 screens
- Simple state machine: `screen = 'input' | 'loading' | 'score' | 'form'`

### Styling
- Reuse Button.jsx styles
- Use App.css tokens
- Simple slide-in animation
- Mobile: full-screen modal

---

## Backend (Minimal)

### 2 Endpoints Only

```
POST /api/audit                ← Scan website + return instant score
POST /api/audit/lead-capture   ← Store lead + send emails
```

### No Advanced Routes
- No `GET /api/audit/report`
- No health checks
- No separate report endpoints

---

## Audit Engine: 9 Checks (Fixed)

### SEO (3)
1. Title tag (present?)
2. Meta description (present?)
3. H1 tag (present?)

### Structure (3)
1. Schema markup (JSON-LD present?)
2. Robots.txt (accessible?)
3. Sitemap.xml (accessible?)

### Conversion (3)
1. Phone number (visible?)
2. Contact form (present?)
3. CTA button (present?)

---

## Scoring System (Simple)

```javascript
// Each check = 1 point
// Total = 9 points

seoScore = (titleOk + descOk + h1Ok) / 3 * 100          // 0-100
structureScore = (schema + robots + sitemap) / 3 * 100  // 0-100
conversionScore = (phone + form + cta) / 3 * 100        // 0-100

overallScore = (seoScore + structureScore + conversionScore) / 3

// Color codes
if (overallScore >= 75) color = "green"     // Good
if (overallScore >= 50) color = "yellow"    // Needs work
if (overallScore < 50)  color = "red"       // Critical
```

---

## API Responses (Simplified)

### POST /api/audit

**Request:**
```json
{
  "url": "https://example.com",
  "sessionId": "uuid"
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
  "summary": "Your website has solid SEO basics but lacks conversion elements. Add a contact form and prominent phone number to improve lead capture.",
  "topIssues": [
    "No visible contact form",
    "Missing schema markup",
    "No CTA buttons above the fold"
  ]
}
```

### POST /api/audit/lead-capture

**Request:**
```json
{
  "url": "https://example.com",
  "score": 66,
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead captured! Check your email.",
  "calendlyUrl": "https://calendly.com/socialsect/strategy"
}
```

---

## Backend Modules (3 Files)

### 1. lib/audit/quick-scanner.js
```javascript
export async function scanWebsite(url) {
  // 1. Fetch HTML (30s timeout, 5MB limit)
  // 2. Parse with jsdom or cheerio
  // 3. Run 9 checks
  // 4. Return { seo, structure, conversion, overall }
}
```

### 2. lib/ai/quick-summary.js
```javascript
export async function generateSummary(scores, website) {
  // 1. Call OpenRouter once
  // 2. Send: { scores, website URL, topIssues }
  // 3. Return: 150-word business-focused summary
  // 4. Cache result (30 min)
}
```

### 3. lib/audit-service.js (Orchestrator)
```javascript
export async function runAudit(url) {
  try {
    const scores = await scanWebsite(url)
    const summary = await generateSummary(scores, url)
    
    // Store in Supabase (simple table)
    await supabase.from('audits').insert({
      website_url: url,
      scores: scores,
      summary: summary,
      created_at: new Date()
    })
    
    return { success: true, scores, summary }
  } catch (e) {
    return { success: false, error: e.message }
  }
}
```

---

## API Implementation (2 Files)

### api/audit.js
```javascript
import { runHandler } from '../lib/api-response.js'
import { processAudit } from '../lib/handlers/audit.js'

export default function handler(req, res) {
  return runHandler(req, res, processAudit)
}
```

### api/audit/lead-capture.js
```javascript
import { runHandler } from '../../lib/api-response.js'
import { captureAuditLead } from '../../lib/handlers/audit-lead.js'

export default function handler(req, res) {
  return runHandler(req, res, captureAuditLead)
}
```

---

## Database (1 Table)

```sql
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_url TEXT NOT NULL,
  scores JSONB,           -- { seo, structure, conversion, overall }
  summary TEXT,
  lead_name TEXT,
  lead_email TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_email ON audits(lead_email);
```

**That's it.** No audit_submissions, no separate columns, no complex schema.

---

## Frontend Component (Single File)

### src/components/growth-auditor/GrowthAuditorWidget.jsx

```jsx
export default function GrowthAuditorWidget() {
  const [screen, setScreen] = useState('input')     // input | loading | score | form
  const [url, setUrl] = useState('')
  const [scores, setScores] = useState(null)
  const [summary, setSummary] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '' })

  const handleScan = async () => {
    setScreen('loading')
    const res = await fetch('/api/audit', {
      method: 'POST',
      body: JSON.stringify({ url, sessionId: generateId() })
    })
    const data = await res.json()
    setScores(data.scores)
    setSummary(data.summary)
    setScreen('score')
  }

  const handleSubmit = async () => {
    const res = await fetch('/api/audit/lead-capture', {
      method: 'POST',
      body: JSON.stringify({ url, scores, ...formData })
    })
    const data = await res.json()
    window.open(data.calendlyUrl, '_blank')
    setScreen('form') // or close modal
  }

  return (
    <div className="auditor-widget">
      {screen === 'input' && (
        <>
          <h2>Website Growth Audit</h2>
          <input value={url} onChange={e => setUrl(e.target.value)} />
          <button onClick={handleScan}>Analyze</button>
        </>
      )}
      
      {screen === 'loading' && <p>Scanning...</p>}
      
      {screen === 'score' && (
        <>
          <h2>Your Score: {scores.overall}</h2>
          <div className="scores">
            <div>SEO: {scores.seo}</div>
            <div>Structure: {scores.structure}</div>
            <div>Conversion: {scores.conversion}</div>
          </div>
          <p>{summary}</p>
          <button onClick={() => setScreen('form')}>Unlock Full Report</button>
        </>
      )}
      
      {screen === 'form' && (
        <>
          <input 
            placeholder="Name" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input 
            placeholder="Email" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <button onClick={handleSubmit}>Book Strategy Call</button>
        </>
      )}
    </div>
  )
}
```

**~200 lines total with full logic.**

---

## Environment Variables (Minimal)

```bash
# New
OPENROUTER_API_KEY=...
CALENDLY_BOOKING_URL=https://calendly.com/socialsect/strategy

# Existing (reuse)
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
RESEND_NOTIFY_EMAILS=...
```

---

## Email Flow (Simple)

### Internal Notification (to team)
```
Subject: Website Audit Lead: {domain}

Website: https://example.com
Score: 66/100
Lead: John Doe (john@example.com)
Time: [timestamp]
```

### Visitor Confirmation (to lead)
```
Subject: Your Website Audit - Socialsect

Hi John,

Here's your website growth audit for example.com:
- SEO Score: 66
- Structure Score: 100
- Conversion Score: 33

Your AI-generated summary:
[summary text]

Ready to improve these scores? Book a free strategy call:
[CALENDLY_BOOKING_URL]

Cheers,
Socialsect Team
```

---

## File Structure (MVP)

```
src/components/growth-auditor/
├── GrowthAuditorLauncher.jsx
├── GrowthAuditorWidget.jsx
└── GrowthAuditorWidget.css

lib/audit/
├── quick-scanner.js
└── audit-service.js

lib/ai/
└── quick-summary.js

lib/handlers/
├── audit.js
└── audit-lead.js

api/audit/
├── index.js  (or scan.js)
└── lead-capture.js
```

**Total: ~1,500 lines of code (backend) + 300 lines (frontend)**

---

## Implementation Checklist (4 Hours)

- [ ] **Hour 1:** Backend scanning engine (quick-scanner.js)
- [ ] **Hour 1.5:** OpenRouter integration (quick-summary.js)
- [ ] **Hour 1.5:** API endpoints (audit.js, lead-capture.js)
- [ ] **Hour 0.5:** Supabase table creation
- [ ] **Hour 1:** React components (GrowthAuditorWidget)
- [ ] **Hour 0.5:** Add to App.jsx
- [ ] **Hour 0.5:** Email templates
- [ ] **Hour 0.5:** Testing + debugging

---

## Launch Checklist

- [ ] All env vars configured in Vercel
- [ ] Supabase table created + indexed
- [ ] Email templates tested
- [ ] Widget works on mobile
- [ ] API responses validated
- [ ] Rate limiting added (optional: 10/hour per IP)
- [ ] Error handling on network timeout
- [ ] Deployed to Vercel

---

## What Happens After MVP

Once launched, we can add (Phase 2):
- ✅ Multi-page detailed report UI
- ✅ Healthcare-specific checks
- ✅ Comparison to competitors
- ✅ CRM integrations (HubSpot, Notion)
- ✅ Lead scoring + automation
- ✅ A/B testing widget placement
- ✅ Export as PDF report

But for today: **Ship the core value.**

