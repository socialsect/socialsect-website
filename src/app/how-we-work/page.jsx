import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import HowWeWorkPage from '@/views/how-we-work/HowWeWorkPage'

const cfg = getSeoConfig('/how-we-work')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <HowWeWorkPage />
    </>
  )
}
