import { cache } from 'react'
import { getArticleBySlug } from '@/lib/articles'
import BlogArticlePage from '@/views/insights/BlogArticlePage'

const SITE_URL = 'https://gosocialsect.com'
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const DEFAULT_IMAGE = `${SITE_URL}/social-share.png`
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Socialsect',
  url: SITE_URL,
}

// Deduplicate the Sanity fetch  called once in generateMetadata and once in Page
const getArticle = cache(getArticleBySlug)

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await getArticle(slug)

  const title = article
    ? `${article.metaTitle || article.title} | Socialsect`
    : 'Socialsect Blog | Healthcare Marketing Insights'
  const description =
    article?.metaDescription ||
    article?.excerpt ||
    'Expert articles for private medical practice growth, SEO, paid media, and conversion from Socialsect.'
  const image = article?.featuredImage?.asset?.url ?? DEFAULT_IMAGE
  const canonical = article?.canonicalUrl || `${SITE_URL}/insights/blog/${slug}`
  const robots = article?.robots || DEFAULT_ROBOTS

  return {
    title,
    description,
    robots,
    alternates: { canonical },
    openGraph: {
      siteName: 'Socialsect',
      locale: 'en_US',
      type: 'article',
      title,
      description,
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(article?.updatedAt
        ? { publishedTime: article.updatedAt, modifiedTime: article.updatedAt }
        : article?.publishedAt && { publishedTime: article.publishedAt }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@thesocialsect',
      creator: '@thesocialsect',
      title,
      description,
      images: [image],
    },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const article = await getArticle(slug)

  const title = article
    ? `${article.metaTitle || article.title} | Socialsect`
    : 'Socialsect Blog | Healthcare Marketing Insights'
  const image = article?.featuredImage?.asset?.url ?? DEFAULT_IMAGE
  const canonical = article?.canonicalUrl || `${SITE_URL}/insights/blog/${slug}`

  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': article.schemaType || 'Article',
        headline: article.title,
        description: article.metaDescription || article.excerpt || '',
        image,
        url: canonical,
        datePublished: article.updatedAt || article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: { '@type': 'Organization', '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        ...(article.faqs?.length && {
          mainEntity: {
            '@type': 'FAQPage',
            mainEntity: article.faqs.map(({ question, answer }) => ({
              '@type': 'Question',
              name: question,
              acceptedAnswer: { '@type': 'Answer', text: answer },
            })),
          },
        }),
      }
    : null

  const schemas = [ORG_SCHEMA, ...(articleSchema ? [articleSchema] : [])]

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          suppressHydrationWarning
        />
      ))}
      <BlogArticlePage article={article} />
    </>
  )
}
