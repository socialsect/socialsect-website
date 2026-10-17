import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ContactPage from '@/views/contact/ContactPage'

const cfg = getSeoConfig('/contact')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <ContactPage />
    </>
  )
}
