'use client'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import LazyDarkVeil from '../../components/dark-veil/LazyDarkVeil.jsx'
import { submitForm } from '../../lib/submitForm'
import './BookACallPage.css'

const EXPECT_STEPS = [
  {
    num: '01',
    title: 'We review your submission',
    timing: 'Within 24 hours',
    body:
      'Every form is read personally by Rayansh or a senior team member. Not an automated system. Not a junior doing screening. We take 24 hours to understand your practice before we reply.',
  },
  {
    num: '02',
    title: 'Introductory call, no pitch',
    timing: 'Within 3–5 days of submission',
    body:
      "A 30–45 minute conversation. You tell us about your practice. We tell you how we work. We both decide if it makes sense to go further. If it doesn't, we'll say so, and if we know someone better suited, we'll point you there.",
  },
  {
    num: '03',
    title: "Practice diagnostic, if we're a fit",
    timing: 'After mutual agreement',
    body:
      'If both sides want to move forward, we begin a two-week diagnostic of your practice. This is where we learn everything we need to build something that actually works for your specific situation.',
  },
  {
    num: '04',
    title: 'Custom proposal',
    timing: 'After diagnostic completion',
    body:
      'Not a package. A plan built specifically around your practice, your goals, and what the diagnostic revealed. You review it. You approve it. Nothing moves without your sign-off.',
  },
]

const PROMISES = [
  "No sales pitch on the intro call. We agreed to a conversation, not a presentation. We'll keep it that way.",
  "Honest feedback, even if it's not what you want to hear. If we don't think we're the right fit, we'll tell you and we'll tell you why.",
  "Your information stays with us. We don't share practice details. We don't add you to a mailing list. We don't follow up fifty times if you go quiet.",
  "One follow-up maximum. If we don't hear back after the intro call, we'll follow up once. After that, the door stays open but we won't chase.",
]

const SPECIALTIES = [
  'Orthopedic surgery',
  'Plastic / cosmetic surgery',
  'Dermatology',
  'Dentistry / implant practice',
  'Ophthalmology',
  'MedSpa / aesthetics',
  'Private GP / family practice',
  'Other',
]

const LOCATIONS = ['Single practice', '2–3 locations', '4+ locations']

const MARKETING_OPTIONS = [
  'We have no marketing in place',
  'Word of mouth and referrals only',
  'We have a website but it does not generate leads',
  'We run Google/Meta ads but results are inconsistent',
  'We have an agency but it is underperforming',
  'We have multiple vendors and nothing is connected',
]

const CONVERSATION_GOALS = [
  'Understand what a patient acquisition system looks like for us',
  'Get an honest review of our current marketing spend',
  'See if Socialsect is the right fit for our practice',
  'Explore what you would do differently from our current agency',
  'Just exploring — no commitment',
]

const REFERRAL_SOURCES = [
  'Google search',
  'LinkedIn',
  'Referred by a current client',
  'Instagram / social media',
  'Podcast / content',
  'Other',
]

const INITIAL_FORM = {
  name: '',
  email: '',
  practiceName: '',
  specialty: '',
  specialtyOther: '',
  location: '',
  locations: '',
  marketing: '',
  challenge: '',
  goals: [],
  referral: '',
}

const FORM_STEPS = [
  { title: 'About you', description: 'Who are we speaking with? Name and email so we can reply.' },
  { title: 'Your practice', description: 'What kind of practice do you run and what do you specialize in?' },
  { title: 'Your locations', description: 'Where are your patients coming from and how many locations do you operate?' },
  { title: 'Current situation', description: 'What are you doing now for patient acquisition and where is it falling short?' },
  { title: 'Next step', description: 'What would make this conversation most useful for you?' },
]

export default function BookACallPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const formRef = useRef(null)
  const isLastStep = currentStep === FORM_STEPS.length - 1

  const getOptionClassName = (isChecked, extraClassName = '') =>
    `book-call-form__option${isChecked ? ' book-call-form__option--checked' : ''}${extraClassName ? ` ${extraClassName}` : ''}`

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const toggleGoal = (goal) => {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }))
  }

  const validateCurrentStep = () => formRef.current?.reportValidity() ?? true

  const moveToStep = (step) => {
    setSubmitError('')
    setCurrentStep(step)
    document.getElementById('book-call-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleNextStep = () => {
    if (!validateCurrentStep()) return
    moveToStep(Math.min(currentStep + 1, FORM_STEPS.length - 1))
  }

  const handlePreviousStep = () => {
    moveToStep(Math.max(currentStep - 1, 0))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isLastStep) {
      handleNextStep()
      return
    }

    if (!validateCurrentStep()) return

    setSubmitError('')
    setSubmitting(true)
    try {
      await submitForm('/api/book-a-call', form)
      setSubmitted(true)
      document.getElementById('book-call-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (err) {
      setSubmitError(err.message || 'Unable to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="book-call-page">
      <section className="book-call-hero" aria-labelledby="book-call-hero-heading">
        <div className="book-call-hero__bg-animation" aria-hidden>
          <LazyDarkVeil speed={0.5} />
        </div>

        <div className="book-call-hero__inner">
          <p className="book-call-hero__eyebrow">The first step is just a conversation</p>
          <h1 id="book-call-hero-heading" className="book-call-hero__title">
            Tell us about your practice. We&apos;ll tell you honestly whether we can help.
          </h1>
          <p className="book-call-hero__sub">
            This isn&apos;t a sales call. It&apos;s an introductory conversation, 30 to 45 minutes,
            where you tell us about your practice and we tell you how we work. No pitch. No
            pressure. No proposal unless both sides want to go further. We review every submission
            personally before we book anything. If we don&apos;t think we&apos;re the right fit for
            your practice, we&apos;ll tell you that too.
          </p>
        </div>
      </section>

      <section
        className="book-call-section book-call-expect"
        aria-labelledby="book-call-expect-heading"
      >
        <div className="book-call-section__inner">
          <p className="book-call-section__kicker">What to expect</p>
          <h2 id="book-call-expect-heading" className="book-call-section__title">
            Before you fill this in, here&apos;s what happens next.
          </h2>
          <ol className="book-call-expect__timeline">
            {EXPECT_STEPS.map((step) => (
              <li key={step.num} className="book-call-expect__row">
                <span className="book-call-expect__num" aria-hidden>
                  {step.num}
                </span>
                <div className="book-call-expect__card">
                  <h3 className="book-call-expect__title">{step.title}</h3>
                  <p className="book-call-expect__timing">{step.timing}</p>
                  <p className="book-call-expect__body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="book-call-section book-call-section--surface book-call-promise"
        aria-labelledby="book-call-promise-heading"
      >
        <div className="book-call-section__inner book-call-section__inner--narrow">
          <h2 id="book-call-promise-heading" className="book-call-section__title">
            What we promise  no small print
          </h2>
          <ul className="book-call-promise__list">
            {PROMISES.map((item) => (
              <li key={item} className="book-call-promise__item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="book-call-form"
        className="book-call-section book-call-form-section"
        aria-labelledby="book-call-form-heading"
      >
        <div className="book-call-section__inner book-call-section__inner--form">
          {submitted ? (
              <div className="book-call-form__success" role="status">
              <h2 className="book-call-form__success-title">Thank you. We have your submission.</h2>
              <p className="book-call-form__success-body">
                A senior member of our team will review your practice details and reply within 24 hours.
                Not an automated response. A real person who will read what you wrote and come prepared
                for a genuine conversation about your practice.
              </p>
            </div>
          ) : (
            <>
              <h2 id="book-call-form-heading" className="book-call-form__headline">
                Tell us about your practice.
              </h2>
              <p className="book-call-form__lede">
                The more honest you are here, the more useful the conversation will be. There are no
                wrong answers.
              </p>

              <form ref={formRef} className="book-call-form" onSubmit={handleSubmit} noValidate>
                <div className="book-call-form__progress" aria-label="Contact form progress">
                  <p className="book-call-form__step-count">
                    Step {currentStep + 1} of {FORM_STEPS.length}
                  </p>
                  <div className="book-call-form__dots" role="tablist" aria-label="Form steps">
                    {FORM_STEPS.map((step, index) => (
                      <button
                        key={step.title}
                        type="button"
                        className={`book-call-form__dot${
                          index === currentStep ? ' book-call-form__dot--active' : ''
                        }${index < currentStep ? ' book-call-form__dot--complete' : ''}`}
                        aria-label={`Go to ${step.title}`}
                        aria-current={index === currentStep ? 'step' : undefined}
                        disabled={index > currentStep}
                        onClick={() => moveToStep(index)}
                      />
                    ))}
                  </div>
                </div>

                <fieldset className="book-call-form__group book-call-form__step-panel">
                  <legend className="book-call-form__legend">
                    {FORM_STEPS[currentStep].title}
                  </legend>
                  <p className="book-call-form__step-description">
                    {FORM_STEPS[currentStep].description}
                  </p>

                  {currentStep === 0 && (
                    <>
                  <div className="book-call-form__field">
                    <label className="book-call-form__label" htmlFor="book-name">
                      Full name
                    </label>
                    <input
                      id="book-name"
                      className="book-call-form__input"
                      type="text"
                      name="name"
                      placeholder="Dr. Jane Smith"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                    />
                  </div>

                  <div className="book-call-form__field">
                    <label className="book-call-form__label" htmlFor="book-email">
                      Work email
                    </label>
                    <input
                      id="book-email"
                      className="book-call-form__input"
                      type="email"
                      name="email"
                      placeholder="jane@yourpractice.com"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </div>
                    </>
                  )}

                  {currentStep === 1 && (
                    <>
                  <div className="book-call-form__field">
                    <label className="book-call-form__label" htmlFor="book-practice">
                      Practice or clinic name
                    </label>
                    <input
                      id="book-practice"
                      className="book-call-form__input"
                      type="text"
                      name="practiceName"
                      placeholder="e.g. Miami Shoulder Institute"
                      required
                      value={form.practiceName}
                      onChange={(e) => updateField('practiceName', e.target.value)}
                    />
                  </div>

                  <fieldset className="book-call-form__fieldset">
                    <legend className="book-call-form__label">What is your specialty?</legend>
                    <p className="book-call-form__hint">
                      Select the one that best describes your practice.
                    </p>
                    <div className="book-call-form__options book-call-form__options--grid">
                      {SPECIALTIES.map((option) => (
                        <label
                          key={option}
                          className={getOptionClassName(form.specialty === option)}
                        >
                          <input
                            type="radio"
                            name="specialty"
                            value={option}
                            checked={form.specialty === option}
                            onChange={(e) => updateField('specialty', e.target.value)}
                            required={!form.specialty}
                          />
                          <span>{option === 'Other' ? 'Other →' : option}</span>
                        </label>
                      ))}
                    </div>
                    {form.specialty === 'Other' && (
                      <input
                        className="book-call-form__input book-call-form__input--nested"
                        type="text"
                        name="specialtyOther"
                        placeholder="Your specialty"
                        value={form.specialtyOther}
                        onChange={(e) => updateField('specialtyOther', e.target.value)}
                        required
                      />
                    )}
                  </fieldset>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                  <div className="book-call-form__field">
                    <label className="book-call-form__label" htmlFor="book-location">
                      Where is your practice located?
                    </label>
                    <p className="book-call-form__hint">
                      City and country. We work primarily with US and UK practices.
                    </p>
                    <input
                      id="book-location"
                      className="book-call-form__input"
                      type="text"
                      name="location"
                      placeholder="e.g. Miami, FL"
                      required
                      value={form.location}
                      onChange={(e) => updateField('location', e.target.value)}
                    />
                  </div>

                  <fieldset className="book-call-form__fieldset">
                    <legend className="book-call-form__label">
                      How many locations do you operate?
                    </legend>
                    <p className="book-call-form__hint">
                      This helps us understand the scale of your practice.
                    </p>
                    <div className="book-call-form__options">
                      {LOCATIONS.map((option) => (
                        <label
                          key={option}
                          className={getOptionClassName(form.locations === option)}
                        >
                          <input
                            type="radio"
                            name="locations"
                            value={option}
                            checked={form.locations === option}
                            onChange={(e) => updateField('locations', e.target.value)}
                            required={!form.locations}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                  <fieldset className="book-call-form__fieldset">
                    <legend className="book-call-form__label">
                      What are you currently doing to attract new patients?
                    </legend>
                    <p className="book-call-form__hint">
                      Be honest — this helps us understand where you are now, not where you think you should be.
                    </p>
                    <div className="book-call-form__options">
                      {MARKETING_OPTIONS.map((option) => (
                        <label
                          key={option}
                          className={getOptionClassName(form.marketing === option)}
                        >
                          <input
                            type="radio"
                            name="marketing"
                            value={option}
                            checked={form.marketing === option}
                            onChange={(e) => updateField('marketing', e.target.value)}
                            required={!form.marketing}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="book-call-form__field">
                    <label className="book-call-form__label" htmlFor="book-challenge">
                      What is the single biggest problem you want to solve right now?
                    </label>
                    <p className="book-call-form__hint">
                      Not enough consultations? Inconsistent lead flow? Agency not delivering? Tell us what is actually keeping you up at night.
                    </p>
                    <textarea
                      id="book-challenge"
                      className="book-call-form__textarea"
                      name="challenge"
                      rows={6}
                      placeholder="e.g. We are spending $8K/month on Google Ads but only getting a few bookings. Our website does not convert visitors into patients."
                      required
                      value={form.challenge}
                      onChange={(e) => updateField('challenge', e.target.value)}
                    />
                  </div>
                    </>
                  )}

                  {currentStep === 4 && (
                    <>
                  <fieldset className="book-call-form__fieldset">
                    <legend className="book-call-form__label">
                      What would make this conversation most useful for you?
                    </legend>
                    <p className="book-call-form__hint">
                      Select all that apply so we can come prepared.
                    </p>
                    <div className="book-call-form__options">
                      {CONVERSATION_GOALS.map((option) => (
                        <label
                          key={option}
                          className={getOptionClassName(
                            form.goals.includes(option),
                            'book-call-form__option--check'
                          )}
                        >
                          <input
                            type="checkbox"
                            name="goals"
                            value={option}
                            checked={form.goals.includes(option)}
                            onChange={() => toggleGoal(option)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="book-call-form__fieldset">
                    <legend className="book-call-form__label">How did you hear about Socialsect?</legend>
                    <div className="book-call-form__options book-call-form__options--grid">
                      {REFERRAL_SOURCES.map((option) => (
                        <label
                          key={option}
                          className={getOptionClassName(form.referral === option)}
                        >
                          <input
                            type="radio"
                            name="referral"
                            value={option}
                            checked={form.referral === option}
                            onChange={(e) => updateField('referral', e.target.value)}
                            required={!form.referral}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                    </>
                  )}

                </fieldset>

                <div className="book-call-form__submit-wrap">
                  {submitError && (
                    <p className="book-call-form__error" role="alert">
                      {submitError}
                    </p>
                  )}
                  <div className="book-call-form__nav">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        className="book-call-form__back"
                        onClick={handlePreviousStep}
                        disabled={submitting}
                      >
                        Back
                      </button>
                    )}
                    <button
                      type={isLastStep ? 'submit' : 'button'}
                      className="book-call-form__submit cta cta--primary cta--lg"
                      onClick={isLastStep ? undefined : handleNextStep}
                      disabled={submitting}
                    >
                      {submitting
                        ? 'Sending…'
                        : isLastStep
                          ? 'Start the conversation'
                          : 'Continue'}
                      <ArrowRight className="book-call-form__submit-icon" strokeWidth={2} aria-hidden />
                    </button>
                  </div>
                  <p className="book-call-form__submit-note">
                    Every submission is reviewed by a senior team member. You will hear from us within 24 hours with a thoughtful reply.
                    <br />
                    No automated responses. No calendar link. Just a real person who understands healthcare marketing.
                  </p>
                  <p className="book-call-form__privacy">
                    Your information is never shared or sold. We follow up once at most.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      <section
        className="book-call-section book-call-section--surface book-call-unsure"
        aria-labelledby="book-call-unsure-heading"
      >
        <div className="book-call-section__inner">
          <h2 id="book-call-unsure-heading" className="book-call-unsure__headline">
            Still not sure? That&apos;s exactly what the conversation is for.
          </h2>

          <ul className="book-call-unsure__grid">
            <li className="book-call-unsure__card">
              <h3 className="book-call-unsure__title">No commitment</h3>
              <p className="book-call-unsure__body">
                Submitting this form doesn&apos;t commit you to anything. Not a retainer, not a
                proposal, not even another call. It starts a conversation.
              </p>
            </li>
            <li className="book-call-unsure__card">
              <h3 className="book-call-unsure__title">Not ready yet?</h3>
              <p className="book-call-unsure__body">
                That&apos;s fine. Read our results, see how we work, or request a reference from a
                current client first. The form will still be here.
              </p>
              <div className="book-call-unsure__links">
                <Link to="/results" className="book-call-unsure__link">
                  See results
                  <ArrowRight className="book-call-unsure__link-icon" strokeWidth={2} aria-hidden />
                </Link>
                <a href="#reference" className="book-call-unsure__link">
                  Request a reference
                  <ArrowRight className="book-call-unsure__link-icon" strokeWidth={2} aria-hidden />
                </a>
              </div>
            </li>
            <li className="book-call-unsure__card">
              <h3 className="book-call-unsure__title">We say no too</h3>
              <p className="book-call-unsure__body">
                We don&apos;t take on every practice that inquires. If we don&apos;t think we&apos;re
                the right fit, we&apos;ll tell you honestly, and if we know someone better suited,
                we&apos;ll point you there.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
