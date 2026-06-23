import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookCallLink from './BookCallLink'
import './Footer.css'
import { TbBrandLinkedin, TbBrandInstagram } from 'react-icons/tb'
import { FaGithub } from 'react-icons/fa'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { CLIENT_PORTAL_PATH } from '../constants/routes.js'

const CONTACT_EMAIL = 'sales@gosocialsect.com'
const LINKEDIN_URL = 'https://www.linkedin.com/company/socialsect'
const INSTAGRAM_URL = 'https://www.instagram.com/gosocialsect/'
const CAREERS_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Careers at Socialsect')}`

export default function Footer() {
  const [auditFormOpen, setAuditFormOpen] = useState(false);
  const [auditFormData, setAuditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practice: '',
    message: '',
  });
  const [auditErrors, setAuditErrors] = useState({});
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  const handleAuditInputChange = (e) => {
    const { name, value } = e.target;
    setAuditFormData(prev => ({ ...prev, [name]: value }));
    if (auditErrors[name]) {
      setAuditErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateAuditForm = () => {
    const newErrors = {};
    if (!auditFormData.name.trim()) newErrors.name = 'Name is required';
    if (!auditFormData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(auditFormData.email)) newErrors.email = 'Invalid email';
    if (!auditFormData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!auditFormData.practice.trim()) newErrors.practice = 'Practice name is required';
    return newErrors;
  };

  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateAuditForm();
    
    if (Object.keys(newErrors).length > 0) {
      setAuditErrors(newErrors);
      return;
    }

    setAuditLoading(true);

    try {
      const response = await fetch('/api/book-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...auditFormData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setAuditSubmitted(true);
        setTimeout(() => {
          setAuditFormOpen(false);
          setAuditSubmitted(false);
          setAuditFormData({ name: '', email: '', phone: '', practice: '', message: '' });
        }, 2000);
      } else {
        setAuditErrors({ submit: 'Failed to submit. Please try again.' });
      }
    } catch (error) {
      console.error('Audit form error:', error);
      setAuditErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setAuditLoading(false);
    }
  };

  return (
    <footer className="footer">
   <div className="footer__card">
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

    <div className="footer__cta-button-wrapper">
      <button 
        className="footer__cta-btn footer__audit-form-toggle"
        onClick={() => setAuditFormOpen(!auditFormOpen)}
      >
        <span>Book a free 45-minute audit</span>
        <ChevronDown size={20} style={{ transform: auditFormOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
      </button>

      {auditFormOpen && (
        <div className="footer__audit-form-dropdown">
          {auditSubmitted ? (
            <div className="footer__audit-success">
              <div className="footer__success-icon">✓</div>
              <p>Thank you! We'll send audit details to your email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleAuditSubmit} noValidate className="footer__audit-form">
              <div className="footer__form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={auditFormData.name}
                  onChange={handleAuditInputChange}
                  className={auditErrors.name ? 'error' : ''}
                />
                {auditErrors.name && <span className="footer__error">{auditErrors.name}</span>}
              </div>

              <div className="footer__form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={auditFormData.email}
                  onChange={handleAuditInputChange}
                  className={auditErrors.email ? 'error' : ''}
                />
                {auditErrors.email && <span className="footer__error">{auditErrors.email}</span>}
              </div>

              <div className="footer__form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={auditFormData.phone}
                  onChange={handleAuditInputChange}
                  className={auditErrors.phone ? 'error' : ''}
                />
                {auditErrors.phone && <span className="footer__error">{auditErrors.phone}</span>}
              </div>

              <div className="footer__form-group">
                <input
                  type="text"
                  name="practice"
                  placeholder="Practice Name"
                  value={auditFormData.practice}
                  onChange={handleAuditInputChange}
                  className={auditErrors.practice ? 'error' : ''}
                />
                {auditErrors.practice && <span className="footer__error">{auditErrors.practice}</span>}
              </div>

              <div className="footer__form-group">
                <textarea
                  name="message"
                  placeholder="Any additional details? (optional)"
                  value={auditFormData.message}
                  onChange={handleAuditInputChange}
                  rows="3"
                />
              </div>

              {auditErrors.submit && <span className="footer__error">{auditErrors.submit}</span>}

              <button 
                type="submit" 
                className="footer__submit-btn"
                disabled={auditLoading}
              >
                {auditLoading ? 'Submitting...' : 'Book Your Audit'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
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
          <a href="https://github.com/socialsect" target="_blank" rel="noopener noreferrer" aria-label="Socialsect on GitHub">
            <FaGithub />
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
        <Link to="/privacy-policy">Privacy policy</Link>
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
