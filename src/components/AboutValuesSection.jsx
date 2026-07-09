'use client'

import './AboutValuesSection.css'

const VALUES = [
  {
    num: '01',
    title: 'Honesty before comfort',
    body: "If your campaign isn't working, I'll tell you before you ask. If a strategy I proposed isn't delivering, I'll say it first. I'd rather have an uncomfortable conversation than send you a report that makes everything look fine when it isn't.",
  },
  {
    num: '02',
    title: 'Results over reports',
    body: "I'm not interested in impressions or reach or engagement rate. I'm interested in whether your practice is growing. Every month I ask myself one question: is this doctor better off than they were 30 days ago? If not, that's on me.",
  },
  {
    num: '03',
    title: 'Depth over volume',
    body: "I'd rather work with ten practices I can genuinely move the needle for than fifty I'm spread thin across. That's why we're selective. That's why every engagement starts with a diagnostic. I don't take on work I'm not confident I can do well.",
  },
  {
    num: '04',
    title: 'Partnership over transaction',
    body: "When you work with Socialsect, you're not buying a service. You're entering a partnership. Your practice's growth matters to me the same way it matters to you , because if it doesn't grow, neither do we.",
  },
  {
    num: '05',
    title: 'Curiosity over assumption',
    body: "I travel. I read. I write. I box. I try to stay genuinely curious about everything , including your specialty, your patients, your market. The day I stop being curious is the day I stop being useful to you.",
  },
  {
    num: '06',
    title: 'Long-term over short-term',
    body: "I'm building Socialsect to last. I'm not optimising for the next quarter. I'm optimising for the kind of company that practice owners recommend to other practice owners for the next decade. Every decision reflects that.",
  },
]

export default function AboutValuesSection() {
  return (
    <section className="about-values" aria-labelledby="about-values-heading">
      <div className="about-values__inner">
        <ol className="about-values__list">
          {VALUES.map(({ num, title, body }) => (
            <li key={num} className="about-values__item">
              <span className="about-values__num" aria-hidden="true">{num}</span>
              <div className="about-values__content">
                <h3 className="about-values__item-title">{title}</h3>
                <p className="about-values__item-body">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
