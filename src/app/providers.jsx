'use client'

import { useEffect } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import { enableResourcePrefetch, deferNonCriticalStyles } from '@/lib/performance'

export default function Providers({ children }) {
  useEffect(() => {
    window.addEventListener('load', enableResourcePrefetch)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', deferNonCriticalStyles)
    } else {
      deferNonCriticalStyles()
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      {children}
    </>
  )
}
