'use client'
import { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { submitForm } from '../../lib/submitForm'
import './UAEPage.css'

const MARQUEE_LOGOS = [
  { src: '/client-logos/interface1.webp', screen: false, wide: false },
  { src: '/client-logos/msi.webp', screen: false, wide: false },
  { src: '/client-logos/nymv.webp', screen: true, wide: false },
  { src: '/client-logos/III.webp', screen: false, wide: true },
]

const TRACK_RECORD = [
  { value: '10,000+', label: 'Consultations booked for clients' },
  { value: '$10M+', label: 'Patient pipeline generated' },
  { value: '4.2x', label: 'Average client ROI' },
  { value: '300%', label: 'Consults up in 6 months for one practice' },
]

const PROOF_POINTS = [
  { value: '2,971', label: 'Leads generated' },
  { value: '700+', label: 'Booked consultations' },
  { value: '$5.27', label: 'Average cost per lead' },
  { value: '$100k+', label: 'Attributed revenue' },
]

const SPECIALTIES = [
  { name: 'Dermatology', copy: 'Consultations, not clicks. For clinics that treat skin like a medical specialty.' },
  { name: 'MedSpa & aesthetics', copy: 'Systems for practices that need bookings, not browsable galleries.' },
  { name: 'Plastic surgery', copy: 'High-ticket patients who research hard — and book with the practice that earns trust online.' },
  { name: 'Orthopaedics & sports medicine', copy: 'Referrer relationships and search profiles that put your surgeons in front of the right procedures.' },
  { name: 'Dentistry & orthodontics', copy: 'From cosmetic dentistry to implants — pipelines built around case value, not lead volume.' },
  { name: 'Vein & vascular clinics', copy: 'The same acquisition discipline that made our US vein clinic clients multiply their consults.' },
  { name: 'Fertility clinics', copy: 'Sensitive, considered decisions. Proven systems for moving patients from research to consultation.' },
  { name: 'Hair transplant', copy: 'An inbound channel that books months out, when the system behind it is built right.' },
]

const MIN_TILES_PER_HALF = 14

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
  const [lang, setLang] = useState('en')
  const [formStep, setFormStep] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', clinic: '', website: '', location: '', goal: '', whatsapp: '', language: '' })
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [consent, setConsent] = useState(false)
  const formCardRef = useRef(null)

  const marqueeTrack = useMemo(() => {
    const half = []
    let i = 0
    while (half.length < MIN_TILES_PER_HALF) {
      half.push(MARQUEE_LOGOS[i % MARQUEE_LOGOS.length])
      i += 1
    }
    return [...half, ...half]
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('ss-lang')
    if (saved === 'ar' || saved === 'en') setLang(saved)
  }, [])

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

  return (
    <main className="uae-page">
      {/* ─── HERO ─── */}
      <section className="uae-hero" aria-labelledby="uae-hero-heading">
        <div className="uae-hero__bg" aria-hidden="true">
          <img src="/images/dubai-hero.webp" alt="" className="uae-hero__bg-image" fetchPriority="high" decoding="async" />
          <div className="uae-hero__overlay" />
        </div>
        <div className="uae-hero__content">
          <div className="uae-hero__main">
            <div className="uae-hero-copy">
              <p className="uae-hero-eyebrow">
                <span className="uae-hero-eyebrow__line" aria-hidden="true" />
                {t('FOR CLINIC OWNERS & FOUNDERS ACROSS THE UAE', 'لأصحاب العيادات والمستشفيات في الإمارات')}
              </p>
              <h1 id="uae-hero-heading" className="uae-hero-headline">
                <span className="uae-hero-headline__line">{t('Your clinic is good.', 'عيادتك ممتازة.')}</span>
                <span className="uae-hero-headline__line">{t('The doctors are good.', 'الأطباء ممتازين.')}</span>
                <span className="uae-hero-headline__line">{t('The reputation is good.', 'السمعة ممتازة.')}</span>
                <span className="uae-hero-headline__line uae-hero-headline__line--gradient">
                  {t('Yaani… something should be working better.', 'يعني… شي لازم يشتغل أحسن.')}
                </span>
              </h1>
              <p className="uae-hero-subheadline">
                <strong>{t('Let me prove what I can do before you take the risk.', 'خليني أثبت لك وش أسوي قبل ما تاخذ المخاطرة.')}</strong>
              </p>
              <p className="uae-hero-subheadline">
                {t('Give me one month with your clinic.', ' أعطني شهر واحد مع عيادتك.')}<br />
                {t("You don't pay Socialsect until we produce the result we agree on together.", 'ما تدفع لـ Socialsect إلا لما نوصل للنتيجة اللي نتفق عليها.')}<br />
                {t('No long contract. No leap of faith.', 'ما فيه عقد طويل. ما فيه قفزت إيمان.')}<br />
                {t("If I can't create something worth paying for, khalas — you don't.", 'لو ما قدرت أساوي شي يستاهل الدفع، خلاص — ما تدفع.')}
              </p>
              <div className="uae-hero-cta-buttons">
                <a href="#form-section" className="uae-hero-btn uae-hero-btn--primary">
                  {t("Let's have karak →", 'خلينا نشرب كرك ←')}
                </a>
                <a href="#ray-section" className="uae-hero-btn uae-hero-btn--secondary">
                  {t('Who is Ray?', 'مين راي؟')}
                </a>
              </div>
              <p className="uae-hero-note">
                {t("I'm in the UAE. If there's something worth discussing, I'll come meet you personally.", 'أنا في الإمارات. لو فيه شي يستاهل النقاش، بجي أقابلك شخصياً.')}
              </p>
            </div>
            <blockquote className="uae-hero-testimonial">
              <span className="uae-hero-testimonial__quote" aria-hidden="true">&ldquo;&rdquo;</span>
              <p className="uae-hero-testimonial__text">
                {t('Since working with Socialsect, our consults increased by 300% in 6 months.', 'من يوم ما اشتغلنا مع Socialsect، استشاراتنا زادت 300% في 6 شهور.')}
              </p>
              <span className="uae-hero-testimonial__divider" aria-hidden="true" />
              <footer className="uae-hero-testimonial__attribution">
                <cite>Dr. Christopher</cite>
                <span>Boca Raton Clinic · US</span>
              </footer>
            </blockquote>
          </div>
          <div className="uae-hero-trust">
            <p className="uae-hero-trust__label">{t('Trusted by leading practices in the US & UK', 'موثوق من عيادات رائدة في أمريكا وبريطانيا')}</p>
          </div>
        </div>
      </section>

      {/* ─── OBJECTION CARDS ─── */}
      <section className="uae-objections" aria-label="Common concerns">
        <div className="uae-objections__inner">
          {[
            {
              q: { en: 'What if it doesn\u2019t work?', ar: 'وين ما نفع؟' },
              a: { en: 'Then you don\u2019t pay us. That\u2019s the deal.', ar: 'فـ ما تدفع لنا. هذا الاتفاق.' },
            },
            {
              q: { en: '\u201cWe\u2019ve tried agencies.\u201d', ar: '"جربنا وكالات قبل."' },
              a: { en: "That\u2019s why we don\u2019t ask you to trust a pitch. We\u2019d rather show you.", ar: 'هذا بالضبط ليش ما نطلب منك تثق بعرض. نفضل نوريك.' },
            },
            {
              q: { en: 'Will this work for my clinic?', ar: 'هالشي ينفع لعيادتي؟' },
              a: { en: 'We build around your clinic. Not a package.', ar: 'نبني حول عيادتك. مو باقة.' },
            },
            {
              q: { en: 'Who am I actually dealing with?', ar: 'مين أتعامل معه فعلاً؟' },
              a: { en: 'Ray. And he\u2019ll meet you here in the UAE.', ar: 'راي. وبيقابلك هنا في الإمارات.' },
            },
          ].map((card, i) => (
            <div className="uae-objection" key={i}>
              <h3 className="uae-objection__q">{t(card.q.en, card.q.ar)}</h3>
              <p className="uae-objection__a">{t(card.a.en, card.a.ar)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHAT WOULD YOU DO ─── */}
      <section className="uae-would" aria-labelledby="uae-would-heading">
        <div className="uae-would__inner">
          <div className="uae-would__left">
            <p className="uae-would__eyebrow">{t('What we\u2019d actually do for your clinic', 'وش فعلاً نسوي لعيادتك')}</p>
            <h2 id="uae-would-heading" className="uae-would__headline">
              {t("We don\u2019t start with a pitch.", 'ما نبدأ بعرض.')}
            </h2>
          </div>
          <div className="uae-would__right">
            <p className="uae-would__step">{t("We come see the clinic.", 'نجي نشوف العيادة.')}</p>
            <p className="uae-would__step">{t('Understand what you want to grow.', 'نفهم وش تبي تنميه.')}</p>
            <p className="uae-would__step">{t("See what\u2019s already working.", 'نشوف وش يشتغل.')}</p>
            <p className="uae-would__step">{t("See what\u2019s not.", 'نشوف وش لا.')}</p>
            <p className="uae-would__step">{t("Then we tell you what we\u2019d do if it were our clinic.", 'بعدين نقولك وش نسوي لو عيادتنا.')}</p>
          </div>
        </div>
        <div className="uae-would__close">
          <p className="uae-would__close-line">{t('If you like the thinking, we build it.', 'إذا عجبك التفكير، نبنيه.')}</p>
          <p className="uae-would__close-line uae-would__close-line--purple">{t("If you don\u2019t \u2014 khalas.", 'إلا — خلاص.')}</p>
          <p className="uae-would__karak">{t('The karak is still on me.', 'الكرك عليّ.')}</p>
        </div>
      </section>

      {/* ─── RAY ─── */}
      <section className="uae-section uae-section--light" id="ray-section" aria-labelledby="uae-ray-heading">
        <div className="uae-section__inner">
          <div className="uae-ray-grid">
            <div className="uae-ray-card">
              <div>
                <p className="uae-eyebrow uae-eyebrow--light">Ray</p>
                <p className="uae-ray-scribble">{t("We take your clinic\u2019s name seriously.", 'نأخذ اسم عيادتك بجدية.')}</p>
              </div>
              <div>
                <p className="uae-ray-card-text">{t('Your clinic has your name, reputation, and years of work behind it. We treat that with the same seriousness we\u2019d treat our own.', 'عيادتك فيها اسمك وسمعتك وسنين شغل وراها. نتعامل مع هالشي بنفس الجدية اللي نتعامل فيها مع عيادتنا.')}</p>
                <p className="uae-ray-sig">— Ray</p>
              </div>
            </div>
            <div className="uae-ray-copy">
              <p className="uae-eyebrow">{t('The person on the other side', 'الشخص على الطرف الثاني')}</p>
              <h2 id="uae-ray-heading" className="uae-headline">
                {t('We want to know your clinic before we tell you how to grow it.', 'نبي نعرف عيادتك قبل ما نقولك كيف تنموها.')}
              </h2>
              <p className="uae-lead">{t('What\u2019s working? What isn\u2019t? Which patients do you actually want more of? What have you already tried?', 'وش يشتغل؟ وش لا؟ أي مرضى تبيهم أكثر؟ وش جربته قبل؟')}</p>
              <p className="uae-lead">{t("We\u2019ll be direct. If we think we can help, we\u2019ll tell you how. If we can\u2019t, we\u2019ll tell you that too.", 'بنكون صريحين. لو نقدر نساعد، نقولك كيف. لو ما نقدر، نقولك بعد.')}</p>
              <p className="uae-lead"><strong>{t("No account-manager theatre. No pressure to sign while we\u2019re sitting together.", 'ما فيه دراما. ما فيه ضغط نوقع وأنت جالس معنا.')}</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OFFER ─── */}
      <section className="uae-section uae-section--light" aria-labelledby="uae-offer-heading">
        <div className="uae-section__inner">
          <div className="uae-offer-grid">
            <div>
              <p className="uae-eyebrow">{t('If we decide to work together', 'لو قررنا نشتغل مع بعض')}</p>
              <h2 id="uae-offer-heading" className="uae-headline">
                {t('Built around your clinic.', 'مبني حول عيادتك.')}<br />{t('Not our package.', 'مو باقتنا.')}
              </h2>
              <p className="uae-lead">{t("You shouldn't have to figure out five different vendors or translate your clinic to an agency every week.", 'ما理يك تفكر بخمس موردين مختلفين أو تترجم عيادتك لوكالة كل أسبوع.')}</p>
              <p className="uae-lead">{t("You take care of the medicine. We'll take care of making the growth side make sense.", 'إنت تعتني بالطب. إحنا نعتني إن الجنب اللي ينمو يصير منطقي.')}</p>
            </div>
            <div className="uae-offer-card">
              {[
                { title: { en: 'Your clinic. Your priorities.', ar: 'عيادتك. أولوياتك.' }, sub: { en: 'We build around what you actually want to grow.', ar: 'نبني حول اللي تبيه فعلاً تنميه.' } },
                { title: { en: 'English + العربية when needed.', ar: 'إنجليزي + عربي когда нужно.' }, sub: { en: 'Because this is the UAE, not a copied US campaign with AED added.', ar: 'لأن هذي الإمارات، مو حملة أمريكانية مقلوبة مضاف لها درهم.' } },
                { title: { en: 'One team around the growth.', ar: 'فريق واحد حول النمو.' }, sub: { en: 'Strategy, creative, paid acquisition, web, search and follow-up where they make sense.', ar: 'استراتيجية، إبداع، اكتتاب مدفوع، ويب، بحث ومتابعة وين ما تناسب.' } },
                { title: { en: 'Ray stays close.', ar: 'راي يبقى قريب.' }, sub: { en: "You don't become another logo on a dashboard after onboarding.", ar: 'ما تصير شعار ثاني على لوحة معلومات بعد التسجيل.' } },
              ].map((item, i) => (
                <div className="uae-offer-line" key={i}>
                  <span className="uae-check">✓</span>
                  <div><strong>{t(item.title.en, item.title.ar)}</strong><small>{t(item.sub.en, item.sub.ar)}</small></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROOF ─── */}
      <section className="uae-section uae-section--light" aria-labelledby="uae-proof-heading">
        <div className="uae-section__inner">
          <p className="uae-eyebrow">{t('Proof, not a promise', 'أدلة، مو وعد')}</p>
          <h2 id="uae-proof-heading" className="uae-headline">
            {t("We've done this with doctors before.", 'سوينا هالشي مع أطباء قبل.')}
          </h2>
          <div className="uae-proof-grid">
            <div className="uae-proof-card">
              <div>
                <div className="uae-proof-num">700+</div>
                <h3>{t('booked consultations', 'استشارات محجوزة')}</h3>
                <p>{t('for one medical practice in approximately five months.', 'لعيادة طبية واحدة في حوالي خمس شهور.')}</p>
              </div>
              <div className="uae-disclaimer">{t('2,971 patient enquiries generated during the engagement. Past case study — your clinic will be different.', '2,971 استفور مريض تم توليدها خلال التعاون. دراسة حالة سابقة — عيادتك بتكون مختلفة.')}</div>
            </div>
            <div className="uae-proof-card">
              <div>
                <div className="uae-proof-num">225+</div>
                <h3>{t('booked consultations', 'استشارات محجوزة')}</h3>
                <p>{t('for Miami Shoulder Institute / Dr. Alejandro Badia.', 'لمعهد ميامي للكتف / د. أليخاندرو باديا.')}</p>
              </div>
              <div className="uae-disclaimer">{t('2,572 enquiries · approximately $22,963 in ad spend. US case study — not a UAE projection.', '2,572 استفور · حوالي $22,963 في صرف إعلاني. دراسة حالة أمريكية — مو توقع إماراتي.')}</div>
            </div>
          </div>
          <p className="uae-lead">
            <strong>{t('Those are their numbers. Yours will be different.', 'هذي أرقامهم. أرقامك بتكون مختلفة.')}</strong>{' '}
            {t('Different clinic. Different patients. Different treatment economics. We\'d rather understand yours than pretend somebody else\'s results are a promise.', 'عيادة مختلفة. مرضى مختلفين. اقتصادات علاج مختلفة. نفضل نفهم أرقامك من إننا نتظاهر إن نتائج غيرك هي وعد.')}
          </p>
        </div>
      </section>

      {/* ─── CLIENT LOGO MARQUEE ─── */}
      <section className="uae-marquee" aria-label="Client logos">
        <div className="uae-marquee__viewport">
          <div className="uae-marquee__track">
            {marqueeTrack.map(({ src, screen, wide }, i) => (
              <div
                key={`${src}-${i}`}
                className={`uae-marquee__item${screen ? ' uae-marquee__item--screen' : ''}${wide ? ' uae-marquee__item--wide' : ''}`}
              >
                <img src={src} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE EXPANSION ─── */}
      <section className="uae-expansion" aria-labelledby="uae-expansion-heading">
        <div className="uae-expansion__animation" aria-hidden="true">
          <div className="uae-expansion__aurora uae-expansion__aurora--a" />
          <div className="uae-expansion__aurora uae-expansion__aurora--b" />
          <div className="uae-expansion__veil" />
        </div>
        <div className="uae-expansion__inner">
          <div className="uae-expansion__intro">
            <p className="uae-expansion__eyebrow">{t('The expansion', 'التوسع')}</p>
            <h2 id="uae-expansion-heading" className="uae-expansion__headline">
              {t("The UAE doesn\u2019t need another agency.", 'الإمارات ما تحتاج وكالة ثانية.')} <em>{t('It needs a system.', 'تحتاج نظام.')}</em>
            </h2>
            <p className="uae-expansion__copy">
              {t("We\u2019ve spent years inside private practices in the US and the UK \u2014 diagnosing acquisition gaps, rebuilding websites, running paid growth, and being held accountable to one number: patients in the chair.", 'قضينا سنوات داخل عيادات خاصة في أمريكا وبريطانيا — نشوف الفجوات في اكتساب المرضى، نعيد بناء المواقع، نشغّل الإعلانات المدفوعة، ونتحاسب على رقم واحد: المرضى على الكرسي.')}
            </p>
            <p className="uae-expansion__copy">
              {t("That\u2019s the playbook we\u2019re bringing to the UAE.", 'هذا المخطط اللي نجيبه للإمارات.')}
            </p>
          </div>
          <div className="uae-expansion__route" aria-label="Where Socialsect has run">
            {[
              { name: 'US', status: 'Proven', active: true },
              { name: 'UK', status: 'Proven', active: true },
              { name: 'UAE', status: 'We are here', active: false },
            ].map((market, i) => (
              <div className="uae-expansion__market" key={market.name}>
                <div className="uae-expansion__market-top">
                  <span className={`uae-expansion__dot${market.active ? ' uae-expansion__dot--active' : ''}`} aria-hidden="true" />
                  {i < 2 && <span className="uae-expansion__route-line" aria-hidden="true" />}
                </div>
                <p className="uae-expansion__market-name">{market.name}</p>
                <p className="uae-expansion__market-status">{market.status}</p>
              </div>
            ))}
          </div>
          <div className="uae-expansion__pillars">
            {[
              { num: '01', title: 'Build', copy: 'Practice websites, booking systems, and web applications engineered to turn visitors into booked consultations.', href: '/services#build' },
              { num: '02', title: 'Grow', copy: 'Meta ads, Google ads, and SEO run as one system \u2014 tracked, measured, and reported in appointments, not impressions.', href: '/services#grow' },
              { num: '03', title: 'Brand', copy: 'Identity, design, and video that make the clinical standard of your practice impossible to miss.', href: '/services#brand' },
            ].map(({ num, title, copy, href }) => (
              <div className="uae-expansion__pillar" key={num}>
                <span className="uae-expansion__pillar-num">{num}</span>
                <h3 className="uae-expansion__pillar-title">{title}</h3>
                <p className="uae-expansion__pillar-copy">{copy}</p>
                <Link href={href} className="uae-expansion__pillar-link">
                  {t('Explore', 'استكشف')} {title.toLowerCase()} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE RECORD ─── */}
      <section className="uae-record" aria-labelledby="uae-record-heading">
        <div className="uae-record__inner">
          <header className="uae-record__intro">
            <p className="uae-record__eyebrow">{t('The record', 'السجل')}</p>
            <h2 id="uae-record-heading" className="uae-record__headline">
              {t("The numbers we\u2019re bringing to the UAE.", 'الأرقام اللي نجيبها للإمارات.')}
              <br />
              <em>{t('Nothing rounded up.', 'ما فيه округال.')}</em>
            </h2>
          </header>
          <div className="uae-record__stats">
            {TRACK_RECORD.map(({ value, label }) => (
              <div className="uae-record__stat" key={label}>
                <span className="uae-record__stat-value">{value}</span>
                <span className="uae-record__stat-label">{label}</span>
              </div>
            ))}
          </div>
          <div className="uae-record__proof-panel">
            <div className="uae-record__proof-main">
              <p className="uae-record__proof-kicker">{t('In one engagement', 'في تعاون واحد')}</p>
              <p className="uae-record__proof-copy">
                {t("A rebuilt acquisition system, first months, one US client. The same discipline we apply to every market we enter.", 'نظام اكتساب معاد بناؤه، أول شهور، عميل أمريكي واحد. نفس الانضباط اللي نطبقه في كل سوق ندخله.')}
              </p>
            </div>
            <ul className="uae-record__proof-list">
              {PROOF_POINTS.map(({ value, label }) => (
                <li className="uae-record__proof-item" key={label}>
                  <span className="uae-record__proof-value">{value}</span>
                  <span className="uae-record__proof-label">{label}</span>
                </li>
              ))}
            </ul>
            <p className="uae-record__proof-attribution">NY Metrovein Medical &middot; US</p>
          </div>
        </div>
      </section>

      {/* ─── SPECIALTIES ─── */}
      <section className="uae-specialties" aria-labelledby="uae-specialties-heading">
        <div className="uae-specialties__inner">
          <header className="uae-specialties__intro">
            <p className="uae-specialties__eyebrow">{t('Who we work with', 'مع مين نشتغل')}</p>
            <h2 id="uae-specialties-heading" className="uae-specialties__headline">
              {t('Built for private practices.', 'مبني للعيادات الخاصة.')}
              <br />
              <em>{t('Made for the UAE.', 'مصمم للإمارات.')}</em>
            </h2>
            <p className="uae-specialties__subcopy">
              {t("The same specialties we\u2019ve grown in the US and UK \u2014 now running the same playbook in the UAE.", 'نفس التخصصات اللي نمّيناها في أمريكا وبريطانيا — الحين نشغّل نفس المخطط في الإمارات.')}
            </p>
          </header>
          <div className="uae-specialties__grid">
            {SPECIALTIES.map(({ name, copy }, i) => (
              <div className="uae-specialties__card" key={name}>
                <span className="uae-specialties__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="uae-specialties__title">{name}</h3>
                <p className="uae-specialties__copy">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="uae-closing" aria-labelledby="uae-closing-heading">
        <div className="uae-closing__bg" aria-hidden="true">
          <div className="uae-closing__overlay" />
        </div>
        <div className="uae-closing__inner">
          <h2 id="uae-closing-heading" className="uae-closing__headline">
            {t("The UAE is moving fast. Your patient pipeline should move Faster.", 'الإمارات تتحرك بسرعة. أنابيب المرضى لازم تتحرك أول.')}
          </h2>
          <p className="uae-closing__body">
            {t("No pitch. No packages. Just the system we\u2019ve proven across two markets \u2014 applied to your practice in the UAE.", 'ما فيه عرض. ما فيه باقات. بس النظام اللي أثبناه في سوقين — نطبّقه على عيادتك في الإمارات.')}
          </p>
          <div className="uae-closing__actions">
            <a href="#form-section" className="uae-closing__btn uae-closing__btn--primary">
              {t("Let\u2019s have karak", 'خلينا نشرب كرك')}
            </a>
            <a href="mailto:hello@gosocialsect.com" className="uae-closing__btn uae-closing__btn--ghost">
              {t('Email us directly', 'راسلنا مباشرة')}
            </a>
          </div>
        </div>
      </section>

      {/* ─── KARAK CTA ─── */}
      <section className="uae-section uae-section--lav" id="karak" aria-labelledby="uae-karak-heading">
        <div className="uae-section__inner">
          <div className="uae-karak-letter">
            <p className="uae-eyebrow uae-eyebrow--purple">{t('No sales call', 'ما فيه مكالمة مبيعات')}</p>
            <h2 id="uae-karak-heading" className="uae-headline">{t("Let\u2019s have karak.", 'خلينا نشرب كرك.')}</h2>
            <p className="uae-karak-sub">
              {t('You tell us about the clinic.', 'إنت تقولنا عن العيادة.')}<br />
              {t('We ask a few questions.', 'نسأل كم سؤال.')}<br />
              {t('We tell you what we see.', 'نقولك وش نشوف.')}
            </p>
            <p className="uae-lead">{t('No deck. No 45-minute pitch. No pressure to decide anything there.', 'ما فيه عرض. ما فيه بيتشر 45 دقيقة. ما فيه ضغط تقرر أي شيء هناك.')}</p>
            <p className="uae-lead"><strong>{t("If you\u2019re in Dubai, Abu Dhabi, Sharjah \u2014 or elsewhere in the UAE \u2014 and it makes sense, we\u2019ll come meet you personally.", 'لو أنت في دبي، أبوظبي، الشارقة — أو أي مكان في الإمارات — ويناسب، نجيك شخصياً.')}</strong></p>
            <p className="uae-lead">{t('Maybe we find something worth building together. Maybe we don\u2019t.', 'يمكن نلقى شي يستاهل نبنيه مع بعض. يمكن لا.')}</p>
            <p className="uae-karak-close">{t('Either way, shukran for the karak.', 'بكل الأحوال، شكراً على الكرك.')}</p>
            <a href="#form-section" className="uae-hero-btn uae-hero-btn--primary" style={{ marginTop: 20 }}>
              {t('Tell Ray where to meet →', 'قول لراي وين تقابلون ←')}
            </a>
          </div>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="uae-section uae-section--light" id="form-section" aria-labelledby="uae-form-heading">
        <div className="uae-section__inner">
          <div className="uae-form-grid">
            <div>
              <p className="uae-eyebrow">{t("That's enough about me", ' خلنا نكفي عن كلامي')}</p>
              <h2 id="uae-form-heading" className="uae-headline">{t('Where should we have karak?', 'وين نشرب كرك؟')}</h2>
              <p className="uae-lead">{t("Just enough for me to know who I'm meeting.", 'بس عشان أعرف مين بقابله.')}</p>
              <p className="uae-lead"><strong>{t('English or العربية — whichever is easier.', 'إنجليزي أو عربي — أيهم أسهل.')}</strong></p>
            </div>
            <div className="uae-form-card" ref={formCardRef}>
              <div className="uae-progress"><div className="uae-progress-bar" style={{ width: `${((formStep + 1) / (FORM_STEPS.length + 1)) * 100}%` }} /></div>

              {formSubmitted ? (
                <div className="uae-done">
                  <div className="uae-done-tick">✓</div>
                  <p className="uae-eyebrow uae-eyebrow--purple">{t('Khalas.', 'خلاص.')}</p>
                  <h3 className="uae-headline">{t('Karak soon,', 'كرك قريباً،')} {formData.name || 'Doctor'}.</h3>
                  <p className="uae-lead">{t("I'll look at the clinic before we meet, so we can skip the introductions and talk about what actually matters.", 'بتشوف العيادة قبل ما نتقابل، عشان نتجاوز التعريف ونتكلم عن اللي يهم فعلاً.')}</p>
                  <div className="uae-done-box">
                    <strong>{t('What happens next?', 'وش يصير بعدين？')}</strong>
                    <p>{t("A real person from our UAE team reviews what you've shared, then contacts you in English or Arabic.", 'شخص حقيقي من فريق الإمارات يشيك على اللي كتبته، ويتواصل معك بالإنجليزي أو العربي.')}</p>
                  </div>
                  <div className="uae-done-whatsapp">
                    <small>Socialsect UAE · WhatsApp</small>
                    <div>{t('Hi', 'مرحبا')} {formData.name || 'there'}, {t("Ray's team here. We had a look at your clinic…", 'فريق راي هنا. شفنا عيادتك…')}</div>
                  </div>
                  <p className="uae-ray-sig">— Ray</p>
                </div>
              ) : (
                <>
                  {/* Step 0: Name */}
                  {formStep === 0 && (
                    <div className="uae-step">
                      <h3 className="uae-step-title">{t("What's your name?", 'وش اسمك؟')}</h3>
                      <input className="uae-field" placeholder={t('Your name', 'اسمك')} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                  )}
                  {/* Step 1: Clinic */}
                  {formStep === 1 && (
                    <div className="uae-step">
                      <h3 className="uae-step-title">{t('Which clinic?', 'أي عيادة؟')}</h3>
                      <input className="uae-field" placeholder={t('Clinic name', 'اسم العيادة')} value={formData.clinic} onChange={e => setFormData({...formData, clinic: e.target.value})} />
                      <input className="uae-field" placeholder={t('Website or Instagram (optional)', 'موقع أو انستقرام (اختياري)')} value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} style={{ marginTop: 12 }} />
                    </div>
                  )}
                  {/* Step 2: Location */}
                  {formStep === 2 && (
                    <div className="uae-step">
                      <h3 className="uae-step-title">{t('Where in the UAE?', 'وين في الإمارات؟')}</h3>
                      <div className="uae-options">
                        {['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', t('Somewhere else', 'مكان آخر')].map(loc => (
                          <button key={loc} className={`uae-opt${selectedLocation === loc ? ' uae-opt--chosen' : ''}`} onClick={() => setSelectedLocation(loc)}>{loc}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Step 3: Goal */}
                  {formStep === 3 && (
                    <div className="uae-step">
                      <h3 className="uae-step-title">{t('One thing you want to change?', 'شيء واحد تبيه يتغير؟')}</h3>
                      <textarea className="uae-field uae-field--textarea" placeholder={t('Say it normally. No marketing language.', 'قولها عادي. بدون لغة تسويق.')} value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} />
                    </div>
                  )}
                  {/* Step 4: WhatsApp */}
                  {formStep === 4 && (
                    <div className="uae-step">
                      <h3 className="uae-step-title">{t('WhatsApp?', 'واتساب؟')}</h3>
                      <input className="uae-field" placeholder={t('+971 ...', '+971 ...')} value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                      <div className="uae-options" style={{ marginTop: 18 }}>
                        {['English', 'العربية', t('Either is fine', 'أيهم عادي')].map(l => (
                          <button key={l} className={`uae-opt${selectedLanguage === l ? ' uae-opt--chosen' : ''}`} onClick={() => setSelectedLanguage(l)}>{l}</button>
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
                    <button className="uae-hero-btn uae-hero-btn--primary" onClick={nextFormStep}>
                      {formStep === FORM_STEPS.length - 1 ? t("Let's have karak →", 'خلينا نشرب كرك ←') : t('Continue →', 'كمّل ←')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
