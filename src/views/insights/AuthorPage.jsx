'use client'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { getAuthorBySlug, getArticlesByAuthor } from '../../lib/articles'

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export default function AuthorPage() {
  const { slug } = useParams()
  const [author, setAuthor] = useState(null)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        const [authorData, articlesData] = await Promise.all([
          getAuthorBySlug(slug),
          getArticlesByAuthor(slug),
        ])
        if (isMounted) {
          setAuthor(authorData)
          setArticles(articlesData)
        }
      } catch {
        // ignore
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()
    return () => { isMounted = false }
  }, [slug])

  if (loading) {
    return (
      <main className="article-page">
        <p className="article-page__state">Loading author...</p>
      </main>
    )
  }

  if (!author) {
    return (
      <main className="article-page">
        <p className="article-page__state">Author not found.</p>
      </main>
    )
  }

  return (
    <main className="article-page">
      <div className="article-breadcrumb">
        <div className="article-breadcrumb__inner">
          <nav aria-label="Breadcrumb">
            <ol className="article-breadcrumb__list">
              <li><Link to="/">gosocialsect.com</Link></li>
              <li aria-hidden><ChevronRight strokeWidth={1} className="article-breadcrumb__sep" /></li>
              <li><Link to="/insights">insights</Link></li>
              <li aria-hidden><ChevronRight strokeWidth={1} className="article-breadcrumb__sep" /></li>
              <li><Link to="/insights/blog">blog</Link></li>
              <li aria-hidden><ChevronRight strokeWidth={1} className="article-breadcrumb__sep" /></li>
              <li><span aria-current="page">{author.name}</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="article-layout">
        <header className="article-hero">
          <div className="article-hero__inner">
            <div className="author-profile">
              {author.image && (
                <img className="author-profile__image" src={author.image} alt={author.name} />
              )}
              <div className="author-profile__info">
                <h1 className="author-profile__name">{author.name}</h1>
                {author.bio && <p className="author-profile__bio">{author.bio}</p>}
                {author.socialLinks && author.socialLinks.length > 0 && (
                  <div className="author-profile__links">
                    {author.socialLinks.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="author-profile__link">
                        {link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {articles.length > 0 && (
          <section className="author-articles">
            <h2 className="author-articles__title">
              {articles.length === 1 ? '1 Article' : `${articles.length} Articles`}
            </h2>
            <div className="author-articles__grid">
              {articles.map((article) => {
                const imageUrl = article.featuredImage?.asset?.url
                return (
                  <article key={article._id} className="author-article-card">
                    {imageUrl && (
                      <Link to={`/insights/blog/${article.slug}`} className="author-article-card__image-link">
                        <img className="author-article-card__image" src={imageUrl} alt="" loading="lazy" />
                      </Link>
                    )}
                    <div className="author-article-card__body">
                      <p className="author-article-card__meta">
                        {article.readingTime || 'Article'}
                        {article.updatedAt
                          ? ` · Updated ${formatDate(article.updatedAt)}`
                          : article.publishedAt
                            ? ` · ${formatDate(article.publishedAt)}`
                            : ''}
                      </p>
                      <h3 className="author-article-card__title">
                        <Link to={`/insights/blog/${article.slug}`}>{article.title}</Link>
                      </h3>
                      <p className="author-article-card__excerpt">{article.excerpt || article.metaDescription}</p>
                      <Link to={`/insights/blog/${article.slug}`} className="blog-card__cta">
                        Read article
                        <ArrowRight strokeWidth={1} aria-hidden />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
