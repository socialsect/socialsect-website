import { htmlToMarkdown, notFoundMarkdown } from '@/lib/markdown'

export const dynamic = 'force-dynamic'

function markdownResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' },
  })
}

/** Markdown view of any page; reached via the proxy when Accept prefers text/markdown. */
export async function GET(request) {
  const path = request.headers.get('x-markdown-path') || '/'
  if (!path.startsWith('/') || path.startsWith('//') || path.startsWith('/api/')) {
    return markdownResponse(notFoundMarkdown(path), 404)
  }

  const upstream = await fetch(new URL(path, request.url), {
    headers: { Accept: 'text/html' },
    redirect: 'manual',
  })

  if (upstream.status >= 300 && upstream.status < 400) {
    return new Response(null, { status: upstream.status, headers: { Location: upstream.headers.get('location') || '/', Vary: 'Accept' } })
  }
  if (upstream.status === 404) return markdownResponse(notFoundMarkdown(path), 404)
  if (!upstream.ok) return markdownResponse(`# Error ${upstream.status}\n\nThis page could not be rendered as Markdown. See https://gosocialsect.com/llms.txt for a guide to the site.\n`, upstream.status)

  return markdownResponse(htmlToMarkdown(await upstream.text(), new URL(path, request.url).origin))
}
