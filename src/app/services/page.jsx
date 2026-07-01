import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ServicesPage from '@/views/services/ServicesPage'

const cfg = getSeoConfig('/services')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <ServicesPage />
    </>
  )
}
