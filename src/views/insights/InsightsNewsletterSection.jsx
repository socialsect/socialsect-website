'use client'

import { useState } from 'react'
import { submitForm } from '../../lib/submitForm'

export default function InsightsNewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitForm('/api/newsletter', { email, source: 'insights' })
      setSubmitted(true)
      setEmail('')
    } catch {
      /* form stays visible */
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="insights-newsletter" aria-labelledby="insights-newsletter-heading">
      <div className="insights-newsletter__inner">
        <h2 id="insights-newsletter-heading" className="insights-newsletter__headline">
          New articles and resources when they&apos;re ready  not on a schedule.
        </h2>
        <p className="insights-newsletter__lede">
          The resources have no gate. This is just for new articles when we publish them. We publish
          when we have something worth reading, 2 to 4 times a month. No filler. Unsubscribe any time.
        </p>

        <form className="insights-newsletter__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="insights-newsletter-email" className="visually-hidden">
            Your email address
          </label>
          <input
            id="insights-newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="insights-newsletter__input"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitted}
          />
          <button
            type="submit"
            className="insights-newsletter__submit btn btn-primary"
            disabled={submitting || submitted}
          >
            {submitted ? 'You\'re on the list' : submitting ? 'Sending…' : 'Keep me posted'}
          </button>
        </form>

        <p className="insights-newsletter__note">
          No spam. No drip sequence. Just good content.
        </p>
      </div>
    </section>
  )
}
