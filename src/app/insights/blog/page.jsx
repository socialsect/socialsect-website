import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import { getArticles } from '@/lib/articles'
import JsonLd from '@/components/JsonLd'
import BlogPage from '@/views/insights/BlogPage'

const cfg = getSeoConfig('/insights/blog')
export const metadata = toNextMetadata(cfg)

export default async function Page() {
  const articles = await getArticles()
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <BlogPage articles={articles} />
    </>
  )
}
