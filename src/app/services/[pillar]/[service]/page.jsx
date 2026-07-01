import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ServiceDetailRoute from '@/views/services/ServiceDetailRoute'

export async function generateMetadata({ params }) {
  const { pillar, service } = await params
  return toNextMetadata(getSeoConfig(`/services/${pillar}/${service}`))
}

export default async function Page({ params }) {
  const { pillar, service } = await params
  const cfg = getSeoConfig(`/services/${pillar}/${service}`)
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <ServiceDetailRoute />
    </>
  )
}
