import { NextResponse } from 'next/server'
import { prefersMarkdown } from '@/lib/markdown'

export function proxy(request) {
  const { pathname } = request.nextUrl
  const isRead = request.method === 'GET' || request.method === 'HEAD'

  if (isRead && prefersMarkdown(request.headers.get('accept') || '')) {
    const url = request.nextUrl.clone()
    url.pathname = '/api/markdown'
    url.search = ''
    const headers = new Headers(request.headers)
    headers.set('x-markdown-path', pathname)
    return NextResponse.rewrite(url, { request: { headers } })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/|_next/|.*\\.[^/]+$).*)'],
}
