'use client'
import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { getRegionLandingData } from './regionLandingData.js'
import './RegionLandingPage.css'

export default function RegionLandingPage() {
  const { pageSlug } = useParams()
  const data = useMemo(() => getRegionLandingData(pageSlug), [pageSlug])

  if (!data) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="region-landing-page">
      <section className="region-landing-hero" aria-labelledby="region-landing-hero-heading">
        <div className="region-landing-hero__inner">
          <p className="region-landing-hero__eyebrow">Dermatologist SEO services</p>
          <h1 id="region-landing-hero-heading" className="region-landing-hero__title">
            {data.heroHeadline}
          </h1>
          {data.heroSubcopy.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="region-landing-hero__copy">
              {paragraph}
            </p>
          ))}
          <div className="region-landing-hero__actions">
            <Link to={data.ctaLink ?? BOOK_A_CALL_FORM} className="btn btn-primary region-landing-hero__cta">
              {data.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {data.sections.map((section) => (
        <section
          key={section.title}
          className="region-landing-section"
          aria-labelledby={`section-${section.title.replace(/\s+/g, '-')}`}
        >
          <div className="region-landing-section__inner">
            <h2 className="region-landing-section__title">{section.title}</h2>
            {section.content.map((paragraph) => (
              <p key={paragraph.slice(0, 64)} className="region-landing-section__copy">
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="region-landing-section__list">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {section.callouts?.length ? (
              <div className="region-landing-section__callouts">
                {section.callouts.map((callout) => (
                  <div key={callout.title} className="region-landing-section__callout">
                    <h3>{callout.title}</h3>
                    <p>{callout.body}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {data.faq?.length ? (
        <section className="region-landing-section" aria-labelledby="region-landing-faq-heading">
          <div className="region-landing-section__inner">
            <h2 id="region-landing-faq-heading" className="region-landing-section__title">
              Frequently Asked Questions
            </h2>
            <dl className="region-landing-faq">
              {data.faq.map((item) => (
                <div key={item.question} className="region-landing-faq__item">
                  <dt className="region-landing-faq__question">{item.question}</dt>
                  <dd className="region-landing-faq__answer">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section className="region-landing-final-cta" aria-labelledby="region-landing-final-cta-heading">
        <div className="region-landing-final-cta__inner">
          <h2 id="region-landing-final-cta-heading" className="region-landing-final-cta__title">
            {data.ctaHeadline}
          </h2>
          <p className="region-landing-final-cta__copy">{data.ctaCopy}</p>
          <Link to={data.ctaLink ?? BOOK_A_CALL_FORM} className="btn btn-primary region-landing-final-cta__btn">
            {data.ctaLabel}
          </Link>
        </div>
      </section>
    </main>
  )
}
