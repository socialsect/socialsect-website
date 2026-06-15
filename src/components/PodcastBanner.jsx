import React, { useState, useEffect } from 'react'
import './PodcastBanner.css'

const PodcastBanner = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [dragging, setDragging] = useState(false)

  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem(
      'podcastBannerPosition'
    )

    return saved
      ? JSON.parse(saved)
      : {
          x: window.innerWidth - 340,
          y: window.innerHeight - 140,
        }
  })

  useEffect(() => {
    const dismissed = localStorage.getItem(
      'podcastBannerDismissed'
    )

    if (dismissed === '1') {
      setIsOpen(false)
    }
  }, [])
const [showTooltip, setShowTooltip] = useState(false)
useEffect(() => {
  const seen = localStorage.getItem(
    'podcastBannerTooltipSeen'
  )

  if (!seen) {
    setShowTooltip(true)

    setTimeout(() => {
      setShowTooltip(false)

      localStorage.setItem(
        'podcastBannerTooltipSeen',
        '1'
      )
    }, 4000)
  }
}, [])
  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem(
      'podcastBannerDismissed',
      '1'
    )
  }

  const handleOpen = () => {
    setIsOpen(true)
    localStorage.removeItem(
      'podcastBannerDismissed'
    )
  }

  const startDrag = (e) => {
    if (
      e.target.closest('a') ||
      e.target.closest('button')
    ) {
      return
    }

    const startX =
      e.touches?.[0]?.clientX || e.clientX

    const startY =
      e.touches?.[0]?.clientY || e.clientY

    const initialX = position.x
    const initialY = position.y

    setDragging(true)

    const move = (event) => {
      const currentX =
        event.touches?.[0]?.clientX ||
        event.clientX

      const currentY =
        event.touches?.[0]?.clientY ||
        event.clientY

      const banner =
        document.querySelector('.podcast-banner')

      if (!banner) return

      const rect = banner.getBoundingClientRect()

      const maxX =
        window.innerWidth - rect.width

      const maxY =
        window.innerHeight - rect.height

      const newPos = {
        x: Math.max(
          0,
          Math.min(
            maxX,
            initialX + (currentX - startX)
          )
        ),
        y: Math.max(
          0,
          Math.min(
            maxY,
            initialY + (currentY - startY)
          )
        ),
      }

      setPosition(newPos)
    }

    const stop = () => {
      setDragging(false)

      localStorage.setItem(
        'podcastBannerPosition',
        JSON.stringify(position)
      )

      window.removeEventListener(
        'mousemove',
        move
      )
      window.removeEventListener(
        'mouseup',
        stop
      )

      window.removeEventListener(
        'touchmove',
        move
      )
      window.removeEventListener(
        'touchend',
        stop
      )
    }

    window.addEventListener(
      'mousemove',
      move
    )
    window.addEventListener(
      'mouseup',
      stop
    )

    window.addEventListener(
      'touchmove',
      move,
      { passive: false }
    )

    window.addEventListener(
      'touchend',
      stop
    )
  }

  return (
    <div
      className={`podcast-banner ${
        !isOpen
          ? 'podcast-banner--collapsed'
          : ''
      }`}
      
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: dragging
          ? 'grabbing'
          : 'grab',
      }}
    >
      {isOpen && (
        <span className="podcast-banner__label">
          Listen on:
        </span>
      )}

      <a
        href="https://podcasts.apple.com/us/podcast/one-day-with-ray/id1896923883"
        target="_blank"
        rel="noopener noreferrer"
        className="podcast-banner__platform-link"
      >
        <img
          src="/icons/apple-podcasts-icon.svg"
          alt=""
          className="podcast-banner__platform-icon"
        />
      </a>

      <a
        href="https://open.spotify.com/show/033xRQ9iPlF7Y24nB7IS4e"
        target="_blank"
        rel="noopener noreferrer"
        className="podcast-banner__platform-link"
      >
        <img
          src="/icons/spotify-icon.svg"
          alt=""
          className="podcast-banner__platform-icon"
        />
      </a>

      {isOpen ? (
        <button
          className="podcast-banner__close"
          onClick={handleClose}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      ) : (
        <button
          className="podcast-banner__expand"
          onClick={handleOpen}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      )}
      {showTooltip && (
  <div className="podcast-banner__tooltip">
    Drag me anywhere
  </div>
)}
    </div>
  )
}

export default PodcastBanner