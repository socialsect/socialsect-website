import ContentLibrary from '@/views/services/ContentLibrary'

export const metadata = {
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

export default function Page() {
  return <ContentLibrary />
}
