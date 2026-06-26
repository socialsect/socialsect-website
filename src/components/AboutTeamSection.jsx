'use client'

import './AboutTeamSection.css'

const TEAM = [
  {
    role: 'Full-stack development',
    name: 'Vinayak',
    body:
      'The person I trust when something has to actually work, not just look like it works. Vinayak builds the digital infrastructure that practices run on. Quietly excellent.',
  },
  {
    role: 'Project coordination',
    name: 'Vatsal',
    body:
      "The reason nothing falls through the cracks. Vatsal is the person between the work and the deadline, making sure every moving part knows where it is.",
  },
  {
    role: 'Paid social',
    name: 'Gurshan',
    body:
      'Gurshan lives inside Meta the way some people live inside books. He understands the difference between an ad that gets clicks and an ad that gets patients.',
  },
  {
    role: 'Technical SEO',
    name: 'Swapnil',
    body:
      'Patient acquisition starts before a patient knows they need you. Swapnil makes sure your practice is the first thing they find.',
  },
  {
    role: 'SEO content strategy',
    name: 'Sushant',
    body:
      'Where Swapnil builds the foundation, Sushant builds the content architecture. Together they cover everything from technical crawlability to authority-building content.',
  },
  {
    role: 'WordPress development',
    name: 'Faraz',
    body:
      "Fast, clean, and zero shortcuts. Faraz handles the builds that need to move quickly without losing quality. The practices he builds for convert.",
  },
]

export default function AboutTeamSection() {
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
          {TEAM.map(({ role, name, body }) => (
            <li key={name} className="about-team__card">
              <p className="about-team__role">{role}</p>
              <h3 className="about-team__name">{name}</h3>
              <p className="about-team__body">{body}</p>
            </li>
          ))}
        </ul>
        <p className="about-team__note">
          Beyond this core team, we work with a carefully chosen network of specialists — strategists, creatives, developers, and analysts — brought in when your practice needs specific expertise. Every person in that network has worked with us before. Nobody arrives on your project as a stranger.
        </p>
      </div>
    </section>
  )
}
