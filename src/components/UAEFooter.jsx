'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './UAEFooter.css'
import { TbBrandLinkedin, TbBrandInstagram } from 'react-icons/tb'

const LINKEDIN_URL = 'https://www.linkedin.com/company/socialsect'
const INSTAGRAM_URL = 'https://www.instagram.com/gosocialsect/'

export default function UAEFooter() {
  const pathname = usePathname()
  if (pathname !== '/uae') return null

  return (
    <footer className="uae-footer">
      <div className="uae-footer__inner">

        <div className="uae-footer__top">
          <div className="uae-footer__brand">
            <Link href="/uae" className="uae-footer__logo-link">
              <img
                src="/icons/logo.svg"
                alt="Socialsect"
                className="uae-footer__logo"
                width={48}
                height={48}
                draggable="false"
              />
            </Link>
            <p className="uae-footer__tagline">
              Patient acquisition systems for private clinics across the UAE.
            </p>
            <div className="uae-footer__social">
              <a href={LINKEDIN_URL} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <TbBrandLinkedin />
              </a>
              <a href={INSTAGRAM_URL} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <TbBrandInstagram />
              </a>
            </div>
          </div>

          <div className="uae-footer__links-group">
            <div className="uae-footer__col">
              <h4 className="uae-footer__col-title">Services</h4>
              <ul className="uae-footer__list">
                <li><a href="#pipeline">How it works</a></li>
                <li><a href="#case-studies">Results</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="uae-footer__col">
              <h4 className="uae-footer__col-title">Company</h4>
              <ul className="uae-footer__list">
                <li><a href="/about">About</a></li>
                <li><a href="/who-we-help">Who we help</a></li>
                <li><a href="/privacy-policy">Privacy policy</a></li>
              </ul>
            </div>

            <div className="uae-footer__col">
              <h4 className="uae-footer__col-title">Contact</h4>
              <ul className="uae-footer__list">
                <li><a href="https://wa.me/16317926023?text=Hi%20Socialsect!%20I'd%20like%20to%20book%20a%20call." target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                <li><a href="mailto:sales@gosocialsect.com">Email us</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="uae-footer__bottom">
          <span>&copy; 2026 Socialsect. Dubai, UAE.</span>
        </div>

      </div>
    </footer>
  )
}
