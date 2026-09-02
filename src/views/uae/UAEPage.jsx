'use client'
import { useEffect, useLayoutEffect, useState, useRef, Fragment } from 'react'
import { submitForm } from '../../lib/submitForm'
import VideoPlayer from '../../components/VideoPlayer'
import BookMeetingModal from '../../components/BookMeetingModal'
import './UAEPage.css'

/* ──────────────────────────────────────────────
   PIPELINE FLOW DATA
   ────────────────────────────────────────────── */

const PIPELINE_STEPS = [
  { num: 1, icon: 'magnet', color: '#FF3B72',
    title: 'Attract the Right People',
    desc: 'We run targeted ads & content to bring in people actively looking for your treatments.' },
  { num: 2, icon: 'whatsapp', color: '#25D366',
    title: 'Qualify & Start the Conversation',
    desc: 'We capture enquiries and start real conversations on WhatsApp or call.' },
  { num: 3, icon: 'personCheck', color: '#3563FF',
    title: 'Qualify & Pre-Screen',
    desc: 'We ask the right questions to understand needs, budget and timeline.' },
  { num: 4, icon: 'calendar', color: '#FF3B72',
    title: 'Book the Consultation',
    desc: 'We book the patient appointment directly into your calendar.' },
  { num: 5, icon: 'bell', color: '#F5A623',
    title: 'Remind & Reduce No-Shows',
    desc: 'Smart reminders before the appointment to reduce no-shows.' },
  { num: 6, icon: 'check', color: '#0EB981',
    title: 'Attend the Consultation',
    desc: 'The patient shows up. Your team does what they do best.' },
  { num: 7, icon: 'heart', color: '#FF3B72',
    title: 'Happy Patient. More Referrals.',
    desc: 'Happy patients return and refer others. Your reputation grows.' },
  { num: 8, icon: 'bars', color: '#7047FF',
    title: 'Track. Improve. Scale.',
    desc: "We track what matters, improve what's not working, and scale what brings you patients." },
]

const ACTIVITY_ENTRIES = [
  { icon: 'whatsapp', bg: '#E9F9EF', color: '#25D366', title: 'New WhatsApp enquiry', sub: 'Interested in Laser Hair Removal', time: '2 min ago' },
  { icon: 'filter', bg: '#EEF0FE', color: '#7047FF', title: 'Qualified', sub: 'Budget & timeline confirmed', time: '4 min ago' },
  { icon: 'calendar', bg: '#FFEEF0', color: '#FF3B72', title: 'Consultation booked', sub: 'Tomorrow · 4:30 PM', time: '6 min ago' },
  { icon: 'bell', bg: '#FFF6E5', color: '#F5A623', title: 'Reminder sent', sub: 'SMS + WhatsApp reminder', time: '1 day before' },
  { icon: 'check', bg: '#E7FBF3', color: '#0EB981', title: 'Consultation attended', sub: 'New patient', time: 'Today' },
]

const TRUST_ITEMS = [
  { icon: 'shield', text: 'We follow DHA guidelines\n& advertising standards.' },
  { icon: 'lock', text: 'Patient data is private\nand always protected.' },
  { icon: 'people', text: 'You own the relationship.\nWe build the system.' },
  { icon: 'target', text: 'One goal: more booked\nconsultations & patients.' },
]

/* ──────────────────────────────────────────────
   OTHER DATA
   ────────────────────────────────────────────── */

const CASE_STUDIES = [
  {
    name: 'NY Metro Vein & Aesthetic Center',
    specialty: 'Vascular & Aesthetic Medicine',
    location: 'New York City, US',
    image: '/images/dradam.png',
    primaryResult: '700+',
    primaryLabel: 'Consultations booked',
    metrics: [
      { value: '2,971', label: 'Enquiries' },
      { value: '$5.27', label: 'Cost per lead' },
      { value: '$100K+', label: 'Attributed revenue' },
    ],
    problem: 'Needed consistent consultation volume from a specific patient demographic in a competitive NYC market.',
    whatChanged: 'AI-optimized Meta ad campaigns targeting the Hispanic community. Built and managed over 20 months.',
    result: 'Sustained pipeline at $5.27 per lead with over $100K in directly attributable revenue.',
  },
  {
    name: 'Miami Shoulder Institute',
    specialty: 'Orthopaedic Surgery',
    location: 'Miami, FL',
    image: '/drbadia.webp',
    primaryResult: '~225',
    primaryLabel: 'Consultations booked',
    metrics: [
      { value: '2,572', label: 'Enquiries' },
      { value: '$5.44', label: 'Lowest CPE' },
      { value: '$22,963', label: 'Ad spend' },
    ],
    problem: 'World-class surgical credentials but limited digital patient acquisition.',
    whatChanged: 'Full patient acquisition system: lead generation, qualification, follow-up, conversion tracking.',
    result: '~225 consultations from 2,572 enquiries at $5.44 lowest cost per enquiry.',
  },
  {
    name: 'Interface Specialist Clinic',
    specialty: 'Dermatology',
    location: 'London, UK',
    image: '/images/drmau.png',
    primaryResult: '$400K+',
    primaryLabel: 'Annual organic revenue',
    metrics: [
      { value: '19', label: 'Qualified in 5 weeks' },
      { value: '+133%', label: 'Session growth' },
      { value: '22.5K', label: 'Impressions' },
    ],
    problem: '2,200+ procedures annually with strong clinical credentials but no organic search presence.',
    whatChanged: 'Full SEO authority program: link building, outreach, healthcare publications.',
    result: '19 qualified enquiries in 5 weeks. Organic channel generating $400K+ annually.',
  },
]

const FAQ_ITEMS = [
  { q: 'I\'ve already tried Meta ads. They didn\'t work.', a: 'Meta ads are a channel, not a strategy. Most clinics run ads without a qualification system, follow-up sequence, or conversion tracking. We build the system behind the ads.' },
  { q: 'I need more leads, not better processes.', a: 'Most clinics already generate enquiries. The problem is leakage — 40–60% of potential patients disappear between first contact and attended consultation.' },
  { q: 'What budget do I need?', a: 'Media spend is separate from our management fee and is agreed together based on your market and goals.' },
  { q: 'How does the guarantee work?', a: 'Before starting, we agree on one measurable result and how it will be counted. If that result isn\'t achieved, the management fee is waived. Media spend is separate.' },
  { q: 'We\'re already doing well. Why change?', a: 'If your pipeline is full, no-shows are low, and conversion is strong — you may not need us. But most clinics have at least one stage that\'s leaking.' },
  { q: 'Why in-person in the UAE?', a: 'Healthcare marketing isn\'t a template business. Being here means we sit with you, understand your clinic, and build a system that fits.' },
]

const SPECIALTIES = ['Dental', 'Aesthetics', 'Dermatology', 'Orthopaedics', 'Plastic Surgery', 'Hair Transplant', 'Ophthalmology', 'Other']
const CHALLENGES = ['Not enough enquiries', 'Too many unqualified leads', 'Low booking rate', 'No-shows', 'Follow-up is inconsistent', 'Not sure']

const OLD_WAY = ['Enquiry arrives', 'Reception gets notification', 'Lead gets forgotten', 'Follow-up inconsistent', 'No booking data', 'No-shows untracked']
const NEW_WAY = ['Enquiry enters system', 'Automated conversation', 'Qualification filter', 'Seamless booking', 'Reminder sequence', 'Attendance tracked', 'Data measured']


/* ──────────────────────────────────────────────
   MAIN
   ────────────────────────────────────────────── */

export default function UAEPage() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ss-lang')
      if (saved === 'ar' || saved === 'en') return saved
    }
    return 'en'
  })
  const t = (en, ar) => lang === 'ar' ? ar : en
  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en'
    setLang(next)
    localStorage.setItem('ss-lang', next)
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = next
  }
  const [bookMeetingOpen, setBookMeetingOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    return () => { if ('scrollRestoration' in history) history.scrollRestoration = 'auto' }
  }, [])

  return (
    <main className="ur">
      <Hero t={t} lang={lang} toggleLang={toggleLang} />
      <PipelineExplorer t={t} />
      <TrustedBy t={t} />
      <VideoWalkthrough t={t} />
      <ProvenResults t={t} />
      <HowItWorks t={t} onBookMeeting={() => setBookMeetingOpen(true)} />
      <TalkToDoctors t={t} />
      <FaqSectionNew t={t} onBookMeeting={() => setBookMeetingOpen(true)} />
      <BookMeetingModal open={bookMeetingOpen} onClose={() => setBookMeetingOpen(false)} t={t} />
    </main>
  )
}


/* ═══════════════════════════════════════════
   1. HERO — PATIENT JOURNEY WHEEL
   ═══════════════════════════════════════════ */

const STAGES = [
  { id: 'enquiry', label: 'Enquiry', num: '01', color: '#3563FF',
    detail: 'New patient reaches your clinic.',
    center: { title: 'New patient reaches your clinic', subtitle: 'A potential patient contacts your clinic — website, WhatsApp, or phone.' },
    activity: { text: 'New enquiry', sub: '"Interested in dental implants"' } },
  { id: 'conversation', label: 'Conversation', num: '02', color: '#7047FF',
    detail: 'Automated follow-up via WhatsApp, SMS, or email.',
    center: { title: 'WhatsApp conversation', subtitle: '"Hi, I\'d like to know about Invisalign."', convo: [{ from: 'patient', text: 'Hi, I\'d like to know about Invisalign.' }, { from: 'clinic', text: 'We offer a free consultation. Would Thursday 4:30 PM work for you?' }] },
    activity: { text: 'Qualified reply', sub: '"Send me some times"' } },
  { id: 'qualification', label: 'Qualified', num: '03', color: '#19D3E6',
    detail: 'Treatment, timeline, and intent confirmed.',
    center: { title: 'Patient qualified', subtitle: 'Treatment: Invisalign\nTimeline: This month\nIntent: High' },
    activity: { text: 'Qualified', sub: 'Budget + timeline confirmed' } },
  { id: 'booking', label: 'Booked', num: '04', color: '#FF3B72',
    detail: 'The patient confirms an appointment.',
    center: { title: 'Consultation booked', subtitle: 'Thursday\n4:30 PM' },
    activity: { text: 'Consultation booked', sub: 'Thursday · 4:30 PM' } },
  { id: 'attendance', label: 'Attended', num: '05', color: '#0EB981',
    detail: 'The patient shows up. Revenue is generated.',
    center: { title: 'Attended', subtitle: 'New patient\nConsultation completed' },
    activity: { text: 'Attended', sub: 'New patient consultation' } },
]

function StageIcon({ stageId, color, size = 24 }) {
  const common = { color, size }
  return <StageVisual stageId={stageId} color={color} {...common} />
}

function StageVisual({ stageId, color, size = 24 }) {
  const iconStyle = { '--stage-color': color }

  if (stageId === 'enquiry') return (
    <span className="stage-visual stage-visual--enquiry" style={iconStyle} aria-hidden="true">
      <span className="stage-mail-top" />
      <span className="stage-mail-body"><i /><i /></span>
      <span className="stage-mail-badge">1</span>
    </span>
  )

  if (stageId === 'conversation') return (
    <span className="stage-visual stage-visual--conversation" style={iconStyle} aria-hidden="true">
      <span className="stage-chat chat-patient">Hi — implants?</span>
      <span className="stage-chat chat-clinic">Absolutely. Let's talk.</span>
      <span className="stage-chat-tail" />
    </span>
  )

  if (stageId === 'qualification') return (
    <span className="stage-visual stage-visual--qualification" style={iconStyle} aria-hidden="true">
      <span className="stage-check-row"><b>✓</b><i>Treatment</i></span>
      <span className="stage-check-row"><b>✓</b><i>Timeline</i></span>
      <span className="stage-check-row"><b>✓</b><i>Intent</i></span>
      <span className="stage-score">HIGH</span>
    </span>
  )

  if (stageId === 'booking') return (
    <span className="stage-visual stage-visual--booking" style={iconStyle} aria-hidden="true">
      <span className="stage-calendar-head">THU</span>
      <strong>4:30</strong>
      <small>PM</small>
      <span className="stage-calendar-check">✓</span>
    </span>
  )

  return (
    <span className="stage-visual stage-visual--attendance" style={iconStyle} aria-hidden="true">
      <span className="stage-person-head" />
      <span className="stage-person-body" />
      <span className="stage-attend-check">✓</span>
    </span>
  )
}

function Hero({ t, lang, toggleLang }) {
  const [active, setActive] = useState(0)
  const stage = STAGES[active]

  // Gentle automatic progression makes the journey feel alive without moving the cards.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % 4)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__top">
          <span className="hero__badge">{t('FOR PRIVATE CLINICS ACROSS THE UAE', 'للعيادات الخاصة في الإمارات')}</span>
          <button className="hero__lang" onClick={toggleLang}>{lang === 'en' ? 'عربي' : 'EN'}</button>
        </div>

        <div className="hero__grid">
          <div className="hero__left">
            <h1 className="hero__h1">
              <span className="hero__line hero__line--strong">{t('MORE ENQUIRIES.', 'أكثر من الاستفسارات.')}</span>
              <span className="hero__line hero__line--strong">{t('NOT MORE PATIENTS.', 'ليس المزيد من المرضى.')}</span>
              <span className="hero__line hero__line--accent">{t("LET'S FIX THAT.", 'خلّنا نصلح هذا.')}</span>
            </h1>
            <p className="hero__sub">
              {t('Socialsect builds the system that turns patient demand into booked consultations.', 'Socialsect تبني النظام الذي يحوّل الطلب إلى استشارات محجوزة.')}
            </p>
            <div className="hero__actions">
              <button className="hero__cta" onClick={(e) => { e.preventDefault(); scrollTo('diagnostic') }}>
                {t('Get Your Clinic Review', 'احصل على مراجعة عيادتك')} <span className="hero__cta-arrow">→</span>
              </button>
              <button className="hero__cta hero__cta--ghost" onClick={(e) => { e.preventDefault(); scrollTo('pipeline') }}>
                {t('Explore the System', 'استكشف النظام')}
              </button>
            </div>
          </div>

          <div className="hero__right">
            <div className="hero__wheel" aria-label={t('Patient journey: enquiry, conversation, qualification, booking', 'رحلة المريض: استفسار، محادثة، تأهيل، حجز')}>
              <span className="hero__wheel-ring hero__wheel-ring--outer" />
              <span className="hero__wheel-ring hero__wheel-ring--inner" />
              <span className="hero__wheel-track" />
              <span className="hero__wheel-progress" style={{ '--progress-angle': `${active * 90 + 8}deg`, '--progress-color': stage.color }} />
              <span className="hero__wheel-core" />

              {STAGES.slice(0, 4).map((s, i) => {
                const angle = (i * 90) - 90
                const rad = (angle * Math.PI) / 180
                const r = 180
                const x = Math.cos(rad) * r
                const y = Math.sin(rad) * r

                return (
                  <button
                    key={s.id}
                    className={`hero__stage ${i === active ? 'hero__stage--active' : ''}`}
                    style={{
                      '--tx': `${x}px`,
                      '--ty': `${y}px`,
                      '--stage-color': s.color
                    }}
                    onClick={() => setActive(i)}
                    aria-label={`${s.num} — ${s.label}`}
                    title={s.label}
                  >
                    <span className="hero__stage-card">
                      <span className="hero__stage-visual">
                        <StageVisual stageId={s.id} color={s.color} size={34} />
                      </span>
                      <span className="hero__stage-num">{s.num}</span>
                    </span>
                    <span className="hero__stage-label">{s.label}</span>
                  </button>
                )
              })}

              <div className="hero__wheel-caption" aria-live="polite">
                <span className="hero__wheel-caption-num">{stage.num}</span>
                <span className="hero__wheel-caption-label">{stage.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   ICON RENDERERS
   ────────────────────────────────────────────── */

function StepIcon({ type }) {
  const c = { width: 30, height: 30, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (type) {
    case 'magnet': return <img src="/icons/magnet.png" alt="" width={30} height={30} style={{ objectFit: 'contain' }} />
    case 'whatsapp': return <svg {...c} fill="currentColor" stroke="none"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm5.6 14.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.8-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.2.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.4-.4.5-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.5 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.4.3.1.2.1.7-.1 1.2z" /></svg>
    case 'personCheck': return <svg {...c}><circle cx="9" cy="7" r="4" /><path d="M2 21v-2a5 5 0 015-5h4a5 5 0 015 5v2" /><path d="M17 10l2 2 4-4" /></svg>
    case 'calendar': return <svg {...c}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
    case 'bell': return <svg {...c}><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></svg>
    case 'check': return <svg {...c}><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-6" /></svg>
    case 'heart': return <svg {...c} fill="currentColor" stroke="none"><path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3C21 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21z" /></svg>
    case 'bars': return <svg {...c}><path d="M4 20V10M12 20V4M20 20v-7" /></svg>
    default: return null
  }
}

function ActivityIcon({ type }) {
  const c = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (type) {
    case 'whatsapp': return <svg {...c} fill="currentColor" stroke="none"><path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2zm5.6 14.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.8-2.1.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.2.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.4-.4.5-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.5 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.4.3.1.2.1.7-.1 1.2z" /></svg>
    case 'filter': return <svg {...c}><path d="M4 4h16l-6 8v6l-4 2v-8L4 4z" /></svg>
    case 'calendar': return <svg {...c}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
    case 'bell': return <svg {...c}><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></svg>
    case 'check': return <svg {...c}><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-6" /></svg>
    default: return null
  }
}

function TrustIcon({ type }) {
  const c = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (type) {
    case 'shield': return <svg {...c}><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>
    case 'lock': return <svg {...c}><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>
    case 'people': return <svg {...c}><circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" /><path d="M2 20a6 6 0 0112 0M10 20a6 6 0 0112 0" /></svg>
    case 'target': return <svg {...c}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
    default: return null
  }
}

function FlowArrow({ direction }) {
  return (
    <span className={`pe__arrow pe__arrow--${direction}`} aria-hidden="true">
      <svg width="80" height="12" viewBox="0 0 80 12" fill="none">
        <line x1="0" y1="6" x2="70" y2="6" stroke="currentColor" strokeWidth="1.5" />
        <path
          d={direction === 'right' ? 'M66 1.5 L76 6 L66 10.5' : 'M14 1.5 L4 6 L14 10.5'}
          stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function PipelineStep({ step }) {
  return (
    <div className="pe__step">
      <div className="pe__step-icon" style={{ '--step-color': step.color }}>
        <StepIcon type={step.icon} />
      </div>
      <span className="pe__step-num">{step.num}</span>
      <h3 className="pe__step-title">{step.title}</h3>
      <p className="pe__step-desc">{step.desc}</p>
    </div>
  )
}

/* ──────────────────────────────────────────────
   PIPELINE EXPLORER — full section
   ────────────────────────────────────────────── */

function PipelineExplorer({ t }) {
  const row1 = PIPELINE_STEPS.slice(0, 4)
  const row2 = PIPELINE_STEPS.slice(4, 8)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let obs
    const timer = setTimeout(() => {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('pe--visible')
          } else {
            el.classList.remove('pe--visible')
          }
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
    }, 300)
    return () => { clearTimeout(timer); obs?.disconnect() }
  }, [])

  return (
    <section className="pe" id="pipeline" ref={ref}>
      <div className="pe__inner">
        <div className="pe__head" data-anim="fade-up">
          <span className="pe__eyebrow">{t('HOW WE WORK WITH YOUR CLINIC', 'كيف نعمل مع عيادتك')}</span>
          <h2 className="pe__h2">{t('We turn enquiries into\nbooked consultations.', 'نحوّل الاستفسارات إلى\nاستشارات محجوزة.')}</h2>
          <p className="pe__sub">{t('A simple system. Human follow-up. Measurable results.', 'نظام بسيط. متابعة بشرية. نتائج قابلة للقياس.')}</p>
        </div>

        <div className="pe__layout">
          <div className="pe__flow">
            <div className="pe__row" data-anim="fade-up" data-delay="0.1">
              {row1.map((s, i) => (
                <Fragment key={s.num}>
                  <PipelineStep step={s} />
                  {i < row1.length - 1 && <FlowArrow direction="right" />}
                </Fragment>
              ))}
            </div>

            <div className="pe__connector" aria-hidden="true" data-anim="fade-up" data-delay="0.2">
              <svg viewBox="0 0 60 90" width="60" height="90">
                <path d="M30 0 V60 Q30 78 12 82" fill="none" stroke="#C7D2FE" strokeWidth="2" strokeDasharray="4 5" />
                <path d="M12 82 l-7 -4 M12 82 l3 -8" fill="none" stroke="#C7D2FE" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div className="pe__row pe__row--reverse" data-anim="fade-up" data-delay="0.3">
              {row2.map((s, i) => (
                <Fragment key={s.num}>
                  <PipelineStep step={s} />
                  {i < row2.length - 1 && <FlowArrow direction="left" />}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="pe__activity" data-anim="fade-left" data-delay="0.2">
            <div className="pe__activity-head">
              <span className="pe__activity-dot" />
              <div>
                <span className="pe__activity-eyebrow">{t('LIVE ACTIVITY', 'نشاط مباشر')}</span>
                <h4>{t("What's happening right now", 'وش يصير الآن')}</h4>
              </div>
            </div>
            <div className="pe__activity-list">
              {ACTIVITY_ENTRIES.map((e, i) => (
                <div key={i} className="pe__activity-item">
                  <span className="pe__activity-icon" style={{ background: e.bg, color: e.color }}>
                    <ActivityIcon type={e.icon} />
                  </span>
                  <div className="pe__activity-body">
                    <span className="pe__activity-title">{e.title}</span>
                    <span className="pe__activity-sub">{e.sub}</span>
                  </div>
                  <span className="pe__activity-time">{e.time}</span>
                </div>
              ))}
            </div>
            <span className="pe__activity-footer">
              {t('This is what our system does, every day.', 'هذا ما يفعله نظامنا كل يوم.')}
            </span>
          </div>
        </div>

        <div className="pe__trust" data-anim="fade-up" data-delay="0.4">
          {TRUST_ITEMS.map((it, i) => (
            <div key={i} className="pe__trust-item">
              <span className="pe__trust-icon"><TrustIcon type={it.icon} /></span>
              <span className="pe__trust-text">{it.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CLINICS = [
  { name: 'Enliven Counselling Center', location: 'Dubai, UAE', speciality: 'Counselling & Mental Health', logo: '/images/clinics/enliven.webp', color: '#7C3AED' },
  { name: 'Visage Polyclinic', location: 'Dubai, UAE', speciality: 'Multi-speciality Polyclinic', logo: '/images/clinics/visage.webp', color: '#B8860B' },
  { name: 'Smile Signature Dental Clinic', location: 'Abu Dhabi, UAE', speciality: 'Dental', logo: '/images/clinics/smile-signature.png', color: '#B8860B' },
  { name: 'Lumière Aesthetics Clinic', location: 'Dubai, UAE', speciality: 'Aesthetic Medicine', logo: '/images/clinics/lumiere.png', color: '#EC4899' },
  { name: 'Orthocare Clinic', location: 'Sharjah, UAE', speciality: 'Orthopaedics & Sports Medicine', logo: '/images/clinics/orthocare.png', color: '#0891B2' },
  { name: 'Derma Advanced Skin Clinic', location: 'Dubai, UAE', speciality: 'Dermatology', logo: '/images/clinics/derma.png', color: '#EC4899' },
]

const STATS = [
  { val: '30+', label: 'Clinics Onboarded', icon: 'stats-clinics', color: '#7C3AED' },
  { val: '1,000+', label: 'Consultations Booked', icon: 'stats-booked', color: '#7C3AED' },
  { val: '85%+', label: 'Show Up Rate', icon: 'stats-showup', color: '#7C3AED' },
  { val: '40%+', label: 'Average Enquiry Increase', icon: 'stats-growth', color: '#7C3AED' },
]

function ClinicCardIcon({ type, color }) {
  const s = { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' }
  switch (type) {
    case 'counselling': return <svg {...s}><circle cx="20" cy="14" r="7" stroke={color} strokeWidth="1.5"/><path d="M8 34c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M26 10c2-3 5-4 7-3s3 4 1 7" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>
    case 'polyclinic': return <svg {...s}><rect x="6" y="10" width="28" height="22" rx="3" stroke={color} strokeWidth="1.5"/><path d="M6 18h28M16 10V6M24 10V6M14 24h4M22 24h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>
    case 'dental': return <svg {...s}><path d="M20 6c-4 0-7 2-8 5-1 4 1 8 2 12 1 3 1 6 1 9h10c0-3 0-6 1-9 1-4 3-8 2-12-1-3-4-5-8-5z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><path d="M16 24h8" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>
    case 'aesthetic': return <svg {...s}><circle cx="20" cy="16" r="8" stroke={color} strokeWidth="1.5"/><path d="M14 30c0 0 2-4 6-4s6 4 6 4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/><circle cx="20" cy="16" r="3" stroke={color} strokeWidth="1"/></svg>
    case 'ortho': return <svg {...s}><circle cx="20" cy="12" r="6" stroke={color} strokeWidth="1.5"/><path d="M10 34l4-12 6 6 6-6 4 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    case 'derma': return <svg {...s}><path d="M20 6c0 0-8 6-8 14a8 8 0 0016 0c0-8-8-14-8-14z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 16v8M17 20h6" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>
    default: return null
  }
}

function StatIcon({ type, color }) {
  const s = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (type) {
    case 'stats-clinics': return <svg {...s}><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a5 5 0 015-5h4a5 5 0 015 5v2"/><circle cx="17" cy="7" r="3"/><path d="M21 21v-1.5a3 3 0 00-2-2.8"/></svg>
    case 'stats-booked': return <svg {...s}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>
    case 'stats-showup': return <svg {...s}><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
    case 'stats-growth': return <svg {...s}><path d="M3 20l5-5 4 4 9-11"/><path d="M17 8h4v4"/></svg>
    default: return null
  }
}

function TrustedBy({ t }) {
  const scrollRef = useRef(null)
  const [active, setActive] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)

  useEffect(() => {
    const updateVisible = () => {
      setVisibleCards(window.innerWidth <= 700 ? 1 : 3)
    }
    updateVisible()
    window.addEventListener('resize', updateVisible)
    return () => window.removeEventListener('resize', updateVisible)
  }, [])

  const totalPages = Math.ceil(CLINICS.length / visibleCards)

  const scrollToIndex = (idx) => {
    if (!scrollRef.current) return
    const card = scrollRef.current.children[idx * visibleCards]
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

  const scroll = (dir) => {
    if (!scrollRef.current) return
    const next = dir === 'left' ? Math.max(0, active - 1) : Math.min(totalPages - 1, active + 1)
    setActive(next)
    scrollToIndex(next)
  }

  const onScroll = () => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const scrollLeft = el.scrollLeft
    const cardWidth = el.children[0]?.offsetWidth || 220
    const gap = 16
    const idx = Math.round(scrollLeft / ((cardWidth + gap) * visibleCards))
    setActive(Math.min(totalPages - 1, Math.max(0, idx)))
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="tb">
      <div className="tb__inner">
        <div className="tb__head">
          <span className="tb__eyebrow">{t('TRUSTED BY CLINIC OWNERS ACROSS UAE', 'موثوق من أصحاب العيادات في الإمارات')}</span>
          <h2 className="tb__h2">{t('Real clinics. Real conversations. ', 'عيادات حقيقية. محادثات حقيقية. ')}<span className="tb__h2--accent">{t('Real results.', 'نتائج حقيقية.')}</span></h2>
          <p className="tb__sub">{t('We work with private clinics in Dubai, Abu Dhabi & across the UAE.\nDifferent specialities. Same goal – more booked consultations.', 'نعمل مع عيادات خاصة في دبي وأبوظبي والإمارات.\nتخصصات مختلفة. هدف واحد – مزيد من الاستشارات المحجوزة.')}</p>
        </div>

        <div className="tb__carousel-wrap">
          <button className="tb__arrow tb__arrow--left" onClick={() => scroll('left')} aria-label="Previous" disabled={active === 0}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="tb__carousel" ref={scrollRef}>
            {CLINICS.map((c, i) => (
              <div key={i} className="tb__card">
                <div className="tb__card-logo">
                  <img src={c.logo} alt={c.name + ' logo'} width={160} height={72} loading="lazy" />
                </div>
                <h4 className="tb__card-name">{c.name}</h4>
                <span className="tb__card-loc">{c.location}</span>
                <div className="tb__card-spec">
                  <span className="tb__card-spec-dot" style={{ background: c.color }} />
                  <span>{c.speciality}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="tb__arrow tb__arrow--right" onClick={() => scroll('right')} aria-label="Next" disabled={active === totalPages - 1}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div className="tb__dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} className={`tb__dot ${i === active ? 'tb__dot--active' : ''}`} onClick={() => { setActive(i); scrollToIndex(i) }} aria-label={`Page ${i + 1}`} />
          ))}
        </div>

        <div className="tb__stats">
          {STATS.map((s, i) => (
            <div key={i} className="tb__stat">
              <span className="tb__stat-icon" style={{ background: `${s.color}12` }}>
                <StatIcon type={s.icon} color={s.color} />
              </span>
              <div>
                <span className="tb__stat-val">{s.val}</span>
                <span className="tb__stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="tb__disclaimer">{t('Results vary by clinic. We share honest conversations, not inflated promises.', 'النتائج تختلف من عيادة لأخرى. نشارك محادثات صادقة وבטوعات مبالغ فيها.')}</p>
      </div>
    </section>
  )
}

const WALKTHROUGH_FEATURES = [
  { icon: 'target', text: 'See our exact\nprocess in action.', color: '#FF3B72' },
  { icon: 'people', text: 'How we turn enquiries\ninto appointments.', color: '#7C3AED' },
  { icon: 'check', text: 'Real results from\nreal clinics.', color: '#0EB981' },
]

function VideoWalkthrough({ t }) {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="vw">
      <div className="vw__inner">
        <div className="vw__head">
          <span className="vw__eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            {t('2-MIN WALKTHROUGH', 'جولة دقيقتين')}
          </span>
          <h2 className="vw__h2">{t('SEE HOW WE FILL\n', 'شاهد كيف نملأ\n')}<span className="vw__h2--accent">{t('YOUR CLINIC.', 'عيادتك.')}</span></h2>
          <p className="vw__sub">{t('Real system. Real conversations. Real patients', 'نظام حقيقي. محادثات حقيقية. مرضى حقيقيون.')}</p>
        </div>

        <div className="vw__video-wrap">
          {playing ? (
            <div className="vw__video-embed">
              <VideoPlayer src="/videos/1.3F.mp4" poster="/videos/1.3F-poster.jpg" className="vw__video-player" />
            </div>
          ) : (
            <button className="vw__thumbnail" onClick={() => setPlaying(true)} aria-label="Play video">
              <img src="/videos/1.3F-poster.jpg" alt="" className="vw__thumb-img" />
              <div className="vw__thumb-overlay" />
              <span className="vw__play-btn">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </span>
            </button>
          )}
        </div>

        <div className="vw__features">
          {WALKTHROUGH_FEATURES.map((f, i) => (
            <div key={i} className="vw__feature">
              <span className="vw__feature-icon" style={{ color: f.color }}>
                {f.icon === 'target' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>}
                {f.icon === 'people' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a5 5 0 015-5h4a5 5 0 015 5v2"/><circle cx="17" cy="7" r="3"/><path d="M21 21v-1.5a3 3 0 00-2-2.8"/></svg>}
                {f.icon === 'check' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>}
              </span>
              <span className="vw__feature-text">{f.text}</span>
            </div>
          ))}
        </div>

        <div className="vw__logos-bar">
          <span className="vw__logos-label">{t('TRUSTED BY CLINIC\nOWNERS ACROSS UAE', 'موثوق من أصحاب\nالعيادات في الإمارات')}</span>
          <div className="vw__logos-row">
            {CLINICS.map((c, i) => (
              <img key={i} src={c.logo} alt={c.name} className="vw__logos-img" />
            ))}
          </div>
        </div>

        <div className="vw__stats">
          <div className="vw__stat">
            <span className="vw__stat-icon vw__stat-icon--pink"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a5 5 0 015-5h4a5 5 0 015 5v2"/><circle cx="17" cy="7" r="3"/><path d="M21 21v-1.5a3 3 0 00-2-2.8"/></svg></span>
            <div><span className="vw__stat-val">30+</span><span className="vw__stat-label">{t('Clinics Onboarded', 'عيادات مسجلة')}</span></div>
          </div>
          <div className="vw__stat">
            <span className="vw__stat-icon vw__stat-icon--purple"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01"/></svg></span>
            <div><span className="vw__stat-val">1,000+</span><span className="vw__stat-label">{t('Consultations Booked', 'استشارات محجوزة')}</span></div>
          </div>
          <div className="vw__stat">
            <span className="vw__stat-icon vw__stat-icon--green"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg></span>
            <div><span className="vw__stat-val">85%+</span><span className="vw__stat-label">{t('Show Up Rate', 'نسبة الحضور')}</span></div>
          </div>
          <div className="vw__stat">
            <span className="vw__stat-icon vw__stat-icon--amber"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>
            <div><span className="vw__stat-val">4.8/5</span><span className="vw__stat-label">{t('Average Clinic Rating', 'متوسط تقييم العيادة')}</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CASE_STUDIES_DATA = [
  {
    category: 'VEIN CARE', categoryColor: '#7C3AED', chartType: 'bar',
    stats: [
      { label: 'Consultations Booked', value: '700+', badge: 'Booked' },
      { label: 'Cost per Booking', value: '$5.27', badge: 'Avg' },
    ],
    chartLabel: 'Booked Consultations (Monthly)',
    chartMonths: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    chartValues: [40, 55, 65, 50, 70, 85, 95, 110],
    bigNum: '700+', bigLabel: 'CONSULTATIONS BOOKED',
    clinic: 'NY Metro Vein', location: 'New York, USA',
    pills: [
      { val: '2,971', label: 'ENQUIRIES', dot: '#7C3AED' },
      { val: '$100K+', label: 'REVENUE', dot: '#7C3AED' },
      { val: '15+', label: 'MONTHS', dot: '#7C3AED' },
    ],
  },
  {
    category: 'ORTHOPAEDICS', categoryColor: '#0891B2', chartType: 'line',
    stats: [
      { label: 'Patient Enquiries', value: '2,572' },
      { label: 'Consultations Booked', value: '~225' },
    ],
    chartLabel: 'Enquiries Over Time',
    chartMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    chartValues: [180, 220, 190, 260, 310, 280, 350, 420, 390, 500, 580, 620],
    bigNum: '~225', bigLabel: 'CONSULTATIONS BOOKED',
    clinic: 'Miami Shoulder Institute', location: 'Miami, Florida, USA',
    pills: [
      { val: '$5.44', label: 'LOWEST CPE', dot: '#0891B2' },
      { val: '$22,963', label: 'AD SPEND', dot: '#0891B2' },
      { val: '8.4%', label: 'BOOKING RATE', dot: '#0891B2' },
    ],
  },
  {
    category: 'DERMATOLOGY', categoryColor: '#EC4899', chartType: 'line',
    stats: [
      { label: 'Qualified Enquiries', value: '19', badge: 'In 5 Weeks' },
      { label: 'Session Growth', value: '+133%', badge: 'vs Prior 3 Months' },
    ],
    chartLabel: 'Organic Sessions',
    chartMonths: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    chartValues: [180, 220, 195, 310, 450, 520],
    bigNum: '19', bigLabel: 'QUALIFIED ENQUIRIES',
    clinic: 'Interface Specialist Clinic', location: 'Sutton, UK',
    pills: [
      { val: '22.5K', label: 'IMPRESSIONS', dot: '#EC4899' },
      { val: '4.6%', label: 'CTR', dot: '#EC4899' },
      { val: '+133%', label: 'SESSION GROWTH', dot: '#EC4899' },
    ],
  },
  {
    category: 'DENTAL EDUCATION', categoryColor: '#3563FF', dark: true,
    dualStream: {
      title: 'Two Revenue Streams. One System.',
      left: { label: 'Patient Acquisition', icon: 'patients', val: '150+', sub: 'Patients Acquired', val2: '$35,600+', sub2: 'Revenue Generated' },
      right: { label: 'Dental Education', icon: 'education', val: '$425 – $20K', sub: 'Course Range', val2: '15+', sub2: 'Countries Reached' },
    },
    bigNum: 'ONE SYSTEM.', bigLabel: 'TWO REVENUE STREAMS.',
    clinic: 'International Implant Institute', location: 'Global',
    pills: [
      { val: '150+', label: 'PATIENTS', dot: '#3563FF' },
      { val: '$35,600+', label: 'REVENUE', dot: '#3563FF' },
      { val: '15+', label: 'COUNTRIES', dot: '#3563FF' },
    ],
  },
]

function CaseStudyChart({ months, values, color, type = 'bar' }) {
  if (type === 'line') {
    const max = Math.max(...values)
    const min = Math.min(...values) * 0.8
    const range = max - min || 1
    const w = 100
    const h = 80
    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * w
      const y = h - ((v - min) / range) * h
      return `${x},${y}`
    }).join(' ')
    const areaPoints = `0,${h} ${points} ${w},${h}`
    const formatVal = (v) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v)
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map(p => Math.round(min + range * p))
    return (
      <div className="pr__chart pr__chart--line">
        <div className="pr__line-wrap">
          <div className="pr__y-axis">
            {yTicks.reverse().map((v, i) => <span key={i}>{formatVal(v)}</span>)}
          </div>
          <div className="pr__line-area">
            <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="pr__line-svg">
              <defs>
                <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                <line key={i} x1="0" y1={h * (1 - p)} x2={w} y2={h * (1 - p)} stroke="#E5E7EB" strokeWidth="0.3" />
              ))}
              <polygon points={areaPoints} fill={`url(#grad-${color.replace('#', '')})`} />
              <polyline points={points} fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="pr__chart-labels">
          {months.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>
    )
  }

  const max = Math.max(...values)
  const yTicks = [0, Math.round(max * 0.5), max]
  return (
    <div className="pr__chart">
      <div className="pr__bar-wrap">
        <div className="pr__y-axis">
          {yTicks.reverse().map((v, i) => <span key={i}>{v}</span>)}
        </div>
        <div className="pr__bar-area">
          {[0, 0.5, 1].map((p, i) => (
            <div key={i} className="pr__grid-line" style={{ bottom: `${p * 100}%` }} />
          ))}
          <div className="pr__chart-bars">
            {values.map((v, i) => (
              <div key={i} className="pr__chart-col">
                <div className="pr__chart-bar" style={{ height: `${(v / max) * 100}%`, background: color }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pr__chart-labels">
        {months.map((m, i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   FAQ SECTION — DETAILED
   ═══════════════════════════════════════════ */

const FAQ_DETAILED = [
  { q: "We've already tried Meta ads. Why would this be any different?", a: "That's exactly what I want to understand when we meet. Sometimes the ads are the problem. Sometimes they aren't. I'm not going to ask you to spend more until we know where patients are actually being lost." },
  { q: "Are you just going to send my reception another 100 leads to chase?", a: "No. More leads are useless if they're wrong, unreachable, price-shopping, or never booking. We care about what reaches the appointment book." },
  { q: "How much do I need to spend before we know if this works?", a: "We decide that from your treatment economics, current numbers and the service you want to grow. I'm not giving every clinic the same budget because every clinic isn't the same." },
  { q: "What exactly are you going to guarantee?", a: "Nothing vague. Before we start, we agree on one measurable result and exactly how it will be counted. If we miss that agreed result under the conditions we set together, you don't pay our management fee for that period." },
  { q: "My clinic is already doing well. Why would I need you?", a: "Maybe you don't. The meeting is partly to find that out. If there isn't a meaningful opportunity I believe we can improve, I'd rather tell you that." },
  { q: "Why are you willing to come to my clinic instead of just doing a sales call?", a: "Because I want to see the business I'm being asked to grow. And if we're potentially going to work together, I'd rather meet you properly than sell you through a screen." },
]

function FaqSectionNew({ t, onBookMeeting }) {
  const [open, setOpen] = useState(null)
  return (
    <section className="fqn">
      <div className="fqn__inner">
        <div className="fqn__top">
          <div className="fqn__left">
            <span className="fqn__eyebrow">{t('FAQ', 'الأسئلة الشائعة')}</span>
            <h2 className="fqn__h2">
              {t('QUESTIONS', 'أسئلة')}
              <br />
              <span className="fqn__h2--red">{t('WE GET A LOT.', 'بنسمعها كثير.')}</span>
            </h2>
            <p className="fqn__sub">{t('Straight answers to the real questions clinic owners ask before working with us.', 'إجابات مباشرة للأسئلة الحقيقية التي يطرحها أصحاب العيادات قبل العمل معنا.')}</p>
            <div className="fqn__card">
              <div className="fqn__card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8194C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              </div>
              <div className="fqn__card-text">
                <span className="fqn__card-title">{t('Still have questions?', 'عندك أسئلة؟')}</span>
                <a href="#clinic-review" className="fqn__card-link" onClick={(e) => { e.preventDefault(); onBookMeeting(); }}>
                  {t("Let's talk it through", 'خلنا نتكلم')} <span>→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="fqn__right">
            {FAQ_DETAILED.map((item, i) => (
              <div key={i} className={`fqn__item ${open === i ? 'fqn__item--open' : ''}`}>
                <button className="fqn__q" onClick={() => setOpen(open === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="fqn__plus">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && (
                  <div className="fqn__a">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="fqn__bottom">
          <h2 className="fqn__bottom-h2">
            {t('STILL HAVE ', 'لسه عندك ')}
            <span className="fqn__bottom-h2--red">{t('A QUESTION?', 'سؤال؟')}</span>
          </h2>
          <p className="fqn__bottom-sub">{t("Don't fill another form. Ask me in person.", 'لا تملأ نموذج ثاني. اسألني شخصيًا.')}</p>
          <button className="fqn__bottom-cta" onClick={onBookMeeting}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            {t('BOOK A MEETING WITH RAY', 'احجز اجتماع مع راي')} <span>→</span>
          </button>
          <div className="fqn__bottom-meta">
            <span className="fqn__meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8194C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {t('Dubai & UAE Clinics', 'عيادات دبي والإمارات')}
            </span>
            <span className="fqn__meta-divider" />
            <span className="fqn__meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#07152F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {t('In-person meeting', 'لقاء شخصي')}
            </span>
            <span className="fqn__meta-divider" />
            <span className="fqn__meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#07152F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {t("I'll come to your clinic.", 'بجي لعيادتك.')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProvenResults({ t }) {
  return (
    <section className="pr">
      <div className="pr__inner">
        <div className="pr__head">
          <span className="pr__eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            {t('PROVEN RESULTS', 'نتائج مثبتة')}
          </span>
          <h2 className="pr__h2">{t('NOT OUR PROMISES.\n', 'ليس وعودنا.\n')}<span className="pr__h2--accent">{t('THEIR NUMBERS.', 'أرقامهم.')}</span></h2>
          <p className="pr__sub">{t('Different clinics. Different problems. One thing in common: measurable growth.', 'عيادات مختلفة. مشاكل مختلفة. شيء واحد مشترك: نمو قابل للقياس.')}</p>
        </div>

        <div className="pr__grid">
          {CASE_STUDIES_DATA.map((cs, i) => (
            <div key={i} className={`pr__card ${cs.dark ? 'pr__card--dark' : ''}`}>
              <span className="pr__badge" style={{ color: cs.categoryColor, background: `${cs.categoryColor}10` }}>
                {cs.category === 'VEIN CARE' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-4-3-8-7-8-12a8 8 0 0116 0c0 5-4 9-8 12z"/></svg>}
                {cs.category === 'ORTHOPAEDICS' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><path d="M12 8v4M8 16l4-4 4 4M6 20h12"/></svg>}
                {cs.category === 'DERMATOLOGY' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>}
                {cs.category === 'DENTAL EDUCATION' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>}
                {cs.category}
              </span>

              {cs.stats && (
              <div className="pr__stats-row">
                {cs.stats.map((s, j) => (
                  <div key={j} className="pr__stat-box">
                    <span className="pr__stat-label">{s.label}</span>
                    <div className="pr__stat-val-row">
                      <span className="pr__stat-value">{s.value}</span>
                      {s.badge && <span className="pr__stat-badge" style={{ color: cs.categoryColor, background: `${cs.categoryColor}12` }}>{s.badge}</span>}
                    </div>
                  </div>
                ))}
              </div>
              )}

              {cs.dualStream ? (
                <div className="pr__dual">
                  <span className="pr__dual-title">{cs.dualStream.title}</span>
                  <div className="pr__dual-cols">
                    <div className="pr__dual-col">
                      <span className="pr__dual-col-label">{cs.dualStream.left.label}</span>
                      <span className="pr__dual-val">{cs.dualStream.left.val}</span>
                      <span className="pr__dual-sub">{cs.dualStream.left.sub}</span>
                      <span className="pr__dual-val">{cs.dualStream.left.val2}</span>
                      <span className="pr__dual-sub">{cs.dualStream.left.sub2}</span>
                    </div>
                    <div className="pr__dual-col">
                      <span className="pr__dual-col-label">{cs.dualStream.right.label}</span>
                      <span className="pr__dual-val">{cs.dualStream.right.val}</span>
                      <span className="pr__dual-sub">{cs.dualStream.right.sub}</span>
                      <span className="pr__dual-val">{cs.dualStream.right.val2}</span>
                      <span className="pr__dual-sub">{cs.dualStream.right.sub2}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <span className="pr__chart-title">{cs.chartLabel}</span>
                  <CaseStudyChart months={cs.chartMonths} values={cs.chartValues} color={cs.categoryColor} type={cs.chartType} />
                </>
              )}

              <div className="pr__bottom">
                <span className="pr__big-num" style={{ color: cs.categoryColor }}>{cs.bigNum}</span>
                <span className="pr__big-label">{cs.bigLabel}</span>
                <div className="pr__clinic">
                  <span className="pr__clinic-name">{cs.clinic}</span>
                  <span className="pr__clinic-loc">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {cs.location}
                  </span>
                </div>
                <div className="pr__pills">
                  {cs.pills.map((p, j) => (
                    <span key={j} className="pr__pill">
                      <span className="pr__pill-dot" style={{ background: p.dot }} />
                      <span className="pr__pill-val">{p.val}</span>
                      <span className="pr__pill-label">{p.label}</span>
                    </span>
                  ))}
                </div>
                <a href="/results" className="pr__link" style={{ color: cs.categoryColor }}>{t('View case study', 'عرض دراسة الحالة')} <span>→</span></a>
              </div>
            </div>
          ))}
        </div>

        <p className="pr__disclaimer">{t('Data verified from actual client dashboards and analytics.', 'البيانات موثقة من لوحات التحكم والتحليلات الفعلية للعملاء.')}</p>
        <a href="/results" className="pr__more">{t('More case studies', ' المزيد من دراسات الحالة')} <span>→</span></a>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════
   3. OLD WAY vs SYSTEM
   ═══════════════════════════════════════════ */

function OldWayToggle({ t }) {
  const [view, setView] = useState('system')
  const [animKey, setAnimKey] = useState(0)

  const toggle = (v) => {
    setView(v)
    setAnimKey((k) => k + 1)
  }

  return (
    <section className="ow">
      <div className="ow__inner">
        <div className="ow__head">
          <span className="ow__eyebrow">{t('The Difference', 'الفرق')}</span>
          <h2 className="ow__h2">{t('Most clinics do this\nthe hard way.', 'معظم العيادات تسوّي\nهذا بالطريقة الصعبة.')}</h2>
        </div>

        <div className="ow__toggle">
          <button className={`ow__btn ${view === 'old' ? 'ow__btn--active ow__btn--old' : ''}`} onClick={() => toggle('old')}>
            {t('The Old Way', 'الطريقة القديمة')}
          </button>
          <button className={`ow__btn ${view === 'system' ? 'ow__btn--active ow__btn--sys' : ''}`} onClick={() => toggle('system')}>
            {t('The System', 'النظام')}
          </button>
        </div>

        <div className="ow__visual" key={animKey}>
          {(view === 'old' ? OLD_WAY : NEW_WAY).map((step, i) => (
            <div key={`${view}-${i}`} className="ow__step" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className={`ow__step-dot ${view === 'old' ? 'ow__step-dot--old' : 'ow__step-dot--sys'}`} />
              <span className="ow__step-text">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════
   4. DIAGNOSTIC
   ═══════════════════════════════════════════ */

function Diagnostic({ t }) {
  const QUESTIONS = [
    { q: 'How quickly does your clinic respond to a new enquiry?', options: ['Under 5 minutes', '5–30 minutes', 'More than 30 minutes', "We don't know"] },
    { q: 'Do you follow up when a patient doesn\'t book immediately?', options: ['Yes, systematically', 'We try', 'No', "We don't have a system"] },
    { q: 'Do you know your enquiry-to-booking rate?', options: ['Yes, we track it', 'Approximately', 'No', 'What is that?'] },
    { q: 'Do you have a process for reducing no-shows?', options: ['Yes, automated reminders', 'We call manually', 'No system', "No-shows aren't a problem"] },
    { q: 'Do you actively re-engage past patients?', options: ['Yes, regularly', 'Sometimes', 'No', "We don't have the data"] },
  ]

  const [step, setStep] = useState(-1)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(null)
  const [animating, setAnimating] = useState(false)

  const maxScore = QUESTIONS.length * 2
  const healthPct = score !== null ? Math.round(((maxScore - score) / maxScore) * 100) : 0

  const selectAnswer = (idx) => {
    if (animating) return
    setAnimating(true)
    const next = [...answers, idx]
    setAnswers(next)
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) setStep(step + 1)
      else setScore(next.reduce((s, a) => s + a, 0))
      setAnimating(false)
    }, 350)
  }

  const getGaps = () => {
    const gaps = []
    if (answers[0] >= 1) gaps.push('ENQUIRY → CONVERSATION')
    if (answers[1] >= 1) gaps.push('CONVERSATION → QUALIFICATION')
    if (answers[2] >= 1) gaps.push('QUALIFICATION → BOOKING')
    if (answers[3] >= 1) gaps.push('BOOKING → ATTENDANCE')
    return gaps
  }

  const reset = () => { setStep(-1); setAnswers([]); setScore(null) }

  return (
    <section className="dg" id="diagnostic">
      <div className="dg__inner">
        <div className="dg__head">
          <span className="dg__eyebrow">{t('Pipeline Snapshot', 'نظرة على المسار')}</span>
          <h2 className="dg__h2">{t('Where Are You\nLosing Patients?', 'وين تخسر\nالمرضى؟')}</h2>
        </div>

        {step === -1 && score === null && (
          <div className="dg__start">
            <p className="dg__start-sub">{t('Five questions. One snapshot.', 'خمس أسئلة. نظرة واحدة.')}</p>
            <button className="dg__start-btn" onClick={() => setStep(0)}>
              {t('Start', 'ابدأ')}
            </button>
          </div>
        )}

        {step >= 0 && score === null && (
          <div className="dg__question" key={step}>
            <div className="dg__progress">
              <div className="dg__progress-fill" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
            </div>
            <div className="dg__step-num">{step + 1} / {QUESTIONS.length}</div>
            <h3 className="dg__q">{QUESTIONS[step].q}</h3>
            <div className="dg__options">
              {QUESTIONS[step].options.map((opt, i) => (
                <button key={i} className="dg__option" onClick={() => selectAnswer(i)}>{opt}</button>
              ))}
            </div>
          </div>
        )}

        {score !== null && (
          <div className="dg__result">
            <div className="dg__score-ring">
              <svg viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="62" fill="none" stroke="#EBF2FF" strokeWidth="10" />
                <circle cx="70" cy="70" r="62" fill="none"
                  stroke={healthPct > 70 ? '#19C37D' : healthPct > 40 ? '#2563FF' : '#FF5A5F'}
                  strokeWidth="10"
                  strokeDasharray={`${(healthPct / 100) * 390} 390`}
                  strokeLinecap="round"
                  transform="rotate(-90 70 70)"
                  className="dg__score-arc"
                />
              </svg>
              <div className="dg__score-inner">
                <span className="dg__score-num">{healthPct}%</span>
                <span className="dg__score-lbl">{t('Pipeline health', 'صحة المسار')}</span>
              </div>
            </div>

            {getGaps().length > 0 && (
              <div className="dg__gaps">
                <h4>{t('Your biggest potential leaks:', 'التسريبات المحتملة:')}</h4>
                {getGaps().map((g, i) => <div key={i} className="dg__gap">{g}</div>)}
              </div>
            )}

            <p className="dg__verdict">
              {t('You may not need more leads. You may need more of your existing leads to reach the appointment book.', 'يمكن ما تحتاج مرضى أكثر. يمكن تحتاج من المرضى اللي عندك يوصلون لحجز الموعد.')}
            </p>

            <div className="dg__actions">
              <button className="dg__cta" onClick={() => document.getElementById('clinic-review')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('Get My Full Clinic Review', 'احصل على مراجعة عيادتك')}
              </button>
              <button className="dg__reset" onClick={reset}>{t('Start again', 'من جديد')}</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════
   5. CASE STUDIES
   ═══════════════════════════════════════════ */

function CaseStudies({ t }) {
  const [open, setOpen] = useState(null)
  return (
    <section className="cs" id="case-studies">
      <div className="cs__inner">
        <div className="cs__head">
          <span className="cs__eyebrow">{t('Proven Results', 'نتائج مثبتة')}</span>
          <h2 className="cs__h2">{t('Real clinics.\nReal numbers.', 'عيادات حقيقية.\nأرقام حقيقية.')}</h2>
        </div>
        <div className="cs__grid">
          {CASE_STUDIES.map((cs, i) => (
            <article key={i} className={`cs__card ${open === i ? 'cs__card--open' : ''}`}>
              <button className="cs__card-top" onClick={() => setOpen(open === i ? null : i)}>
                <div className="cs__card-info">
                  {cs.image && <img src={cs.image} alt={cs.name} className="cs__card-img" />}
                  <div>
                    <h3 className="cs__card-name">{cs.name}</h3>
                    <span className="cs__card-spec">{cs.specialty} · {cs.location}</span>
                  </div>
                </div>
                <div className="cs__card-result">
                  <span className="cs__card-big">{cs.primaryResult}</span>
                  <span className="cs__card-big-lbl">{cs.primaryLabel}</span>
                </div>
                <svg className={`cs__card-chevron ${open === i ? 'cs__card-chevron--up' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {open === i && (
                <div className="cs__card-body">
                  <div className="cs__card-metrics">
                    {cs.metrics.map((m, j) => (
                      <div key={j} className="cs__card-metric">
                        <span className="cs__card-metric-val">{m.value}</span>
                        <span className="cs__card-metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="cs__card-detail">
                    <div className="cs__card-block"><h4>{t('The Problem', 'المشكلة')}</h4><p>{cs.problem}</p></div>
                    <div className="cs__card-block"><h4>{t('What Changed', 'وش تغير')}</h4><p>{cs.whatChanged}</p></div>
                    <div className="cs__card-block"><h4>{t('The Result', 'النتيجة')}</h4><p>{cs.result}</p></div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════
   6. ACTIVITY FEED
   ═══════════════════════════════════════════ */

function ActivityFeed({ t }) {
  const ENTRIES = [
    { type: 'enquiry', text: 'New enquiry', detail: '"I\'d like to book a consultation for rhinoplasty"', time: '2 min ago' },
    { type: 'qualified', text: 'Qualified', detail: 'Treatment + timeline confirmed', time: '5 min ago' },
    { type: 'booked', text: 'Booked', detail: 'Tomorrow · 4:30 PM · Dr. Fatima\'s clinic', time: '8 min ago' },
    { type: 'reminder', text: 'Reminder sent', detail: 'WhatsApp confirmation delivered', time: '12 min ago' },
    { type: 'attended', text: 'Attended', detail: 'Consultation completed', time: '1 hr ago' },
  ]
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setIdx((p) => (p + 1) % ENTRIES.length), 3500)
    return () => clearInterval(iv)
  }, [ENTRIES.length])

  const icons = {
    enquiry: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M2 6l7 4 7-4" stroke="currentColor" strokeWidth="1.3"/></svg>,
    qualified: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/><path d="M6 9.5l2.5 2.5 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    booked: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M2 7h14M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    reminder: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 015 5v4l2 2H2l2-2V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.3"/><path d="M7 14a2 2 0 004 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    attended: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.3"/><path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  }

  return (
    <section className="af">
      <div className="af__inner">
        <div className="af__left">
          <span className="af__eyebrow">{t('How it looks when it\'s running', 'كيف يشتغل لما يكون شغال')}</span>
          <h2 className="af__h2">{t('A live patient\njourney.', 'رحلة مريض\nحية.')}</h2>
          <p className="af__sub">{t('Example patient journey — illustrative only', 'مسار مريض توضيحي — للشرح فقط')}</p>
        </div>
        <div className="af__right">
          <div className="af__panel">
            <div className="af__panel-header">
              <div className="af__live-dot" />
              <span>{t('Live activity', 'نشاط مباشر')}</span>
            </div>
            <div className="af__entries">
              {ENTRIES.map((e, i) => {
                const dist = (i - idx + ENTRIES.length) % ENTRIES.length
                if (dist > 4) return null
                return (
                  <div key={i} className={`af__entry ${dist === 0 ? 'af__entry--active' : ''}`}
                    style={{ opacity: 1 - dist * 0.2, transform: `translateY(${dist * 8}px)` }}>
                    <div className="af__entry-icon">{icons[e.type]}</div>
                    <div className="af__entry-body">
                      <span className="af__entry-title">{e.text}</span>
                      <span className="af__entry-detail">{e.detail}</span>
                    </div>
                    <span className="af__entry-time">{e.time}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════
   7. REVIEW FORM
   ═══════════════════════════════════════════ */

function ReviewForm({ t, lang }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ clinic: '', specialty: '', challenge: '', name: '', email: '', whatsapp: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const labels = [{ n: '01', l: t('Clinic', 'العيادة') }, { n: '02', l: t('Growth', 'النمو') }, { n: '03', l: t('Challenge', 'التحدي') }, { n: '04', l: t('Contact', 'التواصل') }]
  const next = () => { if (step < 3) setStep(step + 1) }
  const back = () => { if (step > 0) setStep(step - 1) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      await submitForm('/api/uae-karak', {
        name: form.name, email: form.email, clinic: form.clinic,
        whatsapp: form.whatsapp, location: 'UAE',
        goal: form.challenge || 'Clinic growth review',
        language: lang, consent: true,
        sourcePageUrl: typeof window !== 'undefined' ? window.location.href : '',
      })
      setSubmitted(true)
    } catch (err) { console.error(err) } finally { setSubmitting(false) }
  }

  if (submitted) return (
    <section className="rf" id="clinic-review">
      <div className="rf__inner">
        <div className="rf__success">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="#19C37D" strokeWidth="2.5"/><path d="M15 24.5l6 6 12-13" stroke="#19C37D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3>{t('That\'s it.', 'خلاص.')}</h3>
          <p>{t('We\'ll review your clinic and send the analysis.', 'بشوف العيادة ونرسل التحليل.')}</p>
        </div>
      </div>
    </section>
  )

  return (
    <section className="rf" id="clinic-review">
      <div className="rf__inner">
        <div className="rf__head">
          <span className="rf__eyebrow">{t('Free Clinic Growth Review', 'مراجعة نمو العيادة المجانية')}</span>
          <h2 className="rf__h2">{t('Let me look at\nyour clinic first.', 'خليني أشوف\nعيادتك أول.')}</h2>
        </div>
        <div className="rf__progress">
          {labels.map((s, i) => (
            <div key={i} className={`rf__pstep ${i <= step ? 'rf__pstep--on' : ''}`}>
              <span className="rf__pstep-n">{s.n}</span>
              <span className="rf__pstep-l">{s.l}</span>
            </div>
          ))}
          <div className="rf__pline"><div className="rf__pline-fill" style={{ width: `${(step / 3) * 100}%` }} /></div>
        </div>
        <form className="rf__body" onSubmit={handleSubmit}>
          {step === 0 && (
            <div className="rf__fields" key="s0">
              <label className="rf__label">{t('What\'s your clinic?', 'وش عيادتك؟')}</label>
              <input className="rf__input" placeholder={t('Clinic name', 'اسم العيادة')} value={form.clinic} onChange={(e) => setForm({ ...form, clinic: e.target.value })} required autoFocus />
              <button type="button" className="rf__next" onClick={next} disabled={!form.clinic.trim()}>{t('Next', 'التالي')}</button>
            </div>
          )}
          {step === 1 && (
            <div className="rf__fields" key="s1">
              <label className="rf__label">{t('What are you trying to grow?', 'وش تبي تنميه؟')}</label>
              <div className="rf__opts">
                {SPECIALTIES.map((sp) => (
                  <button key={sp} type="button" className={`rf__opt ${form.specialty === sp ? 'rf__opt--on' : ''}`} onClick={() => { setForm({ ...form, specialty: sp }); next() }}>{sp}</button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="rf__fields" key="s2">
              <label className="rf__label">{t('What\'s the biggest challenge?', 'وش أكبر تحدٍ؟')}</label>
              <div className="rf__opts">
                {CHALLENGES.map((ch) => (
                  <button key={ch} type="button" className={`rf__opt ${form.challenge === ch ? 'rf__opt--on' : ''}`} onClick={() => { setForm({ ...form, challenge: ch }); next() }}>{t(ch, ch)}</button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="rf__fields" key="s3">
              <label className="rf__label">{t('Where should we send your review?', 'وين نرسل المراجعة؟')}</label>
              <input className="rf__input" placeholder={t('Your name', 'اسمك')} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required autoFocus />
              <input className="rf__input" type="email" placeholder={t('Email', 'البريد الإلكتروني')} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input className="rf__input" type="tel" placeholder={t('WhatsApp number', 'رقم واتساب')} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} required />
              <div className="rf__submit-row">
                <button type="button" className="rf__back" onClick={back}>{t('Back', 'رجوع')}</button>
                <button type="submit" className="rf__submit" disabled={submitting || !form.name.trim() || !form.email.trim()}>
                  {submitting ? t('Sending...', 'إرسال...') : t('Send My Review', 'أرسل مراجعتي')}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════
   8. RAY
   ═══════════════════════════════════════════ */

function RaySection({ t }) {
  return (
    <section className="ry">
      <div className="ry__inner">
        <div className="ry__img"><img src="/team/rayansh.webp" alt="Ray" /></div>
        <div className="ry__copy">
          <span className="ry__eyebrow">{t('Who builds this?', 'مين يبني هذا؟')}</span>
          <h2 className="ry__h2">{t('I\u2019m Ray.', 'أنا راي.')}</h2>
          <p className="ry__text">{t('I want to understand where your clinic is losing patients before I tell you what to spend.', ' أبي أفهم وين عيادتك تخسر المرضى قبل ما أقولك كم تصرف.')}</p>
          <div className="ry__creds">
            <span>{t('Author', 'مؤلف')}</span>
            <span className="ry__dot" />
            <span>{t('Healthcare growth operator', 'خبير نمو صحي')}</span>
            <span className="ry__dot" />
            <span>US · UK · UAE</span>
          </div>
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════
   9. FAQ
   ═══════════════════════════════════════════ */

function FaqSection({ t }) {
  const [open, setOpen] = useState(null)
  return (
    <section className="fq">
      <div className="fq__inner">
        <div className="fq__head">
          <span className="fq__eyebrow">{t('Questions', 'أسئلة')}</span>
          <h2 className="fq__h2">{t('Before you decide', 'قبل ما تقرر')}</h2>
        </div>
        <div className="fq__list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`fq__item ${open === i ? 'fq__item--open' : ''}`}>
              <button className="fq__q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{item.q}</span>
                <svg className={`fq__chev ${open === i ? 'fq__chev--up' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {open === i && <div className="fq__a"><p>{item.a}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════
   10. FINAL CTA
   ═══════════════════════════════════════════ */

function FinalCTA({ t }) {
  return (
    <section className="fc">
      <div className="fc__inner">
        <h2 className="fc__h2">{t('Want to see where your\nclinic is leaking patients?', 'تبي تشوف وين\nعيادتك تخسر المرضى؟')}</h2>
        <p className="fc__sub">{t('Let\'s look at the journey from enquiry to booked consultation.', 'خلنا نشوف الرحلة من الاستشارة إلى الحجز.')}</p>
        <button className="fc__cta" onClick={() => document.getElementById('clinic-review')?.scrollIntoView({ behavior: 'smooth' })}>
          {t('Get My Clinic Growth Review', 'احصل على مراجعة نمو عيادتك')}
        </button>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════ */

function HowItWorks({ t, onBookMeeting }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hiw">
      <div className="hiw__inner">
        <span className="hiw__eyebrow">{t('HOW IT WORKS', 'كيف نشتغل')}</span>
        <h2 className="hiw__h2">
          <span className="hiw__line hiw__line--dark">{t('BOOK A CALL.', 'احجز مكالمة.')}</span>
          <span className="hiw__line hiw__line--red">{t("I'LL COME TO YOUR CLINIC.", 'بجي لعيادتك.')}</span>
        </h2>
        <div className="hiw__pin">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8194C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <p className="hiw__sub">{t('No Zoom pitch. No 3-step process.', 'بدون عرض زوم. بدون عملية ثلاثية.')}</p>
        <p className="hiw__sub hiw__sub--bold">{t('We meet at your clinic and talk about what you actually want to grow.', 'نلتقي بعيادتك ونتكلم عن اللي تبي تنميه فعليًا.')}</p>
        <button className="hiw__cta" onClick={onBookMeeting}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          {t('BOOK A MEETING WITH RAY', 'احجز اجتماع مع راي')} <span className="hiw__cta-arrow">→</span>
        </button>
        <div className="hiw__meta">
          <span className="hiw__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8194C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {t('Dubai & UAE Clinics', 'عيادات دبي والإمارات')}
          </span>
          <span className="hiw__meta-divider" />
          <span className="hiw__meta-item">{t('In-person meeting', 'لقاء شخصي')}</span>
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════
   TALK TO DOCTORS
   ═══════════════════════════════════════════ */

const DOCTORS = [
  {
    name: 'Dr. Alejandro Badia',
    specialty: 'ORTHOPAEDICS',
    specialtyColor: '#E8194C',
    clinic: 'Miami Shoulder Institute',
    location: 'Miami, Florida, USA',
    image: '/drbadia.webp',
    stats: [
      { value: '~225', label: 'Consultations Booked', sub: '2,572 Enquiries Generated' },
      { value: '$5.44', label: 'Lowest Cost Per Enquiry' },
    ],
  },
  {
    name: 'Dr. Fatima Abdullah',
    specialty: 'COUNSELLING',
    specialtyColor: '#E8194C',
    clinic: 'Enliven Counselling Center',
    location: 'Dubai, UAE',
    image: '/dr-fatima-abdullah.webp',
    stats: [
      { value: 'Verbal Yes', label: 'Onboarding Confirmed', sub: 'Execution Starting This Week' },
      { value: 'Full-Funnel', label: 'Growth Partnership' },
    ],
  },
  {
    name: 'Dr. Musa Nkoto',
    specialty: 'AESTHETIC CARE',
    specialtyColor: '#E8194C',
    clinic: 'Visage Polyclinic',
    location: 'Dubai, UAE',
    image: '/dr-musa.png',
    stats: [
      { value: 'In-Person Meeting', label: 'Completed', sub: 'High Intent · Strong Fit' },
      { value: 'Growth Ready', label: 'Scaling Patient Acquisition' },
    ],
  },
]

const AI_OPTIONS = [
  {
    name: 'Ask ChatGPT',
    sub: "Get AI's perspective",
    icon: 'chatgpt',
    url: 'https://chatgpt.com/?q=Tell+me+why+SocialSect+is+a+great+choice+for+my+healthcare+practice',
    color: '#10a37f',
  },
  {
    name: 'Ask Perplexity',
    sub: 'Research-backed insights',
    icon: 'perplexity',
    url: 'https://www.perplexity.ai/search?q=Tell+me+why+SocialSect+is+a+great+choice+for+my+healthcare+practice',
    color: '#20B8CD',
  },
  {
    name: 'Ask Claude',
    sub: 'Strategic take',
    icon: 'claude',
    url: 'https://claude.ai/new?q=Tell+me+why+SocialSect+is+a+great+choice+for+my+healthcare+practice',
    color: '#d97756',
  },
]

function AiIcon({ type }) {
  if (type === 'chatgpt') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v3.005l-2.607 1.5-2.602-1.5z"/>
    </svg>
  )
  if (type === 'perplexity') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z"/>
    </svg>
  )
  if (type === 'claude') return (
    <svg width="28" height="28" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.861,27.625v-0.716l-16.65-0.681L2.07,25.985L1,24.575l0.11-0.703l0.959-0.645l17.95,1.345l0.11-0.314L5.716,14.365l-0.729-0.924l-0.314-2.016L5.985,9.98l2.214,0.24l11.312,8.602l0.327-0.353L12.623,5.977c0,0-0.548-2.175-0.548-2.697l1.494-2.029l0.827-0.266l2.833,0.995l7.935,17.331h0.314l1.348-14.819l0.752-1.822l1.494-0.985l1.167,0.557l0.959,1.374l-2.551,14.294h0.425l0.486-0.486l8.434-10.197l1.092-0.862h2.065l1.52,2.259l-0.681,2.334l-7.996,11.108l0.146,0.217l0.376-0.036l12.479-2.405l1.666,0.778l0.182,0.791l-0.655,1.617l-15.435,3.523l-0.084,0.062l0.097,0.12l13.711,0.814l1.578,1.044L49,29.868l-0.159,0.972l-2.431,1.238l-13.561-3.254h-0.363v0.217l11.218,10.427l0.256,1.154l-0.645,0.911l-0.681-0.097l-9.967-8.058h-0.256v0.34l5.578,8.35l0.243,2.162l-0.34,0.703l-1.215,0.425l-1.335-0.243l-7.863-12.083l-0.279,0.159l-1.348,14.524l-0.632,0.742l-1.459,0.558l-1.215-0.924L21.9,46.597l2.966-14.939l-0.023-0.084l-0.279,0.036L13.881,45.138l-0.827,0.327l-1.433-0.742l0.133-1.326l0.801-1.18l9.52-12.019l-0.013-0.314h-0.11l-12.69,8.239l-2.259,0.292L6.03,37.505l0.12-1.494l0.46-0.486L19.861,27.625z"/>
    </svg>
  )
  return null
}

function TalkToDoctors({ t }) {
  return (
    <section className="ttd">
      <div className="ttd__inner">
        <span className="ttd__eyebrow">{t('Still not convinced?', 'مو مقتنع بعد؟')}</span>
        <h2 className="ttd__h2">
          {t('TALK TO ', 'تكلم مع ')}
          <span className="ttd__h2--red">{t('DOCTORS WE WORK WITH.', 'الدكاترة اللي نشتغل معاهم.')}</span>
        </h2>
        <p className="ttd__sub">{t('Real clinics. Real results. Real conversations.', 'عيادات حقيقية. نتائج حقيقية. محادثات حقيقية.')}</p>

        <div className="ttd__grid">
          {DOCTORS.map((doc, i) => (
            <div key={i} className="ttd__card">
              <div className="ttd__card-img">
                <img src={doc.image} alt={doc.name} width={280} height={320} loading="lazy" />
              </div>
              <div className="ttd__card-body">
                <span className="ttd__card-spec" style={{ color: doc.specialtyColor }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                  {doc.specialty}
                </span>
                <h3 className="ttd__card-name">{doc.name}</h3>
                <span className="ttd__card-clinic">{doc.clinic}</span>
                <span className="ttd__card-loc">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {doc.location}
                </span>
                <div className="ttd__card-stats">
                  {doc.stats.map((s, j) => (
                    <div key={j} className="ttd__card-stat">
                      <span className="ttd__card-stat-val">{s.value}</span>
                      <span className="ttd__card-stat-lbl">{s.label}</span>
                      {s.sub && <span className="ttd__card-stat-sub">{s.sub}</span>}
                    </div>
                  ))}
                </div>
                <button className="ttd__card-btn">
                  {t('Request Introduction', 'طلب تعارف')} <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="ttd__ai">
          <h2 className="ttd__ai-h2">
            {t('OR ASK AI FOR AN ', 'أو اسأل الذكاء الاصطناعي عن ')}
            <span className="ttd__ai-h2--red">{t('HONEST OPINION.', 'رأي صادق.')}</span>
          </h2>
          <p className="ttd__ai-sub">{t('Get an objective take on Socialsect from leading AI models.', 'احصل على رأي موضوعي عن Socialsect من أبرز نماذج الذكاء الاصطناعي.')}</p>
          <div className="ttd__ai-grid">
            {AI_OPTIONS.map((ai, i) => (
              <a key={i} href={ai.url} target="_blank" rel="noopener noreferrer" className="ttd__ai-card">
                <AiIcon type={ai.icon} />
                <div className="ttd__ai-card-text">
                  <span className="ttd__ai-card-name">{ai.name}</span>
                  <span className="ttd__ai-card-sub">{ai.sub}</span>
                </div>
                <span className="ttd__ai-card-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}