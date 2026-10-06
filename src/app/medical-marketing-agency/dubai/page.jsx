import { getDermatologistsSeoLandingData } from '@/views/dermatologists/dermatologistsSeoData.js'
import DermatologistLandingPage from '@/views/dermatologists/DermatologistLandingPage'

export async function generateMetadata() {
  const data = getDermatologistsSeoLandingData('medical-marketing-agency-dubai')
  if (!data) return {}

  const canonicalUrl = 'https://gosocialsect.com/medical-marketing-agency/dubai'
  
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
  const dataSlug = 'medical-marketing-agency-dubai'
  
  return (
    <>
      <DermatologistLandingPage pageSlug={dataSlug} />
    </>
  )
}
