'use client'

import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../constants/routes.js'
import './CurrentPracticeOwnersSection.css'

const PRACTICES = [
  {
    name: 'Dr. Badia',
    specialty: 'Orthopaedic surgery',
    location: 'Miami, Florida',
    image: '/images/dr-badia.webp',
    imageAlt: 'Dr. Badia in a white coat',
    featured: true,
  },
  {
    name: 'Dr. Peterson',
    specialty: 'Medical practice',
    location: 'Miami, Florida',
    image: '/images/dr-peterson.webp',
    imageAlt: 'Dr. Peterson in a white coat',
  },
  {
    name: 'Dr. Arva',
    specialty: 'Medical practice',
    location: 'Dubai, UAE',
    image: '/images/dr-arwa.webp',
    imageAlt: 'Dr. Arwa in medical scrubs',
  },
  {
    name: 'Dr. Manu Mehra',
    specialty: 'Dermatology and minor surgery',
    location: 'London, UK',
    image: '/images/dr-manu-mehra.jpg',
    imageAlt: 'Dr. Manu Mehra',
  },
  {
    name: 'Dr. Fatima Abdullah',
    specialty: 'Counselling',
    location: 'Dubai, UAE',
    image: '/images/dr-fatima-abdullah-new.webp',
    imageAlt: 'Dr. Fatima Abdullah in her clinic',
  },
  {
    name: 'Dr. Musa Nkoto',
    specialty: 'Aesthetic care',
    location: 'Dubai, UAE',
    image: '/images/dr-musa.webp',
    imageAlt: 'Dr. Musa Nkoto in a medical office',
  },
  {
    name: 'Dr. Julia Jackson',
    specialty: 'Maxillofacial surgery',
    location: 'Virginia, US',
    image: '/images/dr-julia-jackson.webp',
    imageAlt: 'Dr. Julia Jackson',
  },
]

export default function CurrentPracticeOwnersSection() {
  return (
    <section className="practice-owners" aria-labelledby="practice-owners-heading">
      <div className="practice-owners__inner">
        <div className="practice-owners__intro">
          <p className="practice-owners__eyebrow">The practices behind the work</p>
          <h2 id="practice-owners-heading" className="practice-owners__headline">
            Good marketing starts with knowing the person behind the practice.
          </h2>
          <p className="practice-owners__copy">
            We work closely with practice owners who care deeply about their patients,
            their reputation, and building something that lasts.
          </p>
          <Link to="/results" className="practice-owners__link">
            See the results we built together
            <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>

        <div className="practice-owners__grid">
          {PRACTICES.map((practice) => (
            <article
              className={`practice-owner ${practice.featured ? 'practice-owner--featured' : ''}`}
              key={practice.name}
            >
              <div className="practice-owner__image-wrap">
                <img
                  className="practice-owner__image"
                  src={practice.image}
                  alt={practice.imageAlt}
                  loading="lazy"
                />

                {practice.location && (
                  <span className="practice-owner__location">
                    {practice.location}
                  </span>
                )}
              </div>
              <div className="practice-owner__details">
                <h3>{practice.name}</h3>
                <p>{practice.specialty}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="practice-owners__footer">
          <p>Different specialties. Different markets. One standard: growth that makes sense for your practice.</p>
          <Link to={BOOK_A_CALL_FORM} className="practice-owners__cta">
            Talk about your practice
            <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
