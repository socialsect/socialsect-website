'use client'

import './AboutIdentitySection.css'

const ICONS = {
  'laptop-outline': (
    <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinejoin="round" aria-hidden="true">
      <rect x="48" y="96" width="416" height="304" rx="32" ry="32" />
      <line x1="16" y1="400" x2="496" y2="400" />
    </svg>
  ),
  'map-outline': (
    <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M313.27 124.64L383 96l-128-48-128 48-69.73-28.36A16 16 0 0032 82.12v312.55a16 16 0 0010.12 14.67l69.73 28.36L240 440l128-48 69.73 28.36a16 16 0 0022.27-14.68V99.74a16 16 0 00-9.73-14.67z" />
      <line x1="256" y1="96" x2="256" y2="440" />
    </svg>
  ),
  'barbell-outline': (
    <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M144 144h224v224H144z" />
      <path d="M48 256h16M80 256h32M128 256h256M384 256h32M448 256h16" />
      <path d="M176 112v32M256 112v32M336 112v32M176 368v32M256 368v32M336 368v32" />
    </svg>
  ),
  'id-card-outline': (
    <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinejoin="round" aria-hidden="true">
      <rect x="48" y="112" width="416" height="288" rx="32" ry="32" />
      <circle cx="240" cy="208" r="48" />
      <path d="M160 336a64 64 0 01128 0" />
      <line x1="328" y1="192" x2="384" y2="192" strokeLinecap="round" />
      <line x1="328" y1="224" x2="384" y2="224" strokeLinecap="round" />
    </svg>
  ),
}

const IDENTITY_ROLES = [
  {
    icon: 'laptop-outline',
    title: 'An Author',
    body:
      'I wrote A Suitcase of Memories, a book about the things we carry with us. Writing taught me to listen before I speak, and to find the story underneath the story.',
  },
  {
    icon: 'map-outline',
    title: 'A Traveler',
    body:
      "I've built Socialsect across time zones, India, the US, the UK. Somewhere between all the airports and different clocks, I learned that the best businesses are built on understanding people, not markets.",
  },
  {
    icon: 'barbell-outline',
    title: 'A Boxer',
    body:
      "Boxing taught me that the most important fight is the one you have with yourself before you ever step into the ring. Most things worth doing are uncomfortable before they're rewarding.",
  },
  {
    icon: 'id-card-outline',
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