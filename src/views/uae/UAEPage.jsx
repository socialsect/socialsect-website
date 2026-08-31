'use client'
import { useEffect, useState, useRef } from 'react'
import { ArrowRight, ChevronDown, Check } from 'lucide-react'
import { submitForm } from '../../lib/submitForm'
import './UAEPage.css'

/* ──────────────────────────────────────────────
   SECTION 1: HERO — "You understand my problem"
   SECTION 2: CASE STUDIES — "Done it for doctors like me"
   SECTION 3: RAY — "Real person, not a logo"
   SECTION 4: HOW IT WORKS — "Simple, low-risk"
   SECTION 5: FAQ — "My objections are answered"
   SECTION 6: FINAL CTA — "I should do this now"
   ────────────────────────────────────────────── */

const CASE_STUDIES = [
  {
    name: 'Dr. Alejandro Badia',
    clinic: 'Miami Shoulder Institute',
    location: 'Miami, US',
    image: '/drbadia.webp',
    stats: [
      { value: '225+', label: { en: 'Consultations booked', ar: 'استشارات محجوزة' } },
      { value: '$600K+', label: { en: 'Additional revenue', ar: 'إيرادات إضافية' } },
      { value: '4.2x', label: { en: 'Patient growth', ar: 'نمو المرضى' } },
    ],
    quote: {
      en: 'They rebuilt our entire patient acquisition system. The results spoke for themselves.',
      ar: 'عاد بناء نظام اكتساب المرضى كله. النتائجloquent speaks for itself.',
    },
  },
  {
    name: 'Dr. Adam Goldman',
    clinic: 'NY Metrovein Medical',
    location: 'New York, US',
    image: '/images/dr_adam_goldman.webp',
    stats: [
      { value: '700+', label: { en: 'Consultations in 5 months', ar: 'استشارات في 5 شهور' } },
      { value: '$5.27', label: { en: 'Cost per lead', ar: 'تكلفة العميل المحتمل' } },
      { value: '$100K+', label: { en: 'Revenue attributed', ar: 'إيرادات مُنسّبة' } },
    ],
    quote: {
      en: 'They built a system that actually brings patients in. Not clicks \u2014 consultations.',
      ar: 'بنوا نظام يجيب مرضى فعلاً. مو نقرات. استشارات.',
    },
  },
]

const FAQ_ITEMS = [
  {
    q: { en: 'What if it doesn\u2019t work?', ar: 'وين ما نفع؟' },
    a: { en: 'You don\u2019t pay. That\u2019s the deal. We start with a one-month trial. If we produce results, we continue. If we don\u2019t, you owe us nothing.', ar: 'ما تدفع. هذا الاتفاق. نبدأ بتجربة شهر. لو ننتج نتائج، نكمل. لو لا، ما تدين لنا بشي.' },
  },
  {
    q: { en: '\u201cWe\u2019ve tried agencies before.\u201d', ar: '"جربنا وكالات قبل."' },
    a: { en: 'That\u2019s exactly why we don\u2019t ask you to trust a pitch. Come see the clinic, understand your numbers, then we\u2019ll tell you what we\u2019d do if it were ours.', ar: 'هذا بالضبط ليش ما نطلب منك تثق بعرض. اجيه العيادة، نفهم أرقامك،بعدين نقولك وش نسوي لو عيادتنا.' },
  },
  {
    q: { en: 'How long before I see results?', ar: 'كم أشوف النتيجة؟' },
    a: { en: 'First signals within 30 days. Meaningful results in 3\u20136 months. We\u2019re building systems, not running one-off campaigns.', ar: 'إشارات أولى خلال 30 يوم. نتائج حقيقية في 3\u20136 شهور. نبني أنظمة، مو حملات لمرة واحدة.' },
  },
  {
    q: { en: 'Will this work for my clinic?', ar: 'هالشي ينفع لعيادتي؟' },
    a: { en: 'We build around your clinic. Not a package. Every practice is different, different patients, different treatments, different economics. We diagnose first.', ar: 'نبني حول عيادتك. مو باقة. كل عيادة مختلفة. مرضى مختلفين، علاجات مختلفة، اقتصادات مختلفة. نشخيص أول.' },
  },
  {
    q: { en: 'What\u2019s the investment?', ar: 'وش الاستثمار؟' },
    a: { en: 'Performance-based. No upfront fees, no long contracts. We start with a one-month trial, if we produce results, we continue.', ar: 'مبنية على الأداء. ما فيه رسوم مسبقة، ما فيه عقود طويلة. نبدأ بتجربة شهر. لو ننتج نتائج، نكمل.' },
  },
  {
    q: { en: 'Who am I actually dealing with?', ar: 'مين أتعامل معه فعلاً؟' },
    a: { en: 'Ray. He\u2019ll meet you here in the UAE. No account managers. No layers of people who don\u2019t understand your practice.', ar: 'راي. وبيقابلك هنا في الإمارات. ما فيه مديرين حسابات. ما فيه طبقات ناس ما تفهم عيادتك.' },
  },
]

const FORM_STEPS = [
  { key: 'name', title: { en: "What's your name?", ar: "وش اسمك؟" }, placeholder: { en: 'Your name', ar: 'اسمك' } },
  { key: 'clinic', title: { en: 'Which clinic?', ar: 'أي عيادة؟' }, fields: [
    { id: 'clinicInput', placeholder: { en: 'Clinic name', ar: 'اسم العيادة' } },
    { id: 'websiteInput', placeholder: { en: 'Website or Instagram (optional)', ar: 'موقع أو انستقرام (اختياري)' } },
  ]},
  { key: 'location', title: { en: 'Where in the UAE?', ar: 'وين في الإمارات؟' }, options: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', { en: 'Somewhere else', ar: 'مكان آخر' }] },
  { key: 'goal', title: { en: 'One thing you want to change?', ar: 'شيء واحد تبيه يتغير؟' }, textarea: true, placeholder: { en: 'Say it normally. No marketing language.', ar: 'قولها عادي. بدون لغة تسويق.' } },
  { key: 'whatsapp', title: { en: 'WhatsApp?', ar: 'واتساب؟' }, placeholder: { en: '+971 ...', ar: '+971 ...' }, languageOptions: true },
]

export default function UAEPage() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ss-lang')
      if (saved === 'ar' || saved === 'en') return saved
    }
    return 'en'
  })
  const [formStep, setFormStep] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', clinic: '', website: '', location: '', goal: '', whatsapp: '', language: '' })
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [consent, setConsent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [activeCaseStudy, setActiveCaseStudy] = useState(0)
  const [talkModalOpen, setTalkModalOpen] = useState(false)
  const [talkForm, setTalkForm] = useState({ name: '', email: '', message: '' })
  const [talkSubmitting, setTalkSubmitting] = useState(false)
  const [talkSubmitted, setTalkSubmitted] = useState(false)
  const formCardRef = useRef(null)
  const revealRefs = useRef([])

  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en'
    setLang(next)
    localStorage.setItem('ss-lang', next)
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = next
  }

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const t = (en, ar) => lang === 'ar' ? ar : en

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    revealRefs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  const nextFormStep = async () => {
    if (formStep < FORM_STEPS.length - 1) {
      setFormStep(formStep + 1)
      formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setFormSubmitted(true)
      setFormData(prev => ({ ...prev, name: prev.name || 'Doctor' }))
      try {
        await submitForm('/api/uae-karak', {
          ...formData,
          location: selectedLocation,
          language: selectedLanguage,
          consent,
          sourcePageUrl: window.location.href,
        })
      } catch (err) {
        console.error('UAE form error:', err)
      }
    }
  }

  const prevFormStep = () => {
    if (formStep > 0) setFormStep(formStep - 1)
  }

  const handleTalkSubmit = async (e) => {
    e.preventDefault()
    if (talkSubmitting) return
    setTalkSubmitting(true)
    try {
      await submitForm('/api/talk-to-ray', {
        ...talkForm,
        sourcePageUrl: window.location.href,
      })
      setTalkSubmitted(true)
    } catch (err) {
      console.error('Talk to Ray error:', err)
    } finally {
      setTalkSubmitting(false)
    }
  }

  return (
    <main className="uae-page">

      {/* ════════════════════════════════════════════
          SECTION 1 — HERO
          Psychology: "This person understands my problem"
          ════════════════════════════════════════════ */}
      <section className="uae-hero" aria-labelledby="uae-hero-heading">
        <div className="uae-hero__bg" aria-hidden="true">
          <img src="/images/dubai-hero.webp" alt="" className="uae-hero__bg-img" fetchPriority="high" decoding="async" />
          <div className="uae-hero__overlay" />
        </div>

        <div className="uae-hero__content">
          <button className="uae-lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>

          <div className="uae-hero__center">
            <p className="uae-hero-eyebrow hero-reveal" style={{ animationDelay: '0ms' }}>
              <span className="uae-hero-eyebrow__line" aria-hidden="true" />
              {t('FOR CLINIC OWNERS ACROSS THE UAE', 'لأصحاب العيادات في الإمارات')}
            </p>

            <h1 id="uae-hero-heading" className="uae-hero-headline">
              <span className="hero-reveal" style={{ animationDelay: '100ms' }}>{t('Your clinic is good.', 'عيادتك ممتازة.')}</span>
              <span className="hero-reveal" style={{ animationDelay: '200ms' }}>{t('The doctors are good.', 'الأطباء ممتازين.')}</span>
              <span className="hero-reveal" style={{ animationDelay: '300ms' }}>{t('The reputation is good.', 'السمعة ممتازة.')}</span>
              <span className="uae-hero-headline--accent hero-reveal" style={{ animationDelay: '400ms' }}>
                {t('So why isn\u2019t the pipeline full?', 'ليشأنو الأنابيب مو مليانة؟')}
              </span>
            </h1>

            <p className="uae-hero-sub hero-reveal" style={{ animationDelay: '500ms' }}>
              {t(
                "We help private practices in the UAE get more booked consultations \u2014 not through flashy campaigns, but through a system built around how patients actually choose a clinic.",
                'نساعد العيادات الخاصة في الإمارات تحصل على استشارات محجوزة أكثر، مو من حملات صاخبة، بل من نظام مبني حول كيف المرضى يختارون العيادة فعلاً.'
              )}
            </p>

            <div className="uae-hero-ctas hero-reveal" style={{ animationDelay: '600ms' }}>
              <a href="#form-section" className="uae-btn uae-btn--primary uae-btn--lg">
                {t("Let\u2019s have karak", 'خلينا نشرب كرك')}
                <ArrowRight size={18} />
              </a>
              <a href="#case-studies" className="uae-btn uae-btn--ghost uae-btn--lg">
                {t('See our work', 'شوف شغلنا')}
              </a>
            </div>

            <div className="uae-hero-trust hero-reveal" style={{ animationDelay: '700ms' }}>
              <span className="uae-hero-trust__dot" aria-hidden="true" />
              <span>{t('Performance-based. No upfront fees.', 'مبنية على الأداء. ما فيه رسوم مسبقة.')}</span>
              <span className="uae-hero-trust__sep" aria-hidden="true">·</span>
              <span>{t('One-month trial.', 'تجربة شهر.')}</span>
              <span className="uae-hero-trust__sep" aria-hidden="true">·</span>
              <span>{t('If we don\u2019t produce, you don\u2019t pay.', 'لو ما ننتج، ما تدفع.')}</span>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          SECTION 2 — CASE STUDIES
          Psychology: "They've done it for doctors like me"
          ════════════════════════════════════════════ */}
      <section className="uae-cases" id="case-studies" aria-labelledby="uae-cases-heading" ref={addRef}>
        <div className="uae-cases__inner">
          <div className="uae-cases__header">
            <p className="uae-eyebrow">{t('Case studies', 'دراسات حالة')}</p>
            <h2 id="uae-cases-heading" className="uae-headline">
              {t('Real practices. Real numbers.', 'عيادات حقيقية. أرقام حقيقية.')}
            </h2>
            <p className="uae-subcopy">
              {t('Every number below is documented. If we can\u2019t prove it, it\u2019s not here.', 'كل رقم موثق. لو ما نقدر نثبت، مو هنا.')}
            </p>
          </div>

          <div className="uae-cases__tabs">
            {CASE_STUDIES.map((cs, i) => (
              <button
                key={cs.name}
                className={`uae-cases__tab${activeCaseStudy === i ? ' uae-cases__tab--active' : ''}`}
                onClick={() => setActiveCaseStudy(i)}
              >
                {cs.clinic}
              </button>
            ))}
          </div>

          {CASE_STUDIES.map((cs, i) => (
            <div
              key={cs.name}
              className={`uae-case${activeCaseStudy === i ? ' uae-case--active' : ''}`}
              aria-hidden={activeCaseStudy !== i}
            >
              <div className="uae-case__left">
                <div className="uae-case__stats">
                  {cs.stats.map(s => (
                    <div className="uae-case__stat" key={s.label.en}>
                      <span className="uae-case__stat-value">{s.value}</span>
                      <span className="uae-case__stat-label">{t(s.label.en, s.label.ar)}</span>
                    </div>
                  ))}
                </div>
                <blockquote className="uae-case__quote">
                  <span className="uae-case__quote-mark" aria-hidden="true">&ldquo;</span>
                  <p>{t(cs.quote.en, cs.quote.ar)}</p>
                  <footer>
                    <cite>{cs.name}</cite>
                    <span>{cs.clinic} &middot; {cs.location}</span>
                  </footer>
                </blockquote>
              </div>
              <div className="uae-case__right">
                <div className="uae-case__image-wrap">
                  <img src={cs.image} alt={cs.name} loading="lazy" decoding="async" />
                </div>
                <div className="uae-case__attribution">
                  {t('Documented case study. Your clinic will be different.', 'دراسة حالة موثقة. عيادتك بتكون مختلفة.')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════
          SECTION 3 — RAY
          Psychology: "I'd be working with a real person"
          ════════════════════════════════════════════ */}
      <section className="uae-ray" aria-labelledby="uae-ray-heading" ref={addRef}>
        <div className="uae-ray__inner">
          <div className="uae-ray__card">
            <p className="uae-ray__scribble">
              {t("We take your clinic\u2019s name seriously.", 'نأخذ اسم عيادتك بجدية.')}
            </p>
            <p className="uae-ray__text">
              {t(
                'Your clinic has your name, reputation, and years of work behind it. We treat that with the same seriousness we\u2019d treat our own.',
                'عيادتك فيها اسمك وسمعتك وسنين شغل وراها. نتعامل مع هالشي بنفس الجدية اللي نتعامل فيها مع عيادتنا.'
              )}
            </p>
            <p className="uae-ray__sig">\u2014 Ray</p>
          </div>

          <div className="uae-ray__copy">
            <p className="uae-eyebrow">{t('The person on the other side', 'الشخص على الطرف الثاني')}</p>
            <h2 id="uae-ray-heading" className="uae-headline">
              {t('Not an account manager. Not a team you never meet.', 'مو مدير حسابات. مو فريق ما تعرفهم.')}
            </h2>
            <p className="uae-lead">
              {t(
                "Ray is in the UAE. He\u2019ll come see your clinic, understand your numbers, and tell you honestly whether he can help. No pitch. No pressure. Just a conversation over karak.",
                'راي في الإمارات. بيجي يشوف عيادتك، يفهم أرقامك، ويقولك بصراحةwhether هو يقدر يساعد. ما فيه عرض. ما فيه ضغط. بس حوار على كرك.'
              )}
            </p>
            <a href="#form-section" className="uae-btn uae-btn--primary">
              {t("Let\u2019s meet", 'قابله')}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          SECTION 4 — HOW IT WORKS
          Psychology: "This is simple and low-risk"
          ════════════════════════════════════════════ */}
      <section className="uae-how" aria-labelledby="uae-how-heading" ref={addRef}>
        <div className="uae-how__inner">
          <div className="uae-how__header">
            <p className="uae-eyebrow">{t('How it works', 'كيف يشتغل')}</p>
            <h2 id="uae-how-heading" className="uae-headline">
              {t('Three steps. One month. No risk.', 'ثلاث خطوات. شهر واحد. بدون مخاطرة.')}
            </h2>
          </div>

          <div className="uae-how__steps">
            {[
              {
                num: '01',
                title: { en: 'We come see the clinic', ar: 'نجي نشوف العيادة' },
                desc: {
                  en: 'Ray visits, meets your team, understands how patients find you and why they book \u2014 or don\u2019t.',
                  ar: 'راي يزور، يقابل فريقك، يفهم كيف المرضى يلقونك وليحجزون، أو لا.',
                },
              },
              {
                num: '02',
                title: { en: 'We tell you what we\u2019d change', ar: 'نقولك وش نغير' },
                desc: {
                  en: 'No deck. No 45-minute pitch. Just honest feedback on what\u2019s working and what isn\u2019t. If you like the thinking, we build it.',
                  ar: 'ما فيه عرض. ما فيه بيتشر 45 دقيقة. بس صراحة على وش يشتغل وش لا. إذا عجبك التفكير، نبنيه.',
                },
              },
              {
                num: '03',
                title: { en: 'One month. Then you decide.', ar: 'شهر واحد.بعدين تقرر.' },
                desc: {
                  en: 'We build the system. Track the numbers. If we produce results worth paying for, we continue. If not, you don\u2019t pay. Khalas.',
                  ar: 'نبني النظام. نتتبع الأرقام. لو ننتج نتائج تستاهل الدفع، نكمل. لو لا، ما تدفع. خلاص.',
                },
              },
            ].map((step) => (
              <div className="uae-how__step" key={step.num}>
                <span className="uae-how__step-num">{step.num}</span>
                <h3 className="uae-how__step-title">{t(step.title.en, step.title.ar)}</h3>
                <p className="uae-how__step-desc">{t(step.desc.en, step.desc.ar)}</p>
              </div>
            ))}
          </div>

          <div className="uae-how__cta">
            <a href="#form-section" className="uae-btn uae-btn--primary uae-btn--lg">
              {t("Let\u2019s have karak", 'خلينا نشرب كرك')}
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          SECTION 5 — FAQ
          Psychology: "My objections are answered"
          ════════════════════════════════════════════ */}
      <section className="uae-faq" aria-labelledby="uae-faq-heading" ref={addRef}>
        <div className="uae-faq__inner">
          <div className="uae-faq__header">
            <p className="uae-eyebrow">{t('Questions', 'أسئلة')}</p>
            <h2 id="uae-faq-heading" className="uae-headline">
              {t('Before we talk.', 'قبل ما نتكلم.')}
            </h2>
            <p className="uae-subcopy" style={{ marginTop: 12 }}>
              {t(
                "Still have questions? Let\u2019s sort them out.",
                'لسه عندك أسئلة؟ نحلها.'
              )}
            </p>
          </div>

          <div className="uae-faq__list">
            {FAQ_ITEMS.map((item, i) => (
              <div className={`uae-faq-item${openFaq === i ? ' uae-faq-item--open' : ''}`} key={i}>
                <button
                  className="uae-faq-item__q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{t(item.q.en, item.q.ar)}</span>
                  <ChevronDown className="uae-faq-item__chevron" size={20} />
                </button>
                <div className="uae-faq-item__a" aria-hidden={openFaq !== i}>
                  <p>{t(item.a.en, item.a.ar)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="uae-faq__cta">
            <div className="uae-faq__cta-text">
              <p className="uae-faq__cta-label">
                {t('Still have questions?', 'لسه عندك أسئلة؟')}
              </p>
              <p className="uae-faq__cta-sub">
                {t('Ray will reply within 24 hours.', 'راي يرد عليك خلال 24 ساعة.')}
              </p>
            </div>
            <button className="uae-btn uae-btn--primary" onClick={() => setTalkModalOpen(true)}>
              {t('Talk to Ray', 'كلم راي')}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TALK TO RAY MODAL
          ════════════════════════════════════════════ */}
      {talkModalOpen && (
        <div className="uae-modal-overlay" onClick={() => { setTalkModalOpen(false); setTalkSubmitted(false); setTalkForm({ name: '', email: '', message: '' }) }}>
          <div className="uae-modal" onClick={e => e.stopPropagation()}>
            <button className="uae-modal__close" onClick={() => { setTalkModalOpen(false); setTalkSubmitted(false); setTalkForm({ name: '', email: '', message: '' }) }} aria-label="Close">
              &times;
            </button>

            {talkSubmitted ? (
              <div className="uae-modal__done">
                <div className="uae-done__tick"><Check size={24} /></div>
                <h3 className="uae-headline" style={{ fontSize: 24 }}>
                  {t('Message sent.', 'تم الإرسال.')}
                </h3>
                <p className="uae-lead" style={{ fontSize: 15 }}>
                  {t(
                    "Ray will review your message and get back to within 24 hours.",
                    'راي يشيك على رسالتك ويرد عليك خلال 24 ساعة.'
                  )}
                </p>
                <p className="uae-ray__sig">\u2014 Ray</p>
              </div>
            ) : (
              <form onSubmit={handleTalkSubmit}>
                <h3 className="uae-headline" style={{ fontSize: 24, marginBottom: 4 }}>
                  {t('Talk to Ray', 'كلم راي')}
                </h3>
                <p className="uae-lead" style={{ fontSize: 14, marginBottom: 24 }}>
                  {t(
                    "Short message. He\u2019ll reply within 24 hours.",
                    'رسالة قصيرة. يرد عليك خلال 24 ساعة.'
                  )}
                </p>

                <label className="uae-modal__field">
                  <span>{t('Name', 'الاسم')}</span>
                  <input
                    type="text"
                    required
                    placeholder={t('Your name', 'اسمك')}
                    value={talkForm.name}
                    onChange={e => setTalkForm({ ...talkForm, name: e.target.value })}
                  />
                </label>

                <label className="uae-modal__field">
                  <span>{t('Email', 'البريد')}</span>
                  <input
                    type="email"
                    required
                    placeholder={t('you@clinic.com', 'you@clinic.com')}
                    value={talkForm.email}
                    onChange={e => setTalkForm({ ...talkForm, email: e.target.value })}
                  />
                </label>

                <label className="uae-modal__field">
                  <span>{t('Message', 'الرسالة')}</span>
                  <textarea
                    required
                    rows={4}
                    placeholder={t('What\u2019s on your mind?', 'وش عندك؟')}
                    value={talkForm.message}
                    onChange={e => setTalkForm({ ...talkForm, message: e.target.value })}
                  />
                </label>

                <button
                  type="submit"
                  className="uae-btn uae-btn--primary uae-btn--lg"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                  disabled={talkSubmitting}
                >
                  {talkSubmitting
                    ? t('Sending...', 'إرسال...')
                    : t('Send message', 'إرسال')
                  }
                  {!talkSubmitting && <ArrowRight size={16} />}
                </button>
              </form>
            )}
          </div>
        </div>
      )}


      {/* ════════════════════════════════════════════
          SECTION 6 — FINAL CTA + FORM
          Psychology: "I should do this now"
          ════════════════════════════════════════════ */}
      <section className="uae-final" id="form-section" aria-labelledby="uae-final-heading" ref={addRef}>
        <div className="uae-final__bg" aria-hidden="true">
          <div className="uae-final__overlay" />
        </div>

        <div className="uae-final__inner">
          <div className="uae-final__copy">
            <p className="uae-eyebrow uae-eyebrow--light">{t('That\u2019s enough about me', 'خلنا نكفي عن كلامي')}</p>
            <h2 id="uae-final-heading" className="uae-headline uae-headline--light">
              {t('Where should we have karak?', 'وين نشرب كرك؟')}
            </h2>
            <p className="uae-lead uae-lead--light">
              {t("Just enough for me to know who I\u2019m meeting.", 'بس عشان أعرف مين بقابله.')}
            </p>
            <p className="uae-lead uae-lead--light">
              <strong>{t('English or العربية, whichever is easier.', 'إنجليزي أو عربي، أيهم أسهل.')}</strong>
            </p>
          </div>

          <div className="uae-final__form" ref={formCardRef}>
            <div className="uae-progress">
              <div className="uae-progress__bar" style={{ width: `${((formStep + 1) / (FORM_STEPS.length + 1)) * 100}%` }} />
            </div>

            {formSubmitted ? (
              <div className="uae-done">
                <div className="uae-done__tick"><Check size={24} /></div>
                <p className="uae-eyebrow uae-eyebrow--purple">{t('Khalas.', 'خلاص.')}</p>
                <h3 className="uae-headline">{t('Karak soon,', 'كرك قريباً،')} {formData.name || 'Doctor'}.</h3>
                <p className="uae-lead">
                  {t(
                    "I\u2019ll look at the clinic before we meet, so we can skip the introductions and talk about what actually matters.",
                    'بتشوف العيادة قبل ما نتقابل، عشان نتجاوز التعريف ونتكلم عن اللي يهم فعلاً.'
                  )}
                </p>
                <div className="uae-done__box">
                  <strong>{t('What happens next?', 'وش يصير بعدين؟')}</strong>
                  <p>{t(
                    "A real person from our UAE team reviews what you\u2019ve shared, then contacts you in English or Arabic.",
                    'شخص حقيقي من فريق الإمارات يشيك على اللي كتبته، ويتواصل معك بالإنجليزي أو العربي.'
                  )}</p>
                </div>
                <p className="uae-ray__sig">\u2014 Ray</p>
              </div>
            ) : (
              <>
                {formStep === 0 && (
                  <div className="uae-step">
                    <h3 className="uae-step__title">{t("What's your name?", 'وش اسمك؟')}</h3>
                    <input className="uae-input" placeholder={t('Your name', 'اسمك')} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                )}
                {formStep === 1 && (
                  <div className="uae-step">
                    <h3 className="uae-step__title">{t('Which clinic?', 'أي عيادة؟')}</h3>
                    <input className="uae-input" placeholder={t('Clinic name', 'اسم العيادة')} value={formData.clinic} onChange={e => setFormData({...formData, clinic: e.target.value})} />
                    <input className="uae-input uae-input--mt" placeholder={t('Website or Instagram (optional)', 'موقع أو انستقرام (اختياري)')} value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
                  </div>
                )}
                {formStep === 2 && (
                  <div className="uae-step">
                    <h3 className="uae-step__title">{t('Where in the UAE?', 'وين في الإمارات؟')}</h3>
                    <div className="uae-opts">
                      {['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', t('Somewhere else', 'مكان آخر')].map(loc => (
                        <button key={loc} className={`uae-opt${selectedLocation === loc ? ' uae-opt--active' : ''}`} onClick={() => setSelectedLocation(loc)}>{loc}</button>
                      ))}
                    </div>
                  </div>
                )}
                {formStep === 3 && (
                  <div className="uae-step">
                    <h3 className="uae-step__title">{t('One thing you want to change?', 'شيء واحد تبيه يتغير؟')}</h3>
                    <textarea className="uae-input uae-input--area" placeholder={t('Say it normally. No marketing language.', 'قولها عادي. بدون لغة تسويق.')} value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} />
                  </div>
                )}
                {formStep === 4 && (
                  <div className="uae-step">
                    <h3 className="uae-step__title">{t('WhatsApp?', 'واتساب؟')}</h3>
                    <input className="uae-input" placeholder={t('+971 ...', '+971 ...')} value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                    <div className="uae-opts uae-opts--mt">
                      {['English', 'العربية', t('Either is fine', 'أيهم عادي')].map(l => (
                        <button key={l} className={`uae-opt${selectedLanguage === l ? ' uae-opt--active' : ''}`} onClick={() => setSelectedLanguage(l)}>{l}</button>
                      ))}
                    </div>
                    <label className="uae-consent">
                      <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
                      <span>{t('You can contact me about meeting and my clinic.', 'تقدر تتواصل معي عن لقاء وعيادتي.')}</span>
                    </label>
                  </div>
                )}

                <div className="uae-form-nav">
                  {formStep > 0 && <button className="uae-form-back" onClick={prevFormStep}>{t('← Back', '→ رجوع')}</button>}
                  <span />
                  <button className="uae-btn uae-btn--primary" onClick={nextFormStep}>
                    {formStep === FORM_STEPS.length - 1 ? t("Let\u2019s have karak", 'خلينا نشرب كرك') : t('Continue', 'كمّل')}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
