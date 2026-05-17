import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const ARTICLES = [
  {
    id: 'slow-january',
    category: 'Patient acquisition',
    title: 'Why your slow January isn\u2019t a seasonality problem',
    meta: '8 min read · All specialties',
  },
  {
    id: 'meta-leads',
    category: 'Lead quality',
    title: 'The real reason your Meta leads don\u2019t show up',
    meta: '7 min read · Paid ads',
  },
  {
    id: 'website-convert',
    category: 'Website + SEO',
    title: 'What a private practice website actually needs to convert',
    meta: '6 min read · All specialties',
  },
]

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
          <Link to="/insights/blog" className="insights-block__head-cta">
            Read all articles
            <ArrowRight className="insights-block__cta-icon" strokeWidth={1} aria-hidden />
          </Link>
        </header>

        <ul className="insights-articles">
          {ARTICLES.map((article) => (
            <li key={article.id}>
              <article className="insights-article-card">
                <div className="insights-article-card__thumb" aria-hidden>
                  <span className="insights-article-card__thumb-label">Article thumbnail</span>
                </div>
                <div className="insights-article-card__body">
                  <p className="insights-article-card__category">{article.category}</p>
                  <h3 className="insights-article-card__title">&ldquo;{article.title}&rdquo;</h3>
                  <p className="insights-article-card__meta">{article.meta}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="insights-block__footer">
          <Link to="/insights/blog" className="insights-block__footer-cta">
            Read all articles
            <ArrowRight className="insights-block__cta-icon" strokeWidth={1} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
