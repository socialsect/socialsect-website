import { cache } from 'react'
import { getAuthorBySlug, getArticlesByAuthor } from '@/lib/articles'
import AuthorPage from '@/views/insights/AuthorPage'

const SITE_URL = 'https://gosocialsect.com'

const IS_REVIEW_MODE = process.env.NEXT_PUBLIC_REVIEW_MODE === 'true'

const getAuthor = cache(getAuthorBySlug)

export async function generateMetadata({ params }) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return {
      title: 'Author not found | Socialsect',
      robots: 'noindex, nofollow',
    }
  }

  const ogDescription = Array.isArray(author.bio)
    ? author.bio.map((b) => b.children?.map((c) => c.text).join('') || '').join(' ').slice(0, 160)
    : (author.bio || `Articles written by ${author.name} on Socialsect.`)

  if (IS_REVIEW_MODE) {
    return {
      title: `${author.name} | Socialsect Blog`,
      description: ogDescription,
      robots: 'noindex, nofollow, noarchive, nosnippet',
      openGraph: {
        siteName: 'Socialsect',
        locale: 'en_US',
        type: 'profile',
        title: `${author.name} | Socialsect Blog`,
        description: ogDescription,
        ...(author.image?.asset?.url && { images: [{ url: author.image.asset.url, width: 400, height: 400, alt: author.name }] }),
      },
    }
  }

  return {
    title: `${author.name} | Socialsect Blog`,
    description: ogDescription,
    alternates: { canonical: `${SITE_URL}/insights/blog/author/${slug}` },
    openGraph: {
      siteName: 'Socialsect',
      locale: 'en_US',
      type: 'profile',
      title: `${author.name} | Socialsect Blog`,
      description: ogDescription,
      url: `${SITE_URL}/insights/blog/author/${slug}`,
      ...(author.image?.asset?.url && { images: [{ url: author.image.asset.url, width: 400, height: 400, alt: author.name }] }),
    },
  }
}

export default async function Page({ params }) {
  const { slug: authorSlug } = await params
  const [author, articles] = await Promise.all([
    getAuthorBySlug(authorSlug),
    getArticlesByAuthor(authorSlug),
  ])
  return <AuthorPage author={author} articles={articles} />
}
