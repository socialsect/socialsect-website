'use client'

import React from 'react';
import { BOOK_A_CALL_FORM } from '../constants/routes.js';
import { Link } from 'react-router-dom';
import './HomePhilosophyAuditSections.css';
import {
  ArrowRight,
  Target,
  BarChart2,
  Users,
  Shield,
  CalendarClock,
  Search,
  Package,
  Lightbulb,
  CalendarCheck,
} from 'lucide-react';

const FEATURES = [
  {
    icon: <Target size={17} strokeWidth={1.6} />,
    title: 'Built around you',
    body: 'Every strategy is custom. Because your practice is unique.',
  },
  {
    icon: <BarChart2 size={17} strokeWidth={1.6} />,
    title: 'Focused on what moves the needle',
    body: 'We track leading indicators that result in booked appointments.',
  },
  {
    icon: <Users size={17} strokeWidth={1.6} />,
    title: 'Accountable to outcomes, not activity',
    body: "We don't report for the sake of it. We show what actually moved your results.",
  },
  {
    icon: <Shield size={17} strokeWidth={1.6} />,
    title: 'Long-term partner, not a vendor',
    body: 'We plan, build, optimize, and grow with you.',
  },
];

const AUDIT_MINI_FEATURES = [
  {
    icon: <Search size={18} strokeWidth={1.6} />,
    title: 'No pitch.',
    body: 'Just clarity.',
  },
  {
    icon: <Package size={18} strokeWidth={1.6} />,
    title: 'No packages.',
    body: 'No upsells.',
  },
  {
    icon: <Target size={18} strokeWidth={1.6} />,
    title: '100% focused',
    body: 'on your practice.',
  },
  {
    icon: <Shield size={18} strokeWidth={1.6} />,
    title: 'Built for you.',
    body: 'Not a template.',
  },
];

const AUDIT_CHECKLIST = [
  {
    icon: <Users size={20} strokeWidth={1.6} />,
    title: 'Current Patient Acquisition Review',
    body: 'We analyze your entire funnel from awareness to booked appointment.',
  },
  {
    icon: <BarChart2 size={20} strokeWidth={1.6} />,
    title: 'Leak Identification',
    body: "We pinpoint exactly where you're losing patients (and revenue).",
  },
  {
    icon: <Lightbulb size={20} strokeWidth={1.6} />,
    title: 'Custom System Blueprint',
    body: "See the exact system we'd build for your practice, tailored to your specialty.",
  },
  {
    icon: <CalendarCheck size={20} strokeWidth={1.6} />,
    title: 'Actionable Next Steps',
    body: 'Walk away with clear recommendations you can implement right away.',
  },
];

export default function HomePhilosophyAuditSections() {
  return (
    <>
      {/* ── Philosophy ── */}
      <section className="home-philosophy" aria-labelledby="home-philosophy-heading">
        <div className="home-philosophy__bg" aria-hidden="true" />

        <div className="home-philosophy__inner">

          {/* Left: copy */}
          <div className="home-philosophy__left">
            <h2 id="home-philosophy-heading" className="home-philosophy__headline">
              We don&apos;t work with everyone.{' '}
              We work with practice owners who{' '}
              <em>take ownership</em> of their{' '}
              <em>results</em> as much as we do.
            </h2>

            <hr className="home-philosophy__divider" />

            <p className="home-philosophy__sub">
              You&apos;re done guessing why some months are full and others aren&apos;t.
              You want a partner who brings clarity, builds the system,
              and stays accountable for what matters.
            </p>

            <p className="home-philosophy__body">
              No packages. No templates. No guessing. Every engagement starts with a deep
              diagnostic of your practice. We measure ourselves on one thing:{' '}
              <strong>whether your appointment book is fuller than it was before us.</strong>
            </p>
          </div>       {/* Right: photo */}
          <div className="home-philosophy__image-wrap">
            <img src="/ray.webp" alt="Ray, practice growth strategist" width="400" height="533" decoding="async" loading="lazy" />
          </div>

   

          {/* Feature strip  spans full width */}
          <div className="home-philosophy__features" role="list">
            {FEATURES.map((f) => (
              <div className="home-philosophy__feature" role="listitem" key={f.title}>
                <div className="home-philosophy__feature-icon" aria-hidden="true">
                  {f.icon}
                </div>
                <div className="home-philosophy__feature-text">
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Audit CTA ── */}
      <section id="book-call" className="home-audit-cta" aria-labelledby="home-audit-cta-heading">
        <div className="home-audit-cta__container">
          <div className="home-audit-cta__dots" aria-hidden="true" />

          <div className="home-audit-cta__grid">

            {/* Left: copy */}
            <div className="home-audit-cta__content">
              <div className="home-audit-cta__badge">
                <CalendarClock size={15} strokeWidth={2} />
                <span>45-MINUTE PRACTICE AUDIT</span>
              </div>

              <h2 id="home-audit-cta-heading" className="home-audit-cta__headline">
                Your appointment book should be full.{' '}
                <span className="home-audit-cta__highlight">
                  <em>Every month</em>
<svg
  className="home-audit-cta__underline"
  width="160"
  height="16"
  viewBox="0 0 160 16"
  fill="none"
  aria-hidden="true"
>
  <path
    d="M2 10C30 3 60 3 80 9C100 15 130 6 158 4"
    stroke="#695af2"
    strokeWidth="3"
    strokeLinecap="round"
  />
</svg>
                </span>
                . Not just the good ones.
              </h2>

              <p className="home-audit-cta__lede">
                Start with a free 45-minute practice audit. We&apos;ll look at your current
                patient acquisition, identify exactly where it&apos;s leaking, and show you
                what a system built specifically for your practice would look like.
              </p>

              <div className="home-audit-cta__mini-features">
                {AUDIT_MINI_FEATURES.map((f) => (
                  <div className="home-audit-cta__mini-feature" key={f.title}>
                    <div className="home-audit-cta__mini-feature-icon" aria-hidden="true">
                      {f.icon}
                    </div>
                    <div className="home-audit-cta__mini-feature-text">
                      <strong>{f.title}</strong>
                      <span>{f.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: card */}
            <div className="home-audit-cta__card">
              <div className="home-audit-cta__checklist">
                {AUDIT_CHECKLIST.map((item, i) => (
                  <div
                    className="home-audit-cta__checklist-item"
                    key={item.title}
                    style={{ '--item-index': i }}
                  >
                    <div className="home-audit-cta__checklist-icon" aria-hidden="true">
                      {item.icon}
                    </div>
                    <div className="home-audit-cta__checklist-text">
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="home-audit-cta__actions">
                <Link
                  to={BOOK_A_CALL_FORM}
                  className="cta cta--primary cta--lg home-audit-cta__cta-primary"
                >
                  Get my free practice audit
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/results#results-case-badia"
                  className="cta cta--secondary cta--lg home-audit-cta__cta-secondary"
                >
                  Read a case study
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}