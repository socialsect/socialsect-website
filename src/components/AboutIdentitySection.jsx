'use client'

import './AboutIdentitySection.css'

const ICONS = {
  'author': (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M37.31 15.93L12.24 41L5.5 42.5L7 35.76l.51-.51l28-28l.51-.51l1.76 1.76l.55-.5l2.46-2.5h0l1.71 1.71L40 9.68l-.52.51l1.8 1.81l-3 3l1.41 1.42l1.45 1.44l-4.88 4.88m1.55-14.26l1.71 1.71m-1.21 4.74l-1 1M7 35.76L12.24 41" />
    </svg>
  ),
  'traveler': (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
      <path d="M208 95c-3.583 0-7.736 1.925-9.977 4.613c-2.24 2.69-2.99 5.447-3.4 7.907c-.82 4.92-.247 9.48.5 13.96c.316 1.897.698 3.748 1.096 5.52h18.534c-.67-2.54-1.387-5.542-1.877-8.48a41 41 0 0 1-.53-5.52h87.305a41 41 0 0 1-.53 5.52c-.49 2.938-1.205 5.94-1.876 8.48h18.535c.4-1.772.78-3.623 1.097-5.52c.747-4.48 1.32-9.04.5-13.96c-.41-2.46-1.16-5.218-3.4-7.907S307.583 95 304 95zm-105 16v18h50v-18zm256 0v18h50v-18zM96 145c-5 0-11.05 2.777-15.637 7.363S73 163 73 168v208c0 5 2.777 11.05 7.363 15.637S91 399 96 399h23V145zm41 0v254h238V145zm256 0v254h23c5 0 11.05-2.777 15.637-7.363S439 381 439 376V168c0-5-2.777-11.05-7.363-15.637S421 145 416 145z" />
    </svg>
  ),
  'boxer': (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.71 17.13a.25.25 0 0 0 .13-.13a.25.25 0 0 0 0-.19l-2.79-6.1C5.5 7.31 6 4.08 8.31 2.14a.49.49 0 0 0-.05-.8A5.16 5.16 0 0 0 3.16 1c-3 1.39-4 4.71-2.38 8.26l4.29 9.4a.51.51 0 0 0 .67.25ZM6.36 20.3a.5.5 0 0 0-.26.28a.52.52 0 0 0 0 .39l.43.94a1 1 0 0 0 .56.52a1 1 0 0 0 .76 0l3.3-1.5a.55.55 0 0 0 .26-.28a.5.5 0 0 0 0-.38l-.74-1.62a.24.24 0 0 0-.33-.13Z" />
      <path d="M22.2 15.71a.49.49 0 0 0 .24-.66l-.23-.52a1.54 1.54 0 0 1-.1-1l1.38-5.9a2.53 2.53 0 0 0-4.71-1.6a.24.24 0 0 1-.22.14a.26.26 0 0 1-.22-.15l-.19-.41c-1.62-3.55-4.76-5-7.8-3.61S6.34 6.74 8 10.29l4.3 9.41a.5.5 0 0 0 .66.25Zm1.22 3.88a1 1 0 0 0 .49-1.33l-.43-.94a.48.48 0 0 0-.28-.26a.5.5 0 0 0-.38 0l-9.28 4.23a.5.5 0 0 0-.25.66l.43.94a1 1 0 0 0 1.33.5Z" />
    </svg>
  ),
  'founder': (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 56.256v-36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v36" />
      <path d="M32.126 56.256H4.152a.15.15 0 0 0-.152.152a7.85 7.85 0 0 0 7.848 7.848h56.304A7.85 7.85 0 0 0 76 56.408a.15.15 0 0 0-.152-.152H47.874a4 4 0 0 1-3.874 3h-8a4 4 0 0 1-3.874-3" />
    </svg>
  ),
}

const IDENTITY_ROLES = [
  {
    icon: 'author',
    title: 'An Author',
    body:
      'I wrote A Suitcase of Memories, a book about the things we carry with us. Writing taught me to listen before I speak, and to find the story underneath the story.',
  },
  {
    icon: 'traveler',
    title: 'A Traveler',
    body:
      "I've built Socialsect across time zones, India, the US, the UK. Somewhere between all the airports and different clocks, I learned that the best businesses are built on understanding people, not markets.",
  },
  {
    icon: 'boxer',
    title: 'A Boxer',
    body:
      "Boxing taught me that the most important fight is the one you have with yourself before you ever step into the ring. Most things worth doing are uncomfortable before they're rewarding.",
  },
  {
    icon: 'founder',
    title: 'And obviously a Founder',
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

        <p className="about-identity__iam">I am</p>

        <ul className="about-identity__grid">
          {IDENTITY_ROLES.map(({ icon, title, body }) => (
            <li key={title} className="about-identity__card">
              <span className="about-identity__card-icon" aria-hidden="true">
                {ICONS[icon]}
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
                That&apos;s when I understood something I haven&apos;t been able to shake since: doctors are among the most dedicated professionals in the world. They spend a decade training to become exceptional at something that requires their full attention every single day. And then they&apos;re expected to also become marketers, technologists, brand strategists, and growth operators , with no training, no time, and no one accountable for the result.
              </p>
              <p>
                That&apos;s not fair. And it&apos;s fixable. That&apos;s why Socialsect exists.
              </p>
              <p>
                Today, almost everything we do is for private medical practices in the US and UK. Not because it&apos;s the most convenient market. Because it&apos;s the one where I know we can make a genuine difference , and where I know the doctors working with us deserve better than what they&apos;ve been getting.
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