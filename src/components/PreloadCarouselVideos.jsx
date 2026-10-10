'use client'
import { useEffect } from 'react'
import { preloadAll } from '../lib/videoPreloader'
import { CONTENT_LIBRARY_VIDEO_URLS as CAROUSEL_VIDEO_URLS } from '../lib/contentLibraryReels'


export default function PreloadCarouselVideos() {
  useEffect(() => {
    preloadAll(CAROUSEL_VIDEO_URLS, { batchSize: 3, delayMs: 400 })
  }, [])

  return null
}
