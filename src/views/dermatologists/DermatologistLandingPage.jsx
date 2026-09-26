'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowRight, Check, CheckCircle2, ChevronRight, Activity, TrendingUp, ShieldCheck, Target } from 'lucide-react'
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

// Helper to get a random premium icon for varied cards
const getRandomIcon = (index) => {
  const icons = [Activity, TrendingUp, ShieldCheck, Target, CheckCircle2]
  const Icon = icons[index % icons.length]
  return <Icon size={24} strokeWidth={2} />
}

export default function DermatologistLandingPage({ pageSlug: propSlug }) {
  const params = useParams()
  const pageSlug = propSlug ?? params?.pageSlug
  const data = useMemo(() => getDermatologistsSeoLandingData(pageSlug), [pageSlug])

  if (!data) return null

  // --- Grouping Logic ---
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

  const introGroup = groupedSections[0]
  
  const cardGroupKeywords = ['Keyword', 'On-Page', 'Local SEO', 'E-E-A-T', 'Service Page']
  const isCardGroup = (group) => {
    if (/^\d+\./.test(group.title)) return true
    return cardGroupKeywords.some(keyword => group.title.includes(keyword))
  }

  const cardGroups = groupedSections.filter(g => g !== introGroup && isCardGroup(g))
  
  const generalSections = groupedSections.filter(g => 
    g !== introGroup && 
    !isCardGroup(g) && 
    !/Our .* SEO Services/i.test(g.title)
  )

  return (
    <main className="service-detail-page">
      <style>{`
        /* Core Typography & Spacing Overrides */
        .premium-text-lg {
          font-size: 1.25rem;
          line-height: 1.8;
          color: var(--dark-gray);
          margin-bottom: 24px;
        }
        .premium-text-md {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--charcoal);
          margin-bottom: 16px;
        }
        .premium-heading-lg {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          line-height: 1.1;
          color: var(--charcoal);
          letter-spacing: -0.02em;
        }
        .premium-heading-md {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3vw, 2.5rem);
          line-height: 1.2;
          color: var(--charcoal);
          letter-spacing: -0.01em;
        }
        
        /* Layout Types */
        
        /* 1. The Elegant Split */
        .layout-split {
          padding: 80px 24px;
          background: var(--white);
        }
        .layout-split__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 64px;
          align-items: start;
        }
        .layout-split__sticky {
          position: sticky;
          top: 140px;
        }
        
        /* 2. The Focus Center */
        .layout-center {
          padding: 80px 24px;
          background: var(--surface);
          border-radius: 40px;
          margin: 0 24px;
        }
        .layout-center__inner {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        /* 3. The Asymmetric Grid (Z-Pattern) */
        .layout-asym {
          padding: 80px 24px;
          background: var(--white);
        }
        .layout-asym__inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* Elements */
        .accent-line {
          width: 60px;
          height: 4px;
          background: var(--primary);
          margin-bottom: 32px;
          border-radius: 2px;
        }
        .accent-line--center {
          margin: 0 auto 32px auto;
        }

        .premium-bullets {
          list-style: none;
          padding: 0;
          margin: 40px 0;
          display: grid;
          gap: 24px;
        }
        .premium-bullet {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          background: var(--white);
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.02);
          transition: transform 0.3s ease;
        }
        .premium-bullet:hover {
          transform: translateY(-4px);
        }
        
        .premium-statement {
          background: var(--primary);
          color: var(--white);
          padding: 32px;
          border-radius: 24px;
          margin-top: 32px;
          box-shadow: 0 20px 40px rgba(105, 90, 242, 0.25);
          position: relative;
          overflow: hidden;
        }
        .premium-statement::before {
          content: '';
          position: absolute;
          top: 0; right: 0; width: 300px; height: 300px;
          background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
          opacity: 0.15;
          transform: translate(30%, -30%);
        }
        
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          padding: 120px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .bento-card {
          background: var(--surface);
          border-radius: 24px;
          padding: 56px 48px;
          border: 1px solid rgba(0,0,0,0.03);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .bento-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.06);
          border-color: rgba(105, 90, 242, 0.1);
        }
        .bento-card__icon {
          width: 56px;
          height: 56px;
          background: var(--white);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          margin-bottom: 32px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.04);
        }

        @media (max-width: 992px) {
          .layout-split__inner, .layout-asym__inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .layout-split__sticky {
            position: relative;
            top: 0;
          }
          .bento-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .layout-center {
            margin: 0;
            border-radius: 0;
            padding: 80px 24px;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="service-detail-hero" aria-labelledby="service-detail-hero-heading">
        <div className="service-detail-hero__bg-animation" aria-hidden="true">
          <LazyDarkVeil speed={0.5} />
        </div>
        <div className="service-detail-hero__inner">
          <p className="service-detail-hero__eyebrow">Specialized Dermatology SEO</p>
          <h1 id="service-detail-hero-heading" className="service-detail-hero__title">
            {data.heroHeadline}
          </h1>
          {data.heroSubcopy.map((paragraph, i) => (
            <p key={i} className="service-detail-hero__sub">
              {renderBold(paragraph)}
            </p>
          ))}
          <nav className="service-detail-hero__nav" style={{ marginTop: '40px', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
             <Link
                href={data.ctaLink ?? BOOK_A_CALL_FORM}
                className="btn btn-primary service-detail-hero__cta"
                style={{ fontSize: '1.125rem', padding: '16px 32px', borderRadius: '100px' }}
             >
                {data.ctaLabel}
             </Link>
             <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
               {data.stats.map((stat, i) => (
                 <div key={i} className="service-detail-hero__pill" style={{ pointerEvents: 'none' }}>
                   <strong>{stat.value}</strong> &nbsp;{stat.label}
                 </div>
               ))}
             </div>
          </nav>
        </div>
      </section>

      {/* Intro Section - The Elegant Split */}
      {introGroup && (
        <section style={{ padding: '80px 24px', background: 'var(--white)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Top Grid: Title+Text on Left, Bullets on Right */}
            <div style={{ display: 'grid', gridTemplateColumns: (introGroup.contentBlocks.some(b => b.bullets?.length > 0)) ? '1fr 1.2fr' : '1fr', gap: '64px', alignItems: 'start' }}>
              
              {/* LEFT COLUMN (Title + Paragraphs) */}
              <div>
                <div className="accent-line" />
                <h2 className="premium-heading-lg" style={{ marginBottom: '32px' }}>{introGroup.title}</h2>
                {introGroup.contentBlocks.map((block, i) => (
                  <div key={`content-${i}`}>
                    {block.content && block.content.map((p, idx) => (
                      <p key={idx} className="premium-text-lg" style={{ fontSize: (i === 0 && idx === 0) ? '1.5rem' : '1.25rem', color: (i === 0 && idx === 0) ? 'var(--charcoal)' : 'var(--dark-gray)', fontWeight: (i === 0 && idx === 0) ? 500 : 400 }}>
                        {renderBold(p)}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* RIGHT COLUMN (Bullets Card) */}
              {introGroup.contentBlocks.some(b => b.bullets?.length > 0) && (
                <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {introGroup.contentBlocks.map(block => 
                      block.bullets?.map((bullet, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                          <div style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
                             <CheckCircle2 size={20} strokeWidth={2.5} />
                          </div>
                          <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--charcoal)', lineHeight: '1.5' }}>
                            {renderBold(bullet)}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* FULL WIDTH STATEMENT(S) */}
            {introGroup.contentBlocks.some(b => b.statement) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {introGroup.contentBlocks.filter(b => b.statement).map((block, idx) => (
                  <div key={idx} className="premium-statement" style={{ marginTop: 0 }}>
                    <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 500, lineHeight: '1.5', position: 'relative', zIndex: 2 }}>
                      &ldquo;{renderBold(block.statement.body)}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Strategy Bento Grid */}
      {cardGroups.length > 0 && (
        <section style={{ background: 'var(--white)' }}>
          <div style={{ textAlign: 'center', paddingTop: '80px' }}>
             <h2 className="premium-heading-md">Our Strategy & Execution</h2>
             <p className="premium-text-lg" style={{ maxWidth: '600px', margin: '24px auto 0' }}>A disciplined approach to growing dermatology practices through organic search.</p>
          </div>
          <div className="bento-grid">
            {cardGroups.map((group, i) => {
              const cleanTitle = group.title.replace(/^\d+\.\s*/, '')
              return (
                <article key={i} className="bento-card">
                  <div className="bento-card__icon">
                    {getRandomIcon(i)}
                  </div>
                  <h3 className="premium-heading-md" style={{ fontSize: '1.75rem', marginBottom: '24px' }}>{cleanTitle}</h3>
                  {group.contentBlocks.map((block, bIdx) => (
                    <div key={bIdx}>
                      {block.content && block.content.map((p, idx) => (
                        <p key={idx} className="premium-text-md" style={{ color: 'var(--dark-gray)' }}>
                          {renderBold(p)}
                        </p>
                      ))}
                      {block.bullets?.length > 0 && (
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '32px' }}>
                          {block.bullets.map((b, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                              <ChevronRight size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                              <span style={{ fontSize: '1.125rem', color: 'var(--charcoal)', lineHeight: '1.6' }}>{renderBold(b)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </article>
              )
            })}
          </div>
        </section>
      )}


      {/* Varied General Sections */}
      {generalSections.length > 0 && (
        <div className="dlp-general-sections">
          {generalSections.map((group, index) => {
            
            // Extract everything for easy logic
            const allContent = []
            const allBullets = []
            const allStatements = []
            
            group.contentBlocks.forEach(block => {
              if (block.content) allContent.push(...block.content)
              if (block.bullets) allBullets.push(...block.bullets)
              if (block.statement) allStatements.push(block.statement)
            })

            const isAlt = index % 2 === 1
            const bulletCount = allBullets.length
            
            // Dynamic Layout Selection based on content balance
            let layoutMode = 'split' // Default: 1-6 bullets
            if (bulletCount > 6) layoutMode = 'massive-grid'
            if (bulletCount === 0) layoutMode = 'centered'

            return (
              <section key={index} style={{ background: isAlt ? 'var(--surface)' : 'var(--white)', padding: '80px 24px', borderTop: index !== 0 && !isAlt ? '1px solid var(--gray)' : 'none' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  
                  {/* === LAYOUT MODE: SPLIT (1-6 Bullets) === */}
                  {layoutMode === 'split' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'start' }} className="dlp-gen-grid">
                      {/* LEFT COLUMN (Title + Paragraphs) */}
                      <div>
                        <div className="accent-line" />
                        <h2 className="premium-heading-lg" style={{ marginBottom: '32px' }}>{group.title}</h2>
                        {allContent.map((p, idx) => (
                          <p key={idx} className="premium-text-lg">{renderBold(p)}</p>
                        ))}
                      </div>

                      {/* RIGHT COLUMN (Bullets Card) */}
                      <div style={{ background: isAlt ? 'var(--white)' : 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {allBullets.map((bullet, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: idx === allBullets.length - 1 ? '0' : '20px' }}>
                              <div style={{ background: 'transparent', color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
                                <Check size={18} strokeWidth={2.5} />
                              </div>
                              <span style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>
                                {renderBold(bullet)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* === LAYOUT MODE: MASSIVE GRID (>6 Bullets) === */}
                  {layoutMode === 'massive-grid' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                      {/* TOP (Title + Paragraphs Centered) */}
                      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <div className="accent-line accent-line--center" />
                        <h2 className="premium-heading-lg" style={{ marginBottom: '32px' }}>{group.title}</h2>
                        {allContent.map((p, idx) => (
                          <p key={idx} className="premium-text-lg">{renderBold(p)}</p>
                        ))}
                      </div>

                      {/* BOTTOM (Multi-column Bullets Card) */}
                      <div style={{ background: isAlt ? 'var(--white)' : 'var(--surface)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', rowGap: '20px', columnGap: '32px' }}>
                          {allBullets.map((bullet, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                              <div style={{ background: 'transparent', color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>
                                <Check size={18} strokeWidth={2.5} />
                              </div>
                              <span style={{ fontSize: '1rem', lineHeight: '1.5', color: 'var(--charcoal)' }}>
                                {renderBold(bullet)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* === LAYOUT MODE: CENTERED (0 Bullets) === */}
                  {layoutMode === 'centered' && (
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                      <div className="accent-line accent-line--center" />
                      <h2 className="premium-heading-lg" style={{ marginBottom: '32px' }}>{group.title}</h2>
                      {allContent.map((p, idx) => (
                        <p key={idx} className="premium-text-lg">{renderBold(p)}</p>
                      ))}
                    </div>
                  )}

                  {/* FULL WIDTH STATEMENT(S) */}
                  {allStatements.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: layoutMode === 'centered' ? '0' : '24px' }}>
                      {allStatements.map((stmt, idx) => (
                        <div key={idx} className="premium-statement" style={{ marginTop: 0, padding: '40px', display: 'flex', alignItems: 'center', gap: '24px', borderRadius: '16px' }}>
                          <div style={{ flexShrink: 0, opacity: 0.8 }}>
                            <Target size={40} strokeWidth={1.5} />
                          </div>
                          <div style={{ width: '1px', alignSelf: 'stretch', background: 'rgba(255,255,255,0.2)', margin: '0 8px' }} className="stmt-divider" />
                          <p style={{ margin: 0, fontSize: '1.25rem', lineHeight: '1.6', fontWeight: 500, position: 'relative', zIndex: 2 }}>
                            {renderBold(stmt.body)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </section>
            )
          })}
        </div>
      )}

      {/* Bold Quote Section */}
      {data.statement && (
        <section className="service-detail-scenarios" style={{ backgroundColor: 'var(--charcoal)', padding: '80px 24px' }}>
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
