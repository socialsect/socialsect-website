/**
 * SERVICE DETAIL PAGE CONTENT MATRIX
 * 10 pages across 3 pillars
 *
 * BUILD (4):  Practice websites, Mobile apps, Web applications, Booking + management systems
 * GROW  (3):  Meta ads, Google ads, SEO
 * BRAND (3):  Brand identity, Design, Video + motion
 *
 * Each export is the complete `data` prop for <ServiceDetailPage />.
 *
 * `siblings` = the other services in the same pillar (excluding self).
 * `relatedServices` reference paths from other pillars — cross-sell naturally.
 */

// ─────────────────────────────────────────────────────────────
// HELPERS — sibling lists (used inside each export)
// ─────────────────────────────────────────────────────────────

const BUILD_SIBLINGS = [
  { slug: 'websites',  label: 'Practice websites',          path: '/services/build/websites' },
  { slug: 'apps',      label: 'Mobile apps',                path: '/services/build/apps' },
  { slug: 'web-apps',  label: 'Web applications',           path: '/services/build/web-apps' },
  { slug: 'systems',   label: 'Booking + management systems', path: '/services/build/systems' },
]

const GROW_SIBLINGS = [
  { slug: 'meta-ads',    label: 'Meta ads',    path: '/services/grow/meta-ads' },
  { slug: 'google-ads',  label: 'Google ads',  path: '/services/grow/google-ads' },
  { slug: 'seo',         label: 'SEO',          path: '/services/grow/seo' },
]

const BRAND_SIBLINGS = [
  { slug: 'identity', label: 'Brand identity',  path: '/services/brand/identity' },
  { slug: 'design',   label: 'Design',          path: '/services/brand/design' },
  { slug: 'video',    label: 'Video + motion',  path: '/services/brand/video' },
]

// Returns sibling list with self removed
const siblingsFor = (list, selfSlug) => list.filter(s => s.slug !== selfSlug)

// ─────────────────────────────────────────────────────────────
// BUILD — 1 of 4: Practice websites
// ─────────────────────────────────────────────────────────────

export const practiceWebsites = {
  pillarLabel:  'Build',
  serviceLabel: 'Practice websites',
  path:         '/services/build/websites',
  siblings:     siblingsFor(BUILD_SIBLINGS, 'websites'),
  ctaHref:      '/book-a-call',

  pageUi: {
    backLabel: 'Services',
    backHref: '/services#build',
    skipPillarInBreadcrumb: true,
    includedLabel: 'What you get',
    processHeadline: 'What happens after you say yes.',
    faqHeadline: 'Things practices usually ask us.',
    relatedHeadline: 'Most practices take these together.',
    finalCtaPrimary: 'Book my free website audit',
    finalCtaSecondary: { label: 'See results', href: '/results' },
  },

  hero: {
    headline: 'A practice website that works as hard as you do.',
    subcopy: [
      'Most private practice websites are digital brochures. They look fine, say all the right things, and convert almost no one. Patients land on them, can\'t find what they need, and leave for a competitor who made it easier.',
      'We build practice websites engineered from the ground up to turn the right visitors into booked appointments, with the clinical credibility to earn trust and the conversion architecture to close it.',
    ],
  },

  scenarios: [
    'You\'re sending paid traffic to a website that doesn\'t convert, and you\'re not sure why.',
    'Your current site was built years ago and no longer reflects the standard of your practice.',
    'Patients have told you they couldn\'t find information they were looking for before their consultation.',
    'You\'re launching a new practice or a new service and need a digital presence that works from day one.',
    'Your website isn\'t ranking for the procedures or conditions your best patients search for.',
    'You want a site that handles both patient acquisition and referrer relationship management.',
  ],

  included: {
    description: 'We design and build a conversion-optimized practice website tailored specifically to your specialty, patient mix, and growth goals. Every page is structured around how your ideal patients actually make decisions, not around how most healthcare websites are typically laid out.',
    outcomes: [
      'More visitors booking consultations, fewer leaving for a competitor',
      'Ranking above competitors when patients search for your procedures',
      'Faster patient qualification before consultation',
      'Every page builds the case for why you\'re the obvious choice',
      'Seamless integration with your booking and CRM systems',
      'A site that grows with your practice, not one you outgrow in eighteen months',
    ],
    deliverableGroups: [
      {
        name: 'Discovery & Strategy',
        items: [
          'Patient journey mapping for each core service',
          'Competitor and search landscape analysis',
          'Conversion architecture plan',
          'Site structure and information hierarchy',
        ],
      },
      {
        name: 'Design',
        items: [
          'Full responsive design (mobile-first)',
          'Visual identity integration or development',
          'Photography and image direction',
          'Accessibility-compliant UI components',
        ],
      },
      {
        name: 'Build',
        items: [
          'CMS-powered build (headless or traditional)',
          'SEO technical foundations baked in',
          'Booking system and CRM integration',
          'Analytics, conversion tracking, and goal setup',
          'Performance optimization (Core Web Vitals)',
        ],
      },
      {
        name: 'Content',
        items: [
          'Specialty-specific copy for all core pages',
          'Procedure and condition page templates',
          'Consultant or practitioner profile pages',
          'Patient testimonial and case study architecture',
        ],
      },
    ],
  },

  process: [
    {
      name: 'Discovery',
      description: 'We audit your existing digital presence, map your patient journeys, and define the conversion goals and content architecture before a single pixel is designed. This is where most agencies skip straight to visuals. We don\'t.',
      timeline: '1–2 weeks',
    },
    {
      name: 'Design',
      description: 'We produce a full design, desktop and mobile, before any development begins. You see exactly what you\'re getting and we iterate until it\'s right.',
      timeline: '2–3 weeks',
    },
    {
      name: 'Build',
      description: 'Development against the approved design. SEO foundations, booking integrations, tracking, and performance optimization are all built in, not bolted on later.',
      timeline: '3–5 weeks',
    },
    {
      name: 'Content & Review',
      description: 'Copywriting, image sourcing, final content population, cross-device testing, accessibility checks, and stakeholder review.',
      timeline: '1–2 weeks',
    },
    {
      name: 'Launch & Handover',
      description: 'Staged launch with performance monitoring. Full CMS training and documentation so your team can manage the site confidently. The site is already tested and approved. Launch day is focused, not frantic.',
      timeline: '3–5 days',
    },
  ],

  faqs: [
    {
      question: 'How is this different from a standard web design agency?',
      answer: 'We only work with private healthcare practices. That means our templates, copy frameworks, patient journey maps, and conversion architectures are built specifically for the way medical and aesthetic patients make decisions, which is very different from how e-commerce or B2B customers behave. A generalist agency adapts general principles. We apply healthcare-specific knowledge from day one.',
    },
    {
      question: 'Do you build on a specific platform or CMS?',
      answer: 'We\'re platform-agnostic and will recommend the right stack for your practice size, team capability, and growth plans. We\'ve built on WordPress, Webflow, and custom React/Next.js stacks. We\'ll tell you which is right for you, not which is easiest for us.',
    },
    {
      question: 'What about SEO: is that included?',
      answer: 'Every site we build has strong technical SEO foundations baked in: site architecture, schema markup, Core Web Vitals, page speed, and on-page structure. Ongoing SEO content strategy is a separate service but integrates seamlessly if you take both together.',
    },
    {
      question: 'Can you work with our existing branding?',
      answer: 'Yes. We can work within an existing brand identity, evolve it, or build from scratch depending on what you need. If your brand needs work before the site makes sense, we\'ll say so and offer that as a first step.',
    },
    {
      question: 'How long does a full website build take?',
      answer: 'For a standard practice website, 8–12 weeks from discovery to launch. More complex builds with custom functionality, multiple locations, or CRM integrations typically take 12–16 weeks. We\'ll give you a specific timeline before we start.',
    },
    {
      question: 'Do you work with practices outside the US and UK?',
      answer: 'Yes. We work with private medical practices in the US, UK, and select international markets. Time zones and compliance requirements are factored into how we structure discovery, approvals, and launch.',
    },
  ],

  relatedServices: [
    {
      label: 'SEO',
      linkLabel: 'Explore SEO',
      reason: 'A well-built site that nobody finds is just an expensive brochure. We combine both from the start.',
      path: '/services/grow/seo',
    },
    {
      label: 'Booking + management systems',
      linkLabel: 'Explore Booking + management systems',
      reason: 'Your website converts visitors into inquiries, your booking system converts inquiries into appointments.',
      path: '/services/build/systems',
    },
    {
      label: 'Brand identity',
      linkLabel: 'Explore Brand identity',
      reason: 'If your visual identity isn\'t where it needs to be, a new site built on weak branding will underperform. We often run brand and website projects in parallel.',
      path: '/services/brand/identity',
    },
  ],

  finalCta: {
    headline: 'Your website should be your best-performing team member. Let\'s make it one.',
  },
}

// ─────────────────────────────────────────────────────────────
// BUILD — 2 of 4: Mobile apps
// ─────────────────────────────────────────────────────────────

export const mobileApps = {
  pillarLabel:  'Build',
  serviceLabel: 'Mobile apps',
  path:         '/services/build/apps',
  siblings:     siblingsFor(BUILD_SIBLINGS, 'apps'),
  ctaHref:      '/book-a-call',

  pageUi: {
    backLabel: 'Services',
    backHref: '/services#build',
    skipPillarInBreadcrumb: true,
    includedLabel: 'What you get',
    processHeadline: 'What building your app actually looks like.',
    faqHeadline: 'Things practices usually ask us.',
    relatedHeadline: 'Most practices take these together.',
    finalCtaPrimary: 'Book my free app audit',
    finalCtaSecondary: { label: 'See results', href: '/results' },
  },

  hero: {
    headline: 'A mobile app your patients actually use and your team actually wants.',
    subcopy: [
      'Most healthcare mobile apps are built for the idea of convenience, not for the specific moments in a patient\'s journey where an app genuinely adds value. They get downloaded, opened twice, and deleted.',
      'We build patient-facing mobile apps for private practices that solve a real problem in the patient relationship, whether that\'s post-procedure care, treatment tracking, appointment management, or loyalty programs.',
    ],
  },

  scenarios: [
    'You want to reduce the volume of admin calls and messages by giving patients self-serve access to what they need.',
    'You have a post-treatment care protocol that currently relies on paper or PDF instructions patients lose.',
    'You run a membership or loyalty program that would benefit from a dedicated patient experience.',
    'You want to deepen patient engagement between appointments and reduce drop-off in multi-session treatment plans.',
    'Your practice has grown to a scale where a branded app would meaningfully differentiate your patient experience.',
    'You want to collect patient-reported outcomes or satisfaction data in a frictionless, structured way.',
  ],

  included: {
    description: 'We design and build native-quality mobile applications for iOS and Android, scoped specifically to the patient journey problems they\'re designed to solve. We start by understanding exactly where an app adds value in your practice and build only what genuinely earns its place in a patient\'s phone.',
    outcomes: [
      'Reduced admin burden on front-of-house and clinical teams',
      'Improved patient compliance with post-treatment and multi-session protocols',
      'Higher retention rates through structured between-appointment engagement',
      'A branded patient experience that reflects your practice quality',
      'Measurable patient satisfaction and outcome data collection',
      'Differentiation from competitors who rely on generic booking platforms',
    ],
    deliverableGroups: [
      {
        name: 'Discovery & Scoping',
        items: [
          'Patient journey mapping to identify app value moments',
          'Feature prioritization and MVP definition',
          'Technical architecture planning',
          'Integration requirements assessment (CRM, booking, EHR)',
        ],
      },
      {
        name: 'Design',
        items: [
          'UX wireframes and user flow mapping',
          'Full UI design (iOS + Android)',
          'Brand-aligned visual design system',
          'Prototype for stakeholder and patient testing',
        ],
      },
      {
        name: 'Build',
        items: [
          'React Native or native build (iOS + Android)',
          'Backend API and database architecture',
          'Push notification system',
          'Third-party integrations (booking, CRM, payment)',
          'App Store and Google Play submission and approval',
        ],
      },
      {
        name: 'Post-launch',
        items: [
          'Analytics and in-app event tracking',
          'Crash monitoring and performance tooling',
          'Ongoing maintenance retainer (optional)',
          'Feature iteration roadmap',
        ],
      },
    ],
  },

  process: [
    {
      name: 'Discovery & Scoping',
      description: 'We map the specific patient journey moments where an app genuinely adds value and define the MVP scope tightly. This prevents the most common app failure mode: building too much of the wrong thing.',
      timeline: '1–2 weeks',
    },
    {
      name: 'UX & Design',
      description: 'Full UX flow design followed by polished UI for both platforms. Prototype testing with real patients or staff before a line of code is written.',
      timeline: '3–4 weeks',
    },
    {
      name: 'Development',
      description: 'Sprint-based development with regular demos. Backend, integrations, notifications, and all core features built to production quality.',
      timeline: '8–14 weeks (initial version)',
    },
    {
      name: 'Testing & Submission',
      description: 'Device testing, quality review, App Store and Google Play submission, and any compliance or medical app regulatory review relevant to your specialty.',
      timeline: '2–3 weeks',
    },
    {
      name: 'Launch & Iteration',
      description: 'Monitored launch with in-app analytics live from day one. Post-launch review at 30 and 90 days to define the next iteration based on real usage data.',
      timeline: 'Ongoing',
    },
  ],

  faqs: [
    {
      question: 'Does my practice actually need a mobile app, or is a good website enough?',
      answer: 'Honestly, for most practices, a great website is the right investment first. An app makes sense when there\'s a specific, recurring patient interaction that would genuinely be better in a native app context: post-op care protocols, multi-session treatment tracking, loyalty programs, or patient-reported outcome collection. We\'ll tell you in the audit if an app is the right tool for your problem.',
    },
    {
      question: 'Do you build for iOS and Android?',
      answer: 'Yes. We build cross-platform using React Native for most projects, which gives you both platforms from a single codebase. For applications where platform-specific performance is critical, we\'ll recommend and build native. We\'ll advise which approach is right for your use case.',
    },
    {
      question: 'What about data security and GDPR / HIPAA compliance?',
      answer: 'All patient-facing apps we build are architected with healthcare data security requirements as a baseline, not an afterthought. This includes data encryption, access controls, secure authentication, and audit logging. We\'ll specify the compliance requirements for your jurisdiction during scoping.',
    },
    {
      question: 'Can the app connect to our existing booking system or EHR?',
      answer: 'In most cases yes, via API. The depth of integration depends on what your existing systems support. We assess integration feasibility during discovery and will be clear about what\'s possible before any development starts.',
    },
    {
      question: 'What does ongoing maintenance look like?',
      answer: 'Mobile operating systems update regularly, and your app needs to update with them. We offer ongoing maintenance retainers that cover OS compatibility updates, bug fixes, security patches, and small feature improvements. This is not optional if you want the app to keep working. We\'ll build it into your plan.',
    },
    {
      question: 'How long does a full app build take end to end?',
      answer: 'Most MVP builds run 14–20 weeks from discovery to App Store launch. Discovery and scoping (1–2 weeks), design (3–4 weeks), development (8–14 weeks), and testing and submission (2–3 weeks). More complex apps with deep EHR integrations or multi-role workflows typically take 20–28 weeks. We\'ll give you a specific timeline after scoping.',
    },
  ],

  relatedServices: [
    {
      label: 'Booking + management systems',
      linkLabel: 'Explore Booking + management systems',
      reason: 'Apps and booking systems work best when they\'re integrated from the start. A patient who books through your app should have a seamless journey into your management system. We build both to work as one.',
      path: '/services/build/systems',
    },
    {
      label: 'Practice websites',
      linkLabel: 'Explore Practice websites',
      reason: 'Your website and app serve different moments in the patient journey. Both should reflect the same brand standard and conversion architecture.',
      path: '/services/build/websites',
    },
    {
      label: 'Design',
      linkLabel: 'Explore Design',
      reason: 'If your practice brand isn\'t strong enough to carry a patient-facing app, we\'ll address that first. A well-designed app on a weak brand underperforms.',
      path: '/services/brand/design',
    },
  ],

  finalCta: {
    headline: 'If an app would genuinely improve your patient experience, we\'ll build the right one.',
  },
}

// ─────────────────────────────────────────────────────────────
// BUILD — 3 of 4: Web applications
// ─────────────────────────────────────────────────────────────

export const webApplications = {
  pillarLabel:  'Build',
  serviceLabel: 'Web applications',
  path:         '/services/build/web-apps',
  siblings:     siblingsFor(BUILD_SIBLINGS, 'web-apps'),
  ctaHref:      '/book-a-call',

  pageUi: {
    backLabel: 'Services',
    backHref: '/services#build',
    skipPillarInBreadcrumb: true,
    includedLabel: 'What you get',
    processHeadline: 'What building your web application actually looks like.',
    faqHeadline: 'Things practices usually ask us.',
    relatedHeadline: 'Most practices take these together.',
    finalCtaPrimary: 'Book my free web app audit',
    finalCtaSecondary: { label: 'See results', href: '/results' },
  },

  hero: {
    headline: 'Custom web tools built around the workflows your practice actually uses.',
    subcopy: [
      'Off-the-shelf software almost works for healthcare practices. Almost. The gaps, the manual workarounds, the spreadsheets patching the cracks, the data that has to be re-entered in three places, are where time, money, and patient experience get lost.',
      'We build custom web applications for private practices and healthcare groups that replace those gaps with something built precisely for how your practice actually operates.',
    ],
  },

  scenarios: [
    'You\'re managing patient intake, consent, or pre-assessment through email chains and PDFs that get lost.',
    'Your team uses multiple disconnected systems and manually copies data between them.',
    'You need a patient portal with specific functionality that no off-the-shelf product provides.',
    'You\'re running a group of practices and need a unified operational dashboard that doesn\'t exist yet.',
    'You have a referral management workflow that\'s entirely manual and doesn\'t scale.',
    'You want to offer practitioners in your group a custom clinical tool, a calculator, a decision aid, or a documentation system.',
  ],

  included: {
    description: 'We scope, design, and build custom web applications for healthcare practices and groups, from patient portals and intake platforms to internal operational tools. We start by mapping your current workflow and identifying exactly where a custom application delivers the most value before writing any code.',
    outcomes: [
      'Elimination of manual workflow steps that waste clinical and administrative time',
      'Reduction in data entry errors from re-keying between disconnected systems',
      'Infrastructure that handles one location today and ten tomorrow',
      'Patients interact with your practice through tools that actually work, not workarounds',
      'Custom reporting and visibility that off-the-shelf tools don\'t provide',
      'Integration between systems that don\'t natively talk to each other',
    ],
    deliverableGroups: [
      {
        name: 'Discovery & Architecture',
        items: [
          'Workflow mapping and pain point analysis',
          'Technical architecture design',
          'Integration requirements assessment',
          'Data model and security architecture',
          'Build roadmap and phased delivery plan',
        ],
      },
      {
        name: 'Design & UX',
        items: [
          'User flow design for all user types (patient, clinician, admin)',
          'Responsive UI design',
          'Accessibility compliance (WCAG 2.1 AA)',
          'Prototype and stakeholder review',
        ],
      },
      {
        name: 'Build',
        items: [
          'Front-end (React / Next.js)',
          'Back-end API and database',
          'Third-party integrations (booking, CRM, EHR, payment)',
          'Role-based access control',
          'GDPR / HIPAA-aligned data handling',
          'Automated testing suite',
        ],
      },
      {
        name: 'Deployment & Support',
        items: [
          'Staging and production environment setup',
          'Performance monitoring and alerting',
          'Documentation and team training',
          'Ongoing development retainer (optional)',
        ],
      },
    ],
  },

  process: [
    {
      name: 'Workflow Discovery',
      description: 'We spend time understanding your current process in detail, including the workarounds, the manual steps, and the places where things fall through the gaps. Most of the value in this phase is identifying what not to build.',
      timeline: '1–2 weeks',
    },
    {
      name: 'Architecture & Design',
      description: 'Data architecture, integration design, and full UX/UI before any development. Complex builds require this foundation to be right before the build begins.',
      timeline: '2–4 weeks',
    },
    {
      name: 'Development',
      description: 'Core functionality built and deployed to staging. Sprint-based with regular demos and stakeholder review at each sprint end. Complex builds are delivered in phases: core functionality first, additional features in subsequent sprints.',
      timeline: '6–12 weeks',
    },
    {
      name: 'Testing & Integration',
      description: 'End-to-end testing with real workflows, integration testing with connected systems, security review, and user acceptance testing with your team.',
      timeline: '2–3 weeks',
    },
    {
      name: 'Launch & Iteration',
      description: 'Production deployment with monitoring live from day one. Subsequent phases of development based on real usage. We build the roadmap into the contract from the start.',
      timeline: 'Ongoing',
    },
  ],

  faqs: [
    {
      question: 'How do you decide whether a custom build is the right answer or whether an existing tool would work?',
      answer: 'That\'s the first conversation we have. If an off-the-shelf solution genuinely covers what you need, we\'ll tell you, including which one we\'d recommend. Custom development is the right answer when the workflow is specific enough that adapting to a generic tool costs more in team time and operational friction than the build does. We\'ll make that case clearly before you commit to anything.',
    },
    {
      question: 'Can you integrate with our existing practice management system?',
      answer: 'Usually yes, depending on what API access your current system provides. During discovery we\'ll assess what\'s technically possible and be explicit about any limitations. Some legacy healthcare systems have restricted or non-existent APIs, which affects what integration depth is achievable.',
    },
    {
      question: 'How do you handle patient data and security?',
      answer: 'Healthcare data security is a baseline requirement, not a feature. All web applications we build are architected with encryption at rest and in transit, role-based access control, audit logging, and GDPR/HIPAA-aligned data handling. We can work with your legal and compliance team and will produce the technical documentation they need.',
    },
    {
      question: 'What happens after launch: do we own the code?',
      answer: 'Yes. You own the codebase outright. We\'ll provide full repository access and handover documentation. Ongoing maintenance and development is available as a retainer if you want us to stay involved, but that\'s your choice, not a lock-in.',
    },
    {
      question: 'We\'re a multi-site group. Can one application serve all locations?',
      answer: 'Absolutely and that\'s often exactly the use case that justifies a custom build. Multi-site group applications can serve all locations while managing location-specific data, user permissions, and reporting from a single platform.',
    },
    {
      question: 'How much does a custom web application cost?',
      answer: 'Scope-dependent, but we\'ll give you a clear estimate after discovery, before any commitment. A focused patient portal or intake tool typically starts in a different range than a multi-site operational platform. Discovery exists precisely so you know the number before you say yes.',
    },
  ],

  relatedServices: [
    {
      label: 'Booking + management systems',
      linkLabel: 'Explore Booking + management systems',
      reason: 'Custom web apps often need to connect with your booking and patient management infrastructure. We build both, which means the integration is seamless.',
      path: '/services/build/systems',
    },
    {
      label: 'Practice websites',
      linkLabel: 'Explore Practice websites',
      reason: 'A patient-facing web app and your practice website serve adjacent moments in the patient journey. Building both under one system keeps the architecture clean.',
      path: '/services/build/websites',
    },
    {
      label: 'Mobile apps',
      linkLabel: 'Explore Mobile apps',
      reason: 'For patient-facing tools that need to work offline or as a home screen app, a mobile application alongside the web version gives you full coverage.',
      path: '/services/build/apps',
    },
  ],

  finalCta: {
    headline: 'If your current tools don\'t work the way your practice does, we can build ones that do.',
  },
}

// ─────────────────────────────────────────────────────────────
// BUILD — 4 of 4: Booking + management systems
// ─────────────────────────────────────────────────────────────

export const bookingManagementSystems = {
  pillarLabel:  'Build',
  serviceLabel: 'Booking + management systems',
  path:         '/services/build/systems',
  siblings:     siblingsFor(BUILD_SIBLINGS, 'systems'),
  ctaHref:      '/book-a-call',

  pageUi: {
    backLabel: 'Services',
    backHref: '/services#build',
    skipPillarInBreadcrumb: true,
    includedLabel: 'What you get',
    processHeadline: 'What setting up your booking system actually looks like.',
    faqHeadline: 'Things practices usually ask us.',
    relatedHeadline: 'Most practices take these together.',
    finalCtaPrimary: 'Book my free booking audit',
    finalCtaSecondary: { label: 'See results', href: '/results' },
  },

  hero: {
    headline: 'From website to booked appointment, without friction, without admin, without patients falling through the cracks.',
    subcopy: [
      'The gap between a patient deciding to book and an appointment confirmed in the diary is where most private practices lose more revenue than they realize. A phone that rings to voicemail, a booking form with no follow-up, an intake process that takes three emails. Each step is a leak in the pipeline.',
      'We design, configure, and integrate the booking and patient management infrastructure that closes those leaks and makes every inquiry as easy as possible to convert.',
    ],
  },

  scenarios: [
    'You\'re losing inquiries between the website and the diary because the booking process has too much friction.',
    'Your front-of-house team spends too much time on appointment admin that should be automated.',
    'You have no automated follow-up for patients who inquire but don\'t immediately book.',
    'Your current booking system isn\'t integrated with your website, CRM, or patient communications.',
    'You\'re running multiple practitioners or locations and you can\'t get a single view of your pipeline.',
    'Your new patient intake process is manual, slow, and gives patients a poor first impression.',
  ],

  included: {
    description: 'We audit your entire booking and patient management workflow, from first website visit to confirmed appointment and beyond, then design the system architecture that removes every unnecessary step. Then we configure, integrate, or build the tooling that makes it work.',
    outcomes: [
      'Higher inquiry-to-appointment conversion rate',
      'Reduced admin time per booking for front-of-house teams',
      'Automated follow-up for inquiries that don\'t immediately convert',
      'A fully integrated patient journey from website to consultation',
      'Unified practitioner and location scheduling for multi-site practices',
      'Clean intake and consent processes that arrive before the appointment, not in the waiting room',
    ],
    deliverableGroups: [
      {
        name: 'Audit & Design',
        items: [
          'End-to-end booking workflow audit',
          'Friction and drop-off point identification',
          'System architecture design',
          'Integration map (website, CRM, calendar, communications)',
        ],
      },
      {
        name: 'Configuration & Integration',
        items: [
          'Booking system setup and configuration (Cliniko, Jane, Acuity, custom)',
          'Website booking widget integration',
          'CRM connection and pipeline setup',
          'Automated confirmation, reminder, and follow-up sequences',
          'Digital intake and consent form workflow',
        ],
      },
      {
        name: 'Automation',
        items: [
          'Inquiry follow-up automation',
          'Appointment reminder sequences (SMS + email)',
          'Post-appointment review and follow-up triggers',
          'No-show and cancellation rebooking flows',
        ],
      },
      {
        name: 'Reporting',
        items: [
          'Booking conversion tracking',
          'Inquiry source attribution',
          'Practitioner and location utilization dashboard',
          'Patient pipeline visibility for management',
        ],
      },
    ],
  },

  process: [
    {
      name: 'Workflow Audit',
      description: 'We map your current booking journey end-to-end, including every manual step, every system handoff, and every point where patients or inquiries currently disappear. The audit typically identifies more revenue leakage than expected.',
      timeline: '1 week',
    },
    {
      name: 'System Design',
      description: 'We design the ideal booking and management architecture for your practice, specifying which tools to use, which to replace, and how they connect. We\'ll recommend proven healthcare booking platforms or design a custom solution if your requirements need it.',
      timeline: '1 week',
    },
    {
      name: 'Build & Configure',
      description: 'Setup, configuration, customization, and integration across all components. This includes booking system, CRM, communications, intake forms, and any custom development needed for non-standard integrations.',
      timeline: '2–4 weeks',
    },
    {
      name: 'Automation Setup',
      description: 'All follow-up, reminder, post-appointment, and reactivation automation sequences are built, tested, and calibrated. Copy, timing, and channel selection (email, SMS) are all optimized for your patient type.',
      timeline: '1–2 weeks',
    },
    {
      name: 'Team Training & Launch',
      description: 'Your team is trained on the new system with documentation and recorded walkthroughs. Staged go-live with monitoring to ensure the system performs as expected before full rollout.',
      timeline: '1 week',
    },
  ],

  faqs: [
    {
      question: 'Do you work with specific booking systems or can you work with what we already have?',
      answer: 'We can work with your existing system, migrate you to a better one, or build a custom solution. We\'re experienced with Cliniko, Jane App, Acuity, Calendly, and several CRM-integrated booking solutions. If your current system is the right tool and just needs to be configured and integrated properly, we\'ll do that. If it\'s the wrong tool, we\'ll tell you.',
    },
    {
      question: 'What CRM systems do you work with?',
      answer: 'HubSpot, ActiveCampaign, and custom CRM builds are our most common configurations for healthcare practices. The right choice depends on your practice size, team, and how sophisticated your patient pipeline management needs to be.',
    },
    {
      question: 'How quickly can the automation sequences start running?',
      answer: 'Typically within 2–3 weeks of the project start. We prioritize the highest-impact automations first, usually inquiry follow-up and appointment reminder sequences, so you start seeing conversion improvement before the full system is complete.',
    },
    {
      question: 'Can this work for multiple practitioners and multiple locations?',
      answer: 'Yes and this is exactly where a properly designed system pays the most. Multi-practitioner, multi-location booking and management is one of the most common problems we solve. A unified view of your pipeline across the whole practice is one of the primary outputs.',
    },
    {
      question: 'We\'re worried about disrupting our existing patient data. How do you handle migration?',
      answer: 'Data migration is a standard part of any system change we manage. We\'ll audit your current data, design the migration structure, run the migration in a staging environment before touching production, and verify data integrity throughout. Patient data continuity is non-negotiable.',
    },
    {
      question: 'Do you provide ongoing support after the system goes live?',
      answer: 'Yes. We offer ongoing support retainers covering system monitoring, automation tuning, integration updates, and team questions as your practice evolves. Most practices keep us involved for at least the first 90 days after launch while the team settles into the new workflow.',
    },
  ],

  relatedServices: [
    {
      label: 'Practice websites',
      linkLabel: 'Explore Practice websites',
      reason: 'Your booking system only converts the traffic your website generates. Both need to be designed as a single patient journey, which is most effective when built together.',
      path: '/services/build/websites',
    },
    {
      label: 'Google ads',
      linkLabel: 'Explore Google ads',
      reason: 'Paid traffic to a poorly converting booking funnel is money out the window. We often audit and fix the booking system before or alongside launching Google Ads campaigns.',
      path: '/services/grow/google-ads',
    },
    {
      label: 'Meta ads',
      linkLabel: 'Explore Meta ads',
      reason: 'The same applies to Meta campaigns, a frictionless booking journey is what makes paid social profitable at scale.',
      path: '/services/grow/meta-ads',
    },
  ],

  finalCta: {
    headline: 'Every inquiry that doesn\'t become an appointment is revenue your practice has already earned and then lost. Let\'s fix that.',
  },
}

// ─────────────────────────────────────────────────────────────
// GROW — 1 of 3: Meta ads
// ─────────────────────────────────────────────────────────────

export const metaAds = {
  pillarLabel:  'Grow',
  serviceLabel: 'Meta ads',
  path:         '/services/grow/meta-ads',
  siblings:     siblingsFor(GROW_SIBLINGS, 'meta-ads'),
  ctaHref:      '/book-a-call',

  pageUi: {
    backLabel: 'Grow',
    backHref: '/services#grow',
    skipPillarInBreadcrumb: true,
    includedLabel: 'What you get',
    processHeadline: 'What running Meta ads with us actually looks like.',
    faqHeadline: 'Things practices usually ask us.',
    relatedHeadline: 'Most practices take these together.',
    finalCtaPrimary: 'Get my free Meta ads audit',
    finalCtaSecondary: { label: 'See results', href: '/results' },
  },

  hero: {
    headline: 'Meta ads that find the patients worth finding, not just the patients worth targeting.',
    subcopy: [
      'Most healthcare Meta campaigns attract the wrong people. Broad audiences, promotional creative, and campaigns optimized for cheap leads generate a flood of low-intent inquiries that waste consultation time and damage conversion rates.',
      'We build Meta campaigns for private practices that are calibrated for patient quality, not inquiry volume, reaching the people who are genuinely ready to invest in the care you provide.',
    ],
  },

  scenarios: [
    'You\'ve run Meta ads before and got lots of inquiries from people who couldn\'t afford your fees or weren\'t genuine surgical candidates.',
    'You want to fill capacity for a specific procedure or service without discounting or running promotions.',
    'You\'re launching a new service and need to generate awareness and bookings quickly.',
    'You\'re targeting a specific patient demographic, age, location, life stage, and want campaigns built for them specifically.',
    'You have strong before-and-after content and want it working as a patient acquisition asset.',
    'Your current agency runs generic healthcare campaigns and doesn\'t understand your specialty or your patient.',
  ],

  included: {
    description: 'We build, manage, and continuously optimize Meta ad campaigns for private healthcare practices, with creative strategy, audience architecture, and performance management all aligned to the specific patient type your practice wants to attract.',
    outcomes: [
      'Higher-quality inquiries from patients who are ready to book, not just browsing',
      'Lower cost per booked consultation (not just per lead)',
      'Campaign creative that communicates clinical authority, not just aesthetics',
      'Audience development that improves with every campaign cycle',
      'Full attribution from ad click to booked appointment',
      'Campaigns that comply with Meta\'s healthcare advertising policies without sacrificing performance',
    ],
    deliverableGroups: [
      {
        name: 'Strategy & Setup',
        items: [
          'Patient persona and audience architecture',
          'Campaign objective and funnel structure design',
          'Meta pixel and conversion event setup',
          'Healthcare policy compliance review',
          'Landing page conversion audit (or build)',
        ],
      },
      {
        name: 'Creative',
        items: [
          'Ad copy for all placements (feed, stories, reels)',
          'Static image ad design',
          'Video ad scripting and editing (if content provided)',
          'A/B creative testing framework',
          'Seasonal and promotional creative refreshes',
        ],
      },
      {
        name: 'Campaign Management',
        items: [
          'Campaign build and launch',
          'Weekly bid and budget optimization',
          'Audience performance monitoring and refinement',
          'Conversion data analysis and reporting',
          'Monthly strategy review and next-cycle planning',
        ],
      },
      {
        name: 'Reporting',
        items: [
          'Weekly performance dashboard',
          'Cost per inquiry and cost per booked appointment tracking',
          'Creative performance breakdown',
          'Monthly executive summary',
        ],
      },
    ],
  },

  process: [
    {
      name: 'Audit & Strategy',
      description: 'We audit your Meta account, landing pages, and practice positioning before building anything. The most common cause of Meta campaign failure is launching the right campaign into the wrong conversion environment.',
      timeline: '1 week',
    },
    {
      name: 'Creative & Setup',
      description: 'Audience architecture, campaign structure, and creative production. We build the first batch of creative assets and set up all tracking before launch.',
      timeline: '1–2 weeks',
    },
    {
      name: 'Launch & Learning',
      description: 'Campaign launch with daily monitoring. The first 2–4 weeks are the learning phase: we\'re gathering data on which audiences, placements, and creative performs. We don\'t draw conclusions too early.',
      timeline: 'Weeks 3–6',
    },
    {
      name: 'Optimization',
      description: 'Ongoing weekly optimization informed by conversion data, not just Meta platform metrics. We track all the way to booked appointments, not just clicks and leads.',
      timeline: 'Monthly cycle',
    },
    {
      name: 'Scale',
      description: 'Once performance is proven, we scale budgets and expand creative formats to increase volume while protecting quality. Scaling too early is as damaging as not scaling at all.',
      timeline: 'Month 3+',
    },
  ],

  faqs: [
    {
      question: 'Does Meta advertising actually work for healthcare?',
      answer: 'Yes, but it requires a different approach than most industries. Meta\'s healthcare ad policies restrict certain targeting parameters and claim types, and the patient journey is longer and more trust-dependent than typical e-commerce. Campaigns that account for these factors specifically, in their audience design, creative approach, and conversion architecture, perform well. Generic campaigns typically don\'t.',
    },
    {
      question: 'What budget do I need to run Meta ads for my practice?',
      answer: 'We typically recommend a minimum of $2,000–$2,500 or £1,500–£2,000 per month in media spend for a single-service campaign to generate meaningful volume. The right budget depends on your procedure fees, your target consultation volume, and your market. We\'ll model expected outcomes against budget before you commit.',
    },
    {
      question: 'What creative do you need from us?',
      answer: 'The most effective healthcare Meta content uses real patient outcomes, real practitioners, and authentic practice content. We\'ll brief you on exactly what we need, and the more genuine content you can provide, the better the campaigns perform. We can work with what you have and improve it over time.',
    },
    {
      question: 'How do you measure success: leads or bookings?',
      answer: 'Bookings. Leads are a vanity metric in healthcare. We set up tracking all the way through your booking system so we can report on the cost per booked appointment, not just the cost per form submission. This requires your booking system to have proper conversion tracking set up, we\'ll do that as part of the setup.',
    },
    {
      question: 'Can you run campaigns across Instagram and Facebook simultaneously?',
      answer: 'Yes. Meta\'s ad platform manages both. We typically run across both by default but adjust placement weighting based on where your specific patient demographic performs best.',
    },
    {
      question: 'Do Meta ads work for all medical specialties?',
      answer: 'Meta works well for specialties where visual proof, patient education, and lifestyle-driven decisions matter: aesthetics, dermatology, orthopedic surgery, fertility, and many elective procedures. It is less effective for purely referral-driven or emergency specialties. We\'ll tell you honestly in the audit whether Meta is the right channel for your practice.',
    },
  ],

  relatedServices: [
    {
      label: 'Google ads',
      linkLabel: 'Explore Google ads',
      reason: 'Meta and Google ads serve different stages of the patient journey. Meta builds awareness and demand; Google captures patients who are already searching. Running both together is typically more efficient than either alone.',
      path: '/services/grow/google-ads',
    },
    {
      label: 'Booking + management systems',
      linkLabel: 'Explore Booking + management systems',
      reason: 'Meta campaigns only generate ROI if inquiries are efficiently converted to appointments. Fixing the conversion infrastructure before or alongside launching campaigns protects every penny of ad spend.',
      path: '/services/build/systems',
    },
    {
      label: 'Video + motion',
      linkLabel: 'Explore Video + motion',
      reason: 'Video and motion creative consistently outperforms static on Meta. Practices with strong video assets see significantly better campaign performance.',
      path: '/services/brand/video',
    },
  ],

  finalCta: {
    headline: 'Meta campaigns that attract the right patients are a strategy problem, not a budget problem. Let\'s get the strategy right.',
  },
}

// ─────────────────────────────────────────────────────────────
// GROW — 2 of 3: Google ads
// ─────────────────────────────────────────────────────────────

export const googleAds = {
  pillarLabel:  'Grow',
  serviceLabel: 'Google ads',
  path:         '/services/grow/google-ads',
  siblings:     siblingsFor(GROW_SIBLINGS, 'google-ads'),
  ctaHref:      '/book-a-call',

  pageUi: {
    backLabel: 'Grow',
    backHref: '/services#grow',
    skipPillarInBreadcrumb: true,
    includedLabel: 'What you get',
    processHeadline: 'What running Google Ads with us actually looks like.',
    faqHeadline: 'Things practices usually ask us.',
    relatedHeadline: 'Most practices take these together.',
    finalCtaPrimary: 'Get my free Google Ads audit',
    finalCtaSecondary: { label: 'See results', href: '/results' },
  },

  hero: {
    headline: 'Be the practice that shows up when your ideal patients are actively looking.',
    subcopy: [
      'Search advertising captures demand at its highest point: the moment a patient types "private knee surgeon London," "dermatologist for acne Manchester," or "plastic surgeon Miami" into Google. These patients have already decided they want help. They\'re choosing who to contact.',
      'We build and manage Google Ads campaigns for private practices that put you in front of those searches with the right message, and track the outcome all the way to a booked appointment.',
    ],
  },

  scenarios: [
    'You want to grow your practice faster than organic SEO alone will allow.',
    'You\'re launching a new service or procedure and need immediate visibility for relevant searches.',
    'You\'ve run Google Ads before and it was unprofitable, you want to understand why and fix it.',
    'You want to target specific geographic areas or patient demographics with precision.',
    'You\'re competing with well-established practices and need paid visibility while your organic presence grows.',
    'You want reliable attribution from ad click to booked consultation so you can measure true ROI.',
  ],

  included: {
    description: 'We build and manage Google Ads campaigns for private healthcare practices, covering Search, Performance Max, and remarketing, with full conversion tracking back to booked appointments, not just leads or clicks.',
    outcomes: [
      'Immediate visibility for high-intent patient search terms',
      'Qualified inquiries from patients actively seeking the services you provide',
      'Full attribution from ad spend to booked appointments',
      'Falling cost per booked appointment as campaigns learn and improve',
      'Campaigns that comply with Google\'s healthcare advertising policies',
      'Visibility data that informs your SEO strategy and content priorities',
    ],
    deliverableGroups: [
      {
        name: 'Strategy & Setup',
        items: [
          'Keyword research (procedure, condition, and competitor terms)',
          'Campaign and ad group architecture',
          'Negative keyword framework',
          'Google Ads policy compliance review',
          'Conversion tracking setup (calls, form submissions, bookings)',
          'Landing page audit or build recommendations',
        ],
      },
      {
        name: 'Creative & Copy',
        items: [
          'Responsive search ad copy for all ad groups',
          'Ad extension setup (callouts, site links, call extensions)',
          'Landing page copy recommendations',
          'A/B testing framework for headlines and descriptions',
        ],
      },
      {
        name: 'Campaign Management',
        items: [
          'Weekly bid strategy optimization',
          'Search term report analysis and negative keyword expansion',
          'Quality Score monitoring and improvement',
          'Budget pacing and allocation across campaigns',
          'Monthly strategy review',
        ],
      },
      {
        name: 'Reporting',
        items: [
          'Weekly performance dashboard',
          'Cost per inquiry and cost per booked appointment',
          'Search impression share and competitive position data',
          'Monthly executive summary with recommendations',
        ],
      },
    ],
  },

  process: [
    {
      name: 'Keyword Research',
      description: 'We map the full search landscape for your specialty and location, identifying the terms your ideal patients use, what competitors are bidding on, and where the best opportunities are.',
      timeline: '1 week',
    },
    {
      name: 'Account Build',
      description: 'Campaign structure, ad groups, ad copy, extensions, and full conversion tracking setup. We build the account to a standard that most practices have never seen from a previous agency.',
      timeline: '1–2 weeks',
    },
    {
      name: 'Launch & Monitor',
      description: 'Careful launch with daily monitoring and rapid response to any performance issues. The first two weeks generate the data we need to begin meaningful optimization.',
      timeline: 'Weeks 3–4',
    },
    {
      name: 'Optimize',
      description: 'Weekly optimization cycles based on real performance data. Bid adjustments, negative keyword expansion, quality score improvement, and creative testing.',
      timeline: 'Monthly cycle',
    },
    {
      name: 'Scale & Expand',
      description: 'As performance matures, we identify opportunities to expand into new search themes, new locations, or new services, always with ROI as the qualification threshold.',
      timeline: 'Month 3+',
    },
  ],

  faqs: [
    {
      question: 'What budget do I need for Google Ads to be worthwhile?',
      answer: 'For most private practice specialties in a UK or US urban market, a minimum of $2,000–$2,500 or £1,500–£2,500 per month in media spend is needed to generate meaningful, consistent inquiry volume. The right budget for your specific specialty, location, and procedure fees depends on search volume and cost-per-click data we can model for you before you commit.',
    },
    {
      question: 'Why did Google Ads not work for us before?',
      answer: 'The most common reasons: the account was structured around too many generic terms rather than high-intent procedure searches; conversion tracking was measuring clicks or form views rather than actual submissions; landing pages weren\'t matched to the search intent; or the budget was too low to generate statistical significance. We\'ll audit your account and identify the specific cause.',
    },
    {
      question: 'Do you manage the account or hand it over to us?',
      answer: 'We manage the account on your behalf. You have full access and transparency at all times, but the day-to-day management, optimization, and strategy is ours. We provide monthly reporting and a strategy review so you always know what\'s happening and why.',
    },
    {
      question: 'How do you track ROI, not just leads, but actual revenue?',
      answer: 'We set up conversion tracking all the way through your booking system or CRM so we can attribute booked appointments back to the specific campaigns, ad groups, and keywords that generated them. This requires integration with your booking infrastructure, which we\'ll build as part of the setup.',
    },
    {
      question: 'Can Google Ads work alongside SEO?',
      answer: 'They work best together. Paid search gives you immediate visibility while organic SEO builds over months. The search term data from paid campaigns also informs your SEO content strategy with real, proven demand data, which is more reliable than keyword research tools alone.',
    },
    {
      question: 'How long before we see results from Google Ads?',
      answer: 'You\'ll typically see meaningful performance data within the first 2–4 weeks after launch, that\'s the learning phase referenced in our process. Booked appointments from high-intent search terms often follow within the first 4–8 weeks once conversion tracking and landing pages are dialed in. We\'ll set realistic expectations for your specialty and market before you commit.',
    },
  ],

  relatedServices: [
    {
      label: 'SEO',
      linkLabel: 'Explore SEO',
      reason: 'Google Ads provides immediate visibility; SEO builds long-term organic authority. Together they give you coverage across both paid and organic search, with each informing the other.',
      path: '/services/grow/seo',
    },
    {
      label: 'Practice websites',
      linkLabel: 'Explore Practice websites',
      reason: 'Paid traffic converts at a fraction of its potential if it lands on a page that isn\'t built to convert. Landing page quality is one of the most important variables in Google Ads performance.',
      path: '/services/build/websites',
    },
    {
      label: 'Booking + management systems',
      linkLabel: 'Explore Booking + management systems',
      reason: 'Conversion tracking from ad click to booked appointment requires your booking system to be properly integrated. We fix this as part of every Google Ads setup.',
      path: '/services/build/systems',
    },
  ],

  finalCta: {
    headline: 'Your ideal patients are searching right now. Let\'s make sure they find you before they find someone else.',
  },
}

// ─────────────────────────────────────────────────────────────
// GROW — 3 of 3: SEO
// ─────────────────────────────────────────────────────────────

export const seo = {
  pillarLabel:  'Grow',
  serviceLabel: 'SEO',
  path:         '/services/grow/seo',
  siblings:     siblingsFor(GROW_SIBLINGS, 'seo'),
  ctaHref:      '/book-a-call',

  pageUi: {
    backLabel: 'Grow',
    backHref: '/services#grow',
    skipPillarInBreadcrumb: true,
    includedLabel: 'What you get',
    processHeadline: 'What building your SEO program actually looks like.',
    faqHeadline: 'Things practices usually ask us.',
    relatedHeadline: 'Most practices take these together.',
    finalCtaPrimary: 'Get my free SEO audit',
    finalCtaSecondary: { label: 'See results', href: '/results' },
  },

  hero: {
    headline: 'Be found by the patients who are looking for exactly what you do.',
    subcopy: [
      'Search engine optimization for private practices isn\'t about ranking for "private doctor near me." It\'s about appearing in the specific searches your most valuable patients make, the procedure searches, the condition searches, the specialist searches, months before they ever pick up the phone.',
      'We build SEO programs for private healthcare practices that build long-term, compounding organic visibility for the search terms that bring in patients worth acquiring.',
    ],
  },

  scenarios: [
    'New patients can\'t find your practice when they search for the procedures or conditions you specialize in.',
    'You\'re paying for Google Ads to cover organic visibility you should be earning for free.',
    'A competitor with demonstrably worse outcomes is ranking above you because they\'ve invested in SEO and you haven\'t.',
    'You\'ve just launched or redesigned your website and want to build search authority from a strong foundation.',
    'You\'re operating in a specific city or region and want to dominate local search for your specialty.',
    'You want a sustainable patient acquisition channel that doesn\'t require ongoing ad spend to function.',
  ],

  included: {
    description: 'We build comprehensive SEO programs for private healthcare practices, covering technical foundations, content strategy, and authority building, designed to generate compounding organic visibility for the search terms that bring in your most valuable patients.',
    outcomes: [
      'First-page visibility for procedure, condition, and specialty search terms',
      'A sustained flow of qualified organic traffic without ongoing ad spend',
      'Content assets that educate patients and build authority simultaneously',
      'Technical SEO foundations that protect rankings through algorithm changes',
      'Local search dominance for your specialty in your target geography',
      'A patient acquisition channel that improves in value every month',
    ],
    deliverableGroups: [
      {
        name: 'Technical SEO',
        items: [
          'Full technical audit and issue remediation',
          'Site architecture and internal linking optimization',
          'Core Web Vitals and page speed optimization',
          'Schema markup (MedicalBusiness, MedicalSpecialty, FAQPage)',
          'Crawl budget and indexing management',
          'Mobile and accessibility compliance',
        ],
      },
      {
        name: 'Content Strategy & Production',
        items: [
          'Keyword and topic mapping (procedures, conditions, questions)',
          'Content gap analysis vs competitors',
          'Procedure and condition page production',
          'Supporting blog and patient education content',
          'Content refresh program for existing pages',
        ],
      },
      {
        name: 'Local SEO',
        items: [
          'Google Business Profile optimization',
          'Local citation building and management',
          'Location page strategy for multi-site practices',
          'Review acquisition and management program',
        ],
      },
      {
        name: 'Authority Building',
        items: [
          'Link building strategy and outreach',
          'Healthcare publication and directory placements',
          'Digital PR for specialist content',
          'Brand mention monitoring and conversion',
        ],
      },
    ],
  },

  process: [
    {
      name: 'Audit & Research',
      description: 'Full technical audit, keyword and topic research, competitor analysis, and content gap identification. This produces the complete picture of where you are and the ranked priority list of what to do first.',
      timeline: '2 weeks',
    },
    {
      name: 'Technical Foundations',
      description: 'Remediation of all technical issues identified in the audit. Site architecture improvements, speed optimization, schema implementation, and indexing fixes. Nothing else delivers until these are right.',
      timeline: '3–4 weeks',
    },
    {
      name: 'Content Build-Out',
      description: 'Production of procedure and condition pages, FAQ content, and supporting articles, all built to both rank and convert. This is ongoing throughout the program, prioritized by search volume and conversion value.',
      timeline: 'Months 2–6+',
    },
    {
      name: 'Authority Development',
      description: 'Link building, citation management, Google Business Profile optimization, and digital PR. Authority accumulates over time and is the compounding element of the program.',
      timeline: 'Months 3–12+',
    },
    {
      name: 'Monitor & Iterate',
      description: 'Monthly ranking and traffic analysis, content performance review, and program adjustment. SEO is a continuous process, not a project with an end date.',
      timeline: 'Ongoing',
    },
  ],

  faqs: [
    {
      question: 'How long does SEO take to work?',
      answer: 'Honestly, technical fixes can produce visible improvement in 4–8 weeks. Content targeting lower-competition terms can rank in 2–4 months. Building real authority for competitive specialty terms in major cities takes 6–18 months. We\'ll be clear about realistic timelines for your specific situation and prioritize the actions with the fastest impact first.',
    },
    {
      question: 'How is healthcare SEO different from general SEO?',
      answer: 'Healthcare content sits in Google\'s YMYL (Your Money or Your Life) category, which means it\'s subject to elevated scrutiny for expertise, authoritativeness, and trustworthiness (Google\'s E-E-A-T guidelines). Medical content that isn\'t attributed to qualified practitioners, doesn\'t cite evidence, or is thin and generic simply doesn\'t rank, regardless of other technical factors. Healthcare SEO requires genuine clinical expertise in the content, not just keyword optimization.',
    },
    {
      question: 'Do you write the medical content or do we?',
      answer: 'We write it. We work with your clinical team to ensure clinical accuracy, but the research, structure, and production is ours. We write content that meets both Google\'s E-E-A-T standards and the readability requirements of patients who are making decisions, not content written for search engines that no patient would want to read.',
    },
    {
      question: 'Can SEO work alongside paid ads?',
      answer: 'Paid search and SEO work best as a complementary pair. While organic authority builds, paid campaigns provide immediate coverage. And the keyword performance data from paid campaigns is the most reliable input for your organic content strategy. We manage both together for practices that want full-funnel search coverage.',
    },
    {
      question: 'What does a monthly SEO retainer include?',
      answer: 'A typical retainer covers content production (2–4 pieces per month), ongoing technical monitoring and fixes, link building activity, local SEO management, and monthly reporting. The exact scope depends on your domain\'s current authority level, your competitive landscape, and how aggressively you want to grow.',
    },
    {
      question: 'Do you work with practices that have been penalized by Google?',
      answer: 'Yes. We start with a full technical and content audit to identify whether you have a manual penalty, algorithmic suppression, or fixable technical issues. Recovery timelines vary, some issues resolve in weeks, others take months. We\'ll give you an honest assessment before you commit to a recovery program.',
    },
  ],

  relatedServices: [
    {
      label: 'Practice websites',
      linkLabel: 'Explore Practice websites',
      reason: 'SEO on a poorly built site is like pouring water into a leaking bucket. Technical foundations, site architecture, and page speed, all built into every site we build, are prerequisites for SEO to work.',
      path: '/services/build/websites',
    },
    {
      label: 'Google ads',
      linkLabel: 'Explore Google ads',
      reason: 'While SEO builds organic authority over months, Google Ads provides immediate paid coverage. Together they give you full search visibility and each channel\'s data improves the other.',
      path: '/services/grow/google-ads',
    },
    {
      label: 'Brand identity',
      linkLabel: 'Explore Brand identity',
      reason: 'A strong brand identity improves SEO indirectly, through higher click-through rates on search results, better on-page engagement, and more branded searches. Patients who recognize and trust your brand find and choose you more often.',
      path: '/services/brand/identity',
    },
  ],

  finalCta: {
    headline: 'Organic search is the only patient acquisition channel that gets cheaper every month. Let\'s build it.',
  },
}

// ─────────────────────────────────────────────────────────────
// BRAND — 1 of 3: Brand identity
// ─────────────────────────────────────────────────────────────

export const brandIdentity = {
  pillarLabel:  'Brand',
  serviceLabel: 'Brand identity',
  path:         '/services/brand/identity',
  siblings:     siblingsFor(BRAND_SIBLINGS, 'identity'),
  ctaHref:      '/book-a-call',

  pageUi: {
    backLabel: 'Brand',
    backHref: '/services#brand',
    skipPillarInBreadcrumb: true,
    includedLabel: 'What you get',
    processHeadline: 'What building your brand identity actually looks like.',
    faqHeadline: 'Things practices usually ask us.',
    relatedHeadline: 'Most practices take these together.',
    finalCtaPrimary: 'Get my free brand audit',
    finalCtaSecondary: { label: 'See results', href: '/results' },
  },

  hero: {
    headline: 'A brand that tells the right patients exactly who you are, before they\'ve read a word.',
    subcopy: [
      'In private healthcare, brand is trust made visual. Patients comparing practices online make a first-impression judgment in seconds. A brand that communicates clinical authority, warmth, and the standard of your practice gets patients to lean in. A brand that doesn\'t, regardless of how good your clinical outcomes are, makes them hesitate.',
      'We build brand identities for private practices that position you clearly at the quality end of your market and make every subsequent marketing investment work harder.',
    ],
  },

  scenarios: [
    'Your practice has grown significantly but your brand still looks like it was designed when you first set up.',
    'You\'re launching a new practice and want to enter the market positioned at the premium end from day one.',
    'Patients often tell you they chose you because of a referral, but your brand isn\'t doing any work to attract them before the recommendation arrives.',
    'You\'re expanding to multiple locations and your current brand doesn\'t scale.',
    'Your brand looks similar to competitors and you have no visual differentiation.',
    'You\'re repositioning from a generalist to a specialist practice and your brand needs to reflect that.',
  ],

  included: {
    description: 'We develop comprehensive brand identities for private healthcare practices, from foundational positioning strategy through to the full visual and verbal system your practice needs to present consistently and compellingly across every touchpoint.',
    outcomes: [
      'A brand that communicates your clinical level accurately and immediately',
      'Clear visual differentiation from competitors in your market',
      'A consistent brand presence across digital and physical touchpoints',
      'Higher conversion rates from every channel, paid, organic, and referral',
      'A scalable brand system that works for one location or ten',
      'A brand your team believes in and presents with confidence',
    ],
    deliverableGroups: [
      {
        name: 'Strategy & Positioning',
        items: [
          'Brand positioning and differentiation strategy',
          'Target patient persona and market context analysis',
          'Competitor brand landscape mapping',
          'Brand values, personality, and tone of voice framework',
          'Naming review or development (if required)',
        ],
      },
      {
        name: 'Visual Identity',
        items: [
          'Logo and logomark system',
          'Color palette (primary, secondary, and functional)',
          'Typography system (headings, body, UI)',
          'Photography and imagery style guide',
          'Iconography and illustration style (if applicable)',
          'Brand pattern or texture system (if applicable)',
        ],
      },
      {
        name: 'Applications',
        items: [
          'Business card and stationery design',
          'Digital application (website, social, email)',
          'Signage and environmental design concepts',
          'Print collateral templates (brochure, patient information)',
        ],
      },
      {
        name: 'Brand Guidelines',
        items: [
          'Comprehensive brand guidelines document',
          'Logo usage rules and variations',
          'Design file handover (Figma, Adobe, web-ready assets)',
          'Brand application training for your team',
        ],
      },
    ],
  },

  process: [
    {
      name: 'Discovery & Research',
      description: 'We interview key stakeholders, analyze your competitive landscape, and map the patient journey touchpoints where your brand does its most important work. This informs everything that follows.',
      timeline: '1–2 weeks',
    },
    {
      name: 'Positioning Strategy',
      description: 'Before any visual work begins, we establish the brand positioning: what you stand for, how you differ from alternatives, and the emotional and functional territory you own. This is the brief the design responds to.',
      timeline: '1 week',
    },
    {
      name: 'Concept Development',
      description: 'We develop 2–3 distinct visual directions, each reflecting a different expression of the positioning strategy. These are presented with rationale, not just visuals.',
      timeline: '2–3 weeks',
    },
    {
      name: 'Refinement',
      description: 'You select a direction and we refine it to the final standard. Logo, typography, color, and photography style all resolved in this phase.',
      timeline: '2 weeks',
    },
    {
      name: 'Applications & Handover',
      description: 'Production of all brand applications, digital, print, and environmental. Brand guidelines document and full design file handover.',
      timeline: '2–3 weeks',
    },
  ],

  faqs: [
    {
      question: 'How important is branding for a private practice that mostly grows through referrals?',
      answer: 'Very. Even in referral-heavy practices, patients who receive a recommendation will look you up online before booking. If your brand doesn\'t reinforce the referrer\'s endorsement, if the website and visual identity undermine rather than elevate the recommendation, you lose patients you\'ve already acquired. Strong brands also generate more referrals: patients who are proud of their choice tell more people.',
    },
    {
      question: 'How involved do we need to be in the process?',
      answer: 'The discovery phase requires meaningful input from you and key stakeholders, this is where we learn what makes your practice genuinely distinctive. After that, your involvement is focused on decision-making at key milestones: choosing a direction, approving refinements, signing off applications. We manage the work between those points.',
    },
    {
      question: 'Do you handle naming for new practices?',
      answer: 'Yes. Practice naming is part of our positioning work when required, including availability checks (trademark, domain, social handles). If you have a name you\'re committed to, we work with it.',
    },
    {
      question: 'Will this brand work for a website build?',
      answer: 'Yes and the two are most effective when done together or in sequence. A brand identity project produces the exact assets and guidelines a website designer needs. We often combine the two, which shortens the overall timeline and ensures complete consistency.',
    },
    {
      question: 'What file formats do we receive?',
      answer: 'All source files in Figma and Adobe Illustrator/Photoshop formats, plus production-ready exports for web (SVG, PNG, WebP) and print (PDF, EPS). You own everything.',
    },
    {
      question: 'How long does a brand identity project take end to end?',
      answer: 'Most brand identity projects run 7–9 weeks from discovery to handover: discovery and research (1–2 weeks), positioning strategy (1 week), concept development (2–3 weeks), refinement (2 weeks), and applications and handover (2–3 weeks). Timelines adjust if naming work or multi-location applications are included.',
    },
  ],

  relatedServices: [
    {
      label: 'Practice websites',
      linkLabel: 'Explore Practice websites',
      reason: 'Your website is the most visible application of your brand. Building both together, or website immediately following brand, ensures every patient touchpoint reflects the same standard.',
      path: '/services/build/websites',
    },
    {
      label: 'Design',
      linkLabel: 'Explore Design',
      reason: 'Brand identity creates the system; design applies it across your collateral, patient materials, and marketing assets. Both services work from the same foundation.',
      path: '/services/brand/design',
    },
    {
      label: 'Video + motion',
      linkLabel: 'Explore Video + motion',
      reason: 'Brand identity guidelines extend to motion design. Video and animated content that reflects your brand increases memorability and trust with patients who encounter you through social and paid channels.',
      path: '/services/brand/video',
    },
  ],

  finalCta: {
    headline: 'Your brand is making an impression on every patient before they\'ve spoken to you. Let\'s make sure it\'s the right one.',
  },
}

// ─────────────────────────────────────────────────────────────
// BRAND — 2 of 3: Design
// ─────────────────────────────────────────────────────────────

export const design = {
  pillarLabel:  'Brand',
  serviceLabel: 'Design',
  path:         '/services/brand/design',
  siblings:     siblingsFor(BRAND_SIBLINGS, 'design'),
  ctaHref:      '/book-a-call',

  pageUi: {
    backLabel: 'Brand',
    backHref: '/services#brand',
    skipPillarInBreadcrumb: true,
    includedLabel: 'What you get',
    processHeadline: 'What working with our design team actually looks like.',
    faqHeadline: 'Things practices usually ask us.',
    relatedHeadline: 'Most practices take these together.',
    finalCtaPrimary: 'Get my free design audit',
    finalCtaSecondary: { label: 'See results', href: '/results' },
  },

  hero: {
    headline: 'Every patient-facing asset designed to the standard your practice operates at.',
    subcopy: [
      'Design in private healthcare isn\'t decoration. Patient information documents, consultation materials, social content, and marketing collateral all communicate something about the quality and professionalism of your practice before clinical expertise ever becomes visible.',
      'We handle the ongoing and one-off design work that keeps your practice looking as good as it is, across print, digital, and social, so you never have to apologize for the materials you hand a patient.',
    ],
  },

  scenarios: [
    'Your patient information leaflets, consent documents, or post-treatment materials look unprofessional and don\'t reflect the quality of care you provide.',
    'You need a consistent stream of social media content but you don\'t have the time or design resource to produce it.',
    'You\'ve recently had a brand refresh and need all your marketing materials updated to match.',
    'You\'re launching a campaign, a new service, or an event and need professional promotional materials quickly.',
    'Your practice is expanding and you need signage, environmental design, or fit-out creative direction.',
    'You have no internal design capability and need a reliable external resource for ongoing requirements.',
  ],

  included: {
    description: 'We provide ongoing and project-based design services for private healthcare practices, covering all patient-facing, marketing, and operational design requirements. We work from your existing brand identity or develop one as a first step.',
    outcomes: [
      'A consistent, professional visual standard across every patient touchpoint',
      'Marketing materials that reflect your clinical positioning, not just your logo',
      'A reliable design resource that responds quickly to your requirements',
      'Social media content that builds brand recognition through consistent quality',
      'Patient materials that improve understanding and reduce pre-appointment anxiety',
      'Campaign assets optimized for the channels they\'re designed to appear on',
    ],
    deliverableGroups: [
      {
        name: 'Print Collateral',
        items: [
          'Patient information and procedure guides',
          'Consent form and pre-operative instruction design',
          'Practice brochure and capability documents',
          'Business cards and stationery',
          'Signage and wayfinding design',
          'Event and conference materials',
        ],
      },
      {
        name: 'Digital & Social',
        items: [
          'Social media post templates (Instagram, LinkedIn, Facebook)',
          'Email template design',
          'Digital advertising creative (display, social)',
          'Presentation and pitch deck design',
          'Infographic and data visualization design',
        ],
      },
      {
        name: 'Campaign & Marketing',
        items: [
          'Campaign identity and creative direction',
          'Landing page design',
          'Promotional materials (digital and print)',
          'Before-and-after gallery formatting and design standards',
        ],
      },
      {
        name: 'Environmental',
        items: [
          'Reception and waiting area signage',
          'Consultation room materials',
          'Exterior signage and brand application',
          'Fit-out creative direction (working with your interior designer)',
        ],
      },
    ],
  },

  process: [
    {
      name: 'Brand Review',
      description: 'If we haven\'t developed your brand identity, we review your existing brand guidelines and assets before beginning any design work. This ensures everything we produce is consistent with your established identity.',
      timeline: '2–3 days',
    },
    {
      name: 'Brief & Scoping',
      description: 'For each project, we agree a clear brief, what\'s needed, where it\'ll be used, who it\'s for, and what it needs to achieve. This prevents revision loops and ensures the final output is genuinely fit for purpose.',
      timeline: '1–2 days per project',
    },
    {
      name: 'Design & Iteration',
      description: 'Initial design concepts presented for review, with two rounds of revision included as standard. Complex projects or multi-asset campaigns may include a creative direction phase before production.',
      timeline: 'Varies by scope',
    },
    {
      name: 'Production & Delivery',
      description: 'Final files prepared for their intended output, print-ready PDFs, web-optimized images, editable source files, or platform-specific social formats, and delivered with clear production notes.',
      timeline: 'Per project',
    },
    {
      name: 'Ongoing Retainer',
      description: 'For practices with regular design requirements, a monthly retainer provides a defined scope of work, priority turnaround, and consistent output without needing to scope and agree each individual project from scratch.',
      timeline: 'Monthly',
    },
  ],

  faqs: [
    {
      question: 'Do you handle both one-off projects and ongoing design needs?',
      answer: 'Yes. We work on a project basis for defined deliverables and on a monthly retainer for practices with ongoing requirements. Retainer clients get priority turnaround, a consistent design resource who knows their brand deeply, and a predictable monthly cost.',
    },
    {
      question: 'What if we don\'t have brand guidelines?',
      answer: 'We\'ll either develop them as part of our Brand Identity service (recommended if you want a thorough approach) or derive a working visual system from your existing assets before beginning design work. We\'ll tell you which is right based on what you currently have.',
    },
    {
      question: 'Can you produce content for social media on an ongoing basis?',
      answer: 'Yes, this is one of our most common retainer workstreams. We produce social content to a consistent schedule: designed posts, branded templates, and campaign-specific creative. We can also advise on content strategy and posting schedules if that\'s useful.',
    },
    {
      question: 'How quickly can you turn around urgent requests?',
      answer: 'Retainer clients have priority turnaround, typically 24–48 hours for straightforward requests. Project-based clients have standard turnaround times agreed at briefing. We will always be transparent about what\'s achievable if a tight deadline comes up.',
    },
    {
      question: 'Do we get editable source files?',
      answer: 'Yes, always. All design work is produced in Figma or Adobe Creative Suite and source files are included in every delivery. You own everything we produce for you.',
    },
    {
      question: 'Do you work with practices that already have a designer internally?',
      answer: 'Yes. We can work as an extension of your in-house team, handling overflow, specialty formats, or campaign work your internal resource doesn\'t have bandwidth for. We align to your existing brand system and hand off source files in the formats your team uses.',
    },
  ],

  relatedServices: [
    {
      label: 'Brand identity',
      linkLabel: 'Explore Brand identity',
      reason: 'Design works from a brand identity system. If your visual identity needs development before your collateral will look the way it should, brand identity is the right starting point.',
      path: '/services/brand/identity',
    },
    {
      label: 'Video + motion',
      linkLabel: 'Explore Video + motion',
      reason: 'Static design and motion design complement each other across the patient journey. Social content that combines both consistently outperforms either alone.',
      path: '/services/brand/video',
    },
    {
      label: 'Practice websites',
      linkLabel: 'Explore Practice websites',
      reason: 'Your website design and your wider practice collateral should feel like the same practice. We design both to a consistent standard.',
      path: '/services/build/websites',
    },
  ],

  finalCta: {
    headline: 'Every piece of design your practice puts in front of a patient says something. Let\'s make sure it says the right thing.',
  },
}

// ─────────────────────────────────────────────────────────────
// BRAND — 3 of 3: Video + motion
// ─────────────────────────────────────────────────────────────

export const videoMotion = {
  pillarLabel:  'Brand',
  serviceLabel: 'Video + motion',
  path:         '/services/brand/video',
  siblings:     siblingsFor(BRAND_SIBLINGS, 'video'),
  ctaHref:      '/book-a-call',

  pageUi: {
    backLabel: 'Brand',
    backHref: '/services#brand',
    skipPillarInBreadcrumb: true,
    includedLabel: 'What you get',
    processHeadline: 'What producing video for your practice actually looks like.',
    faqHeadline: 'Things practices usually ask us.',
    relatedHeadline: 'Most practices take these together.',
    finalCtaPrimary: 'Get my free video audit',
    finalCtaSecondary: { label: 'See results', href: '/results' },
  },

  hero: {
    headline: 'Video content that builds trust before the first consultation has been booked.',
    subcopy: [
      'In private healthcare, trust is the purchase. Patients are not buying a product, they\'re selecting someone to perform a procedure on them, manage a condition with them, or transform something they care deeply about. Video is the most powerful format for building that trust at scale.',
      'We produce video and motion content for private practices that communicates clinical expertise, patient outcomes, and practice culture in the format that patients engage with most.',
    ],
  },

  scenarios: [
    'Patients arrive at consultations not yet fully trusting you because they\'ve only seen a static website.',
    'You want your before-and-after results and patient stories to work harder as acquisition assets.',
    'You\'re investing in social media or paid advertising but your content is static and underperforming against video competitors.',
    'You want to communicate your surgical technique, treatment approach, or patient process in a way that text and images can\'t capture.',
    'You\'re building a new website and want the hero section or procedure pages to feature authentic video.',
    'You want motion design that makes your social and digital advertising more engaging and brand-consistent.',
  ],

  included: {
    description: 'We produce, direct, and deliver video and motion content for private healthcare practices, from full brand films and procedure explainers to social content series and animated advertising assets. All content is produced to a clinical and brand standard appropriate for a premium private practice.',
    outcomes: [
      'Higher trust conversion at every stage of the patient journey',
      'Higher engagement and conversion rates across Meta, YouTube, and website video placements',
      'Patient story content that generates direct referrals and builds authority',
      'Evergreen content assets that continue working months or years after production',
      'A video library that serves your website, social, and paid channels simultaneously',
      'Motion design assets that elevate your digital advertising above competitors',
    ],
    deliverableGroups: [
      {
        name: 'Brand & Practice Films',
        items: [
          'Practice culture and team films (60–90 seconds)',
          'Surgeon or practitioner authority profiles',
          'Facility and patient experience walk-through films',
          'Practice philosophy and approach explainers',
        ],
      },
      {
        name: 'Patient Story Content',
        items: [
          'Patient testimonial films (interview-led)',
          'Patient journey documentary content',
          'Before-and-after case story films',
          'Long-form and short-form edits for multiple platforms',
        ],
      },
      {
        name: 'Clinical & Educational Content',
        items: [
          'Procedure and treatment explainer films',
          'FAQ response videos for website and social',
          'Consultation walkthrough content',
          'Post-treatment care instruction videos',
        ],
      },
      {
        name: 'Motion Design & Advertising',
        items: [
          'Animated logo and brand elements',
          'Motion graphics for social and paid ads',
          'Lower thirds and video template system for ongoing content',
          'Animated infographics and data visualizations',
        ],
      },
    ],
  },

  process: [
    {
      name: 'Strategy & Brief',
      description: 'We define the video content strategy before any camera is pointed at anything: what we\'re producing, who it\'s for, where it\'ll appear, and what it needs to make a patient feel. This brief drives all creative decisions.',
      timeline: '1 week',
    },
    {
      name: 'Pre-production',
      description: 'Shot list, interview question development (for patient or practitioner-led content), location assessment, scheduling, and all logistics. Complex productions include a full shoot day brief for your team.',
      timeline: '1–2 weeks',
    },
    {
      name: 'Production',
      description: 'Shoot day(s) managed by our production team. We handle all direction, lighting, and audio on-site. We minimize disruption to your practice, most shoots are completed in a half or full day.',
      timeline: '1–2 shoot days',
    },
    {
      name: 'Post-production',
      description: 'Editing, color grading, sound design, music licensing, and motion graphics. We produce multiple edits from each shoot: long-form for website, cut-downs for social, square and vertical formats for paid ads.',
      timeline: '2–3 weeks',
    },
    {
      name: 'Delivery & Optimization',
      description: 'All files delivered in platform-specific formats with captions and subtitles. Performance review at 30 and 90 days to inform next content priorities.',
      timeline: '3–5 days delivery',
    },
  ],

  faqs: [
    {
      question: 'Do patients actually need to be featured in video content?',
      answer: 'Not necessarily, though patient story content typically performs best for acquisition. Practitioner profile films, practice walk-throughs, and procedure explainers are all highly effective content types that don\'t require patient participation. We\'ll recommend the content mix most appropriate for your practice and patient consent situation.',
    },
    {
      question: 'We\'re worried about patient privacy: how do you handle consent?',
      answer: 'We use comprehensive video consent documentation for all patient-featuring content, and we advise on GDPR and GMC/AMA guidelines for medical video content throughout the process. We\'ll never recommend content that puts your practice in a compliance risk position.',
    },
    {
      question: 'How disruptive is a shoot day to our practice?',
      answer: 'Minimal, with proper planning. Most shoots work in clinical or reception spaces during quieter periods, or we agree a specific day with your team. We\'re used to healthcare environments and understand that patient care takes precedence. A typical brand shoot takes 4–6 hours.',
    },
    {
      question: 'How many different edits can we get from one shoot?',
      answer: 'From a single brand shoot, we typically produce 4–6 distinct deliverables: a long-form practice film, a shorter social cut, a square format version, a vertical version for Reels and Stories, and a thumbnail image set. The content value of a single shoot day is significant when it\'s planned and edited well.',
    },
    {
      question: 'Do you produce motion graphics for advertising without a full video shoot?',
      answer: 'Yes. Motion design and animated advertising assets can be produced entirely from your existing static content, brand assets, and photography. This is a cost-effective way to significantly improve the performance of existing paid social campaigns.',
    },
    {
      question: 'Can you repurpose existing video or photography we already have?',
      answer: 'Yes. We regularly work with existing assets, updating older footage with new branding, re-editing for new platforms, or combining photography with motion design. This can significantly reduce production cost when a full shoot day isn\'t needed.',
    },
  ],

  relatedServices: [
    {
      label: 'Meta ads',
      linkLabel: 'Explore Meta ads',
      reason: 'Video and motion creative consistently outperforms static on Meta. Practices with strong video assets see significantly better campaign performance and we produce both.',
      path: '/services/grow/meta-ads',
    },
    {
      label: 'Brand identity',
      linkLabel: 'Explore Brand identity',
      reason: 'Video content should feel unmistakably like your brand. If your visual identity needs to be developed before video content can reflect it properly, that\'s where we start.',
      path: '/services/brand/identity',
    },
    {
      label: 'Design',
      linkLabel: 'Explore Design',
      reason: 'Motion design sits at the intersection of video and graphic design. Many practices benefit from a unified retainer covering both static design and motion assets.',
      path: '/services/brand/design',
    },
  ],

  finalCta: {
    headline: 'Patients decide whether to trust you before they\'ve spoken to you. Video is how you shape that decision.',
  },
}

// ─────────────────────────────────────────────────────────────
// MASTER EXPORT, all 10 service detail data objects
// ─────────────────────────────────────────────────────────────

export const allServices = [
  // BUILD (4)
  { path: '/services/build/websites',  pillar: 'build',  data: practiceWebsites },
  { path: '/services/build/apps',      pillar: 'build',  data: mobileApps },
  { path: '/services/build/web-apps',  pillar: 'build',  data: webApplications },
  { path: '/services/build/systems',   pillar: 'build',  data: bookingManagementSystems },

  // GROW (3)
  { path: '/services/grow/meta-ads',   pillar: 'grow',   data: metaAds },
  { path: '/services/grow/google-ads', pillar: 'grow',   data: googleAds },
  { path: '/services/grow/seo',        pillar: 'grow',   data: seo },

  // BRAND (3)
  { path: '/services/brand/identity',  pillar: 'brand',  data: brandIdentity },
  { path: '/services/brand/design',    pillar: 'brand',  data: design },
  { path: '/services/brand/video',     pillar: 'brand',  data: videoMotion },
]

/**
 * USAGE IN ROUTER:
 *
 * import { allServices } from './serviceContentMatrix'
 *
 * const match = allServices.find(s => s.path === `/services/${params.pillar}/${params.service}`)
 * if (!match) return <NotFound />
 * return <ServiceDetailPage data={match.data} />
 */
