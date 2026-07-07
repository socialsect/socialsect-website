import { cache } from 'react'
import { getAuthorBySlug } from '@/lib/articles'
import AuthorPage from '@/views/insights/AuthorPage'

const SITE_URL = 'https://gosocialsect.com'

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

  return {
    title: `${author.name} | Socialsect Blog`,
    description: author.bio || `Articles written by ${author.name} on Socialsect.`,
    alternates: { canonical: `${SITE_URL}/insights/blog/author/${slug}` },
    openGraph: {
      siteName: 'Socialsect',
      locale: 'en_US',
      type: 'profile',
      title: `${author.name} | Socialsect Blog`,
      description: author.bio,
      url: `${SITE_URL}/insights/blog/author/${slug}`,
      ...(author.image && { images: [{ url: author.image, width: 400, height: 400, alt: author.name }] }),
    },
  }
}

export default async function Page({ params }) {
  return <AuthorPage />
}
