'use client'

import './AboutIdentitySection.css'

const IDENTITY_ROLES = [
  {
    icon: 'laptop-outline',
    title: 'Author',
    body:
      'I wrote A Suitcase of Memories, a book about the things we carry with us. Writing taught me to listen before I speak, and to find the story underneath the story.',
  },
  {
    icon: 'map-outline',
    title: 'Traveler',
    body:
      "I've built Socialsect across time zones, India, the US, the UK. Somewhere between all the airports and different clocks, I learned that the best businesses are built on understanding people, not markets.",
  },
  {
    icon: 'barbell-outline',
    title: 'Boxer',
    body:
      "Boxing taught me that the most important fight is the one you have with yourself before you ever step into the ring. Most things worth doing are uncomfortable before they're rewarding.",
  },
  {
    icon: 'id-card-outline',
    title: 'Founder',
    body:
      "I built Socialsect because I kept seeing brilliant doctors, people who had dedicated their lives to their craft, being let down by agencies that didn't understand their world. I decided to build something that did.",
  },
]

export default function AboutIdentitySection() {
  return (
    <section className="about-identity" aria-labelledby="about-identity-heading">
      <div className="about-identity__inner">
        <h2 id="about-identity-heading" className="about-identity__title">
          I&apos;ve never believed you can understand someone from a job title.
        </h2>

        <div className="about-identity__iam-row">
          <p className="about-identity__iam">I am</p>
          <img
            src="/illustrations/about-iam.svg"
            alt=""
            aria-hidden="true"
            className="about-identity__iam-illustration"
            width="280"
            height="280"
          />
        </div>

        <ul className="about-identity__grid">
          {IDENTITY_ROLES.map(({ icon, title, body }) => (
            <li key={title} className="about-identity__card">
              <span className="about-identity__card-icon" aria-hidden="true">
                <ion-icon name={icon}></ion-icon>
              </span>
              <h3 className="about-identity__card-title">{title}</h3>
              <p className="about-identity__card-body">{body}</p>
            </li>
          ))}
        </ul>

        <div className="about-identity__story">
          <div>
            <h3 className="about-identity__story-title">
              I didn&apos;t choose healthcare. Healthcare chose me.
            </h3>
            <div className="about-identity__story-content">
              <p>
                The first time I worked with a doctor, I didn&apos;t know I was building a niche. I was just trying to solve a problem. A specialist, brilliant at what they did and genuinely one of the best in their field, had been through two agencies in eighteen months and had nothing to show for it except invoices and frustration.
              </p>
              <p>
                I spent two weeks learning their practice before I touched anything. The patient profile. The insurance friction. The seasonal patterns. It was a systems problem dressed up as a marketing problem. I fixed the system. It worked.
              </p>
              <p>
                That&apos;s when I understood something I haven&apos;t been able to shake since: doctors dedicate a decade to becoming exceptional at something that requires their full attention every single day. And then they&apos;re expected to also become marketers, technologists, brand strategists, with no training, no time, and no one accountable for the result.
              </p>
              <p>
                That&apos;s not fair. And it&apos;s fixable. That&apos;s why Socialsect exists.
              </p>
            </div>
          </div>
          <div className="about-identity__story-illustration">
            <img
              src="/illustrations/healthcare.svg"
              alt="Healthcare illustration"
              width="400"
              height="400"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
