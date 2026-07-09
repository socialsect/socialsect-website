'use client'

import './AboutSuitcaseSection.css'

export default function AboutSuitcaseSection() {
  return (
    <section className="about-suitcase" aria-labelledby="about-suitcase-heading">
      <div className="about-suitcase__inner">
        <span className="about-suitcase__label">From A Suitcase of Memories</span>

        <blockquote className="about-suitcase__quote">
          <p id="about-suitcase-heading">
            &ldquo;We spend our lives collecting things worth carrying , experiences, people, places, lessons. The ones that last aren&rsquo;t the ones we planned. They&rsquo;re the ones that found us.&rdquo;
          </p>
        </blockquote>

        <div className="about-suitcase__body">
          <p>
            That&rsquo;s how I think about every practice I work with. I&rsquo;m not here to apply a formula. I&rsquo;m here to understand what&rsquo;s worth carrying forward  what&rsquo;s working, what&rsquo;s been lost, and what needs to be built.
          </p>
          <p>
            Every engagement is a new suitcase. Every practice has a story worth telling properly.
          </p>
        </div>
      </div>
    </section>
  )
}
