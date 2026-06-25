import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowDown, ArrowRight } from 'lucide-react'
import LazyDarkVeil from '../../components/dark-veil/LazyDarkVeil.jsx'
import './HowWeWorkPage.css'

const PROCESS_SECTIONS = [
  { id: 'universal-engagement-model', title: 'Universal engagement model' },
  { id: 'build-process', title: 'Build process' },
  { id: 'grow-process', title: 'Grow process' },
  { id: 'brand-process', title: 'Brand process' },
]

const ENGAGEMENT_STAGES = [
  {
    stage: '01',
    title: 'Discovery: we learn your practice before we touch anything',
    week: 'Week 1–2',
    body:
      'This is the most important stage and the one most agencies skip. We spend two weeks inside your practice, auditing your current patient acquisition, mapping your competitors, analysing your seasonal patterns, understanding your patient profile and what makes a high-value patient for your specific specialty. Nothing is built until this is done. Everything that comes after is built on what we find here.',
    deliverables: [
      'Practice audit report',
      'Competitor map',
      'Patient profile analysis',
      'Seasonal pattern review',
      'Gap identification',
    ],
  },
  {
    stage: '02',
    title: 'Strategy: you see the full plan before we start building',
    week: 'Week 3–4',
    body:
      "Based on the discovery, we design the full system: what we're building, in what order, why each decision was made, and what success looks like. You review it. You approve it. We don't build a single thing you haven't signed off on. No surprises, no scope creep, no \"we assumed you wanted that.\"",
    deliverables: [
      'Strategy document',
      'Full project roadmap',
      'Success metrics defined',
      'Timeline confirmed',
      'Client sign-off',
    ],
  },
  {
    stage: '03',
    title: 'Build: we execute against the plan, nothing off-piste',
    week: 'Week 5–8 · varies by scope',
    body:
      "This is where the work happens. Website built. Campaigns set up. Brand created. Depending on what you've engaged us for, this phase looks different, but the principle is the same. We execute exactly what was agreed in Stage 02. Weekly check-ins. Full transparency. You always know where we are.",
    deliverables: [
      'Weekly progress updates',
      'Staged delivery',
      'Client review at each milestone',
      'Revisions built into timeline',
    ],
  },
  {
    stage: '04',
    title: 'Launch: measured, monitored, nothing left to chance',
    week: 'Week 8–9',
    body:
      'Nothing goes live without a launch checklist signed off. Analytics verified. Tracking confirmed. Every form tested. Every page checked across devices. A 48-hour monitoring window after launch: someone watching in real time so any issue is caught and fixed before it becomes a problem.',
    deliverables: [
      'Pre-launch QA',
      'Analytics setup confirmed',
      '48hr live monitoring',
      'Launch sign-off',
    ],
  },
  {
    stage: '05',
    title: 'Iterate: the system gets sharper every single month',
    week: 'Month 3 onwards · ongoing',
    body:
      "This is where most agencies stop. We don't. Every month we review what's working, what isn't, and what needs to change. Seasonal contingencies are activated before the dip hits, not after. You get a monthly report that shows one thing: whether your practice is growing. Not impressions. Not reach. Growth.",
    deliverables: [
      'Monthly performance review',
      'Results reported in appointments',
      'Seasonal planning ahead of time',
      'Continuous optimization',
    ],
  },
]

const PRACTICE_TRACKS = [
  {
    id: 'build-process',
    title: 'Build: websites, apps, booking systems, web applications',
    intro: 'What the 5-stage process looks like specifically for development work',
    phases: [
      {
        letter: 'D',
        name: 'Discovery',
        body:
          'Existing site audit. User journey mapping. Competitor site analysis. Technical requirements. SEO baseline. What the current site is losing and why.',
        weeks: 'Weeks 1–2',
      },
      {
        letter: 'S',
        name: 'Strategy + architecture',
        body:
          'Sitemap. Information architecture. Wireframes for every page. Copy written into wireframes. No design until structure is approved.',
        weeks: 'Weeks 3–4',
      },
      {
        letter: 'B',
        name: 'Design + build',
        body:
          'Design system first: colors, typography, components. Then page design. Then development. Staged reviews at design sign-off, then at build completion.',
        weeks: 'Weeks 5–8',
      },
      {
        letter: 'L',
        name: 'QA + launch',
        body:
          'Cross-browser testing. Core Web Vitals. SEO pre-launch checklist. Analytics verified. Soft launch → 48hr monitoring → full go-live.',
        weeks: 'Week 9',
      },
      {
        letter: 'I',
        name: 'Iterate',
        body:
          'Monthly performance review. Conversion rate optimization. A/B testing on key pages. SEO tracking. The site improves every month.',
        weeks: 'Month 3+',
      },
    ],
  },
  {
    id: 'grow-process',
    title: 'Grow: Meta ads, Google ads, SEO',
    intro: 'What the 5-stage process looks like specifically for patient acquisition',
    phases: [
      {
        letter: 'D',
        name: 'Discovery',
        body:
          'Current channel audit. Lead quality analysis. Cost per acquisition baseline. Competitor ad review. Patient profile and geographic targeting research. Insurance friction mapping.',
        weeks: 'Weeks 1–2',
      },
      {
        letter: 'S',
        name: 'Strategy',
        body:
          'Channel selection and budget allocation. Audience architecture. Messaging framework per channel. Lead qualification criteria. Success metrics defined, cost per confirmed appointment, not cost per lead.',
        weeks: 'Weeks 3–4',
      },
      {
        letter: 'B',
        name: 'Build + launch campaigns',
        body:
          'Ad creative built. Landing pages set up. Lead qualification forms configured. CRM and follow-up sequences connected. Tracking and attribution verified before any spend goes live.',
        weeks: 'Weeks 5–8',
      },
      {
        letter: 'L',
        name: 'Go live',
        body:
          'Phased spend ramp-up. Daily monitoring for first two weeks. Lead quality review at day 7 and day 14. Adjustments made before full budget is committed.',
        weeks: 'Week 8–9',
      },
      {
        letter: 'I',
        name: 'Iterate',
        body:
          'Monthly report in confirmed appointments, not impressions. Seasonal campaign planning 6–8 weeks ahead. Creative refresh every 6–8 weeks. Continuous bid and audience optimization.',
        weeks: 'Month 3+',
      },
    ],
  },
  {
    id: 'brand-process',
    title: 'Brand: brand identity, design, video + motion',
    intro: 'What the 5-stage process looks like specifically for creative work',
    phases: [
      {
        letter: 'D',
        name: 'Discovery',
        body:
          'Brand audit. Competitor visual landscape. Patient perception research. What the current brand communicates vs what the practice actually delivers. The gap is the brief.',
        weeks: 'Weeks 1–2',
      },
      {
        letter: 'S',
        name: 'Strategy + positioning',
        body:
          'Brand positioning statement. Personality and tone of voice. Messaging hierarchy. Visual direction: three stylescape options presented. One chosen before any design begins.',
        weeks: 'Weeks 3–4',
      },
      {
        letter: 'B',
        name: 'Design + production',
        body:
          'Logo and identity system. Color and typography. Component library. Collateral design. Video production if in scope. Staged presentations: identity first, then applications.',
        weeks: 'Weeks 5–8',
      },
      {
        letter: 'L',
        name: 'Delivery + guidelines',
        body:
          'All files packaged and delivered. Brand guidelines document covers every use case so the brand stays consistent whether applied by us or anyone else.',
        weeks: 'Week 9',
      },
      {
        letter: 'I',
        name: 'Ongoing brand management',
        body:
          "Monthly content and creative production if retained. Brand consistency reviews. New asset creation as the practice grows. The brand evolves, it doesn't go stale.",
        weeks: 'Month 3+',
      },
    ],
  },
]

const FOUR_TRUTHS = [
  {
    num: '01',
    title: 'You never chase us for an update',
    body:
      "Weekly check-ins are built into every engagement. You always know where we are, what's being worked on, and what's coming next. If something changes, you hear it from us first.",
  },
  {
    num: '02',
    title: 'We report on results, not activity',
    body:
      'Your monthly report shows one thing: whether your practice is growing. Appointments booked. Patients confirmed. Revenue attributed. Not impressions, not reach, not "engagement rate."',
  },
  {
    num: '03',
    title: 'Nothing is built without your sign-off',
    body:
      "Every deliverable is reviewed and approved before the next phase begins. No assumptions. No \"we thought you'd want that.\" If it's going into your practice's name, you've seen it first.",
  },
  {
    num: '04',
    title: 'We plan for your slow months before they happen',
    body:
      "Seasonal dips don't catch us by surprise. Contingency campaigns are planned and ready 6–8 weeks before your historically slow periods. You never react. You always have a plan already running.",
  },
]

const FIRST_30_DAYS = [
  {
    range: 'Day 1',
    title: 'Kick-off call',
    body: 'Meet the team. Align on goals. Confirm timeline. Set up shared workspace.',
  },
  {
    range: 'Days 2–7',
    title: 'Access + audit',
    body: 'We request access to all relevant accounts. Audit begins immediately. No waiting around.',
  },
  {
    range: 'Days 8–14',
    title: 'Discovery report',
    body: 'First deliverable. Full audit of your current state. Presented on a call. Questions answered.',
  },
  {
    range: 'Days 15–30',
    title: 'Strategy sign-off',
    body: 'Full strategy presented. You review. You approve. Build begins the day you sign off.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'How long before we see results?',
    a: 'For patient acquisition campaigns: first results within 30 days of go-live. For SEO: meaningful movement within 90 days. For a new website: live within 8 weeks of strategy sign-off.',
  },
  {
    q: 'Who works on our account?',
    a: "Senior oversight on every engagement. We don't hand you to a junior after onboarding. The people you meet at the start are the people doing the work.",
  },
  {
    q: 'What do you need from us?',
    a: 'Access to your current accounts, 2–3 hours in weeks 1–2 for the discovery process, and a designated point of contact on your side. After that, we handle everything.',
  },
  {
    q: 'Can we pause or stop?',
    a: "We work on retainer engagements with a 30-day notice period. No long-term lock-ins. We'd rather earn your continued business every month than lock you into a contract.",
  },
  {
    q: 'How do you measure success?',
    a: "In confirmed appointments and revenue, not vanity metrics. We agree on the success metrics before we start and report against them every month. If the number isn't moving, we tell you why and what we're doing about it.",
  },
  {
    q: 'Do you work with practices outside the US and UK?',
    a: "Our primary markets are the US and UK. If you're outside these markets, get in touch. We'll tell you honestly whether we can deliver the same quality of work for your location.",
  },
]

export default function HowWeWorkPage() {
  return (
    <main className="how-we-work-page">
      <section className="how-we-work-hero" aria-labelledby="how-we-work-hero-heading">
        <div className="how-we-work-hero__bg-animation" aria-hidden>
          <LazyDarkVeil speed={0.5} />
        </div>

        <div className="how-we-work-hero__inner">
          <p className="how-we-work-hero__eyebrow">
            No black boxes. No surprises. No disappearing acts.
          </p>
          <h1 id="how-we-work-hero-heading" className="how-we-work-hero__title">
            Before you sign anything, you&apos;ll know exactly what happens next, week by week.
          </h1>
          <p className="how-we-work-hero__sub">
            Most agencies onboard you, go quiet for a month, and come back with a report. That&apos;s
            not how we work. Every engagement at Socialsect follows a documented process, from the
            practice audit to the first result to the ongoing monthly rhythm. This page shows you
            all of it.
          </p>

          <nav className="how-we-work-hero__anchors" aria-label="Jump to sections on this page">
            {/* <p className="how-we-work-hero__anchors-label">Page anchor links</p/> */}
            <ul className="how-we-work-hero__anchors-list">
              {PROCESS_SECTIONS.map(({ id, title }) => (
                <li key={id}>
                  <a href={`#${id}`} className="how-we-work-hero__jump-link">
                    <ArrowDown className="how-we-work-hero__jump-icon" strokeWidth={2} aria-hidden />
                    <span>{title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section
        id="universal-engagement-model"
        className="how-we-work-section how-we-work-section--first how-we-work-engagement"
        aria-labelledby="how-we-work-engagement-heading"
      >
        <div className="how-we-work-section__inner" id="universal-engagement-model">
          <p className="how-we-work-engagement__kicker">Universal engagement model</p>
          <h2 id="how-we-work-engagement-heading" className="how-we-work-engagement__headline">
            Every engagement, regardless of what you&apos;ve hired us for, follows the same
            spine.
          </h2>
          <p className="how-we-work-engagement__sub">
            Whether you&apos;ve come to us for a website, a patient acquisition system, or a full
            brand overhaul: the way we work doesn&apos;t change. The deliverables do. The process
            doesn&apos;t.
          </p>

          <ol className="how-we-work-engagement__stages">
            {ENGAGEMENT_STAGES.map((item, index) => (
              <li key={item.stage} className="how-we-work-engagement__stage">
                <div className="how-we-work-engagement__stage-card">
                  <span className="how-we-work-engagement__stage-label">Stage {item.stage}</span>
                  <h3 className="how-we-work-engagement__stage-title">{item.title}</h3>
                  <p className="how-we-work-engagement__stage-week">{item.week}</p>
                  <p className="how-we-work-engagement__stage-body">{item.body}</p>
                  <ul className="how-we-work-engagement__deliverables">
                    {item.deliverables.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                {index < ENGAGEMENT_STAGES.length - 1 && (
                  <span className="how-we-work-engagement__stage-arrow" aria-hidden>
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="how-we-work-section how-we-work-section--alt how-we-work-practice"
        aria-labelledby="how-we-work-practice-heading"
      >
        <div className="how-we-work-section__inner">
          <h2 id="how-we-work-practice-heading" className="how-we-work-practice__headline">
            What each stage looks like in practice, depending on what you&apos;ve hired us for.
          </h2>

          <div className="how-we-work-practice__tracks">
            {PRACTICE_TRACKS.map((track, trackIndex) => (
              <article
                key={track.id}
                id={track.id}
                className={`how-we-work-practice__track${
                  trackIndex % 2 === 1 ? ' how-we-work-practice__track--emphasis' : ''
                }`}
                aria-labelledby={`how-we-work-track-${track.id}-title`}
              >
                <h3 id={`how-we-work-track-${track.id}-title`} className="how-we-work-practice__track-title">
                  {track.title}
                </h3>
                <p className="how-we-work-practice__track-intro">{track.intro}</p>
                <ol className="how-we-work-practice__phases">
                  {track.phases.map((phase) => (
                    <li key={`${track.id}-${phase.letter}-${phase.name}`} className="how-we-work-practice__phase">
                      <div className="how-we-work-practice__phase-head">
                        <span className="how-we-work-practice__phase-letter" aria-hidden>
                          {phase.letter}
                        </span>
                        <div className="how-we-work-practice__phase-meta">
                          <h4 className="how-we-work-practice__phase-name">{phase.name}</h4>
                          <p className="how-we-work-practice__phase-body">{phase.body}</p>
                          <p className="how-we-work-practice__phase-weeks">{phase.weeks}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="every-engagement-truths"
        className="how-we-work-section how-we-work-truths"
        aria-labelledby="how-we-work-truths-heading"
      >
        <div className="how-we-work-section__inner">
          <h2 id="how-we-work-truths-heading" className="how-we-work-truths__headline">
            Four things that are true of every engagement. Without exception.
          </h2>
          <ul className="how-we-work-truths__grid">
            {FOUR_TRUTHS.map((item) => (
              <li key={item.num} className="how-we-work-truths__card">
                <span className="how-we-work-truths__num" aria-hidden>
                  {item.num}
                </span>
                <h3 className="how-we-work-truths__title">{item.title}</h3>
                <p className="how-we-work-truths__body">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="first-30-days"
        className="how-we-work-section how-we-work-section--alt how-we-work-first30"
        aria-labelledby="how-we-work-first30-heading"
      >
        <div className="how-we-work-section__inner">
          <h2 id="how-we-work-first30-heading" className="how-we-work-first30__headline">
            Here&apos;s what the first 30 days look like after you sign.
          </h2>
          <ol className="how-we-work-first30__timeline">
            {FIRST_30_DAYS.map((row) => (
              <li key={row.range} className="how-we-work-first30__row">
                <span className="how-we-work-first30__range">{row.range}</span>
                <div className="how-we-work-first30__card">
                  <h3 className="how-we-work-first30__title">{row.title}</h3>
                  <p className="how-we-work-first30__body">{row.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="how-we-work-first30__summary">
            From signed contract to first deliverable in your hands, 14 days. From signed contract
            to full system live, 8 weeks.
          </p>
        </div>
      </section>

      <section
        id="before-every-engagement-faq"
        className="how-we-work-section how-we-work-faq"
        aria-labelledby="how-we-work-faq-heading"
      >
        <div className="how-we-work-section__inner how-we-work-section__inner--narrow">
          <h2 id="how-we-work-faq-heading" className="how-we-work-faq__headline">
            Questions we get asked before every engagement.
          </h2>
          <div className="how-we-work-faq__list">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="how-we-work-faq__item">
                <h3 className="how-we-work-faq__question">{item.q}</h3>
                <p className="how-we-work-faq__answer">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-we-work-closing" aria-labelledby="how-we-work-closing-heading">
        <div className="how-we-work-closing__inner">
          <h2 id="how-we-work-closing-heading" className="how-we-work-closing__headline">
            Now you know exactly how we work. The next step is finding out if we&apos;re the right
            fit for your practice.
          </h2>
          <p className="how-we-work-closing__body">
            A free 45-minute practice audit. We&apos;ll review your current situation, tell you where
            the gaps are, and show you what the process would look like for your specific practice. No
            pitch. No packages. Just a clear starting point.
          </p>
          <div className="how-we-work-closing__actions">
            <Link to={BOOK_A_CALL_FORM} className="how-we-work-closing__btn how-we-work-closing__btn--primary">
              Get my free practice audit
              <ArrowRight className="how-we-work-closing__btn-icon" strokeWidth={2} aria-hidden />
            </Link>
            <Link to="/results" className="how-we-work-closing__btn how-we-work-closing__btn--ghost">
              See results
            </Link>
          </div>
          <p className="how-we-work-closing__note">
            No commitment. No sales pitch. Just the process, exactly as described on this page.
          </p>
        </div>
      </section>
    </main>
  )
}
