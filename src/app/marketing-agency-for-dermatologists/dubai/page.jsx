import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import DermatologistLandingPage from '@/views/dermatologists/DermatologistLandingPage'
import { getDermatologistsSeoLandingData } from '@/views/dermatologists/dermatologistsSeoData.js'

export async function generateMetadata() {
  const data = getDermatologistsSeoLandingData('marketing-agency-for-dermatologists-dubai')
  if (!data) return {}

  const canonicalUrl = 'https://gosocialsect.com/marketing-agency-for-dermatologists/dubai'
  
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: canonicalUrl,
      type: 'website'
    }
  }
}

export default async function Page() {
  const dataSlug = 'marketing-agency-for-dermatologists-dubai'
  
  return (
    <>
      <DermatologistLandingPage pageSlug={dataSlug} />
    </>
  )
}
