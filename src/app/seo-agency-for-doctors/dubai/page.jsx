import { getDermatologistsSeoLandingData } from '@/views/dermatologists/dermatologistsSeoData.js'
import DermatologistLandingPage from '@/views/dermatologists/DermatologistLandingPage'

export async function generateMetadata() {
  const data = getDermatologistsSeoLandingData('seo-agency-for-doctors-dubai')
  if (!data) return {}

  const canonicalUrl = 'https://gosocialsect.com/seo-agency-for-doctors/dubai'
  
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
  const dataSlug = 'seo-agency-for-doctors-dubai'
  
  return (
    <>
      <DermatologistLandingPage pageSlug={dataSlug} />
    </>
  )
}
