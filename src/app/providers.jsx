'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import IntroLoader from '@/components/IntroLoader'
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
      <IntroLoader />
      <ScrollToTop />
      {children}
      <DelayPopup key={pathname} />
    </>
  )
}
