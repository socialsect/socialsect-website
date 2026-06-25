import { Link } from 'react-router-dom'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { ArrowRight } from 'lucide-react'
import DeferredSection from '../../components/DeferredSection'
import './AboutPage.css'

const loadAboutIdentitySection = () => import('../../components/AboutIdentitySection')
const loadAboutPrinciplesSection = () => import('../../components/AboutPrinciplesSection')
const loadAboutTeamSection = () => import('../../components/AboutTeamSection')

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
      {/* Dark Hero Section */}
      <section className="about-hero" aria-labelledby="about-hero-heading">
        <div className="about-hero__bg" aria-hidden="true">
          <img
            src="/team/rayansh.png"
            alt=""
            className="about-hero__bg-image"
            fetchPriority="high"
            decoding="async"
          />
          <div className="about-hero__overlay" />
        </div>

        <div className="about-hero__content">
          <div className="about-hero__main">
            <div className="hero-copy">
              <p className="hero-eyebrow">
                <span className="hero-eyebrow__line" aria-hidden="true" />
                About Rayansh
              </p>

              <h1 id="about-hero-heading" className="hero-headline">
                <span className="hero-headline__line">There is no lie</span>
                <span className="hero-headline__line">when it comes to</span>
                <span className="hero-headline__line">starting a new</span>
                <span className="hero-headline__line hero-headline__line--gradient">
                  relationship.
                </span>
              </h1>

              <p className="hero-subheadline">
                My mum used to tell me that. So here is the raw version of who I am.
              </p>

              <div className="hero-intro-text">
                <p>
                  My name is Rayansh. I&apos;m the founder of Socialsect. I&apos;m also a writer, a traveler, and a boxer. Not necessarily in that order depending on the week.
                </p>
                <p>
                  I wrote a book called <em>A Suitcase of Memories</em>. It&apos;s about the things we carry with us, the places, the people, the moments that shape us. Writing it taught me that the most important thing you can do in any relationship is to show up honestly.
                </p>
              </div>

              <div className="hero-cta-buttons">
                <Link to={BOOK_A_CALL_FORM} className="hero-btn hero-btn--primary">
                  Start a conversation
                  <svg
                    className="hero-btn__arrow hero-btn__arrow--right"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <a href="#identity-section" className="hero-btn hero-btn--secondary">
                  Learn more about me
                  <svg
                    className="hero-btn__arrow hero-btn__arrow--down"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </a>
              </div>
            </div>

            <blockquote className="hero-testimonial">
              <span className="hero-testimonial__quote" aria-hidden="true">
                &ldquo;&rdquo;
              </span>
              <p className="hero-testimonial__text">
                Everything on this page was written by me personally. I wanted both of us to know each other before we take the next step.
              </p>
              <span className="hero-testimonial__divider" aria-hidden="true" />
              <footer className="hero-testimonial__attribution">
                <cite>Rayansh</cite>
                <span>Founder, Socialsect</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Deferred Sections */}
      <DeferredSection load={loadAboutIdentitySection} minHeight={'60vh'} id="identity-section" />
      <DeferredSection load={loadAboutPrinciplesSection} minHeight={'60vh'} />
      <DeferredSection load={loadAboutTeamSection} minHeight={'60vh'} />

      {/* Closing CTA Section */}
      <section className="about-closing" aria-labelledby="about-closing-heading">
        <div className="about-closing__bg" aria-hidden="true">
          <div className="about-closing__overlay" />
        </div>
        <div className="about-closing__inner">
          <h2 id="about-closing-heading" className="about-closing__headline">
            Now you know me. I&apos;d like to know your practice.
          </h2>
          <p className="about-closing__body">
            Book a 45-minute conversation. No pitch. No packages. Just two people working out whether there&apos;s something worth building together.
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
