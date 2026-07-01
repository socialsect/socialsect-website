import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import AboutPage from '@/views/about/AboutPage'

const cfg = getSeoConfig('/about')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <AboutPage />
    </>
  )
}
