import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import TestimonialsPage from '@/views/insights/TestimonialsPage'

const cfg = getSeoConfig('/insights/testimonials')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <TestimonialsPage />
    </>
  )
}
