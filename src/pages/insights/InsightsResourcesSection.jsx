import { Link } from 'react-router-dom'
import { ArrowRight, FileText, ListChecks, ClipboardList } from 'lucide-react'

const RESOURCES = [
  {
    id: 'diagnostic',
    type: 'Guide',
    Icon: FileText,
    title: 'Practice Growth Diagnostic',
    cta: 'Download free',
  },
  {
    id: 'checklist',
    type: 'Checklist',
    Icon: ListChecks,
    title: 'Pre-slow-season checklist',
    cta: 'Download free',
  },
  {
    id: 'brief',
    type: 'Template',
    Icon: ClipboardList,
    title: 'Website brief template',
    cta: 'Get free',
  },
]

export default function InsightsResourcesSection() {
  return (
    <section
      id="resources"
      className="insights-block insights-block--resources"
      aria-labelledby="insights-resources-heading"
    >
      <div className="insights-block__inner">
        <header className="insights-block__head">
          <div className="insights-block__head-main">
            <p className="insights-block__label">Resources</p>
            <h2 id="insights-resources-heading" className="insights-block__title">
              Free resources for practice owners
            </h2>
          </div>
          <Link to="/insights/resources" className="insights-block__head-cta">
            See all resources
            <ArrowRight className="insights-block__cta-icon" strokeWidth={1} aria-hidden />
          </Link>
        </header>

        <ul className="insights-resources">
          {RESOURCES.map(({ id, type, Icon, title, cta }) => (
            <li key={id}>
              <article className="insights-resource-card">
                <div className="insights-resource-card__icon-wrap" aria-hidden>
                  <Icon className="insights-resource-card__icon" strokeWidth={1} />
                </div>
                <div className="insights-resource-card__body">
                  <p className="insights-resource-card__type">{type}</p>
                  <h3 className="insights-resource-card__title">{title}</h3>
                  <button type="button" className="insights-resource-card__cta">
                    {cta}
                    <ArrowRight className="insights-resource-card__cta-icon" strokeWidth={1} aria-hidden />
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="insights-block__footer">
          <Link to="/insights/resources" className="insights-block__footer-cta">
            Browse all resources
            <ArrowRight className="insights-block__cta-icon" strokeWidth={1} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
