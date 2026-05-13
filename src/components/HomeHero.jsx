import React from 'react';
import './HomeHero.css';

export default function HomeHero() {
  return (
    <section className="home-hero">
      {/* Left Column - Copy */}
      <div className="hero-left">
        <div className="hero-content">
          {/* Eyebrow */}
          <p className="eyebrow">For private medical practices · US & UK</p>

          {/* Headline */}
          <h1 className="hero-headline">
            You spent a decade becoming a great doctor. You shouldn't spend another figuring out marketing.
          </h1>

          {/* Sub-headline */}
          <p className="hero-subheadline">
            We don't sell leads. We sell booked appointments.
          </p>

          {/* CTA Links */}
          <div className="cta-links">
            <a href="#" className="cta-primary">
              See what your practice is missing →
            </a>
            <a href="#" className="cta-secondary">
              See results ↓
            </a>
          </div>

          {/* Trust Line */}
          <p className="trust-line">
            No packages. No long-term contracts. Starts with a free practice audit.
          </p>
        </div>
      </div>

      {/* Right Column - Proof/Stats */}
      <div className="hero-right">
        <div className="proof-content">
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">225</div>
              <div className="stat-label">Consultations booked</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">36</div>
              <div className="stat-label">Surgical cases</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">$1M+</div>
              <div className="stat-label">Revenue generated</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">78%</div>
              <div className="stat-label">Healthcare clients</div>
            </div>
          </div>

          {/* Trusted By */}
          <div className="trusted-by">
            <p className="trusted-label">Trusted by</p>
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
