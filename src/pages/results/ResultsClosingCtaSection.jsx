import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight } from 'lucide-react'

export default function ResultsClosingCtaSection() {
  return (
    <section className="results-closing" aria-labelledby="results-closing-heading">
      <div className="results-closing__inner">
        <h2 id="results-closing-heading" className="results-closing__headline">
          The numbers are real. The doctors are real. The only question is whether your practice could be
          next.
        </h2>
        <p className="results-closing__body">
          Start with a free practice audit or request a reference call. Both lead to the same place: a
          clear picture of what&apos;s possible for your specific practice.
        </p>
        <div className="results-closing__actions">
          <Link to={BOOK_A_CALL_FORM} className="results-closing__btn results-closing__btn--primary">
            Book my free practice audit
            <ArrowRight className="results-closing__btn-icon" strokeWidth={2} aria-hidden />
          </Link>
          <Link to={BOOK_A_CALL_FORM} className="results-closing__btn results-closing__btn--ghost">
            Request a reference call
            <ArrowRight className="results-closing__btn-icon" strokeWidth={2} aria-hidden />
          </Link>
        </div>
        <p className="results-closing__note">
          No packages. No pitch. Two ways in, both on your terms.
        </p>
      </div>
    </section>
  )
}
