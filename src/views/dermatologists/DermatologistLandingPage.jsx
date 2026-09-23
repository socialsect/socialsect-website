'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { getDermatologistsSeoLandingData } from './dermatologistsSeoData.js'
import '../../views/services/ServiceDetailPage.css' 
import LazyDarkVeil from '../../components/dark-veil/LazyDarkVeil.jsx'

function renderBold(text) {
  if (typeof text !== 'string') return text
  const parts = text.split('**')
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export default function DermatologistLandingPage({ pageSlug: propSlug }) {
  const params = useParams()
  const pageSlug = propSlug ?? params?.pageSlug
  const data = useMemo(() => getDermatologistsSeoLandingData(pageSlug), [pageSlug])

  if (!data) return null

  // --- Dynamic Content Mapping ---
  // 1. Group all sections first to handle empty titles (continuations)
  const groupedSections = []
  let currentGroup = null

  data.sections.forEach((sec) => {
    if (sec.title) {
      if (currentGroup) groupedSections.push(currentGroup)
      currentGroup = { ...sec, contentBlocks: [sec] }
    } else {
      if (currentGroup) {
        currentGroup.contentBlocks.push(sec)
      }
    }
  })
  if (currentGroup) groupedSections.push(currentGroup)

  // 2. Identify the intro section (first group)
  const introGroup = groupedSections[0]
  
  // 3. Identify strategy sections for the Bento Grid
  // Some regions use "1. Keyword...", others just use "Keyword..."
  const cardGroupKeywords = ['Keyword', 'On-Page', 'Local SEO', 'E-E-A-T', 'Service Page']
  const isCardGroup = (group) => {
    if (/^\d+\./.test(group.title)) return true
    return cardGroupKeywords.some(keyword => group.title.includes(keyword))
  }

  const cardGroups = groupedSections.filter(g => g !== introGroup && isCardGroup(g))
  
  // 4. Identify remaining general sections
  const generalSections = groupedSections.filter(g => 
    g !== introGroup && 
    !isCardGroup(g) && 
    !/Our .* SEO Services/i.test(g.title)
  )

  return (
    <main className="service-detail-page">
      <style>{`
        .dlp-split {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          padding: 100px 24px;
          background: var(--surface);
          align-items: start;
        }
        .dlp-split__title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          line-height: 1.1;
          color: var(--charcoal);
          position: sticky;
          top: 120px;
        }
        .dlp-split__text p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--dark-gray);
          margin-bottom: 24px;
        }
        .dlp-dark-band {
          background: var(--charcoal);
          color: var(--white);
          padding: 80px 24px;
          text-align: center;
        }
        .dlp-dark-band__inner {
          max-width: 900px;
          margin: 0 auto;
        }
        .dlp-dark-band__text {
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          line-height: 1.5;
          font-family: var(--font-display);
          font-style: italic;
        }
        .dlp-cards {
          padding: 100px 24px;
          background: var(--white);
        }
        .dlp-cards__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .dlp-cards__header {
          text-align: center;
          margin-bottom: 60px;
        }
        .dlp-cards__title {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          color: var(--charcoal);
        }
        .dlp-cards__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }
        .dlp-card {
          background: var(--surface);
          border-radius: 16px;
          padding: 40px;
          border: 1px solid rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
        }
        .dlp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
        .dlp-card__number {
          font-size: 48px;
          font-family: var(--font-display);
          color: var(--primary);
          line-height: 1;
          margin-bottom: 24px;
          opacity: 0.8;
        }
        .dlp-card__title {
          font-size: 24px;
          margin-bottom: 16px;
          line-height: 1.3;
        }
        
        @media (max-width: 992px) {
          .dlp-split {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 60px 24px;
          }
          .dlp-split__title {
            position: relative;
            top: 0;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="service-detail-hero" aria-labelledby="service-detail-hero-heading">
        <div className="service-detail-hero__bg-animation" aria-hidden="true">
          <LazyDarkVeil speed={0.5} />
        </div>
        <div className="service-detail-hero__inner">
          <p className="service-detail-hero__eyebrow">
            Specialized Dermatology SEO
          </p>
          <h1 id="service-detail-hero-heading" className="service-detail-hero__title">
            {data.heroHeadline}
          </h1>
          {data.heroSubcopy.map((paragraph, i) => (
            <p key={i} className="service-detail-hero__sub">
              {renderBold(paragraph)}
            </p>
          ))}
          <nav className="service-detail-hero__nav" style={{ marginTop: '32px' }}>
             {data.stats.map((stat, i) => (
               <div key={i} className="service-detail-hero__pill" style={{ pointerEvents: 'none' }}>
                 <strong>{stat.value}</strong> &nbsp;{stat.label}
               </div>
             ))}
          </nav>
        </div>
      </section>

      {/* 1. Dramatic Split Intro Section */}
      {introGroup && (
        <section className="dlp-split">
          <div>
            <h2 className="dlp-split__title">{introGroup.title}</h2>
          </div>
          <div className="dlp-split__text">
            {introGroup.contentBlocks.map((block, i) => (
              <div key={i}>
                {block.content && block.content.map((p, idx) => (
                  <p key={idx}>{renderBold(p)}</p>
                ))}
                
                {block.bullets?.length > 0 && (
                  <div style={{ background: 'var(--white)', padding: '32px', borderRadius: '16px', marginTop: '32px', marginBottom: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {block.bullets.map((b, bIdx) => (
                        <li key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: bIdx === block.bullets.length -1 ? '0' : '16px' }}>
                          <div style={{ background: 'rgba(105, 90, 242, 0.1)', color: 'var(--primary)', padding: '4px', borderRadius: '50%' }}>
                             <Check size={16} strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--charcoal)' }}>{renderBold(b)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Intro Statement Dark Band */}
      {introGroup?.statement && (
        <section className="dlp-dark-band">
           <div className="dlp-dark-band__inner">
              <p className="dlp-dark-band__text">&ldquo;{renderBold(introGroup.statement.body)}&rdquo;</p>
           </div>
        </section>
      )}

      {/* 2. Numbered Strategy Bento Grid */}
      {cardGroups.length > 0 && (
        <section className="dlp-cards">
          <div className="dlp-cards__inner">
            <div className="dlp-cards__header">
              <h2 className="dlp-cards__title">Our Strategy & Execution</h2>
            </div>
            <div className="dlp-cards__grid">
              {cardGroups.map((group, i) => {
                const cleanTitle = group.title.replace(/^\d+\.\s*/, '')
                const number = String(i + 1).padStart(2, '0')
                return (
                  <article key={i} className="dlp-card">
                    <div className="dlp-card__number">{number}</div>
                    <h3 className="dlp-card__title">{cleanTitle}</h3>
                    {group.contentBlocks.map((block, bIdx) => (
                      <div key={bIdx}>
                        {block.content && block.content.map((p, idx) => (
                          <p key={idx} style={{ color: 'var(--dark-gray)', lineHeight: '1.6', marginBottom: '16px' }}>
                            {renderBold(p)}
                          </p>
                        ))}
                        {block.bullets?.length > 0 && (
                          <ul style={{ paddingLeft: '20px', color: 'var(--charcoal)', marginTop: '20px', marginBottom: '20px' }}>
                            {block.bullets.map((b, idx) => (
                              <li key={idx} style={{ marginBottom: '8px' }}>{renderBold(b)}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}


      {/* 3. General Content Sections (Enhanced 2-Column Layout) */}
      {generalSections.length > 0 && (
        <div className="dlp-general-sections">
          <style>{`
            @media (max-width: 992px) {
              .dlp-stack-row-mobile {
                grid-template-columns: 1fr !important;
                gap: 40px !important;
              }
              .dlp-stack-title-sticky {
                position: relative !important;
                top: 0 !important;
              }
            }
          `}</style>
          {generalSections.map((group, index) => {
            const isAlt = index % 2 === 1;
            return (
              <section key={index} style={{ background: isAlt ? 'var(--surface)' : 'var(--white)', padding: '100px 24px', borderTop: index !== 0 && !isAlt ? '1px solid var(--gray)' : 'none' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px' }} className="dlp-stack-row-mobile">
                  
                  {/* Title Column */}
                  <div style={{ position: 'relative' }}>
                    <div className="dlp-stack-title-sticky" style={{ position: 'sticky', top: '120px' }}>
                      <div style={{ width: '48px', height: '4px', background: 'var(--primary)', marginBottom: '24px', borderRadius: '2px' }} />
                      <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontFamily: 'var(--font-display)', color: 'var(--charcoal)', lineHeight: '1.2', margin: 0 }}>
                        {group.title}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Content Column */}
                  <div>
                    {group.contentBlocks.map((block, i) => (
                      <div key={i} style={{ marginBottom: i === group.contentBlocks.length - 1 ? '0' : '48px' }}>
                        
                        {/* Text */}
                        {block.content && block.content.map((p, idx) => (
                          <p key={idx} style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--dark-gray)', marginBottom: '24px' }}>
                            {renderBold(p)}
                          </p>
                        ))}

                        {/* Enhanced Bullets Card */}
                        {block.bullets?.length > 0 && (
                          <div style={{ background: isAlt ? 'var(--white)' : 'var(--surface)', padding: '40px', borderRadius: '16px', marginTop: '32px', marginBottom: '32px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {block.bullets.map((bullet, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: idx === block.bullets.length - 1 ? '0' : '24px' }}>
                                  <div style={{ background: 'rgba(105, 90, 242, 0.1)', color: 'var(--primary)', padding: '6px', borderRadius: '50%', flexShrink: 0, marginTop: '2px' }}>
                                    <Check size={18} strokeWidth={3} />
                                  </div>
                                  <span style={{ fontSize: '1.125rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>
                                    {renderBold(bullet)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Premium Statement Block */}
                        {block.statement && (
                          <div style={{ background: 'var(--primary)', padding: '40px', borderRadius: '16px', marginTop: '40px', color: 'var(--white)', boxShadow: '0 20px 40px rgba(105, 90, 242, 0.25)' }}>
                            <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 500, lineHeight: '1.6' }}>
                              {renderBold(block.statement.body)}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* 4. Bold Quote Section */}
      {data.statement && (
        <section className="service-detail-scenarios" style={{ backgroundColor: 'var(--charcoal)', padding: '120px 24px' }}>
           <div className="service-detail-scenarios__inner">
             <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                 <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', lineHeight: '1.3', margin: '0 0 32px 0' }}>
                    &ldquo;{data.statement.quote}&rdquo;
                 </blockquote>
                 <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>{renderBold(data.statement.body)}</p>
             </div>
           </div>
        </section>
      )}

      {/* FAQ Section */}
      {(data.faq || data.faqs)?.length > 0 && (
        <section className="service-detail-faq" aria-labelledby="service-detail-faq-heading">
          <div className="service-detail-faq__inner">
            <h2 id="service-detail-faq-heading" className="service-detail-faq__headline">
              Frequently Asked Questions
            </h2>
            <div className="service-detail-faq__grid">
              {(data.faq || data.faqs).map(({ question, answer }, idx) => (
                <article key={idx} className="service-detail-faq__card">
                  <h3 className="service-detail-faq__question">{renderBold(question)}</h3>
                  <p className="service-detail-faq__answer">{renderBold(answer)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="service-detail-final-cta" aria-labelledby="service-detail-final-cta-heading">
        <div className="service-detail-final-cta__bg" aria-hidden="true" />
        <div className="service-detail-final-cta__inner">
          <h2 id="service-detail-final-cta-heading" className="service-detail-final-cta__headline">
            {renderBold(data.ctaHeadline)}
          </h2>
          <p className="service-detail-final-cta__body">
            {renderBold(data.ctaCopy)}
          </p>
          <div className="service-detail-final-cta__actions">
            <Link
              href={data.ctaLink ?? BOOK_A_CALL_FORM}
              className="btn btn-primary service-detail-final-cta__btn service-detail-final-cta__btn--primary"
            >
              {data.ctaLabel}
              <ArrowRight className="service-detail-final-cta__btn-icon" strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
          <p className="service-detail-final-cta__note">No packages. No pitch. A conversation built around your practice.</p>
        </div>
      </section>

    </main>
  )
}
