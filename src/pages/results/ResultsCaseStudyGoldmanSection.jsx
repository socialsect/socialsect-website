import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const METRICS = [
  { value: '2,300+', label: 'Leads generated' },
  { value: '$4', label: 'Cost per lead (sustained)' },
  { value: '700+', label: 'Consultations booked' },
  { value: '60%', label: 'Consultation-to-treatment rate' },
  { value: '3.4x–5.4x', label: 'Return on ad spend' },
  { value: '20+ months', label: 'Campaigns running consistently' },
]

export default function ResultsCaseStudyGoldmanSection() {
  return (
    <section className="results-case results-case--goldman" aria-labelledby="results-case-goldman-heading">
      <div className="results-case__inner">
        <header className="results-case__header">
          <p className="results-case__label">Case study</p>
          <h2 id="results-case-goldman-heading" className="results-case__title">
            Case study 03 · Vascular medicine · Meta Ads · US
          </h2>
          <p className="results-case__client">
            Client · Private vascular &amp; aesthetic practice · Varicose vein treatment
          </p>
        </header>

        <div className="results-case__rule" aria-hidden>
          <svg className="results-case__rule-svg" viewBox="0 0 120 12" aria-hidden>
            <path d="M0 6h72" stroke="#1A1C1D" strokeWidth="1.25" opacity="0.2" strokeLinecap="round" />
            <path d="M80 6h40" stroke="#695AF2" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          </svg>
        </div>

        <div className="results-case__identity">
          <h3 className="results-case__name">Dr. Adam Goldman, MD</h3>
          <p className="results-case__practice">
            Metropolitan Vein &amp; Aesthetic Center · New York City, US
          </p>
        </div>

        <blockquote className="results-case__quote">
          &ldquo;What I needed was someone who understood the difference between a marketing agency and a
          growth partner. Socialsect operated like they had skin in the game.&rdquo;
        </blockquote>

        <ul className="results-case__metrics">
          {METRICS.map(({ value, label }) => (
            <li key={label} className="results-case__metric">
              <span className="results-case__metric-value">{value}</span>
              <span className="results-case__metric-label">{label}</span>
            </li>
          ))}
        </ul>

        <div className="results-case__columns">
          <div className="results-case__block">
            <h4 className="results-case__block-title">What we built</h4>
            <p className="results-case__block-body">
              AI-optimized Meta ad campaigns for a two-location vascular practice in New York City, 
              targeting the Hispanic community in Washington Heights and Inwood for varicose vein
              consultations. Built and managed over 20 months with consistent creative strategy, audience
              refinement, and lead qualification. Two campaigns alone generated 2,300+ leads at a sustained
              $4 cost per lead.
            </p>
          </div>
          <div className="results-case__block">
            <h4 className="results-case__block-title">The problem we solved</h4>
            <p className="results-case__block-body">
              Metropolitan Vein &amp; Aesthetic Center needed consistent consultation volume from a specific
              patient demographic in a competitive NYC market. Generic healthcare advertising wasn&apos;t
              reaching the right community. We built culturally targeted Meta campaigns that delivered 700+
              consultations booked, a 60% treatment conversion rate, and return on ad spend ranging from 3.4x
              to 5.4x across 20+ months.
            </p>
          </div>
        </div>

        <div className="results-case__actions">
          <Link to="/book-a-call" className="results-case__btn results-case__btn--primary">
            Request a reference call
            <ArrowRight className="results-case__btn-icon" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
