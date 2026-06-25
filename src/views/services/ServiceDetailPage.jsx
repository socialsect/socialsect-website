import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import './ServiceDetailPage.css'
import LazyDarkVeil from '../../components/dark-veil/LazyDarkVeil.jsx'

export default function ServiceDetailPage({ data }) {
  const {
    pillarLabel,
    serviceLabel,
    path,
    siblings,
    hero,
    scenarios,
    included,
    process,
    faqs,
    relatedServices,
    finalCta,
    ctaHref,
    pageUi = {},
  } = data

  const serviceSlug = path.split('/').pop()
  const backLabel = pageUi.backLabel ?? pillarLabel
  const backHref = pageUi.backHref ?? '/services'
  const includedLabel = pageUi.includedLabel ?? 'What we do + outcomes'
  const processHeadline = pageUi.processHeadline ?? 'How this works, step by step.'
  const faqHeadline = pageUi.faqHeadline ?? 'Questions about this service.'
  const relatedHeadline = pageUi.relatedHeadline ?? 'Often combined with this service.'
  const primaryCtaLabel = pageUi.finalCtaPrimary ?? 'See what your practice is missing'
  const secondaryCta = pageUi.finalCtaSecondary ?? { label: 'See how we work', href: '/how-we-work' }

  return (
    <main className="service-detail-page">
      <div className="service-detail-breadcrumb">
        <div className="service-detail-breadcrumb__inner">
          <nav aria-label="Breadcrumb">
            <ol className="service-detail-breadcrumb__list">
              <li>
                <Link to="/">gosocialsect.com</Link>
              </li>
              <li aria-hidden>
                <ChevronRight strokeWidth={1} className="service-detail-breadcrumb__sep" />
              </li>
              <li>
                <Link to="/services">services</Link>
              </li>
              {!pageUi.skipPillarInBreadcrumb && (
                <>
                  <li aria-hidden>
                    <ChevronRight strokeWidth={1} className="service-detail-breadcrumb__sep" />
                  </li>
                  <li>
                    <span>{pillarLabel.toLowerCase()}</span>
                  </li>
                </>
              )}
              <li aria-hidden>
                <ChevronRight strokeWidth={1} className="service-detail-breadcrumb__sep" />
              </li>
              <li>
                <span aria-current="page">{serviceSlug}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="service-detail-hero" aria-labelledby="service-detail-hero-heading">
        <div className="service-detail-hero__bg-animation" aria-hidden>
          <LazyDarkVeil speed={0.5} />
        </div>

        <div className="service-detail-hero__inner">
          <p className="service-detail-hero__eyebrow">
            {pillarLabel}: {serviceLabel}
          </p>
          <h1 id="service-detail-hero-heading" className="service-detail-hero__title">
            {hero.headline}
          </h1>
          {hero.subcopy.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="service-detail-hero__sub">
              {paragraph}
            </p>
          ))}
          <nav className="service-detail-hero__nav" aria-label={`${pillarLabel} services`}>
            <Link to={backHref} className="service-detail-hero__pill service-detail-hero__pill--back">
              ← Back to {backLabel}
            </Link>
            {siblings.map(({ slug, label, path: siblingPath }) => (
              <Link key={slug} to={siblingPath} className="service-detail-hero__pill">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="service-detail-scenarios" aria-labelledby="service-detail-scenarios-heading">
        <div className="service-detail-scenarios__inner">
          <h2 id="service-detail-scenarios-heading" className="service-detail-scenarios__headline">
            This is for you if...
          </h2>
          <ul className="service-detail-scenarios__grid">
            {scenarios.map((scenario) => (
              <li key={scenario.slice(0, 48)} className="service-detail-scenarios__card">
                <blockquote className="service-detail-scenarios__quote">{scenario}</blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="service-detail-included" aria-labelledby="service-detail-included-heading">
        <div className="service-detail-included__inner">
          <h2 id="service-detail-included-heading" className="visually-hidden">
            What&apos;s included
          </h2>
          <div className="service-detail-included__split">
            <div className="service-detail-included__col">
              <p className="service-detail-included__col-label">{includedLabel}</p>
              <p className="service-detail-included__description">{included.description}</p>
              <ul className="service-detail-included__outcomes">
                {included.outcomes.map((outcome) => (
                  <li key={outcome} className="service-detail-included__outcome">
                    <span className="service-detail-included__dot" aria-hidden />
                    <span className="service-detail-included__outcome-text">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="service-detail-included__col">
              <p className="service-detail-included__col-label">Deliverables</p>
              {included.deliverableGroups.map((group) => (
                <div key={group.name} className="service-detail-included__group">
                  <h3 className="service-detail-included__group-title">{group.name}</h3>
                  <ul className="service-detail-included__list">
                    {group.items.map((item) => (
                      <li key={item} className="service-detail-included__item">
                        <span className="service-detail-included__dot" aria-hidden />
                        <span className="service-detail-included__outcome-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail-process" aria-labelledby="service-detail-process-heading">
        <div className="service-detail-process__inner">
          <h2 id="service-detail-process-heading" className="service-detail-process__headline">
            {processHeadline}
          </h2>
          <div className="service-detail-process__grid">
            {process.map((phase, i) => (
              <article key={phase.name} className="service-detail-process__phase">
                <span className="service-detail-process__index" aria-hidden>
                  Phase {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="service-detail-process__phase-title">{phase.name}</h3>
                <p className="service-detail-process__phase-body">{phase.description}</p>
                <p className="service-detail-process__timeline">{phase.timeline}</p>
              </article>
            ))}
          </div>
          <p className="service-detail-process__footnote">
            See the complete process:{' '}
            <Link to="/how-we-work" className="service-detail-process__link">
              How we work
              <ArrowRight className="service-detail-process__link-icon" strokeWidth={2} aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <section className="service-detail-faq" aria-labelledby="service-detail-faq-heading">
        <div className="service-detail-faq__inner">
          <h2 id="service-detail-faq-heading" className="service-detail-faq__headline">
            {faqHeadline}
          </h2>
          <div className="service-detail-faq__grid">
            {faqs.map(({ question, answer }) => (
              <article key={question} className="service-detail-faq__card">
                <h3 className="service-detail-faq__question">{question}</h3>
                <p className="service-detail-faq__answer">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-related" aria-labelledby="service-detail-related-heading">
        <div className="service-detail-related__inner">
          <h2 id="service-detail-related-heading" className="service-detail-related__headline">
            {relatedHeadline}
          </h2>
          <div className="service-detail-related__grid">
            {relatedServices.map(({ label, reason, path: relatedPath, linkLabel }) => (
              <article key={relatedPath} className="service-detail-related__card">
                <h3 className="service-detail-related__card-title">{label}</h3>
                <p className="service-detail-related__card-body">{reason}</p>
                <Link to={relatedPath} className="service-detail-related__link">
                  {linkLabel ?? `Explore ${label}`}
                  <ArrowRight className="service-detail-related__link-icon" strokeWidth={2} aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-final-cta" aria-labelledby="service-detail-final-cta-heading">
        <div className="service-detail-final-cta__bg" aria-hidden />
        <div className="service-detail-final-cta__inner">
          <h2 id="service-detail-final-cta-heading" className="service-detail-final-cta__headline">
            {finalCta.headline}
          </h2>
          <p className="service-detail-final-cta__body">
            Start with a free practice audit. We&apos;ll look at your current situation, identify exactly
            where this service would make the biggest difference, and show you what it would look like
            for your specific practice.
          </p>
          <div className="service-detail-final-cta__actions">
            <Link
              to={ctaHref}
              className="btn btn-primary service-detail-final-cta__btn service-detail-final-cta__btn--primary"
            >
              {primaryCtaLabel}
              <ArrowRight className="service-detail-final-cta__btn-icon" strokeWidth={2} aria-hidden />
            </Link>
            <Link
              to={secondaryCta.href}
              className="service-detail-final-cta__btn service-detail-final-cta__btn--secondary"
            >
              {secondaryCta.label}
            </Link>
          </div>
          <p className="service-detail-final-cta__note">No packages. No pitch. Just a clear diagnosis.</p>
        </div>
      </section>
    </main>
  )
}
