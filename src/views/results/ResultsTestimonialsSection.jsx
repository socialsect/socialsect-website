'use client'

import { ArrowDown } from 'lucide-react'

const QUOTES = [
  {
    quote: `I've worked with three agencies before Socialsect. This is the first time I haven't had to chase someone for an update.`,
    name: 'Dr. Badia',
    line: 'Orthopaedic surgery · Miami',
  },
  {
    quote:
      'The diagnostic phase alone was worth more than six months with our previous agency. They understood our practice before they touched anything.',
    name: 'Dr. Mehra',
    line: 'Aesthetics · US',
  },
  {
    quote: `They don't send vanity reports. They send results. That's all I ever wanted from a marketing partner.`,
    name: 'Dr. Goldman',
    line: 'Medical practice · US',
  },
]

export default function ResultsTestimonialsSection() {
  return (
    <section className="results-testimonials" aria-labelledby="results-testimonials-heading">
      <div className="results-testimonials__inner">
        <div className="results-testimonials__jump" aria-hidden>
          {/* <span className="results-testimonials__jump-label">07 · Testimonials</span> */}
          {/* <ArrowDown className="results-testimonials__jump-icon" strokeWidth={2} /> */}
        </div>

        {/* <p className="results-testimonials__meta">
          Short quotes · different from case studies · emotional validation · 3 minimum
        </p> */}

        <h2 id="results-testimonials-heading" className="results-testimonials__headline">
          In their words.
        </h2>

        <p className="results-testimonials__lede">
          Testimonials are different from case studies. Case studies show numbers. Testimonials show
          feeling. Both are needed.
        </p>

        <ul className="results-testimonials__grid">
          {QUOTES.map((item) => (
            <li key={item.name} className="results-testimonials__card">
              <blockquote className="results-testimonials__quote">&ldquo;{item.quote}&rdquo;</blockquote>
              <p className="results-testimonials__name">{item.name}</p>
              <p className="results-testimonials__line">{item.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
