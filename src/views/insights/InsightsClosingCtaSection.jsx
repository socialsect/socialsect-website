'use client'

import Link from 'next/link'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight } from 'lucide-react'

export default function InsightsClosingCtaSection() {
  return (
    <section className="insights-closing" aria-labelledby="insights-closing-heading">
      <div className="insights-closing__inner">
        <h2 id="insights-closing-heading" className="insights-closing__headline">
          If you&apos;ve found something useful here  imagine what a conversation would do.
        </h2>
        <p className="insights-closing__body">
          A free 45-minute practice audit. We&apos;ll look at your specific situation and tell you
          honestly where the gaps are.
        </p>
        <div className="insights-closing__actions">
          <Link href={BOOK_A_CALL_FORM} className="insights-closing__btn insights-closing__btn--primary">
            See what your practice is missing
            <ArrowRight className="insights-closing__btn-icon" strokeWidth={1} aria-hidden />
          </Link>
          <Link href={BOOK_A_CALL_FORM} className="insights-closing__btn insights-closing__btn--ghost">
            Request a reference call
          </Link>
        </div>
      </div>
    </section>
  )
}
