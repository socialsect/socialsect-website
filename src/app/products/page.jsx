import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ProductsPage from '@/views/products/ProductsPage'

const cfg = getSeoConfig('/products')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <ProductsPage />
    </>
  )
}
