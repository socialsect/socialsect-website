# Implant Practice Visibility Snapshot Page Setup

## Overview

The Visibility Snapshot Page is a cold-email landing page designed to capture implant dentists, prosthodontists, periodontists, oral surgeons, and dental implant centers looking to understand their local market visibility.

**URL:** `https://gosocialsect.com/visibility`

## Features Implemented

### 1. Page Structure & Design
- **Hero Section** with eyebrow, headline, subheadline
- **Form Box** with validation for website URL and email
- **Loading State** (8-12 second simulated analysis)
- **Success State** with confirmation message
- **Error State** with retry option
- **Floating Card** with premium quote
- **Trust Metrics** section showing key statistics
- **Feature Cards** section (4 cards showing snapshot components)
- **Why It Matters** section with bullet points
- **Final CTA** section
- **Mobile Responsive** design optimized for all devices

### 2. Form Functionality
- **URL Parameter Prefill:** Email field auto-fills if `?email=practice@clinic.com` parameter provided
- **Validation:** 
  - Website URL validation (with/without http/https)
  - Email validation with regex pattern
  - Error messages displayed inline
- **Form States:**
  - `form` - Default form state
  - `loading` - 3-second animation during submission
  - `success` - Confirmation with submitted email
  - `error` - Retry option

### 3. Tracking & Analytics
- **Google Analytics (gtag):**
  - `page_view` - Initial page load
  - `form_started` - When user clicks submit
  - `snapshot_requested` - When submission succeeds
  - `lead_submitted` - When lead email captured
  
- **Meta Pixel (Facebook):**
  - `Lead` event with content_name and content_type
  
- **LinkedIn Insight Tag:**
  - Track conversion_id: 13582007

- **URL Parameters Tracked:**
  - `source` - Traffic source (cold_email, direct, etc.)
  - `campaign` - Campaign name
  - `email` - Prefill email (from URL parameter)

### 4. Email Integration

#### Visitor Confirmation Email
- Sent to practice email immediately after submission
- Shows practice website URL
- Lists 4 analysis areas (Visibility Score, Review Gap, Competitor Position, Missed Consults)
- Professional HTML template with Socialsect branding
- Manages expectations (24-hour turnaround, potential follow-up)

#### Internal Notification Email
- Sent to Socialsect team (configured via `RESEND_NOTIFY_TO`)
- Includes: email, website, source, campaign, timestamp
- Reply-to set to submitter's email

### 5. Database Logging
All submissions logged with:
- Type: `visibility_snapshot`
- Email
- Website
- Source (default: 'direct')
- Campaign (default: 'organic')
- Niche (default: 'implant-dentistry')
- Timestamp (ISO format)

## File Structure

```
src/pages/visibility/
├── index.jsx              # Main React component
└── visibility.css         # Styling

api/
└── visibility-snapshot.js # API endpoint

lib/handlers/
└── visibility-snapshot.js # Form submission handler

lib/
└── email.js              # Email functions (updated with new templates)
```

## Configuration

### Environment Variables Required
```env
# Resend Email Configuration
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=noreply@gosocialsect.com
RESEND_NOTIFY_TO=team@gosocialsect.com
RESEND_NOTIFY_CC=admin@gosocialsect.com

# Database Configuration (for logging)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

### Analytics Setup

#### Google Analytics
Already configured in index.html. Events automatically tracked.

#### Meta Pixel
Add to index.html `<head>`:
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1" /></noscript>
```

#### LinkedIn Insight Tag
Already added in visibility component (conversion_id: 13582007).

## URL Parameters & Campaign Tracking

### Example Cold Email Link
```
https://gosocialsect.com/visibility?source=cold_email&campaign=implant_outreach_jan2024&email=practice@clinic.com
```

### Parameter Reference
- `source` - Where traffic came from (cold_email, paid, organic, direct)
- `campaign` - Campaign identifier (descriptive name)
- `email` - Pre-fill visitor's email (optional)
- `niche` - Industry/specialty (defaults to implant-dentistry)
- `city` - Practice city (captured but not pre-filled)
- `state` - Practice state (captured but not pre-filled)

## Usage in Cold Email

### Example Campaign Link
```html
<a href="https://gosocialsect.com/visibility?source=cold_email&campaign=implant_dentist_audit_feb2024">
  See your practice visibility snapshot
</a>
```

### Example Cold Email Copy
```
Subject: Your [City] implant practice visibility audit

---

Hi [First Name],

We analyzed [X] implant practices in [City] this week. Most aren't losing implant consults because they need more marketing — they're losing them because they're not being found.

See where your practice stands:

[Button: Get Your Free Audit]

It takes 60 seconds.

—
Socialsect
```

## Testing

### Local Development
```bash
npm run dev
# Visit http://localhost:5173/visibility
```

### Test Form Submission
1. Navigate to `/visibility`
2. Enter test practice website (e.g., "example-dental-clinic.com")
3. Enter test email (e.g., "test@clinic.com")
4. Click "Generate My Visibility Snapshot"
5. Should see 3-second loading animation
6. Should see success state with email confirmation

### Test URL Parameters
```
http://localhost:5173/visibility?source=test&campaign=test_campaign&email=test@clinic.com
```
- Email field should auto-populate with test@clinic.com
- Form submission should log source and campaign

### Test Email Delivery
1. Ensure `.env` has valid Resend credentials
2. Use test email (or verified domain in Resend)
3. Submit form and check email inbox

## Design Details

### Color Palette
- Primary Purple: `#7b5cff`
- Dark Background: `#050505`
- Card Background: `rgba(18, 18, 22, 0.88)`
- Text Light: `#d6d6d6`
- Text Muted: `#bdbdbd`
- Border: `rgba(255, 255, 255, 0.12)`

### Typography
- Headlines: Playfair Display (serif) 
- Body: Inter (sans-serif)
- Weights: 400, 500, 600, 700, 800

### Spacing & Sizing
- Responsive with clamp() for fluid typography
- Mobile-first approach
- Breakpoints: 768px, 1000px, 1200px

### Animations
- Smooth transitions on hover
- Spinner on loading state
- Form validation with error highlighting

## SEO

### Meta Tags to Add to Visibility Page
```jsx
<Helmet>
  <title>Free Implant Practice Visibility Snapshot | Socialsect</title>
  <meta name="description" content="See how your implant practice compares to local competitors. Get your free visibility audit showing reviews gap, competitor position, and missed patient opportunities." />
  <meta property="og:title" content="Free Implant Practice Visibility Snapshot" />
  <meta property="og:description" content="Discover visibility gaps costing you implant consultations." />
  <meta property="og:image" content="/visibility-og-image.jpg" />
</Helmet>
```

## Performance Optimization

- CSS: Minified and optimized
- Images: Lazy loaded
- Form validation: Client-side only (minimal JS)
- API calls: Minimal payload
- Email delivery: Async (doesn't block form response)

## Troubleshooting

### Form Submissions Not Received
1. Check `.env` has correct Supabase credentials
2. Verify database table exists and has correct schema
3. Check browser console for API errors
4. Verify API endpoint `/api/visibility-snapshot` is accessible

### Emails Not Sending
1. Verify Resend API key in `.env`
2. Check sender email is verified in Resend
3. For testing, use onboarding@resend.dev
4. Check Resend dashboard for delivery status

### Analytics Not Tracking
1. Verify Google Analytics property ID in index.html
2. Check browser console for gtag errors
3. Use Google Analytics Debugger extension
4. Allow 24 hours for data to populate in GA dashboard

### Form Not Validating Properly
1. Check browser console for JavaScript errors
2. Verify input types (text for URL, email for email)
3. Test with various URL formats:
   - www.example.com
   - example.com
   - https://example.com
   - http://www.example.com

## Future Enhancements

- [ ] Actual visibility snapshot analysis (currently simulated)
- [ ] PDF snapshot generation
- [ ] Competitive analysis display
- [ ] Review collection integration
- [ ] Patient booking optimization suggestions
- [ ] A/B testing different CTAs
- [ ] SMS notifications for high-intent leads
- [ ] CRM integration (HubSpot, Salesforce)
- [ ] Lead scoring based on practice size/location
- [ ] Automated follow-up email sequence

## Support

For issues or questions about the visibility page implementation, check:
1. Browser console for errors
2. Network tab for API call status
3. Resend dashboard for email delivery
4. Supabase dashboard for database logs
5. Google Analytics for tracking data
