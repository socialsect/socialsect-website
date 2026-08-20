import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import DubaiPage from '@/views/dubai/DubaiPage'

const cfg = getSeoConfig('/dubai')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <DubaiPage />
    </>
  )
}