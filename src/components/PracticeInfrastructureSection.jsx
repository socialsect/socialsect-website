import React from 'react';
import { Link } from 'react-router-dom';
import './PracticeInfrastructureSection.css';

const PILLARS = [
  {
    id: 'build',
    title: 'Build  digital infrastructure',
    lead: 'Your digital foundation, built to convert.',
    body:
      'Practice websites that rank and convert. Booking systems that reduce front desk load. Custom apps and web tools built around your workflow  not a generic template.',
    links: [
      { label: 'Websites', href: '/services/build/websites' },
      { label: 'Apps', href: '/services/build/apps' },
      { label: 'Booking systems', href: '/services/build/systems' },
      { label: 'Web applications', href: '/services/build/web-apps' },
    ],
    ctaHref: '/services/build',
    ctaLabel: 'Explore build',
  },
  {
    id: 'grow',
    title: 'Grow  patient acquisition',
    lead: 'Booked appointments, not leads.',
    body:
      'Paid campaigns that target patients already looking for your specialty. SEO that puts your practice above competitors in local search. Every channel working together, measured in appointments  not clicks.',
    links: [
      { label: 'Meta ads', href: '/services/grow/meta-ads' },
      { label: 'Google ads', href: '/services/grow/google-ads' },
      { label: 'SEO', href: '/services/grow/seo' },
    ],
    ctaHref: '/services/grow',
    ctaLabel: 'Explore grow',
  },
  {
    id: 'brand',
    title: 'Brand  creative',
    lead: 'Look as good as you are.',
    body:
      "Your brand is what a patient sees before they've met you. We make sure it reflects the calibre of care you deliver  through identity, design, and content that builds trust before the first appointment.",
    links: [
      { label: 'Brand identity', href: '/services/brand/identity' },
      { label: 'Design', href: '/services/brand/design' },
      { label: 'Video + motion', href: '/services/brand/video' },
    ],
    ctaHref: '/services/brand',
    ctaLabel: 'Explore brand',
  },
];

export default function PracticeInfrastructureSection() {
  return (
    <section
      className="practice-infra"
      aria-labelledby="practice-infra-headline"
    >
      <div className="practice-infra__inner">
        <header className="practice-infra__intro">
          <p className="practice-infra__eyebrow">
            Everything your practice needs. One team. Full accountability.
          </p>
          <h2 id="practice-infra-headline" className="practice-infra__headline">
            Most practices are held back not by a lack of ambition  but by a lack of
            infrastructure.
          </h2>
          <p className="practice-infra__subcopy">
            You shouldn&apos;t need a separate vendor for your website, your ads, your brand,
            and your booking system. We build and run all of it  custom to your practice,
            built to work together, and accountable to one number: patients in the chair.
          </p>
        </header>

        <ul className="practice-infra__pillars">
          {PILLARS.map((pillar) => (
            <li key={pillar.id} className="practice-infra__pillar">
              <h3 className="practice-infra__pillar-title">{pillar.title}</h3>
              <p className="practice-infra__pillar-lead">{pillar.lead}</p>
              <p className="practice-infra__pillar-body">{pillar.body}</p>
              <p className="practice-infra__pillar-meta">
                {pillar.links.map((link, i) => (
                  <React.Fragment key={link.href}>
                    {i > 0 ? <span className="practice-infra__sep"> · </span> : null}
                    <Link to={link.href} className="practice-infra__tag-link">
                      {link.label}
                    </Link>
                  </React.Fragment>
                ))}
                <span className="practice-infra__sep"> · </span>
                <Link to={pillar.ctaHref} className="practice-infra__pillar-cta">
                  {pillar.ctaLabel}
                  <span aria-hidden="true"> →</span>
                </Link>
              </p>
            </li>
          ))}
        </ul>

        <p className="practice-infra__closing">
          No packages. No Bronze / Silver / Gold. Every engagement starts with a diagnostic of
          your practice. We build what you actually need  not what fits our menu.
        </p>
      </div>
    </section>
  );
}
