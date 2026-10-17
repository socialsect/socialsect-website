'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import ScrollToTop from '@/components/ScrollToTop'
import SmoothScroll from '@/components/SmoothScroll'

import { enableResourcePrefetch, deferNonCriticalStyles } from '@/lib/performance'

const IntroLoader = dynamic(() => import('@/components/IntroLoader'), { ssr: false })

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
      <IntroLoader />
      <ScrollToTop />
      <SmoothScroll />
      {children}

    </>
  )
}
