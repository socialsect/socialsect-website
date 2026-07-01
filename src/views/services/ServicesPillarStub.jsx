'use client'
import { Link, Navigate, useParams } from 'react-router-dom'
import './ServicesPillarStub.css'

const VALID = new Set(['build', 'grow', 'brand'])

export default function ServicesPillarStub() {
  const { pillar } = useParams()
  if (!VALID.has(pillar)) {
    return <Navigate to="/services" replace />
  }
  const title = pillar.charAt(0).toUpperCase() + pillar.slice(1)
  return (
    <main className="services-pillar-stub">
      <div className="services-pillar-stub__inner">
        <Link to="/services" className="services-pillar-stub__back">
          ← Back to Services
        </Link>
        <h1 className="services-pillar-stub__title">{title}</h1>
        <p className="services-pillar-stub__lede">This section is coming soon.</p>
      </div>
    </main>
  )
}
