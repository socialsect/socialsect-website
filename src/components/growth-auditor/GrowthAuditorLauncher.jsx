'use client'

import React, { useState } from 'react'
import GrowthAuditorWidget from './GrowthAuditorWidget'
import './GrowthAuditorLauncher.css'

export default function GrowthAuditorLauncher() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {!isOpen && (
        <div className="auditor-launcher-wrapper">
          <span className="auditor-launcher__tooltip">Ask us anything</span>
          <button 
            className="auditor-launcher"
            onClick={() => setIsOpen(true)}
            aria-label="Open website growth auditor"
          >
            <img className="auditor-launcher__icon" src="/chatbot-icon.png" alt="Chat" />
          </button>
        </div>
      )}
      
      {isOpen && (
        <GrowthAuditorWidget onClose={() => setIsOpen(false)} />
      )}
    </>
  )
}
