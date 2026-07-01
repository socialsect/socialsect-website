import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ServicesPillarStub from '@/views/services/ServicesPillarStub'

export async function generateMetadata({ params }) {
  const { pillar } = await params
  return toNextMetadata(getSeoConfig(`/services/${pillar}`))
}

export default async function Page({ params }) {
  const { pillar } = await params
  const cfg = getSeoConfig(`/services/${pillar}`)
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <ServicesPillarStub />
    </>
  )
}
