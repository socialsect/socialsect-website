import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight } from 'lucide-react'

export default function ResultsConversionInterstitialSection() {
  return (
    <section className="results-conversion" aria-labelledby="results-conversion-heading">
      <div className="results-conversion__inner">
        <p id="results-conversion-heading" className="results-conversion__lead">
          If your practice has the same problem Dr. Badia had: high lead volume, low show-up rate, and no
          system connecting them. That&apos;s exactly what we build.
        </p>

        <p className="results-conversion__question">Does this sound like your practice?</p>

        <ul className="results-conversion__paths">
          <li>
            <Link to={BOOK_A_CALL_FORM} className="results-conversion__path">
              Book a free practice audit. We&apos;ll map your current acquisition gap and show you
              what the fix looks like for your specialty.
              <ArrowRight className="results-conversion__path-icon" strokeWidth={2} aria-hidden />
            </Link>
          </li>
          <li>
            <Link to={BOOK_A_CALL_FORM} className="results-conversion__path">
              Request a reference call. Speak directly with a practice we&apos;ve worked with, peer to
              peer.
              <ArrowRight className="results-conversion__path-icon" strokeWidth={2} aria-hidden />
            </Link>
          </li>
        </ul>

        <p className="results-conversion__note">
          No pitch. No packages. Just a clear picture of what&apos;s possible.
        </p>
      </div>
    </section>
  )
}
