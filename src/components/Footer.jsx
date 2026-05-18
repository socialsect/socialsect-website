import { Link } from 'react-router-dom'
import './Footer.css'
import { TbBrandLinkedin, TbBrandInstagram } from 'react-icons/tb'
import { ArrowRight } from 'lucide-react'

const CONTACT_EMAIL = 'hello@gosocialsect.com'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__card">
        <span className="footer__nail footer__nail--tl" aria-hidden="true" />
        <span className="footer__nail footer__nail--tr" aria-hidden="true" />
        <span className="footer__nail footer__nail--bl" aria-hidden="true" />
        <span className="footer__nail footer__nail--br" aria-hidden="true" />
        <div className="footer__glass" aria-hidden="true" />
        <div className="footer__inner">
          <div className="footer__grid">
            <section className="footer__col footer__col--brand" aria-labelledby="footer-brand-heading">
              <h2 id="footer-brand-heading" className="footer__col-heading">
                Brand
              </h2>
              <a href="/" className="footer__logo-link" aria-label="Socialsect home">
                <img
                  src="/icons/logo.svg"
                  alt=""
                  className="footer__logo"
                  width={160}
                  height={50}
                />
              </a>
              <p className="footer__tagline">
                Predictable growth for private medical practices. US & UK.
              </p>
              <div className="footer__social">
                <a
                  href="https://www.linkedin.com/"
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TbBrandLinkedin className="footer__social-icon" aria-hidden />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/"
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TbBrandInstagram className="footer__social-icon" aria-hidden />
                  <span>Instagram</span>
                </a>
              </div>
            </section>

            <section className="footer__col" aria-labelledby="footer-services-heading">
              <h2 id="footer-services-heading" className="footer__col-heading">
                Services
              </h2>
              <ul className="footer__list">
                <li>
                  <a href="#build">Build</a>
                </li>
                <li>
                  <a href="#grow">Grow</a>
                </li>
                <li>
                  <a href="#brand">Brand</a>
                </li>
                <li>
                  <a href="#how-we-work">How we work</a>
                </li>
              </ul>
            </section>

            <section className="footer__col" aria-labelledby="footer-who-heading">
              <h2 id="footer-who-heading" className="footer__col-heading">
                Who we help
              </h2>
              <ul className="footer__list">
                <li>
                  <Link to="/who-we-help/orthopaedic-surgeons">Orthopaedic surgeons</Link>
                </li>
                <li>
                  <Link to="/who-we-help/dermatologists">Dermatologists</Link>
                </li>
                <li>
                  <Link to="/who-we-help/medspa-owners">MedSpa owners</Link>
                </li>
                <li>
                  <Link to="/who-we-help/plastic-surgeons">Plastic surgeons</Link>
                </li>
                <li>
                  <Link to="/who-we-help/dentists">Dentists</Link>
                </li>
                <li>
                  <Link to="/who-we-help" className="footer__link-em">
                    View all specialties 
                    <ArrowRight size={16} />
                  </Link>
                </li>
              </ul>
            </section>

            <section className="footer__col" aria-labelledby="footer-company-heading">
              <h2 id="footer-company-heading" className="footer__col-heading">
                Company
              </h2>
              <ul className="footer__list">
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/results">Results</Link>
                </li>
                <li>
                  <Link to="/insights/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/insights/resources">Resources</Link>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
              </ul>
            </section>

            <section className="footer__col" aria-labelledby="footer-contact-heading">
              <h2 id="footer-contact-heading" className="footer__col-heading">
                Contact
              </h2>
              <ul className="footer__list">
                <li>
                  <Link to="/book-a-call">Book a call</Link>
                </li>
                <li>
                  <Link to="/book-a-call">Request a reference</Link>
                </li>
                <li>
                  <a href="#client-portal">Client portal</a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="footer__email">
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </section>
          </div>

          <div className="footer-sub">
            <p className="footer-sub__row">
              <span>© 2026 Socialsect</span>
              <span className="footer-sub__sep" aria-hidden="true">
                ·
              </span>
              <a href="#privacy">Privacy policy</a>
              <span className="footer-sub__sep" aria-hidden="true">
                ·
              </span>
              <a href="#faq">FAQ</a>
              <span className="footer-sub__sep" aria-hidden="true">
                ·
              </span>
              <span>All rights reserved</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
