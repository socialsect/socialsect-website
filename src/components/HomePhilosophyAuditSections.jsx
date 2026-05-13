import React from 'react';
import './HomePhilosophyAuditSections.css';
import { ArrowRight } from 'lucide-react';

export default function HomePhilosophyAuditSections() {
  return (
    <>
      <section className="home-philosophy" aria-labelledby="home-philosophy-heading">
        <div className="home-philosophy__bg" aria-hidden />
        <div className="home-philosophy__inner">
          <h2 id="home-philosophy-heading" className="home-philosophy__headline">
            We don&apos;t work with everyone. We work with practice owners who are done guessing why
            some months are full and others aren&apos;t  and want a partner who takes as much ownership
            of their results as they do.
          </h2>
          <p className="home-philosophy__body">
            No packages. No templates. No guessing. Every engagement starts with a deep diagnostic of
            your practice. We measure ourselves on one thing  whether your appointment book is fuller
            than it was before us.
          </p>
        </div>
      </section>

      <section id="book-call" className="home-audit-cta" aria-labelledby="home-audit-cta-heading">
        <div className="home-audit-cta__panel">
          <h2 id="home-audit-cta-heading" className="home-audit-cta__headline">
            Your appointment book should be full. Every month. Not just the good ones.
          </h2>
          <p className="home-audit-cta__lede">
            Start with a free 45-minute practice audit. We&apos;ll look at your current patient
            acquisition, identify exactly where it&apos;s leaking, and show you what a system built
            specifically for your practice would look like. No pitch. No packages. Just clarity.
          </p>
          <div className="home-audit-cta__actions">
            <a href="#book-call" className="cta cta--primary cta--lg home-audit-cta__cta-primary">
              See what your practice is missing 
              <ArrowRight size={16} />
            </a>
            <a href="#how-we-work" className="cta cta--secondary cta--lg home-audit-cta__cta-secondary">
              See how we work
            </a>
          </div>
          <p className="home-audit-cta__note">
            No sales pitch. No commitment. No packages. Just a clear diagnosis of where your practice is
            leaving patients on the table.
          </p>
        </div>
      </section>
    </>
  );
}
