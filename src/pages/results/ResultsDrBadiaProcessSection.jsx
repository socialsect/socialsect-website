import { ArrowRight } from 'lucide-react'

const STEPS = [
  {
    id: '01',
    title: 'Tell us about your practice',
    body: `Fill in a short form  your name, specialty, practice size, and what you're trying to solve. Takes 2 minutes.`,
  },
  {
    id: '02',
    title: 'Introductory call with us',
    body:
      'A 30-minute call. No pitch. We learn about your practice. You learn about how we work. Both sides decide if it makes sense to go further.',
  },
  {
    id: '03',
    title: 'Reference call with Dr. Badia',
    body:
      'If both sides want to go further, we connect you directly. A peer-to-peer conversation  no scripts, no sales, just one practice owner talking to another.',
  },
  {
    id: '04',
    title: 'Custom proposal',
    body:
      'If you want to move forward, we send a proposal built specifically around your practice. Not a package. A plan.',
  },
]

export default function ResultsDrBadiaProcessSection() {
  return (
    <section className="results-process" aria-labelledby="results-process-heading">
      <div className="results-process__inner">
        <h2 id="results-process-heading" className="results-process__headline">
          Want to speak with Dr. Badia directly? Here&apos;s how it works.
        </h2>

        <ol className="results-process__steps">
          {STEPS.map((step, index) => (
            <li key={step.id} className="results-process__step">
              <div className="results-process__step-card">
                <span className="results-process__step-kicker">Step {step.id}</span>
                <h3 className="results-process__step-title">{step.title}</h3>
                <p className="results-process__step-body">{step.body}</p>
              </div>
              {index < STEPS.length - 1 && (
                <span className="results-process__arrow" aria-hidden>
                  →
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="results-process__actions">
          <a href="#qualifier" className="results-process__btn results-process__btn--primary">
            Talk to Dr. Badia
            <ArrowRight className="results-process__btn-icon" strokeWidth={2} aria-hidden />
          </a>
          <a href="#reference" className="results-process__btn results-process__btn--secondary">
            Request a reference
          </a>
        </div>
      </div>
    </section>
  )
}
