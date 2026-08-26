import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import DentistLandingPage from '@/views/dentists/DentistLandingPage'

const PAGE_SLUG = 'seo-services-for-dentists-in-atlanta'
const seo = getSeoConfig(`/${PAGE_SLUG}`)
export const metadata = toNextMetadata(seo)

export default function Page() {
  return <DentistLandingPage pageSlug={PAGE_SLUG} />
}
