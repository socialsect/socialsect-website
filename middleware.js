import { getSeoConfig } from './src/lib/seo.js'

export default async function middleware(req) {
  const ua = req.headers.get('user-agent') || ''

  if (!isCrawler(ua)) {
    return
  }

  const url = new URL(req.url)
  const { pathname } = url

  if (shouldBypass(pathname)) {
    return
  }

  if (pathname.startsWith('/articles/')) {
    const slug = pathname.replace(/^\/articles\//, '').replace(/\/$/, '')

    if (slug) {
      try {
        // Resolve slug → article folder ID via slug-map
        const slugMapUrl = new URL('/api/articles/slug-map.json', url)
        const slugMapRes = await fetch(slugMapUrl)
        let articleId = null

        if (slugMapRes.ok) {
          const slugMap = await slugMapRes.json()
          articleId = slugMap?.slugs?.[slug] || null
        }

        // Fetch metadata using the resolved folder ID, or fall back to slug directly
        const metaPath = articleId
          ? `/articles/${articleId}/metadata.json`
          : `/articles/${slug}/metadata.json`

        const metaUrl = new URL(metaPath, url)
        const response = await fetch(metaUrl)

        if (response.ok) {
          const data = await response.json()
          const meta = fromArticleMetadata(data, url.origin, slug)

          return new Response(buildHTML(meta, url.href), {
            headers: {
              'content-type': 'text/html; charset=utf-8',
              vary: 'User-Agent',
            },
          })
        }
      } catch {
        // Fall through to static metadata.
      }
    }
  }

  if (pathname.startsWith('/insights/blog/')) {
    const slug = pathname.replace(/^\/insights\/blog\//, '').replace(/\/$/, '')

    if (slug) {
      try {
        // Fetch article metadata from API endpoint (Node.js runtime, safe from Sanity)
        const metaUrl = new URL(`/api/articles/${slug}`, url)
        const response = await fetch(metaUrl.toString())

        if (response.ok) {
          const article = await response.json()
          const meta = fromBlogArticle(article, url.origin, pathname)

          return new Response(buildHTML(meta, url.href), {
            headers: {
              'content-type': 'text/html; charset=utf-8',
              vary: 'User-Agent',
            },
          })
        }
      } catch {
        // Fall through to static metadata.
      }
    }
  }

  const seoMeta = getSeoConfig(pathname)
  const meta = pageMetaFromSeoConfig(seoMeta, url.origin)

  return new Response(buildHTML(meta, url.href), {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      vary: 'User-Agent',
    },
  })
}


export const config = {
  matcher: '/(.*)',
}

function shouldBypass(pathname) {
  if (
    pathname === '/robots.txt' ||
    pathname === '/site.webmanifest' ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/api/')
  ) {
    return true
  }

  return /\.[a-z0-9]+$/i.test(pathname)
}

function isCrawler(userAgent) {
  const lower = userAgent.toLowerCase()

  if (!lower) return false

  return CRAWLER_AGENTS.some(agent => lower.includes(agent))
}

function fromArticleMetadata(data, origin, slug) {
  const title = data?.seo?.openGraph?.title || data?.metaTitle || data?.title || 'FERZ'
  const h1 = data?.title || title
  const description = data?.seo?.openGraph?.description || data?.metaDescription || data?.description || ''
  const image =
    data?.seo?.openGraph?.image ||
    (data?.image ? `${origin}/articles/${data.id || slug}/${data.image}` : `${origin}/Logo.svg`)

  return {
    title,
    h1,
    description,
    image,
    canonical: data?.canonical || data?.url || `${origin}/articles/${data?.slug || slug}`,
    type: data?.seo?.openGraph?.type || 'article',
  }
}

function buildHTML(meta, url) {
  const h1 = meta.h1 || meta.titleTag || meta.ogTitle || meta.title
  const title = escapeHtml(meta.title)
  const description = meta.description ? escapeHtml(meta.description) : ''
  const image = meta.image ? escapeHtml(meta.image) : ''
  const canonical = escapeHtml(meta.canonical || url)
  const type = escapeHtml(meta.type || 'website')
  const robots = meta.robots ? `<meta name="robots" content="${escapeHtml(meta.robots)}" />` : ''
  const keywords = meta.keywords ? `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />` : ''
  const author = meta.author ? `<meta name="author" content="${escapeHtml(meta.author)}" />` : ''
  const titleTag = meta.titleTag ? `<meta name="title" content="${escapeHtml(meta.titleTag)}" />` : ''
  const ogTitle = meta.ogTitle || meta.title
  const ogDescription = meta.ogDescription || meta.description
  const ogSiteName = meta.ogSiteName ? `<meta property="og:site_name" content="${escapeHtml(meta.ogSiteName)}" />` : ''
  const ogImage = image ? `<meta property="og:image" content="${image}" />` : ''
  const twitterTitle = meta.twitterTitle || ogTitle
  const twitterDescription = meta.twitterDescription || ogDescription
  const twitterSite = meta.twitterSite ? `<meta property="twitter:site" content="${escapeHtml(meta.twitterSite)}" />` : ''
  const twitterImage = image ? `<meta property="twitter:image" content="${image}" />` : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  ${titleTag}
  ${description ? `<meta name="description" content="${description}" />` : ''}
  ${keywords}
  ${author}
  ${robots}
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${escapeHtml(ogTitle)}" />
  ${ogDescription ? `<meta property="og:description" content="${escapeHtml(ogDescription)}" />` : ''}
  ${ogSiteName}
  ${ogImage}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(twitterTitle)}" />
  ${twitterDescription ? `<meta name="twitter:description" content="${escapeHtml(twitterDescription)}" />` : ''}
  ${twitterSite}
  ${twitterImage}
</head>
<body>
  <main>
    <h1>${escapeHtml(h1)}</h1>
    ${description ? `<p>${description}</p>` : ''}
  </main>
</body>
</html>`
}

function pageMetaFromSeoConfig(seoMeta, origin) {
  return {
    title: seoMeta.title,
    h1: seoMeta.title,
    description: seoMeta.description,
    image: seoMeta.image,
    canonical: seoMeta.canonicalUrl || origin,
    type: seoMeta.ogType || 'website',
    robots: seoMeta.robots,
    keywords: seoMeta.tags?.length ? seoMeta.tags.join(', ') : '',
    ogTitle: seoMeta.title,
    ogDescription: seoMeta.description,
    ogSiteName: 'Socialsect',
    twitterTitle: seoMeta.title,
    twitterDescription: seoMeta.description,
    twitterSite: '@thesocialsect',
  }
}

function fromBlogArticle(metadata, origin, pathname) {
  // metadata comes from /api/articles/[slug] endpoint (safe format)
  const title = metadata.title || 'Socialsect'
  const description = metadata.description || ''
  const imageUrl = metadata.image
  const image = imageUrl
    ? imageUrl.startsWith('http')
      ? imageUrl
      : `${origin}${imageUrl}`
    : `${origin}/social-share.png`

  return {
    title,
    h1: title,
    description,
    image,
    canonical: metadata.canonical || `${origin}${pathname}`,
    type: metadata.type || 'article',
    robots: metadata.robots,
    ogTitle: title,
    ogDescription: description,
    ogSiteName: 'Socialsect',
    twitterTitle: title,
    twitterDescription: description,
    twitterSite: '@thesocialsect',
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const CRAWLER_AGENTS = [
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'slackbot',
  'discordbot',
  'msnbot',
  'applebot',
  'pinterest',
  'duckduckbot',
  'yandexbot',
]

const STATIC_META = {}
