'use client'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { getArticleBySlug } from '../../lib/articles'
import InlineBlogForm from '../../components/InlineBlogForm'
import './BlogArticlePage.css'

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

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset?.url
      if (!imageUrl) return null

      return <img className="article-body__image" src={imageUrl} alt={value.alt || ''} loading="lazy" />
    },
  },
  block: {
    h2: ({ children }) => <h2 className="article-body__heading">{children}</h2>,
    h3: ({ children }) => <h3 className="article-body__subheading">{children}</h3>,
    normal: ({ children }) => <p className="article-body__paragraph">{children}</p>,
    blockquote: ({ children }) => <blockquote className="article-body__quote">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="article-body__list">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="article-body__list-item">{children}</li>,
  },
}

export default function BlogArticlePage({ article: initialArticle }) {
  const { slug } = useParams()
  const [article, setArticle] = useState(initialArticle || null)
  const [loading, setLoading] = useState(!initialArticle)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialArticle) return
    let isMounted = true

    async function loadArticle() {
      try {
        const data = await getArticleBySlug(slug)
        if (isMounted) {
          setArticle(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load article')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadArticle()

    return () => {
      isMounted = false
    }
  }, [slug, initialArticle])

  if (loading) {
    return (
      <main className="article-page">
        <p className="article-page__state">Loading article...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="article-page">
        <p className="article-page__state" role="alert">
          {error}
        </p>
      </main>
    )
  }

  if (!article) {
    return (
      <main className="article-page">
        <p className="article-page__state">Article not found.</p>
      </main>
    )
  }

  const imageUrl = article.featuredImage?.asset?.url
  const imageAlt = article.featuredImageAlt || article.title

  return (
    <main className="article-page">

      <article className="article-layout">
        <header className="article-hero">
          <div className="article-hero__inner">
            <p className="article-hero__meta">
              {article.readingTime || 'Article'}
              {article.updatedAt
                ? ` · Updated ${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(article.updatedAt))}`
                : article.publishedAt
                  ? ` · ${new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(article.publishedAt))}`
                  : ''}
            </p>
            <h1 className="article-hero__title">{article.title}</h1>
            {article.excerpt && <p className="article-hero__excerpt">{article.excerpt}</p>}
          </div>
        </header>

        {imageUrl && (
          <figure className="article-featured-image">
            <img src={imageUrl} alt={imageAlt} />
          </figure>
        )}

        <div className="article-body">
          {(() => {
            const blocks = article.body || []
            const mid = Math.floor(blocks.length / 2)
            const firstHalf = blocks.slice(0, mid)
            const secondHalf = blocks.slice(mid)
            return (
              <>
                <PortableText value={firstHalf} components={portableTextComponents} />
                <InlineBlogForm />
                <PortableText value={secondHalf} components={portableTextComponents} />
              </>
            )
          })()}
        </div>

        {article.author && (
          <div className="article-author">
            <div className="article-author__inner">
                {article.author.image?.asset?.url && (
                  <img
                    className="article-author__image"
                    src={article.author.image.asset.url}
                    alt={article.author.name}
                  />
                )}
              <div className="article-author__info">
                <p className="article-author__name">
                  {article.author.slug ? (
                    <Link to={`/insights/blog/author/${article.author.slug}`}>
                      {article.author.name}
                    </Link>
                  ) : (
                    article.author.name
                  )}
                </p>
                {article.author.bio && (
                  <p className="article-author__bio">
                    {extractBioText(article.author.bio).slice(0, 120)}
                    {extractBioText(article.author.bio).length > 120 && (
                      <>
                        ...{' '}
                        <Link to={`/insights/blog/author/${article.author.slug}`} className="article-author__read-more">
                          Read more
                        </Link>
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {Array.isArray(article.faqs) && article.faqs.length > 0 && (
          <section className="article-faqs" aria-labelledby="article-faqs-heading">
            <h2 id="article-faqs-heading" className="article-faqs__title">
              FAQs
            </h2>
            <div className="article-faqs__list">
              {article.faqs.map((faq, index) => (
                <details key={`${faq.question}-${index}`} className="article-faq">
                  <summary className="article-faq__question">{faq.question}</summary>
                  <p className="article-faq__answer">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  )
}