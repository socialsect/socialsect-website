import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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
  'Orthopedics',
  'Aesthetics / MedSpa',
  'Dermatology',
  'Dentistry',
  'Plastic surgery',
  'Ophthalmology',
  'Private GP',
  'Other',
]

const LOCATIONS = ['1 location', '2–3 locations', '4+ locations']

const MARKETING_OPTIONS = [
  'We have nothing in place',
  'Word of mouth only',
  "We have an agency but it's not working",
  'We run ads ourselves',
  'We have multiple vendors',
  'We have a system but want to improve it',
]

const CONVERSATION_GOALS = [
  'Understand if Socialsect is the right fit',
  'Get an outside perspective on my practice',
  'Understand what a system would look like for me',
  'Request a reference from a current client',
  'Just exploring, no pressure',
]

const REFERRAL_SOURCES = [
  'Cold email or outreach',
  'Referred by someone',
  'Google search',
  'LinkedIn',
  'Spoke with a current client',
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

export default function BookACallPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
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
              <h2 className="book-call-form__success-title">Thank you. We&apos;ve got it.</h2>
              <p className="book-call-form__success-body">
                We review every submission personally. You&apos;ll hear from us within 24 hours  a
                real reply from a real person, not an automated response or calendar link.
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

              <form className="book-call-form" onSubmit={handleSubmit} noValidate>
                <fieldset className="book-call-form__group">
                  <legend className="book-call-form__legend">About you</legend>

                  <div className="book-call-form__field">
                    <label className="book-call-form__label" htmlFor="book-name">
                      Your name
                    </label>
                    <input
                      id="book-name"
                      className="book-call-form__input"
                      type="text"
                      name="name"
                      placeholder="Dr. / your full name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                    />
                  </div>

                  <div className="book-call-form__field">
                    <label className="book-call-form__label" htmlFor="book-email">
                      Your email
                    </label>
                    <input
                      id="book-email"
                      className="book-call-form__input"
                      type="email"
                      name="email"
                      placeholder="you@yourpractice.com"
                      autoComplete="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </div>

                  <div className="book-call-form__field">
                    <label className="book-call-form__label" htmlFor="book-practice">
                      Your practice name
                    </label>
                    <input
                      id="book-practice"
                      className="book-call-form__input"
                      type="text"
                      name="practiceName"
                      placeholder="Practice or clinic name"
                      required
                      value={form.practiceName}
                      onChange={(e) => updateField('practiceName', e.target.value)}
                    />
                  </div>

                  <fieldset className="book-call-form__fieldset">
                    <legend className="book-call-form__label">Your specialty</legend>
                    <p className="book-call-form__hint">
                      Pick the one that fits best  or type your own.
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

                  <div className="book-call-form__field">
                    <label className="book-call-form__label" htmlFor="book-location">
                      Where is your practice based?
                    </label>
                    <p className="book-call-form__hint">
                      City and country. We work primarily with US and UK practices.
                    </p>
                    <input
                      id="book-location"
                      className="book-call-form__input"
                      type="text"
                      name="location"
                      placeholder="City, Country"
                      required
                      value={form.location}
                      onChange={(e) => updateField('location', e.target.value)}
                    />
                  </div>
                </fieldset>

                <fieldset className="book-call-form__group">
                  <legend className="book-call-form__legend">About your practice</legend>

                  <fieldset className="book-call-form__fieldset">
                    <legend className="book-call-form__label">
                      How many locations do you operate?
                    </legend>
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

                  <fieldset className="book-call-form__fieldset">
                    <legend className="book-call-form__label">
                      What does your current marketing look like?
                    </legend>
                    <p className="book-call-form__hint">
                      Be honest  this helps us understand where you&apos;re starting from, not
                      where you should be.
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
                </fieldset>

                <fieldset className="book-call-form__group">
                  <legend className="book-call-form__legend">About what you need</legend>

                  <div className="book-call-form__field">
                    <label className="book-call-form__label" htmlFor="book-challenge">
                      What&apos;s the biggest challenge your practice is facing right now?
                    </label>
                    <p className="book-call-form__hint">
                      This is the most important question on this form. Don&apos;t give us the
                      polished version  give us the real one. What keeps you up at night?
                    </p>
                    <textarea
                      id="book-challenge"
                      className="book-call-form__textarea"
                      name="challenge"
                      rows={6}
                      placeholder="Write freely, there's no wrong answer here.."
                      required
                      value={form.challenge}
                      onChange={(e) => updateField('challenge', e.target.value)}
                    />
                  </div>

                  <fieldset className="book-call-form__fieldset">
                    <legend className="book-call-form__label">
                      What are you hoping to get out of this conversation?
                    </legend>
                    <p className="book-call-form__hint">
                      Understanding your expectations helps us make the call as useful as possible
                      for you.
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
                    <legend className="book-call-form__label">How did you find Socialsect?</legend>
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
                </fieldset>

                <div className="book-call-form__submit-wrap">
                  {submitError && (
                    <p className="book-call-form__error" role="alert">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="book-call-form__submit cta cta--primary cta--lg"
                    disabled={submitting}
                  >
                    {submitting ? 'Sending…' : 'Start the conversation'}
                    <ArrowRight className="book-call-form__submit-icon" strokeWidth={2} aria-hidden />
                  </button>
                  <p className="book-call-form__submit-note">
                    We review every submission personally. You&apos;ll hear from us within 24 hours.
                    <br />
                    No automated responses. No immediate calendar link. Just a real reply from a real
                    person.
                  </p>
                  <p className="book-call-form__privacy">
                    Your information is never shared or sold. One follow-up maximum.
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
