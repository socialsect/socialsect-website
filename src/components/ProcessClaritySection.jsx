'use client'

import React from 'react';
import { Link } from 'react-router-dom';
import './ProcessClaritySection.css';

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 11a3 3 0 1 1 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 8v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconDiagnose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="2" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconDesign() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 21h10M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 9l3 3 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconLaunch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2l8-8-3-3-8 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 3s4 1 6 6l-9 9-3-3 6-12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function IconOptimize() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="12" width="4" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="9" y="7" width="4" height="14" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="16" y="3" width="4" height="18" rx="0.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="process-clarity__check-svg">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6.5 10.5l2.5 2.5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const STEPS = [
  {
    num: '01',
    weeks: 'WEEKS 1–2',
    title: 'Diagnose',
    Icon: IconDiagnose,
    bullets: [
      'Deep dive into your practice',
      'Patient acquisition audit',
      'Competitor & market analysis',
    ],
  },
  {
    num: '02',
    weeks: 'WEEKS 3–4',
    title: 'Design',
    Icon: IconDesign,
    bullets: [
      'Custom growth strategy',
      'Full acquisition system blueprint',
      'Channel & message alignment',
    ],
  },
  {
    num: '03',
    weeks: 'WEEKS 5–8',
    title: 'Launch',
    Icon: IconLaunch,
    bullets: [
      'Website, ads, automations',
      'Tracking & analytics setup',
      'Everything launches together',
    ],
  },
  {
    num: '04',
    weeks: 'WEEKS 9+',
    title: 'Optimize',
    Icon: IconOptimize,
    bullets: [
      'Monthly reviews & insights',
      'Seasonal strategy adjustments',
      'System gets sharper every month',
    ],
  },
];

export default function ProcessClaritySection() {
  return (
    <section className="process-clarity" aria-labelledby="process-clarity-headline">
      <div className="process-clarity__inner">

        {/* ── Top two-column intro ── */}
        <div className="process-clarity__top">
          <div className="process-clarity__intro">
            <p className="process-clarity__eyebrow">No black boxes. No surprises.</p>
            <h2 id="process-clarity-headline" className="process-clarity__headline">
              You'll know exactly what's being built,{' '}
              <em>when, and why.</em>
            </h2>
            <p className="process-clarity__subcopy">
              We start with a deep diagnostic of your practice and build everything around
              what drives real growth. No guessing. No templates. Just a clear plan, built together.
            </p>
          </div>

          <div className="process-clarity__diagnosis-card">
            <div className="process-clarity__diagnosis-icon">
<img src="/diagnosis.svg" alt="Diagnosis icon" width="100" />
            </div>
            <div className="process-clarity__diagnosis-body">
              <p className="process-clarity__diagnosis-kicker">Diagnosis First</p>
              <p className="process-clarity__diagnosis-copy">
                Everything we build comes from real data about your practice, your market, your patients.
              </p>
              <div className="process-clarity__diagnosis-divider" />
              <p className="process-clarity__diagnosis-tagline">
                <strong>Strategy backed by data. Built for results.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="process-clarity__timeline-wrap">

          {/* Icons row */}
  

          {/* Numbered connector row */}
          <div className="process-clarity__connector-row">
            {STEPS.map(({ num }, i) => (
              <React.Fragment key={num}>
                <div className="process-clarity__dot">
                  <span>{num}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="process-clarity__arrow-line">
                    <div className="process-clarity__line" />
                    <span className="process-clarity__arrowhead">›</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step details row */}
          <div className="process-clarity__steps-row">
            {STEPS.map(({ num, weeks, title, bullets }) => (
              <div key={num} className="process-clarity__step-detail">
                <p className="process-clarity__step-weeks">{weeks}</p>
                <h3 className="process-clarity__step-title">{title}</h3>
                <div className="process-clarity__step-divider" />
                <ul className="process-clarity__step-bullets">
                  {bullets.map(b => (
                    <li key={b} className="process-clarity__step-bullet">
                      <CheckIcon />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* ── CTA ── */}
        <div className="process-clarity__cta-wrap">
          <Link to="/how-we-work" className="process-clarity__cta">
            See the full process for every service <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}