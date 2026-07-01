import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import VisibilityPage from '@/views/visibility/index'

const cfg = getSeoConfig('/where-your-implant-practice-is-going-wrong')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <VisibilityPage />
    </>
  )
}
