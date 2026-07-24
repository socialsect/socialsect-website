'use client'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight, Check } from 'lucide-react'
import LazyDarkVeil from '../../components/dark-veil/LazyDarkVeil.jsx'
import { submitForm } from '../../lib/submitForm'
import './ProductsPage.css'

const PRODUCTS = [
  {
    id: 'whisper',
    title: 'Whisper',
    label: 'Anonymous employee feedback',
    copy:
      'Give your team a safe, anonymous place to share suggestions, concerns, and ideas. Admins see only the feedbacknever the senderso the process stays focused on improvement, not blame.',
    features: [
      'Structured anonymous submissions',
      'Admin-only suggestion review',
      'Clear feedback categories',
      'Actionable insights for leadership',
    ],
    images: ['/products/whisper.webp', '/products/whisper2.webp'],
  },
  
  {
    id: 'dashboard',
    title: 'Client Dashboard',
    label: 'Project progress & accountability',
    copy:
      'A single client-facing workspace where progress is visible, teams stay aligned, and every hand-off is documented. Removes the risk of undocumented work with built-in communication and status transparency.',
    features: [
      'Live project milestones',
      'Client visibility on status',
      'Team roles and ownership',
      'Built-in communication channels',
    ],
    images: ['/products/dash.webp', '/products/dash2.webp'],
  },
]

const WHY_ITEMS = [
  {
    title: 'Safe feedback, faster action',
    text: 'Whisper captures honest team input without exposing who shared it. That means better listening and faster improvement, without the politics.',
  },
  {
    title: 'Documented clarity',
    text: 'The dashboard keeps every update, approval, and hand-off visible. No more guesswork, no more “I thought someone else did it.”',
  },
  {
    title: 'Two products that work together',
    text: 'One product keeps your team honest; the other keeps your clients informed. Use either alone or together to improve accountability across your practice.',
  },
]

const INITIAL_DEMO_FORM = {
  name: '',
  email: '',
  company: '',
  demoOption: 'whisper',
  message: '',
}

export default function ProductsPage() {
  const [form, setForm] = useState(INITIAL_DEMO_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')
    setSubmitting(true)

    try {
      await submitForm('/api/product-demo', {
        ...form,
        formType: 'Product demo request',
      })
      setSubmitted(true)
      setForm(INITIAL_DEMO_FORM)
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="products-page">
      <section className="products-hero" aria-labelledby="products-hero-heading">
        <div className="products-hero__bg-animation" aria-hidden>
          <LazyDarkVeil speed={0.5} />
        </div>

        <div className="products-hero__content">
          <span className="products-hero__eyebrow">Two products. One less chaotic practice.</span>
          <h1 id="products-hero-heading" className="products-hero__heading">
            Whisper and Client Dashboard keep teams aligned and work documented.
          </h1>
          <p className="products-hero__copy">
            These two products solve the most common practice risks: undisclosed problems, undocumented work,
            and clients that feel out of the loop. One tool for safe internal feedback; one tool for clear
            client-facing project progress.
          </p>

          <div className="products-hero__actions">
            <Link to={BOOK_A_CALL_FORM} className="cta cta--primary cta--lg">
              Start with a demo
              <ArrowRight className="cta-icon" strokeWidth={2} aria-hidden />
            </Link>
            <Link to="/services" className="cta cta--secondary">
              Learn more about the platform
              <ArrowRight className="cta-icon" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="products-suite" aria-labelledby="products-suite-heading">
        <div className="products-suite__inner">
          <div className="products-suite__header">
            <span className="section-eyebrow">Product lineup</span>
            <h2 id="products-suite-heading">Two purpose-built tools for practice teams.</h2>
            <p>
              Whisper and Client Dashboard are built to sit alongside your practice operations,
              not replace them. Each solves a specific gap and keeps the process clean.
            </p>
          </div>

          <div className="products-suite__grid">
            {PRODUCTS.map((product) => (
              <article key={product.id} className="product-tile">
                <div className="product-tile__meta">{product.label}</div>
                <h3>{product.title}</h3>
                <p>{product.copy}</p>
                <ul className="product-tile__list">
                  {product.features.map((feature) => (
                    <li key={feature}>
                      <Check className="product-tile__icon" strokeWidth={2} aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="product-tile__images">
                  {product.images.map((src) => (
                    <img key={src} src={src} alt={`${product.title} screenshot`} className="product-tile__image" />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="products-purpose" aria-labelledby="products-purpose-heading">
        <div className="products-purpose__inner">
          <div className="products-purpose__header">
            <span className="section-eyebrow">Why these products matter</span>
            <h2 id="products-purpose-heading">Stop losing clarity where it matters most.</h2>
          </div>

          <div className="products-purpose__grid">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className="purpose-card">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="demo-form" aria-labelledby="demo-form-heading">
        <div className="demo-form__inner">
          <div className="demo-form__info">
            <span className="section-eyebrow">Request a demo</span>
            <h2 id="demo-form-heading">See Whisper, Client Dashboard, or both in action.</h2>
            <p>
              Choose the product you want to demo and share a few details. We&apos;ll follow up to schedule
              a short walkthrough and answer any questions.
            </p>
          </div>

          {submitted ? (
            <div className="demo-form__success" role="status">
              <h3>Thanks  your demo request is on its way.</h3>
              <p>
                We&apos;ll review your request and reach out within 24 hours to schedule the right walkthrough.
              </p>
            </div>
          ) : (
            <form className="demo-form__form" onSubmit={handleSubmit} noValidate>
              <div className="demo-form__fields">
                <label className="demo-form__label" htmlFor="demo-name">
                  Name
                  <input
                    id="demo-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </label>

                <label className="demo-form__label" htmlFor="demo-email">
                  Email
                  <input
                    id="demo-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </label>

                <label className="demo-form__label" htmlFor="demo-company">
                  Practice or company
                  <input
                    id="demo-company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={(e) => updateField('company', e.target.value)}
                  />
                </label>

                <fieldset className="demo-form__fieldset">
                  <legend>Demo request</legend>
                  <label className="demo-form__radio">
                    <input
                      type="radio"
                      name="demoOption"
                      value="whisper"
                      checked={form.demoOption === 'whisper'}
                      onChange={() => updateField('demoOption', 'whisper')}
                    />
                    Whisper
                  </label>
                  <label className="demo-form__radio">
                    <input
                      type="radio"
                      name="demoOption"
                      value="dashboard"
                      checked={form.demoOption === 'dashboard'}
                      onChange={() => updateField('demoOption', 'dashboard')}
                    />
                    Client Dashboard
                  </label>
                  <label className="demo-form__radio">
                    <input
                      type="radio"
                      name="demoOption"
                      value="both"
                      checked={form.demoOption === 'both'}
                      onChange={() => updateField('demoOption', 'both')}
                    />
                    Both
                  </label>
                </fieldset>

                <label className="demo-form__label" htmlFor="demo-message">
                  Message
                  <textarea
                    id="demo-message"
                    name="message"
                    rows="4"
                    placeholder="Tell us the problem you want to solve."
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                  />
                </label>
              </div>

              {submitError ? <p className="demo-form__error">{submitError}</p> : null}

              <button type="submit" className="cta cta--primary cta--lg" disabled={submitting}>
                {submitting ? 'Sending…' : 'Request demo'}
                <ArrowRight className="cta-icon" strokeWidth={2} aria-hidden />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}