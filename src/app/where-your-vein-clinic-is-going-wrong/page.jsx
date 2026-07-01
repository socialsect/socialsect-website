import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import VeinVisibilityPage from '@/views/visibility/vein'

const cfg = getSeoConfig('/where-your-vein-clinic-is-going-wrong')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <VeinVisibilityPage />
    </>
  )
}
