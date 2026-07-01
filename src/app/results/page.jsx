import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import ResultsPage from '@/views/results/ResultsPage'

const cfg = getSeoConfig('/results')
export const metadata = toNextMetadata(cfg)

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <ResultsPage />
    </>
  )
}
