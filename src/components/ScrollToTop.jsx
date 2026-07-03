'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = hash.replace('#', '')
      let attempts = 0
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        // Retry up to 50 times over ~1.5 seconds to wait for component to mount
        if (attempts++ < 50) requestAnimationFrame(scrollToTarget)
      }
      requestAnimationFrame(scrollToTarget)
      return
    }
    // Use setTimeout to ensure page content is rendered before scrolling
    const scrollTimer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
    return () => clearTimeout(scrollTimer)
  }, [pathname])

  return null
}
