import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight } from 'lucide-react'
import './AboutPage.css'

const IDENTITY_ROLES = [
  {
    icon: '/icons/about/pen-nib.svg',
    title: 'Author',
    body:
      'I wrote A Suitcase of Memories, a book about the things we carry with us. Writing taught me to listen before I speak, and to find the story underneath the story.',
  },
  {
    icon: '/icons/about/world-map.svg',
    title: 'Traveler',
    body:
      "I've built Socialsect across time zones, India, the US, the UK. Somewhere between all the airports and different clocks, I learned that the best businesses are built on understanding people, not markets.",
  },
  {
    icon: '/icons/about/boxing-glove.svg',
    title: 'Boxer',
    body:
      "Boxing taught me that the most important fight is the one you have with yourself before you ever step into the ring. Most things worth doing are uncomfortable before they're rewarding.",
  },
  {
    icon: '/icons/about/laptop.svg',
    title: 'Founder',
    body:
      "I built Socialsect because I kept seeing brilliant doctors, people who had dedicated their lives to their craft, being let down by agencies that didn't understand their world. I decided to build something that did.",
  },
]

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
      "I'd rather work with ten practices I can genuinely move the needle for than fifty I'm spread thin across. That's why we're selective. That's why every engagement starts with a diagnostic. I don't take on work I'm not confident I can do well.",
  },
  {
    index: '04',
    title: 'Partnership over transaction',
    body:
      "When you work with Socialsect, you're not buying a service. You're entering a partnership. Your practice's growth matters to me the same way it matters to you, because if it doesn't grow, neither do we.",
  },
  {
    index: '05',
    title: 'Curiosity over assumption',
    body:
      'I travel. I read. I write. I box. I try to stay genuinely curious about everything, including your specialty, your patients, your market. The day I stop being curious is the day I stop being useful to you.',
  },
  {
    index: '06',
    title: 'Long-term over short-term',
    body:
      "I'm building Socialsect to last. I'm not optimizing for the next quarter. I'm optimizing for the kind of company that practice owners recommend to other practice owners for the next decade. Every decision reflects that.",
  },
]

const THANKS_TAGS = ['Author', 'Traveler', 'Boxer', 'Building Socialsect', 'Lewes, Delaware → everywhere']

const TEAM = [
  {
    role: 'Full-stack development',
    name: 'Vinayak',
    body:
      'The person I trust when something has to actually work, not just look like it works. Vinayak builds the digital infrastructure that practices run on. Quietly excellent. The kind of engineer who finds the problem before you knew it existed.',
  },
  {
    role: 'Project coordination',
    name: 'Vatsal',
    body:
      "The reason nothing falls through the cracks. Vatsal is the person between the work and the deadline, making sure every moving part knows where it is, what it's doing, and when. If you've ever chased an agency for an update, Vatsal is why you won't do that here.",
  },
  {
    role: 'Paid social',
    name: 'Gurshan',
    body:
      'Gurshan lives inside Meta the way some people live inside books. He understands the difference between an ad that gets clicks and an ad that gets patients. For our healthcare clients, that distinction is everything.',
  },
  {
    role: 'Technical SEO',
    name: 'Swapnil',
    body:
      'Patient acquisition starts before a patient knows they need you. Swapnil makes sure your practice is the first thing they find when they do. Technical, precise, and never satisfied with \'good enough\' rankings.',
  },
  {
    role: 'SEO content strategy',
    name: 'Sushant',
    body:
      'Where Swapnil builds the foundation, Sushant builds the content architecture on top of it. Together they cover everything from technical crawlability to the kind of content that makes a specialist practice the obvious authority in their field.',
  },
  {
    role: 'WordPress development',
    name: 'Faraz',
    body:
      "Fast, clean, and zero shortcuts. Faraz handles the builds that need to move quickly without losing quality. The practices he's built for don't just look good, they convert. That's the standard he holds himself to.",
  },
]

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-hero-heading">
        <div className="about-hero__inner">
          <p className="about-hero__eyebrow">About</p>
          <h1 id="about-hero-heading" className="about-hero__title">
            There is no lie when it comes to starting a new relationship. My mum used to tell me
            that. So here is the raw version of who I am.
          </h1>
          <div className="about-hero__body">
            <p>
              My name is Rayansh. I&apos;m the founder of Socialsect. I&apos;m also a writer, a
              traveler, and a boxer. Not necessarily in that order depending on the week.
            </p>
            <p>
              I wrote a book called <em>A Suitcase of Memories</em>. It&apos;s about the things we
              carry with us, the places, the people, the moments that shape us without us
              realizing. Writing it taught me something I&apos;ve tried to bring into everything I
              do since: that the most important thing you can do in any relationship, personal or
              professional, is to show up honestly.
            </p>
            <p>
              This page is me doing exactly that. Before we talk business, before we discuss your
              practice, before any of that, I wanted you to know who you&apos;d be working with.
              Because I believe you can only build something real with someone you actually know.
            </p>
          </div>
          <footer className="about-hero__signoff">
            <p className="about-hero__signoff-name"> Rayansh</p>
            <p className="about-hero__signoff-meta">
              Founder, Socialsect · Author · Lewes, Delaware, US
            </p>
          </footer>
          <p className="about-hero__note">
            Everything on this page was written by me personally. I wanted both of us to know each
            other before we take the next step.
          </p>
        </div>
      </section>

      <section className="about-section about-identity" aria-labelledby="about-identity-heading">
        <div className="about-section__inner about-section__inner--wide">
          <h2 id="about-identity-heading" className="about-section__title">
            I&apos;ve never believed you can understand someone from a job title.
          </h2>

          <figure className="about-identity__figure">
            <div className="about-identity__photo">
              <img
                src="/team/rayansh.png"
                alt="Rayansh smiling at a table with a laptop"
                className="about-identity__photo-image"
                width="800"
                height="800"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
          </figure>

          <ul className="about-identity__grid">
            {IDENTITY_ROLES.map(({ icon, title, body }) => (
              <li key={title} className="about-identity__card">
                <span className="about-identity__card-icon" aria-hidden="true">
                  <img src={icon} alt="" width={32} height={32} decoding="async" />
                </span>
                <h3 className="about-identity__card-title">{title}</h3>
                <p className="about-identity__card-body">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="about-section about-section--surface about-healthcare"
        aria-labelledby="about-healthcare-heading"
      >
        <div className="about-section__inner about-section__inner--narrow">
          <h2 id="about-healthcare-heading" className="about-section__title">
            I didn&apos;t choose healthcare. Healthcare chose me. And then I made it a decision.
          </h2>
          <div className="about-section__prose">
            <p>
              The first time I worked with a doctor, I didn&apos;t know I was building a niche. I
              was just trying to solve a problem. A specialist, brilliant at what they did and
              genuinely one of the best in their field, had been through two agencies in eighteen
              months and had nothing to show for it except invoices and a growing frustration with
              the word &ldquo;marketing.&rdquo;
            </p>
            <p>
              I spent two weeks learning their practice before I touched anything. The patient
              profile. The insurance friction. The seasonal patterns. The gap between the leads
              coming in and the patients actually showing up. It was a systems problem dressed up
              as a marketing problem. I fixed the system. It worked.
            </p>
            <p>
              That&apos;s when I understood something I haven&apos;t been able to shake since:
              doctors are among the most dedicated professionals in the world. They spend a decade
              training to become exceptional at something that requires their full attention every
              single day. And then they&apos;re expected to also become marketers, technologists,
              brand strategists, and growth operators, with no training, no time, and no one
              accountable for the result.
            </p>
            <p>That&apos;s not fair. And it&apos;s fixable. That&apos;s why Socialsect exists.</p>
            <p>
              Today, almost everything we do is for private medical practices in the US and UK. Not
              because it&apos;s the most convenient market. Because it&apos;s the one where I know
              we can make a genuine difference  and where I know the doctors working with us
              deserve better than what they&apos;ve been getting.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-book" aria-labelledby="about-book-heading">
        <div className="about-section__inner about-section__inner--narrow">
          <p className="about-section__kicker">From A Suitcase of Memories</p>
          <blockquote className="about-book__quote">
            <p id="about-book-heading">
              &ldquo;We spend our lives collecting things worth carrying: experiences, people,
              places, lessons. The ones that last aren&apos;t the ones we planned. They&apos;re the
              ones that found us.&rdquo;
            </p>
          </blockquote>
          <div className="about-section__prose about-book__prose">
            <p>
              That&apos;s how I think about every practice I work with. I&apos;m not here to apply a
              formula. I&apos;m here to understand what&apos;s worth carrying forward: what&apos;s
              working, what&apos;s been lost, and what needs to be built. Every engagement is a new
              suitcase. Every practice has a story worth telling properly.
            </p>
          </div>
        </div>
      </section>

      <section
        className="about-section about-section--surface about-principles"
        aria-labelledby="about-principles-heading"
      >
        <div className="about-section__inner about-section__inner--wide">
          <h2 id="about-principles-heading" className="about-section__title">
            These aren&apos;t values on a wall. They&apos;re the things I&apos;d lose clients over
            before I&apos;d compromise on.
          </h2>
          <ol className="about-principles__list">
            {PRINCIPLES.map(({ index, title, body }) => (
              <li key={index} className="about-principles__item">
                <article className="about-principles__card">
                  <span className="about-principles__index">{index}</span>
                  <h3 className="about-principles__title">{title}</h3>
                  <p className="about-principles__body">{body}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-section about-thanks" aria-labelledby="about-thanks-heading">
        <div className="about-section__inner about-section__inner--narrow">
          <h2 id="about-thanks-heading" className="about-section__title">
            If you&apos;ve read this far  thank you. Most people don&apos;t.
          </h2>
          <div className="about-section__prose">
            <p>
              I wrote this page because I believe you deserve to know who you&apos;re considering
              working with before you book a call. Not a logo. Not a list of services. A person.
            </p>
            <p>
              I&apos;m someone who has spent years learning the world of private medical practice 
              not because it was the easiest market, but because I genuinely believe that the
              doctors operating in it deserve a growth partner who takes their work as seriously as
              they do.
            </p>
            <p>
              If something on this page resonated with you, whether it was the book, the conviction
              behind the work, or just the fact that someone took the time to write something real,
              I&apos;d love to talk.
            </p>
            <p className="about-thanks__cta-wrap">
              <Link to={BOOK_A_CALL_FORM} className="about-thanks__cta">
                Book a conversation
                <ArrowRight className="about-thanks__cta-icon" strokeWidth={2} aria-hidden />
              </Link>
            </p>
            <p>
              Not a sales call. Just a conversation. You tell me about your practice. I&apos;ll tell
              you honestly whether I think we can help. And we&apos;ll go from there.
            </p>
            <p>
              My mum was right, by the way. There really is no lie when it comes to starting a new
              relationship. So that&apos;s the version of Socialsect you just read. The real one.
            </p>
          </div>
          <footer className="about-thanks__signoff">
            <p className="about-thanks__signoff-name"> Rayansh</p>
            <p className="about-thanks__signoff-meta">
              Founder · Author of <em>A Suitcase of Memories</em> · Lewes, Delaware, US
            </p>
          </footer>
          <ul className="about-thanks__tags" aria-label="About Rayansh">
            {THANKS_TAGS.map((tag) => (
              <li key={tag}>
                <span className="about-thanks__tag">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="about-section about-section--surface about-team"
        aria-labelledby="about-team-heading"
      >
        <div className="about-section__inner about-section__inner--wide">
          <h2 id="about-team-heading" className="about-section__title">
            I could introduce them by job title. But that would miss the point entirely.
          </h2>
          <p className="about-team__intro">
            Every person at Socialsect was brought in because I trusted them with something that
            mattered to me before I trusted them with something that mattered to a client.
            That&apos;s the only hiring filter I&apos;ve ever used. Here&apos;s who you&apos;re
            actually working with.
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
            Beyond this core team, we work with a carefully chosen network of specialists 
            strategists, creatives, developers, and analysts  brought in when your practice needs a
            specific depth of expertise. Every person in that network has worked with us before.
            Nobody arrives on your project as a stranger.
          </p>
        </div>
      </section>

      <section className="about-closing" aria-labelledby="about-closing-heading">
        <div className="about-closing__inner">
          <h2 id="about-closing-heading" className="about-closing__headline">
            Now you know me. I&apos;d like to know your practice.
          </h2>
          <p className="about-closing__body">
            Book a 45-minute conversation. No pitch. No packages. Just two people working out whether
            there&apos;s something worth building together.
          </p>
          <div className="about-closing__actions">
            <Link to={BOOK_A_CALL_FORM} className="about-closing__btn about-closing__btn--primary">
              Start the conversation
              <ArrowRight className="about-closing__btn-icon" strokeWidth={2} aria-hidden />
            </Link>
            <Link to="/results" className="about-closing__btn about-closing__btn--ghost">
              See our results first
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
