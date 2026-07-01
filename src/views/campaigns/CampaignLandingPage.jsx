'use client'

import React, { useEffect } from 'react';
import SpeedCalculator from '../../components/speed-calculator/SpeedCalculator';
import '../visibility/visibility.css';

export default function CampaignLandingPage({
  pagePath,
  pageTitle,
  eyebrow,
  headline,
  subheadline,
  formIntro,
  quote,
  quoteAuthor = 'Socialsect',
  quoteSubtitle = 'Marketing for private medical practices',
  trustMetrics,
  featuresTitle,
  features,
  whyTitle,
  whyIntro,
  whyPoints,
  finalCtaTitle,
  finalCtaSubheadline,
  finalCtaLabel,
  speedCalculatorProps = {},
}) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');

    if (emailParam && speedCalculatorProps.prefillEmail !== false) {
      // SpeedCalculator manages its own state; prefill via URL is handled on mount in parent pages if needed
    }

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle,
        source: params.get('source') || 'direct',
        campaign: params.get('campaign') || 'organic',
      });
    }

    if (window.lintrk) {
      window.lintrk('track', { conversion_id: 13582007 });
    }
  }, [pagePath, pageTitle, speedCalculatorProps.prefillEmail]);

  const scrollToHero = (e) => {
    e.preventDefault();
    document.querySelector('.hero-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="visibility-page">
      <section className="hero-section" id="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span />
            {eyebrow}
          </div>

          <h1>{headline}</h1>

          <p className="sub">{subheadline}</p>

          <SpeedCalculator
            formName={speedCalculatorProps.formName}
            contentName={speedCalculatorProps.contentName}
            niche={speedCalculatorProps.niche}
            submitLabel={speedCalculatorProps.submitLabel}
            loadingTitle={speedCalculatorProps.loadingTitle}
            loadingMessage={speedCalculatorProps.loadingMessage}
            reportTitle={speedCalculatorProps.reportTitle}
            formDescription={formIntro || speedCalculatorProps.formDescription}
            websitePlaceholder={speedCalculatorProps.websitePlaceholder}
            emailPlaceholder={speedCalculatorProps.emailPlaceholder}
            metricLabels={speedCalculatorProps.metricLabels}
            opportunityNote={speedCalculatorProps.opportunityNote}
            resetButtonLabel={speedCalculatorProps.resetButtonLabel}
            nextSteps={speedCalculatorProps.nextSteps}
            onSuccess={speedCalculatorProps.onSuccess}
          />
        </div>

        <div className="floating-card">
          <div className="quote">&ldquo;</div>
          <p>{quote}</p>
          <div className="line" />
          <div className="doctor">{quoteAuthor}</div>
          <div className="clinic">{quoteSubtitle}</div>
        </div>
      </section>

      <section className="trust-section">
        {trustMetrics.map(({ value, label }) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="snapshot-features">
        <h2>{featuresTitle}</h2>
        <div className="features-grid">
          {features.map(({ number, title, description }) => (
            <div key={number} className="feature-card">
              <div className="feature-number">{number}</div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="why-matters">
        <h2>{whyTitle}</h2>
        <div className="matters-content">
          <p>{whyIntro}</p>
          <div className="matters-list">
            {whyPoints.map(({ title, detail }) => (
              <div key={title} className="matter-item">
                <span className="check">✓</span>
                <p>
                  <strong>{title}</strong> {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-content">
          <h2>{finalCtaTitle}</h2>
          <p>{finalCtaSubheadline}</p>
          <a href="#hero" className="large-cta-btn" onClick={scrollToHero}>
            {finalCtaLabel}
          </a>
        </div>
      </section>
    </div>
  );
}
