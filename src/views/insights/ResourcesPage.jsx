'use client'
import { useEffect, useMemo, useState } from 'react'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  ClipboardList,
  FileText,
  LayoutTemplate,
  ListChecks,
  X,
} from 'lucide-react'
import LazyDarkVeil from '../../components/dark-veil/LazyDarkVeil.jsx'
import { submitForm } from '../../lib/submitForm'
import {
  RESOURCE_TYPES,
  RESOURCE_SPECIALTY_OPTIONS,
  TYPE_LEGEND,
  DOWNLOAD_STEPS,
  MOST_DOWNLOADED,
  FEATURED_RESOURCE,
  RESOURCES,
  filterResources,
} from './resourcesData'
import './ResourcesPage.css'

const TYPE_ICONS = {
  guide: BookOpen,
  template: LayoutTemplate,
  checklist: ListChecks,
  report: BarChart3,
}

function TypeBadge({ type, children }) {
  const label = children ?? type.charAt(0).toUpperCase() + type.slice(1)
  return <span className={`resources-type-badge resources-type-badge--${type}`}>{label}</span>
}

function ResourceIcon({ type }) {
  const Icon = TYPE_ICONS[type] || FileText
  return (
    <div className={`resources-card__icon resources-card__icon--${type}`} aria-hidden>
      <Icon strokeWidth={1} />
    </div>
  )
}

function ResourceCard({ resource, onDownload }) {
  return (
    <article className="resources-card">
      <div className="resources-card__head">
        <ResourceIcon type={resource.type} />
        <div className="resources-card__head-text">
          <TypeBadge type={resource.type}>{resource.type}</TypeBadge>
          <h3 className="resources-card__title">{resource.title}</h3>
        </div>
      </div>
      <p className="resources-card__desc">{resource.description}</p>
      <div className="resources-card__footer">
        <span className="resources-card__meta">{resource.meta}</span>
        <button type="button" className="resources-card__dl" onClick={() => onDownload(resource)}>
          {resource.cta}
          <ArrowRight strokeWidth={1} aria-hidden />
        </button>
      </div>
    </article>
  )
}

export default function ResourcesPage() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [specialtyFilter, setSpecialtyFilter] = useState('all')
  const [gateResource, setGateResource] = useState(null)
  const [gateEmail, setGateEmail] = useState('')
  const [gateName, setGateName] = useState('')
  const [gateWebsite, setGateWebsite] = useState('')
  const [gateLocation, setGateLocation] = useState('')
  const [gateSubmitting, setGateSubmitting] = useState(false)
  const [gateError, setGateError] = useState('')
  const [gateSubmitted, setGateSubmitted] = useState(false)

  const filtered = useMemo(
    () => filterResources(RESOURCES, { typeId: typeFilter, specialtyId: specialtyFilter }),
    [typeFilter, specialtyFilter],
  )

  const totalCount = RESOURCES.length

  function handleDownload(resource) {
    setGateResource(resource)
    setGateEmail('')
    setGateName('')
    setGateWebsite('')
    setGateLocation('')
    setGateError('')
    setGateSubmitted(false)
  }

  function handleFeaturedDownload() {
    handleDownload({ ...FEATURED_RESOURCE, cta: 'Download free' })
  }

  function closeGate() {
    setGateResource(null)
    setGateEmail('')
    setGateName('')
    setGateWebsite('')
    setGateLocation('')
    setGateError('')
    setGateSubmitting(false)
    setGateSubmitted(false)
  }

  useEffect(() => {
    if (!gateResource) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeGate()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [gateResource])

  async function handleGateSubmit(e) {
    e.preventDefault()
    if (!gateResource) return
    setGateError('')
    setGateSubmitting(true)
    try {
      await submitForm('/api/resource-download', {
        email: gateEmail,
        name: gateName,
        website: gateWebsite,
        location: gateLocation,
        resourceTitle: gateResource.title,
        resourceType: gateResource.type,
      })
      setGateSubmitted(true)
    } catch (err) {
      setGateError(err.message || 'Unable to submit. Please try again.')
    } finally {
      setGateSubmitting(false)
    }
  }

  return (
    <main className="resources-page">

      <section className="resources-hero" aria-labelledby="resources-hero-heading">
        <div className="resources-hero__bg-animation" aria-hidden>
          <LazyDarkVeil speed={0.5} />
        </div>

        <div className="resources-hero__inner">
          <p className="resources-hero__eyebrow">Free · Practical · Built from real practice engagements</p>
          <h1 id="resources-hero-heading" className="resources-hero__title">
            &ldquo;Tools we use with every client, available free. Because a good decision starts with
            good information.&rdquo;
          </h1>
          <p className="resources-hero__sub">
            Guides, templates, and checklists built from real engagements with private practices in the
            US and UK. Request what&apos;s useful and we&apos;ll email it to you shortly. No catch. No
            weekly email sequence. Just the resource.
          </p>
          <ul className="resources-hero__legend" aria-label="Resource types">
            {TYPE_LEGEND.map(({ type, label, hint }) => (
              <li key={type} className="resources-hero__legend-item">
                <TypeBadge type={type}>{label}</TypeBadge>
                <span>{hint}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="resources-filters-sticky">
        <div className="resources-filters-sticky__inner">
          <div className="resources-filters-row">
            <ul className="resources-filters-pills" role="list">
              {RESOURCE_TYPES.map(({ id, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    className={`resources-filter-pill${typeFilter === id ? ' resources-filter-pill--active' : ''}`}
                    aria-pressed={typeFilter === id}
                    onClick={() => setTypeFilter(id)}
                  >
                    {id === 'all' ? (
                      label
                    ) : (
                      <TypeBadge type={id}>{label}</TypeBadge>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <label className="resources-select-wrap">
              <span className="visually-hidden">Filter by specialty</span>
              <select
                className="resources-select"
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
              >
                {RESOURCE_SPECIALTY_OPTIONS.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown strokeWidth={1} className="resources-select__chevron" aria-hidden />
            </label>
          </div>
          <p className="resources-filters-count">
            {filtered.length} resource{filtered.length !== 1 ? 's' : ''} shown · {totalCount} available
            · updated regularly
          </p>
        </div>
      </div>

      <section className="resources-featured" aria-labelledby="resources-featured-heading">
        <div className="resources-featured__inner">
          <h2 id="resources-featured-heading" className="visually-hidden">
            Featured resource
          </h2>
          <article className="resources-featured-card">
            <div className="resources-featured-card__cover">
              <div className="resources-featured-card__cover-icon" aria-hidden>
                <FileText strokeWidth={1} />
              </div>
              <p className="resources-featured-card__cover-title">{FEATURED_RESOURCE.shortTitle}</p>
              <p className="resources-featured-card__cover-meta">{FEATURED_RESOURCE.coverLabel}</p>
              <TypeBadge type="guide">Guide</TypeBadge>
            </div>
            <div className="resources-featured-card__info">
              <TypeBadge type="guide">{FEATURED_RESOURCE.badge}</TypeBadge>
              <h3 className="resources-featured-card__title">
                &ldquo;{FEATURED_RESOURCE.title}&rdquo;
              </h3>
              <p className="resources-featured-card__desc">{FEATURED_RESOURCE.description}</p>
              <ul className="resources-featured-card__meta">
                <li>{FEATURED_RESOURCE.format}</li>
                <li>{FEATURED_RESOURCE.time}</li>
                <li>{FEATURED_RESOURCE.specialty}</li>
                <li>Email delivery</li>
              </ul>
              <button
                type="button"
                className="resources-featured-card__cta"
                onClick={handleFeaturedDownload}
              >
                Download free
                <ArrowRight strokeWidth={1} aria-hidden />
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="resources-main" aria-label="Resource library">
        <div className="resources-main__inner">
          <div className="resources-main__content">
            <ul className="resources-grid">
              {filtered.map((resource) => (
                <li key={resource.id}>
                  <ResourceCard resource={resource} onDownload={handleDownload} />
                </li>
              ))}
            </ul>
            {filtered.length === 0 && (
              <p className="resources-empty">No resources match your filters.</p>
            )}
          </div>

          <aside className="resources-sidebar" aria-label="Resources sidebar">
            <section className="resources-sidebar__block">
              <h2 className="resources-sidebar__title">How downloads work</h2>
              <ol className="resources-sidebar__steps">
                {DOWNLOAD_STEPS.map(({ step, title, body }) => (
                  <li key={step} className="resources-sidebar__step">
                    <span className="resources-sidebar__step-num" aria-hidden>
                      {step}
                    </span>
                    <p>
                      <strong>{title}</strong> {body}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="resources-sidebar__block">
              <h2 className="resources-sidebar__title">Most downloaded</h2>
              <ul className="resources-sidebar__popular">
                {MOST_DOWNLOADED.map(({ type, title, badgeLabel }) => (
                  <li key={title}>
                    <TypeBadge type={type}>{badgeLabel}</TypeBadge>
                    <span>{title}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="resources-sidebar__cta">
              <p className="resources-sidebar__cta-quote">
                &ldquo;The guides tell you what to look for. The audit tells you what&apos;s actually
                there.&rdquo;
              </p>
              <p className="resources-sidebar__cta-sub">
                A free 45-minute practice audit  live, with us, for your specific practice.
              </p>
              <Link to={BOOK_A_CALL_FORM} className="resources-sidebar__cta-btn">
                Book a practice audit
                <ArrowRight strokeWidth={1} aria-hidden />
              </Link>
            </section>
          </aside>
        </div>
      </section>

      <section className="resources-closing" aria-labelledby="resources-closing-heading">
        <div className="resources-closing__inner">
          <h2 id="resources-closing-heading" className="resources-closing__headline">
            &ldquo;The guides tell you what to look for. The audit tells you what&apos;s actually
            there.&rdquo;
          </h2>
          <p className="resources-closing__body">
            A free 45-minute practice audit. We&apos;ll run through the diagnostic with you  live 
            and show you exactly where your practice is losing patients and what to do about it.
          </p>
          <div className="resources-closing__actions">
            <Link to={BOOK_A_CALL_FORM} className="resources-closing__btn resources-closing__btn--primary">
              See what your practice is missing
              <ArrowRight strokeWidth={1} aria-hidden />
            </Link>
            <Link to={BOOK_A_CALL_FORM} className="resources-closing__btn resources-closing__btn--ghost">
              Request a reference call
            </Link>
          </div>
          <p className="resources-closing__note">No packages. No pitch. Just a clear diagnosis of your practice.</p>
        </div>
      </section>

      {gateResource && (
        <div className="resources-gate" role="dialog" aria-modal="true" aria-labelledby="resources-gate-title">
          <button
            type="button"
            className="resources-gate__backdrop"
            aria-label="Close download form"
            onClick={closeGate}
          />
          <div className="resources-gate__modal">
            <button type="button" className="resources-gate__close" onClick={closeGate} aria-label="Close">
              <X strokeWidth={1} aria-hidden />
            </button>
            <p className="resources-gate__kicker">Downloading</p>
            <h3 id="resources-gate-title" className="resources-gate__title">
              {gateResource.title}
            </h3>
            <p className="resources-gate__sub">
              Enter your email and we&apos;ll send this resource to your inbox shortly. No spam. No
              drip campaign.
            </p>
            {gateSubmitted ? (
              <div className="resources-gate__success" role="status" aria-live="polite">
                <p className="resources-gate__success-title">You&apos;re in.</p>
                <p className="resources-gate__success-body">
                  We&apos;ll email <strong>{gateResource.title}</strong> to <strong>{gateEmail}</strong>
                  shortly.
                </p>
                <button type="button" className="resources-gate__submit" onClick={closeGate}>
                  Close
                  <ArrowRight strokeWidth={1} aria-hidden />
                </button>
                <p className="resources-gate__fine">
                  Check your inbox in a few minutes. If you don&apos;t see it, look in spam or
                  promotions.
                </p>
              </div>
            ) : (
              <form className="resources-gate__form" onSubmit={handleGateSubmit}>
                <label className="visually-hidden" htmlFor="gate-name">
                  Your name
                </label>
                <input
                  id="gate-name"
                  type="text"
                  autoComplete="name"
                  required
                  className="resources-gate__input"
                  placeholder="Your name"
                  value={gateName}
                  onChange={(e) => setGateName(e.target.value)}
                />
                <label className="visually-hidden" htmlFor="gate-email">
                  Your email address
                </label>
                <input
                  id="gate-email"
                  type="email"
                  autoComplete="email"
                  required
                  className="resources-gate__input"
                  placeholder="Your email address"
                  value={gateEmail}
                  onChange={(e) => setGateEmail(e.target.value)}
                />
                <label className="visually-hidden" htmlFor="gate-website">
                  Business website
                </label>
                <input
                  id="gate-website"
                  type="url"
                  autoComplete="url"
                  required
                  className="resources-gate__input"
                  placeholder="Business website (e.g., example.com)"
                  value={gateWebsite}
                  onChange={(e) => setGateWebsite(e.target.value)}
                />
                <label className="visually-hidden" htmlFor="gate-location">
                  Location
                </label>
                <input
                  id="gate-location"
                  type="text"
                  autoComplete="off"
                  required
                  className="resources-gate__input"
                  placeholder="Location (city, country)"
                  value={gateLocation}
                  onChange={(e) => setGateLocation(e.target.value)}
                />
                {gateError && (
                  <p className="resources-gate__error" role="alert">
                    {gateError}
                  </p>
                )}
                <button type="submit" className="resources-gate__submit" disabled={gateSubmitting}>
                  {gateSubmitting ? 'Sending…' : 'Email me the resource'}
                  <ArrowRight strokeWidth={1} aria-hidden />
                </button>
                <p className="resources-gate__fine">
                  No spam. No drip campaign. Just the resource in your inbox.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
