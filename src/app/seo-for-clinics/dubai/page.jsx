import { getDermatologistsSeoLandingData } from '@/views/dermatologists/dermatologistsSeoData.js'
import DermatologistLandingPage from '@/views/dermatologists/DermatologistLandingPage'

export async function generateMetadata() {
  const data = getDermatologistsSeoLandingData('seo-for-clinics-dubai')
  if (!data) return {}

  const canonicalUrl = 'https://gosocialsect.com/seo-for-clinics/dubai'
  
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
  const dataSlug = 'seo-for-clinics-dubai'
  
  return (
    <>
      <DermatologistLandingPage pageSlug={dataSlug} />
    </>
  )
}
