import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import SpecialtyPageRoute from '@/views/who-we-help/SpecialtyPageRoute'

export async function generateMetadata({ params }) {
  const { specialty } = await params
  return toNextMetadata(getSeoConfig(`/who-we-help/${specialty}`))
}

export default async function Page({ params }) {
  const { specialty } = await params
  const cfg = getSeoConfig(`/who-we-help/${specialty}`)
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <SpecialtyPageRoute />
    </>
  )
}
