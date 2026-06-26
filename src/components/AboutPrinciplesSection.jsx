'use client'

import './AboutPrinciplesSection.css'

const PRINCIPLES = [
  {
    index: '01',
    title: 'Honesty before comfort',
    body:
      "If your campaign isn't working, I'll tell you before you ask. If a strategy I proposed isn't delivering, I'll say it first. I'd rather have an uncomfortable conversation than send you a report that makes everything look fine when it isn't.",
  },
  {
    index: '02',
    title: 'Results over reports',
    body:
      "I'm not interested in impressions or reach or engagement rate. I'm interested in whether your practice is growing. Every month I ask myself one question: is this doctor better off than they were 30 days ago? If not, that's on me.",
  },
  {
    index: '03',
    title: 'Depth over volume',
    body:
      "I'd rather work with ten practices I can genuinely move the needle for than fifty I'm spread thin across. That's why we're selective. That's why every engagement starts with a diagnostic.",
  },
  {
    index: '04',
    title: 'Partnership over transaction',
    body:
      "When you work with Socialsect, you're not buying a service. You're entering a partnership. Your practice's growth matters to me the same way it matters to you.",
  },
  {
    index: '05',
    title: 'Curiosity over assumption',
    body:
      "I travel. I read. I write. I box. I try to stay genuinely curious about everything, including your specialty, your patients, your market. The day I stop being curious is the day I stop being useful.",
  },
  {
    index: '06',
    title: 'Long-term over short-term',
    body:
      "I'm building Socialsect to last. I'm not optimizing for the next quarter. I'm optimizing for the kind of company that practice owners recommend for the next decade.",
  },
]

export default function AboutPrinciplesSection() {
  return (
    <section className="about-principles" aria-labelledby="about-principles-heading">
      <div className="about-principles__inner">
        <h2 id="about-principles-heading" className="about-principles__title">
          These aren&apos;t values on a wall. They&apos;re the things I&apos;d lose clients over before I&apos;d compromise on.
        </h2>
        <ol className="about-principles__list">
          {PRINCIPLES.map(({ index, title, body }) => (
            <li key={index} className="about-principles__item">
              <article className="about-principles__card">
                <span className="about-principles__index">{index}</span>
                <h3 className="about-principles__card-title">{title}</h3>
                <p className="about-principles__card-body">{body}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
