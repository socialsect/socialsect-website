import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import UAEPage from '@/views/uae/UAEPage'

const cfg = getSeoConfig('/uae')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <UAEPage />
    </>
  )
}
