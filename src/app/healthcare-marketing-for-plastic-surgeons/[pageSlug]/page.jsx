import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import PlasticSurgeonLandingPage from '@/views/plastic-surgeons/PlasticSurgeonLandingPage'

export async function generateMetadata({ params }) {
  const { pageSlug } = await params
  return toNextMetadata(getSeoConfig(`/healthcare-marketing-for-plastic-surgeons/${pageSlug}`))
}

export default async function Page({ params }) {
  const { pageSlug } = await params
  const cfg = getSeoConfig(`/healthcare-marketing-for-plastic-surgeons/${pageSlug}`)
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <PlasticSurgeonLandingPage />
    </>
  )
}
