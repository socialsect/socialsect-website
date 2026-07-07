'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ScrollToTop from '@/components/ScrollToTop'
import DelayPopup from '@/components/DelayPopup'
import { enableResourcePrefetch, deferNonCriticalStyles } from '@/lib/performance'

export default function Providers({ children }) {
  const pathname = usePathname()

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
      <DelayPopup key={pathname} />
    </>
  )
}
