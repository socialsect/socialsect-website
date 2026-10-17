const SITE_URL = 'https://gosocialsect.com'

/** True when Accept ranks text/markdown at least as high as text/html. */
export function prefersMarkdown(accept = '') {
  const q = { md: 0, html: 0 }
  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().toLowerCase().split(';')
    const qp = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
    const value = qp ? Number(qp.slice(2)) : 1
    if (type === 'text/markdown') q.md = value
    else if (type === 'text/html' || type === 'application/xhtml+xml') q.html = Math.max(q.html, value)
  }
  return q.md > 0 && q.md >= q.html
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" }
const decode = (s) =>
  s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&(#?\w+);/g, (m, e) => ENTITIES[e] ?? m)
const strip = (s) => decode(s.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim()

/** Minimal HTML to Markdown conversion for server-rendered pages. */
export function htmlToMarkdown(html, baseUrl = SITE_URL) {
  const title = strip((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '')
  const description = decode((html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || [])[1] || '')
  let body = (html.match(/<main[\s\S]*?<\/main>/i) || html.match(/<body[\s\S]*<\/body>/i) || [html])[0]
  body = body
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|svg|noscript|template|nav|header|footer|form|button|iframe|video)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n\n${'#'.repeat(n)} ${strip(t)}\n\n`)
    .replace(/<a\b[^>]*href="([^"#][^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => {
      const text = strip(t)
      return text ? `[${text}](${new URL(href, baseUrl).href})` : ''
    })
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/(p|div|section|article|ul|ol|tr|header)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
  const text = decode(body)
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  const head = [title && `# ${title}`, description && `> ${description}`].filter(Boolean).join('\n\n')
  return `${head}\n\n${text}\n`.trim() + '\n'
}

export function notFoundMarkdown(pathname) {
  return `# 404: Page not found

The page \`${pathname}\` does not exist on gosocialsect.com. It may have moved or the address may be mistyped.

## Where to go next

- [Home](${SITE_URL}/)
- [Sitemap](${SITE_URL}/sitemap.xml)
- [llms.txt: guide to this site for agents](${SITE_URL}/llms.txt)
- [Contact](${SITE_URL}/contact)
`
}
