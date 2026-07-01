import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ResourcesPage from '@/views/insights/ResourcesPage'

const cfg = getSeoConfig('/insights/resources')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <ResourcesPage />
    </>
  )
}
