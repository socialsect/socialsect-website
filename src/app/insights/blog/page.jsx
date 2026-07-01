import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import BlogPage from '@/views/insights/BlogPage'

const cfg = getSeoConfig('/insights/blog')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <BlogPage />
    </>
  )
}
