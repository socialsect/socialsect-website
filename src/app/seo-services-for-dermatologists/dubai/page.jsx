import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { getDermatologistsSeoLandingData } from '@/views/dermatologists/dermatologistsSeoData.js'
import DermatologistLandingPage from '@/views/dermatologists/DermatologistLandingPage'

const PAGE_SLUG = 'dubai'

export function generateMetadata() {
  const data = getDermatologistsSeoLandingData(PAGE_SLUG)
  if (!data) return toNextMetadata(getSeoConfig('/'))
  return toNextMetadata(getSeoConfig(data.path))
}

export default function Page() {
  const data = getDermatologistsSeoLandingData(PAGE_SLUG)
  if (!data) return null
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: data.metaTitle,
    description: data.metaDescription,
    url: 'https://gosocialsect.com' + data.path,
  }
  return (
    <>
      <JsonLd data={jsonLd} />
      <DermatologistLandingPage pageSlug={PAGE_SLUG} />
    </>
  )
}
