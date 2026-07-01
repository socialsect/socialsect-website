import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import DarkVeil from '../../components/dark-veil/DarkVeil.jsx'
import { getArticles } from '../../lib/articles'
import './BlogListing.css'

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export default async function BlogPage() {
  let articles = []
  try {
    articles = await getArticles()
  } catch {
    // articles stays empty — show the coming-soon fallback
  }

  return (
    <main className="blog-page">
      <div className="blog-breadcrumb">
        <div className="blog-breadcrumb__inner">
          <nav aria-label="Breadcrumb">
            <ol className="blog-breadcrumb__list">
              <li>
                <Link href="/">gosocialsect.com</Link>
              </li>
              <li aria-hidden>
                <ChevronRight strokeWidth={1} className="blog-breadcrumb__sep" />
              </li>
              <li>
                <Link href="/insights">insights</Link>
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
            Blog
          </h1>
          <p className="blog-hero__sub">
            Articles on patient acquisition, SEO, paid media, brand, and practice growth.
          </p>
        </div>
      </section>

      <section className="blog-listing">
        <div className="blog-listing__inner">
          {articles.length === 0 ? (
            <p className="blog-state">Articles are coming soon</p>
          ) : (
            <div className="blog-grid">
              {articles.map((article) => {
                const imageUrl = article.featuredImage?.asset?.url
                const imageAlt = article.featuredImageAlt || article.title

                return (
                  <article key={article._id} className="blog-card">
                    <Link href={`/insights/blog/${article.slug}`} className="blog-card__image-link">
                      <div className="blog-card__image-shell">
                        {imageUrl ? (
                          <img className="blog-card__image" src={imageUrl} alt={imageAlt} loading="lazy" />
                        ) : (
                          <div className="blog-card__image blog-card__image--placeholder" aria-hidden>
                            <span>Socialsect</span>
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="blog-card__body">
                      <p className="blog-card__meta">
                        {article.readingTime || 'Article'}
                        {article.publishedAt ? ` · ${formatDate(article.publishedAt)}` : ''}
                      </p>
                      <h2 className="blog-card__title">
                        <Link href={`/insights/blog/${article.slug}`}>{article.title}</Link>
                      </h2>
                      <p className="blog-card__excerpt">{article.excerpt || article.metaDescription}</p>
                      <Link href={`/insights/blog/${article.slug}`} className="blog-card__cta">
                        Read article
                        <ArrowRight strokeWidth={1} aria-hidden />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
