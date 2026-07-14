import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import OrmLandingPage from '@/views/orthopaedic/OrmLandingPage'

export async function generateMetadata({ params }) {
  const { pageSlug } = await params
  return toNextMetadata(getSeoConfig(`/orm-for-orthopaedic-surgeons/${pageSlug}`))
}

export default async function Page({ params }) {
  const { pageSlug } = await params
  const cfg = getSeoConfig(`/orm-for-orthopaedic-surgeons/${pageSlug}`)
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <OrmLandingPage />
    </>
  )
}
