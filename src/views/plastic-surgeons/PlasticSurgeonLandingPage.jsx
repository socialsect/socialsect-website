'use client'
import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { getPlasticSurgeonLandingData } from './plasticSurgeonLandingData.js'
import './PlasticSurgeonLandingPage.css'

function renderBold(text) {
  if (typeof text !== 'string') return text
  const parts = text.split('**')
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export default function PlasticSurgeonLandingPage({ pageSlug: propSlug }) {
  const params = useParams()
  const pageSlug = propSlug ?? params.pageSlug
  const data = useMemo(() => getPlasticSurgeonLandingData(pageSlug), [pageSlug])

  if (!data) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="ps-page">
      {/* Gradient Hero Section */}
      <section className="ps-hero" aria-labelledby="ps-hero-heading">
        <div className="ps-hero__bg" aria-hidden="true">
          <div className="ps-hero__gradient" />
        </div>
        <div className="ps-hero__inner">
          <div className="ps-hero__content">
            <p className="ps-hero__eyebrow">
              <span className="ps-hero__eyebrow-line" aria-hidden="true" />
              Plastic Surgery Marketing
            </p>
            <h1 id="ps-hero-heading" className="ps-hero__headline">
              {data.heroHeadline}
            </h1>
            {data.heroSubcopy.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 48)}
                className={i === 0 ? 'ps-hero__subheadline' : 'ps-hero__intro-text'}
              >
                {renderBold(paragraph)}
              </p>
            ))}
            {data.heroBullets?.length ? (
              <ul className="ps-hero__bullets">
                {data.heroBullets.map((bullet) => (
                  <li key={bullet} className="ps-hero__bullet">
                    <span className="ps-hero__bullet-check" aria-hidden="true" />
                    <span>{renderBold(bullet)}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="ps-hero__actions">
              <Link
                to={data.ctaLink ?? BOOK_A_CALL_FORM}
                className="ps-hero__btn ps-hero__btn--primary"
              >
                {data.ctaLabel}
                <ArrowRight className="ps-hero__btn-icon" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </div>
          <div className="ps-hero__stats" aria-label="Performance metrics">
            {data.stats.map((stat) => (
              <div key={stat.label} className="ps-hero__stat-card">
                <span className="ps-hero__stat-value">{stat.value}</span>
                <span className="ps-hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {data.sections.map((section, i) => (
        <section
          key={section.title || i}
          className={`ps-section ${i % 2 === 0 ? 'ps-section--white' : 'ps-section--gray'}`}
          {...(section.title ? { 'aria-labelledby': `section-${section.title.replace(/\\s+/g, '-')}` } : {})}
        >
          <div className="ps-section__inner">
            {section.title && <h2 className="ps-section__title">{section.title}</h2>}
            {section.content && section.content.map((paragraph) => (
              <p key={paragraph.slice(0, 64)} className="ps-section__copy">
                {renderBold(paragraph)}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="ps-section__list">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="ps-section__list-item">
                    <span className="ps-section__list-dot" aria-hidden="true" />
                    <span>{renderBold(bullet)}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {section.statement && (
              <p className="ps-section__copy" style={{ marginTop: '1rem', fontWeight: 600 }}>
                {renderBold(section.statement.body)}
              </p>
            )}
          </div>
        </section>
      ))}

      {/* Dark Statement Section */}
      {data.statement && (
        <section className="ps-statement" aria-labelledby="ps-statement-heading">
          <div className="ps-statement__inner">
            <h2 id="ps-statement-heading" className="ps-statement__quote">
              &ldquo;{data.statement.quote}&rdquo;
            </h2>
            <p className="ps-statement__body">{renderBold(data.statement.body)}</p>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data.faq?.length ? (
        <section className="ps-section ps-section--gray" aria-labelledby="ps-faq-heading">
          <div className="ps-section__inner">
            <h2 id="ps-faq-heading" className="ps-section__title">
              Frequently Asked Questions
            </h2>
            <dl className="ps-faq">
              {data.faq.map((item) => (
                <div key={item.question} className="ps-faq__item">
                  <dt className="ps-faq__question">{renderBold(item.question)}</dt>
                  <dd className="ps-faq__answer">{renderBold(item.answer)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {/* Dark Closing CTA */}
      <section className="ps-closing" aria-labelledby="ps-closing-heading">
        <div className="ps-closing__bg" aria-hidden="true">
          <div className="ps-closing__overlay" />
        </div>
        <div className="ps-closing__inner">
          <h2 id="ps-closing-heading" className="ps-closing__headline">
            {renderBold(data.ctaHeadline)}
          </h2>
          <p className="ps-closing__body">{renderBold(data.ctaCopy)}</p>
          <div className="ps-closing__actions">
            <Link
              to={data.ctaLink ?? BOOK_A_CALL_FORM}
              className="ps-closing__btn ps-closing__btn--primary"
            >
              {data.ctaLabel}
              <ArrowRight className="ps-closing__btn-icon" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
