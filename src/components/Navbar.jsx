import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BookCallLink from './BookCallLink'
import './Navbar.css'
import { ChevronDown, ExternalLink, Menu, X } from 'lucide-react'
import { getNavServiceLinks } from '../pages/services/servicesRegistry'

/** Mega-menu row: label + external-link icon (matches homepage practice pills). */
function MegaNavLink({ href, children }) {
  return (
    <a href={href}>
      <span className="dropdown-mega__link-label">{children}</span>
      <ExternalLink className="external-icon" strokeWidth={1} aria-hidden />
    </a>
  )
}

/** Internal route  specialty pages under /who-we-help */
function MegaNavRouteLink({ to, children }) {
  return (
    <Link to={to}>
      <span className="dropdown-mega__link-label">{children}</span>
    </Link>
  )
}

function MegaColumnHead({ accent, label }) {
  return (
    <div className={`dropdown-mega__head dropdown-mega__head--accent-${accent}`}>
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
        {first.map(({ slug, label }) => (
          <li key={slug}>
            <MegaNavRouteLink to={`/who-we-help/${slug}`}>{label}</MegaNavRouteLink>
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
              {rest.map(({ slug, label }) => (
                <li key={slug}>
                  <MegaNavRouteLink to={`/who-we-help/${slug}`}>{label}</MegaNavRouteLink>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

function MobileNavGroup({ id, label, to, isOpen, onToggle, onNavigate, children }) {
  return (
    <div className={`mobile-nav__group${isOpen ? ' mobile-nav__group--open' : ''}`}>
      <div className="mobile-nav__group-head">
        {to ? (
          <Link to={to} className="mobile-nav__group-link" onClick={onNavigate}>
            {label}
          </Link>
        ) : (
          <span className="mobile-nav__group-link">{label}</span>
        )}
        <button
          type="button"
          className="mobile-nav__group-toggle"
          aria-expanded={isOpen}
          aria-controls={`mobile-nav-panel-${id}`}
          onClick={() => onToggle(id)}
        >
          <span className="visually-hidden">{isOpen ? 'Collapse' : 'Expand'} {label}</span>
          <ChevronDown strokeWidth={1} aria-hidden />
        </button>
      </div>
      {isOpen && (
        <div id={`mobile-nav-panel-${id}`} className="mobile-nav__group-panel">
          {children}
        </div>
      )}
    </div>
  )
}

function MobileNavBlock({ title, accent, children }) {
  return (
    <div className="mobile-nav__block">
      <p className={`mobile-nav__block-title mobile-nav__block-title--accent-${accent}`}>{title}</p>
      <ul className="mobile-nav__list">{children}</ul>
    </div>
  )
}

function MobileNavItem({ to, href, children, onNavigate, external }) {
  if (href) {
    return (
      <li>
        <a href={href} className="mobile-nav__item" onClick={onNavigate}>
          <span>{children}</span>
          {external && <ExternalLink strokeWidth={1} aria-hidden />}
        </a>
      </li>
    )
  }
  return (
    <li>
      <Link to={to} className="mobile-nav__item" onClick={onNavigate}>
        {children}
      </Link>
    </li>
  )
}

/* Slugs match /who-we-help/:specialty  aligned with WhoWeHelpPage specialty directory */
const WHO_SURGICAL = [
  { slug: 'orthopaedic-surgeons', label: 'Orthopaedic surgeons' },
  { slug: 'plastic-surgeons', label: 'Plastic surgeons' },
  { slug: 'cosmetic-surgeons', label: 'Cosmetic surgeons' },
  { slug: 'vascular-surgeons', label: 'Vascular surgeons' },
  { slug: 'spine-surgeons', label: 'Spine surgeons' },
  { slug: 'sports-medicine-doctors', label: 'Sports medicine doctors' },
  { slug: 'oral-surgeons', label: 'Oral surgeons' },
]

const WHO_AESTHETIC = [
  { slug: 'dermatologists', label: 'Dermatologists' },
  { slug: 'medspa-owners', label: 'MedSpa owners' },
  { slug: 'aesthetic-practitioners', label: 'Aesthetic practitioners' },
  { slug: 'hair-transplant-surgeons', label: 'Hair transplant surgeons' },
  { slug: 'laser-clinic-owners', label: 'Laser clinic owners' },
]

const WHO_DENTAL = [
  { slug: 'dentists', label: 'Dentists' },
  { slug: 'orthodontists', label: 'Orthodontists' },
  { slug: 'dental-implant-specialists', label: 'Dental implant specialists' },
  { slug: 'periodontists', label: 'Periodontists' },
]

const WHO_MEDICAL = [
  { slug: 'ophthalmologists', label: 'Ophthalmologists' },
  { slug: 'varicose-vein-specialists', label: 'Varicose vein specialists' },
  { slug: 'otolaryngologists-ent', label: 'Otolaryngologists (ENT)' },
  { slug: 'urologists', label: 'Urologists' },
  { slug: 'cardiologists', label: 'Cardiologists' },
  { slug: 'neurologists', label: 'Neurologists' },
  { slug: 'fertility-clinics', label: 'Fertility clinics' },
  { slug: 'physiotherapists', label: 'Physiotherapists' },
  { slug: 'pain-management-specialists', label: 'Pain management specialists' },
  { slug: 'podiatrists', label: 'Podiatrists' },
  { slug: 'rheumatologists', label: 'Rheumatologists' },
  { slug: 'gastroenterologists', label: 'Gastroenterologists' },
]

const WHO_PRACTICE = [
  { slug: 'private-gp-practices', label: 'Private GP practices' },
  { slug: 'multi-location-clinic-owners', label: 'Multi-location clinic owners' },
  { slug: 'private-practice-owners', label: 'Private practice owners' },
  { slug: 'private-equity-healthcare', label: 'Private equity healthcare' },
  { slug: 'clinic-managers', label: 'Clinic managers' },
  { slug: 'healthcare-group-operators', label: 'Healthcare group operators' },
]

const SERVICES_BUILD = getNavServiceLinks('build')
const SERVICES_GROW = getNavServiceLinks('grow')
const SERVICES_BRAND = getNavServiceLinks('brand')

const MOBILE_WHO_SECTIONS = [
  { accent: 1, title: 'Surgical specialists', links: WHO_SURGICAL },
  { accent: 2, title: 'Aesthetic + skin specialists', links: WHO_AESTHETIC },
  { accent: 3, title: 'Dental + oral health', links: WHO_DENTAL },
  { accent: 4, title: 'Medical specialists', links: WHO_MEDICAL },
  { accent: 5, title: 'Practice and clinic owners', links: WHO_PRACTICE },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const isWhoWeHelp = pathname === '/who-we-help' || pathname.startsWith('/who-we-help/')
  const isInsights = pathname === '/insights' || pathname.startsWith('/insights/')
  const isServices =
    pathname === '/services' || /^\/services\/[^/]+(\/[^/]+)?$/.test(pathname)

  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)

  const closeMenu = () => {
    setMenuOpen(false)
    setOpenGroup(null)
  }

  const toggleGroup = (id) => {
    setOpenGroup((current) => (current === id ? null : id))
  }

  useEffect(() => {
    setMenuOpen(false)
    setOpenGroup(null)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <nav className={`navbar${menuOpen ? ' navbar--menu-open' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo" aria-label="Socialsect home" onClick={closeMenu}>
            <img
              src="/icons/logo.svg"
              alt=""
              className="logo__mark"
              width={70}
              height={70}
              decoding="async"
            />
          </Link>

          <button
            type="button"
            className="nav-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            {menuOpen ? <X strokeWidth={1} aria-hidden /> : <Menu strokeWidth={1} aria-hidden />}
          </button>

          {/* Desktop navigation */}
          <div className="nav-links nav-links--desktop">
            <div className={`nav-item${isServices ? ' nav-item--active' : ''}`}>
              <Link
                to="/services"
                className={`dropdown-toggle${isServices ? ' nav-link--active' : ''}`}
              >
                Services
                <ChevronDown size={16} strokeWidth={1} />
              </Link>
              <div className="dropdown dropdown-mega dropdown-mega--services dropdown--compact">
                <div className="dropdown-column">
                  <MegaColumnHead accent={1} label="Build" />
                  <ul className="dropdown-mega__list">
                    {SERVICES_BUILD.map(({ to, label }) => (
                      <li key={to}>
                        <MegaNavRouteLink to={to}>{label}</MegaNavRouteLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dropdown-column">
                  <MegaColumnHead accent={2} label="Grow" />
                  <ul className="dropdown-mega__list">
                    {SERVICES_GROW.map(({ to, label }) => (
                      <li key={to}>
                        <MegaNavRouteLink to={to}>{label}</MegaNavRouteLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dropdown-column">
                  <MegaColumnHead accent={3} label="Brand" />
                  <ul className="dropdown-mega__list">
                    {SERVICES_BRAND.map(({ to, label }) => (
                      <li key={to}>
                        <MegaNavRouteLink to={to}>{label}</MegaNavRouteLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Link to="/how-we-work">How we work</Link>

            <div className={`nav-item${isWhoWeHelp ? ' nav-item--active' : ''}`}>
              <Link
                to="/who-we-help"
                className={`dropdown-toggle${isWhoWeHelp ? ' nav-link--active' : ''}`}
              >
                Who we help
                <ChevronDown size={16} strokeWidth={1} />
              </Link>
              <div className="dropdown dropdown-lg dropdown-mega dropdown-mega--who">
                <WhoHelpColumn accent={1} title="Surgical specialists" links={WHO_SURGICAL} />
                <WhoHelpColumn accent={2} title="Aesthetic + skin specialists" links={WHO_AESTHETIC} />
                <WhoHelpColumn accent={3} title="Dental + oral health" links={WHO_DENTAL} />
                <WhoHelpColumn accent={4} title="Medical specialists" links={WHO_MEDICAL} />
                <div className="dropdown-section dropdown-section--practice">
                  <MegaColumnHead accent={5} label="Practice and Clinic owners" />
                  <ul className="dropdown-mega__list">
                    {WHO_PRACTICE.map(({ slug, label }) => (
                      <li key={slug}>
                        <MegaNavRouteLink to={`/who-we-help/${slug}`}>{label}</MegaNavRouteLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Link to="/results">Results</Link>

            <div className={`nav-item${isInsights ? ' nav-item--active' : ''}`}>
              <Link
                to="/insights"
                className={`dropdown-toggle${isInsights ? ' nav-link--active' : ''}`}
              >
                Insights
                <ChevronDown size={16} strokeWidth={1} />
              </Link>
              <div className="dropdown dropdown-mega dropdown--compact">
                <div className="dropdown-column">
                  <MegaColumnHead accent={2} label="Insights" />
                  <ul className="dropdown-mega__list">
                    <li>
                      <Link to="/insights/testimonials">
                        <span className="dropdown-mega__link-label">Testimonials</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/insights/blog">
                        <span className="dropdown-mega__link-label">Blog</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/insights/resources">
                        <span className="dropdown-mega__link-label">Resources</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Link to="/about">About</Link>
            <a href="#client-portal" className="portal-link">
              Client portal →
            </a>
            <BookCallLink className="btn btn-primary">
              Book a call
            </BookCallLink>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`nav-overlay${menuOpen ? ' nav-overlay--visible' : ''}`}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />

      <div
        id="mobile-nav-drawer"
        className={`mobile-nav${menuOpen ? ' mobile-nav--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-nav__scroll">
          <MobileNavGroup
            id="services"
            label="Services"
            to="/services"
            isOpen={openGroup === 'services'}
            onToggle={toggleGroup}
            onNavigate={closeMenu}
          >
            <MobileNavBlock title="Build" accent={1}>
              {SERVICES_BUILD.map(({ to, label }) => (
                <MobileNavItem key={to} to={to} onNavigate={closeMenu}>
                  {label}
                </MobileNavItem>
              ))}
            </MobileNavBlock>
            <MobileNavBlock title="Grow" accent={2}>
              {SERVICES_GROW.map(({ to, label }) => (
                <MobileNavItem key={to} to={to} onNavigate={closeMenu}>
                  {label}
                </MobileNavItem>
              ))}
            </MobileNavBlock>
            <MobileNavBlock title="Brand" accent={3}>
              {SERVICES_BRAND.map(({ to, label }) => (
                <MobileNavItem key={to} to={to} onNavigate={closeMenu}>
                  {label}
                </MobileNavItem>
              ))}
            </MobileNavBlock>
          </MobileNavGroup>

          <Link to="/how-we-work" className="mobile-nav__top-link" onClick={closeMenu}>
            How we work
          </Link>

          <MobileNavGroup
            id="who"
            label="Who we help"
            to="/who-we-help"
            isOpen={openGroup === 'who'}
            onToggle={toggleGroup}
            onNavigate={closeMenu}
          >
            {MOBILE_WHO_SECTIONS.map(({ accent, title, links }) => (
              <MobileNavBlock key={title} title={title} accent={accent}>
                {links.map(({ slug, label }) => (
                  <MobileNavItem key={slug} to={`/who-we-help/${slug}`} onNavigate={closeMenu}>
                    {label}
                  </MobileNavItem>
                ))}
              </MobileNavBlock>
            ))}
          </MobileNavGroup>

          <Link to="/results" className="mobile-nav__top-link" onClick={closeMenu}>
            Results
          </Link>

          <MobileNavGroup
            id="insights"
            label="Insights"
            to="/insights"
            isOpen={openGroup === 'insights'}
            onToggle={toggleGroup}
            onNavigate={closeMenu}
          >
            <ul className="mobile-nav__list mobile-nav__list--flat">
              <MobileNavItem to="/insights/testimonials" onNavigate={closeMenu}>
                Testimonials
              </MobileNavItem>
              <MobileNavItem to="/insights/blog" onNavigate={closeMenu}>
                Blog
              </MobileNavItem>
              <MobileNavItem to="/insights/resources" onNavigate={closeMenu}>
                Resources
              </MobileNavItem>
            </ul>
          </MobileNavGroup>

          <Link to="/about" className="mobile-nav__top-link" onClick={closeMenu}>
            About
          </Link>
        </div>

        <div className="mobile-nav__footer">
          <a href="#client-portal" className="mobile-nav__portal" onClick={closeMenu}>
            Client portal →
          </a>
          <BookCallLink className="btn btn-primary mobile-nav__cta" onClick={closeMenu}>
            Book a call
          </BookCallLink>
        </div>
      </div>
    </nav>
  )
}
