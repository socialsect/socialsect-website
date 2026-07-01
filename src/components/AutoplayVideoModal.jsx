'use client'

import React, { useEffect } from 'react'
import './AutoplayVideoModal.css'

export default function AutoplayVideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title">
      <button
        type="button"
        className="video-modal__backdrop"
        aria-label="Close video"
        onClick={onClose}
      />
      <div className="video-modal__panel">
        <button
          type="button"
          className="video-modal__close"
          aria-label="Close video"
          onClick={onClose}
        >
          ×
        </button>
        <div className="video-modal__header">
          <h2 id="video-modal-title">A Conversation on Implant Science</h2>
          <p className="video-modal__subhead"> Rayansh sits down with Dr. Julia L. Jackson, maxillofacial surgeon and founder of the International Implant Institute, to explore surgical insights, clinical best practices, and the future of implantology.</p>
        </div>
        <div className="video-modal__iframe-wrap">
          <iframe
            className="video-modal__iframe"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/0zPW0oAuNIQ?si=Vv9fd-BlwokPFme2&autoplay=1&mute=1&playsinline=1"
            title="Conversation: Rayansh Singh & Dr. Julia L. Jackson"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
