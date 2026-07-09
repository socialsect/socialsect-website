'use client'
import React from 'react';
import { BOOK_A_CALL_FORM } from '../../constants/routes.js';
import { Link } from 'react-router-dom';
import { Calendar, CircleDollarSign, TrendingUp, Users } from 'lucide-react';
import PerfectMatchSection from '../../components/PerfectMatchSection';
import PracticeInfrastructureSection from '../../components/PracticeInfrastructureSection';
import ProcessClaritySection from '../../components/ProcessClaritySection';
import ResultsSpotlightSection from '../../components/ResultsSpotlightSection';
import SpecialtyAudienceSection from '../../components/SpecialtyAudienceSection';
import HomePhilosophyAuditSections from '../../components/HomePhilosophyAuditSections';
import './homepage.css';

const HERO_STATS = [
  { icon: Calendar, number: '10,000+', label: 'Consultations booked for clients' },
  { icon: CircleDollarSign, number: '$10M+', label: 'In patient pipeline generated' },
  { icon: TrendingUp, number: '4.2x', label: 'Average client ROI' },
  { icon: Users, number: '70%', label: 'Consultation-to-surgery rate' },
];

const TRUSTED_PRACTICES = [
  { name: 'Miami Shoulder Institute', href: 'https://miamishoulderinstitute.com/' },
  { name: 'The Interface Specialist Clinic', href: 'https://interfaceclinic.co.uk/' },
  { name: 'NY Metrovein Medical', href: 'https://www.nymetrovein.com/' },
  { name: 'L&P Aesthetics', href: null },
];

export default function HomePage() {
  return (
    <main className="homepage">
      <section className="home-hero">
        <div className="home-hero__bg" aria-hidden="true">
          <img
            src="/images/hero-surgeon.png"
            alt=""
            className="home-hero__bg-image"
            fetchPriority="high"
            decoding="async"
          />
          <div className="home-hero__overlay" />
        </div>

        <div className="home-hero__content">
          <div className="home-hero__main">
            <div className="hero-copy">
              <p className="hero-eyebrow">
                <span className="hero-eyebrow__line" aria-hidden="true" />
                Marketing for private medical practices (US &amp; UK)
              </p>

              <h1 className="hero-headline">
                <span className="hero-headline__line">You focus on</span>
                <span className="hero-headline__line">changing lives.</span>
                <span className="hero-headline__line hero-headline__line--gradient">
                  We fill your calendar
                </span>
                <span className="hero-headline__line">with the right patients.</span>
              </h1>

              <p className="hero-subheadline">
                We&apos;re not a marketing agency. We&apos;re your growth partner.
              </p>

              <div className="hero-cta-buttons">
                <Link to={BOOK_A_CALL_FORM} className="hero-btn hero-btn--primary">
                  Audit my practice free
                  <svg
                    className="hero-btn__arrow hero-btn__arrow--right"
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
                <a href="#results-spotlight" className="hero-btn hero-btn--secondary">
                  See real results
                  <svg
                    className="hero-btn__arrow hero-btn__arrow--down"
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
                </a>
              </div>
            </div>

            <blockquote className="hero-testimonial">
              <span className="hero-testimonial__quote" aria-hidden="true">
                &ldquo;&rdquo;
              </span>
              <p className="hero-testimonial__text">
                Since working with Socialsect, our consults increased by 300% in 6 months.
              </p>
              <span className="hero-testimonial__divider" aria-hidden="true" />
              <footer className="hero-testimonial__attribution">
                <cite>Dr.Christopher</cite>
                <span>Boca Raton Clinic</span>
              </footer>
            </blockquote>
          </div>

          <div className="hero-stats-bar">
            {HERO_STATS.map(({ number, label }) => (
              <div className="hero-stat" key={label}>
                <div className="hero-stat__number">{number}</div>
                <div className="hero-stat__label">{label}</div>
              </div>
            ))}
          </div>

          <div className="hero-trust">
            <p className="hero-trust__label">Trusted by leading practices</p>
            <div className="hero-trust__logos">
              {TRUSTED_PRACTICES.map(({ name, href }) =>
                href ? (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-trust__logo"
                  >
                    {name}
                  </a>
                ) : (
                  <span key={name} className="hero-trust__logo">
                    {name}
                  </span>
                )
              )}
              <span className="hero-trust__more">and more&hellip;</span>
            </div>
          </div>
        </div>
      </section>

      <PerfectMatchSection />
      <PracticeInfrastructureSection />
      <ProcessClaritySection />
      <ResultsSpotlightSection />
      <SpecialtyAudienceSection />
      <HomePhilosophyAuditSections />
    </main>
  );
}
