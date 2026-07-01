'use client'

import './Section.css'

export default function Section({ 
  children, 
  variant = 'light',
  id,
  className = ''
}) {
  return (
    <section id={id} className={`section section-${variant} ${className}`.trim()}>
      <div className="container">
        {children}
      </div>
    </section>
  )
}
