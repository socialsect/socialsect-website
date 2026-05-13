import React from 'react';
import { ExternalLink } from 'lucide-react';
import ClientLogoMarquee from '../../components/ClientLogoMarquee';
import PerfectMatchSection from '../../components/PerfectMatchSection';
import PracticeInfrastructureSection from '../../components/PracticeInfrastructureSection';
import ProcessClaritySection from '../../components/ProcessClaritySection';
import ResultsSpotlightSection from '../../components/ResultsSpotlightSection';
import SpecialtyAudienceSection from '../../components/SpecialtyAudienceSection';
import HomePhilosophyAuditSections from '../../components/HomePhilosophyAuditSections';
import './homepage.css';

export default function HomePage() {
  return (
    <main className="homepage">
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

            {/* CTA Buttons */}
            <div className="cta-buttons">
              <a href="#" className="btn btn-primary">
                See what your practice is missing
                <svg className="btn-arrow btn-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a href="#" className="btn btn-secondary">
                See results
                <svg className="btn-arrow btn-arrow-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
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
                <a href="https://miamishoulderinstitute.com/" target="_blank" rel="noopener noreferrer" className="practice-pill">
                  Miami Sports & Interventional
                  <ExternalLink className="external-icon" strokeWidth={1} />
                </a>
                <a href="https://interfaceclinic.co.uk/" target="_blank" rel="noopener noreferrer" className="practice-pill">
                  Mehra Aesthetics
                  <ExternalLink className="external-icon" strokeWidth={1} />
                </a>
                <a href="https://www.nymetrovein.com/" target="_blank" rel="noopener noreferrer" className="practice-pill">
                  Goldman Medical
                  <ExternalLink className="external-icon" strokeWidth={1} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientLogoMarquee />
      <PerfectMatchSection />
      <PracticeInfrastructureSection />
      <ProcessClaritySection />
      <ResultsSpotlightSection />
      <SpecialtyAudienceSection />
      <HomePhilosophyAuditSections />
    </main>
  );
}
