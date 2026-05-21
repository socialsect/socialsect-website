import { useMemo, useState } from 'react'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ChevronRight, Plus, Play } from 'lucide-react'
import DarkVeil from '../../components/dark-veil/DarkVeil.jsx'
import InlineVideoPlayer from './InlineVideoPlayer'
import {
  SPECIALTY_FILTERS,
  HERO_STATS,
  FEATURED_VIDEO,
  CURATED_VIDEOS,
  COMMUNITY_VIDEOS,
  SUBMIT_STEPS,
  SUBMIT_TIPS,
} from './testimonialsData'
import './TestimonialsPage.css'

function matchesFilter(specialty, filterId) {
  return filterId === 'all' || specialty === filterId
}

export default function TestimonialsPage() {
  const [filter, setFilter] = useState('all')

  const showFeatured = matchesFilter(FEATURED_VIDEO.specialty, filter)
  const curated = useMemo(
    () => CURATED_VIDEOS.filter((v) => matchesFilter(v.specialty, filter)),
    [filter],
  )
  const community = useMemo(
    () => COMMUNITY_VIDEOS.filter((v) => matchesFilter(v.specialty, filter)),
    [filter],
  )

  return (
    <main className="testimonials-page">
      <div className="testimonials-breadcrumb">
        <div className="testimonials-breadcrumb__inner">
          <nav aria-label="Breadcrumb">
            <ol className="testimonials-breadcrumb__list">
              <li>
                <Link to="/">gosocialsect.com</Link>
              </li>
              <li aria-hidden>
                <ChevronRight strokeWidth={1} className="testimonials-breadcrumb__sep" />
              </li>
              <li>
                <Link to="/insights">insights</Link>
              </li>
              <li aria-hidden>
                <ChevronRight strokeWidth={1} className="testimonials-breadcrumb__sep" />
              </li>
              <li>
                <span aria-current="page">testimonials</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="testimonials-hero" aria-labelledby="testimonials-hero-heading">
        <div className="testimonials-hero__bg-animation" aria-hidden>
          <DarkVeil speed={0.5} />
        </div>

        <div className="testimonials-hero__inner">
          <p className="testimonials-hero__eyebrow">Unscripted · Unedited · Real practice owners</p>
          <h1 id="testimonials-hero-heading" className="testimonials-hero__title">
            &ldquo;We didn&apos;t ask them what to say. We asked them what actually changed.&rdquo;
          </h1>
          <p className="testimonials-hero__sub">
            These are the doctors and practice owners who have worked with Socialsect. We sent them a
            link. They recorded what they wanted to say. Under 60 seconds. No script. No editing.
            What you see is what they chose to share.
          </p>
          <ul className="testimonials-hero__stats" aria-label="Testimonial highlights">
            {HERO_STATS.map(({ value, label }) => (
              <li key={label} className="testimonials-hero__stat">
                <span className="testimonials-hero__stat-value">{value}</span>
                <span className="testimonials-hero__stat-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="testimonials-filters" aria-label="Filter by specialty">
        <div className="testimonials-filters__inner">
          <p className="testimonials-filters__label">Filter by specialty</p>
          <ul className="testimonials-filters__list" role="list">
            {SPECIALTY_FILTERS.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`testimonials-filters__pill${filter === id ? ' testimonials-filters__pill--active' : ''}`}
                  aria-pressed={filter === id}
                  onClick={() => setFilter(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {showFeatured && (
        <section className="testimonials-featured" aria-labelledby="testimonials-featured-heading">
          <div className="testimonials-featured__inner">
            <h2 id="testimonials-featured-heading" className="visually-hidden">
              Featured testimonial  {FEATURED_VIDEO.name}
            </h2>
            <article className="testimonials-featured__card">
              <InlineVideoPlayer
                id="featured-video-play"
                variant="featured"
                duration={FEATURED_VIDEO.duration}
                videoSrc={FEATURED_VIDEO.videoSrc}
                playLabel={`Play featured video from ${FEATURED_VIDEO.name}`}
                className="testimonials-featured__player"
              />
              <div className="testimonials-featured__info">
                <p className="testimonials-featured__specialty">{FEATURED_VIDEO.specialtyLabel}</p>
                <h3 className="testimonials-featured__name">{FEATURED_VIDEO.name}</h3>
                <p className="testimonials-featured__practice">{FEATURED_VIDEO.practice}</p>
                <blockquote className="testimonials-featured__quote">
                  &ldquo;{FEATURED_VIDEO.quote}&rdquo;
                </blockquote>
                <div className="testimonials-featured__actions">
                  <button
                    type="button"
                    className="testimonials-featured__btn testimonials-featured__btn--primary"
                    onClick={() =>
                      document.getElementById('featured-video-play')?.click()
                    }
                  >
                    <Play strokeWidth={1} aria-hidden />
                    Play video
                  </button>
                  <Link
                    to={FEATURED_VIDEO.referenceHref}
                    className="testimonials-featured__btn testimonials-featured__btn--ghost"
                  >
                    {FEATURED_VIDEO.referenceLabel}
                    <ArrowRight strokeWidth={1} aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="testimonials-curated" aria-labelledby="testimonials-curated-heading">
        <div className="testimonials-curated__inner">
          <header className="testimonials-section-head">
            <p className="testimonials-section-head__label">From our clients</p>
            <h2 id="testimonials-curated-heading" className="testimonials-section-head__title">
              Curated testimonials
            </h2>
            <p className="testimonials-section-head__note">
              Recorded with Socialsect clients. Polished but honest.
            </p>
          </header>

          <ul className="testimonials-curated__grid">
            {curated.map((video) => (
              <li key={video.id}>
                <article className="testimonials-curated-card">
                  <InlineVideoPlayer
                    duration={video.duration}
                    videoSrc={video.videoSrc}
                    playLabel={`Play video from ${video.name}`}
                  />
                  <div className="testimonials-curated-card__body">
                    <p className="testimonials-curated-card__specialty">{video.specialtyLabel}</p>
                    <h3 className="testimonials-curated-card__name">{video.name}</h3>
                    <p className="testimonials-curated-card__practice">{video.practice}</p>
                    <blockquote className="testimonials-curated-card__quote">
                      &ldquo;{video.quote}&rdquo;
                    </blockquote>
                  </div>
                </article>
              </li>
            ))}
            <li>
              <article className="testimonials-curated-card testimonials-curated-card--placeholder">
                <div className="testimonials-curated-card__placeholder-thumb">
                  <Plus strokeWidth={1} aria-hidden />
                  <span>More videos coming</span>
                </div>
                <div className="testimonials-curated-card__body">
                  <p className="testimonials-curated-card__specialty">Placeholder · future client</p>
                  <p className="testimonials-curated-card__placeholder-copy">
                    As Socialsect works with more practices, this grid fills with their video
                    testimonials.
                  </p>
                </div>
              </article>
            </li>
          </ul>

          {filter !== 'all' && curated.length === 0 && !showFeatured && (
            <p className="testimonials-empty">No curated testimonials for this specialty yet.</p>
          )}
        </div>
      </section>

      <section className="testimonials-community" aria-labelledby="testimonials-community-heading">
        <div className="testimonials-community__inner">
          <header className="testimonials-community__intro">
            <h2 id="testimonials-community-heading" className="testimonials-community__headline">
              &ldquo;From the people who didn&apos;t have to say anything  but chose to.&rdquo;
            </h2>
            <p className="testimonials-community__sub">
              These videos weren&apos;t requested as part of any project. We sent a link. Practice
              owners recorded what they wanted to say. Some took 30 seconds. Some took the full
              minute. None of them were coached.
            </p>
          </header>

          <ul className="testimonials-community__grid">
            {community.map((video) => (
              <li key={video.id}>
                <article className="testimonials-community-card">
                  <InlineVideoPlayer
                    variant="community"
                    duration={video.duration}
                    videoSrc={video.videoSrc}
                    playLabel={`Play community video from ${video.name}`}
                  />
                  <div className="testimonials-community-card__body">
                    <p className="testimonials-community-card__name">{video.name}</p>
                    <p className="testimonials-community-card__role">{video.role}</p>
                    <p className="testimonials-community-card__date">{video.date}</p>
                  </div>
                </article>
              </li>
            ))}
            <li>
              <article className="testimonials-community-card testimonials-community-card--placeholder">
                <div className="testimonials-community-card__placeholder-thumb">
                  <Plus strokeWidth={1} aria-hidden />
                  <span>Your video here</span>
                </div>
                <p className="testimonials-community-card__placeholder-copy">
                  Worked with Socialsect? Submit your video review using the link below.
                </p>
              </article>
            </li>
            <li>
              <article className="testimonials-community-card testimonials-community-card--placeholder">
                <div className="testimonials-community-card__placeholder-thumb">
                  <Plus strokeWidth={1} aria-hidden />
                  <span>Your video here</span>
                </div>
                <p className="testimonials-community-card__placeholder-copy">
                  Under 60 seconds. No script needed. Just what you&apos;d tell a colleague.
                </p>
              </article>
            </li>
          </ul>
        </div>
      </section>

      <section className="testimonials-submit" aria-labelledby="testimonials-submit-heading">
        <div className="testimonials-submit__inner">
          <div className="testimonials-submit__grid">
            <div className="testimonials-submit__panel">
              <p className="testimonials-submit__kicker">For Socialsect clients</p>
              <h2 id="testimonials-submit-heading" className="testimonials-submit__title">
                &ldquo;Worked with us? Tell other practice owners what it was actually like.&rdquo;
              </h2>
              <p className="testimonials-submit__lede">
                No script. No editing. Just record what you&apos;d say to a colleague who asked you
                about working with Socialsect. Under 60 seconds.
              </p>
              <ol className="testimonials-submit__steps">
                {SUBMIT_STEPS.map(({ step, title, body }) => (
                  <li key={step} className="testimonials-submit__step">
                    <span className="testimonials-submit__step-num" aria-hidden>
                      {step}
                    </span>
                    <div>
                      <h3 className="testimonials-submit__step-title">{title}</h3>
                      <p className="testimonials-submit__step-body">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="testimonials-submit__note">
                Already worked with us and want to submit? Email us and we&apos;ll send you the
                submission link directly.
              </p>
            </div>

            <div className="testimonials-submit__aside">
              <div className="testimonials-submit__tips">
                <h3 className="testimonials-submit__tips-title">What makes a good 60-second video</h3>
                <ul className="testimonials-submit__tips-list">
                  {SUBMIT_TIPS.map((tip) => (
                    <li key={tip}>
                      <Check strokeWidth={1} aria-hidden />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
                <p className="testimonials-submit__tips-note">
                  Three prompts. Pick one or cover all three. The best videos are the ones where you
                  forget the camera is on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-bridge" aria-labelledby="testimonials-bridge-heading">
        <div className="testimonials-bridge__inner">
          <h2 id="testimonials-bridge-heading" className="testimonials-bridge__headline">
            Words tell you what it felt like. Numbers tell you what actually changed. See both.
          </h2>
          <div className="testimonials-bridge__actions">
            <Link to="/results" className="testimonials-bridge__btn testimonials-bridge__btn--primary">
              See documented case studies
              <ArrowRight strokeWidth={1} aria-hidden />
            </Link>
            <Link to={BOOK_A_CALL_FORM} className="testimonials-bridge__btn testimonials-bridge__btn--ghost">
              Request a reference
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonials-closing" aria-labelledby="testimonials-closing-heading">
        <div className="testimonials-closing__inner">
          <h2 id="testimonials-closing-heading" className="testimonials-closing__headline">
            &ldquo;The most convincing thing we can tell you is that we&apos;d rather let them tell
            you.&rdquo;
          </h2>
          <p className="testimonials-closing__body">
            Start with a free 45-minute practice audit. No pitch. No packages. If we&apos;re not the
            right fit, we&apos;ll tell you. And we&apos;ll point you to someone who is.
          </p>
          <div className="testimonials-closing__actions">
            <Link to={BOOK_A_CALL_FORM} className="testimonials-closing__btn testimonials-closing__btn--primary">
              See what your practice is missing
              <ArrowRight strokeWidth={1} aria-hidden />
            </Link>
            <Link to={BOOK_A_CALL_FORM} className="testimonials-closing__btn testimonials-closing__btn--ghost">
              Request a reference call
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
