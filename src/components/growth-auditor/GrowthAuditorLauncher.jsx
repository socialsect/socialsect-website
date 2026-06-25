'use client'

import React, { useState } from 'react'
import GrowthAuditorWidget from './GrowthAuditorWidget'
import './GrowthAuditorLauncher.css'

export default function GrowthAuditorLauncher() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {!isOpen && (
        <button 
          className="auditor-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open website growth auditor"
        >
          <span className="auditor-launcher__icon">✓</span>
          <span className="auditor-launcher__label">Audit</span>
        </button>
      )}
      
      {isOpen && (
        <GrowthAuditorWidget onClose={() => setIsOpen(false)} />
      )}
    </>
  )
}
