import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { getOrthopaedicSeoLandingData } from '@/views/orthopaedic-surgeons/orthopaedicSurgeonsSeoData.js'
import OrthopaedicSurgeonsSeoLandingPage from '@/views/orthopaedic-surgeons/OrthopaedicSurgeonsSeoLandingPage'

const PAGE_SLUG = 'seo-services-orthopaedic-surgeons-seattle'

export function generateMetadata() {
  const data = getOrthopaedicSeoLandingData(PAGE_SLUG)
  if (!data) return toNextMetadata(getSeoConfig('/'))
  return toNextMetadata(getSeoConfig(data.path))
}

export default function Page() {
  const data = getOrthopaedicSeoLandingData(PAGE_SLUG)
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
      <OrthopaedicSurgeonsSeoLandingPage pageSlug={PAGE_SLUG} />
    </>
  )
}
