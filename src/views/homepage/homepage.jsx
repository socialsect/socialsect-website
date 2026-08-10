'use client'
import React, { Suspense, lazy, useEffect } from 'react';
import { BOOK_A_CALL_FORM } from '../../constants/routes.js';
import { Link } from 'react-router-dom';
import { Calendar, CircleDollarSign, TrendingUp, Users } from 'lucide-react';
import { preloadAll } from '../../lib/videoPreloader';
import './homepage.css';

const CAROUSEL_VIDEO_URLS = [
  "https://aquamarine-bee-678141.hostingersite.com/videos/%231.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/0214%20(2)(1).mov",
  "https://aquamarine-bee-678141.hostingersite.com/videos/544.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/547.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Animated_1.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/%C2%BFListo%20para%20eliminar%20tus%20varices%20%F0%9F%92%89%C2%A1Deja%20que%20los%20expertos%20se%20encarguen%20de%20ello!%20En%20@nymetrovein%20.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Miami%20Eng_1.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Miami%20esp_1.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Msi%20Testimonial%201.mov",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Msi%20testimonial%202.mov",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Online%20course_2.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Si%20piensas%20que%20los%20remedios%20untados%20te%20van%20a%20eliminar%20las%20varices%20pues%20no%20pierdas%20tu%20tiempo%20ombe.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Socket%20grafting_2.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Veins_3_1.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Video%201.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-14%20at%202.28.13%20PM.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-21%20at%2010.53.43%20PM%20(1).mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-21%20at%205.53.49%20PM%20(1).mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-08-21%20at%205.53.49%20PM.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/WhatsApp%20Video%202025-09-04%20at%201.18.04%20PM.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/A%20mis%2041%20a%C3%B1os%20estoy%20contenta%20con%20la%20salud%20de%20mis%20piernas%20%F0%9F%A6%B5%20gracias%20a%20@nymetrovein%20que%20me%20elimin%20(1).mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/AQPIFdom17VsWLVOxSM4qlVxKrghIv-PFTFZ4fUVLPm7QgbKyRmrs_BDUCT5hD3gtXEzfHa17S_nXzC_67HX5JUg.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/C%C3%B3mo%20lucir%20unas%20piernas%20hermosas%20gracias%20a%20@nymetrovein%20elim%C3%ADnalas%20sin%20dolor%20y%20en%20manos%20de%20m%C3%A9dic.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Resp%C3%A9tame%20@maicolnova%20,%20qu%C3%A9%20lo%20m%C3%ADo%20ha%20sido%20palo%20y%20palo%20desde%20el%208%20de%20enero%20,%20pero%20ninguno%20como%20.mp4",
  "https://aquamarine-bee-678141.hostingersite.com/videos/Si%20soy%20una%20ciudadana%20seria%20,%20pero%20sin%20venas%20varicosas%20tambi%C3%A9n%20un%20chin%20atrevida%20,%20gracias%20a%20@nyme%20(1).mp4"
];

// Lazy-load below-fold sections to reduce initial JS bundle
const PerfectMatchSection = lazy(() => import('../../components/PerfectMatchSection'));
const PracticeInfrastructureSection = lazy(() => import('../../components/PracticeInfrastructureSection'));
const ContentLibraryCarousel = lazy(() => import('../../components/ContentLibraryCarousel'));
const ProcessClaritySection = lazy(() => import('../../components/ProcessClaritySection'));
const ResultsSpotlightSection = lazy(() => import('../../components/ResultsSpotlightSection'));
const SpecialtyAudienceSection = lazy(() => import('../../components/SpecialtyAudienceSection'));
const HomePhilosophyAuditSections = lazy(() => import('../../components/HomePhilosophyAuditSections'));
const AskAISection = lazy(() => import('../../components/AskAISection'));

const SECTION_PLACEHOLDER = (
  <div style={{ minHeight: 200, background: 'transparent' }} aria-hidden="true" />
);

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
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/hero-surgeon-phone.webp"
            />
            <img
              src="/images/hero-surgeon.webp"
              alt=""
              className="home-hero__bg-image"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
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
                  Book a strategy call
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
                <Link to="/results" className="hero-btn hero-btn--secondary">
                  See our work
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
                </Link>
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

      <Suspense fallback={SECTION_PLACEHOLDER}><PerfectMatchSection /></Suspense>
      {/* <Suspense fallback={SECTION_PLACEHOLDER}><PracticeInfrastructureSection /></Suspense> */}
      <Suspense fallback={SECTION_PLACEHOLDER}><ContentLibraryCarousel /></Suspense>
      <Suspense fallback={SECTION_PLACEHOLDER}><ProcessClaritySection /></Suspense>
      <Suspense fallback={SECTION_PLACEHOLDER}><ResultsSpotlightSection /></Suspense>
      <Suspense fallback={SECTION_PLACEHOLDER}><SpecialtyAudienceSection /></Suspense>
      <Suspense fallback={SECTION_PLACEHOLDER}><HomePhilosophyAuditSections /></Suspense>
      <Suspense fallback={SECTION_PLACEHOLDER}><AskAISection /></Suspense>
    </main>
  );
}
