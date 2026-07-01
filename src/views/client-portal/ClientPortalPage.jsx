'use client'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Megaphone,
  Search,
  Globe,
  Smartphone,
  Users,
  FileText,
  Receipt,
  Shield,
  Layers,
  Lock,
} from 'lucide-react'
import './ClientPortalPage.css'

const PORTAL_MODULES = [
  {
    icon: LayoutDashboard,
    index: '01',
    title: 'Dashboard',
    body:
      'One signed-in home for your practice: active services, what’s in progress, key numbers at a glance, and what’s due next  without chasing email threads.',
  },
  {
    icon: Megaphone,
    index: '02',
    title: 'Ads performance',
    body:
      'Meta and Google in one place. Impressions, clicks, spend, CTR, and return on ad spend, with campaign-level detail and trends over time.',
  },
  {
    icon: Search,
    index: '03',
    title: 'SEO performance',
    body:
      'Organic traffic, keyword rankings, backlinks, top pages, and content progress  so you can see whether search is actually moving the needle.',
  },
  {
    icon: Globe,
    index: '04',
    title: 'Website progress',
    body:
      'Follow your site from discovery through launch: phase tracking, page-by-page status, staging links, and a place to submit design feedback when you’re ready.',
  },
  {
    icon: Smartphone,
    index: '05',
    title: 'App progress',
    body:
      'A sprint board from backlog to done, build versions, testing links, and a simple way to report bugs  so development stays visible, not buried in inboxes.',
  },
  {
    icon: Users,
    index: '06',
    title: 'Leads',
    body:
      'Lead volume by period, source breakdown (paid, organic, referral), and charts that show where enquiries are really coming from month to month.',
  },
  {
    icon: FileText,
    index: '07',
    title: 'Reports',
    body:
      'Monthly performance reports in one list: open from Drive or download, review deliverables, and sign off when you’re happy with what we’ve shipped.',
  },
  {
    icon: Receipt,
    index: '08',
    title: 'Invoices',
    body:
      'View your invoices, check status (sent, paid, overdue), and download PDFs. Billing stays transparent and separate from day-to-day delivery work.',
  },
]

const TRUST_POINTS = [
  {
    icon: Lock,
    title: 'Secure sign-in',
    body:
      'Private portal with password reset. Your data stays behind agency-grade authentication  the browser talks to our API, not an open database.',
  },
  {
    icon: Layers,
    title: 'Only what you subscribe to',
    body:
      'Each practice sees the modules they’re engaged for  ads, SEO, website, app, leads, reports. No clutter from services you’re not running with us.',
  },
  {
    icon: Shield,
    title: 'Built for how we work',
    body:
      'Practice owners see their own data. Our delivery team manages campaigns and projects. Leadership handles clients, team, and billing  each role sees the right tools.',
  },
]

export default function ClientPortalPage() {
  return (
    <main className="client-portal-page">
      <section className="client-portal-hero" aria-labelledby="client-portal-hero-heading">
        <div className="client-portal-hero__inner">
          <p className="client-portal-hero__eyebrow">Client portal</p>
          <span className="client-portal-hero__badge" aria-label="Status: coming soon">
            Coming soon
          </span>
          <h1 id="client-portal-hero-heading" className="client-portal-hero__title">
            Your practice marketing hub  one secure place for everything we run for you.
          </h1>
          <p className="client-portal-hero__sub">
            We&apos;re building a dedicated portal for Socialsect clients: campaigns, SEO, website and
            app builds, leads, monthly reports, and invoices  all in one dashboard, measured against
            what actually matters to your practice.
          </p>
          <p className="client-portal-hero__note">
            The portal isn&apos;t live yet. When it launches, existing clients will get access; there&apos;s
            nothing to sign up for here  just a preview of what&apos;s on the way.
          </p>
        </div>
      </section>

      <section className="client-portal-modules" aria-labelledby="client-portal-modules-heading">
        <div className="client-portal-modules__inner">
          <h2 id="client-portal-modules-heading" className="client-portal-modules__headline">
            Everything in the portal  module by module
          </h2>
          <p className="client-portal-modules__intro">
            Eight areas, one login. Each module is designed for healthcare practices: clear numbers,
            honest status, and actions that belong in a client relationship  not a generic agency
            dashboard.
          </p>
          <ul className="client-portal-modules__grid">
            {PORTAL_MODULES.map(({ icon: Icon, index, title, body }) => (
              <li key={title} className="client-portal-modules__card">
                <span className="client-portal-modules__index" aria-hidden>
                  {index}
                </span>
                <Icon className="client-portal-modules__icon" strokeWidth={1.25} aria-hidden />
                <h3 className="client-portal-modules__title">{title}</h3>
                <p className="client-portal-modules__body">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="client-portal-trust" aria-labelledby="client-portal-trust-heading">
        <div className="client-portal-trust__inner">
          <h2 id="client-portal-trust-heading" className="client-portal-trust__headline">
            Designed for trust, not noise
          </h2>
          <ul className="client-portal-trust__grid">
            {TRUST_POINTS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="client-portal-trust__card">
                <Icon className="client-portal-trust__icon" strokeWidth={1.25} aria-hidden />
                <h3 className="client-portal-trust__title">{title}</h3>
                <p className="client-portal-trust__body">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="client-portal-soon" aria-labelledby="client-portal-soon-heading">
        <div className="client-portal-soon__inner">
          <h2 id="client-portal-soon-heading" className="client-portal-soon__title">
            Coming soon
          </h2>
          <p className="client-portal-soon__lede">
            We&apos;re finishing the client portal now. There&apos;s no waitlist or sign-up on this page 
            when it&apos;s ready, we&apos;ll roll it out to Socialsect clients directly.
          </p>
          <p className="client-portal-soon__sub">
            Already work with us and need something today? Book a call and we&apos;ll get you what you
            need in the meantime.
          </p>
          <div className="client-portal-soon__actions">
            <Link to="/" className="btn btn-secondary">
              Back to home
            </Link>
            <Link to="/book-a-call" className="btn btn-primary">
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
