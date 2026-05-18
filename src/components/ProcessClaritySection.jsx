import React from 'react';
import { Link } from 'react-router-dom';
import './ProcessClaritySection.css';

const STEPS = [
  {
    num: '01',
    timeline: 'Weeks 1–2',
    title: 'Practice diagnostic',
    body:
      'We spend two weeks inside your practice before we build anything. Patient acquisition audit. Competitor mapping. Seasonal analysis.',
  },
  {
    num: '02',
    timeline: 'Weeks 3–4',
    title: 'System design',
    body:
      'We design the full acquisition system around your specific practice. We design it together, then we build it. No surprises.',
  },
  {
    num: '03',
    timeline: 'Weeks 5–8',
    title: 'Full-stack launch',
    body:
      'Website, campaigns, automations, and tracking, all built together, all launched together. No gaps between channels.',
  },
  {
    num: '04',
    timeline: 'Weeks 9+',
    title: 'Iterate and compound',
    body:
      'Monthly reviews. Seasonal contingencies activated before the dip hits. The system gets sharper every month.',
  },
];

export default function ProcessClaritySection() {
  return (
    <section className="process-clarity" aria-labelledby="process-clarity-headline">
      <div className="process-clarity__inner">
        <header className="process-clarity__intro">
          <p className="process-clarity__eyebrow">No black boxes. No surprises.</p>
          <h2 id="process-clarity-headline" className="process-clarity__headline">
            You&apos;ll know exactly what&apos;s being built, when, and why, before we start.
          </h2>
          <p className="process-clarity__subcopy">
            We don&apos;t disappear after onboarding and resurface with a monthly report. Every
            engagement starts with a deep diagnostic of your practice. Everything we build comes
            from that diagnostic, nothing is guesswork, nothing is templated.
          </p>
        </header>

        <ol className="process-clarity__steps">
          {STEPS.map((step) => (
            <li key={step.num} className="process-clarity__step">
              <div className="process-clarity__step-head">
                <p className="process-clarity__kicker">
                  <span className="process-clarity__num">{step.num}</span>
                  <span className="process-clarity__kicker-dash" aria-hidden="true">
                    {' · '}
                  </span>
                  <span className="process-clarity__timeline">{step.timeline}</span>
                </p>
              </div>
              <div className="process-clarity__step-body">
                <h3 className="process-clarity__step-title">{step.title}</h3>
                <p className="process-clarity__step-copy">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="process-clarity__cta-wrap">
          <Link to="/how-we-work" className="cta cta--primary cta--lg cta--block">
            See the full process for every service
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
