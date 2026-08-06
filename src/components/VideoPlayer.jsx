'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'
import './VideoPlayer.css'

let idCounter = 0

export default function VideoPlayer({ src, poster, className = '', autoPlay = false, loop = false, onLoadedData }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const hideControlsTimer = useRef(null)
  const idRef = useRef(`vp-${++idCounter}`)

  const [playing, setPlaying] = useState(autoPlay)
  const [muted, setMuted] = useState(autoPlay)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(autoPlay)

  const formatTime = (s) => {
    if (!s || !isFinite(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const handleProgressClick = useCallback((e) => {
    const bar = progressRef.current
    const v = videoRef.current
    if (!bar || !v || !duration) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    v.currentTime = ratio * duration
  }, [duration])

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current
    const v = videoRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {})
      } else if (v && v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onTimeUpdate = () => {
      setCurrentTime(v.currentTime)
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
    }
    const onLoadedMetadata = () => {
      setDuration(v.duration)
      if (onLoadedData) onLoadedData()
    }
    const onEnded = () => {
      setPlaying(false)
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onWaiting = () => setIsBuffering(true)
    const onPlaying = () => setIsBuffering(false)
    const onCanPlay = () => setIsBuffering(false)

    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('loadedmetadata', onLoadedMetadata)
    v.addEventListener('ended', onEnded)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('waiting', onWaiting)
    v.addEventListener('playing', onPlaying)
    v.addEventListener('canplay', onCanPlay)

    return () => {
      v.removeEventListener('timeupdate', onTimeUpdate)
      v.removeEventListener('loadedmetadata', onLoadedMetadata)
      v.removeEventListener('ended', onEnded)
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('waiting', onWaiting)
      v.removeEventListener('playing', onPlaying)
      v.removeEventListener('canplay', onCanPlay)
    }
  }, [])

  // Auto-play when visible, pause when off-screen
  useEffect(() => {
    if (!autoPlay) return
    const v = videoRef.current
    if (!v) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(v)
    return () => observer.disconnect()
  }, [autoPlay])

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const resetHideTimer = useCallback(() => {
    setShowControls(true)
    clearTimeout(hideControlsTimer.current)
    if (playing) {
      hideControlsTimer.current = setTimeout(() => setShowControls(false), 3000)
    }
  }, [playing])

  useEffect(() => {
    if (!playing) {
      setShowControls(true)
      clearTimeout(hideControlsTimer.current)
    } else {
      resetHideTimer()
    }
    return () => clearTimeout(hideControlsTimer.current)
  }, [playing, resetHideTimer])

  return (
    <div
      ref={containerRef}
      className={`vp ${className} ${playing ? 'vp--playing' : ''} ${showControls ? 'vp--controls-visible' : ''} ${isFullscreen ? 'vp--fullscreen' : ''}`}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="vp__video"
        src={src}
        poster={poster}
        playsInline
        loop={loop}
        muted={muted}
        autoPlay={autoPlay || undefined}
        preload="metadata"
        onClick={togglePlay}
      />

      {!playing && !isBuffering && (
        <button className="vp__center-play" onClick={togglePlay} aria-label="Play">
          <Play size={28} fill="currentColor" />
        </button>
      )}

      {isBuffering && (
        <div className="vp__buffering">
          <div className="vp__spinner" />
        </div>
      )}

      <div className="vp__bar">
        <div
          ref={progressRef}
          className="vp__progress"
          onClick={handleProgressClick}
          role="slider"
          aria-label="Seek"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="vp__progress-track">
            <div className="vp__progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="vp__controls">
          <div className="vp__controls-left">
            <button className="vp__btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            </button>
            <span className="vp__time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="vp__controls-right">
            <button className="vp__btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button className="vp__btn" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
