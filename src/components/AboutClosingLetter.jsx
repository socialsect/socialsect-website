'use client'

import './AboutClosingLetter.css'

export default function AboutClosingLetter() {
  return (
    <section className="about-closing-letter" aria-labelledby="about-closing-letter-heading">
      <div className="about-closing-letter__desk">
        <article className="about-closing-letter__paper">
          <div className="about-closing-letter__margin-line" aria-hidden="true" />
          <div className="about-closing-letter__lines" aria-hidden="true" />

          <div className="about-closing-letter__top-row">
            {/* <span className="about-closing-letter__date">July 10, 2026</span> */}
            <div className="about-closing-letter__doodle">
              <img
                src="/illustrations/morning-news.svg"
                alt=""
                width="140"
                height="140"
                decoding="async"
                draggable="false"
              />
            </div>
          </div>

          <h2 id="about-closing-letter-heading" className="about-closing-letter__title">
            If you&apos;ve read this far ,<br />
            thank you.
          </h2>

          <div className="about-closing-letter__body">
            <p>
              I wrote this page because I believe you deserve to know who you&apos;re considering working with before you book a call. Not a logo. Not a list of services. A person.
            </p>
            <p>
              I&apos;m someone who has spent years learning the world of private medical practice, not because it was the easiest market, but because I genuinely believe that the doctors operating in it deserve a growth partner who takes their work as seriously as they do.
            </p>
            <p>
              If something on this page resonated with you, whether it was the book, the conviction behind the work, or just the fact that someone took the time to write something real, I&apos;d love to talk.
            </p>
            <p>
              Not a sales call. Just a conversation. You tell me about your practice. I&apos;ll tell you honestly whether I think we can help. And we&apos;ll go from there.
            </p>
            <p>
              My mum was right, by the way. There really is no lie when it comes to starting a new relationship. So that&apos;s the version of Socialsect you just read. The real one.
            </p>
          </div>

          <div className="about-closing-letter__signature">
            <span className="about-closing-letter__warmly">Warmly,</span>
            <span className="about-closing-letter__name">Rayansh</span>
            <div className="about-closing-letter__role-block">
              <span>Founder</span>
              <span>Socialsect</span>
              {/* <span>New Delhi</span> */}
            </div>
          </div>

          <div className="about-closing-letter__ps">
            P.S. If the book resonates, mention it when we talk. I&apos;d love to hear which part.
          </div>

          <span className="about-closing-letter__smiley" aria-hidden="true">:)</span>
        </article>
      </div>
    </section>
  )
}
