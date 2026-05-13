import { Link, useParams } from 'react-router-dom'
import './WhoWeHelpPage.css'

const SLUG_TITLES = {
  'orthopaedic-surgeons': 'Orthopaedic surgeons',
  dermatologists: 'Dermatologists',
  'medspa-owners': 'MedSpa owners',
  'plastic-surgeons': 'Plastic surgeons',
  dentists: 'Dentists',
  ophthalmologists: 'Ophthalmologists',
  'aesthetic-practitioners': 'Aesthetic practitioners',
  'vascular-surgeons': 'Vascular surgeons',
}

function titleFromSlug(slug) {
  if (SLUG_TITLES[slug]) return SLUG_TITLES[slug]
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function WhoWeHelpPage() {
  const { specialty } = useParams()
  const isIndex = !specialty

  return (
    <main className="who-we-help-page">
      <div className="who-we-help-page__inner">
        <Link to="/" className="who-we-help-page__back">
          ← Home
        </Link>
        {isIndex ? (
          <>
            <h1 className="who-we-help-page__title">Who we help</h1>
            <p className="who-we-help-page__lede">
              Browse specialties from the main navigation, or return to{' '}
              <Link to="/services">Services</Link> to see how we work with private practices.
            </p>
          </>
        ) : (
          <>
            <p className="who-we-help-page__eyebrow">Who we help</p>
            <h1 className="who-we-help-page__title">{titleFromSlug(specialty)}</h1>
            <p className="who-we-help-page__lede">This specialty page is coming soon.</p>
            <Link to="/who-we-help" className="who-we-help-page__all">
              See all specialties →
            </Link>
          </>
        )}
      </div>
    </main>
  )
}
