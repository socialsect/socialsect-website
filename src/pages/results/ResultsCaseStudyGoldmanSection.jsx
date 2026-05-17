import { ArrowRight } from 'lucide-react'

const STATUS_LINES = [
  'Full metrics in progress',
  'Case study being documented',
  'Results verifiable on request',
  'Reference available',
]

export default function ResultsCaseStudyGoldmanSection() {
  return (
    <section className="results-case results-case--goldman" aria-labelledby="results-case-goldman-heading">
      <div className="results-case__inner">
        <header className="results-case__header">
          <p className="results-case__label">Case study</p>
          <h2 id="results-case-goldman-heading" className="results-case__title">
            Case study 03 · Medical practice · US
          </h2>
          <p className="results-case__client">Client · Private medical practice</p>
        </header>

        <div className="results-case__rule" aria-hidden>
          <svg className="results-case__rule-svg" viewBox="0 0 120 12" aria-hidden>
            <path d="M0 6h72" stroke="#1A1C1D" strokeWidth="1.25" opacity="0.2" strokeLinecap="round" />
            <path d="M80 6h40" stroke="#695AF2" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          </svg>
        </div>

        <div className="results-case__identity">
          <h3 className="results-case__name">Dr. Goldman</h3>
          <p className="results-case__practice">Goldman Medical · United States</p>
        </div>

        <blockquote className="results-case__quote results-case__quote--placeholder">
          &ldquo;What I needed was someone who understood the difference between a marketing agency and a
          growth partner. Socialsect operated like they had skin in the game.&rdquo;
        </blockquote>

        <ul className="results-case-mehra__status" aria-label="Case study status">
          {STATUS_LINES.map((line) => (
            <li key={line} className="results-case-mehra__status-line">
              <span className="results-case-mehra__dash" aria-hidden>
                
              </span>
              {line}
            </li>
          ))}
        </ul>

        <div className="results-case-mehra__note">
          <p className="results-case-mehra__note-label">Note  placeholder</p>
          <p className="results-case-mehra__note-body">
            Full case study to be documented once metrics are confirmed with Dr. Goldman. Replace dashes
            above with real numbers when confirmed.
          </p>
        </div>

        <div className="results-case__actions results-case__actions--mehra">
          <a href="#qualifier-goldman" className="results-case__btn results-case__btn--primary">
            Talk to Dr. Goldman
            <ArrowRight className="results-case__btn-icon" strokeWidth={2} aria-hidden />
          </a>
          <a href="#reference-goldman" className="results-case__btn results-case__btn--ghost">
            Request a reference
            <ArrowRight className="results-case__btn-icon" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
