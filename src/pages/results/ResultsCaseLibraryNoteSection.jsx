import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ResultsCaseLibraryNoteSection() {
  return (
    <section className="results-library" aria-labelledby="results-library-heading">
      <div className="results-library__inner">
        <h2 id="results-library-heading" className="results-library__headline">
          Your specialty isn&apos;t in these case studies yet. Here&apos;s why that&apos;s actually a good
          thing.
        </h2>

        <div className="results-library__body">
          <p>
            We&apos;re selective about who we work with. We don&apos;t take on every practice that approaches
            us, only ones we&apos;re confident we can move the needle for. That means our case study library
            grows slowly and deliberately. Every practice in it is one we&apos;ve genuinely moved the needle
            for.
          </p>
          <p>
            If your specialty isn&apos;t represented here yet, here&apos;s what we&apos;ll do: in your free
            practice audit, we&apos;ll show you the closest analogue from our work, map the gap in your
            specific market, and tell you honestly whether we can replicate these results for your practice.
          </p>
          <p>If we can&apos;t, we&apos;ll tell you that too.</p>
          <p className="results-library__ways-label">Two ways to find out:</p>
        </div>

        <ul className="results-library__paths">
          <li>
            <Link to="/book-a-call" className="results-library__cta">
              Book a free practice audit (45 minutes). We map your acquisition gap and show you what&apos;s
              possible.
              <ArrowRight className="results-library__cta-icon" strokeWidth={2} aria-hidden />
            </Link>
          </li>
          <li>
            <Link to="/book-a-call" className="results-library__cta">
              Request a reference call. Speak directly with one of the practices above. Peer to peer. No
              scripts.
              <ArrowRight className="results-library__cta-icon" strokeWidth={2} aria-hidden />
            </Link>
          </li>
        </ul>

        <p className="results-library__note">
          No pitch. No packages. Just a clear answer.
        </p>
      </div>
    </section>
  )
}
