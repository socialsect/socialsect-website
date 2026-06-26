'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BLOG_ARTICLES } from './blogData'

// Get the 3 most recent featured articles
const ARTICLES = BLOG_ARTICLES.slice(0, 3).map((article) => ({
  id: article.id,
  slug: article.slug,
  category: article.category,
  title: article.title,
  meta: `${article.readTime} · ${article.specialtyLabel}`,
}))

export default function InsightsBlogSection() {
  return (
    <section
      id="blog"
      className="insights-block insights-block--blog"
      aria-labelledby="insights-blog-heading"
    >
      <div className="insights-block__inner">
        <header className="insights-block__head">
          <div className="insights-block__head-main">
            <p className="insights-block__label">Blog</p>
            <h2 id="insights-blog-heading" className="insights-block__title">
              Latest from the blog
            </h2>
          </div>
          <Link href="/insights/blog" className="insights-block__head-cta">
            Read all articles
            <ArrowRight className="insights-block__cta-icon" strokeWidth={1} aria-hidden />
          </Link>
        </header>

        <ul className="insights-articles">
          {ARTICLES.map((article) => (
            <li key={article.id}>
              <Link href={`/insights/blog/${article.slug}`}>
                <article className="insights-article-card">
                  <div className="insights-article-card__thumb" aria-hidden>
                    <span className="visually-hidden">Article thumbnail</span>
                  </div>
                  <div className="insights-article-card__body">
                    <p className="insights-article-card__category">{article.category}</p>
                    <h3 className="insights-article-card__title">&ldquo;{article.title}&rdquo;</h3>
                    <p className="insights-article-card__meta">{article.meta}</p>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>

        <div className="insights-block__footer">
          <Link href="/insights/blog" className="insights-block__footer-cta">
            Read all articles
            <ArrowRight className="insights-block__cta-icon" strokeWidth={1} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
