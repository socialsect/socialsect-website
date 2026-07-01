import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import WhoWeHelpPage from '@/views/who-we-help/WhoWeHelpPage'

const cfg = getSeoConfig('/who-we-help')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <WhoWeHelpPage />
    </>
  )
}
