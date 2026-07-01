import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import PrivacyPolicyPage from '@/views/privacy/PrivacyPolicyPage'

const cfg = getSeoConfig('/privacy-policy')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <PrivacyPolicyPage />
    </>
  )
}
