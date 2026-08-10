import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import PreloadCarouselVideos from '@/components/PreloadCarouselVideos'
import HomePageClient from '@/views/homepage/homepage'

const cfg = getSeoConfig('/')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <PreloadCarouselVideos />
      <HomePageClient />
    </>
  )
}
