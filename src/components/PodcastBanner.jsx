'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react'
import './PodcastBanner.css'

const PodcastBanner = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [dragging, setDragging] = useState(false)
  const [position, setPosition] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const bannerRef = useRef(null)
  const positionRef = useRef({ x: 0, y: 0 })

  useLayoutEffect(() => {
  // Use clientWidth/clientHeight  more reliable than innerWidth/innerHeight on mobile
  // These exclude scrollbars and match the actual visible viewport
  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  //   const vw = document.documentElement.clientWidth
  // const vh = document.documentElement.clientHeight
  console.log('viewport:', vw, vh)
  console.log('saved position:', localStorage.getItem('podcastBannerPosition'))
   if (!localStorage.getItem('podcastBannerPositionV2')) {
    localStorage.removeItem('podcastBannerPosition')
    localStorage.setItem('podcastBannerPositionV2', '1')
  }

  // Approximate banner dimensions to avoid getBoundingClientRect() returning 0
  // on a visibility:hidden element. Adjust if your banner size changes.
  const BANNER_W = vw <= 768 ? 180 : 220
  const BANNER_H = vw <= 768 ? 56 : 70
  const PADDING = 16

  const maxX = vw - BANNER_W - PADDING
  const maxY = vh - BANNER_H - PADDING

  let initialPosition = null
  try {
    const saved = localStorage.getItem('podcastBannerPosition')
    initialPosition = saved ? JSON.parse(saved) : null
  } catch {
    initialPosition = null
  }

  const nextPosition =
    initialPosition &&
    typeof initialPosition.x === 'number' &&
    typeof initialPosition.y === 'number'
      ? {
          x: Math.min(Math.max(PADDING, initialPosition.x), maxX),
          y: Math.min(Math.max(PADDING, initialPosition.y), maxY),
        }
      : { x: PADDING, y: maxY } // bottom-left corner

  setPosition(nextPosition)
  positionRef.current = nextPosition
}, [])

  useEffect(() => {
    const handleResize = () => {
      const banner = bannerRef.current
      const current = positionRef.current
      if (!banner || current == null) return

      const rect = banner.getBoundingClientRect()
      const maxX = Math.max(
        16,
        window.innerWidth - rect.width - 16
      )
      const maxY = Math.max(
        16,
        window.innerHeight - rect.height - 16
      )

      const nextPosition = {
        x: Math.min(
          Math.max(16, current.x),
          maxX
        ),
        y: Math.min(
          Math.max(16, current.y),
          maxY
        ),
      }

      positionRef.current = nextPosition
      setPosition(nextPosition)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const dismissed = localStorage.getItem(
      'podcastBannerDismissed'
    )

    if (dismissed === '1') {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.style.overflow === 'hidden')
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    })

    return () => observer.disconnect()
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

      const banner = bannerRef.current

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
      positionRef.current = newPos
    }

    const stop = () => {
      setDragging(false)

      localStorage.setItem(
        'podcastBannerPosition',
        JSON.stringify(positionRef.current)
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
      ref={bannerRef}
      className={`podcast-banner ${
        !isOpen
          ? 'podcast-banner--collapsed'
          : ''
      }`}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
      style={
        position
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
              cursor: dragging
                ? 'grabbing'
                : 'grab',
              visibility: menuOpen ? 'hidden' : undefined,
            }
          : {
              visibility: 'hidden',
              left: '16px',
              top: '16px',
            }
      }
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
          alt="Apple Podcasts"
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
          alt="Spotify"
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