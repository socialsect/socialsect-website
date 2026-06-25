const STATS = [
  { value: '81%', label: 'Consultation show-up rate' },
  { value: '16%', label: 'Consultation-to-surgery conversion rate' },
  { value: '9%', label: 'Lead-to-booked-consultation rate' },
  { value: '$1M+', label: 'Full case value from one practice' },
]

function AggregateHeroIllustration() {
  return (
    <svg
      className="results-aggregate__hero-svg"
      viewBox="0 0 360 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M24 78h312"
        stroke="#1A1C1D"
        strokeWidth="1.25"
        opacity="0.18"
        strokeLinecap="round"
      />
      <path
        d="M24 78V28"
        stroke="#1A1C1D"
        strokeWidth="1.25"
        opacity="0.18"
        strokeLinecap="round"
      />
      <path
        d="M44 68 L92 62 140 52 188 44 236 30 284 24 332 14"
        fill="none"
        stroke="#695AF2"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M44 52h52M44 40h72"
        stroke="#1A1C1D"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.12"
      />
    </svg>
  )
}

export default function ResultsAggregateSection() {
  return (
    <section className="results-aggregate" aria-labelledby="results-aggregate-heading">
      <div className="results-aggregate__inner">
        <div className="results-aggregate__intro">
          <div className="results-aggregate__intro-copy">
            <h2 id="results-aggregate-heading" className="results-aggregate__headline">
              What good patient acquisition actually looks like.
            </h2>
          </div>
          <div className="results-aggregate__intro-art" aria-hidden>
            <AggregateHeroIllustration />
          </div>
        </div>

        <ul className="results-aggregate__grid">
          {STATS.map((item) => (
            <li key={item.label} className="results-aggregate__card">
              <p className="results-aggregate__value">{item.value}</p>
              <p className="results-aggregate__label">{item.label}</p>
            </li>
          ))}
        </ul>

        <p className="results-aggregate__note">
          These are the numbers from our flagship case study. Every figure is documented and
          verifiable.
        </p>
      </div>
    </section>
  )
}
