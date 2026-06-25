'use client'

import NextLink from 'next/link'
import { useRouter, usePathname, useParams as useNextParams } from 'next/navigation'
import { forwardRef, useEffect } from 'react'

export const Link = forwardRef(function RouterLink({ to, href, children, replace, ...props }, ref) {
  const destination = to ?? href ?? '/'
  return (
    <NextLink ref={ref} href={destination} replace={replace} {...props}>
      {children}
    </NextLink>
  )
})

export function useNavigate() {
  const router = useRouter()
  return (path, options = {}) => {
    if (options.replace) router.replace(path)
    else router.push(path)
  }
}

export function useLocation() {
  const pathname = usePathname()
  return { pathname, search: '', hash: '', state: null, key: 'default' }
}

export function useParams() {
  return useNextParams() ?? {}
}

export function Navigate({ to, replace = false }) {
  const router = useRouter()
  useEffect(() => {
    if (replace) router.replace(to)
    else router.push(to)
  }, [to, replace, router])
  return null
}

export function BrowserRouter({ children }) {
  return children
}

export function Routes({ children }) {
  return children
}

export function Route() {
  return null
}

export { matchPath } from './match-path.js'
