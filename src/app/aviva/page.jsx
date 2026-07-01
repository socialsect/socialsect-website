import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import AvivaPage from '@/views/aviva/AvivaPage'

const cfg = getSeoConfig('/aviva')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <AvivaPage />
    </>
  )
}
