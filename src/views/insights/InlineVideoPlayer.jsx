'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import VideoPlayer from '../../components/VideoPlayer'

export default function InlineVideoPlayer({
  id,
  duration,
  videoSrc,
  playLabel,
  variant = 'default',
  className = '',
  poster = null,
}) {
  const [isPlaying, setIsPlaying] = useState(false)

  function handlePlay() {
    setIsPlaying(true)
  }

  const isFeatured = variant === 'featured'
  const isCommunity = variant === 'community'

  return (
    <div className={`testimonials-player testimonials-player--${variant} ${className}`.trim()}>
      {!isPlaying ? (
        <button
          id={id}
          type="button"
          className="testimonials-player__trigger"
          onClick={handlePlay}
          aria-label={playLabel || `Play video, ${duration}`}
        >
          {poster ? (
            <img
              src={poster}
              alt={playLabel ? `${playLabel} poster` : 'Video poster'}
              className="testimonials-player__poster"
              loading="lazy"
            />
          ) : (
            <span className="testimonials-player__gradient" aria-hidden />
          )}
          <span className="testimonials-player__play-wrap" aria-hidden>
            <Play
              className={`testimonials-player__play-icon${isFeatured ? ' testimonials-player__play-icon--lg' : ''}`}
              strokeWidth={1}
            />
          </span>
          {isFeatured && (
            <span className="testimonials-player__hint">Click to play · {duration.replace('0:', '')} seconds</span>
          )}
          <span className="testimonials-player__duration">{duration}</span>
        </button>
      ) : (
        <div className="testimonials-player__active">
          {videoSrc ? (
            <VideoPlayer
              src={videoSrc}
              poster={poster}
              className="testimonials-player__video"
            />
          ) : (
            <div className="testimonials-player__placeholder" role="status">
              <p className="testimonials-player__placeholder-title">Video coming soon</p>
              <p className="testimonials-player__placeholder-meta">
                {duration}
                {!isCommunity && ' · Inline playback on this page'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
