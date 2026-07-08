import React from 'react';
import { BOOK_A_CALL_FORM } from '../constants/routes.js';
import { Link } from 'react-router-dom';
import './ResultsSpotlightSection.css';

const STATS = [
  {
    value: '225',
    label: 'Consultations booked',
  },
  {
    value: '36',
    label: 'Surgical conversions',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M5 17L10 9l3 5 2-3 4 6" stroke="#695af2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="6" r="2" stroke="#695af2" strokeWidth="1.5" fill="none"/>
        <line x1="14" y1="6" x2="8" y2="6" stroke="#695af2" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: '84%',
    label: 'Consultation-to-surgery rate',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3 15l5-5 4 4 6-8" stroke="#695af2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 7h4v4" stroke="#695af2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: '4.2x',
    label: 'Patient acquisition growth',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="8" cy="8" r="3" stroke="#695af2" strokeWidth="1.6" fill="none"/>
        <circle cx="15" cy="8" r="3" stroke="#695af2" strokeWidth="1.6" fill="none"/>
        <path d="M2 19c0-3 2.7-5 6-5s6 2 6 5" stroke="#695af2" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M15 13c2.3.4 4 2 4 4.5" stroke="#695af2" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M19 8.5c1.1.6 2 1.8 2 3.5" stroke="#695af2" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function ResultsSpotlightSection() {
  return (
    <section
      id="results-spotlight"
      className="results-spotlight"
      aria-labelledby="results-spotlight-headline"
    >
      <div className="results-spotlight__inner">
        <header className="results-spotlight__intro">
          <p className="results-spotlight__eyebrow">Don&apos;t take our word for it</p>
          <h2 id="results-spotlight-headline" className="results-spotlight__headline">
            Real practices. Real numbers.<br />
            <em>No rounding up.</em>
          </h2>
        </header>

        <div className="results-spotlight__layout">
          {/* Left dark panel with text + photo side by side */}
          <div className="results-spotlight__panel">
            <div className="results-spotlight__panel-text">
              <p className="results-spotlight__panel-label">Client</p>
              <h3 className="results-spotlight__name">Dr. Badia</h3>
              <p className="results-spotlight__practice">
                Miami Sports &amp; Interventional Orthopaedic, shoulder &amp; elbow surgery
                Miami, FL
              </p>
              <blockquote className="results-spotlight__quote">
                <span className="results-spotlight__quote-mark">&ldquo;&ldquo;</span>
                Before Socialsect we were getting leads. What we weren&apos;t getting was
                patients who showed up, were serious about treatment, and actually moved forward
                with care.{' '}
                <strong>That was the gap. That&apos;s what they fixed.</strong>
              </blockquote>
              <div className="results-spotlight__panel-cta-row">
                <Link to={BOOK_A_CALL_FORM} className="cta cta--inverse">
                  Request a reference call <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="results-spotlight__panel-photo">
              <img
              draggable="false"
                src="/drbadia.jpg"
                alt="Dr. Badia holding his book Healthcare from the Trenches"
                className="results-spotlight__photo-img"
              />
            </div>
          </div>

          {/* Right stats + what we did */}
          <div className="results-spotlight__proof">
            <ul className="results-spotlight__stats">
              {STATS.map((row) => (
                <li key={row.label} className="results-spotlight__stat">
            
                  <div className="results-spotlight__stat-body">
                    <span className="results-spotlight__stat-value">{row.value}</span>
                    <span className="results-spotlight__stat-label">{row.label}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="results-spotlight__did">
              <h4 className="results-spotlight__did-title">
                What we did
              </h4>
              <p className="results-spotlight__did-copy">
                Built the full patient acquisition system  from lead generation and
                qualification to follow-up automation and conversion tracking.
              </p>
              <p className="results-spotlight__did-copy results-spotlight__did-copy--note">
                Every number above is documented. No estimates.
              </p>
              <Link to="/results" className="cta cta--primary">
                See all results <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}