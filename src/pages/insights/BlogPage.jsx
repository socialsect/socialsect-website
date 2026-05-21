import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import DarkVeil from '../../components/dark-veil/DarkVeil.jsx'
import { submitForm } from '../../lib/submitForm'
import './BlogPage.css'

export default function BlogPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitForm('/api/newsletter', { email, source: 'blog-waitlist' })
      setSubmitted(true)
      setEmail('')
    } catch {
      /* keep form visible */
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="blog-page">
      <div className="blog-breadcrumb">
        <div className="blog-breadcrumb__inner">
          <nav aria-label="Breadcrumb">
            <ol className="blog-breadcrumb__list">
              <li>
                <Link to="/">gosocialsect.com</Link>
              </li>
              <li aria-hidden>
                <ChevronRight strokeWidth={1} className="blog-breadcrumb__sep" />
              </li>
              <li>
                <Link to="/insights">insights</Link>
              </li>
              <li aria-hidden>
                <ChevronRight strokeWidth={1} className="blog-breadcrumb__sep" />
              </li>
              <li>
                <span aria-current="page">blog</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="blog-hero" aria-labelledby="blog-hero-heading">
        <div className="blog-hero__bg-animation" aria-hidden>
          <DarkVeil speed={0.5} />
        </div>

        <div className="blog-hero__inner">
          <p className="blog-hero__eyebrow">Insights for private medical practices</p>
          <h1 id="blog-hero-heading" className="blog-hero__title">
            Blog coming soon
          </h1>
          <p className="blog-hero__sub">
            We are still working on the blog behind the scenes. New articles are being put
            together now and should be coming up any time. If you want a reminder when they are
            live, leave your email below and we will keep you posted.
          </p>

          <div className="blog-coming-soon" aria-labelledby="blog-coming-soon-heading">
            <p className="blog-coming-soon__label">Coming soon</p>
            <h2 id="blog-coming-soon-heading" className="blog-coming-soon__title">
              Want to be reminded when the first posts land?
            </h2>
            <p className="blog-coming-soon__text">
              Fresh posts on patient acquisition, SEO, brand, and practice growth will be here
              shortly. Leave your email and we will send you a note as soon as the blog is live.
            </p>
            <form className="blog-coming-soon__form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="blog-coming-soon-email" className="visually-hidden">
                Email address for blog updates
              </label>
              <input
                id="blog-coming-soon-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="blog-coming-soon__input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitted}
              />
              <button
                type="submit"
                className="blog-coming-soon__submit btn btn-primary"
                disabled={submitting || submitted}
              >
                <span>{submitted ? 'You are on the list' : submitting ? 'Sending...' : 'Remind me'}</span>
                <ArrowRight strokeWidth={1} aria-hidden />
              </button>
            </form>
            <p className="blog-coming-soon__note">
              No spam. Just a quick note through Resend when the blog is ready.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
