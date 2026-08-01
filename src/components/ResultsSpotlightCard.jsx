'use client'

import React from 'react';
import { BOOK_A_CALL_FORM } from '../constants/routes.js';
import { Link } from 'react-router-dom';

export default function ResultsSpotlightCard({
  name,
  specialty,
  location,
  description,
  stats,
  whatWeDid,
  image,
  imageAlt,
  quote,
  reverse,
}) {
  return (
    <div className={`results-spotlight__layout${reverse ? ' results-spotlight__layout--reverse' : ''}`}>
      <div className="results-spotlight__panel">
        <div className="results-spotlight__panel-text">
          <p className="results-spotlight__panel-label">Featured Practice</p>
          <h3 className="results-spotlight__name">{name}</h3>
          <p className="results-spotlight__practice">
            {specialty}
            <br />
            {location}
          </p>
          {quote ? (
            <blockquote className="results-spotlight__quote">
              &ldquo;{quote}&rdquo;
            </blockquote>
          ) : (
            <p className="results-spotlight__description">{description}</p>
          )}
          <div className="results-spotlight__panel-cta-row">
            <Link to={BOOK_A_CALL_FORM} className="cta cta--inverse">
              Get similar results <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        {image && (
          <div className="results-spotlight__panel-photo">
            <img
              draggable="false"
              src={image}
              alt={imageAlt || name}
              className="results-spotlight__photo-img"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="results-spotlight__proof">
        <ul className="results-spotlight__stats">
          {stats.map((row) => (
            <li key={row.label} className="results-spotlight__stat">
              <div className="results-spotlight__stat-body">
                <span className="results-spotlight__stat-value">{row.value}</span>
                <span className="results-spotlight__stat-label">{row.label}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="results-spotlight__did">
          <h4 className="results-spotlight__did-title">What we did</h4>
          <p className="results-spotlight__did-copy">{whatWeDid}</p>
          <p className="results-spotlight__did-copy results-spotlight__did-copy--note">
            Every number above is documented, not estimated.
          </p>
        </div>
      </div>
    </div>
  );
}
