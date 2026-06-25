import { getArticleBySlug } from '@/lib/articles.js'

export async function GET(request, { params }) {
  const { slug } = await params

  if (!slug) {
    return Response.json({ error: 'Slug is required' }, { status: 400 })
  }

  try {
    const article = await getArticleBySlug(slug)

    if (!article) {
      return Response.json({ error: 'Article not found' }, { status: 404 })
    }

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

    return Response.json(metadata, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300',
      },
    })
  } catch (err) {
    console.error(`Error fetching article metadata for slug ${slug}:`, err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
