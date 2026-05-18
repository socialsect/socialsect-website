import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Video, FileText, BookOpen } from 'lucide-react'
import InsightsTestimonialsSection from './InsightsTestimonialsSection'
import InsightsBlogSection from './InsightsBlogSection'
import InsightsResourcesSection from './InsightsResourcesSection'
import InsightsNewsletterSection from './InsightsNewsletterSection'
import InsightsClosingCtaSection from './InsightsClosingCtaSection'
import './InsightsPage.css'

const ANCHORS = [
  { id: 'testimonials', label: 'Testimonials', Icon: Video, filled: true },
  { id: 'blog', label: 'Blog', Icon: FileText, filled: false },
  { id: 'resources', label: 'Resources', Icon: BookOpen, filled: false },
]

const PREVIEWS = [
  {
    id: 'testimonials',
    Icon: Video,
    title: 'Video testimonials',
    body: (
      <>
        Hear it from the doctors themselves.
        <br />
        Unscripted. Unedited. Real practice owners talking about what actually changed.
      </>
    ),
    cta: 'Watch testimonials',
    href: '#testimonials',
  },
  {
    id: 'blog',
    Icon: FileText,
    title: 'Blog',
    body: (
      <>
        Articles written for practice owners. Not about them.
        <br />
        Patient acquisition, seasonality, website conversion, paid ads  all specific to private
        practice.
      </>
    ),
    cta: 'Read articles',
    href: '#blog',
  },
  {
    id: 'resources',
    Icon: BookOpen,
    title: 'Resources',
    body: (
      <>
        The tools we use with every client, free.
        <br />
        Guides, templates, and checklists. Download what&apos;s useful. No email required for most.
      </>
    ),
    cta: 'Browse resources',
    href: '#resources',
  },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function InsightsPage() {
  return (
    <main className="insights-page">
      <section className="insights-hero" aria-labelledby="insights-hero-heading">
        <div className="insights-hero__inner">
          <p className="insights-hero__eyebrow">
            Insights for private medical practices · US & UK
          </p>
          <h1 id="insights-hero-heading" className="insights-hero__title">
            Everything we know about growing a private medical practice, written by the people
            doing it.
          </h1>
          <p className="insights-hero__sub">
            Video testimonials from real clients. Articles on patient acquisition, seasonality, and
            practice growth. Free guides and templates used in every Socialsect engagement. All of
            it here, no paywall, no weekly email.
          </p>

          <nav
            className="insights-hero__anchors"
            aria-label="Jump to sections on this page"
          >
            {ANCHORS.map(({ id, label, Icon, filled }) => (
              <button
                key={id}
                type="button"
                className={`insights-hero__jump-btn${filled ? ' insights-hero__jump-btn--filled' : ''}`}
                onClick={() => scrollToSection(id)}
              >
                <Icon className="insights-hero__jump-icon" strokeWidth={1} aria-hidden />
                <span>{label}</span>
                <ArrowDown className="insights-hero__jump-arrow" strokeWidth={1} aria-hidden />
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section className="insights-previews" aria-label="Insights content previews">
        <div className="insights-previews__inner">
          <div className="insights-previews__grid">
            {PREVIEWS.map(({ id, Icon, title, body, cta, href }) => (
              <article
                key={id}
                className="insights-preview-card"
                aria-labelledby={`insights-preview-${id}-title`}
              >
                <div className="insights-preview-card__icon-wrap" aria-hidden>
                  <Icon className="insights-preview-card__icon" strokeWidth={1} />
                </div>
                <h2 id={`insights-preview-${id}-title`} className="insights-preview-card__title">
                  {title}
                </h2>
                <p className="insights-preview-card__body">{body}</p>
                {href.startsWith('#') ? (
                  <button
                    type="button"
                    className="insights-preview-card__cta"
                    onClick={() => scrollToSection(id)}
                  >
                    {cta}
                    <ArrowRight className="insights-preview-card__cta-icon" strokeWidth={1} aria-hidden />
                  </button>
                ) : (
                  <Link to={href} className="insights-preview-card__cta">
                    {cta}
                    <ArrowRight className="insights-preview-card__cta-icon" strokeWidth={1} aria-hidden />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <InsightsTestimonialsSection />
      <InsightsBlogSection />
      <InsightsResourcesSection />
      <InsightsNewsletterSection />
      <InsightsClosingCtaSection />
    </main>
  )
}
