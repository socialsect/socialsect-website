import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight } from 'lucide-react'
import LazyDarkVeil from '../../components/dark-veil/LazyDarkVeil.jsx'
import ProofGrowthIllustration from './ProofGrowthIllustration'
import './WhoWeHelpPage.css'

const HEARD_QUOTES = [
  {
    attribution: 'Orthopaedic surgeon · Miami',
    quote:
      'We were getting hundreds of leads a month. Maybe 10% showed up. The rest ghosted after the first message. I had no idea what was wrong.',
  },
  {
    attribution: 'MedSpa owner · London',
    quote:
      "January and August kill us every year. We react to it every time. By the time we do something, we've already lost the month.",
  },
  {
    attribution: 'Dermatologist · New York',
    quote:
      "I have a website, someone running my Instagram, someone doing Google ads, and a PR person. None of them talk to each other. I'm the only one who knows what all of them are doing.",
  },
  {
    attribution: 'Plastic surgeon · Los Angeles',
    quote:
      "My competitor has half my credentials and twice my patient volume. I don't understand it. I've been told to 'do social media' so many times I've stopped listening.",
  },
  {
    attribution: 'Private GP practice · Manchester',
    quote:
      "We opened a second location and it's been empty for six months. Nobody told us that the marketing that worked for location one wouldn't work for location two.",
  },
  {
    attribution: 'Dental implant specialist · Chicago',
    quote:
      "We get plenty of enquiries. High-value cases, implants, full arch, never seem to convert. The leads are there. The right patients aren't.",
  },
]

const PROBLEM_PATTERNS = [
  {
    index: '01',
    title: 'The no-system problem',
    quote:
      "You're a specialist in your field. You were never trained to build a patient acquisition system. You figured out medicine. You've been figuring out marketing by trial and error ever since.",
  },
  {
    index: '02',
    title: 'The fragmentation problem',
    quote:
      "You have vendors. They have excuses. The ads agency says your website doesn't convert. The website agency says your ads are targeting the wrong people. You're in the middle paying everyone and accountable to no one.",
  },
  {
    index: '03',
    title: 'The wrong-patients problem',
    quote:
      "You're getting enquiries. But not the right ones. They're too far away, out of network, looking for something you don't offer, or they simply don't show up. Volume is not the same as value.",
  },
  {
    index: '04',
    title: 'The visibility gap',
    quote:
      "You're exceptional at what you do. A patient who found you would never leave. The problem is they can't find you, because a competitor with inferior skills and a better marketing budget is ranking above you.",
  },
]

const PILLAR_CARDS = [
  {
    id: 'build',
    title: 'Build',
    tagline: 'A digital presence that earns trust before the first appointment.',
    body:
      'Website built for your specialty. Booking system that reduces no-shows. Technology that works the way your practice works, not the other way around.',
  },
  {
    id: 'grow',
    title: 'Grow',
    tagline: 'Patients who are right for your practice, not just anyone who clicks an ad.',
    body:
      'We know the difference between a general enquiry and a high-value patient for your specific specialty. We build campaigns that attract the right one.',
  },
  {
    id: 'brand',
    title: 'Brand',
    tagline: 'Look like the obvious choice in your specialty and your market.',
    body:
      'Brand identity, content, and creative that reflects your clinical excellence, so a patient who finds you online already trusts you before they call.',
  },
]

const PROOF_CLIENT_TAGS = ['Orthopaedics', 'Aesthetics', 'MedSpa', 'Medical practice']

const SPECIALTY_GROUPS = [
  {
    title: 'Surgical specialists',
    items: [
      { label: 'Orthopaedic surgeons', slug: 'orthopaedic-surgeons' },
      { label: 'Plastic surgeons', slug: 'plastic-surgeons' },
      { label: 'Cosmetic surgeons', slug: 'cosmetic-surgeons' },
      { label: 'Vascular surgeons', slug: 'vascular-surgeons' },
      { label: 'Spine surgeons', slug: 'spine-surgeons' },
      { label: 'Sports medicine doctors', slug: 'sports-medicine-doctors' },
      { label: 'Oral surgeons', slug: 'oral-surgeons' },
    ],
  },
  {
    title: 'Aesthetic + skin specialists',
    items: [
      { label: 'Dermatologists', slug: 'dermatologists' },
      { label: 'Medical spa owners', slug: 'medspa-owners' },
      { label: 'Aesthetic practitioners', slug: 'aesthetic-practitioners' },
      { label: 'Hair transplant surgeons', slug: 'hair-transplant-surgeons' },
      { label: 'Laser clinic owners', slug: 'laser-clinic-owners' },
    ],
  },
  {
    title: 'Dental + oral health',
    items: [
      { label: 'Dentists', slug: 'dentists' },
      { label: 'Orthodontists', slug: 'orthodontists' },
      { label: 'Dental implant specialists', slug: 'dental-implant-specialists' },
      { label: 'Periodontists', slug: 'periodontists' },
    ],
  },
  {
    title: 'Medical specialists',
    items: [
      { label: 'Ophthalmologists', slug: 'ophthalmologists' },
      { label: 'Varicose vein specialists', slug: 'varicose-vein-specialists' },
      { label: 'Otolaryngologists (ENT)', slug: 'otolaryngologists-ent' },
      { label: 'Urologists', slug: 'urologists' },
      { label: 'Cardiologists', slug: 'cardiologists' },
      { label: 'Neurologists', slug: 'neurologists' },
      { label: 'Fertility clinics', slug: 'fertility-clinics' },
      { label: 'Physiotherapists', slug: 'physiotherapists' },
      { label: 'Pain management specialists', slug: 'pain-management-specialists' },
      { label: 'Podiatrists', slug: 'podiatrists' },
      { label: 'Rheumatologists', slug: 'rheumatologists' },
      { label: 'Gastroenterologists', slug: 'gastroenterologists' },
    ],
  },
  {
    title: 'Practice + business owners',
    items: [
      { label: 'Private GP practices', slug: 'private-gp-practices' },
      { label: 'Multi-location clinic owners', slug: 'multi-location-clinic-owners' },
      { label: 'Private practice owners', slug: 'private-practice-owners' },
      { label: 'Private equity, healthcare', slug: 'private-equity-healthcare' },
      { label: 'Clinic managers', slug: 'clinic-managers' },
      { label: 'Healthcare group operators', slug: 'healthcare-group-operators' },
    ],
  },
]

export default function WhoWeHelpPage() {
  return (
    <main className="who-we-help-page">
      <section className="who-we-help-hero" aria-labelledby="who-we-help-hero-heading">
        <div className="who-we-help-hero__bg-animation" aria-hidden>
          <LazyDarkVeil speed={0.5} />
        </div>

            <div className="who-we-help-hero__inner">
              <p className="who-we-help-hero__eyebrow">
                Private medical practices only · US & UK
              </p>
              <h1 id="who-we-help-hero-heading" className="who-we-help-hero__title">
                Whatever your specialty  the problems are the same. The patients
                aren&apos;t coming fast enough, the marketing isn&apos;t working,
                and you&apos;re doing it all without a system.
              </h1>
              <p className="who-we-help-hero__sub">
                We&apos;ve worked with orthopaedic surgeons in Miami and MedSpa
                owners in London. Dermatologists who&apos;ve tried every agency.
                Dentists who&apos;ve never tried one. Vascular surgeons who
                didn&apos;t think marketing applied to them. The specialty changes.
                The frustration doesn&apos;t. We build systems that fix it 
                custom to your practice, your patients, and your world.
              </p>
            </div>
          </section>

          <section
            className="who-we-help-heard"
            aria-labelledby="who-we-help-heard-heading"
          >
            <div className="who-we-help-heard__inner">
              <h2 id="who-we-help-heard-heading" className="who-we-help-heard__headline">
                We&apos;ve heard this before. Regardless of your specialty.
              </h2>
              <p className="who-we-help-heard__sub">
                Before working with us, these are the things practice owners tell us on their
                first call. Find yourself in here.
              </p>
              <ul className="who-we-help-heard__list">
                {HEARD_QUOTES.map((item) => (
                  <li key={item.attribution} className="who-we-help-heard__item">
                    <p className="who-we-help-heard__attrib">{item.attribution}</p>
                    <blockquote className="who-we-help-heard__quote">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </li>
                ))}
              </ul>
              <p className="who-we-help-heard__note">
                These aren&apos;t made up. They&apos;re the first thing practice owners say on an
                audit call with us.
              </p>
            </div>
          </section>

          <section
            className="who-we-help-problems"
            aria-labelledby="who-we-help-problems-heading"
          >
            <div className="who-we-help-problems__inner">
              <h2 id="who-we-help-problems-heading" className="who-we-help-problems__headline">
                The specialty is different. The problems aren&apos;t.
              </h2>
              <ul className="who-we-help-problems__list">
                {PROBLEM_PATTERNS.map((item) => (
                  <li key={item.index} className="who-we-help-problems__item">
                    <span className="who-we-help-problems__index" aria-hidden>
                      {item.index}
                    </span>
                    <h3 className="who-we-help-problems__title">{item.title}</h3>
                    <blockquote className="who-we-help-problems__quote">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="who-we-help-find" aria-labelledby="who-we-help-find-heading">
            <div className="who-we-help-find__inner">
              <h2 id="who-we-help-find-heading" className="who-we-help-find__headline">
                Every practice is different. Find yours.
              </h2>
              <p className="who-we-help-find__sub">
                Click your specialty. We&apos;ve written a page specifically for you  the problems
                you face, the patients you&apos;re trying to reach, and what a system built for your
                practice looks like.
              </p>
              <div className="who-we-help-find__groups">
                {SPECIALTY_GROUPS.map((group) => (
                  <div key={group.title} className="who-we-help-find__group">
                    <h3 className="who-we-help-find__group-title">{group.title}</h3>
                    <ul className="who-we-help-find__pills">
                      {group.items.map(({ label, slug }) => (
                        <li key={slug}>
                          <Link to={`/who-we-help/${slug}`} className="who-we-help-find__pill">
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="who-we-help-find__foot">
                Don&apos;t see your specialty? We still work with you. Every private medical practice
                has the same core problems.{' '}
                <Link to={BOOK_A_CALL_FORM} className="who-we-help-find__foot-link">
                  Book an audit
                </Link>{' '}
                and we&apos;ll show you what a system looks like for your specific practice.
              </p>
            </div>
          </section>

          <section className="who-we-help-pillars" aria-labelledby="who-we-help-pillars-heading">
            <div className="who-we-help-pillars__inner">
              <p className="who-we-help-pillars__eyebrow">What we do regardless of specialty</p>
              <p className="who-we-help-pillars__subline">
                Three pillars · applied to healthcare · not generic
              </p>
              <h2 id="who-we-help-pillars-heading" className="who-we-help-pillars__headline">
                Whatever your specialty  the system looks the same. The content doesn&apos;t.
              </h2>
              <div className="who-we-help-pillars__grid">
                {PILLAR_CARDS.map((pillar, i) => (
                  <article key={pillar.id} className="who-we-help-pillars__card">
                    <span className="who-we-help-pillars__index" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="who-we-help-pillars__title">{pillar.title}</h3>
                    <p className="who-we-help-pillars__tagline">{pillar.tagline}</p>
                    <p className="who-we-help-pillars__body">{pillar.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="who-we-help-proof" aria-labelledby="who-we-help-proof-heading">
            <div className="who-we-help-proof__inner">
              <h2 id="who-we-help-proof-heading" className="who-we-help-proof__headline">
                We&apos;ve done it. Here&apos;s the proof.
              </h2>
              <div className="who-we-help-proof__case-row">
                <div className="who-we-help-proof__case">
                  <p className="who-we-help-proof__attrib">Dr. Badia · Orthopaedic surgery · Miami</p>
                  <blockquote className="who-we-help-proof__quote">
                    &ldquo;Before Socialsect we were getting hundreds of leads. What we weren&apos;t
                    getting was patients who showed up and moved forward with care. That was the gap.
                    That&apos;s what they fixed.&rdquo;
                  </blockquote>
                  <div className="who-we-help-proof__stats">
                    <div className="who-we-help-proof__stat">
                      <span className="who-we-help-proof__stat-value">225</span>
                      <span className="who-we-help-proof__stat-label">consultations booked</span>
                    </div>
                    <div className="who-we-help-proof__stat">
                      <span className="who-we-help-proof__stat-value">36</span>
                      <span className="who-we-help-proof__stat-label">surgical conversions</span>
                    </div>
                    <div className="who-we-help-proof__stat">
                      <span className="who-we-help-proof__stat-value">$1M+</span>
                      <span className="who-we-help-proof__stat-label">revenue</span>
                    </div>
                  </div>
                  <Link to={BOOK_A_CALL_FORM} className="who-we-help-proof__case-link">
                    Talk to Dr. Badia
                    <ArrowRight className="who-we-help-proof__case-link-icon" strokeWidth={2} aria-hidden />
                  </Link>
                </div>
                <ProofGrowthIllustration />
              </div>
              <div className="who-we-help-proof__span">
                <p className="who-we-help-proof__span-label">Our clients span</p>
                <ul className="who-we-help-proof__tags">
                  {PROOF_CLIENT_TAGS.map((tag) => (
                    <li key={tag}>
                      <span className="who-we-help-proof__tag">{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="who-we-help-proof__disclaimer">
                We don&apos;t have a case study for every specialty yet  because we&apos;re selective
                about who we work with. But the system we build is the same. The proof is in the
                diagnostic.{' '}
                <Link to={BOOK_A_CALL_FORM} className="who-we-help-proof__disclaimer-link">
                  Book a practice audit
                  <ArrowRight
                    className="who-we-help-proof__disclaimer-link-icon"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Link>
              </p>
            </div>
          </section>

          <section className="who-we-help-final-cta" aria-labelledby="who-we-help-final-cta-heading">
            <div className="who-we-help-final-cta__bg" aria-hidden />
            <div className="who-we-help-final-cta__inner">
              <h2 id="who-we-help-final-cta-heading" className="who-we-help-final-cta__headline">
                &ldquo;We don&apos;t have a package for your specialty. We have a diagnostic.
                And that&apos;s worth more.&rdquo;
              </h2>
              <p className="who-we-help-final-cta__body">
                Tell us about your practice. In 45 minutes we&apos;ll show you exactly where patients
                are falling through the gaps  and what a system built for your specific specialty
                would look like to fix it.
              </p>
              <div className="who-we-help-final-cta__actions">
                <Link
                  to={BOOK_A_CALL_FORM}
                  className="btn btn-primary who-we-help-final-cta__btn who-we-help-final-cta__btn--primary"
                >
                  See what your practice is missing
                  <ArrowRight
                    className="who-we-help-final-cta__btn-icon"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Link>
                <Link
                  to="/how-we-work"
                  className="who-we-help-final-cta__btn who-we-help-final-cta__btn--secondary"
                >
                  See how we work
                </Link>
              </div>
              <p className="who-we-help-final-cta__note">
                No packages. No pitch. Just a clear diagnosis built for your world.
              </p>
            </div>
      </section>
    </main>
  )
}
