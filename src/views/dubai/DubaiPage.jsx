'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import ResultsSpotlightCard from '../../components/ResultsSpotlightCard'
import '../results/ResultsPage.css'
import '../../components/ResultsSpotlightSection.css'
import './DubaiPage.css'

const MARQUEE_LOGOS = [
  { src: '/client-logos/interface1.webp', screen: false, wide: false },
  { src: '/client-logos/msi.webp', screen: false, wide: false },
  { src: '/client-logos/nymv.webp', screen: true, wide: false },
  { src: '/client-logos/III.webp', screen: false, wide: true },
]

const MIN_TILES_PER_HALF = 14

const HERO_STATS = [
  { number: '10,000+', label: 'Consultations booked for clients' },
  { number: '$10M+', label: 'In patient pipeline generated' },
  { number: '4.2x', label: 'Average client ROI' },
  { number: '70%', label: 'Consultation-to-surgery rate' },
]

const TRUSTED_PRACTICES = [
  { name: 'Miami Shoulder Institute', href: 'https://miamishoulderinstitute.com/' },
  { name: 'The Interface Specialist Clinic', href: 'https://interfaceclinic.co.uk/' },
  { name: 'NY Metrovein Medical', href: 'https://www.nymetrovein.com/' },
  { name: 'L&P Aesthetics', href: null },
]

const PROVEN_MARKETS = [
  { name: 'US', status: 'Proven', active: true },
  { name: 'UK', status: 'Proven', active: true },
  { name: 'UAE · Dubai', status: 'We are here', active: false },
]

const PILLARS = [
  {
    num: '01',
    title: 'Build',
    copy: 'Practice websites, booking systems, and web applications engineered to turn visitors into booked consultations.',
    href: '/services#build',
  },
  {
    num: '02',
    title: 'Grow',
    copy: 'Meta ads, Google ads, and SEO run as one system — tracked, measured, and reported in appointments, not impressions.',
    href: '/services#grow',
  },
  {
    num: '03',
    title: 'Brand',
    copy: 'Identity, design, and video that make the clinical standard of your practice impossible to miss.',
    href: '/services#brand',
  },
]

const TRACK_RECORD = [
  { value: '10,000+', label: 'Consultations booked for clients' },
  { value: '$10M+', label: 'Patient pipeline generated' },
  { value: '4.2x', label: 'Average client ROI' },
  { value: '300%', label: 'Consults up in 6 months for one practice' },
]

const PROOF_POINTS = [
  { value: '2,971', label: 'Leads generated' },
  { value: '700+', label: 'Booked consultations' },
  { value: '$5.27', label: 'Average cost per lead' },
  { value: '$100k+', label: 'Attributed revenue' },
]

const SPECIALTIES = [
  { name: 'Dermatology', copy: 'Consultations, not clicks. For clinics that treat skin like a medical specialty.' },
  { name: 'MedSpa & aesthetics', copy: 'Systems for practices that need bookings, not browsable galleries.' },
  { name: 'Plastic surgery', copy: 'High-ticket patients who research hard — and book with the practice that earns trust online.' },
  { name: 'Orthopaedics & sports medicine', copy: 'Referrer relationships and search profiles that put your surgeons in front of the right procedures.' },
  { name: 'Dentistry & orthodontics', copy: 'From cosmetic dentistry to implants — pipelines built around case value, not lead volume.' },
  { name: 'Vein & vascular clinics', copy: 'The same acquisition discipline that made our US vein clinic clients multiply their consults.' },
  { name: 'Fertility clinics', copy: 'Sensitive, considered decisions. Proven systems for moving patients from research to consultation.' },
  { name: 'Hair transplant', copy: 'An inbound channel that books months out, when the system behind it is built right.' },
]

const CLIENT_RESULTS = [
  {
    name: 'Dr. Alejandro Badia',
    specialty: 'Hand and upper extremity orthopedic surgeon',
    location: 'Miami, FL',
    image: '/drbadia.webp',
    imageAlt: 'Dr. Badia holding his book Healthcare from the Trenches',
    description:
      'Dr. Badia treats complex conditions of the hand, wrist, elbow, and shoulder at the Badia Hand to Shoulder Center. He trained at Cornell and NYU, later serving as Chief of Hand Surgery at Baptist Hospital of Miami, and co-founded the Miami Anatomical Research Center, the largest surgical cadaveric training lab in the world. He also started OrthoNOW, South Florida\'s first orthopedic urgent care center.',
    stats: [
      { value: '225', label: 'Consultations booked' },
      { value: '4.2x', label: 'Patient acquisition growth' },
      { value: '$600K+', label: 'Additional revenue generated' },
      { value: 'English + Spanish', label: 'Bilingual funnel' },
    ],
    whatWeDid:
      'Built the whole patient acquisition system: lead generation, qualification, follow-up automation, and conversion tracking.',
  },
  {
    name: 'Dr. Manu Mehra',
    specialty: 'Dermatology — skin lesions & minor surgery',
    location: 'London, UK',
    image: '/images/drmau.png',
    imageAlt: 'Dr. Manu Mehra',
    description:
      'Interface Clinic performs 2,200+ procedures annually. Dr. Mehra is a Fellow of the Royal College of Surgeons with strong clinical credentials but virtually no organic search presence before Socialsect.',
    stats: [
      { value: '2,600+', label: 'Backlinks built' },
      { value: '93%', label: 'Dofollow link rate' },
      { value: '$400K+', label: 'Annual revenue from organic' },
      { value: '1,300+', label: 'Monthly organic sessions' },
    ],
    whatWeDid:
      'Full SEO authority program: link building strategy, outreach, and placement across healthcare publications and medical directories. Built domain authority from near zero.',
  },
  {
    name: 'Dr. Adam Goldman, MD',
    specialty: 'Vascular & aesthetic medicine — varicose vein treatment',
    location: 'New York City, US',
    image: '/images/dradam.png',
    imageAlt: 'Dr. Adam Goldman',
    description:
      'Metropolitan Vein & Aesthetic Center needed consistent consultation volume from a specific patient demographic in a competitive NYC market. Generic healthcare advertising wasn\'t reaching the right community.',
    stats: [
      { value: '2,300+', label: 'Leads generated' },
      { value: '$4', label: 'Cost per lead' },
      { value: '$1.2M+', label: 'Revenue attributed' },
      { value: '3.4x–5.4x', label: 'Return on ad spend' },
    ],
    whatWeDid:
      'AI-optimized Meta ad campaigns targeting the Hispanic community in Washington Heights and Inwood. Built and managed over 20 months with consistent creative strategy and lead qualification.',
  },
]

export default function DubaiPage() {
  const marqueeTrack = useMemo(() => {
    const half = []
    let i = 0
    while (half.length < MIN_TILES_PER_HALF) {
      half.push(MARQUEE_LOGOS[i % MARQUEE_LOGOS.length])
      i += 1
    }
    return [...half, ...half]
  }, [])

  return (
    <main className="dubai-page">
      <section className="dubai-hero" aria-labelledby="dubai-hero-heading">
        <div className="dubai-hero__bg" aria-hidden="true">
          <img
            src="/images/dubai-hero.webp"
            alt="The Dubai skyline at dusk"
            className="dubai-hero__bg-image"
            fetchPriority="high"
            decoding="async"
          />
          <div className="dubai-hero__overlay" />
        </div>

        <div className="dubai-hero__content">
          <div className="dubai-hero__main">
            <div className="dubai-hero-copy">
              <p className="dubai-hero-eyebrow">
                <span className="dubai-hero-eyebrow__line" aria-hidden="true" />
                Marketing for private medical practices &middot; US &amp; UK proven, now Dubai
              </p>

              <h1 id="dubai-hero-heading" className="dubai-hero-headline">
                <span className="dubai-hero-headline__line">We built our playbook</span>
                <span className="dubai-hero-headline__line">in the US &amp; UK.</span>
                <span className="dubai-hero-headline__line dubai-hero-headline__line--gradient">
                  Now we&apos;re bringing it
                </span>
                <span className="dubai-hero-headline__line">to Dubai.</span>
              </h1>

              <p className="dubai-hero-subheadline">
                We&apos;re not a marketing agency. We&apos;re the team that embeds into your
                practice, diagnoses exactly where patients fall through the gaps, and builds
                the system that closes them. One team. No packages.
              </p>

              <div className="dubai-hero-cta-buttons">
                <Link href={BOOK_A_CALL_FORM} className="dubai-hero-btn dubai-hero-btn--primary">
                  Book a strategy call
                  <svg
                    className="dubai-hero-btn__arrow dubai-hero-btn__arrow--right"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link href="/results" className="dubai-hero-btn dubai-hero-btn--secondary">
                  See our work
                  <svg
                    className="dubai-hero-btn__arrow dubai-hero-btn__arrow--down"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </Link>
              </div>
            </div>

            <blockquote className="dubai-hero-testimonial">
              <span className="dubai-hero-testimonial__quote" aria-hidden="true">
                &ldquo;&rdquo;
              </span>
              <p className="dubai-hero-testimonial__text">
                Since working with Socialsect, our consults increased by 300% in 6 months.
              </p>
              <span className="dubai-hero-testimonial__divider" aria-hidden="true" />
              <footer className="dubai-hero-testimonial__attribution">
                <cite>Dr. Christopher</cite>
                <span>Boca Raton Clinic &middot; US</span>
              </footer>
            </blockquote>
          </div>

          <div className="dubai-hero-stats-bar">
            {HERO_STATS.map(({ number, label }) => (
              <div className="dubai-hero-stat" key={label}>
                <div className="dubai-hero-stat__number">{number}</div>
                <div className="dubai-hero-stat__label">{label}</div>
              </div>
            ))}
          </div>

          <div className="dubai-hero-trust">
            <p className="dubai-hero-trust__label">Trusted by leading practices in the US &amp; UK</p>
            <div className="dubai-hero-trust__logos">
              {TRUSTED_PRACTICES.map(({ name, href }) =>
                href ? (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dubai-hero-trust__logo"
                  >
                    {name}
                  </a>
                ) : (
                  <span key={name} className="dubai-hero-trust__logo">
                    {name}
                  </span>
                ),
              )}
              <span className="dubai-hero-trust__more">and more&hellip;</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dubai-marquee" aria-label="Client logos">
        <div className="dubai-marquee__viewport">
          <div className="dubai-marquee__track">
            {marqueeTrack.map(({ src, screen, wide }, i) => (
              <div
                key={`${src}-${i}`}
                className={`dubai-marquee__item${screen ? ' dubai-marquee__item--screen' : ''}${
                  wide ? ' dubai-marquee__item--wide' : ''
                }`}
              >
                <img src={src} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dubai-expansion" aria-labelledby="dubai-expansion-heading">
        <div className="dubai-expansion__animation" aria-hidden="true">
          <div className="dubai-expansion__aurora dubai-expansion__aurora--a" />
          <div className="dubai-expansion__aurora dubai-expansion__aurora--b" />
          <div className="dubai-expansion__veil" />
        </div>

        <div className="dubai-expansion__inner">
          <div className="dubai-expansion__intro">
            <p className="dubai-expansion__eyebrow">The expansion</p>
            <h2 id="dubai-expansion-heading" className="dubai-expansion__headline">
              Dubai doesn&apos;t need another agency. <em>It needs a system.</em>
            </h2>
            <p className="dubai-expansion__copy">
              We&apos;ve spent years inside private practices in the US and the UK —
              diagnosing acquisition gaps, rebuilding websites, running paid growth, and
              being held accountable to one number: patients in the chair. That&apos;s the
              playbook we&apos;re bringing to Dubai.
            </p>
            <p className="dubai-expansion__copy">
              Dubai&apos;s private healthcare market is young, crowded, and moving fast. The
              demand is there. The practices that win won&apos;t be the ones that advertise
              louder — they&apos;ll be the ones with a pipeline that actually converts.
              We build that pipeline.
            </p>
          </div>

          <div className="dubai-expansion__route" aria-label="Where Socialsect has run">
            {PROVEN_MARKETS.map((market, i) => (
              <div className="dubai-expansion__market" key={market.name}>
                <div className="dubai-expansion__market-top">
                  <span
                    className={`dubai-expansion__dot${market.active ? ' dubai-expansion__dot--active' : ''}`}
                    aria-hidden="true"
                  />
                  {i < PROVEN_MARKETS.length - 1 && (
                    <span className="dubai-expansion__route-line" aria-hidden="true" />
                  )}
                </div>
                <p className="dubai-expansion__market-name">{market.name}</p>
                <p className="dubai-expansion__market-status">{market.status}</p>
              </div>
            ))}
          </div>

          <div className="dubai-expansion__pillars">
            {PILLARS.map(({ num, title, copy, href }) => (
              <div className="dubai-expansion__pillar" key={num}>
                <span className="dubai-expansion__pillar-num">{num}</span>
                <h3 className="dubai-expansion__pillar-title">{title}</h3>
                <p className="dubai-expansion__pillar-copy">{copy}</p>
                <Link href={href} className="dubai-expansion__pillar-link">
                  Explore {title.toLowerCase()} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dubai-record" aria-labelledby="dubai-record-heading">
        <div className="dubai-record__inner">
          <header className="dubai-record__intro">
            <p className="dubai-record__eyebrow">The record</p>
            <h2 id="dubai-record-heading" className="dubai-record__headline">
              The numbers we&apos;re bringing to Dubai.
              <br />
              <em>Nothing rounded up.</em>
            </h2>
          </header>

          <div className="dubai-record__stats">
            {TRACK_RECORD.map(({ value, label }) => (
              <div className="dubai-record__stat" key={label}>
                <span className="dubai-record__stat-value">{value}</span>
                <span className="dubai-record__stat-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="dubai-record__proof-panel">
            <div className="dubai-record__proof-main">
              <p className="dubai-record__proof-kicker">In one engagement</p>
              <p className="dubai-record__proof-copy">
                A rebuilt acquisition system, first months, one US client. The same
                discipline we apply to every market we enter.
              </p>
            </div>
            <ul className="dubai-record__proof-list">
              {PROOF_POINTS.map(({ value, label }) => (
                <li className="dubai-record__proof-item" key={label}>
                  <span className="dubai-record__proof-value">{value}</span>
                  <span className="dubai-record__proof-label">{label}</span>
                </li>
              ))}
            </ul>
            <p className="dubai-record__proof-attribution">
              NY Metrovein Medical &middot; US
            </p>
          </div>
        </div>
      </section>

      <section className="dubai-specialties" aria-labelledby="dubai-specialties-heading">
        <div className="dubai-specialties__inner">
          <header className="dubai-specialties__intro">
            <p className="dubai-specialties__eyebrow">Who we work with</p>
            <h2 id="dubai-specialties-heading" className="dubai-specialties__headline">
              Built for private practices.
              <br />
              <em>Made for Dubai.</em>
            </h2>
            <p className="dubai-specialties__subcopy">
              The same specialties we&apos;ve grown in the US and UK — now running the same
              playbook in the UAE.
            </p>
          </header>

          <div className="dubai-specialties__grid">
            {SPECIALTIES.map(({ name, copy }, i) => (
              <div className="dubai-specialties__card" key={name}>
                <span className="dubai-specialties__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="dubai-specialties__title">{name}</h3>
                <p className="dubai-specialties__copy">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="results-spotlights" aria-labelledby="dubai-clients-heading">
        <div className="results-spotlights__inner">
          <header className="results-spotlights__header">
            <p className="results-spotlights__eyebrow">Don&apos;t just take our word for it</p>
            <h2 id="dubai-clients-heading" className="results-spotlights__headline">
              Real practices. Real numbers.
              <br />
              <em>Nothing rounded up.</em>
            </h2>
            <p className="dubai-clients__subcopy">
              Every number below is documented. If we can&apos;t prove it, it&apos;s not here.
            </p>
          </header>

          <div className="results-spotlights__grid">
            {CLIENT_RESULTS.map((client, index) => (
              <ResultsSpotlightCard key={client.name} {...client} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="dubai-closing" aria-labelledby="dubai-closing-heading">
        <div className="dubai-closing__bg" aria-hidden="true">
          <div className="dubai-closing__overlay" />
        </div>
        <div className="dubai-closing__inner">
          <h2 id="dubai-closing-heading" className="dubai-closing__headline">
            Dubai is moving fast. Your patient pipeline should move first.
          </h2>
          <p className="dubai-closing__body">
            Book a 45-minute strategy call. No pitch. No packages. Just the system we&apos;ve
            proven across two markets — applied to your practice in Dubai.
          </p>
          <div className="dubai-closing__actions">
            <Link href={BOOK_A_CALL_FORM} className="dubai-closing__btn dubai-closing__btn--primary">
              Book a strategy call
              <svg
                className="dubai-closing__btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a href="mailto:hello@gosocialsect.com" className="dubai-closing__btn dubai-closing__btn--ghost">
              Email us directly
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}