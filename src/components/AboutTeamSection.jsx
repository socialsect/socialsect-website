'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import './AboutTeamSection.css'

const TEAM = [
  {
    role: 'Project coordination',
    name: 'Jaspal',
    photo: '/team/jaspal.png',
    photoHover: '/team/jaspal.png',
    modalPhoto: '/team/jaspal.png',
    yearsExp: 4,
    nickname: 'The Conductor',
    healthcareExperience: '3+ years',
    bio: [
      "Every project has a hundred moving parts. Jaspal is the one who knows where each one is at any given moment.",
      "Calm, organized, and impossible to rattle  he keeps the entire team aligned without anyone feeling managed.",
    ],
    superpowers: ['Multi-project orchestration', 'Stakeholder alignment', 'Deadline Whispering'],
    kryptonite: ['Scope creep', 'Ambiguous briefs', 'Missing timelines'],
  },
  {
    role: 'Client growth strategist',
    name: 'Harshul',
    photo: '/team/harshul.png',
    photoHover: '/team/harshul.png',
    modalPhoto: '/team/harshul.png',
    yearsExp: 3,
    nickname: 'The Connector',
    healthcareExperience: '2+ years',
    bio: [
      "Harshul is the first voice a client hears and the reason they stay. He translates what a practice needs into what we build.",
      "Part strategist, part translator  he makes sure no detail gets lost between the pitch and the delivery.",
    ],
    superpowers: ['Client Needs Analysis', 'Relationship building', 'Opportunity mapping'],
    kryptonite: ['Generic pitches', 'Unanswered emails', 'Slow decision-making'],
  },
  {
    role: 'Paid social',
    name: 'Gurshan',
    photo: '/team/gurshan.png',
    photoHover: '/team/gurshan.png',
    modalPhoto: '/team/gurshan.png',
    yearsExp: 6,
    nickname: 'The Meta Whisperer',
    healthcareExperience: '5+ years',
    bio: [
      "Gurshan lives inside Meta the way some people live inside books. He understands the difference between an ad that gets clicks and an ad that gets patients.",
      "Every campaign he runs starts with the same question: what actually moves the needle for this practice.",
    ],
    superpowers: ['Meta Ads optimization', 'Audience targeting', 'Creative testing at scale'],
    kryptonite: ['Vanity metrics', 'Ad accounts with no tracking'],
  },
  {
    role: 'Brand experience',
    name: 'Navya',
    photo: '/team/navya.png',
    photoHover: '/team/navya.png',
    modalPhoto: '/team/navya.png',
    yearsExp: 2,
    nickname: 'The Curator',
    healthcareExperience: '1+ years',
    bio: [
      "Navya makes sure every client touchpoint feels intentional. From onboarding to reporting, she designs the experience around clarity and trust.",
      "She notices the details others skip  and those details are usually what make a client feel like they're in good hands.",
    ],
    superpowers: ['Client experience design', 'Onboarding flows', 'Cross-team coordination'],
    kryptonite: ['Misaligned expectations', 'Slack overload', 'Unclear ownership'],
  },
  {
    role: 'Technical SEO',
    name: 'Swapnil',
    photo: '/team/swapnil.png',
    photoHover: '/team/swapnil.png',
    modalPhoto: '/team/swapnil.png',
    yearsExp: 7,
    nickname: 'The Architect',
    healthcareExperience: '6+ years',
    bio: [
      "Patient acquisition starts before a patient knows they need you. Swapnil makes sure your practice is the first thing they find.",
      "He thinks in crawl budgets, site structure, and Core Web Vitals  and somehow makes all of it make sense.",
    ],
    superpowers: ['Technical audits', 'Site architecture', 'Core Web Vitals'],
    kryptonite: ['Broken redirects', 'Duplicate content'],
  },
  {
    role: 'Revenue outreach',
    name: 'Vimlesh',
    photo: '/team/vimlesh.png',
    photoHover: '/team/vimlesh.png',
    modalPhoto: '/team/vimlesh.png',
    yearsExp: 3,
    nickname: 'The Inbox Architect',
    healthcareExperience: '2+ years',
    bio: [
      "Vimlesh designs the conversations that happen before a patient ever books. Every email sequence is built to warm, nurture, and convert.",
      "He thinks of inboxes as living systems  and treats every send as a chance to build trust, not just deliver a message.",
    ],
    superpowers: ['Email sequence design', 'Drip campaign strategy', 'Conversion copywriting'],
    kryptonite: ['Spam triggers', 'Low open rates', 'Unsegmented lists'],
  },
  {
    role: 'Growth acquisition',
    name: 'Krish',
    photo: '/team/krish.png',
    photoHover: '/team/krish.png',
    modalPhoto: '/team/krish.png',
    yearsExp: 2,
    nickname: 'The Magnet',
    healthcareExperience: '1+ years',
    bio: [
      "Krish finds the patients before they start searching. He maps the journey from awareness to appointment and builds touchpoints along the way.",
      "Part data, part instinct  he knows which channels pull and which ones just make noise.",
    ],
    superpowers: ['Patient acquisition funnels', 'Channel diagnostics', 'Growth experimentation'],
    kryptonite: ['Channels with no tracking', 'Vanity metrics', 'Slow feedback loops'],
  },
  {
    role: 'WordPress development',
    name: 'Faraz',
    photo: '/team/faraz.png',
    photoHover: '/team/faraz.png',
    modalPhoto: '/team/faraz.png',
    yearsExp: 4,
    nickname: 'The Builder',
    healthcareExperience: '3+ years',
    bio: [
      "Fast, clean, and zero shortcuts. Faraz handles the builds that need to move quickly without losing quality. The practices he builds for convert.",
      "He treats every site like it's his own portfolio piece  which means yours gets the same care.",
    ],
    superpowers: ['WordPress development', 'Page speed optimization', 'Pixel-perfect builds'],
    kryptonite: ['Bloated plugins', 'Unoptimized images'],
  },
  {
    role: 'SEO content strategy',
    name: 'Sushant',
    photo: '/team/sushant.png',
    photoHover: '/team/sushant.png',
    modalPhoto: '/team/sushant.png',
    yearsExp: 5,
    nickname: 'The Wordsmith',
    healthcareExperience: '4+ years',
    bio: [
      "Where Swapnil builds the foundation, Sushant builds the content architecture. Together they cover everything from technical crawlability to authority-building content.",
      "He writes for the patient first and the algorithm second  which is exactly why it works for both.",
    ],
    superpowers: ['Content strategy', 'Keyword research', 'E-E-A-T optimization'],
    kryptonite: ['Thin content', 'Missed deadlines'],
  },
]

export default function AboutTeamSection() {
  const [active, setActive] = useState(null)
  const overlayRef = useRef(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') close()
    }
    if (active !== null) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [active, close])

  return (
    <section className="about-team" aria-labelledby="about-team-heading">
      <div className="about-team__inner">
        <h2 id="about-team-heading" className="about-team__title">
          I could introduce them by job title. But that would miss the point entirely.
        </h2>
        <p className="about-team__intro">
          Every person at Socialsect was brought in because I trusted them with something that mattered to me before I trusted them with something that mattered to a client. That&apos;s the only hiring filter I&apos;ve ever used. Here&apos;s who you&apos;re actually working with.
        </p>

        <ul className="about-team__grid">
          {TEAM.map((m, i) => (
            <li key={m.name} className="about-team__card">
              <button
                type="button"
                className="about-team__card-btn"
                onClick={() => setActive(i)}
                aria-label={`View profile of ${m.name}`}
              >
                <span className="about-team__avatar">
                  <img
                    src={m.photo}
                    alt={`Photo of ${m.name}`}
                    className="about-team__img about-team__img--default"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                  <img
                    src={m.photoHover}
                    alt=""
                    className="about-team__img about-team__img--hover"
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                    draggable="false"
                  />
                </span>
                <h3 className="about-team__name">{m.name}</h3>
                <p className="about-team__role">{m.role}</p>
              </button>
            </li>
          ))}
        </ul>

        <p className="about-team__note">
          Beyond this core team, we work with a carefully chosen network of specialists  strategists, creatives, developers, and analysts  brought in when your practice needs specific expertise. Every person in that network has worked with us before. Nobody arrives on your project as a stranger.
        </p>
      </div>

      {/* Modal */}
      {active !== null && (
        <div
          className="about-team__overlay"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Profile of ${TEAM[active].name}`}
          onClick={(e) => {
            if (e.target === overlayRef.current) close()
          }}
        >
          <div className="about-team__modal">
            <button
              type="button"
              className="about-team__modal-close"
              onClick={close}
              aria-label="Close profile"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>

            <div className="about-team__modal-photo">
              <img
                src={TEAM[active].modalPhoto}
                alt={`Photo of ${TEAM[active].name}`}
                draggable="false"
              />
              <span className="about-team__modal-years">
                <span className="about-team__modal-years-num">{TEAM[active].yearsExp}</span>
                <span className="about-team__modal-years-label">Years Exp.</span>
              </span>
            </div>

            <div className="about-team__modal-body">
              <h3 className="about-team__modal-name">{TEAM[active].name}</h3>
              <p className="about-team__modal-role">{TEAM[active].role}</p>

              <div className="about-team__modal-meta">
                <span className="about-team__modal-meta-item">
                  <strong>Nickname:</strong> {TEAM[active].nickname}
                </span>
                <span className="about-team__modal-meta-item">
                  <strong>Healthcare Experience:</strong> {TEAM[active].healthcareExperience}
                </span>
              </div>

              <span className="about-team__modal-divider" />

              {TEAM[active].bio.map((p, idx) => (
                <p className="about-team__modal-text" key={idx}>{p}</p>
              ))}

              <div className="about-team__modal-columns">
                <div>
                  <h4 className="about-team__modal-heading">Superpowers</h4>
                  <ul className="about-team__modal-list">
                    {TEAM[active].superpowers.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="about-team__modal-heading">Kryptonite</h4>
                  <ul className="about-team__modal-list">
                    {TEAM[active].kryptonite.map((k) => (
                      <li key={k}>{k}</li>
                    ))}
                  </ul>
                </div>
              </div>


            </div>
          </div>
        </div>
      )}
    </section>
  )
}