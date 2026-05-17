import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ResultsCaseLibraryNoteSection() {
  return (
    <section className="results-library" aria-labelledby="results-library-heading">
      <div className="results-library__inner">
        <h2 id="results-library-heading" className="results-library__headline">
          We don&apos;t have a case study for every specialty yet. Here&apos;s why that&apos;s actually a
          good thing.
        </h2>
        <p className="results-library__body">
          We&apos;re selective about who we work with. We don&apos;t take on every practice that enquires
           because we only take on practices we&apos;re confident we can deliver results for. That means
          our case study library grows slowly and deliberately. Every practice in it is one we&apos;ve
          genuinely moved the needle for. If your specialty isn&apos;t represented here yet, book an
          audit. We&apos;ll tell you honestly whether we can help  and what that would look like.
        </p>
        <Link to="/#book-call" className="results-library__cta">
          Book a practice audit
          <ArrowRight className="results-library__cta-icon" strokeWidth={2} aria-hidden />
        </Link>
      </div>
    </section>
  )
}
