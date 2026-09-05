'use client'

import { useEffect, useState, useRef } from 'react'
import { submitForm } from '../lib/submitForm'
import './BookMeetingModal.css'

const INITIAL_FORM = {
  name: '',
  whatsapp: '',
  clinic: '',
  helpWith: '',
}

const HELP_OPTIONS = [
  'Getting more patients',
  'Converting more leads into bookings',
  'Improving follow-up systems',
  'Running better ROI ads',
  'Building a patient acquisition system',
  'Other',
  'All of the above',
]

function CustomDropdown({ value, onChange, options, placeholder, label }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className="bm-dd" ref={ref}>
      <button
        type="button"
        className={`bm-dd__trigger ${open ? 'bm-dd__trigger--open' : ''} ${value ? 'bm-dd__trigger--filled' : ''}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value || placeholder}</span>
        <svg className={`bm-dd__arrow ${open ? 'bm-dd__arrow--up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <div className="bm-dd__menu">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`bm-dd__option ${value === opt ? 'bm-dd__option--selected' : ''}`}
              onClick={() => { onChange(opt); setOpen(false) }}
            >
              {value === opt && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8194C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              )}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function BookMeetingModal({ open, onClose, t }) {
  const [step, setStep] = useState(1)        // 1 = qualification, 2 = form/result
  const [role, setRole] = useState(null)     // 'clinic_owner', 'doctor', 'patient'
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Reset everything when modal opens/closes
  useEffect(() => {
    if (!open) {
      setStep(1)
      setRole(null)
      setForm(INITIAL_FORM)
      setError('')
      setSubmitted(false)
      setSubmitting(false)
    }
  }, [open])

  // Body scroll lock
  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape' && !submitting) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, submitting])

  const handleQualify = (selectedRole) => {
    setRole(selectedRole)
    setStep(2)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await submitForm('/api/book-a-call', {
        name: form.name,
        email: `${form.whatsapp.replace(/[^0-9]/g, '')}@whatsapp.local`,
        practiceName: form.clinic,
        specialty: 'Other',
        location: 'UAE',
        locations: '1',
        marketing: 'To be discussed',
        challenge: form.helpWith,
        referral: 'Website — Book a meeting CTA',
        goals: [],
        whatsapp: form.whatsapp,
        role: role, // 👈 now we know if they are owner, doctor, or patient
      })
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Unable to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  const label = (en, ar) => (t && t(en, ar)) || en

  return (
    <div className="bm-modal" role="dialog" aria-modal="true" aria-labelledby="bm-modal-title">
      <button
        type="button"
        className="bm-modal__backdrop"
        aria-label="Close"
        onClick={onClose}
        disabled={submitting}
      />
      <div className="bm-modal__panel">
        <button
          type="button"
          className="bm-modal__close"
          onClick={onClose}
          aria-label="Close"
          disabled={submitting}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Step indicator — the "little candle" */}
        <div className="bm-modal__steps">
          <span className={`bm-step ${step === 1 ? 'bm-step--active' : 'bm-step--done'}`}>
            {step === 1 ? '①' : '✓'} {label('Qualify', 'تأهيل')}
          </span>
          <span className="bm-step-line" />
          <span className={`bm-step ${step === 2 && !submitted ? 'bm-step--active' : ''} ${submitted ? 'bm-step--done' : ''}`}>
            {submitted ? '✓' : '②'} {label('Book', 'حجز')}
          </span>
        </div>

        {/* -------- STEP 1: QUALIFICATION -------- */}
        {step === 1 && (
          <div className="bm-qualify">
            <h3 className="bm-modal__title" id="bm-modal-title">
              {label('Are you associated with a medical practice?', 'هل أنت مرتبط بعيادة طبية؟')}
            </h3>
            <p className="bm-modal__sub">
              {label(
                'This meeting is for clinic owners, managers, and doctors who want to grow their practice.',
                'هذا الاجتماع مخصص لأصحاب العيادات، المدراء، والأطباء الذين يرغبون في تنمية عيادتهم.'
              )}
            </p>
            <div className="bm-qualify__options">
              <button
                className="bm-qualify__btn"
                onClick={() => handleQualify('clinic_owner')}
              >
                <span className="bm-qualify__icon">🏥</span>
                {label('Yes – I own / manage a clinic', 'نعم – أملك / أدير عيادة')}
              </button>
              <button
                className="bm-qualify__btn"
                onClick={() => handleQualify('doctor')}
              >
                <span className="bm-qualify__icon">👨‍⚕️</span>
                {label('Yes – I am a doctor / clinician', 'نعم – أنا طبيب / أخصائي')}
              </button>
              <button
                className="bm-qualify__btn bm-qualify__btn--outline"
                onClick={() => handleQualify('patient')}
              >
                <span className="bm-qualify__icon">👤</span>
                {label('No – I am a patient looking for treatment', 'لا – أنا مريض أبحث عن علاج')}
              </button>
            </div>
          </div>
        )}

        {/* -------- STEP 2A: SUBMITTED (success) -------- */}
        {step === 2 && submitted && (
          <div className="bm-modal__success">
            <div className="bm-modal__success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0EB981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 id="bm-modal-title" className="bm-modal__title">
              {label("Ray will be in touch within 24 hours.", "راي راح يتواصل معك خلال 24 ساعة.")}
            </h3>
            <p className="bm-modal__sub">
              {label(
                "If there's a meaningful opportunity, he'll come meet you personally at your clinic.",
                "إذا في فرصة حقيقية، راح يجي لعيادتك شخصيًا."
              )}
            </p>
            <button type="button" className="bm-modal__submit" onClick={onClose}>
              {label('Close', 'إغلاق')}
            </button>
          </div>
        )}

        {/* -------- STEP 2B: PATIENT MESSAGE (no form) -------- */}
        {step === 2 && role === 'patient' && !submitted && (
          <div className="bm-modal__patient">
            <h3 className="bm-modal__title" id="bm-modal-title">
              {label("We're here to help clinics find patients.", 'نحن هنا لمساعدة العيادات في إيجاد المرضى.')}
            </h3>
            <p className="bm-modal__sub">
              {label(
                "This booking system is specifically for clinic owners and doctors. If you're looking for a great clinic, we'd be happy to recommend one – just reach out via the contact page.",
                'نظام الحجز هذا مخصص لأصحاب العيادات والأطباء. إذا كنت تبحث عن عيادة ممتازة، يسعدنا أن نوصيك بواحدة – فقط تواصل معنا عبر صفحة الاتصال.'
              )}
            </p>
            <button type="button" className="bm-modal__submit" onClick={onClose}>
              {label('Got it, close', 'فهمت، إغلاق')}
            </button>
          </div>
        )}

        {/* -------- STEP 2C: BOOKING FORM (clinic_owner / doctor) -------- */}
        {step === 2 && role !== 'patient' && !submitted && (
          <>
            <p className="bm-modal__kicker">{label('BOOK A MEETING', 'احجز اجتماع')}</p>
            <h3 id="bm-modal-title" className="bm-modal__title">
              {label("Meet Ray at your clinic.", "قابل راي في عيادتك.")}
            </h3>
            <p className="bm-modal__sub">
              {label(
                "No Zoom pitch. No 3-step process. He'll come to you and talk about what you actually want to grow.",
                "بدون عرض زوم. بدون عملية ثلاثية. راح يجي لعيادتك ويتكلم عن اللي تبي تنميه."
              )}
            </p>
            <form className="bm-modal__form" onSubmit={handleSubmit}>
              <label className="bm-modal__label">{label('Your name', 'اسمك')}</label>
              <input
                type="text"
                autoComplete="name"
                required
                className="bm-modal__input"
                placeholder={label('Full name', 'الاسم الكامل')}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />

              <label className="bm-modal__label">{label('WhatsApp number', 'رقم واتساب')}</label>
              <input
                type="tel"
                autoComplete="tel"
                required
                className="bm-modal__input"
                placeholder={label('+971 50 123 4567', '+971 50 123 4567')}
                value={form.whatsapp}
                onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
              />

              <label className="bm-modal__label">
                {label("Clinic's name", 'اسم العيادة')}
                <span className="bm-modal__optional"> *</span>
              </label>
              <input
                type="text"
                autoComplete="organization"
                required
                className="bm-modal__input"
                placeholder={label('Your clinic name', 'اسم عيادتك')}
                value={form.clinic}
                onChange={(e) => setForm((f) => ({ ...f, clinic: e.target.value }))}
              />

              <label className="bm-modal__label">{label('What do you need help with?', 'وش تحتاج مساعدة فيه؟')}</label>
              <CustomDropdown
                value={form.helpWith}
                onChange={(val) => setForm((f) => ({ ...f, helpWith: val }))}
                options={HELP_OPTIONS}
                placeholder={label('Select one', 'اختر')}
              />

              {error && (
                <p className="bm-modal__error" role="alert">{error}</p>
              )}

              <button type="submit" className="bm-modal__submit" disabled={submitting}>
                {submitting
                  ? label('Sending...', 'إرسال...')
                  : label('Book a meeting with Ray', 'احجز اجتماع مع راي')
                }
                {!submitting && <span>→</span>}
              </button>
              <p className="bm-modal__fine">
                {label(
                  "Your information is never shared or sold. One follow-up maximum.",
                  "معلوماتك لن تتشارك أو تُباع. متابعة واحدة كحد أقصى."
                )}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}