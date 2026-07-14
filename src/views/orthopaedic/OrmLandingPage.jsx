'use client'
import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { getOrmLandingData } from './ormLandingData.js'
import './OrmLandingPage.css'

export default function OrmLandingPage() {
  const { pageSlug } = useParams()
  const data = useMemo(() => getOrmLandingData(pageSlug), [pageSlug])

  if (!data) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="orm-page">
      {/* Dark Hero Section */}
      <section className="orm-hero" aria-labelledby="orm-hero-heading">
        <div className="orm-hero__left">
          <div className="orm-hero__copy">
            <p className="orm-hero__eyebrow">
              <span className="orm-hero__eyebrow-line" aria-hidden="true" />
              Orthopaedic Reputation Management
            </p>

            <h1 id="orm-hero-heading" className="orm-hero__headline">
              {data.heroHeadline}
            </h1>

            {data.heroSubcopy.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 48)}
                className={i === 0 ? 'orm-hero__subheadline' : 'orm-hero__intro-text'}
              >
                {paragraph}
              </p>
            ))}

            <div className="orm-hero__actions">
              <Link
                to={data.ctaLink ?? BOOK_A_CALL_FORM}
                className="orm-hero__btn orm-hero__btn--primary"
              >
                {data.ctaLabel}
                <ArrowRight className="orm-hero__btn-icon" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="orm-hero__right" aria-hidden="true">
          <div className="orm-hero__stats-grid">
            {data.stats.map((stat) => (
              <div key={stat.label} className="orm-hero__stat-card">
                <span className="orm-hero__stat-value">{stat.value}</span>
                <span className="orm-hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {data.sections.map((section, i) => (
        <section
          key={section.title}
          className={`orm-section ${i % 2 === 0 ? 'orm-section--light' : 'orm-section--surface'}`}
          aria-labelledby={`section-${section.title.replace(/\s+/g, '-')}`}
        >
          <div className="orm-section__inner">
            <h2 className="orm-section__title">{section.title}</h2>
            {section.content.map((paragraph) => (
              <p key={paragraph.slice(0, 64)} className="orm-section__copy">
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="orm-section__list">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="orm-section__list-item">
                    <span className="orm-section__list-dot" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      {/* Dark Statement Section */}
      {data.statement && (
        <section className="orm-statement" aria-labelledby="orm-statement-heading">
          <div className="orm-statement__inner">
            <h2 id="orm-statement-heading" className="orm-statement__quote">
              &ldquo;{data.statement.quote}&rdquo;
            </h2>
            <p className="orm-statement__body">{data.statement.body}</p>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data.faq?.length ? (
        <section className="orm-section orm-section--surface" aria-labelledby="orm-faq-heading">
          <div className="orm-section__inner">
            <h2 id="orm-faq-heading" className="orm-section__title">
              Frequently Asked Questions
            </h2>
            <dl className="orm-faq">
              {data.faq.map((item) => (
                <div key={item.question} className="orm-faq__item">
                  <dt className="orm-faq__question">{item.question}</dt>
                  <dd className="orm-faq__answer">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {/* Dark Closing CTA */}
      <section className="orm-closing" aria-labelledby="orm-closing-heading">
        <div className="orm-closing__bg" aria-hidden="true">
          <div className="orm-closing__overlay" />
        </div>
        <div className="orm-closing__inner">
          <h2 id="orm-closing-heading" className="orm-closing__headline">
            {data.ctaHeadline}
          </h2>
          <p className="orm-closing__body">{data.ctaCopy}</p>
          <div className="orm-closing__actions">
            <Link
              to={data.ctaLink ?? BOOK_A_CALL_FORM}
              className="orm-closing__btn orm-closing__btn--primary"
            >
              {data.ctaLabel}
              <ArrowRight className="orm-closing__btn-icon" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
