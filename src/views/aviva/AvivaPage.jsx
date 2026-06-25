import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import './AvivaPage.css'

export default function AvivaPage() {
  return (
    <main className="aviva-page">
      <section className="aviva-hero" aria-labelledby="aviva-hero-heading">
        <div className="container aviva-hero__inner">
          <div className="aviva-hero__content">
            <div className="aviva-hero__eyebrow">
              <span className="aviva-hero__dot"></span>
              Continuation of the letter mailed to Aviva Medical Spa
            </div>
            <h1 id="aviva-hero-heading" className="aviva-hero__title">
              Ava, I spent some time looking through Aviva.
            </h1>
            <p className="aviva-hero__lede">
              This page was made as a private continuation of the letter I mailed to your
              office. No generic audit. No automated funnel. Just a few observations I felt
              were worth presenting properly.
            </p>
            <div className="aviva-hero__actions">
              <a href="#video" className="cta cta--primary">
                Watch the 3-minute observation
              </a>
              <a href="#case-study" className="cta cta--secondary">
                See the relevant case study
              </a>
            </div>
          </div>
          <aside className="aviva-hero__card">
            <div className="aviva-letter-preview">
              <div className="aviva-letter-preview__label">What arrived by mail</div>
              <p>Ava,</p>
              <p>Most aesthetics practices focus on generating more inquiries.</p>
              <p>Fewer know exactly how many booked consultations never become revenue.</p>
              <p>
                Rather than sending another marketing email, I wanted to share the
                observation directly.
              </p>
              <p className="aviva-letter-preview__signature">
                — Rayansh Singh
                <br />
                Founder, Socialsect
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="video" className="aviva-section" aria-labelledby="aviva-video-heading">
        <div className="container">
          <div className="aviva-section__header">
            <div className="aviva-section__kicker">Personal Observation</div>
            <h2 id="aviva-video-heading" className="aviva-section__title">
              A 3-minute video recorded specifically for Aviva.
            </h2>
            <p className="aviva-section__copy">
              The point of this page is simple: show the thinking before asking for a
              conversation.
            </p>
          </div>
          <div className="aviva-video-wrap">
            <div className="aviva-video-placeholder">
              <div className="aviva-video-placeholder__play">▶</div>
              <h3>Loom Video Placeholder</h3>
              <p>Embed Rayansh's personalized Loom for Ava here.</p>
              <div className="aviva-video-placeholder__note">
                Recommended length: 2–4 minutes. No pitch. Just the observation.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aviva-section aviva-section--surface" aria-labelledby="aviva-insight-heading">
        <div className="container aviva-split">
          <div className="aviva-split__content">
            <div className="aviva-section__kicker">Why Aviva stood out</div>
            <h2 id="aviva-insight-heading" className="aviva-section__title">
              Most med spas sell treatments. Aviva appears to sell confidence.
            </h2>
            <p className="aviva-section__copy">
              That distinction matters. The businesses that win in aesthetics usually
              understand that the procedure is only one part of the decision. The real
              decision is emotional, psychological, and deeply personal.
            </p>
          </div>
          <div className="aviva-quote-card">
            <p className="aviva-quote-card__quote">
              "The opportunity I noticed is not simply more leads. It is what happens after
              interest is created."
            </p>
            <span className="aviva-quote-card__attribution">
              — Rayansh Singh, Founder, Socialsect
            </span>
          </div>
        </div>
      </section>

      <section id="case-study" className="aviva-section" aria-labelledby="aviva-case-study-heading">
        <div className="container">
          <div className="aviva-section__header">
            <div className="aviva-section__kicker">
              Proof from a related patient-acquisition system
            </div>
            <h2 id="aviva-case-study-heading" className="aviva-section__title">
              NY Metro Vein: when the system after the lead matters.
            </h2>
            <p className="aviva-section__copy">
              This is not a med spa case study, but the underlying problem is similar:
              turning patient interest into booked consultations, and booked consultations
              into real revenue.
            </p>
          </div>

          <div className="aviva-metrics">
            <div className="aviva-metric">
              <div className="aviva-metric__number">2,971</div>
              <div className="aviva-metric__label">Leads generated</div>
            </div>
            <div className="aviva-metric">
              <div className="aviva-metric__number">700+</div>
              <div className="aviva-metric__label">Booked consultations</div>
            </div>
            <div className="aviva-metric">
              <div className="aviva-metric__number">$5.27</div>
              <div className="aviva-metric__label">Average CPL</div>
            </div>
            <div className="aviva-metric">
              <div className="aviva-metric__number">$100k+</div>
              <div className="aviva-metric__label">Attributed revenue</div>
            </div>
          </div>

          <div className="aviva-case-study-card">
            <div className="aviva-case-study-card__top">
              <div>
                <h3 className="aviva-case-study-card__title">
                  The real work was not just generating leads.
                </h3>
                <p className="aviva-section__copy">
                  The larger opportunity was building a patient-acquisition flow where
                  interest could be tracked, routed, followed up with, and converted with
                  more discipline.
                </p>
              </div>
              <span className="aviva-badge">Healthcare Growth System</span>
            </div>

            <div className="aviva-progress-grid">
              <div className="aviva-flow-card">
                <div className="aviva-flow-card__num">1</div>
                <h3 className="aviva-flow-card__title">Lead creation</h3>
                <p className="aviva-flow-card__body">
                  Attract the right patient intent without flooding the practice with
                  unqualified inquiries.
                </p>
              </div>
              <div className="aviva-flow-card">
                <div className="aviva-flow-card__num">2</div>
                <h3 className="aviva-flow-card__title">Booking discipline</h3>
                <p className="aviva-flow-card__body">
                  Move patients from inquiry to booked consultation with speed, clarity,
                  and follow-up structure.
                </p>
              </div>
              <div className="aviva-flow-card">
                <div className="aviva-flow-card__num">3</div>
                <h3 className="aviva-flow-card__title">Revenue visibility</h3>
                <p className="aviva-flow-card__body">
                  Understand where booked consultations stall before they become completed
                  treatments or procedures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aviva-section aviva-section--surface" aria-labelledby="aviva-observation-heading">
        <div className="container">
          <div className="aviva-section__header">
            <div className="aviva-section__kicker">The observation</div>
            <h2 id="aviva-observation-heading" className="aviva-section__title">
              Most practices track inquiries. Fewer track where revenue quietly disappears.
            </h2>
            <p className="aviva-section__copy">
              For Aviva, the opportunity may not be "more marketing." It may be seeing the
              full patient journey with more precision.
            </p>
          </div>

          <div className="aviva-progress-grid">
            <div className="aviva-flow-card">
              <div className="aviva-flow-card__num">1</div>
              <h3 className="aviva-flow-card__title">Inquiry → Consultation</h3>
              <p className="aviva-flow-card__body">
                How many interested patients actually become booked consultations?
              </p>
            </div>
            <div className="aviva-flow-card">
              <div className="aviva-flow-card__num">2</div>
              <h3 className="aviva-flow-card__title">Consultation → Show Rate</h3>
              <p className="aviva-flow-card__body">
                How many booked consultations actually show up ready to move forward?
              </p>
            </div>
            <div className="aviva-flow-card">
              <div className="aviva-flow-card__num">3</div>
              <h3 className="aviva-flow-card__title">Show Rate → Treatment</h3>
              <p className="aviva-flow-card__body">
                How many consultations convert into treatment plans, packages, or recurring
                revenue?
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="aviva-section aviva-section--compact aviva-section--no-border" aria-labelledby="aviva-important-heading">
        <div className="container">
          <div className="aviva-wrong-box">
            <div className="aviva-section__kicker aviva-section__kicker--inverse">
              Important
            </div>
            <h2 id="aviva-important-heading" className="aviva-wrong-box__title">
              I might be completely wrong.
            </h2>
            <p className="aviva-wrong-box__body">
              Everything here is based on public information and a surface-level review. You
              may already have the entire journey fully optimized. If that is true, you can
              safely ignore this page.
            </p>
            <p className="aviva-wrong-box__body">
              But if even one part of this feels accurate, I would be happy to compare notes.
            </p>
          </div>
        </div>
      </section>

      <section className="aviva-section aviva-section--compact" aria-labelledby="aviva-cta-heading">
        <div className="container">
          <div className="aviva-cta-box">
            <div className="aviva-cta-box__content">
              <h2 id="aviva-cta-heading" className="aviva-cta-box__title">
                If any of this resonated, we should talk.
              </h2>
              <p className="aviva-cta-box__body">
                No pitch deck needed. I would rather spend 20 minutes comparing what I saw
                with what is actually happening inside Aviva.
              </p>
            </div>
            <div className="aviva-cta-box__actions">
              <Link to={BOOK_A_CALL_FORM} className="cta cta--inverse">
                Schedule a conversation
              </Link>
              <a href="mailto:rayansh@gosocialsect.com?subject=Aviva%20Observation" className="cta cta--ghost">
                Email Rayansh directly
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="aviva-footer">
        <div className="container aviva-footer__inner">
      
          <div className="aviva-footer__meta">
            Prepared privately for Ava Franzoni · Aviva Medical Spa · socialsect.com
          </div>
        </div>
      </footer>
    </main>
  )
}
