'use client'

import Link from 'next/link'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight } from 'lucide-react'
import AboutIdentitySection from '../../components/AboutIdentitySection'
import AboutSuitcaseSection from '../../components/AboutSuitcaseSection'
import AboutPrinciplesSection from '../../components/AboutPrinciplesSection'
import AboutTeamSection from '../../components/AboutTeamSection'
import AboutClosingLetter from '../../components/AboutClosingLetter'
import './AboutPage.css'

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Dark Hero Section */}
      <section className="about-hero" aria-labelledby="about-hero-heading">

        {/* Left  dark background + text */}
        <div className="about-hero__left">
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
                I wrote a book called <em>A Suitcase of Memories</em>. It&apos;s about the things we carry with us , the places, the people, the moments that shape us without us realising. Writing it taught me something I&apos;ve tried to bring into everything I do since: that the most important thing you can do in any relationship , personal or professional , is show up honestly.
              </p>
              <p>
                This page is me doing exactly that. Before we talk business, before we discuss your practice, before any of that , I wanted you to know who you&apos;d be working with. Because I believe you can only build something real with someone you actually know.
              </p>
            </div>

            <div className="hero-signature">
              <span className="hero-signature__dash">,</span> Rayansh
              {/* <span className="hero-signature__role">Founder, Socialsect · Author </span> */}
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
        </div>

        {/* Right  photo, fully visible */}
        <div className="about-hero__right" aria-hidden="true">
          <img
            src="/team/rayansh.webp"
            alt="Rayansh, Founder of Socialsect"
            className="about-hero__photo"
            fetchPriority="high"
            decoding="async"
            draggable="false"
          />
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

      </section>

      {/* Sections */}
      <AboutIdentitySection />
      <AboutSuitcaseSection />
      <AboutPrinciplesSection />
      <AboutTeamSection />
      <AboutClosingLetter />

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
