/**
 * SERVICE DETAIL CONTENT MATRIX  v1
 * 10 pages across 3 pillars · slugs aligned with /services/:pillar/:slug
 *
 * Each `data` object is the content prop for <ServiceDetailPage />.
 * Replace placeholder proof/figures with real client data before publishing.
 */

function related(pillar, slug, label, reason) {
  return { pillar, slug, label, reason }
}

// ─── BUILD (4) ───────────────────────────────────────────────

const practiceWebsites = {
  serviceLabel: 'Practice websites',
  hero: {
    headline:
      'Your website is the first consultation a patient has with you. Most practice websites fail it.',
    subcopy: [
      'Most practice websites were built by someone who understood design but not medicine. They load slowly, don\'t rank on Google, and lose patients at the booking step.',
      'We build specialty-specific websites that answer real patient questions, rank for the procedures you want, and convert visitors into booked consultations  not just traffic.',
    ],
  },
  scenarios: [
    'Your current site looks fine but enquiries have flatlined  and you suspect patients are choosing a competitor who simply shows up better online.',
    'You get traffic from Google but the booking flow loses people  long forms, unclear pricing signals, or no way to book without calling.',
    'You\'re launching a new location or subspecialty and need procedure pages that speak to patients already researching surgery  not a generic "about our practice" template.',
  ],
  included: {
    description:
      'We design and build practice websites from inside your specialty\'s patient journey  not from a healthcare template someone sold you twice. Every page is structured around how patients actually search, compare, and decide: procedure-specific content, trust signals that reflect clinical authority, intake that captures the right context before the first call, and performance that holds up on mobile. We integrate booking, tracking, and CRM handoff so your front desk isn\'t re-typing information patients already submitted. The result isn\'t a brochure  it\'s infrastructure that turns search intent into confirmed appointments.',
    outcomes: [
      'Patients arrive at booking already educated on your procedures and credentials',
      'Organic visibility for your highest-value procedure keywords  not generic "doctor near me" traffic',
      'A measurable funnel from first visit to consultation booked, with clear drop-off points fixed',
    ],
    deliverableGroups: [
      {
        name: 'Strategy & architecture',
        items: [
          'Patient journey and conversion audit',
          'Information architecture by procedure and patient type',
          'SEO keyword map tied to your case mix',
        ],
      },
      {
        name: 'Design & build',
        items: [
          'Custom UI aligned to your brand and specialty',
          'Procedure and provider pages with medical copy support',
          'Mobile-first, fast-loading implementation',
        ],
      },
      {
        name: 'Launch & measurement',
        items: [
          'Booking and intake integration',
          'Analytics, conversion tracking, and reporting dashboard',
          'Post-launch optimisation sprint (90 days)',
        ],
      },
    ],
  },
  process: [
    {
      name: 'Discovery & audit',
      description:
        'We map your current site, search visibility, competitor landscape, and where patients drop off before booking.',
      timeline: 'Week 1–2',
    },
    {
      name: 'Architecture & content',
      description:
        'Procedure pages, trust content, and conversion paths are structured and drafted in your clinical voice.',
      timeline: 'Week 3–5',
    },
    {
      name: 'Design & development',
      description:
        'Visual design, build, booking integration, and QA across devices and browsers.',
      timeline: 'Week 6–10',
    },
    {
      name: 'Launch & optimise',
      description:
        'Go-live, search indexing, conversion tracking, and iterative fixes based on real patient behaviour.',
      timeline: 'Week 11+',
    },
  ],
  faqs: [
    {
      question: 'How long does a practice website take?',
      answer:
        'Most builds run 10–14 weeks from kickoff to launch, depending on procedure count, integrations, and how quickly clinical content is approved.',
    },
    {
      question: 'Can you work with our existing brand?',
      answer:
        'Yes. We can extend an existing identity or build one as part of a wider Brand engagement. The site always reflects your clinical positioning, not a template aesthetic.',
    },
    {
      question: 'Do you write the medical content?',
      answer:
        'We lead structure and patient-facing copy; your clinical team approves all medical claims. We never publish procedure content without your sign-off.',
    },
    {
      question: 'What if we already have a site?',
      answer:
        'We start with an audit. Often we rebuild on a better foundation; sometimes we fix conversion and SEO on the existing platform if the tech stack allows it.',
    },
  ],
  relatedServices: [
    related('grow', 'seo', 'SEO', 'Organic search compounds once your site has procedure pages worth ranking.'),
    related('grow', 'meta-ads', 'Meta ads', 'Paid traffic only converts if the landing experience is built for it.'),
    related('build', 'systems', 'Booking + management systems', 'Booking flow is where most websites lose patients  we fix it at the source.'),
  ],
  finalCta: {
    headline: 'Your website is losing patients right now. Let\'s find out how many.',
  },
}

const mobileApps = {
  serviceLabel: 'Mobile apps',
  hero: {
    headline:
      'Your patients live on their phones. Your practice should meet them there  with purpose, not a gimmick.',
    subcopy: [
      'A practice app only works when it solves a real patient or workflow problem: pre-op education, rehab protocols, loyalty for aesthetic patients, or staff coordination.',
      'We build native and cross-platform apps that integrate with your booking stack and brand  measured in retention and bookings, not downloads.',
    ],
  },
  scenarios: [
    'You want patients to complete pre-appointment prep, rehab exercises, or post-op instructions without your team chasing them by email.',
    'You run a high-frequency aesthetic or wellness practice and need a branded channel that isn\'t buried in Instagram DMs.',
    'Your current patient portal is clunky or unused  and you know a better experience would reduce no-shows and support calls.',
  ],
  included: {
    description:
      'We scope mobile apps around a single primary job: what must patients or staff be able to do on a phone that they can\'t do well on your website today? From there we design flows, notifications, and integrations that respect clinical boundaries and HIPAA-aware data handling. Apps are built to connect with your booking, CRM, and content systems  not as isolated products. We handle product strategy, UX, development, App Store submission, and post-launch iteration so adoption actually happens.',
    outcomes: [
      'Higher completion rates for pre-appointment and post-procedure instructions',
      'A owned channel for rebooking and recall  not dependent on social algorithms',
      'Reduced front-desk load from repetitive patient questions',
    ],
    deliverableGroups: [
      {
        name: 'Product definition',
        items: ['Use-case and workflow mapping', 'Feature roadmap and success metrics', 'Technical architecture plan'],
      },
      {
        name: 'Design & development',
        items: ['UX/UI for patient and staff flows', 'iOS and Android build (or cross-platform)', 'API integrations with booking/CRM'],
      },
      {
        name: 'Launch',
        items: ['App Store and Play Store submission', 'Onboarding flows for patients and staff', 'Analytics and iteration plan'],
      },
    ],
  },
  process: [
    { name: 'Scope & validate', description: 'Define the job-to-be-done, users, and integrations before a line of code is written.', timeline: 'Week 1–3' },
    { name: 'UX & prototype', description: 'Clickable flows for patient and staff paths; clinical review of content touchpoints.', timeline: 'Week 4–6' },
    { name: 'Build & test', description: 'Development, QA, security review, and beta with a small patient cohort.', timeline: 'Week 7–14' },
    { name: 'Launch & grow', description: 'Store release, in-practice promotion, and feature iteration from usage data.', timeline: 'Week 15+' },
  ],
  faqs: [
    { question: 'Do we need an app or a better website?', answer: 'We\'ll tell you honestly in discovery. Many practices need conversion fixes on web first; apps earn their keep when repeat engagement or complex prep is core to care.' },
    { question: 'iOS, Android, or both?', answer: 'We recommend based on your patient demographics. Cross-platform is often the right balance of cost and reach for private practices.' },
    { question: 'Who maintains the app after launch?', answer: 'We offer ongoing product support, or we hand off to your team with documentation and monitoring in place.' },
    { question: 'How do patients discover the app?', answer: 'We design launch into your website, email, SMS, and in-clinic touchpoints  downloads without promotion rarely stick.' },
  ],
  relatedServices: [
    related('build', 'websites', 'Practice websites', 'Your app and website should share brand, booking, and patient data.'),
    related('build', 'web-apps', 'Web applications', 'Sometimes a progressive web app achieves the goal faster than native.'),
    related('brand', 'design', 'Design', 'App UI should feel continuous with every other patient touchpoint.'),
  ],
  finalCta: { headline: 'If an app is the right move, we\'ll prove it before you fund a build.' },
}

const webApplications = {
  serviceLabel: 'Web applications',
  hero: {
    headline:
      'Generic software wasn\'t built for how your practice actually runs. We build tools that fit.',
    subcopy: [
      'Referral dashboards, internal scheduling, patient progress trackers, multi-location reporting  when off-the-shelf tools force workarounds, your team pays the cost daily.',
      'We design and build custom web applications that connect to your existing systems and scale with your operations.',
    ],
  },
  scenarios: [
    'Your team uses spreadsheets and WhatsApp to manage something that should be a single system.',
    'You need a patient-facing portal or clinician tool that your EHR vendor will never build.',
    'You\'re scaling to multiple sites and need one operational view  not five disconnected logins.',
  ],
  included: {
    description:
      'Web applications are for problems too specific for a website refresh and too operational for a marketing agency. We run discovery with your clinical and ops leads, define requirements that respect compliance constraints, and build secure web apps patients or staff use daily. Authentication, role-based access, audit trails, and integrations with booking, CRM, or EHR exports are planned upfront  not bolted on after launch.',
    outcomes: [
      'Hours reclaimed from manual coordination each week',
      'One source of truth across locations or departments',
      'Patient or referrer experiences that match the standard of your clinical care',
    ],
    deliverableGroups: [
      {
        name: 'Discovery',
        items: ['Stakeholder workshops', 'Requirements and compliance checklist', 'Integration map'],
      },
      {
        name: 'Build',
        items: ['UX/UI design', 'Full-stack development', 'Admin and reporting views'],
      },
      {
        name: 'Deploy',
        items: ['Hosting and security setup', 'Staff training and documentation', 'Support and iteration roadmap'],
      },
    ],
  },
  process: [
    { name: 'Define the problem', description: 'Workflow mapping, success metrics, and build-vs-buy decision documented.', timeline: 'Week 1–2' },
    { name: 'Design the system', description: 'UX flows, data model, and integration spec approved by stakeholders.', timeline: 'Week 3–5' },
    { name: 'Develop & integrate', description: 'Agile build with weekly demos and clinical/ops feedback loops.', timeline: 'Week 6–12' },
    { name: 'Roll out', description: 'Phased deployment, training, and monitoring with a clear support path.', timeline: 'Week 13+' },
  ],
  faqs: [
    { question: 'How is this different from a website?', answer: 'Websites acquire patients; web apps run workflows  scheduling logic, portals, internal tools, and multi-user systems.' },
    { question: 'Can you integrate with our EHR?', answer: 'We work with available APIs and secure exports. Scope depends on your vendor; we surface limitations early.' },
    { question: 'What about HIPAA / GDPR?', answer: 'Access control, encryption, and data handling are designed in from day one  not added before go-live.' },
    { question: 'Who owns the code?', answer: 'You do. We deliver documentation and can support ongoing development or transition to your team.' },
  ],
  relatedServices: [
    related('build', 'systems', 'Booking + management systems', 'Often the booking layer and custom app share one architecture.'),
    related('build', 'websites', 'Practice websites', 'Patient-facing apps should link cleanly from your public site.'),
    related('grow', 'seo', 'SEO', 'Public tools and content hubs can support organic acquisition when relevant.'),
  ],
  finalCta: { headline: 'Stop forcing your practice into software that wasn\'t built for it.' },
}

const bookingSystems = {
  serviceLabel: 'Booking + management systems',
  hero: {
    headline:
      'Patients don\'t drop off because they\'re not interested. They drop off because booking is harder than it should be.',
    subcopy: [
      'Every extra click, unclear insurance question, and missing reminder costs you consultations. Most practices lose 20–40% of intent before the chair.',
      'We implement and optimise booking, intake, reminders, and follow-up  connected to how your front desk actually works.',
    ],
  },
  scenarios: [
    'Your online booking exists but high-value patients still call  and your team spends hours on the phone doing data entry.',
    'No-shows and late cancellations are eating OR time or clinic revenue you can\'t get back.',
    'New patients complete a form online but information doesn\'t reach the right person before the appointment.',
  ],
  included: {
    description:
      'We treat booking as a clinical operations problem, not a plugin install. That means mapping every step from enquiry to confirmed appointment: qualification questions, insurance and payment signals, calendar rules, reminder timing, and handoff to your CRM or EHR. We configure platforms where they fit, build custom flows where they don\'t, and measure show-rate and speed-to-book  not form submissions.',
    outcomes: [
      'Higher show rates through reminders and pre-appointment sequences',
      'Less front-desk time on repetitive intake and scheduling',
      'Clear visibility into where patients abandon before they book',
    ],
    deliverableGroups: [
      {
        name: 'Workflow design',
        items: ['Booking journey audit', 'Intake and qualification logic', 'Calendar and resource rules'],
      },
      {
        name: 'Implementation',
        items: ['Platform setup or custom build', 'Website and ads integration', 'CRM / EHR sync'],
      },
      {
        name: 'Optimisation',
        items: ['Reminder and nurture sequences', 'No-show reduction playbook', 'Monthly conversion reporting'],
      },
    ],
  },
  process: [
    { name: 'Audit', description: 'We trace real patient paths from ad, search, and referral through to show.', timeline: 'Week 1' },
    { name: 'Design', description: 'New flows, copy, and rules designed with your coordinators.', timeline: 'Week 2–3' },
    { name: 'Implement', description: 'Build, integrate, and test across channels and devices.', timeline: 'Week 4–7' },
    { name: 'Measure', description: 'Track show rate, time-to-book, and iterate on drop-offs.', timeline: 'Ongoing' },
  ],
  faqs: [
    { question: 'Which booking platforms do you work with?', answer: 'We\'re platform-agnostic  we choose based on your stack, specialty, and integration needs, or build custom when required.' },
    { question: 'Can this connect to our website and ads?', answer: 'Yes. Booking must be consistent everywhere patients land, or you\'re paying to leak intent.' },
    { question: 'Will this reduce no-shows?', answer: 'Reminders, prep, and deposit strategies are part of the system  results depend on specialty and case mix; we baseline and track.' },
    { question: 'How long until we see results?', answer: 'Most practices see measurable funnel changes within 30–60 days of go-live.' },
  ],
  relatedServices: [
    related('build', 'websites', 'Practice websites', 'Booking must be embedded in a site built to convert  not linked as an afterthought.'),
    related('grow', 'meta-ads', 'Meta ads', 'Ad spend without a tight booking flow burns budget on clicks that never become patients.'),
    related('grow', 'google-ads', 'Google ads', 'Search intent is urgent; your booking flow has to match that urgency.'),
  ],
  finalCta: { headline: 'Fix the leak between interest and confirmed appointment  that\'s where practices bleed revenue.' },
}

// ─── GROW (3) ────────────────────────────────────────────────

const metaAds = {
  serviceLabel: 'Meta ads',
  hero: {
    headline:
      'You\'ve tried ads before. This time let\'s measure them in patients  not clicks.',
    subcopy: [
      'Meta works for private practices when creative speaks to patients ready to act, landing pages qualify intent, and someone ties spend to consultations booked.',
      'We run acquisition systems for medical practices  not generic lead-gen campaigns that flood your inbox with tyre-kickers.',
    ],
  },
  scenarios: [
    'You ran Meta ads and got leads, but your team couldn\'t tell which were worth a consultation slot.',
    'Your competitor\'s ads look more polished than yours  and you know that\'s costing you high-value cases.',
    'You have budget for growth but no single team accountable for cost per booked appointment.',
  ],
  included: {
    description:
      'We build Meta campaigns around your procedures, patient economics, and capacity  not around vanity metrics. Creative is developed for medical advertising policies and patient psychology: education-first for long decision cycles, direct response where intent is high. Landing experiences, qualification, and follow-up are part of the same system as the ad account. You see reporting in consultations and revenue signals, not just CPL.',
    outcomes: [
      'Predictable cost per booked consultation for your target procedures',
      'Creative and audiences tuned to patients with surgical or treatment intent',
      'A feedback loop between front-desk outcomes and ad optimisation',
    ],
    deliverableGroups: [
      {
        name: 'Foundation',
        items: ['Account audit and tracking setup', 'Offer and procedure prioritisation', 'Compliance-aware creative strategy'],
      },
      {
        name: 'Execution',
        items: ['Campaign build and creative production', 'Landing page alignment', 'Lead routing and qualification rules'],
      },
      {
        name: 'Optimisation',
        items: ['Weekly performance reviews', 'Creative testing cadence', 'Budget allocation by procedure ROI'],
      },
    ],
  },
  process: [
    { name: 'Audit & strategy', description: 'Review past spend, tracking gaps, and which procedures are viable on Meta.', timeline: 'Week 1' },
    { name: 'Build & launch', description: 'Creative, campaigns, landing alignment, and lead routing live.', timeline: 'Week 2–4' },
    { name: 'Learn & refine', description: 'Cut waste, scale winners, tighten qualification from real booking data.', timeline: 'Week 5–8' },
    { name: 'Scale', description: 'Expand budgets and creative angles that produce booked patients at target CPA.', timeline: 'Ongoing' },
  ],
  faqs: [
    { question: 'Does Meta work for surgical practices?', answer: 'Yes, with the right creative and qualification. High-intent procedures and aesthetic treatments often outperform on Meta when landing experiences match patient expectations.' },
    { question: 'What budget do we need?', answer: 'We recommend a minimum that allows learning per procedure  we\'ll be direct in audit if the economics don\'t work yet.' },
    { question: 'Who owns the ad account?', answer: 'You do. We operate with full transparency; no lock-in on assets or data.' },
    { question: 'How do you handle medical ad policies?', answer: 'Creative and copy are built for policy compliance from the start  rejections are planned for, not surprises.' },
  ],
  relatedServices: [
    related('build', 'websites', 'Practice websites', 'Ads send traffic somewhere  that somewhere must convert.'),
    related('grow', 'google-ads', 'Google ads', 'Meta and Google cover different intent moments; together they compound.'),
    related('grow', 'seo', 'SEO', 'Organic reduces dependency on paid over time while ads fill the gap now.'),
  ],
  finalCta: { headline: 'You\'ve tried ads before. This time let\'s measure them in patients, not clicks.' },
}

const googleAds = {
  serviceLabel: 'Google ads',
  hero: {
    headline:
      'When a patient searches for your procedure, you have one chance to be the answer they trust.',
    subcopy: [
      'Google captures patients with intent  but most medical accounts waste spend on broad keywords, weak landing pages, and no connection to booked appointments.',
      'We build search campaigns around procedure-level intent and measure what matters: consultations in the diary.',
    ],
  },
  scenarios: [
    'You show up for your name but not for the procedures that drive your private revenue.',
    'You\'re paying for clicks from patients who were never going to book private care.',
    'Referrals are strong but you have no controlled lever when you need to fill the schedule.',
  ],
  included: {
    description:
      'We structure Google Ads around how patients search for your specialty: procedure + location, symptom-to-treatment paths, and competitor conquest where appropriate. Negative keywords, ad extensions, and landing alignment are managed as one system. Conversion tracking ties to real booking events  not form fills alone. For practices with longer cycles, we integrate nurture and remarketing so intent isn\'t lost after the first visit.',
    outcomes: [
      'Visibility for high-value procedure searches in your markets',
      'Lower wasted spend through intent-matched keywords and landing pages',
      'Clear cost per consultation and path to scale winning campaigns',
    ],
    deliverableGroups: [
      {
        name: 'Strategy',
        items: ['Keyword and competitor research', 'Campaign structure by procedure', 'Tracking and attribution setup'],
      },
      {
        name: 'Launch',
        items: ['Search and Performance Max where appropriate', 'Ad copy in patient language', 'Landing page alignment'],
      },
      {
        name: 'Optimise',
        items: ['Search term mining and negatives', 'Bid and budget shifts by ROI', 'Monthly reporting in booked patients'],
      },
    ],
  },
  process: [
    { name: 'Research', description: 'Keyword demand, competition, and landing gaps for your priority procedures.', timeline: 'Week 1' },
    { name: 'Launch', description: 'Campaigns live with tracking verified against real bookings.', timeline: 'Week 2–3' },
    { name: 'Refine', description: 'Cut low-intent spend; improve ads and pages for top converters.', timeline: 'Week 4–8' },
    { name: 'Scale', description: 'Increase budget on procedures with proven unit economics.', timeline: 'Ongoing' },
  ],
  faqs: [
    { question: 'SEO or Google Ads first?', answer: 'Often both  ads capture demand now while SEO compounds. We\'ll prioritise based on your timeline and competition.' },
    { question: 'What about Local Service Ads?', answer: 'We include LSA and Maps strategy where they fit your specialty and market.' },
    { question: 'How quickly can we launch?', answer: 'Most accounts are live within 2–3 weeks after audit, pending landing readiness.' },
    { question: 'Do you write landing pages?', answer: 'We optimise alignment with your site; new pages are part of Build if needed.' },
  ],
  relatedServices: [
    related('grow', 'seo', 'SEO', 'Own organic rankings while paid captures immediate demand.'),
    related('build', 'websites', 'Practice websites', 'Procedure pages are the foundation of search conversion.'),
    related('grow', 'meta-ads', 'Meta ads', 'Cover patients earlier in the journey while search captures active intent.'),
  ],
  finalCta: { headline: 'Be the practice patients find when they\'re ready to book  not when they\'ve already chosen someone else.' },
}

const seo = {
  serviceLabel: 'SEO',
  hero: {
    headline:
      'Patients are searching for your procedures right now. The question is whether they find you or your competitor.',
    subcopy: [
      'SEO for private practices isn\'t blog posts for the sake of it  it\'s procedure pages, local authority, and technical foundations that compound into booked consultations.',
      'We build organic acquisition that reduces your dependence on referrals and paid ads over time.',
    ],
  },
  scenarios: [
    'You rank for your name but not for "private [procedure] [city]"  and that\'s where growth lives.',
    'You\'ve been told to "do content" but no one tied it to patients actually booking.',
    'You\'re opening a new site or location and need local visibility fast without burning ad budget forever.',
  ],
  included: {
    description:
      'We run SEO as a revenue channel: technical health, procedure-level content, local signals, and authority building that match how patients search in your specialty. Every recommendation connects to rankings that matter for your case mix  not traffic that never converts. We work with your clinical team on accurate medical content and handle implementation on your site or build new pages where gaps exist.',
    outcomes: [
      'Rankings for priority procedures in your target locations',
      'Steady organic consultation enquiries month over month',
      'A content asset base that supports ads, referrals, and patient education',
    ],
    deliverableGroups: [
      {
        name: 'Technical',
        items: ['Site audit and Core Web Vitals', 'Indexation and schema for medical entities', 'Local SEO setup'],
      },
      {
        name: 'Content',
        items: ['Procedure page strategy and production', 'FAQ and patient-education hubs', 'Internal linking architecture'],
      },
      {
        name: 'Authority',
        items: ['Review and citation strategy', 'Digital PR and outreach plan', 'Monthly ranking and lead reporting'],
      },
    ],
  },
  process: [
    { name: 'Audit', description: 'Technical, content, and competitor gaps mapped to your procedures.', timeline: 'Week 1–2' },
    { name: 'Foundation', description: 'Fix technical blockers; launch priority procedure pages.', timeline: 'Month 1–2' },
    { name: 'Expand', description: 'Content velocity, local signals, and link building where relevant.', timeline: 'Month 3–6' },
    { name: 'Compound', description: 'Iterate on pages that rank; expand to secondary procedures and locations.', timeline: 'Ongoing' },
  ],
  faqs: [
    { question: 'How long until SEO works?', answer: 'Meaningful movement often starts in 3–4 months; compounding growth is the goal over 12+ months.' },
    { question: 'Do you guarantee page one?', answer: 'No ethical agency does. We guarantee process, transparency, and focus on keywords tied to your economics.' },
    { question: 'Can you SEO our existing site?', answer: 'Yes, if the platform allows. Sometimes a rebuild is faster  we\'ll say so in the audit.' },
    { question: 'How do you measure success?', answer: 'Rankings for target terms, organic traffic quality, and consultations attributed to organic search.' },
  ],
  relatedServices: [
    related('build', 'websites', 'Practice websites', 'SEO needs pages worth ranking  thin sites cap results.'),
    related('grow', 'google-ads', 'Google ads', 'Paid and organic share keyword intelligence.'),
    related('grow', 'meta-ads', 'Meta ads', 'Top-of-funnel awareness supports branded search growth.'),
  ],
  finalCta: { headline: 'Patients are searching. Make sure they find you first.' },
}

// ─── BRAND (3) ───────────────────────────────────────────────

const brandIdentity = {
  serviceLabel: 'Brand identity',
  hero: {
    headline:
      'Before a patient reads a word on your site, they\'ve already decided if you feel like someone they trust.',
    subcopy: [
      'Brand isn\'t a logo  it\'s the cumulative signal of your credentials, tone, visuals, and consistency across every touchpoint.',
      'We build identity systems for private practices that communicate clinical authority and attract the patients you want  not bargain hunters.',
    ],
  },
  scenarios: [
    'Your practice has grown but your brand still looks like it did five years ago  and patients notice.',
    'You\'re merging practices or launching a new premium line and need one coherent identity.',
    'Everything looks different on your website, social, and print  and it undermines trust.',
  ],
  included: {
    description:
      'We develop brand identity from your positioning: who you serve, what procedures define you, and how you want to be perceived against local competitors. Deliverables include positioning narrative, visual identity, typography and colour systems, photography direction, and guidelines your team and partners can apply consistently. Medical brands require restraint and authority  we avoid generic wellness aesthetics that make surgeons look like spas.',
    outcomes: [
      'A distinctive, premium presence that matches your clinical tier',
      'Guidelines that keep every channel aligned without micromanagement',
      'Faster production of ads, print, and web because decisions are pre-made',
    ],
    deliverableGroups: [
      {
        name: 'Strategy',
        items: ['Positioning workshop', 'Competitive and patient perception review', 'Brand narrative and voice'],
      },
      {
        name: 'Visual identity',
        items: ['Logo system and mark usage', 'Colour, type, and layout rules', 'Photography and iconography direction'],
      },
      {
        name: 'Toolkit',
        items: ['Brand guidelines document', 'Templates for common practice materials', 'Rollout plan for web and social'],
      },
    ],
  },
  process: [
    { name: 'Discover', description: 'Stakeholder interviews, market scan, and alignment on who the brand must attract.', timeline: 'Week 1–2' },
    { name: 'Define', description: 'Positioning, narrative, and creative territory presented for decision.', timeline: 'Week 3–4' },
    { name: 'Design', description: 'Identity explorations, refinement, and full system build.', timeline: 'Week 5–8' },
    { name: 'Deploy', description: 'Guidelines, templates, and support applying identity to key touchpoints.', timeline: 'Week 9+' },
  ],
  faqs: [
    { question: 'Is this only for new practices?', answer: 'No  most of our identity work is repositioning established practices for their next growth stage.' },
    { question: 'Do you redesign our website too?', answer: 'Identity often pairs with a Build project; we can run them sequentially or together.' },
    { question: 'How many concepts do we see?', answer: 'We present focused directions tied to strategy  not random logo options without rationale.' },
    { question: 'Who owns the files?', answer: 'You receive full source files and usage rights for your practice.' },
  ],
  relatedServices: [
    related('brand', 'design', 'Design', 'Identity is the system; design is ongoing execution.'),
    related('brand', 'video', 'Video + motion', 'Motion brings brand standards to life on social and web.'),
    related('build', 'websites', 'Practice websites', 'A new site is the highest-impact place to launch identity.'),
  ],
  finalCta: { headline: 'Look like the practice you already are clinically  everywhere patients see you.' },
}

const design = {
  serviceLabel: 'Design',
  hero: {
    headline:
      'Your team shouldn\'t be rebuilding slides in Canva at midnight before a campaign launches.',
    subcopy: [
      'Ongoing design for practices means patient-facing creative, ad assets, print, and presentations  on brand, on time, and built for medical compliance.',
      'We act as your embedded design function so growth campaigns don\'t stall on production.',
    ],
  },
  scenarios: [
    'You have brand guidelines but no capacity to produce ads, brochures, and social at the speed you need.',
    'Every agency delivers creative that looks great but gets rejected by Meta or Google medical review.',
    'Your consultants deserve leave-behinds and digital assets that reflect the quality of their work.',
  ],
  included: {
    description:
      'Design retainer work covers the assets practices burn through weekly: Meta and Google ad creative, social content, patient education PDFs, event materials, and presentation decks. We work from your brand system (or help create one) and understand medical advertising constraints. Requests are prioritised against your growth calendar  procedure launches, seasonal pushes, and referral campaigns  not treated as one-off tickets with no context.',
    outcomes: [
      'Consistent, on-brand creative across every channel',
      'Faster campaign launches without bottlenecks',
      'Higher ad approval rates through compliance-aware design',
    ],
    deliverableGroups: [
      {
        name: 'Core outputs',
        items: ['Paid social and search ad creative', 'Social content templates and posts', 'Print and in-clinic materials'],
      },
      {
        name: 'Process',
        items: ['Brand-aligned Figma libraries', 'Request and approval workflow', 'Monthly capacity planning call'],
      },
      {
        name: 'Support',
        items: ['Presentation and pitch decks', 'One-off campaign assets', 'Vendor handoff files for print'],
      },
    ],
  },
  process: [
    { name: 'Onboard', description: 'Brand audit, asset inventory, and priority calendar for the quarter.', timeline: 'Week 1' },
    { name: 'Systemise', description: 'Templates and libraries so repeat work is fast and consistent.', timeline: 'Week 2–3' },
    { name: 'Produce', description: 'Rolling delivery against your campaign and clinic needs.', timeline: 'Ongoing' },
    { name: 'Review', description: 'Monthly retro on what drove bookings vs. what was vanity.', timeline: 'Monthly' },
  ],
  faqs: [
    { question: 'Is this a retainer?', answer: 'Yes  design for growing practices works best as ongoing capacity, not project-by-project surprises.' },
    { question: 'What\'s the turnaround?', answer: 'Standard requests are scoped with SLAs in onboarding; rush work is planned in the monthly call.' },
    { question: 'Do you need our brand book?', answer: 'We prefer it; if you don\'t have one, Identity is the right starting point.' },
    { question: 'Can you match our existing look?', answer: 'We work within your system or evolve it deliberately  never random departures.' },
  ],
  relatedServices: [
    related('brand', 'identity', 'Brand identity', 'Without a system, design production stays slow and inconsistent.'),
    related('grow', 'meta-ads', 'Meta ads', 'Creative volume and testing depend on design throughput.'),
    related('brand', 'video', 'Video + motion', 'Static and motion assets should feel like one practice.'),
  ],
  finalCta: { headline: 'Stop waiting on design. Start shipping campaigns that look as good as your outcomes.' },
}

const videoMotion = {
  serviceLabel: 'Video + motion',
  hero: {
    headline:
      'Patients choose surgeons they feel they know. Video closes that gap faster than any brochure.',
    subcopy: [
      'Procedure explainers, surgeon introductions, patient stories, and social reels  produced for medical brands with the restraint and compliance your specialty demands.',
      'We plan, shoot, and edit content that supports trust and conversion  not vanity views.',
    ],
  },
  scenarios: [
    'You know video would help patients choose you  but you don\'t want cheesy stock footage or off-brand reels.',
    'Your competitors post surgeon-led content weekly and you\'re still relying on static images.',
    'You need one hero film for the website and a stream of cut-downs for ads and social.',
  ],
  included: {
    description:
      'We produce video from strategy first: which procedures need explanation, which objections video should address, and where assets will be used (site, ads, organic, waiting room). Production is planned around clinician time  efficient on-set protocols, clear releases, and editing that matches your brand. Motion graphics support explainers where live action isn\'t needed. Every piece is delivered in formats ready for Meta, YouTube, and your site.',
    outcomes: [
      'A library of reusable video assets for web and paid channels',
      'Higher trust and conversion on key procedure pages',
      'Social presence that reflects clinical authority, not trends',
    ],
    deliverableGroups: [
      {
        name: 'Strategy',
        items: ['Content plan by procedure and funnel stage', 'Shot lists and interview prep', 'Compliance and consent workflow'],
      },
      {
        name: 'Production',
        items: ['On-site or remote filming', 'B-roll and facility footage', 'Patient story coordination where appropriate'],
      },
      {
        name: 'Post',
        items: ['Edit and colour for brand standards', 'Captions, formats, and ad cut-downs', 'Asset library organisation'],
      },
    ],
  },
  process: [
    { name: 'Plan', description: 'Scripts, shot lists, and scheduling around clinical calendars.', timeline: 'Week 1–2' },
    { name: 'Produce', description: 'Filming with minimal disruption to clinic flow.', timeline: 'Week 3' },
    { name: 'Edit', description: 'Hero films, page embeds, and platform-specific versions.', timeline: 'Week 4–6' },
    { name: 'Distribute', description: 'Launch on site, ads, and social with performance tracking.', timeline: 'Week 7+' },
  ],
  faqs: [
    { question: 'Do you film at our clinic?', answer: 'Yes  most production is on-site or a mix of clinic and studio depending on the concept.' },
    { question: 'Can we use patient testimonials?', answer: 'With proper consent and specialty-appropriate review  we manage releases and editing standards.' },
    { question: 'What if we\'re camera-shy?', answer: 'We coach clinicians and use formats (voiceover, b-roll) that feel natural, not performative.' },
    { question: 'How many videos do we get?', answer: 'Scoped per project or retainer; we define output volume in the content plan, not open-ended.' },
  ],
  relatedServices: [
    related('brand', 'identity', 'Brand identity', 'Video should look unmistakably like your practice.'),
    related('build', 'websites', 'Practice websites', 'Embed video where it moves patients to book.'),
    related('grow', 'meta-ads', 'Meta ads', 'Video creative is often the highest-leverage Meta asset for practices.'),
  ],
  finalCta: { headline: 'Show patients who you are before they ever walk in  video does that work.' },
}

// ─── MASTER EXPORT ───────────────────────────────────────────

export const allServices = [
  { pillar: 'build', slug: 'websites', data: practiceWebsites },
  { pillar: 'build', slug: 'apps', data: mobileApps },
  { pillar: 'build', slug: 'web-apps', data: webApplications },
  { pillar: 'build', slug: 'systems', data: bookingSystems },
  { pillar: 'grow', slug: 'meta-ads', data: metaAds },
  { pillar: 'grow', slug: 'google-ads', data: googleAds },
  { pillar: 'grow', slug: 'seo', data: seo },
  { pillar: 'brand', slug: 'identity', data: brandIdentity },
  { pillar: 'brand', slug: 'design', data: design },
  { pillar: 'brand', slug: 'video', data: videoMotion },
]
