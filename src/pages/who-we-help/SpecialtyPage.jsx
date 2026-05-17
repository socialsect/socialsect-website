import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './SpecialtyPage.css'

const PILLAR_ORDER = [
  { id: 'build', title: 'Build' },
  { id: 'grow', title: 'Grow' },
  { id: 'brand', title: 'Brand' },
]

export default function SpecialtyPage({ data }) {
  const {
    specialtyLabel,
    practiceNoun,
    hero,
    insights,
    painPoints,
    pillars,
    proof,
    relatedSpecialties,
    finalCta,
    ctaHref,
  } = data

  const auditCtaLabel = `Get a growth audit for your ${practiceNoun} practice`

  return (
    <main className="specialty-page">
      <section className="specialty-hero" aria-labelledby="specialty-hero-heading">
        <div className="specialty-hero__inner">
          <p className="specialty-hero__eyebrow">
            For {specialtyLabel} · Private practice · US &amp; UK
          </p>
          <h1 id="specialty-hero-heading" className="specialty-hero__title">
            {hero.headline}
          </h1>
          {hero.subcopy.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="specialty-hero__sub">
              {paragraph}
            </p>
          ))}
          <Link to={ctaHref} className="btn btn-primary specialty-hero__cta">
            {auditCtaLabel}
            <ArrowRight className="specialty-hero__cta-icon" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="specialty-insights" aria-labelledby="specialty-insights-heading">
        <div className="specialty-insights__inner">
          <h2 id="specialty-insights-heading" className="specialty-insights__headline">
            We&apos;ve spent time in your world. Here&apos;s what we know about it.
          </h2>
          <ul className="specialty-insights__grid">
            {insights.map((card) => (
              <li key={card.title} className="specialty-insights__card">
                <h3 className="specialty-insights__card-title">{card.title}</h3>
                <p className="specialty-insights__card-body">{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="specialty-pain" aria-labelledby="specialty-pain-heading">
        <div className="specialty-pain__inner">
          <h2 id="specialty-pain-heading" className="specialty-pain__headline">
            {painPoints.headline}
          </h2>
          <ul className="specialty-pain__list">
            {painPoints.items.map((item) => (
              <li key={item.quote.slice(0, 48)} className="specialty-pain__item">
                <blockquote className="specialty-pain__quote">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="specialty-pillars" aria-labelledby="specialty-pillars-heading">
        <div className="specialty-pillars__inner">
          <h2 id="specialty-pillars-heading" className="specialty-pillars__headline">
            What a system built for your practice looks like.
          </h2>
          <div className="specialty-pillars__grid">
            {PILLAR_ORDER.map((pillar, i) => (
              <article key={pillar.id} className="specialty-pillars__card">
                <span className="specialty-pillars__index" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="specialty-pillars__title">{pillar.title}</h3>
                <p className="specialty-pillars__body">{pillars[pillar.id]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="specialty-proof" aria-labelledby="specialty-proof-heading">
        <div className="specialty-proof__inner">
          <h2 id="specialty-proof-heading" className="specialty-proof__headline">
            We&apos;ve done this before. Here&apos;s the closest proof we have.
          </h2>
          <div className="specialty-proof__row">
            <div className="specialty-proof__case">
              <p className="specialty-proof__case-name">{proof.clientName}</p>
              <p className="specialty-proof__case-meta">
                {proof.specialty} · {proof.location}
              </p>
              <blockquote className="specialty-proof__case-quote">
                &ldquo;{proof.quote}&rdquo;
              </blockquote>
            </div>
            <div className="specialty-proof__metrics-panel">
              <ul className="specialty-proof__metrics">
                {proof.metrics.map(({ value, label }) => (
                  <li key={label} className="specialty-proof__metric">
                    <span className="specialty-proof__metric-value">{value}</span>
                    <span className="specialty-proof__metric-label">{label}</span>
                  </li>
                ))}
              </ul>
              <div className="specialty-proof__actions">
                <Link
                  to={proof.talkToHref}
                  className="specialty-proof__btn specialty-proof__btn--primary"
                >
                  Talk to {proof.clientName}
                  <ArrowRight className="specialty-proof__btn-icon" strokeWidth={2} aria-hidden />
                </Link>
                <Link
                  to={proof.referenceHref}
                  className="specialty-proof__btn specialty-proof__btn--secondary"
                >
                  Request a reference
                  <ArrowRight className="specialty-proof__btn-icon" strokeWidth={2} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="specialty-related" aria-labelledby="specialty-related-heading">
        <div className="specialty-related__inner">
          <h2 id="specialty-related-heading" className="specialty-related__headline">
            We also work with practices similar to yours.
          </h2>
          <ul className="specialty-related__pills">
            {relatedSpecialties.map(({ label, slug }) => (
              <li key={slug}>
                <Link to={`/who-we-help/${slug}`} className="specialty-related__pill">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/who-we-help" className="specialty-related__see-all">
            View all specialties
            <ArrowRight className="specialty-related__see-all-icon" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="specialty-final-cta" aria-labelledby="specialty-final-cta-heading">
        <div className="specialty-final-cta__bg" aria-hidden />
        <div className="specialty-final-cta__inner">
          <h2 id="specialty-final-cta-heading" className="specialty-final-cta__headline">
            {finalCta.headline}
          </h2>
          <p className="specialty-final-cta__body">
            Start with a free practice audit. Tell us about your practice  in 45 minutes we&apos;ll
            show you exactly where patients are falling through the gaps, and what a system built for
            your specialty would look like to fix it.
          </p>
          <div className="specialty-final-cta__actions">
            <Link
              to={ctaHref}
              className="btn btn-primary specialty-final-cta__btn specialty-final-cta__btn--primary"
            >
              {auditCtaLabel}
              <ArrowRight className="specialty-final-cta__btn-icon" strokeWidth={2} aria-hidden />
            </Link>
            <Link
              to={proof.referenceHref}
              className="specialty-final-cta__btn specialty-final-cta__btn--secondary"
            >
              Request a reference
            </Link>
          </div>
          <p className="specialty-final-cta__note">
            No packages. No pitch. A conversation built around your practice.
          </p>
        </div>
      </section>
    </main>
  )
}
