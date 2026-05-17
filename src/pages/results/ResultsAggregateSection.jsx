/** Aggregate stats  external SVGs (SVG Repo) + inline calendar icon for consultations. */

function IconConsultations() {
  return (
    <svg className="results-aggregate__icon-svg" viewBox="0 0 56 56" aria-hidden>
      <rect
        x="12"
        y="14"
        width="32"
        height="34"
        rx="3"
        fill="none"
        stroke="#1A1C1D"
        strokeWidth="1.75"
        opacity="0.85"
      />
      <path d="M12 22h32" stroke="#1A1C1D" strokeWidth="1.75" opacity="0.5" />
      <path d="M20 14v-4" stroke="#695AF2" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 14v-4" stroke="#695AF2" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M22 34l4 4 10-10"
        fill="none"
        stroke="#695AF2"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


const STATS = [
  { value: '2,508+', label: 'Leads generated'},
  { value: '225+', label: 'Consultations booked'},
  { value: '36+', label: 'Surgical conversions'},
  {
    value: '$1M+',
    label: 'Revenue generated',
  },
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
              Across all our healthcare clients combined.
            </h2>
          </div>
          <div className="results-aggregate__intro-art" aria-hidden>
            <AggregateHeroIllustration />
          </div>
        </div>

        <ul className="results-aggregate__grid">
          {STATS.map((item) => (
            <li key={item.label} className="results-aggregate__card">
              <div
                className={['results-aggregate__card-vis', item.visModifier].filter(Boolean).join(' ')}
              >
                {item.kind === 'calendar' ? (
                  <IconConsultations />
                ) : (
                  <div className="results-aggregate__icon-img">
                    {/* <IconConsultations /> */}
                  </div>
                )}
              </div>
              <p className="results-aggregate__value">{item.value}</p>
              <p className="results-aggregate__label">{item.label}</p>
            </li>
          ))}
        </ul>

        <p className="results-aggregate__note">
          Numbers grow as we take on new clients. All figures are documented and verifiable.
        </p>
      </div>
    </section>
  )
}