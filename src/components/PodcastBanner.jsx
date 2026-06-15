import React, { useState, useEffect } from 'react'
import './PodcastBanner.css'

const PodcastBanner = () => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('podcastBannerDismissed')
      if (dismissed === '1') {
        setIsOpen(false)
      }
    } catch (err) {
      // ignore localStorage errors
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    try {
      localStorage.setItem('podcastBannerDismissed', '1')
    } catch (err) {
      // ignore localStorage errors
    }
  }

  const handleOpen = () => {
    setIsOpen(true)
    try {
      localStorage.removeItem('podcastBannerDismissed')
    } catch (err) {
      // ignore localStorage errors
    }
  }

  if (!isOpen) {
    return (
      <div className="podcast-banner podcast-banner--collapsed">
        <a 
          href="https://podcasts.apple.com/us/podcast/one-day-with-ray/id1896923883" 
          target="_blank" 
          rel="noopener noreferrer"
          className="podcast-banner__platform-link"
          aria-label="Listen on Apple Podcasts"
        >
          <img src="/icons/apple-podcasts-icon.svg" alt="" className="podcast-banner__platform-icon" />
        </a>
        <a 
          href="https://open.spotify.com/show/033xRQ9iPlF7Y24nB7IS4e" 
          target="_blank" 
          rel="noopener noreferrer"
          className="podcast-banner__platform-link"
          aria-label="Listen on Spotify"
        >
          <img src="/icons/spotify-icon.svg" alt="" className="podcast-banner__platform-icon" />
        </a>
        <button 
          className="podcast-banner__expand"
          onClick={handleOpen}
          aria-label="Expand podcast banner"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="podcast-banner">
      <span className="podcast-banner__label">Listen on:</span>
      <a 
        href="https://podcasts.apple.com/us/podcast/one-day-with-ray/id1896923883" 
        target="_blank" 
        rel="noopener noreferrer"
        className="podcast-banner__platform-link"
        aria-label="Listen on Apple Podcasts"
      >
        <img src="/icons/apple-podcasts-icon.svg" alt="" className="podcast-banner__platform-icon" />
      </a>
      <a 
        href="https://open.spotify.com/show/033xRQ9iPlF7Y24nB7IS4e" 
        target="_blank" 
        rel="noopener noreferrer"
        className="podcast-banner__platform-link"
        aria-label="Listen on Spotify"
      >
        <img src="/icons/spotify-icon.svg" alt="" className="podcast-banner__platform-icon" />
      </a>
      <button 
        className="podcast-banner__close"
        onClick={handleClose}
        aria-label="Close podcast banner"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  )
}

export default PodcastBanner
