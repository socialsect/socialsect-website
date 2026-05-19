import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight } from 'lucide-react'

const METRICS = [
  { value: '2,600+', label: 'Backlinks built' },
  { value: '93%', label: 'Dofollow link rate' },
  { value: '61', label: 'Linking domains' },
  { value: '50+', label: 'Keywords ranking page 1–10' },
  { value: '1,300+', label: 'Monthly organic sessions' },
  { value: 'AI-cited', label: 'Featured in AI search results consistently' },
]

export default function ResultsCaseStudyMehraSection() {
  return (
    <section className="results-case results-case--mehra" aria-labelledby="results-case-mehra-heading">
      <div className="results-case__inner">
        <header className="results-case__header">
          <p className="results-case__label">Case study</p>
          <h2 id="results-case-mehra-heading" className="results-case__title">
            Case study 02 · Dermatology · SEO · UK
          </h2>
          <p className="results-case__client">
            Client · Private dermatology clinic · Skin lesions &amp; minor surgery
          </p>
        </header>

        <div className="results-case__rule" aria-hidden>
          <svg className="results-case__rule-svg" viewBox="0 0 120 12" aria-hidden>
            <path d="M0 6h72" stroke="#1A1C1D" strokeWidth="1.25" opacity="0.2" strokeLinecap="round" />
            <path d="M80 6h40" stroke="#695AF2" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          </svg>
        </div>

        <div className="results-case__identity">
          <h3 className="results-case__name">Dr. Manu Mehra</h3>
          <p className="results-case__practice">
            Interface Clinic · London, United Kingdom
          </p>
        </div>

        <blockquote className="results-case__quote">
          &ldquo;We had the patients. We didn&apos;t have the system to keep them coming consistently.
          Socialsect built the infrastructure that made growth predictable instead of seasonal.&rdquo;
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
              Full SEO authority program, link building strategy, outreach, and placement across
              healthcare publications and medical directories. Built domain authority from near zero to
              2,600+ backlinks across 61 linking domains with 93% dofollow rate. Multiple procedure and
              condition keywords now ranking consistently on page 1–10 of Google, with consistent
              citation in AI-generated search results.
            </p>
          </div>
          <div className="results-case__block">
            <h4 className="results-case__block-title">The problem we solved</h4>
            <p className="results-case__block-body">
              Interface Clinic had strong clinical credentials, a Fellow of the Royal College of Surgeons
              performing 2,200+ procedures annually, but virtually no organic search presence. We built
              the SEO foundation that made Google a reliable second acquisition channel, now running almost
              neck-and-neck with direct traffic.
            </p>
          </div>
        </div>

        <div className="results-case__actions">
          <Link to={BOOK_A_CALL_FORM} className="results-case__btn results-case__btn--primary">
            Request a reference call
            <ArrowRight className="results-case__btn-icon" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
