import './ResultsPage.css'
import ResultsAggregateSection from './ResultsAggregateSection'
import ResultsCaseStudySection from './ResultsCaseStudySection'
import ResultsConversionInterstitialSection from './ResultsDrBadiaProcessSection'
import ResultsCaseStudyMehraSection from './ResultsCaseStudyMehraSection'
import ResultsCaseStudyGoldmanSection from './ResultsCaseStudyGoldmanSection'
import ResultsCaseLibraryNoteSection from './ResultsCaseLibraryNoteSection'
import ResultsClosingCtaSection from './ResultsClosingCtaSection'

export default function ResultsPage() {
  return (
    <main className="results-page">
      <section className="results-hero" aria-labelledby="results-hero-heading">
        <div className="results-hero__inner">
          <p className="results-hero__eyebrow">
            No rounding up. No estimates. No invented numbers.
          </p>
          <h1 id="results-hero-heading" className="results-hero__title">
            Every number on this page is documented. If we can&apos;t prove it, it&apos;s not here.
          </h1>
          <p className="results-hero__sub">
            Most agencies show you logos and vague success stories. We show you the actual numbers:
            leads generated, consultations booked, surgeries converted, revenue attributed. And if you
            want to speak with the practice owner directly, we&apos;ll make that happen. That&apos;s
            how confident we are in what we&apos;ve built.
          </p>
        </div>
      </section>
      <ResultsAggregateSection />
      <ResultsCaseStudySection />
      <ResultsConversionInterstitialSection />
      <ResultsCaseStudyMehraSection />
      <ResultsCaseStudyGoldmanSection />
      <ResultsCaseLibraryNoteSection />
      <ResultsClosingCtaSection />
    </main>
  )
}
