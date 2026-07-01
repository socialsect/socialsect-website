'use client'

import React from 'react';
import { BOOK_A_CALL_FORM } from '../constants/routes.js'
import { Link } from 'react-router-dom';
import './HomeHero.css';

export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="hero-left">
        <div className="hero-content">
          <p className="eyebrow">For private medical practices (US & UK)</p>

          <h1 className="hero-headline">
            <span className="hero-headline__line">You spent a decade becoming</span>
            <span className="hero-headline__line">a great doctor.</span>
            <span className="hero-headline__stanza-break" aria-hidden="true" />
            <span className="hero-headline__line">You shouldn&apos;t spend another</span>
            <span className="hero-headline__line">figuring out marketing.</span>
          </h1>

          <p className="hero-subheadline">
            We don&apos;t sell leads. We sell booked appointments.
          </p>

          <div className="cta-links">
            <Link to={BOOK_A_CALL_FORM} className="cta-primary">
              Audit my practice free →
            </Link>
            <a href="#results-spotlight" className="cta-secondary">
              See results ↓
            </a>
          </div>

          <p className="trust-line">
            No packages. No long-term contracts. Starts with a free practice audit.
          </p>
        </div>
      </div>

      <div className="hero-right">
        <div className="proof-content">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">70%</div>
              <div className="stat-label">Consultation-to-surgery rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Consultations booked</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">$10M+</div>
              <div className="stat-label">Patient pipeline influenced</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.2x</div>
              <div className="stat-label">Avg. client ROI</div>
            </div>
          </div>

          <div className="trusted-by">
            <div className="practice-pills">
              <span className="practice-pill">Miami Sports & Interventional</span>
              <span className="practice-pill">Mehra Aesthetics</span>
              <span className="practice-pill">Goldman Medical</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
