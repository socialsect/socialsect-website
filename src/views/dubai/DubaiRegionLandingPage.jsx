'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { getDubaiRegionLandingData } from './dubaiRegionData.js'
import '../../views/services/ServiceDetailPage.css'
import './DubaiRegionLandingPage.css'

/** Renders **bold** markers from the source brief as <strong>. */
function renderBold(text) {
  if (typeof text !== 'string') return text
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

function Block({ block }) {
  if (block.type === 'list') {
    return (
      <ul className="drp-list">
        {block.items.map((item, i) => (
          <li key={i} className="drp-list__item">
            <span className="drp-list__icon" aria-hidden="true">
              <Check size={15} strokeWidth={3} />
            </span>
            <span>{renderBold(item)}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === 'flow') {
    return (
      <div className="drp-flow">
        {block.items.map((step, i) => (
          <span key={i} className="drp-flow__group">
            {i > 0 && (
              <span className="drp-flow__arrow" aria-hidden="true">
                <ArrowRight size={16} strokeWidth={2.5} />
              </span>
            )}
            <span className="drp-flow__step">{renderBold(step)}</span>
          </span>
        ))}
      </div>
    )
  }

  if (block.type === 'quote') {
    return <p className="drp-quote">{renderBold(block.text)}</p>
  }

  return <p className="drp-p">{renderBold(block.text)}</p>
}

/** Splits a section's blocks into a lead group + one card per h3 sub-heading. */
function groupBlocks(blocks = []) {
  const lead = []
  const groups = []
  let current = null

  blocks.forEach((block) => {
    if (block.type === 'h3') {
      current = { title: block.text, blocks: [] }
      groups.push(current)
    } else if (current) {
      current.blocks.push(block)
    } else {
      lead.push(block)
    }
  })

  return { lead, groups }
}

export default function DubaiRegionLandingPage({ pageSlug }) {
  const data = useMemo(() => getDubaiRegionLandingData(pageSlug), [pageSlug])

  if (!data) return null

  return (
    <main className="drp-page">
      {/* Hero */}
      <section className="drp-hero" aria-labelledby="drp-hero-heading">
        <div className="drp-container drp-hero__inner">
          {data.eyebrow && <p className="drp-hero__eyebrow">{data.eyebrow}</p>}
          <h1 id="drp-hero-heading" className="drp-hero__title">
            {renderBold(data.heroHeadline)}
          </h1>

          <div className="drp-hero__grid">
            <div className="drp-hero__copy">
              {(data.heroSubcopy || []).map((paragraph, i) => (
                <p key={i} className="drp-hero__sub">
                  {renderBold(paragraph)}
                </p>
              ))}
              {(data.heroChips || []).length > 0 && (
                <div className="drp-hero__chips">
                  {data.heroChips.map((chip, i) => (
                    <span key={i} className="drp-hero__chip">
                      {renderBold(chip)}
                    </span>
                  ))}
                </div>
              )}
              <div className="drp-hero__actions">
                <Link href={data.ctaLink ?? BOOK_A_CALL_FORM} className="cta cta--primary cta--lg">
                  {data.ctaLabel}
                </Link>
              </div>
            </div>

            {(data.journeySteps || []).length > 0 && (
              <aside className="drp-hero__panel" aria-label="Patient journey">
                <p className="drp-hero__panel-title">{data.journeyPanelTitle}</p>
                <ol className="drp-hero__steps">
                  {data.journeySteps.map((step, i) => (
                    <li key={i} className="drp-hero__step">
                      <span className="drp-hero__dot" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="drp-hero__step-label">{renderBold(step)}</span>
                      {i < data.journeySteps.length - 1 && (
                        <span className="drp-hero__line" aria-hidden="true" />
                      )}
                    </li>
                  ))}
                </ol>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Card feed */}
      <div className="drp-feed">
        <div className="drp-container">
          {/* Intro card */}
          {(data.introBlocks || []).length > 0 && (
            <section className="drp-card drp-intro">
              {data.introBlocks.map((block, i) => (
                <p key={i} className="drp-intro__text">
                  {renderBold(block.text)}
                </p>
              ))}
            </section>
          )}

          {/* Content sections — order follows the brief exactly */}
          {(data.sections || []).map((section, index) => {
            const { lead, groups } = groupBlocks(section.blocks)

            return (
              <section
                key={index}
                className="drp-card drp-section"
                aria-labelledby={`drp-section-${index}`}
                style={{ marginTop: index === 0 && !data.introBlocks?.length ? 0 : 20 }}
              >
                <header className="drp-section__head">
                  <span className="drp-section__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="drp-section__titles">
                    <h2 id={`drp-section-${index}`} className="drp-section__title">
                      {renderBold(section.title)}
                    </h2>
                  </div>
                </header>

                <div className="drp-section__body">
                  {lead.map((block, i) => (
                    <Block key={`lead-${i}`} block={block} />
                  ))}

                  {groups.length > 0 && (
                    <div className="drp-subcards">
                      {groups.map((group, gIdx) => (
                        <div key={gIdx} className="drp-subcard">
                          <span className="drp-subcard__label">{renderBold(group.title)}</span>
                          {group.blocks.map((block, i) => (
                            <Block key={`g-${gIdx}-${i}`} block={block} />
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )
          })}

          {/* FAQ */}
          {(data.faq || data.faqs || []).length > 0 && (
            <section className="drp-card" aria-labelledby="drp-faq-heading" style={{ marginTop: 20 }}>
              <h2 id="drp-faq-heading" className="drp-faq__headline">
                {data.faqHeading ?? 'FAQs'}
              </h2>
              <div className="drp-faq__grid">
                {(data.faq || data.faqs).map(({ question, answer }, idx) => (
                  <article key={idx} className="drp-faq__card">
                    <h3 className="drp-faq__question">
                      <span className="drp-faq__qmark" aria-hidden="true">
                        ?
                      </span>
                      {renderBold(question)}
                    </h3>
                    <p className="drp-faq__answer">{renderBold(answer)}</p>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Final CTA */}
      <section className="service-detail-final-cta" aria-labelledby="drp-cta-heading">
        <div className="service-detail-final-cta__bg" aria-hidden="true" />
        <div className="service-detail-final-cta__inner">
          <h2 id="drp-cta-heading" className="service-detail-final-cta__headline">
            {renderBold(data.ctaHeadline)}
          </h2>
          <p className="service-detail-final-cta__body">{renderBold(data.ctaCopy)}</p>
          <div className="service-detail-final-cta__actions">
            <Link
              href={data.ctaLink ?? BOOK_A_CALL_FORM}
              className="btn btn-primary service-detail-final-cta__btn service-detail-final-cta__btn--primary"
            >
              {data.ctaLabel}
              <ArrowRight className="service-detail-final-cta__btn-icon" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
