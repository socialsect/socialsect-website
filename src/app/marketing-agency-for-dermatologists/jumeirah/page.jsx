import DermatologistLandingPage from '@/views/dermatologists/DermatologistLandingPage'
import { getDermatologistsSeoLandingData } from '@/views/dermatologists/dermatologistsSeoData.js'

export async function generateMetadata() {
  const data = getDermatologistsSeoLandingData('marketing-agency-for-dermatologists-jumeirah')
  if (!data) return {}

  const canonicalUrl = 'https://gosocialsect.com/marketing-agency-for-dermatologists/jumeirah'

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
  return (
    <>
      <DermatologistLandingPage pageSlug="marketing-agency-for-dermatologists-jumeirah" />
    </>
  )
}
