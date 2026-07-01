'use client'

import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight } from 'lucide-react'

const CONVERSION_PATHS = [
  {
    title: 'Book a free practice audit',
    description:
      "We'll map your current acquisition gap and show you what the fix looks like for your specialty.",
  },
  {
    title: 'Request a reference call',
    description:
      "Speak directly with a practice we've worked with, peer to peer.",
  },
]

export default function ResultsConversionInterstitialSection() {
  return (
    <section className="results-conversion" aria-labelledby="results-conversion-heading">
      <div className="results-conversion__inner">
        <p id="results-conversion-heading" className="results-conversion__lead">
          If your practice has the same problem Dr. Badia had: high lead volume, low show-up rate, and no
          system connecting them. That&apos;s exactly what we build.
        </p>

        <div className="results-conversion__cta">
          <h2 className="results-conversion__question">Does this sound like your practice?</h2>

          <ul className="results-conversion__paths">
            {CONVERSION_PATHS.map((path) => (
              <li key={path.title}>
                <Link to={BOOK_A_CALL_FORM} className="results-conversion__card">
                  <span className="results-conversion__card-title">{path.title}</span>
                  <p className="results-conversion__card-desc">{path.description}</p>
                  <span className="results-conversion__card-action" aria-hidden>
                    Get started
                    <ArrowRight className="results-conversion__card-icon" strokeWidth={2} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="results-conversion__note">
          No pitch. No packages. Just a clear picture of what&apos;s possible.
        </p>
      </div>
    </section>
  )
}
