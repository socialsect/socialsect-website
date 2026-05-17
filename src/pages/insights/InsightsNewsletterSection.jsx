import { useState } from 'react'

export default function InsightsNewsletterSection() {
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // Hook up to mailing provider when ready
  }

  return (
    <section className="insights-newsletter" aria-labelledby="insights-newsletter-heading">
      <div className="insights-newsletter__inner">
        <h2 id="insights-newsletter-heading" className="insights-newsletter__headline">
          New articles and resources when they&apos;re ready  not on a schedule.
        </h2>
        <p className="insights-newsletter__lede">
          We publish when we have something worth reading. 2–4 times a month. No filler. Unsubscribe
          any time.
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
          />
          <button type="submit" className="insights-newsletter__submit btn btn-primary">
            Keep me posted
          </button>
        </form>

        <p className="insights-newsletter__note">
          No spam. No drip sequence. Just good content.
        </p>
      </div>
    </section>
  )
}
