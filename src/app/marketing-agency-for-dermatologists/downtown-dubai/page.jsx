import DermatologistLandingPage from '@/views/dermatologists/DermatologistLandingPage'
import { getDermatologistsSeoLandingData } from '@/views/dermatologists/dermatologistsSeoData.js'

export async function generateMetadata() {
  const data = getDermatologistsSeoLandingData('marketing-agency-for-dermatologists-downtown-dubai')
  if (!data) return {}

  const canonicalUrl = 'https://gosocialsect.com/marketing-agency-for-dermatologists/downtown-dubai'

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
      <DermatologistLandingPage pageSlug="marketing-agency-for-dermatologists-downtown-dubai" />
    </>
  )
}
