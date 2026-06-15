import { Link } from 'react-router-dom'
import BookCallLink from './BookCallLink'
import './Footer.css'
import { TbBrandLinkedin, TbBrandInstagram } from 'react-icons/tb'
import { ArrowRight } from 'lucide-react'
import { CLIENT_PORTAL_PATH } from '../constants/routes.js'

const CONTACT_EMAIL = 'sales@gosocialsect.com'
const LINKEDIN_URL = 'https://www.linkedin.com/company/socialsect'
const INSTAGRAM_URL = 'https://www.instagram.com/gosocialsect/'
const CAREERS_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Careers at Socialsect')}`
const PRIVACY_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Privacy policy')}`

export default function Footer() {
  return (
    <footer className="footer">
   <div className="footer__card">
  <img
    src="/stethoscope.png"
    alt=""
    className="footer__stethoscope"
  />

  <div className="footer__cta">
    <div className="footer__cta-left">
      <img className="footer__cta-icon" src="/calendar.svg" alt="" />
        
      

      <div>
        <h3>Your appointment book is our bottom line.</h3>
        <p>
          Let's build a system that keeps it full every month.
        </p>
      </div>
    </div>

    <BookCallLink className="footer__cta-btn">
      Book a free 45-minute audit
    </BookCallLink>
  </div>

  <div className="footer__inner">
    <div className="footer__grid">

      <section className="footer__col footer__col--brand">
        <h2 className="footer__col-heading">SOCIALSECT</h2>

        <img
          src="/icons/logo.svg"
          alt=""
          className="footer__logo"
        />

        <p className="footer__tagline">
          Predictable growth for private medical practices.
          US & UK.
        </p>

        <div className="footer__social">
          <a href={LINKEDIN_URL}>
            <TbBrandLinkedin />
          </a>

          <a href={INSTAGRAM_URL}>
            <TbBrandInstagram />
          </a>
        </div>
      </section>

      <section className="footer__col">
        <h2 className="footer__col-heading">SOLUTIONS</h2>

        <ul className="footer__list">
          <li><Link to="/services#build">Build <ArrowRight size={18}/></Link></li>
          <li><Link to="/services#grow">Grow <ArrowRight size={18}/></Link></li>
          <li><Link to="/services#brand">Brand <ArrowRight size={18}/></Link></li>
          <li><Link to="/how-we-work">How we work <ArrowRight size={18}/></Link></li>
        </ul>
      </section>

      <section className="footer__col">
        <h2 className="footer__col-heading">WHO WE HELP</h2>

        <ul className="footer__list">
          <li><Link to="/who-we-help/orthopaedic-surgeons">Orthopaedic surgeons <ArrowRight size={18}/></Link></li>
          <li><Link to="/who-we-help/dermatologists">Dermatologists <ArrowRight size={18}/></Link></li>
          <li><Link to="/who-we-help/medspa-owners">MedSpa owners <ArrowRight size={18}/></Link></li>
          <li><Link to="/who-we-help/plastic-surgeons">Plastic surgeons <ArrowRight size={18}/></Link></li>
          <li><Link to="/who-we-help/dentists">Dentists <ArrowRight size={18}/></Link></li>
        </ul>
      </section>

      <section className="footer__col">
        <h2 className="footer__col-heading">COMPANY</h2>

        <ul className="footer__list">
          <li><Link to="/about">About <ArrowRight size={18}/></Link></li>
          <li><Link to="/results">Results <ArrowRight size={18}/></Link></li>
          <li><Link to="/insights/blog">Blog <ArrowRight size={18}/></Link></li>
          <li><Link to="/insights/resources">Resources <ArrowRight size={18}/></Link></li>
          <li><a href={CAREERS_MAILTO}>Careers <ArrowRight size={18}/></a></li>
        </ul>
      </section>

      <section className="footer__col">
        <h2 className="footer__col-heading">CONTACT</h2>

        <div className="footer__contact">
          <div><a href="tel:+16317926023">+1 (631) 792 6023</a></div>
          <div><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
          <div>Lewes ,DEL</div>
        </div>

        <BookCallLink className="footer__audit-link">
          Book a Practice Audit
        </BookCallLink>
      </section>

    </div>

    <div className="footer-sub">
      <div className="footer-sub__row">
        <span>© 2026 Socialsect</span>
        <span>•</span>
        <a href={PRIVACY_MAILTO}>Privacy policy</a>
        <span>•</span>
        <span>Terms of service</span>
      </div>
    </div>
  </div>

  <div className="footer__ecg"></div>
</div>
    </footer>
  )
}
