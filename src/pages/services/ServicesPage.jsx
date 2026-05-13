import { Link, useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowRight } from 'lucide-react'
import './ServicesPage.css'

const WHO_WE_HELP_SPECIALTIES = [
  { slug: 'orthopaedic-surgeons', label: 'Orthopaedic surgeons' },
  { slug: 'dermatologists', label: 'Dermatologists' },
  { slug: 'medspa-owners', label: 'MedSpa owners' },
  { slug: 'plastic-surgeons', label: 'Plastic surgeons' },
  { slug: 'dentists', label: 'Dentists' },
  { slug: 'ophthalmologists', label: 'Ophthalmologists' },
  { slug: 'aesthetic-practitioners', label: 'Aesthetic practitioners' },
  { slug: 'vascular-surgeons', label: 'Vascular surgeons' },
]

function scrollToPillar(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ServicesPage() {
  const navigate = useNavigate()

  return (
    <main className="services-page">
      <section className="services-hero" aria-labelledby="services-hero-heading">
        <div className="services-hero__inner">
          <p className="services-hero__eyebrow">
            Everything your practice needs · One team · Zero gaps
          </p>
          <h1 id="services-hero-heading" className="services-hero__title">
            You shouldn&apos;t need five vendors to run one practice.
          </h1>
          <p className="services-hero__sub">
            Most practices have someone for ads, someone for the website, someone for social,
            someone for SEO — and nobody accountable when the schedule has gaps. We replace all of
            them. One team that builds your digital presence, runs your patient acquisition, and
            creates your brand — all connected, all measured against one thing: patients confirmed
            in your chair.
          </p>
          <div className="services-hero__anchors" role="navigation" aria-label="Jump to service pillars">
            <button
              type="button"
              className="services-hero__jump-btn"
              onClick={() => scrollToPillar('build')}
            >
              <ArrowDown className="services-hero__jump-icon" strokeWidth={2} aria-hidden />
              <span>Build — digital infrastructure</span>
            </button>
            <button
              type="button"
              className="services-hero__jump-btn"
              onClick={() => scrollToPillar('grow')}
            >
              <ArrowDown className="services-hero__jump-icon" strokeWidth={2} aria-hidden />
              <span>Grow — patient acquisition</span>
            </button>
            <button
              type="button"
              className="services-hero__jump-btn"
              onClick={() => scrollToPillar('brand')}
            >
              <ArrowDown className="services-hero__jump-icon" strokeWidth={2} aria-hidden />
              <span>Brand — creative</span>
            </button>
          </div>
        </div>
      </section>

      <section className="services-trio" aria-labelledby="services-trio-heading">
        <div className="services-trio__inner">
          <h2 id="services-trio-heading" className="services-trio__headline">
            Three things every growing practice needs. Most get none of them right.
          </h2>
          <div className="services-trio__grid">
            <article className="services-trio__card">
              <span className="services-trio__index" aria-hidden>
                01
              </span>
              <h3 className="services-trio__title">Build</h3>
              <p className="services-trio__body">
                Your digital foundation. Websites, apps, booking systems, and web tools — built to
                work together and built to last.
              </p>
              <Link to="/services/build" className="services-trio__explore">
                Explore Build
                <ArrowRight className="services-trio__explore-icon" strokeWidth={2} aria-hidden />
              </Link>
            </article>
            <article className="services-trio__card">
              <span className="services-trio__index" aria-hidden>
                02
              </span>
              <h3 className="services-trio__title">Grow</h3>
              <p className="services-trio__body">
                Patient acquisition that delivers confirmed appointments, not leads that go
                nowhere. Every channel connected. Every result measured.
              </p>
              <Link to="/services/grow" className="services-trio__explore">
                Explore Grow
                <ArrowRight className="services-trio__explore-icon" strokeWidth={2} aria-hidden />
              </Link>
            </article>
            <article className="services-trio__card">
              <span className="services-trio__index" aria-hidden>
                03
              </span>
              <h3 className="services-trio__title">Brand</h3>
              <p className="services-trio__body">
                How your practice looks, sounds, and is remembered — before a patient has ever
                walked through your door.
              </p>
              <Link to="/services/brand" className="services-trio__explore">
                Explore Brand
                <ArrowRight className="services-trio__explore-icon" strokeWidth={2} aria-hidden />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section
        id="build"
        className="services-detail"
        tabIndex={-1}
        aria-labelledby="services-detail-build-heading"
      >
        <div className="services-detail__grid">
          <div className="services-detail__copy">
            <p className="services-detail__eyebrow">Build · Digital infrastructure</p>
            <h2 id="services-detail-build-heading" className="services-detail__headline">
              Your website is the first consultation a patient has with you. Most practice websites
              fail it.
            </h2>
            <p className="services-detail__body">
              Most practice websites were built by someone who understood design but not medicine.
              They load slowly, don&apos;t rank on Google, and lose patients at the booking step. We
              build digital infrastructure that understands the patient journey — from first search
              to confirmed appointment.
            </p>
            <div className="services-detail__voice">
              <p className="services-detail__voice-label">Who this is for</p>
              <blockquote className="services-detail__voice-quote">
                <p>
                  Your current website is outdated, slow, or doesn&apos;t convert visitors into
                  bookings. You need a booking system that reduces front desk workload. You want a
                  custom tool built around your specific workflow — not a generic template someone
                  else is also using.
                </p>
              </blockquote>
            </div>
            <button
              type="button"
              className="btn btn-primary services-detail__explore-btn"
              onClick={() => navigate('/services/build')}
            >
              Explore Build in detail
              <ArrowRight className="services-detail__explore-icon" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <div className="services-detail__included">
            <h3 className="services-detail__included-title">What&apos;s included</h3>

            <div className="services-detail__block">
              <h4 className="services-detail__block-title">Practice websites</h4>
              <ul className="services-detail__list">
                <li>Custom designed · specialty-specific · SEO-optimised from day one</li>
                <li>Built to convert visitors into booked consultations · not just look good</li>
                <li>Mobile-first · fast loading · HIPAA-aware data handling</li>
              </ul>
            </div>

            <div className="services-detail__block">
              <h4 className="services-detail__block-title">Booking + management systems</h4>
              <ul className="services-detail__list">
                <li>Online appointment booking integrated into your existing workflow</li>
                <li>Automated reminders to reduce no-show rates</li>
                <li>Patient intake forms · follow-up sequences · confirmation flows</li>
              </ul>
            </div>

            <div className="services-detail__block">
              <h4 className="services-detail__block-title">Apps + web applications</h4>
              <ul className="services-detail__list">
                <li>Custom patient-facing mobile apps</li>
                <li>Internal tools built around your specific clinical and admin processes</li>
                <li>Web applications for patient portals and secure communication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="grow"
        className="services-detail services-detail--alt"
        tabIndex={-1}
        aria-labelledby="services-detail-grow-heading"
      >
        <div className="services-detail__grid">
          <div className="services-detail__copy">
            <p className="services-detail__eyebrow">Grow · Patient acquisition</p>
            <h2 id="services-detail-grow-heading" className="services-detail__headline">
              You&apos;ve tried ads. You got leads. The chairs stayed empty. Here&apos;s why.
            </h2>
            <p className="services-detail__body">
              Most healthcare agencies run ads and call it a day. We build a full acquisition system
              — paid search to capture patients already looking for your specialty, social to stay
              visible to patients who aren&apos;t looking yet, and SEO to ensure your practice ranks
              above competitors when it matters most. Every channel connected. Every result measured
              in confirmed appointments — not impressions.
            </p>
            <div className="services-detail__voice">
              <p className="services-detail__voice-label">Who this is for</p>
              <blockquote className="services-detail__voice-quote">
                <p>
                  You&apos;ve spent money on marketing before and couldn&apos;t see where it went.
                  Your agency sent reports. Your schedule didn&apos;t change. You want someone who
                  treats an empty appointment slot the same way you do — as a problem that needs
                  fixing today, not next quarter.
                </p>
              </blockquote>
            </div>
            <button
              type="button"
              className="btn btn-primary services-detail__explore-btn"
              onClick={() => navigate('/services/grow')}
            >
              Explore Grow in detail
              <ArrowRight className="services-detail__explore-icon" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <div className="services-detail__included">
            <h3 className="services-detail__included-title">What&apos;s included</h3>

            <div className="services-detail__block">
              <h4 className="services-detail__block-title">Google ads — search intent capture</h4>
              <ul className="services-detail__list">
                <li>Targets patients actively searching for your specialty right now</li>
                <li>Highest-intent channel · highest conversion rate · fastest results</li>
                <li>Geo-targeted to your exact catchment area</li>
              </ul>
            </div>

            <div className="services-detail__block">
              <h4 className="services-detail__block-title">Meta ads — awareness + retargeting</h4>
              <ul className="services-detail__list">
                <li>Builds awareness with your ideal patient profile before they need you</li>
                <li>Retargets website visitors who landed but didn&apos;t book</li>
                <li>Lead quality filters built into the ad form — no tyre kickers</li>
              </ul>
            </div>

            <div className="services-detail__block">
              <h4 className="services-detail__block-title">SEO — long-term organic growth</h4>
              <ul className="services-detail__list">
                <li>Local SEO to rank above competitors in your area consistently</li>
                <li>Specialty content strategy that builds clinical authority over time</li>
                <li>Technical SEO · page speed · schema markup · Google Business</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="brand"
        className="services-detail"
        tabIndex={-1}
        aria-labelledby="services-detail-brand-heading"
      >
        <div className="services-detail__grid">
          <div className="services-detail__copy">
            <p className="services-detail__eyebrow">Brand · Creative</p>
            <h2 id="services-detail-brand-heading" className="services-detail__headline">
              A patient chooses their doctor before they&apos;ve met them. That decision happens on
              your website, your Google listing, and your Instagram page.
            </h2>
            <p className="services-detail__body">
              A patient searching for a specialist will visit three or four practice websites before
              booking. In that moment, the quality of your brand is the quality of your care — in
              their eyes. We make sure what they see reflects what you actually deliver: a premium,
              trustworthy practice that takes their health seriously.
            </p>
            <div className="services-detail__voice">
              <p className="services-detail__voice-label">Who this is for</p>
              <blockquote className="services-detail__voice-quote">
                <p>
                  Your reputation among colleagues is excellent. Your online presence doesn&apos;t
                  reflect it. You look like every other clinic on the block when you should look like
                  the obvious choice. You want your brand to do what your work already does — earn
                  trust before a word is spoken.
                </p>
              </blockquote>
            </div>
            <button
              type="button"
              className="btn btn-primary services-detail__explore-btn"
              onClick={() => navigate('/services/brand')}
            >
              Explore Brand in detail
              <ArrowRight className="services-detail__explore-icon" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <div className="services-detail__included">
            <h3 className="services-detail__included-title">What&apos;s included</h3>

            <div className="services-detail__block">
              <h4 className="services-detail__block-title">Brand identity</h4>
              <ul className="services-detail__list">
                <li>Logo · colour system · typography · full brand guidelines</li>
                <li>Positioning and messaging framework built on your specialty</li>
                <li>Brand voice and tone for all patient communications</li>
              </ul>
            </div>

            <div className="services-detail__block">
              <h4 className="services-detail__block-title">Design</h4>
              <ul className="services-detail__list">
                <li>Practice collateral · stationery · patient-facing materials</li>
                <li>Social media templates and content design system</li>
                <li>Welcome packs · intake forms · post-visit communications</li>
              </ul>
            </div>

            <div className="services-detail__block">
              <h4 className="services-detail__block-title">Video + motion</h4>
              <ul className="services-detail__list">
                <li>Practice introduction and doctor profile videos</li>
                <li>Procedure explainers for patient education and trust-building</li>
                <li>Social media video · reels · paid ad creative</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="services-diagnostic" aria-labelledby="services-diagnostic-heading">
        <div className="services-diagnostic__inner">
          <h2 id="services-diagnostic-heading" className="services-diagnostic__headline">
            We don&apos;t have a Bronze plan. We have a diagnostic.
          </h2>
          <p className="services-diagnostic__body">
            Every practice is different. An orthopaedic surgeon in Miami running private pay has
            nothing in common with a dental group in Manchester running NHS and private. A package
            that works for one would fail the other. We start every engagement with a two-week
            diagnostic — understanding your practice, your patients, your competitors, and your
            goals. Everything we build comes from that. Nothing is templated. Nothing is guesswork.
          </p>

          <div className="services-diagnostic__steps">
            <div className="services-diagnostic__step">
              <p className="services-diagnostic__step-label">Step 1</p>
              <h3 className="services-diagnostic__step-title">Practice diagnostic</h3>
              <p className="services-diagnostic__step-body">
                2 weeks understanding your world before we build anything
              </p>
            </div>
            <div className="services-diagnostic__step">
              <p className="services-diagnostic__step-label">Step 2</p>
              <h3 className="services-diagnostic__step-title">Custom proposal</h3>
              <p className="services-diagnostic__step-body">
                Specific to your practice · not a menu you pick from
              </p>
            </div>
            <div className="services-diagnostic__step">
              <p className="services-diagnostic__step-label">Step 3</p>
              <h3 className="services-diagnostic__step-title">Build + ongoing</h3>
              <p className="services-diagnostic__step-body">
                One team. Full accountability. Measured in results.
              </p>
            </div>
          </div>

          <Link
            to="/how-we-work"
            className="btn btn-primary services-diagnostic__cta services-detail__explore-btn"
          >
            See the full process behind every service
            <ArrowRight className="services-detail__explore-icon" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="services-private" aria-labelledby="services-private-heading">
        <div className="services-private__inner">
          <h2 id="services-private-heading" className="services-private__headline">
            We only work with private medical practices. Every word on this page was written for you
            specifically.
          </h2>
          <p className="services-private__body">
            We understand HIPAA compliance, private pay dynamics, insurance friction, referral
            networks, seasonal patient patterns, and the difference between a lead and a patient
            who actually shows up and moves forward with care. We&apos;ve built systems specifically
            for the challenges that only exist inside private medical practice — because that&apos;s
            all we do.
          </p>
          <ul className="services-private__pills" aria-label="Specialties we help">
            {WHO_WE_HELP_SPECIALTIES.map(({ slug, label }) => (
              <li key={slug}>
                <Link to={`/who-we-help/${slug}`} className="services-private__pill">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/who-we-help" className="services-private__see-all">
            + see all specialties
            <ArrowRight className="services-private__see-all-icon" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="services-final-cta" aria-labelledby="services-final-cta-heading">
        <div className="services-final-cta__bg" aria-hidden />
        <div className="services-final-cta__inner">
          <h2 id="services-final-cta-heading" className="services-final-cta__headline">
            Don&apos;t know where to start? That&apos;s what the audit is for.
          </h2>
          <p className="services-final-cta__body">
            In 45 minutes we&apos;ll tell you exactly what&apos;s holding your practice back — whether
            it&apos;s your website, your ads, your brand, or all three. No pitch. No agenda. Just
            clarity on what your practice actually needs and in what order.
          </p>
          <div className="services-final-cta__actions">
            <Link
              to="/#book-call"
              className="btn btn-primary services-final-cta__btn services-final-cta__btn--primary"
            >
              See what your practice is missing
              <ArrowRight className="services-final-cta__btn-icon" strokeWidth={2} aria-hidden />
            </Link>
            <Link to="/how-we-work" className="services-final-cta__btn services-final-cta__btn--secondary">
              See how we work
            </Link>
          </div>
          <p className="services-final-cta__note">
            No packages. No sales pitch. No commitment. Just a clear diagnosis of your practice.
          </p>
        </div>
      </section>
    </main>
  )
}
