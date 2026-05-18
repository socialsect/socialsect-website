import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const METRICS = [
  { value: '2,508', label: 'Total leads generated' },
  { value: '225', label: 'Consultations booked' },
  { value: '183', label: 'Patients who attended' },
  { value: '36', label: 'Surgical conversions' },
  { value: '81%', label: 'Consultation show-up rate' },
  { value: '16%', label: 'Consultation-to-surgery rate' },
]

function CaseStudyRuleMark() {
  return (
    <svg className="results-case__rule-svg" viewBox="0 0 120 12" aria-hidden>
      <path d="M0 6h72" stroke="#1A1C1D" strokeWidth="1.25" opacity="0.2" strokeLinecap="round" />
      <path d="M80 6h40" stroke="#695AF2" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}

export default function ResultsCaseStudySection() {
  return (
    <section className="results-case" aria-labelledby="results-case-heading">
      <div className="results-case__inner">
        <header className="results-case__header">
          <p className="results-case__label">Case study</p>
          <h2 id="results-case-heading" className="results-case__title">
            Case study 01 · Orthopaedic surgery · Miami, FL · US
          </h2>
          <p className="results-case__client">
            Client · Private practice · Shoulder, elbow &amp; sports medicine
          </p>
        </header>

        <div className="results-case__rule" aria-hidden>
          <CaseStudyRuleMark />
        </div>

        <div className="results-case__identity">
          <h3 className="results-case__name">Dr. Badia</h3>
          <p className="results-case__practice">
            Miami Sports &amp; Interventional · Miami, Florida
          </p>
        </div>

        <blockquote className="results-case__quote">
          &ldquo;Before Socialsect we were getting hundreds of leads a month. Maybe 10% showed up. The
          rest ghosted after the first message. What we weren&apos;t getting was patients who were
          serious about treatment and actually moved forward with care. That was the gap.
          That&apos;s what they fixed.&rdquo;
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
          <div id="results-case-built" className="results-case__block">
            <h4 className="results-case__block-title">What we built</h4>
            <p className="results-case__block-body">
              Full patient acquisition system, lead generation, qualification, automated follow-up
              sequences, conversion tracking, and monthly optimization. Every number above is pulled
              directly from the lead management sheet. No rounding. No estimates.
            </p>
          </div>
          <div className="results-case__block">
            <h4 className="results-case__block-title">The problem we solved</h4>
            <p className="results-case__block-body">
              High lead volume with low show-up rate. Insurance friction and location drop-off were
              killing quality. We rebuilt the targeting, tightened the qualification layer, and added
              automated pre-appointment sequences that reduced no-shows from 35% to under 20%.
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
