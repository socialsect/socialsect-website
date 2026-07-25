'use client'

import React from 'react';
import { BOOK_A_CALL_FORM } from '../constants/routes.js';
import { Link } from 'react-router-dom';
import './ResultsSpotlightSection.css';

const STATS = [
  {
    value: '225',
    label: 'Consultations booked',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="4" width="16" height="15" rx="2" stroke="#695af2" strokeWidth="1.6" fill="none"/>
        <path d="M7 2v4M15 2v4M3 9h16" stroke="#695af2" strokeWidth="1.6" strokeLinecap="round"/>
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
  {
    value: '0$',
    label: 'Wasted on guesswork',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3 15l5-5 4 4 6-8" stroke="#695af2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 7h4v4" stroke="#695af2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: 'English + Spanish',
    label: 'Bilingual funnel',
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
          <p className="results-spotlight__eyebrow">Don&apos;t just take our word for it</p>
          <h2 id="results-spotlight-headline" className="results-spotlight__headline">
            Real practices. Real numbers.<br />
            <em>Nothing rounded up.</em>
          </h2>
        </header>

        <div className="results-spotlight__layout">
          {/* Left dark panel with text + photo side by side */}
          <div className="results-spotlight__panel">
            <div className="results-spotlight__panel-text">
              <p className="results-spotlight__panel-label">Featured Practice</p>
              <h3 className="results-spotlight__name">Dr. Alejandro Badia</h3>
              <p className="results-spotlight__practice">
                Hand and upper extremity orthopedic surgeon
                Miami, FL
              </p>
              <p className="results-spotlight__description">
                Dr. Badia treats complex conditions of the hand, wrist, elbow, and shoulder at the Badia Hand to Shoulder Center. He trained at Cornell and NYU, later serving as Chief of Hand Surgery at Baptist Hospital of Miami, and co-founded the Miami Anatomical Research Center, the largest surgical cadaveric training lab in the world. He also started OrthoNOW, South Florida's first orthopedic urgent care center.
              </p>
              <div className="results-spotlight__panel-cta-row">
                <Link to={BOOK_A_CALL_FORM} className="cta cta--inverse">
                  Get similar results <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="results-spotlight__panel-photo">
              <img
              draggable="false"
                src="/drbadia.webp"
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
                Built the whole patient acquisition system: lead generation, qualification,
                follow-up automation, and conversion tracking.
              </p>
              <p className="results-spotlight__did-copy results-spotlight__did-copy--note">
                Every number above is documented, not estimated.
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