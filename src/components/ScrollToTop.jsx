import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      let attempts = 0
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        if (attempts++ < 12) requestAnimationFrame(scrollToTarget)
      }
      requestAnimationFrame(scrollToTarget)
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
