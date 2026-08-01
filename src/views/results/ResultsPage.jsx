'use client'
import './ResultsPage.css'
import '../../components/ResultsSpotlightSection.css'
import LazyDarkVeil from '../../components/dark-veil/LazyDarkVeil.jsx'
import { Suspense, lazy } from 'react'
import ResultsSpotlightCard from '../../components/ResultsSpotlightCard'
import ResultsPieChart from '../../components/ResultsPieChart'
import ResultsCaseStudySection from './ResultsCaseStudySection'
import ResultsConversionInterstitialSection from './ResultsDrBadiaProcessSection'
import ResultsCaseStudyMehraSection from './ResultsCaseStudyMehraSection'
import ResultsCaseStudyGoldmanSection from './ResultsCaseStudyGoldmanSection'
import ResultsCaseLibraryNoteSection from './ResultsCaseLibraryNoteSection'
import ResultsClosingCtaSection from './ResultsClosingCtaSection'

const ContentLibraryCarousel = lazy(() => import('../../components/ContentLibraryCarousel'))

const SPOTLIGHT_CLIENTS = [
  {
    name: 'Dr. Alejandro Badia',
    specialty: 'Hand and upper extremity orthopedic surgeon',
    location: 'Miami, FL',
    image: '/drbadia.webp',
    imageAlt: 'Dr. Badia holding his book Healthcare from the Trenches',
    description: 'Dr. Badia treats complex conditions of the hand, wrist, elbow, and shoulder at the Badia Hand to Shoulder Center. He trained at Cornell and NYU, later serving as Chief of Hand Surgery at Baptist Hospital of Miami, and co-founded the Miami Anatomical Research Center, the largest surgical cadaveric training lab in the world. He also started OrthoNOW, South Florida\'s first orthopedic urgent care center.',
    stats: [
      { value: '225', label: 'Consultations booked' },
      { value: '4.2x', label: 'Patient acquisition growth' },
      { value: '$600K+', label: 'Additional revenue generated' },
      { value: 'English + Spanish', label: 'Bilingual funnel' },
    ],
    whatWeDid: 'Built the whole patient acquisition system: lead generation, qualification, follow-up automation, and conversion tracking.',
  },
  {
    name: 'Dr. Manu Mehra',
    specialty: 'Dermatology — skin lesions & minor surgery',
    location: 'London, UK',
    image: '/images/drmau.png',
    imageAlt: 'Dr. Manu Mehra',
    description: 'Interface Clinic performs 2,200+ procedures annually. Dr. Mehra is a Fellow of the Royal College of Surgeons with strong clinical credentials but virtually no organic search presence before Socialsect.',
    stats: [
      { value: '2,600+', label: 'Backlinks built' },
      { value: '93%', label: 'Dofollow link rate' },
      { value: '$400K+', label: 'Annual revenue from organic' },
      { value: '1,300+', label: 'Monthly organic sessions' },
    ],
    whatWeDid: 'Full SEO authority program: link building strategy, outreach, and placement across healthcare publications and medical directories. Built domain authority from near zero.',
  },
  {
    name: 'Dr. Adam Goldman, MD',
    specialty: 'Vascular & aesthetic medicine — varicose vein treatment',
    location: 'New York City, US',
    image: '/images/dradam.png',
    imageAlt: 'Dr. Adam Goldman',
    description: 'Metropolitan Vein & Aesthetic Center needed consistent consultation volume from a specific patient demographic in a competitive NYC market. Generic healthcare advertising wasn\'t reaching the right community.',
    stats: [
      { value: '2,300+', label: 'Leads generated' },
      { value: '$4', label: 'Cost per lead' },
      { value: '$1.2M+', label: 'Revenue attributed' },
      { value: '3.4x–5.4x', label: 'Return on ad spend' },
    ],
    whatWeDid: 'AI-optimized Meta ad campaigns targeting the Hispanic community in Washington Heights and Inwood. Built and managed over 20 months with consistent creative strategy and lead qualification.',
  },
]

export default function ResultsPage() {
  return (
    <main className="results-page">
      <section className="results-hero" aria-labelledby="results-hero-heading">
        <div className="results-hero__bg-animation" aria-hidden>
          <LazyDarkVeil speed={0.5} />
        </div>

        <div className="results-hero__container">
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
          <div className="results-hero__chart">
            <ResultsPieChart />
          </div>
        </div>
      </section>

      <section className="results-spotlights" aria-labelledby="results-spotlights-heading">
        <div className="results-spotlights__inner">
          <header className="results-spotlights__header">
            <p className="results-spotlights__eyebrow">Don&apos;t just take our word for it</p>
            <h2 id="results-spotlights-heading" className="results-spotlights__headline">
              Real practices. Real numbers.<br />
              <em>Nothing rounded up.</em>
            </h2>
          </header>
          <div className="results-spotlights__grid">
            {SPOTLIGHT_CLIENTS.map((client, index) => (
              <ResultsSpotlightCard key={client.name} {...client} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <ResultsCaseStudySection />
      <ResultsConversionInterstitialSection />
      <ResultsCaseStudyMehraSection />
      <ResultsCaseStudyGoldmanSection />
      <ResultsCaseLibraryNoteSection />
      <Suspense fallback={null}>
        <ContentLibraryCarousel />
      </Suspense>

      <section className="results-filter" aria-labelledby="results-filter-heading">
        <div className="results-filter__inner">
          <h2 id="results-filter-heading" className="results-filter__headline">
            We don&apos;t work with everyone.
          </h2>
          <p className="results-filter__sub">
            We work with practice owners who take ownership of their results as much as we do.
          </p>
        </div>
      </section>

      <ResultsClosingCtaSection />
    </main>
  )
}
