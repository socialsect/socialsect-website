import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import RegionLandingPage from '@/views/dermatologists/RegionLandingPage'
import DermatologistLandingPage from '@/views/dermatologists/DermatologistLandingPage'
import { getDermatologistsSeoLandingData } from '@/views/dermatologists/dermatologistsSeoData.js'

export async function generateMetadata({ params }) {
  const { pageSlug } = await params
  return toNextMetadata(getSeoConfig(`/seo-services-for-dermatologists/${pageSlug}`))
}

export default async function Page({ params }) {
  const { pageSlug } = await params
  const cfg = getSeoConfig(`/seo-services-for-dermatologists/${pageSlug}`)
  
  const isNewLayout = !!getDermatologistsSeoLandingData(pageSlug)

  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      {isNewLayout ? <DermatologistLandingPage pageSlug={pageSlug} /> : <RegionLandingPage />}
    </>
  )
}
