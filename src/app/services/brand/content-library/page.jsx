import ContentLibrary from '@/views/services/ContentLibrary'

export function generateMetadata() {
  const isReviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE === 'true'

  if (isReviewMode) {
    return {
      title: 'Content Library | Socialsect',
      description: 'Browse our collection of ads we\'ve shot, cut, and shipped for orthopaedic, dermatology, dental, med spa, and vascular practices.',
      robots: 'noindex, nofollow, noarchive, nosnippet',
      openGraph: {
        siteName: 'Socialsect',
        locale: 'en_US',
        type: 'website',
        title: 'Content Library | Socialsect',
        description: 'Browse our collection of ads we\'ve shot, cut, and shipped for orthopaedic, dermatology, dental, med spa, and vascular practices.',
      },
    }
  }

  return {
    title: 'Content Library | Socialsect',
    description: 'Browse our collection of ads we\'ve shot, cut, and shipped for orthopaedic, dermatology, dental, med spa, and vascular practices.',
    alternates: { canonical: 'https://gosocialsect.com/services/brand/content-library' },
    openGraph: {
      siteName: 'Socialsect',
      locale: 'en_US',
      type: 'website',
      title: 'Content Library | Socialsect',
      description: 'Browse our collection of ads we\'ve shot, cut, and shipped for orthopaedic, dermatology, dental, med spa, and vascular practices.',
      url: 'https://gosocialsect.com/services/brand/content-library',
    },
  }
}

export default function Page() {
  return <ContentLibrary />
}
