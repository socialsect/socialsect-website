import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'

const VIDEOS = [
  {
    id: 'badia',
    duration: '0:47',
    meta: 'Orthopaedics · Miami, FL',
    name: 'Dr. Badia',
    quote:
      'What we weren\u2019t getting was patients who showed up and moved forward with care.',
    submitted: false,
  },
  {
    id: 'coming-soon',
    comingSoon: true,
  },
]

export default function InsightsTestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="insights-block insights-block--testimonials"
      aria-labelledby="insights-testimonials-heading"
    >
      <div className="insights-block__inner">
        <header className="insights-block__head">
          <div className="insights-block__head-main">
            <p className="insights-block__label">Testimonials</p>
            <h2 id="insights-testimonials-heading" className="insights-block__title">
              What clients say in their own words
            </h2>
          </div>
          <Link to="/insights/testimonials" className="insights-block__head-cta">
            See all testimonials
            <ArrowRight className="insights-block__cta-icon" strokeWidth={1} aria-hidden />
          </Link>
        </header>

        <ul className="insights-videos insights-videos--two">
          {VIDEOS.map((video) => (
            <li key={video.id}>
              {video.comingSoon ? (
                <article className="insights-video-card insights-video-card--coming-soon">
                  <div className="insights-video-card__thumb insights-video-card__thumb--static" aria-hidden>
                    <span className="insights-video-card__thumb-placeholder" />
                  </div>
                  <div className="insights-video-card__body">
                    <p className="insights-video-card__meta">More coming soon</p>
                    <p className="insights-video-card__name">Video testimonials</p>
                    <p className="insights-video-card__badge">
                      As we publish more client stories, they&apos;ll appear here.
                    </p>
                  </div>
                </article>
              ) : (
                <article className="insights-video-card">
                  <button
                    type="button"
                    className="insights-video-card__thumb"
                    aria-label={`Play video testimonial from ${video.name}, ${video.duration}`}
                  >
                    <span className="insights-video-card__thumb-placeholder" aria-hidden />
                    <span className="insights-video-card__play" aria-hidden>
                      <Play className="insights-video-card__play-icon" strokeWidth={1} />
                    </span>
                    <span className="insights-video-card__duration">{video.duration}</span>
                  </button>
                  <div className="insights-video-card__body">
                    <p className="insights-video-card__meta">{video.meta}</p>
                    <p className="insights-video-card__name">{video.name}</p>
                    <blockquote className="insights-video-card__quote">
                      &ldquo;{video.quote}&rdquo;
                    </blockquote>
                  </div>
                </article>
              )}
            </li>
          ))}
        </ul>

        <div className="insights-block__footer">
          <Link to="/insights/testimonials" className="insights-block__footer-cta">
            Watch all testimonials
            <ArrowRight className="insights-block__cta-icon" strokeWidth={1} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
