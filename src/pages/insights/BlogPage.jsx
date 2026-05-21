import { useMemo, useState } from 'react'
import { BOOK_A_CALL_FORM } from '../../constants/routes.js'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ChevronDown, ChevronRight, Search } from 'lucide-react'
import DarkVeil from '../../components/dark-veil/DarkVeil.jsx'
import { submitForm } from '../../lib/submitForm'
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_OPTIONS,
  BLOG_SPECIALTY_OPTIONS,
  BLOG_ARTICLES,
  FEATURED_MAIN,
  FEATURED_SECONDARY,
  POPULAR_POSTS,
  SIDEBAR_SPECIALTIES,
  filterArticles,
  getGridArticles,
} from './blogData'
import './BlogPage.css'

const PAGE_SIZE = 6

function FeaturedCard({ article, size = 'main' }) {
  const isMain = size === 'main'
  return (
    <article className={`blog-featured-card blog-featured-card--${size}`}>
      <Link to={`/insights/blog#${article.slug}`} className="blog-featured-card__link">
        <div className="blog-featured-card__media" aria-hidden>
          <span className="blog-featured-card__thumb-label">Article thumbnail</span>
        </div>
        <div className="blog-featured-card__overlay">
          <div className="blog-featured-card__meta">
            <span className="blog-tag">{article.category}</span>
            <span className="blog-featured-card__read">{article.readTime}</span>
          </div>
          <h3 className="blog-featured-card__title">&ldquo;{article.title}&rdquo;</h3>
          {isMain && article.excerpt && (
            <p className="blog-featured-card__excerpt">{article.excerpt}</p>
          )}
        </div>
      </Link>
    </article>
  )
}

function ArticleCard({ article }) {
  return (
    <article className="blog-article-card">
      <Link to={`/insights/blog#${article.slug}`} className="blog-article-card__link">
        <div className="blog-article-card__thumb" aria-hidden>
          <span className="blog-article-card__thumb-label">Thumbnail</span>
        </div>
        <div className="blog-article-card__body">
          <span className="blog-tag">{article.category}</span>
          <h3 className="blog-article-card__title">{article.title}</h3>
          <p className="blog-article-card__excerpt">{article.excerpt}</p>
          <p className="blog-article-card__meta">
            <span>{article.readTime}</span>
            <span className="blog-article-card__dot" aria-hidden />
            <span>{article.specialtyLabel}</span>
          </p>
        </div>
      </Link>
    </article>
  )
}

export default function BlogPage() {
  const [categoryId, setCategoryId] = useState('all')
  const [specialtyId, setSpecialtyId] = useState('all')
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [email, setEmail] = useState('')
  const [sidebarEmail, setSidebarEmail] = useState('')
  const [heroSubscribed, setHeroSubscribed] = useState(false)
  const [sidebarSubscribed, setSidebarSubscribed] = useState(false)
  const [heroSubmitting, setHeroSubmitting] = useState(false)
  const [sidebarSubmitting, setSidebarSubmitting] = useState(false)

  const filtered = useMemo(
    () =>
      filterArticles(getGridArticles(BLOG_ARTICLES), {
        categoryId,
        specialtyId,
        search,
      }),
    [categoryId, specialtyId, search],
  )

  const visible = filtered.slice(0, visibleCount)
  const totalGrid = getGridArticles(BLOG_ARTICLES).length

  function handleCategoryPill(id) {
    setCategoryId(id)
    setVisibleCount(PAGE_SIZE)
  }

  function handleSearchChange(e) {
    setSearch(e.target.value)
    setVisibleCount(PAGE_SIZE)
  }

  async function handleHeroSubscribe(e) {
    e.preventDefault()
    setHeroSubmitting(true)
    try {
      await submitForm('/api/newsletter', { email, source: 'blog-hero' })
      setHeroSubscribed(true)
      setEmail('')
    } catch {
      /* keep form visible; optional toast later */
    } finally {
      setHeroSubmitting(false)
    }
  }

  async function handleSidebarSubscribe(e) {
    e.preventDefault()
    setSidebarSubmitting(true)
    try {
      await submitForm('/api/newsletter', { email: sidebarEmail, source: 'blog-sidebar' })
      setSidebarSubscribed(true)
      setSidebarEmail('')
    } catch {
      /* keep form visible */
    } finally {
      setSidebarSubmitting(false)
    }
  }

  return (
    <main className="blog-page">
      <div className="blog-breadcrumb">
        <div className="blog-breadcrumb__inner">
          <nav aria-label="Breadcrumb">
            <ol className="blog-breadcrumb__list">
              <li>
                <Link to="/">gosocialsect.com</Link>
              </li>
              <li aria-hidden>
                <ChevronRight strokeWidth={1} className="blog-breadcrumb__sep" />
              </li>
              <li>
                <Link to="/insights">insights</Link>
              </li>
              <li aria-hidden>
                <ChevronRight strokeWidth={1} className="blog-breadcrumb__sep" />
              </li>
              <li>
                <span aria-current="page">blog</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="blog-hero" aria-labelledby="blog-hero-heading">
        <div className="blog-hero__bg-animation" aria-hidden>
          <DarkVeil speed={0.5} />
        </div>

        <div className="blog-hero__inner">
          <p className="blog-hero__eyebrow">Insights for private medical practices</p>
          <h1 id="blog-hero-heading" className="blog-hero__title">
            &ldquo;Everything we know about growing a private medical practice, written for the
            people running one.&rdquo;
          </h1>
          <p className="blog-hero__sub">
            No generic marketing advice. Everything here is specific to private practices in the US
            and UK. Published when we have something worth reading  not on a content calendar.
          </p>
          <form className="blog-hero__subscribe" onSubmit={handleHeroSubscribe} noValidate>
            <label htmlFor="blog-hero-email" className="visually-hidden">
              Your email  get notified of new posts
            </label>
            <input
              id="blog-hero-email"
              type="email"
              autoComplete="email"
              className="blog-hero__input"
              placeholder="Your email, get notified of new posts"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="blog-hero__submit btn btn-primary" disabled={heroSubmitting}>
              {heroSubscribed ? 'Subscribed' : heroSubmitting ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      <div className="blog-filters-sticky">
        <div className="blog-filters-sticky__inner">
          <div className="blog-filters-row blog-filters-row--controls">
            <label className="blog-search">
              <Search strokeWidth={1} className="blog-search__icon" aria-hidden />
              <input
                type="search"
                className="blog-search__input"
                placeholder="Search articles..."
                value={search}
                onChange={handleSearchChange}
                aria-label="Search articles"
              />
            </label>
            <label className="blog-select-wrap">
              <span className="visually-hidden">Filter by category</span>
              <select
                className="blog-select"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value)
                  setVisibleCount(PAGE_SIZE)
                }}
              >
                {BLOG_CATEGORY_OPTIONS.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown strokeWidth={1} className="blog-select__chevron" aria-hidden />
            </label>
            <label className="blog-select-wrap">
              <span className="visually-hidden">Filter by specialty</span>
              <select
                className="blog-select"
                value={specialtyId}
                onChange={(e) => {
                  setSpecialtyId(e.target.value)
                  setVisibleCount(PAGE_SIZE)
                }}
              >
                {BLOG_SPECIALTY_OPTIONS.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown strokeWidth={1} className="blog-select__chevron" aria-hidden />
            </label>
          </div>

          <ul className="blog-filters-row blog-filters-row--pills" role="list">
            {BLOG_CATEGORIES.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`blog-filter-pill${categoryId === id ? ' blog-filter-pill--active' : ''}`}
                  aria-pressed={categoryId === id}
                  onClick={() => handleCategoryPill(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <p className="blog-filters-count">
            Showing {visible.length} of {filtered.length} articles
            {filtered.length < totalGrid && ` (${totalGrid} total)`}
          </p>
        </div>
      </div>

      <section className="blog-featured-section" aria-labelledby="blog-featured-heading">
        <div className="blog-featured-section__inner">
          <p id="blog-featured-heading" className="blog-section-label">
            Featured
          </p>
          <div className="blog-featured-split">
            {FEATURED_MAIN && <FeaturedCard article={FEATURED_MAIN} size="main" />}
            <div className="blog-featured-stack">
              {FEATURED_SECONDARY.map((article) => (
                <FeaturedCard key={article.id} article={article} size="secondary" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="blog-main" aria-label="Articles">
        <div className="blog-main__inner">
          <div className="blog-main__content">
            <ul className="blog-grid">
              {visible.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>

            {visible.length === 0 && (
              <p className="blog-empty">No articles match your filters. Try clearing search or filters.</p>
            )}

            {visible.length < filtered.length && (
              <div className="blog-load-more-wrap">
                <button
                  type="button"
                  className="blog-load-more"
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                >
                  Load more articles
                  <ArrowDown strokeWidth={1} aria-hidden />
                </button>
              </div>
            )}
          </div>

          <aside className="blog-sidebar" aria-label="Blog sidebar">
            <section className="blog-sidebar__block">
              <h2 className="blog-sidebar__title">Popular this month</h2>
              <ol className="blog-sidebar__popular">
                {POPULAR_POSTS.map((post, i) => (
                  <li key={post.id}>
                    <Link to={`/insights/blog#${post.id}`} className="blog-sidebar__popular-link">
                      <span className="blog-sidebar__num" aria-hidden>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{post.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>

            <section className="blog-sidebar__block">
              <h2 className="blog-sidebar__title">Browse by specialty</h2>
              <ul className="blog-sidebar__tags">
                {SIDEBAR_SPECIALTIES.map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      className="blog-sidebar__tag"
                      onClick={() => {
                        const match = BLOG_SPECIALTY_OPTIONS.find(
                          (o) => o.label.toLowerCase().includes(label.toLowerCase().slice(0, 4)),
                        )
                        if (match) {
                          setSpecialtyId(match.id)
                          setVisibleCount(PAGE_SIZE)
                        }
                      }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
                <li>
                  <Link to="/who-we-help" className="blog-sidebar__tag blog-sidebar__tag--more">
                    + more
                  </Link>
                </li>
              </ul>
            </section>

            <section className="blog-sidebar__newsletter" aria-labelledby="blog-sidebar-newsletter">
              <h2 id="blog-sidebar-newsletter" className="blog-sidebar__newsletter-title">
                &ldquo;New articles when they&apos;re ready  not on a schedule.&rdquo;
              </h2>
              <p className="blog-sidebar__newsletter-sub">We publish 2–4 articles per month. No spam.</p>
              <form className="blog-sidebar__newsletter-form" onSubmit={handleSidebarSubscribe}>
                <label htmlFor="blog-sidebar-email" className="visually-hidden">
                  Your email address
                </label>
                <input
                  id="blog-sidebar-email"
                  type="email"
                  className="blog-sidebar__newsletter-input"
                  placeholder="Your email address"
                  value={sidebarEmail}
                  onChange={(e) => setSidebarEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="blog-sidebar__newsletter-btn"
                  disabled={sidebarSubmitting || sidebarSubscribed}
                >
                  {sidebarSubscribed ? "You're on the list" : sidebarSubmitting ? 'Sending…' : 'Keep me posted'}
                </button>
              </form>
            </section>

            <section className="blog-sidebar__cta">
              <h2 className="blog-sidebar__cta-title">Ready to talk?</h2>
              <p className="blog-sidebar__cta-body">
                If something here sparked a question about your practice  that&apos;s what the audit
                is for.
              </p>
              <Link to={BOOK_A_CALL_FORM} className="blog-sidebar__cta-btn">
                Book a practice audit
                <ArrowRight strokeWidth={1} aria-hidden />
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  )
}
