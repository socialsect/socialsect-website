'use client'

import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'next/image';
import './PracticeInfrastructureSection.css';

/* ── Pillar icon SVGs ── */
function IconBuild() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M17.5 14v7M14 17.5h7" />
    </svg>
  );
}

function IconGrow() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="12" width="4" height="10" />
      <rect x="9" y="7" width="4" height="15" />
      <rect x="16" y="2" width="4" height="20" />
    </svg>
  );
}

function IconBrand() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

/* ── Principle icon SVGs ── */
function IconNoPkg() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  );
}

function IconNoGold() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function IconDiagnostic() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  );
}

function IconActualNeed() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/* ── Data ── */

const PILLARS = [
  {
    id: 'build',
    Icon: IconBuild,
    eyebrow: 'Build: Digital Infrastructure',
    lead: 'Your digital foundation, built to convert.',
    body: 'Practice websites that rank and convert. Booking systems that reduce front desk load. Custom apps and web tools built around your workflow, not a generic template.',
    links: [
      { label: 'Websites', href: '/services/build/websites' },
      { label: 'Apps', href: '/services/build/apps' },
      { label: 'Booking systems', href: '/services/build/systems' },
      { label: 'Web applications', href: '/services/build/web-apps' },
    ],
    ctaHref: '/services#build',
    ctaLabel: 'See what we build',
  },
  {
    id: 'grow',
    Icon: IconGrow,
    eyebrow: 'Grow: Patient Acquisition',
    lead: 'Booked appointments, not leads.',
    body: 'Paid campaigns that target patients already looking for your specialty. SEO that puts your practice above competitors in local search. Every channel working together, measured in appointments, not clicks.',
    links: [
      { label: 'Meta ads', href: '/services/grow/meta-ads' },
      { label: 'Google ads', href: '/services/grow/google-ads' },
      { label: 'SEO', href: '/services/grow/seo' },
    ],
    ctaHref: '/services#grow',
    ctaLabel: 'See how we grow practices',
  },
  {
    id: 'brand',
    Icon: IconBrand,
    eyebrow: 'Brand: Creative',
    lead: 'Look as good as you are.',
    body: "Your brand is what a patient sees before they've met you. We make sure it reflects the calibre of care you deliver, through identity, design, video, and content that builds trust before the first appointment.",
    links: [
      { label: 'Brand identity', href: '/services/brand/identity' },
      { label: 'Design', href: '/services/brand/design' },
      { label: 'Video', href: '/services/brand/video' },
      { label: 'Content', href: '/services/brand/content' },
    ],
    ctaHref: '/results',
    ctaLabel: 'See our brand work',
  },
];



const PRINCIPLES = [
  { Icon: IconNoPkg,      text: 'No packages. No cookie-cutter.' },
  { Icon: IconNoGold,     text: 'No Bronze / Silver / Gold. No fluff.' },
  { Icon: IconDiagnostic, text: 'Every engagement starts with a diagnostic.' },
  { Icon: IconActualNeed, text: 'We build what you actually need, not what fits our menu.' },
];

/* ── Simple logo badge ── */
function OrbitalGraphic() {
  return (
<div className="practice-infra__graphic" aria-hidden="true">
  <Image
    src="/hubgraphic.webp"
    draggable="false"
    alt=""
    width={844}
    height={469}
    sizes="(max-width: 768px) 100vw, 545px"
    loading="lazy"
    priority
    style={{ width: '100%', height: 'auto' }}
  />
</div>
  );
}

/* ── Component ── */
export default function PracticeInfrastructureSection() {
  return (
    <section className="practice-infra" aria-labelledby="practice-infra-headline">
      <div className="practice-infra__inner">

        {/* Eyebrow */}
        <div className="practice-infra__eyebrow-bar">
          <div className="practice-infra__eyebrow-line" aria-hidden="true" />
          <p className="practice-infra__eyebrow">
            Everything your practice needs. One team. Full accountability.
          </p>
        </div>

        {/* Intro */}
        <header className="practice-infra__intro">
          <div className="practice-infra__intro-content">
            <div className="practice-infra__intro-text">
              <h2 id="practice-infra-headline" className="practice-infra__headline">
                Most practices are held back not by a lack of ambition, but by a lack of{' '}
                <em>infrastructure.</em>
              </h2>
              <p className="practice-infra__subcopy">
                You shouldn&apos;t need a separate vendor for your website, your ads, your brand,
                and your booking system.{' '}
                <strong>
                  We build and run all of it, custom to your practice, designed to work together,
                  and accountable to one number: patients in the chair.
                </strong>
              </p>
            </div>
                <OrbitalGraphic />
          </div>{/* ← closes practice-infra__intro-content */}
      
        </header>{/* ← closes practice-infra__intro */}

        {/* Three pillar cards */}
        <ul className="practice-infra__pillars">
          {PILLARS.map(({ id, Icon, eyebrow, lead, body, links, ctaHref, ctaLabel }) => (
            <li key={id} className="practice-infra__pillar">
              <div className="practice-infra__pillar-icon">
                <Icon />
              </div>
              <p className="practice-infra__pillar-eyebrow">{eyebrow}</p>
              <h3 className="practice-infra__pillar-lead">{lead}</h3>
              <div className="practice-infra__pillar-divider" />
              <p className="practice-infra__pillar-body">{body}</p>
              <p className="practice-infra__pillar-meta">
                {links.map((link, i) => (
                  <React.Fragment key={link.href}>
                    {i > 0 && <span className="practice-infra__sep"> · </span>}
                    <Link to={link.href} className="practice-infra__tag-link">
                      {link.label}
                    </Link>
                  </React.Fragment>
                ))}
                <span className="practice-infra__sep"> · </span>
                <Link to={ctaHref} className="practice-infra__pillar-cta">
                  {ctaLabel}<span aria-hidden="true"> →</span>
                </Link>
              </p>
            </li>
          ))}
        </ul>

        {/* Bottom principles bar */}
        <div className="practice-infra__principles">
          {PRINCIPLES.map(({ Icon, text }) => (
            <div key={text} className="practice-infra__principle">
              <div className="practice-infra__principle-icon-wrap">
                <Icon />
              </div>
              <span className="practice-infra__principle-text">{text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}