import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import NotFoundPage from '@/views/not-found/NotFoundPage'

const cfg = getSeoConfig('/404')
export const metadata = toNextMetadata(cfg)

export default function NotFound() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <NotFoundPage />
    </>
  )
}
