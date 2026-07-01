import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import RegionLandingPage from '@/views/dermatologists/RegionLandingPage'

export async function generateMetadata({ params }) {
  const { pageSlug } = await params
  return toNextMetadata(getSeoConfig(`/seo-services-for-dermatologists/${pageSlug}`))
}

export default async function Page({ params }) {
  const { pageSlug } = await params
  const cfg = getSeoConfig(`/seo-services-for-dermatologists/${pageSlug}`)
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <RegionLandingPage />
    </>
  )
}
