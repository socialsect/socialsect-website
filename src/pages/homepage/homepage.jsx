import React from 'react';
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import DeferredSection from '../../components/DeferredSection';
import './homepage.css';

const loadClientLogoMarquee = () => import('../../components/ClientLogoMarquee');
const loadPerfectMatchSection = () => import('../../components/PerfectMatchSection');
const loadPracticeInfrastructureSection = () =>
  import('../../components/PracticeInfrastructureSection');
const loadProcessClaritySection = () => import('../../components/ProcessClaritySection');
const loadResultsSpotlightSection = () => import('../../components/ResultsSpotlightSection');
const loadSpecialtyAudienceSection = () => import('../../components/SpecialtyAudienceSection');
const loadHomePhilosophyAuditSections = () =>
  import('../../components/HomePhilosophyAuditSections');

export default function HomePage() {
  return (
    <main className="homepage">
      <section className="home-hero">
        {/* Left Column - Copy */}
        <div className="hero-left">
          <div className="hero-content">
            {/* Eyebrow */}
            <p className="eyebrow">For private medical practices (US & UK)</p>

            {/* Headline */}
            <h1 className="hero-headline">
              <span className="hero-headline__line">You spent a decade becoming</span>
              <span className="hero-headline__line">a great doctor.</span>
              <span className="hero-headline__stanza-break" aria-hidden="true" />
              <span className="hero-headline__line">You shouldn&apos;t spend another</span>
              <span className="hero-headline__line">figuring out marketing.</span>
            </h1>

            {/* Sub-headline */}
            <p className="hero-subheadline">
              We don't sell leads. We sell booked appointments.
            </p>

            {/* CTA Buttons */}
            <div className="cta-buttons">
              <Link to={BOOK_A_CALL_FORM} className="btn btn-primary">
                Audit my practice free
                <svg className="btn-arrow btn-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <a href="#results-spotlight" className="btn btn-secondary">
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

            {/* Trusted By */}
            <div className="trusted-by">
              {/* <p className="trusted-label">Trusted by</p> */}
              <div className="practice-pills">
                <a href="https://miamishoulderinstitute.com/" target="_blank" rel="noopener noreferrer" className="practice-pill">
                  Miami Shoulder Institute
                  <ExternalLink className="external-icon" strokeWidth={1} />
                </a>
                <a href="https://interfaceclinic.co.uk/" target="_blank" rel="noopener noreferrer" className="practice-pill">
                  The Interface Specialist Clinic
                  <ExternalLink className="external-icon" strokeWidth={1} />
                </a>
                <a href="https://www.nymetrovein.com/" target="_blank" rel="noopener noreferrer" className="practice-pill">
               NY Metrovein Medical
                  <ExternalLink className="external-icon" strokeWidth={1} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeferredSection load={loadClientLogoMarquee} minHeight={200} />
      <DeferredSection load={loadPerfectMatchSection} minHeight={960} />
      <DeferredSection load={loadPracticeInfrastructureSection} minHeight={1120} />
      <DeferredSection load={loadProcessClaritySection} minHeight={980} />
      <DeferredSection load={loadResultsSpotlightSection} minHeight={960} />
      <DeferredSection load={loadSpecialtyAudienceSection} minHeight={900} />
      <DeferredSection load={loadHomePhilosophyAuditSections} minHeight={1240} />
    </main>
  );
}
