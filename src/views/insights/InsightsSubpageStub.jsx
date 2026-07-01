'use client'

import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './InsightsSubpageStub.css'

export default function InsightsSubpageStub({ title, lede }) {
  return (
    <main className="insights-stub">
      <div className="insights-stub__inner">
        <Link to="/insights" className="insights-stub__back">
          <ArrowLeft strokeWidth={1} aria-hidden />
          Back to Insights
        </Link>
        <h1 className="insights-stub__title">{title}</h1>
        <p className="insights-stub__lede">{lede}</p>
      </div>
    </main>
  )
}
