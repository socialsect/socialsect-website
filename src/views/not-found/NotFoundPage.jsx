'use client'
import { Link } from 'react-router-dom'
import { ArrowRight, Home } from 'lucide-react'
import BookCallLink from '../../components/BookCallLink'
import NotFoundIllustration from './NotFoundIllustration'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <section className="not-found__hero" aria-labelledby="not-found-heading">
        <div className="not-found__inner">
          <p className="not-found__code">404</p>
          <NotFoundIllustration />
          <p className="not-found__eyebrow">Page not found</p>
          <h1 id="not-found-heading" className="not-found__title">
            This path doesn&apos;t lead anywhere we&apos;ve built yet.
          </h1>
          <p className="not-found__lede">
            The page may have moved, or the link might be outdated. If you were looking to start a
            conversation about your practice, that&apos;s one click away.
          </p>
          <div className="not-found__actions">
            <Link to="/" className="btn btn-primary not-found__btn">
              <Home className="not-found__btn-icon" strokeWidth={1} aria-hidden />
              Back to home
            </Link>
            <BookCallLink className="btn btn-secondary not-found__btn">
              Book a practice audit
              <ArrowRight className="not-found__btn-icon" strokeWidth={1} aria-hidden />
            </BookCallLink>
          </div>
          <nav className="not-found__links" aria-label="Helpful links">
            <Link to="/services">Services</Link>
            <Link to="/results">Results</Link>
            <Link to="/how-we-work">How we work</Link>
            <Link to="/who-we-help">Who we help</Link>
          </nav>
        </div>
      </section>
    </main>
  )
}
