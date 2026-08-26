import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import DentistLandingPage from '@/views/dentists/DentistLandingPage'

const PAGE_SLUG = 'seo-services-for-dentists-in-houston'

export async function generateMetadata() {
  return toNextMetadata(getSeoConfig(`/${PAGE_SLUG}`))
}

export default function Page() {
  const cfg = getSeoConfig(`/${PAGE_SLUG}`)
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <DentistLandingPage pageSlug={PAGE_SLUG} />
    </>
  )
}
