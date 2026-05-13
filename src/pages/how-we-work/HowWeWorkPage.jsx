import { Link } from 'react-router-dom'
import './HowWeWorkPage.css'

export default function HowWeWorkPage() {
  return (
    <main className="how-we-work-page">
      <div className="how-we-work-page__inner">
        <Link to="/" className="how-we-work-page__back">
          ← Home
        </Link>
        <h1 className="how-we-work-page__title">How we work</h1>
        <p className="how-we-work-page__lede">This page is coming soon.</p>
      </div>
    </main>
  )
}
