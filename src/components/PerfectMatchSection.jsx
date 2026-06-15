import React from 'react';
import { BOOK_A_CALL_FORM } from '../constants/routes.js'
import { Link } from 'react-router-dom';
import './PerfectMatchSection.css';

const POINTS = [
  {
    num: '01',
    title: 'The broken promises point',
    quote:
      "You're tired of paying for marketing that produces reports, not patients. You've been promised growth before. You're done with activity dressed up as results.",
  },
  {
    num: '02',
    title: 'The accountability point',
    quote:
      "You have more than one vendor touching your practice's growth and no single person accountable for the outcome. The ads agency blames the website. The website guy says the ads are the problem. You're stuck in the middle.",
  },
  {
    num: '03',
    title: 'The dead month point',
    quote:
      "You know your slow months are coming and you have no system to soften them. January comes. Summer hits. Post-holiday dips. You react every time, because there's no system running ahead of it.",
  },
  {
    num: '04',
    title: 'The results point',
    quote:
      "You want one partner who understands the difference between a lead and a patient in the chair and is willing to be held to that number.",
  },
];

export default function PerfectMatchSection() {
  return (
    <section className="perfect-match" aria-labelledby="perfect-match-headline">
      <div className="perfect-match__inner">
        <div className="perfect-match__intro">
          <p className="perfect-match__eyebrow">Not for everyone. Maybe for you.</p>
          <h2 id="perfect-match-headline" className="perfect-match__headline">
            We&apos;re a perfect match if...
          </h2>
          <p className="perfect-match__subtext">
            We work with specific types of practice owners
          </p>
          <p className="perfect-match__built-for">
            Built for you,
          </p>
          <p className="perfect-match__brand">SOCIALSECT</p>
          <p className="perfect-match__talk">
            If this sounds like you, we should talk
          </p>
        </div>

        <ol className="perfect-match__list">
          {POINTS.map((item) => (
            <li key={item.num} className="perfect-match__item">
              <div className="perfect-match__icon-wrapper">
                <svg
                  className="perfect-match__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="perfect-match__num" aria-hidden="true">
                  {item.num}
                </span>
              </div>
              <div className="perfect-match__body">
                <h3 className="perfect-match__title">{item.title}</h3>
                <blockquote className="perfect-match__quote">{item.quote}</blockquote>
              </div>
            </li>
          ))}
        </ol>

        <div className="perfect-match__cta-block">
          <div className="perfect-match__cta-content">
         
            <p className="perfect-match__closing">
              If you nodded at any of that, you&apos;re exactly who we built this for.
            </p>
          </div>
          <div className="perfect-match__cta-buttons cta-buttons">
            <Link to={BOOK_A_CALL_FORM} className="btn btn-primary">
              Audit my practice free
              <svg
                className="btn-arrow btn-arrow-right"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/results#results-case-badia" className="btn btn-secondary">
              Read a case study
              <svg
                className="btn-arrow btn-arrow-down"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
