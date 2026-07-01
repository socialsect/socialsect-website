import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ClientPortalPage from '@/views/client-portal/ClientPortalPage'

const cfg = getSeoConfig('/client-portal')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <ClientPortalPage />
    </>
  )
}
