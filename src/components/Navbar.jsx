import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { ChevronDown, ExternalLink } from 'lucide-react'

/** Mega-menu row: label + external-link icon (matches homepage practice pills). */
function MegaNavLink({ href, children }) {
  return (
    <a href={href}>
      <span className="dropdown-mega__link-label">{children}</span>
      <ExternalLink className="external-icon" strokeWidth={1} aria-hidden />
    </a>
  )
}

function MegaColumnHead({ accent, label }) {
  return (
    <div className={`dropdown-mega__head dropdown-mega__head--accent-${accent}`}>
      {/*   <Smartphone size={18} strokeWidth={1.75} className="dropdown-mega__head-icon" aria-hidden /> */}
      <span className="dropdown-mega__head-label">{label}</span>
    </div>
  )
}

/** Single-column “Who we help” block: first 4 links, then View more / View less for the rest. */
function WhoHelpColumn({ accent, title, links }) {
  const [showMore, setShowMore] = useState(false)
  const first = links.slice(0, 4)
  const rest = links.slice(4)
  const hasMore = rest.length > 0

  return (
    <div className="dropdown-section">
      <MegaColumnHead accent={accent} label={title} />
      <ul className="dropdown-mega__list">
        {first.map(({ href, label }) => (
          <li key={href}>
            <MegaNavLink href={href}>{label}</MegaNavLink>
          </li>
        ))}
      </ul>
      {hasMore && (
        <>
          <button
            type="button"
            className="dropdown-mega__more-btn"
            aria-expanded={showMore}
            onClick={() => setShowMore((v) => !v)}
          >
            {showMore ? 'View less' : 'View more'}
          </button>
          {showMore && (
            <ul className="dropdown-mega__list dropdown-mega__list--extra" aria-label={`More: ${title}`}>
              {rest.map(({ href, label }) => (
                <li key={href}>
                  <MegaNavLink href={href}>{label}</MegaNavLink>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

const WHO_SURGICAL = [
  { href: '#ortho', label: 'Orthopaedic surgeons' },
  { href: '#plastic', label: 'Plastic surgeons' },
  { href: '#cosmetic', label: 'Cosmetic surgeons' },
  { href: '#vascular', label: 'Vascular surgeons' },
  { href: '#spine', label: 'Spine surgeons' },
  { href: '#sports', label: 'Sports medicine doctors' },
]

const WHO_AESTHETIC = [
  { href: '#derm', label: 'Dermatologists' },
  { href: '#medspa', label: 'MedSpa owners' },
  { href: '#aesthetic', label: 'Aesthetic practitioners' },
  { href: '#hair', label: 'Hair transplant surgeons' },
  { href: '#laser', label: 'Laser clinic owners' },
]

const WHO_DENTAL = [
  { href: '#dentist', label: 'Dentists' },
  { href: '#ortho-dent', label: 'Orthodontists' },
  { href: '#oral-surg', label: 'Oral surgeons' },
  { href: '#implant', label: 'Dental implant specialists' },
]

const WHO_MEDICAL = [
  { href: '#optho', label: 'Ophthalmologists' },
  { href: '#varicose', label: 'Varicose vein specialists' },
  { href: '#gp', label: 'Private GP practices' },
  { href: '#cardio', label: 'Cardiologists' },
  { href: '#neuro', label: 'Neurologists' },
  { href: '#fertility', label: 'Fertility clinics' },
  { href: '#physio', label: 'Physiotherapists' },
  { href: '#pain', label: 'Pain management specialists' },
]

const WHO_PRACTICE = [
  { href: '#practice-own', label: 'Private practice owners' },
  { href: '#multi', label: 'Multi-location clinic owners' },
  { href: '#pe', label: 'Private equity healthcare' },
  { href: '#manager', label: 'Clinic managers' },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo" aria-label="Socialsect home">
            <img
              src="/icons/logo.svg"
              alt=""
              className="logo__mark"
              width={70}
              height={70}
              decoding="async"
            />
          </Link>
          <div className="nav-links">
            {/* Services Dropdown */}
            <div className="nav-item">
              <Link to="/services" className="dropdown-toggle">
                Services
                <ChevronDown size={16} />
              </Link>
              <div className="dropdown dropdown-mega dropdown-mega--services">
                {/* Pillar A - Build */}
                <div className="dropdown-column">
                  <MegaColumnHead accent={1} label="Build" />
                  <ul className="dropdown-mega__list">
                    <li><MegaNavLink href="/services/build/websites">Practice websites</MegaNavLink></li>
                    <li><MegaNavLink href="/services/build/apps">Mobile apps</MegaNavLink></li>
                    <li><MegaNavLink href="/services/build/web-apps">Web applications</MegaNavLink></li>
                    <li><MegaNavLink href="/services/build/systems">Booking + management systems</MegaNavLink></li>
                  </ul>
                </div>

                {/* Pillar B - Grow */}
                <div className="dropdown-column">
                  <MegaColumnHead accent={2} label="Grow" />
                  <ul className="dropdown-mega__list">
                    <li><MegaNavLink href="/services/grow/meta-ads">Meta ads</MegaNavLink></li>
                    <li><MegaNavLink href="/services/grow/google-ads">Google ads</MegaNavLink></li>
                    <li><MegaNavLink href="/services/grow/seo">SEO</MegaNavLink></li>
                  </ul>
                </div>

                {/* Pillar C - Brand */}
                <div className="dropdown-column">
                  <MegaColumnHead accent={3} label="Brand" />
                  <ul className="dropdown-mega__list">
                    <li><MegaNavLink href="/services/brand/identity">Brand identity</MegaNavLink></li>
                    <li><MegaNavLink href="/services/brand/design">Design</MegaNavLink></li>
                    <li><MegaNavLink href="/services/brand/video">Video + motion</MegaNavLink></li>
                  </ul>
                </div>
              </div>
            </div>

            <Link to="/how-we-work">How we work</Link>

            {/* Who We Help Dropdown */}
            <div className="nav-item">
              <Link to="/who-we-help" className="dropdown-toggle">
                Who we help
                <ChevronDown size={16} />
              </Link>
              <div className="dropdown dropdown-lg dropdown-mega dropdown-mega--who">
                <WhoHelpColumn accent={1} title="Surgical specialists" links={WHO_SURGICAL} />
                <WhoHelpColumn accent={2} title="Aesthetic + skin specialists" links={WHO_AESTHETIC} />
                <WhoHelpColumn accent={3} title="Dental + oral health" links={WHO_DENTAL} />
                <WhoHelpColumn accent={4} title="Medical specialists" links={WHO_MEDICAL} />

                <div className="dropdown-section dropdown-section--practice">
                  <MegaColumnHead accent={5} label="Practice and Clinic owners" />
                  <ul className="dropdown-mega__list">
                    {WHO_PRACTICE.map(({ href, label }) => (
                      <li key={href}>
                        <MegaNavLink href={href}>{label}</MegaNavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a href="#results">Results</a>

            {/* Insights Dropdown */}
            <div className="nav-item">
              <a href="#insights" className="dropdown-toggle">
                Insights
                <ChevronDown size={16} />
              </a>
              <div className="dropdown dropdown-mega">
                <div className="dropdown-column">
                  <MegaColumnHead accent={2} label="Insights" />
                  <ul className="dropdown-mega__list">
                    <li><MegaNavLink href="#testimonials">Testimonials</MegaNavLink></li>
                    <li><MegaNavLink href="/results">Live on Results</MegaNavLink></li>
                    <li><MegaNavLink href="/insights/blog">Blog</MegaNavLink></li>
                    <li><MegaNavLink href="/insights/resources">Resources</MegaNavLink></li>
                  </ul>
                </div>
              </div>
            </div>

            <a href="#about">About</a>
            <a href="#client-portal" className="portal-link">Client portal →</a>
            <a href="#book-call" className="btn btn-primary">Book a call</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
