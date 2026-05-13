import React from 'react';
import './ResultsSpotlightSection.css';

const STATS = [
  { value: '225', label: 'Consultations booked' },
  { value: '36', label: 'Surgical conversions' },
  { value: '$380K+', label: 'Direct revenue' },
  { value: '$1M+', label: 'Full case value' },
];

export default function ResultsSpotlightSection() {
  return (
    <section className="results-spotlight" aria-labelledby="results-spotlight-headline">
      <div className="results-spotlight__inner">
        <header className="results-spotlight__intro">
          <p className="results-spotlight__eyebrow">Don&apos;t take our word for it</p>
          <h2 id="results-spotlight-headline" className="results-spotlight__headline">
            Real practices. Real numbers. No rounding up.
          </h2>
        </header>

        <div className="results-spotlight__layout">
          <div className="results-spotlight__panel">
            <p className="results-spotlight__panel-label">Client</p>
            <h3 className="results-spotlight__name">Dr. Badia</h3>
            <p className="results-spotlight__practice">
              Miami Sports &amp; Interventional · Orthopaedic, shoulder &amp; elbow surgery ·
              Miami, FL
            </p>
            <blockquote className="results-spotlight__quote">
              &ldquo;Before Socialsect we were getting leads. What we weren&apos;t getting was
              patients who showed up, were serious about treatment, and actually moved forward
              with care. That was the gap. That&apos;s what they fixed.&rdquo;
            </blockquote>
            <div className="results-spotlight__panel-cta-row">
              <a
                href="https://miamishoulderinstitute.com/"
                className="cta cta--inverse"
                target="_blank"
                rel="noopener noreferrer"
              >
                Talk to Dr. Badia
                <span aria-hidden="true"> →</span>
              </a>
            </div>
          </div>

          <div className="results-spotlight__proof">
            <p className="results-spotlight__trust-line">
              Direct reference · highest trust signal on the site
            </p>
            <ul className="results-spotlight__stats">
              {STATS.map((row) => (
                <li key={row.label} className="results-spotlight__stat">
                  <span className="results-spotlight__stat-value">{row.value}</span>
                  <span className="results-spotlight__stat-label">{row.label}</span>
                </li>
              ))}
            </ul>
            <div className="results-spotlight__did">
              <h4 className="results-spotlight__did-title">What we did</h4>
              <p className="results-spotlight__did-copy">
                Built the full patient acquisition system  lead generation, qualification,
                follow-up automation, and conversion tracking. Every number above is documented.
                No estimates.
              </p>
              <a href="/results" className="cta cta--primary">
                See all results
                <span aria-hidden="true"> →</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
