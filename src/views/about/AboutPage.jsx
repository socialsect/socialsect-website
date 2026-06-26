'use client'

import Link from 'next/link'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight } from 'lucide-react'
import AboutIdentitySection from '../../components/AboutIdentitySection'
import AboutPrinciplesSection from '../../components/AboutPrinciplesSection'
import AboutTeamSection from '../../components/AboutTeamSection'
import './AboutPage.css'

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Dark Hero Section */}
      <section className="about-hero" aria-labelledby="about-hero-heading">
        <div className="about-hero__bg" aria-hidden="true">
          <img
            src="/team/rayansh.png"
            alt=""
            className="about-hero__bg-image"
            fetchPriority="high"
            decoding="async"
          />
          <div className="about-hero__overlay" />
        </div>

        <div className="about-hero__content">
          <div className="about-hero__main">
            <div className="hero-copy">
              <p className="hero-eyebrow">
                <span className="hero-eyebrow__line" aria-hidden="true" />
                About Rayansh
              </p>

              <h1 id="about-hero-heading" className="hero-headline">
                <span className="hero-headline__line">There is no lie</span>
                <span className="hero-headline__line">when it comes to</span>
                <span className="hero-headline__line">starting a new</span>
                <span className="hero-headline__line hero-headline__line--gradient">
                  relationship.
                </span>
              </h1>

              <p className="hero-subheadline">
                My mum used to tell me that. So here is the raw version of who I am.
              </p>

              <div className="hero-intro-text">
                <p>
                  My name is Rayansh. I&apos;m the founder of Socialsect. I&apos;m also a writer, a traveler, and a boxer. Not necessarily in that order depending on the week.
                </p>
                <p>
                  I wrote a book called <em>A Suitcase of Memories</em>. It&apos;s about the things we carry with us, the places, the people, the moments that shape us. Writing it taught me that the most important thing you can do in any relationship is to show up honestly.
                </p>
              </div>

              <div className="hero-cta-buttons">
                <Link href={BOOK_A_CALL_FORM} className="hero-btn hero-btn--primary">
                  Start a conversation
                  <svg
                    className="hero-btn__arrow hero-btn__arrow--right"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <a href="#identity-section" className="hero-btn hero-btn--secondary">
                  Learn more about me
                  <svg
                    className="hero-btn__arrow hero-btn__arrow--down"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </a>
              </div>
            </div>

            <blockquote className="hero-testimonial">
              <span className="hero-testimonial__quote" aria-hidden="true">
                &ldquo;&rdquo;
              </span>
              <p className="hero-testimonial__text">
                Everything on this page was written by me personally. I wanted both of us to know each other before we take the next step.
              </p>
              <span className="hero-testimonial__divider" aria-hidden="true" />
              <footer className="hero-testimonial__attribution">
                <cite>Rayansh</cite>
                <span>Founder, Socialsect</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Sections */}
      <AboutIdentitySection />
      <AboutPrinciplesSection />
      <AboutTeamSection />

      {/* Closing CTA Section */}
      <section className="about-closing" aria-labelledby="about-closing-heading">
        <div className="about-closing__bg" aria-hidden="true">
          <div className="about-closing__overlay" />
        </div>
        <div className="about-closing__inner">
          <h2 id="about-closing-heading" className="about-closing__headline">
            Now you know me. I&apos;d like to know your practice.
          </h2>
          <p className="about-closing__body">
            Book a 45-minute conversation. No pitch. No packages. Just two people working out whether there&apos;s something worth building together.
          </p>
          <div className="about-closing__actions">
            <Link href={BOOK_A_CALL_FORM} className="about-closing__btn about-closing__btn--primary">
              Start the conversation
              <ArrowRight className="about-closing__btn-icon" strokeWidth={2} aria-hidden />
            </Link>
            <Link href="/results" className="about-closing__btn about-closing__btn--ghost">
              See our results first
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
