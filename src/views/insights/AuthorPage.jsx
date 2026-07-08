'use client'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { getAuthorBySlug, getArticlesByAuthor } from '../../lib/articles'
import './AuthorPage.css'

function extractBioText(bio) {
  if (!bio) return ''
  if (typeof bio === 'string') return bio
  if (Array.isArray(bio)) {
    return bio
      .map((block) =>
        block._type === 'block' && block.children
          ? block.children.map((c) => c.text || '').join('')
          : '',
      )
      .join('\n')
  }
  return ''
}

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export default function AuthorPage({ author: initialAuthor, articles: initialArticles }) {
  const { slug } = useParams()
  const [author, setAuthor] = useState(initialAuthor || null)
  const [articles, setArticles] = useState(initialArticles || [])
  const [loading, setLoading] = useState(!initialAuthor)

  useEffect(() => {
    if (initialAuthor) return
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
  }, [slug, initialAuthor])

  if (loading) {
    return (
      <main className="author-page">
        <p className="author-page__state">Loading author...</p>
      </main>
    )
  }

  if (!author) {
    return (
      <main className="author-page">
        <p className="author-page__state">Author not found.</p>
      </main>
    )
  }

  return (
    <main className="author-page">
      <div className="author-page__breadcrumb">
        <div className="author-page__breadcrumb-inner">
          <nav aria-label="Breadcrumb">
            <ol className="author-page__breadcrumb-list">
              <li><Link to="/">gosocialsect.com</Link></li>
              <li aria-hidden><ChevronRight strokeWidth={1} className="author-page__breadcrumb-sep" /></li>
              <li><Link to="/insights">insights</Link></li>
              <li aria-hidden><ChevronRight strokeWidth={1} className="author-page__breadcrumb-sep" /></li>
              <li><Link to="/insights/blog">blog</Link></li>
              <li aria-hidden><ChevronRight strokeWidth={1} className="author-page__breadcrumb-sep" /></li>
              <li><span aria-current="page">{author.name}</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="author-page__hero">
        <div className="author-page__hero-inner">
          <div className="author-page__profile">
            {author.image?.asset?.url && (
              <img className="author-page__avatar" src={author.image.asset.url} alt={author.name} />
            )}
            <div className="author-page__info">
              <h1 className="author-page__name">{author.name}</h1>
              {author.bio && <p className="author-page__bio">{extractBioText(author.bio)}</p>}
              {author.socialLinks && author.socialLinks.length > 0 && (
                <div className="author-page__links">
                  {author.socialLinks.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="author-page__link">
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {articles.length > 0 && (
        <section className="author-page__articles">
          <div className="author-page__articles-inner">
            <h2 className="author-page__articles-title">
              {articles.length === 1 ? '1 Article' : `${articles.length} Articles`}
            </h2>
            <div className="author-page__grid">
              {articles.map((article) => {
                const imageUrl = article.featuredImage?.asset?.url
                return (
                  <article key={article._id} className="author-page__card">
                    {imageUrl && (
                      <Link to={`/insights/blog/${article.slug}`} className="author-page__card-image-link">
                        <img className="author-page__card-image" src={imageUrl} alt="" loading="lazy" />
                      </Link>
                    )}
                    <div className="author-page__card-body">
                      <p className="author-page__card-meta">
                        {article.readingTime || 'Article'}
                        {article.updatedAt
                          ? ` · Updated ${formatDate(article.updatedAt)}`
                          : article.publishedAt
                            ? ` · ${formatDate(article.publishedAt)}`
                            : ''}
                      </p>
                      <h3 className="author-page__card-title">
                        <Link to={`/insights/blog/${article.slug}`}>{article.title}</Link>
                      </h3>
                      <p className="author-page__card-excerpt">{article.excerpt || article.metaDescription}</p>
                      <Link to={`/insights/blog/${article.slug}`} className="author-page__card-cta">
                        Read article
                        <ArrowRight strokeWidth={1} aria-hidden />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
