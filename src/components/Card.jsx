'use client'

import './Card.css'

export default function Card({ 
  children, 
  variant = 'default',
  className = ''
}) {
  return (
    <div className={`card card-${variant} ${className}`.trim()}>
      {children}
    </div>
  )
}
