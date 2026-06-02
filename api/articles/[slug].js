/**
 * Server-side API endpoint for fetching blog article metadata
 * Safe for middleware to call (uses Node.js runtime, not Edge runtime)
 * Returns only metadata needed for SEO and OG tags
 */
import { getArticleBySlug } from '../../src/lib/articles.js'

export default async function handler(req, res) {
  const { slug } = req.query

  if (!slug) {
    return res.status(400).json({ error: 'Slug is required' })
  }

  try {
    const article = await getArticleBySlug(slug)

    if (!article) {
      return res.status(404).json({ error: 'Article not found' })
    }

    // Extract only metadata needed for middleware (OG tags, SEO)
    const metadata = {
      title: article.metaTitle || article.title || 'Socialsect',
      description: article.metaDescription || article.excerpt || '',
      image: article.featuredImage?.asset?.url || null,
      canonical: article.canonicalUrl || null,
      robots: article.robots || null,
      slug: article.slug,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      type: 'article',
    }

    // Cache for 1 hour on CDN, revalidate after 5 minutes
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=300')
    return res.status(200).json(metadata)
  } catch (err) {
    console.error(`Error fetching article metadata for slug ${slug}:`, err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
