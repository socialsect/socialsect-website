import { toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import { getPlasticSurgeonLandingData } from '@/views/plastic-surgeons/plasticSurgeonLandingData.js'
import PlasticSurgeonLandingPage from '@/views/plastic-surgeons/PlasticSurgeonLandingPage'

const PAGE_SLUG = 'seo-services-for-plastic-surgeons-miami'

export function generateMetadata() {
  const data = getPlasticSurgeonLandingData(PAGE_SLUG)
  if (!data) return toNextMetadata({ title: 'Socialsect' })
  return toNextMetadata({
    title: data.metaTitle,
    description: data.metaDescription,
    canonicalUrl: 'https://gosocialsect.com' + data.path,
    robots: 'index,follow',
    ogType: 'website',
  })
}

export default function Page() {
  const data = getPlasticSurgeonLandingData(PAGE_SLUG)
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
      <PlasticSurgeonLandingPage pageSlug={PAGE_SLUG} />
    </>
  )
}
