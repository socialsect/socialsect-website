import { Compass } from 'lucide-react'

export default function NotFoundIllustration() {
  return (
    <div className="not-found__icon-wrap" aria-hidden>
      <Compass className="not-found__compass" strokeWidth={1} />
    </div>
  )
}
