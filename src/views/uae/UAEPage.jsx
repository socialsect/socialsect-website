'use client'
import { useEffect, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { submitForm } from '../../lib/submitForm'
import './UAEPage.css'

/* ──────────────────────────────────────────────
   1. HERO — Clean, centered, one-line subheading
   2. PROOF — 3 cards: Dr. Fatima, Dr. Musa, Ray
   3. OFFER — "I take the first risk"
   4. VSL — 90-second video section
   5. HARD CTA — Free clinic review
   6. END — Closing with signature
   ────────────────────────────────────────────── */

const PROOF_CARDS = [
  {
    name: 'Dr. Fatima Abdullah',
    clinic: 'Enliven Counselling Center',
    location: 'UAE · Clinic owner',
    image: '/images/dr-fatima-abdullah-new.webp',
    quote: {
      en: "She met me, asked her questions, and chose to move forward. You don\u2019t need my version of why.",
      ar: 'قابلني، سألت أسئلتها، واختارت تكمل. ما تحتاج نسختي عن ليش.',
    },
  },
  {
    name: 'Dr. Musa Nkoto',
    clinic: 'Visage Polyclinic',
    location: 'Dubai · Clinic owner',
    image: '/images/dr-musa.webp',
    quote: {
      en: "Different clinic. Different questions. Same choice: hear the idea properly before making a decision.",
      ar: 'عيادة مختلفة. أسئلة مختلفة. نفس الخيار: تسمع الفكرة صح قبل ما تقرر.',
    },
  },
  {
    name: 'Ray',
    clinic: 'Founder · Socialsect',
    location: "The person you're hiring",
    image: '/team/rayansh.webp',
    quote: {
      en: "Author. Healthcare growth operator. Years spent learning the US & UK market \u2014 now here, personally.",
      ar: 'مؤلف. خبير نمو صحي. سنوات تعلم السوق الأمريكي والبريطاني \u2014 الحين هنا، شخصياً.',
    },
  },
]

const FORM_FIELDS = [
  { key: 'name', placeholder: { en: 'Your name', ar: 'اسمك' } },
  { key: 'email', placeholder: { en: 'Email', ar: 'البريد الإلكتروني' }, type: 'email' },
  { key: 'clinic', placeholder: { en: 'Clinic name', ar: 'اسم العيادة' } },
  { key: 'website', placeholder: { en: 'Website / Instagram (optional)', ar: 'موقع / انستقرام (اختياري)' } },
  { key: 'whatsapp', placeholder: { en: 'WhatsApp number', ar: 'رقم واتساب' } },
]

const REF_FIELDS = [
  { key: 'name', placeholder: { en: 'Your name', ar: 'اسمك' } },
  { key: 'email', placeholder: { en: 'Email', ar: 'البريد الإلكتروني' }, type: 'email' },
  { key: 'clinic', placeholder: { en: 'Clinic name (optional)', ar: 'اسم العيادة (اختياري)' } },
  { key: 'whatsapp', placeholder: { en: 'WhatsApp number', ar: 'رقم واتساب' } },
]

export default function UAEPage() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ss-lang')
      if (saved === 'ar' || saved === 'en') return saved
    }
    return 'en'
  })

  const [leadOpen, setLeadOpen] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', clinic: '', website: '', whatsapp: '' })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(false)

  const [refOpen, setRefOpen] = useState(false)
  const [refName, setRefName] = useState('')
  const [refForm, setRefForm] = useState({ name: '', clinic: '', whatsapp: '' })
  const [refSubmitting, setRefSubmitting] = useState(false)
  const [refSubmitted, setRefSubmitted] = useState(false)

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

  const openLead = () => {
    setLeadForm({ name: '', clinic: '', website: '', whatsapp: '' })
    setLeadSubmitted(false)
    setLeadOpen(true)
  }

  const closeLead = () => setLeadOpen(false)

  const submitLead = async (e) => {
    e.preventDefault()
    if (leadSubmitting) return
    setLeadSubmitting(true)
    try {
      await submitForm('/api/uae-karak', {
        ...leadForm,
        location: 'UAE',
        goal: 'Free clinic review request',
        language: lang,
        consent: true,
        sourcePageUrl: window.location.href,
      })
      setLeadSubmitted(true)
    } catch (err) {
      console.error('Lead form error:', err)
    } finally {
      setLeadSubmitting(false)
    }
  }

  const openReference = (name) => {
    setRefName(name)
    setRefForm({ name: '', clinic: '', whatsapp: '' })
    setRefSubmitted(false)
    setRefOpen(true)
  }

  const closeRef = () => setRefOpen(false)

  const submitRef = async (e) => {
    e.preventDefault()
    if (refSubmitting) return
    setRefSubmitting(true)
    try {
      await submitForm('/api/talk-to-ray', {
        ...refForm,
        message: `Reference request: wants to speak with ${refName}`,
        sourcePageUrl: window.location.href,
      })
      setRefSubmitted(true)
    } catch (err) {
      console.error('Ref form error:', err)
    } finally {
      setRefSubmitting(false)
    }
  }

  return (
    <main className="uae-page">

      {/* ═══════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════ */}
      <section className="uae-hero">
        <div className="wrap uae-hero-inner">
          <button className="uae-lang-toggle" onClick={toggleLang}>
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
          <p className="eyebrow">{t('FOR CLINIC OWNERS & FOUNDERS ACROSS THE UAE', 'لأصحاب العيادات والمستشفيات في الإمارات')}</p>
          <h1>{t('Your clinic should be growing better.', 'عيادتك لازم تنمو أحسن.')}</h1>
          <p className="uae-hero-sub">
            {t('Give me one month.', ' أعطني شهر واحد.')}{' '}
            <em>{t("If we don't hit the result we agree on, you don't pay Socialsect.", 'لو ما نوصل للنتيجة اللي نتفق عليها، ما تدفع لـ Socialsect.')}</em>
          </p>
          <button className="btn" onClick={openLead}>
            {t("Show me what you'd do", 'وريني وش بتسوي')}
            <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </button>
          <p className="cta-note">{t('No long contract. No leap of faith.', 'ما فيه عقد طويل. ما فيه قفزت إيمان.')}</p>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          2. PROOF
          ═══════════════════════════════════════ */}
      <section className="uae-proof">
        <div className="wrap">
          <div className="uae-proof-head">
            <p className="eyebrow">{t('Before you believe me', 'قبل ما تصدقني')}</p>
            <h2>{t('Talk to people who already did.', 'كلم ناس صدقوا قبل.')}</h2>
          </div>

          <div className="uae-proof-grid">
            {PROOF_CARDS.map((card) => (
              <article className="uae-proof-card" key={card.name}>
                <div className="uae-proof-card__img">
                  <img src={card.image} alt={card.name} loading="lazy" decoding="async" />
                </div>
                <div className="uae-proof-card__body">
                  <div className="uae-proof-card__loc">{t(card.location, card.location)}</div>
                  <h3>{card.name}</h3>
                  <div className="uae-proof-card__spec">{card.clinic}</div>
                  <p>{t(card.quote.en, card.quote.ar)}</p>
                  {card.name !== 'Ray' ? (
                    <button className="uae-proof-card__link" onClick={() => openReference(card.name)}>
                      {t('Ask to speak with', 'ابي أتكلم مع')} {card.name.split(' ')[0]} <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button className="uae-proof-card__link" onClick={() => document.getElementById('vsl')?.scrollIntoView({ behavior: 'smooth' })}>
                      {t('Meet Ray in 90 seconds', 'تعرّف على راي في 90 ثانية')} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          3. OFFER
          ═══════════════════════════════════════ */}
      <section className="uae-offer">
        <div className="wrap uae-offer-inner">
          <p className="eyebrow">{t('The offer', 'العرض')}</p>
          <h2>{t('I take the first risk.', 'أنا آخذ المخاطرة الأولى.')}</h2>
          <p className="uae-offer-big">
            {t('We agree on one result that matters to', 'نتفق على نتيجة واحدة تهم')}{' '}
            <strong>{t('your clinic.', 'عيادتك.')}</strong>
            <br />
            {t("If I don\u2019t produce it,", 'لو ما أنجزها,')}{' '}
            <strong>{t('you don\u2019t pay me.', 'ما تدفع لي.')}</strong>
          </p>
          <p className="uae-offer-tiny">
            {t("That's it. No package theatre. No \u201ctrust the process.\u201d", 'بس كذا. ما فيه باقات. ما فيه "ثق بالعمليه".')}
          </p>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          4. VSL
          ═══════════════════════════════════════ */}
      <section className="uae-vsl" id="vsl">
        <div className="wrap uae-vsl-grid">
          <div className="uae-vsl-copy">
            <p className="eyebrow" style={{ color: '#888' }}>{t('90 seconds. That\u2019s all.', '90 ثانية. بس كذا.')}</p>
            <h2>{t('Before you trust me, hear me out.', 'قبل ما تثق فيني، اسمعني.')}</h2>
            <p>{t(
              "Why I came to the UAE, why I won\u2019t copy-paste a US playbook, and why I\u2019m willing to put my fee behind the result.",
              'ليش جيت الإمارات، ليش ما أنسخ خطة أمريكانية، وليش حاضر أحط مكافأتي ورا النتيجة.'
            )}</p>
          </div>
          <div className="uae-video">
            <div className="uae-video-inner">
              <button className="uae-play" aria-label="Play video">&#9654;</button>
              <div className="uae-video-cap">
                &ldquo;{t("I don\u2019t want you to believe another agency pitch.", 'ما أبي تصدق عرض وكالة ثانية.')}&rdquo;
                <small>RAY · {t('FOUNDER, SOCIALSECT', 'مؤسس, SOCIALSECT')}</small>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          5. HARD CTA
          ═══════════════════════════════════════ */}
      <section className="uae-hardcta">
        <div className="wrap uae-hard-inner">
          <span className="uae-free-badge">{t('FREE · BEFORE YOU DECIDE ANYTHING', 'مجاني · قبل ما تقرر أي شيء')}</span>
          <h2>{t('Let me look at your clinic first.', 'خليني أشوف عيادتك أول.')}</h2>
          <p>{t(
            "I'll review what you're doing, what you're trying to grow, and where I think the opportunity is. If I see nothing useful, I'll tell you that too.",
            'بشيك على وش تسوي، وش تبي تنميه، ووين أشوف الفرصة. لو ما أشوف شي مفيد، أقولك بعد.'
          )}</p>
          <button className="btn dark" onClick={openLead}>
            {t('Get my free clinic review', 'احصل على مراجعة عيادتك المجانية')}
            <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </button>
          <p className="uae-small">{t('Takes about 60 seconds to send me the basics.', 'يأخذ حوالي 60 ثانية ترسل الأساسيات.')}</p>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          6. END
          ═══════════════════════════════════════ */}
      <section className="uae-end">
        <div className="wrap uae-end-inner">
          <p className="eyebrow">{t('One last thing', 'شي أخير')}</p>
          <h2>{t('Your clinic already has a story.', 'عيادتك عندها قصة.')}</h2>
          <p className="uae-end-text">
            {t("I'm not here to rewrite it. Just to help more of the right people find it.", 'مو هنا عشان أعيد كتابتها. بس أساعد أكثر الناس الصح يلقونها.')}
          </p>
          <div className="uae-signature">— Ray</div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          LEAD MODAL
          ═══════════════════════════════════════ */}
      {leadOpen && (
        <div className="uae-modal" onClick={closeLead}>
          <div className="uae-modal-box" onClick={e => e.stopPropagation()}>
            <button className="uae-close" onClick={closeLead} aria-label="Close">&times;</button>
            {!leadSubmitted ? (
              <form onSubmit={submitLead}>
                <p className="eyebrow" style={{ color: 'var(--primary)' }}>{t('Free clinic review', 'مراجعة عيادة مجانية')}</p>
                <h3>{t('Give me the basics.', 'أرسل الأساسيات.')}</h3>
                <p style={{ color: 'var(--dark-gray)', marginBottom: 20 }}>
                  {t("I'll look at the clinic before anyone tries to sell you anything.", 'بشوف العيادة قبل أي أحد يبيع لك أي شيء.')}
                </p>
                {FORM_FIELDS.map(f => (
                  <input
                    key={f.key}
                    type={f.type || 'text'}
                    className="uae-field"
                    placeholder={t(f.placeholder.en, f.placeholder.ar)}
                    value={leadForm[f.key]}
                    onChange={e => setLeadForm({ ...leadForm, [f.key]: e.target.value })}
                    required={f.key !== 'website'}
                  />
                ))}
                <button type="submit" className="btn" style={{ width: '100%', marginTop: 14 }} disabled={leadSubmitting}>
                  {leadSubmitting ? t('Sending...', 'إرسال...') : t('Send it to Ray', 'أرسل لراي')}
                  {!leadSubmitting && <ArrowRight size={16} style={{ marginLeft: 8 }} />}
                </button>
              </form>
            ) : (
              <div className="uae-refsuccess">
                <div className="uae-tick"><Check size={28} /></div>
                <h3>{t("That's it.", 'خلاص.')}</h3>
                <p style={{ color: 'var(--dark-gray)' }}>
                  {t("I'll take a look at the clinic first. Then we'll talk only if there's something useful to talk about.", 'بشوف العيادة أول.بعدين نتكلم بس لو فيه شي يستاهل النقاش.')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}


      {/* ═══════════════════════════════════════
          REFERENCE MODAL
          ═══════════════════════════════════════ */}
      {refOpen && (
        <div className="uae-modal" onClick={closeRef}>
          <div className="uae-modal-box" onClick={e => e.stopPropagation()}>
            <button className="uae-close" onClick={closeRef} aria-label="Close">&times;</button>
            {!refSubmitted ? (
              <form onSubmit={submitRef}>
                <p className="eyebrow" style={{ color: 'var(--primary)' }}>{t('Direct reference', 'مرجع مباشر')}</p>
                <h3>{t('Talk to', 'تكلم مع')} {refName}.</h3>
                <p style={{ color: 'var(--dark-gray)', marginBottom: 20 }}>
                  {t("Leave the basics. We'll coordinate the introduction rather than putting anyone's personal number on a public page.", 'أرسل الأساسيات. ننسّق التعريف بدل ما نحط رقم أحد على صفحة عامة.')}
                </p>
                {REF_FIELDS.map(f => (
                  <input
                    key={f.key}
                    type={f.type || 'text'}
                    className="uae-field"
                    placeholder={t(f.placeholder.en, f.placeholder.ar)}
                    value={refForm[f.key]}
                    onChange={e => setRefForm({ ...refForm, [f.key]: e.target.value })}
                    required={f.key !== 'clinic'}
                  />
                ))}
                <button type="submit" className="btn" style={{ width: '100%', marginTop: 14 }} disabled={refSubmitting}>
                  {refSubmitting ? t('Sending...', 'إرسال...') : t('Request introduction', 'طلب تعريف')}
                  {!refSubmitting && <ArrowRight size={16} style={{ marginLeft: 8 }} />}
                </button>
              </form>
            ) : (
              <div className="uae-refsuccess">
                <div className="uae-tick"><Check size={28} /></div>
                <h3>{t('Got it.', 'تم.')}</h3>
                <p style={{ color: 'var(--dark-gray)' }}>
                  {t("We'll check with them and coordinate the introduction around their availability.", 'نشيك معهم وننسّق التعريف حسب توفرهم.')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </main>
  )
}
