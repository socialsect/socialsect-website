import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import BookACallPage from '@/views/book-a-call/BookACallPage'

const cfg = getSeoConfig('/book-a-call')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <BookACallPage />
    </>
  )
}
