import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import dynamic from 'next/dynamic'
import HomePageClient from '@/views/homepage/homepage'

const PreloadCarouselVideos = dynamic(() => import('@/components/PreloadCarouselVideos'), { ssr: false })

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
