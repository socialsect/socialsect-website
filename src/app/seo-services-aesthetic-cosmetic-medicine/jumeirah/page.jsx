import { getDubaiRegionLandingData } from '@/views/dubai/dubaiRegionData.js'
import DubaiRegionLandingPage from '@/views/dubai/DubaiRegionLandingPage'

const DATA_SLUG = 'seo-services-aesthetic-cosmetic-medicine-jumeirah'

export async function generateMetadata() {
  const data = getDubaiRegionLandingData(DATA_SLUG)
  if (!data) return {}

  const canonicalUrl = `https://gosocialsect.com${data.path}`

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: canonicalUrl,
      type: 'website',
    },
  }
}

export default async function Page() {
  return <DubaiRegionLandingPage pageSlug={DATA_SLUG} />
}
