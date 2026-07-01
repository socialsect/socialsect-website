import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import InsightsPage from '@/views/insights/InsightsPage'

const cfg = getSeoConfig('/insights')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <InsightsPage />
    </>
  )
}
