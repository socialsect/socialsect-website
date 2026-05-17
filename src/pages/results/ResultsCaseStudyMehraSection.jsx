import { ArrowRight } from 'lucide-react'

const STATUS_LINES = [
  'Full metrics in progress',
  'Case study being documented',
  'Results verifiable on request',
  'Reference available',
]

export default function ResultsCaseStudyMehraSection() {
  return (
    <section className="results-case results-case--mehra" aria-labelledby="results-case-mehra-heading">
      <div className="results-case__inner">
        <header className="results-case__header">
          <p className="results-case__label">Case study</p>
          <h2 id="results-case-mehra-heading" className="results-case__title">
            Case study 02 · Aesthetics · US
          </h2>
          <p className="results-case__client">Client · Private aesthetic practice</p>
        </header>

        <div className="results-case__rule" aria-hidden>
          <svg className="results-case__rule-svg" viewBox="0 0 120 12" aria-hidden>
            <path d="M0 6h72" stroke="#1A1C1D" strokeWidth="1.25" opacity="0.2" strokeLinecap="round" />
            <path d="M80 6h40" stroke="#695AF2" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          </svg>
        </div>

        <div className="results-case__identity">
          <h3 className="results-case__name">Dr. Mehra</h3>
          <p className="results-case__practice">Mehra Aesthetics · United States</p>
        </div>

        <blockquote className="results-case__quote results-case__quote--placeholder">
          &ldquo;We had the patients. We didn&apos;t have the system to keep them coming consistently.
          Socialsect built the infrastructure that made growth predictable instead of seasonal.&rdquo;
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
            Full case study to be documented once metrics are confirmed with Dr. Mehra. In the interim,
            reference is available via the introductory call process. Replace dashes above with real
            numbers when confirmed.
          </p>
        </div>

        <div className="results-case__actions results-case__actions--mehra">
          <a href="#qualifier-mehra" className="results-case__btn results-case__btn--primary">
            Talk to Dr. Mehra
            <ArrowRight className="results-case__btn-icon" strokeWidth={2} aria-hidden />
          </a>
          <a href="#reference-mehra" className="results-case__btn results-case__btn--ghost">
            Request a reference
            <ArrowRight className="results-case__btn-icon" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  )
}
