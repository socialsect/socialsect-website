'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { submitForm } from '../lib/submitForm'
import './ReferenceRequestModal.css'

const INITIAL_FORM = {
  name: '',
  email: '',
  practiceName: '',
  location: '',
  note: '',
}

export default function ReferenceRequestModal({
  open,
  onClose,
  referenceClient,
  referenceCaseMeta,
  pageSpecialty,
  pageSlug,
}) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

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

  useEffect(() => {
    if (!open) {
      setForm(INITIAL_FORM)
      setError('')
      setSubmitted(false)
      setSubmitting(false)
    }
  }, [open])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await submitForm('/api/reference-request', {
        ...form,
        referenceClient: referenceClient ?? '',
        referenceCaseMeta: referenceCaseMeta ?? '',
        pageSpecialty: pageSpecialty ?? '',
        pageSlug: pageSlug ?? '',
      })
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Unable to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="reference-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reference-modal-title"
    >
      <button
        type="button"
        className="reference-modal__backdrop"
        aria-label="Close reference request form"
        onClick={onClose}
        disabled={submitting}
      />
      <div className="reference-modal__panel">
        <button
          type="button"
          className="reference-modal__close"
          onClick={onClose}
          aria-label="Close"
          disabled={submitting}
        >
          <X strokeWidth={1} aria-hidden />
        </button>

        {submitted ? (
          <div className="reference-modal__success">
            <p className="reference-modal__kicker">Request received</p>
            <h3 id="reference-modal-title" className="reference-modal__title">
              We&apos;ll be in touch within 24 hours.
            </h3>
            <p className="reference-modal__sub">
              A member of our team will review your details personally and arrange a short,
              peer-to-peer call with a practice owner closest to your situation. No pitch. No
              packages.
            </p>
            <button type="button" className="reference-modal__submit" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="reference-modal__kicker">Reference call</p>
            <h3 id="reference-modal-title" className="reference-modal__title">
              Request a reference call
            </h3>
          
            <p className="reference-modal__sub">
              Speak directly with a practice we&apos;ve worked with  peer to peer, no pitch. Tell us
              about your practice and we&apos;ll arrange a short conversation with someone in a
              similar situation.
            </p>
            <form className="reference-modal__form" onSubmit={handleSubmit}>
              <label className="visually-hidden" htmlFor="reference-name">
                Your name
              </label>
              <input
                id="reference-name"
                type="text"
                autoComplete="name"
                required
                className="reference-modal__input"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <label className="visually-hidden" htmlFor="reference-email">
                Your email address
              </label>
              <input
                id="reference-email"
                type="email"
                autoComplete="email"
                required
                className="reference-modal__input"
                placeholder="Your email address"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              <label className="visually-hidden" htmlFor="reference-practice">
                Practice name
              </label>
              <input
                id="reference-practice"
                type="text"
                autoComplete="organization"
                required
                className="reference-modal__input"
                placeholder="Practice name"
                value={form.practiceName}
                onChange={(e) => setForm((f) => ({ ...f, practiceName: e.target.value }))}
              />
              <label className="visually-hidden" htmlFor="reference-location">
                Where is your practice based?
              </label>
              <input
                id="reference-location"
                type="text"
                autoComplete="address-level2"
                required
                className="reference-modal__input"
                placeholder="Where is your practice based? (e.g. London, UK)"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
              <label className="visually-hidden" htmlFor="reference-note">
                Anything we should know (optional)
              </label>
              <textarea
                id="reference-note"
                rows={3}
                className="reference-modal__textarea"
                placeholder="Anything we should know? (optional)"
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              />
              {error && (
                <p className="reference-modal__error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="reference-modal__submit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Request the reference call'}
                <ArrowRight strokeWidth={1} aria-hidden />
              </button>
              <p className="reference-modal__fine">
                Your information is never shared or sold. One follow-up maximum.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
