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
  'googlebot',
  'bingbot',
  'bingpreview',
  'msnbot',
  'applebot',
  'pinterest',
  'duckduckbot',
  'yandexbot',
]

const STATIC_META = {
  // ─── HOME ───────────────────────────────────────────────────────────────────
'/': {
  title: 'FERZ | AI Governance Infrastructure for Regulated Industries',
  titleTag: 'FERZ | AI Governance Infrastructure for Regulated Industries',
  h1: 'AI Governance Infrastructure for Regulated Industries',
  description: 'FERZ is deterministic AI governance infrastructure for regulated industries. It authorizes, constrains, and replays AI actions and produces signed, replayable records as evidence for audit. The architecture comprises five pathway engines, a cross-cutting engine, and published governance architectures, all sharing a common signed-record discipline and the Four Tests Standard.',
  ogTitle: 'FERZ | AI Governance Infrastructure for Regulated Industries',
  ogDescription: 'FERZ is deterministic AI governance infrastructure for regulated industries. It authorizes, constrains, and replays AI actions and produces signed, replayable records as evidence for audit. The architecture comprises five pathway engines, a cross-cutting engine, and published governance architectures, all sharing a common signed-record discipline and the Four Tests Standard.',
  twitterTitle: 'FERZ | AI Governance Infrastructure for Regulated Industries',
  twitterDescription: 'FERZ is deterministic AI governance infrastructure for regulated industries. It authorizes, constrains, and replays AI actions and produces signed, replayable records as evidence for audit. The architecture comprises five pathway engines, a cross-cutting engine, and published governance architectures, all sharing a common signed-record discipline and the Four Tests Standard.',
  image: 'https://ferz.ai/og/home.png',
  canonical: 'https://ferz.ai/',
  type: 'website',
},

  // ─── ABOUT ──────────────────────────────────────────────────────────────────
  '/about-us': {
    title: 'About FERZ | Deterministic AI Infrastructure',
    titleTag: 'About FERZ | Deterministic AI Infrastructure',
    h1: 'FERZ',
    description: 'FERZ, Inc. develops deterministic AI infrastructure for regulated environments. Founded in 2013 on the conviction that statistical approximation cannot provide the verifiable assurance that high-stakes systems require, FERZ has spent twelve years building the patent-pending architectures, open standards, and signed-evidence discipline that make precise, auditable AI possible. Today the work organizes around five pathway engines, cross-cutting bias and integrity constraints, published governance architectures, the Four Tests Standard, and a layered intellectual property strategy.',
    keywords: 'FERZ, deterministic AI infrastructure, patent-pending architectures, open standards, signed-evidence, Four Tests Standard, Edward Meyman, AI governance infrastructure',
    author: 'FERZ, Inc.',
    ogTitle: 'About FERZ | Deterministic AI Infrastructure',
    ogDescription: 'FERZ, Inc. develops deterministic AI infrastructure for regulated environments. Founded in 2013 on the conviction that statistical approximation cannot provide the verifiable assurance that high-stakes systems require, FERZ has spent twelve years building the patent-pending architectures, open standards, and signed-evidence discipline that make precise, auditable AI possible. Today the work organizes around five pathway engines, cross-cutting bias and integrity constraints, published governance architectures, the Four Tests Standard, and a layered intellectual property strategy.',
    ogSiteName: 'FERZ',
    twitterTitle: 'About FERZ | Deterministic AI Infrastructure',
    twitterDescription: 'FERZ, Inc. develops deterministic AI infrastructure for regulated environments. Founded in 2013 on the conviction that statistical approximation cannot provide the verifiable assurance that high-stakes systems require, FERZ has spent twelve years building the patent-pending architectures, open standards, and signed-evidence discipline that make precise, auditable AI possible. Today the work organizes around five pathway engines, cross-cutting bias and integrity constraints, published governance architectures, the Four Tests Standard, and a layered intellectual property strategy.',
    image: 'https://ferz.ai/og/about-us.png',
    canonical: 'https://ferz.ai/about-us',
    type: 'website',
  },

  // ─── CONTACT ────────────────────────────────────────────────────────────────
  '/contact-us': {
    title: 'Contact FERZ | Deterministic AI Governance Infrastructure',
    titleTag: 'Contact FERZ | Deterministic AI Governance Infrastructure',
    h1: 'Contact FERZ',
    description: 'Contact FERZ for deterministic AI governance consultation. Patent-protected frameworks, federal-proven methodologies, and mathematical certainty for regulated industries.',
    keywords: 'contact FERZ, deterministic AI governance, mathematical AI certainty, patent-protected AI frameworks, AI governance consultation, EU AI Act compliance, FDA AI guidance',
    author: 'FERZ, Inc.',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogTitle: 'Contact FERZ - Expert Consultation on AI Governance',
    ogDescription: 'Get expert consultation on AI governance, precision strategy, and enterprise enablement. Contact our team for AI strategy assessment and governance framework design.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Contact FERZ - Expert Consultation on AI Governance',
    twitterDescription: 'Get expert consultation on AI governance, precision strategy, and enterprise enablement. Contact our team for AI strategy assessment and governance framework design.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/contact-us',
    type: 'website',
  },

  // ─── PRIVACY / DISCLAIMER ───────────────────────────────────────────────────
  '/privacy-policy': {
    title: 'Privacy Policy | FERZ',
    h1: 'PRIVACY POLICY',
    description: 'FERZ Privacy Policy - Learn how we protect your personal information and maintain data privacy standards in compliance with GDPR, CCPA, and other privacy regulations.',
    keywords: 'privacy policy, data protection, GDPR compliance, CCPA, AI governance, FERZ, data privacy, personal information protection',
    robots: 'noindex, nofollow',
    author: 'FERZ',
    ogTitle: 'Privacy Policy | FERZ',
    ogDescription: 'FERZ Privacy Policy - Learn how we protect your personal information and maintain data privacy standards in compliance with GDPR, CCPA, and other privacy regulations.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Privacy Policy | FERZ',
    twitterDescription: 'FERZ Privacy Policy - Learn how we protect your personal information and maintain data privacy standards in compliance with GDPR, CCPA, and other privacy regulations.',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/privacy-policy',
    type: 'website',
  },
  '/disclaimer': {
    title: 'Legal Disclaimer | FERZ',
    h1: 'Legal Disclaimer',
    description: 'Comprehensive liability limitations and service scope definitions for FERZ deterministic AI governance solutions.',
    robots: 'noindex, nofollow',
    canonical: 'https://ferz.ai/disclaimer',
    type: 'website',
  },

  // ─── WORK WITH FERZ ─────────────────────────────────────────────────────────
  '/work-with-ferz': {
    title: 'AI Governance Careers | FERZ',
    titleTag: 'AI Governance Careers | FERZ',
    h1: 'Work with FERZ',
    description: "Join FERZ's professional network for deterministic AI governance careers. We're building mathematical foundations that transform AI from probabilistic chaos into deterministic reliability. Express your interest in AI governance jobs, compliance roles, and mathematical AI positions.",
    keywords: 'work with FERZ, AI governance jobs, deterministic AI careers, AI compliance jobs, mathematical AI roles, AI governance consulting, formal verification, regulatory compliance, enterprise AI, AI safety careers',
    robots: 'index, follow',
    author: 'FERZ',
    ogTitle: 'Work with FERZ | Join the Deterministic AI Revolution',
    ogDescription: "Join FERZ's professional network for deterministic AI governance careers. We're building mathematical foundations that transform AI from probabilistic chaos into deterministic reliability.",
    ogSiteName: 'FERZ',
    twitterTitle: 'Work with FERZ | Join the Deterministic AI Revolution',
    twitterDescription: "Join FERZ's professional network for deterministic AI governance careers. We're building mathematical foundations that transform AI from probabilistic chaos into deterministic reliability.",
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/work-with-ferz',
    type: 'website',
  },

  // ─── LICENSING ──────────────────────────────────────────────────────────────
  '/licensing-and-partnerships': {
    title: 'AI Licensing & Partnerships | FERZ',
    h1: 'Licensing & Partnerships',
    description: 'Partner with FERZ to secure exclusive implementation rights to the only comprehensive deterministic AI governance methodologies. Patent-protected frameworks with 20-year runway.',
    ogTitle: 'AI Licensing & Partnerships | FERZ',
    ogDescription: 'Partner with FERZ to secure exclusive implementation rights to the only comprehensive deterministic AI governance methodologies.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/licensing-and-partnerships',
    type: 'website',
  },

  // ─── INVESTORS ──────────────────────────────────────────────────────────────
  '/investors': {
    title: 'For Investors - FERZ, Inc. | Runtime Authorization Infrastructure for AI',
    titleTag: 'For Investors - FERZ, Inc. | Runtime Authorization Infrastructure for AI',
    h1: 'Runtime authorization infrastructure for AI in regulated enterprises.',
    description: 'FERZ builds runtime authorization infrastructure for AI in regulated enterprises. Published theory, patented architecture, deployable infrastructure. Request an investor briefing.',
    keywords: 'AI governance infrastructure, runtime authorization, deterministic AI governance, AI governance investment, FERZ investors, AI compliance infrastructure, AI enforcement architecture, fail-closed AI governance, AI governance patents, regulated AI deployment, pre-execution authorization, AI proof artifacts, healthcare AI governance, financial services AI compliance',
    robots: 'index, follow',
    author: 'FERZ, Inc.',
    ogTitle: 'For Investors - FERZ, Inc.',
    ogDescription: 'Runtime authorization infrastructure for AI in regulated enterprises. Published theory. Patented architecture. Deployable infrastructure.',
    ogSiteName: 'FERZ, Inc.',
    twitterTitle: 'For Investors - FERZ, Inc.',
    twitterDescription: 'Runtime authorization infrastructure for AI in regulated enterprises. Published theory. Patented architecture. Deployable infrastructure.',
    image: 'https://ferz.ai/investors.png',
    canonical: 'https://ferz.ai/investors',
    type: 'website',
  },

  // ─── GOVERNANCE FOR CONSEQUENTIAL AI ────────────────────────────────────────
  '/governance-for-consequential-ai': {
    title: 'When Logging Is Not Enough: Governance for Consequential AI Actions | FERZ',
    h1: 'When Logging Is Not Enough',
    description: 'Most AI governance tools log what happened after the fact. Agentic AI executes at machine speed. FERZ is the pre-execution authorization layer for consequential AI actions in regulated environments.',
    ogTitle: 'When Logging Is Not Enough: Governance for Consequential AI Actions',
    ogDescription: 'The architectural argument for pre-execution authorization in regulated AI deployments. For security, compliance, and risk leaders.',
    ogSiteName: 'FERZ',
    twitterTitle: 'When Logging Is Not Enough: Governance for Consequential AI Actions',
    twitterDescription: 'The architectural argument for pre-execution authorization in regulated AI deployments. For security, compliance, and risk leaders.',
    image: 'https://ferz.ai/assets/og/governance-for-consequential-ai.png',
    canonical: 'https://ferz.ai/governance-for-consequential-ai',
    type: 'article',
  },

  // ─── GOVERNANCE MAIN ────────────────────────────────────────────────────────
  '/governance': {
    title: 'The Authorization Gap: Why AI Governance Is an Enforcement Problem, Not a Monitoring Problem | FERZ',
    h1: 'The Authorization Gap: Why AI Governance Is an Enforcement Problem, Not a Monitoring Problem',
    description: 'The canonical FERZ essay on AI governance: the impossibility result, the Authorization Artifact Test, and what makes AI-action authorization distinct.',
    ogTitle: 'The Authorization Gap: Why AI Governance Is an Enforcement Problem, Not a Monitoring Problem | FERZ',
    ogDescription: 'The canonical FERZ essay on AI governance: the impossibility result, the Authorization Artifact Test, and the architectural commitments that distinguish authorization from monitoring.',
    ogSiteName: 'FERZ',
    twitterTitle: 'The Authorization Gap | FERZ',
    twitterDescription: 'Why AI governance is an enforcement problem, not a monitoring problem.',
    image: 'https://ferz.ai/og/the-authorization-gap.png',
    canonical: 'https://ferz.ai/governance',
    type: 'article',
  },

  // ─── GOVERNANCE CONCEPTS ────────────────────────────────────────────────────
  '/governance/concepts': {
    title: 'Governance Concepts: Canonical Definitions | FERZ',
    h1: 'Governance Concepts',
    description: 'Canonical FERZ-defined concepts in runtime authorization for AI: ex-ante authorization, Proof-Carrying Decisions, fail-closed design, and more.',
    ogTitle: 'Governance Concepts: Canonical Definitions | FERZ',
    ogDescription: 'The canonical FERZ vocabulary that defines runtime authorization architecture for AI systems in regulated environments.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Governance Concepts: Canonical Definitions | FERZ',
    twitterDescription: 'The canonical FERZ vocabulary for runtime authorization architecture.',
    image: 'https://ferz.ai/og/ferz-governance-concepts.png',
    canonical: 'https://ferz.ai/governance/concepts',
    type: 'website',
  },
  '/governance/concepts/execution-time-authorization': {
    title: 'Execution-Time Authorization: Definition and Architecture | FERZ',
    h1: 'Execution-Time Authorization',
    description: 'Execution-time authorization evaluates each AI action against policy before execution, blocks unauthorized actions, and emits verifiable decision artifacts.',
    ogTitle: 'Execution-Time Authorization: Definition and Architecture | FERZ',
    ogDescription: 'Execution-time authorization evaluates each AI action against policy before execution, blocks unauthorized actions, and emits verifiable decision artifacts.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Execution-Time Authorization: Definition and Architecture | FERZ',
    twitterDescription: 'Execution-time authorization evaluates each AI action against policy before execution.',
    image: 'https://ferz.ai/og/execution-time-authorization.png',
    canonical: 'https://ferz.ai/governance/concepts/execution-time-authorization',
    type: 'article',
  },
  '/governance/concepts/runtime-authorization-boundary': {
    title: 'Runtime Authorization Boundary: Definition and Architecture | FERZ',
    h1: 'Runtime Authorization Boundary',
    description: 'The runtime authorization boundary separates the governed system from its real-world effects. Every action must pass through an authorization gate.',
    ogTitle: 'Runtime Authorization Boundary: Definition and Architecture | FERZ',
    ogDescription: 'The runtime authorization boundary separates the governed system from its real-world effects. Every action must pass through an authorization gate.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Runtime Authorization Boundary: Definition and Architecture | FERZ',
    twitterDescription: 'The structural line between the governed system and its real-world effects.',
    image: 'https://ferz.ai/og/runtime-authorization-boundary.png',
    canonical: 'https://ferz.ai/governance/concepts/runtime-authorization-boundary',
    type: 'article',
  },
  '/governance/concepts/proof-carrying-decisions': {
    title: 'Proof-Carrying Decisions: Definition and Architecture | FERZ',
    h1: 'Proof-Carrying Decisions',
    description: 'A Proof-Carrying Decision is a cryptographically verifiable artifact produced for every authorization verdict, recording verdict, policy, and inputs.',
    ogTitle: 'Proof-Carrying Decisions: Definition and Architecture | FERZ',
    ogDescription: 'A cryptographically verifiable artifact produced for every authorization verdict, independently verifiable without access to the executing system.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Proof-Carrying Decisions: Definition and Architecture | FERZ',
    twitterDescription: 'A cryptographically verifiable artifact produced for every authorization verdict.',
    image: 'https://ferz.ai/og/proof-carrying-decisions.png',
    canonical: 'https://ferz.ai/governance/concepts/proof-carrying-decisions',
    type: 'article',
  },
  '/governance/concepts/non-bypassable-ai-governance': {
    title: 'Non-Bypassable AI Governance: Definition and Architecture | FERZ',
    h1: 'Non-Bypassable AI Governance',
    description: 'Non-bypassable AI governance is the structural property of an architecture in which the governed system cannot avoid, ignore, or modify enforcement.',
    ogTitle: 'Non-Bypassable AI Governance: Definition and Architecture | FERZ',
    ogDescription: 'Non-bypassable AI governance is the structural property of an architecture in which the governed system cannot avoid, ignore, or modify enforcement.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Non-Bypassable AI Governance: Definition and Architecture | FERZ',
    twitterDescription: 'The structural property of an architecture in which the governed system cannot bypass enforcement.',
    image: 'https://ferz.ai/og/non-bypassable-ai-governance.png',
    canonical: 'https://ferz.ai/governance/concepts/non-bypassable-ai-governance',
    type: 'article',
  },
  '/governance/concepts/fail-closed-design': {
    title: 'Fail-Closed Design: Definition and Architecture | FERZ',
    h1: 'Fail-Closed Design',
    description: 'Fail-closed design requires a system to block actions when authorization cannot be confidently granted, defaulting to blocking under uncertainty or error.',
    ogTitle: 'Fail-Closed Design: Definition and Architecture | FERZ',
    ogDescription: 'A structural property: under uncertainty or error, the authorization gate blocks rather than permits. Expressed through the ABSTAIN verdict.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Fail-Closed Design: Definition and Architecture | FERZ',
    twitterDescription: 'A structural property: under uncertainty or error, the authorization gate blocks rather than permits.',
    image: 'https://ferz.ai/og/fail-closed-design.png',
    canonical: 'https://ferz.ai/governance/concepts/fail-closed-design',
    type: 'article',
  },
  '/governance/concepts/ex-ante-authorization': {
    title: 'Ex-Ante Authorization: Definition and Architecture | FERZ',
    h1: 'Ex-Ante Authorization',
    description: 'Ex-ante authorization is a decision made before an AI action takes effect, ensuring execution only follows an explicit authorization verdict.',
    ogTitle: 'Ex-Ante Authorization: Definition and Architecture | FERZ',
    ogDescription: 'Ex-ante authorization is a decision made before an AI action takes effect, ensuring execution only follows an explicit authorization verdict.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Ex-Ante Authorization: Definition and Architecture | FERZ',
    twitterDescription: 'Authority must be established before the action takes effect.',
    image: 'https://ferz.ai/og/ex-ante-authorization.png',
    canonical: 'https://ferz.ai/governance/concepts/ex-ante-authorization',
    type: 'article',
  },
  '/governance/concepts/abstain-verdict': {
    title: 'ABSTAIN Verdict: Definition and Architecture | FERZ',
    h1: 'ABSTAIN Verdict',
    description: 'ABSTAIN is the fail-closed verdict in the FERZ verdict space. Execution is blocked pending authorized human override when the gate cannot confidently authorize.',
    ogTitle: 'ABSTAIN Verdict: Definition and Architecture | FERZ',
    ogDescription: 'ABSTAIN is the fail-closed verdict in the FERZ verdict space. Execution is blocked pending authorized human override when the gate cannot confidently authorize.',
    ogSiteName: 'FERZ',
    twitterTitle: 'ABSTAIN Verdict: Definition and Architecture | FERZ',
    twitterDescription: 'The fail-closed verdict in the FERZ verdict space.',
    image: 'https://ferz.ai/og/abstain-verdict.png',
    canonical: 'https://ferz.ai/governance/concepts/abstain-verdict',
    type: 'article',
  },
  '/governance/concepts/three-problems-taxonomy': {
    title: 'Three Problems Taxonomy: Definition and Architecture | FERZ',
    h1: 'Three Problems Taxonomy',
    description: 'Visibility, Alignment, and Authorization are three categorically distinct problems in AI governance. FERZ addresses Authorization.',
    ogTitle: 'Three Problems Taxonomy: Definition and Architecture | FERZ',
    ogDescription: 'Visibility, Alignment, and Authorization are three categorically distinct problems. FERZ addresses Authorization.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Three Problems Taxonomy: Definition and Architecture | FERZ',
    twitterDescription: 'Visibility, Alignment, and Authorization. Three categorically distinct problems. FERZ addresses Authorization.',
    image: 'https://ferz.ai/og/three-problems-taxonomy.png',
    canonical: 'https://ferz.ai/governance/concepts/three-problems-taxonomy',
    type: 'article',
  },
  '/governance/concepts/deterministic-authorization': {
    title: 'Deterministic Authorization: Definition and Architecture | FERZ',
    h1: 'Deterministic Authorization',
    description: 'Deterministic authorization is the property that the same governed inputs and state produce the same authorization verdict, without probabilistic drift.',
    ogTitle: 'Deterministic Authorization: Definition and Architecture | FERZ',
    ogDescription: 'Deterministic authorization is the property that the same governed inputs and state produce the same authorization verdict, without probabilistic drift.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Deterministic Authorization: Definition and Architecture | FERZ',
    twitterDescription: 'Deterministic authorization produces the same verdict from the same governed inputs and state.',
    image: 'https://ferz.ai/og/deterministic-authorization.png',
    canonical: 'https://ferz.ai/governance/concepts/deterministic-authorization',
    type: 'article',
  },

  // ─── GOVERNANCE DOCTRINE ────────────────────────────────────────────────────
  '/governance/doctrine': {
    title: 'Governance Doctrine: Architectural Positions | FERZ',
    h1: 'Governance Doctrine',
    description: 'FERZ Governance Doctrine: canonical positions distinguishing runtime authorization from monitoring, observability, and non-verdict interruption.',
    ogTitle: 'Governance Doctrine: Architectural Positions | FERZ',
    ogDescription: 'The architectural positions FERZ asserts about AI governance, stated canonically and anchored to the FERZ research corpus.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Governance Doctrine | FERZ',
    twitterDescription: 'Canonical architectural positions distinguishing runtime authorization from monitoring and observability.',
    image: 'https://ferz.ai/og/governance-doctrine.png',
    canonical: 'https://ferz.ai/governance/doctrine',
    type: 'website',
  },
  '/governance/doctrine/observability-is-not-authorization': {
    title: 'Observability is not authorization | FERZ Doctrine',
    h1: 'Observability is not authorization',
    description: 'Observability is not authorization. Visibility into AI behavior is necessary for oversight but does not constitute permission to act. A FERZ doctrine.',
    ogTitle: 'Observability is not authorization | FERZ Doctrine',
    ogDescription: 'A canonical FERZ doctrine: visibility into AI behavior is necessary for oversight but does not constitute permission to act.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Observability is not authorization | FERZ Doctrine',
    twitterDescription: 'A canonical FERZ doctrine on runtime AI authorization.',
    image: 'https://ferz.ai/og/observability-is-not-authorization.png',
    canonical: 'https://ferz.ai/governance/doctrine/observability-is-not-authorization',
    type: 'article',
  },
  '/governance/doctrine/halt-is-not-a-verdict': {
    title: 'A halt is not a verdict | FERZ Doctrine',
    h1: 'A halt is not a verdict',
    description: 'A halt is not a verdict. A verdict is a decision with reproducible logic, bounded scope, and a verifiable authorization artifact. A FERZ doctrine.',
    ogTitle: 'A halt is not a verdict | FERZ Doctrine',
    ogDescription: 'A canonical FERZ doctrine: stopping execution is an event; a verdict is a decision with reproducible logic, bounded scope, and a verifiable authorization artifact.',
    ogSiteName: 'FERZ',
    twitterTitle: 'A halt is not a verdict | FERZ Doctrine',
    twitterDescription: 'A canonical FERZ doctrine on the distinction between halts and authorization verdicts.',
    image: 'https://ferz.ai/og/halt-is-not-a-verdict.png',
    canonical: 'https://ferz.ai/governance/doctrine/halt-is-not-a-verdict',
    type: 'article',
  },
  '/governance/doctrine/authorization-is-not-monitoring': {
    title: 'Authorization is not monitoring | FERZ Doctrine',
    h1: 'Authorization is not monitoring',
    description: 'Authorization is not monitoring. Monitoring describes actions after they occur; authorization decides whether they occur at all. A FERZ doctrine.',
    ogTitle: 'Authorization is not monitoring | FERZ Doctrine',
    ogDescription: 'A canonical FERZ doctrine: monitoring describes actions after they occur; authorization decides whether they occur at all.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Authorization is not monitoring | FERZ Doctrine',
    twitterDescription: 'A canonical FERZ doctrine on the architectural distinction between monitoring and authorization.',
    image: 'https://ferz.ai/og/authorization-is-not-monitoring.png',
    canonical: 'https://ferz.ai/governance/doctrine/authorization-is-not-monitoring',
    type: 'article',
  },

  // ─── GOVERNANCE COMPARISONS ─────────────────────────────────────────────────
  '/governance/comparisons': {
    title: 'Architectural Comparisons | FERZ',
    h1: 'Architectural Comparisons',
    description: 'Eight architectural comparisons distinguishing FERZ from adjacent categories: policy engines, IAM, RASP, observability, agents, guardrails, HITL, SIEM.',
    ogTitle: 'FERZ Architectural Comparisons | FERZ',
    ogDescription: 'Eight comparisons demonstrating that AI-action authorization is a distinct architectural class, separable from adjacent infrastructure, security, and oversight categories.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ Architectural Comparisons | FERZ',
    twitterDescription: 'Eight comparisons distinguishing FERZ from adjacent architectural categories.',
    image: 'https://ferz.ai/og/ferz-comparisons-index.png',
    canonical: 'https://ferz.ai/governance/comparisons',
    type: 'article',
  },
  '/governance/comparisons/ferz-is-not-iam': {
    title: 'FERZ is not IAM: Architectural Differences | FERZ',
    h1: 'FERZ is not IAM',
    description: 'Why FERZ is not IAM: AI-action authorization governs what the AI may do; IAM governs who may access what. Different objects of authorization.',
    ogTitle: 'FERZ is not IAM: Architectural Differences | FERZ',
    ogDescription: 'FERZ is a runtime authorization architecture for proposed AI actions. IAM authorizes principals to access resources. The two systems govern different objects.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ is not IAM | FERZ',
    twitterDescription: 'Why FERZ is not IAM: AI-action authorization vs identity-and-access management.',
    image: 'https://ferz.ai/og/ferz-is-not-iam.png',
    canonical: 'https://ferz.ai/governance/comparisons/ferz-is-not-iam',
    type: 'article',
  },
  '/governance/comparisons/ferz-is-not-a-policy-engine': {
    title: 'FERZ is not a Policy Engine: Architectural Differences | FERZ',
    h1: 'FERZ is not a Policy Engine',
    description: 'FERZ is a runtime AI-action authorization architecture with a codification methodology that translates articulated constraints into runtime-enforceable encoded policy, built-in action canonicalization, governed state, ABSTAIN-with-override semantics, and a proof-carrying authorization artifact. A policy engine is a general-purpose policy decision point that evaluates caller-provided queries against caller-provided rules.',
    ogTitle: 'FERZ is not a Policy Engine: Architectural Differences | FERZ',
    ogDescription: 'FERZ is a runtime AI-action authorization architecture with a codification methodology, built-in action canonicalization, governed state, ABSTAIN-with-override semantics, and a proof-carrying authorization artifact.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ is not a Policy Engine | FERZ',
    twitterDescription: 'Why FERZ is not a Policy Engine: AI-action authorization architecture with codification of complex constraints vs general-purpose rule evaluation.',
    image: 'https://ferz.ai/og/ferz-is-not-a-policy-engine.png',
    canonical: 'https://ferz.ai/governance/comparisons/ferz-is-not-a-policy-engine',
    type: 'article',
  },
  '/governance/comparisons/ferz-is-not-ai-observability': {
    title: 'FERZ is not AI Observability: Architectural Differences | FERZ',
    h1: 'FERZ is not AI Observability',
    description: 'Why FERZ is not AI Observability: runtime authorization vs descriptive instrumentation. The categories operate at different positions in the AI stack.',
    ogTitle: 'FERZ is not AI Observability: Architectural Differences | FERZ',
    ogDescription: 'FERZ is a runtime authorization architecture. AI Observability is descriptive instrumentation. The two categories operate at different positions in the AI stack.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ is not AI Observability | FERZ',
    twitterDescription: 'Why FERZ is not AI Observability: runtime authorization vs descriptive instrumentation.',
    image: 'https://ferz.ai/og/ferz-is-not-ai-observability.png',
    canonical: 'https://ferz.ai/governance/comparisons/ferz-is-not-ai-observability',
    type: 'article',
  },
  '/governance/comparisons/ferz-is-not-an-agent-framework': {
    title: 'FERZ is not an Agent Framework | FERZ',
    h1: 'FERZ is not an Agent Framework',
    description: 'FERZ is a runtime AI-action authorization architecture with built-in action canonicalization, governed state, ABSTAIN-with-override semantics, and a proof-carrying authorization artifact. An agent framework is an orchestration library that wires up AI agents.',
    ogTitle: 'FERZ is not an Agent Framework | FERZ',
    ogDescription: 'FERZ authorizes proposed AI actions against policy. Agent frameworks like LangChain, AutoGen, and CrewAI orchestrate AI actions but do not authorize them.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ is not an Agent Framework | FERZ',
    twitterDescription: 'Why FERZ is not an agent framework: AI-action authorization vs AI-action orchestration.',
    image: 'https://ferz.ai/og/ferz-is-not-an-agent-framework.png',
    canonical: 'https://ferz.ai/governance/comparisons/ferz-is-not-an-agent-framework',
    type: 'article',
  },
  '/governance/comparisons/ferz-is-not-guardrails': {
    title: 'FERZ is not Guardrails | FERZ',
    h1: 'FERZ is not Guardrails',
    description: 'FERZ is a runtime AI-action authorization architecture with deterministic policy evaluation, built-in action canonicalization, governed state, ABSTAIN-with-override semantics, and a proof-carrying authorization artifact. Guardrails are a class of supervisory mechanisms that intercept AI inputs or outputs to filter unsafe content.',
    ogTitle: 'FERZ is not Guardrails | FERZ',
    ogDescription: 'FERZ provides deterministic, deny-by-default authorization of proposed AI actions against policy. Guardrails libraries supervise content via probabilistic filters and classifiers. Supervision is not authorization.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ is not Guardrails | FERZ',
    twitterDescription: 'Why FERZ is not guardrails: deterministic AI-action authorization vs probabilistic content filtering.',
    image: 'https://ferz.ai/og/ferz-is-not-guardrails.png',
    canonical: 'https://ferz.ai/governance/comparisons/ferz-is-not-guardrails',
    type: 'article',
  },
  '/governance/comparisons/ferz-is-not-human-in-the-loop': {
    title: 'FERZ is not Human-in-the-Loop | FERZ',
    h1: 'FERZ is not Human-in-the-Loop',
    description: 'FERZ is a runtime AI-action authorization architecture with built-in action canonicalization, governed state, ABSTAIN-with-override semantics, and a proof-carrying authorization artifact. Human-in-the-loop is a category of workflows in which a human reviewer makes or approves AI-action decisions.',
    ogTitle: 'FERZ is not Human-in-the-Loop | FERZ',
    ogDescription: 'FERZ places policy as the decider and invokes humans only as an authorized override path; HITL delegates the decision itself.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ is not Human-in-the-Loop | FERZ',
    twitterDescription: 'Why FERZ is not human-in-the-loop: policy-based authorization with ABSTAIN-and-override vs human decision delegation.',
    image: 'https://ferz.ai/og/ferz-is-not-human-in-the-loop.png',
    canonical: 'https://ferz.ai/governance/comparisons/ferz-is-not-human-in-the-loop',
    type: 'article',
  },
  '/governance/comparisons/ferz-is-not-siem': {
    title: 'FERZ is not SIEM | FERZ',
    h1: 'FERZ is not SIEM',
    description: 'FERZ is a runtime AI-action authorization architecture with built-in action canonicalization, governed state, ABSTAIN-with-override semantics, and a proof-carrying authorization artifact. Security Information and Event Management (SIEM) is a class of platforms that aggregate security events from enterprise systems and generate alerts for human investigators.',
    ogTitle: 'FERZ is not SIEM | FERZ',
    ogDescription: 'FERZ authorizes AI actions before execution. SIEM ingests events after execution and surfaces patterns for human investigators. Different architectural layers.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ is not SIEM | FERZ',
    twitterDescription: 'Why FERZ is not SIEM: ex-ante AI-action authorization vs post-hoc security event correlation.',
    image: 'https://ferz.ai/og/ferz-is-not-siem.png',
    canonical: 'https://ferz.ai/governance/comparisons/ferz-is-not-siem',
    type: 'article',
  },
  '/governance/comparisons/ferz-is-not-runtime-application-security': {
    title: 'FERZ is not Runtime Application Security | FERZ',
    h1: 'FERZ is not Runtime Application Security',
    description: 'FERZ is a runtime AI-action authorization architecture with built-in action canonicalization, governed state, ABSTAIN-with-override semantics, and a proof-carrying authorization artifact. Runtime Application Security is a class of security tools that detects and blocks attacks at runtime by inspecting requests, function calls, and data flows.',
    ogTitle: 'FERZ is not Runtime Application Security | FERZ',
    ogDescription: 'FERZ is a runtime AI-action authorization architecture. Runtime Application Security detects and blocks attacks at runtime. Runtime Application Security can be a useful component; it does not by itself constitute AI-action authorization.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ is not Runtime Application Security | FERZ',
    twitterDescription: 'Why FERZ is not Runtime Application Security: AI-action authorization vs attack detection at runtime.',
    image: 'https://ferz.ai/og/ferz-is-not-runtime-application-security.png',
    canonical: 'https://ferz.ai/governance/comparisons/ferz-is-not-runtime-application-security',
    type: 'article',
  },

  // ─── GOVERNANCE GLOSSARY & 4TS ──────────────────────────────────────────────
  '/governance/glossary': {
    title: 'Glossary of FERZ Governance Terms | FERZ',
    description: 'Canonical FERZ governance terms: verdicts, architectural commitments, framework concepts, and contrasted categories. Definitions derived from the FERZ corpus.',
    ogTitle: 'Glossary of FERZ Governance Terms | FERZ',
    ogDescription: 'Canonical FERZ governance terms: verdicts, architectural commitments, framework concepts, and contrasted categories.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/og/ferz-glossary.png',
    canonical: 'https://ferz.ai/governance/glossary',
    type: 'article',
  },
  '/governance/four-tests-standard': {
    title: 'Four Tests Standard (4TS): Verifiable AI Governance',
    description: '4TS converts AI governance from post-hoc narratives to mechanically verifiable proofs. Vendor-neutral standard with Proof-Carrying Decisions, deterministic replay, and public conformance testing.',
    ogTitle: 'Four Tests Standard (4TS): Verifiable AI Governance',
    ogDescription: 'Convert AI governance from performance theater to mechanically verifiable proof. Vendor-neutral standard with public conformance testing.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/assets/4ts/og-image.png',
    canonical: 'https://ferz.ai/governance/four-tests-standard',
    type: 'article',
  },
  '/governance/four-tests-standard/': {
    title: 'Four Tests Standard (4TS): Verifiable AI Governance',
    description: '4TS converts AI governance from post-hoc narratives to mechanically verifiable proofs. Vendor-neutral standard with Proof-Carrying Decisions, deterministic replay, and public conformance testing.',
    ogTitle: 'Four Tests Standard (4TS): Verifiable AI Governance',
    ogDescription: 'Convert AI governance from performance theater to mechanically verifiable proof. Vendor-neutral standard with public conformance testing.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/assets/4ts/og-image.png',
    canonical: 'https://ferz.ai/governance/four-tests-standard',
    type: 'article',
  },

  // ─── RESEARCH ────────────────────────────────────────────────────────────────
  '/research': {
    title: 'FERZ Research',
    description: 'FERZ research on deterministic AI governance: the corpus, open standards, and citation guidance for the thesis that AI governance is an enforcement problem.',
    ogTitle: 'FERZ Research',
    ogDescription: 'FERZ research on deterministic AI governance: the corpus, open standards, and citation guidance for the thesis that AI governance is an enforcement problem.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/og/research.png',
    canonical: 'https://ferz.ai/research',
    type: 'article',
  },
  '/research/papers': {
    title: 'FERZ Research | Papers',
    description: 'The FERZ research corpus on deterministic AI governance: impossibility, authorization, architecture, taxonomy. All papers open-access through the Zenodo FERZ community.',
    ogTitle: 'FERZ Research | Papers',
    ogDescription: 'The FERZ research corpus on deterministic AI governance: impossibility, authorization, architecture, taxonomy.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/og/research-papers.png',
    canonical: 'https://ferz.ai/research/papers',
    type: 'article',
  },
  '/research/open-standards': {
    title: 'FERZ Open Standards',
    description: 'FERZ open standards in deterministic AI governance, beginning with the Four Tests Standard (4TS): a vendor-neutral framework for evaluating AI governance artifacts.',
    ogTitle: 'FERZ Open Standards',
    ogDescription: 'FERZ-published open standards, beginning with the Four Tests Standard (4TS) for AI governance artifacts.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/og/research-open-standards.png',
    canonical: 'https://ferz.ai/research/open-standards',
    type: 'article',
  },
  '/research/citation': {
    title: 'How to Cite FERZ | FERZ Research',
    description: 'Citation guidance for FERZ corpus papers: DOI conventions, bibliography keys, and suggested citation formats.',
    ogTitle: 'How to Cite FERZ | FERZ Research',
    ogDescription: 'DOI conventions and bibliography guidance for FERZ corpus papers.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/og/research-citation.png',
    canonical: 'https://ferz.ai/research/citation',
    type: 'article',
  },

  // ─── PRODUCTS ────────────────────────────────────────────────────────────────
  '/products': {
    title: 'Products: FERZ Engines and Governance Architectures | FERZ',
    titleTag: 'Products: FERZ Engines and Governance Architectures | FERZ',
    h1: 'FERZ Engines and Governance Architectures',
    description: 'FERZ products include pathway engines, a cross-cutting engine, and governance architectures for regulated AI environments. Pathway engines assure determinism through distinct mechanisms; governance architectures organize those capabilities into recursive and multi-domain oversight systems.',
    keywords: 'AI governance products, deterministic AI, DELIA, LASO(f), CausaCore, STRATA-G, FERZ platform, AI governance stack, regulated AI compliance, 4TS standard',
    author: 'FERZ, Inc.',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    ogTitle: 'Products: FERZ Engines and Governance Architectures | FERZ',
    ogDescription: 'FERZ products include pathway engines, a cross-cutting engine, and governance architectures for regulated AI environments.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Products: FERZ Engines and Governance Architectures | FERZ',
    twitterDescription: 'FERZ products include pathway engines, a cross-cutting engine, and governance architectures for regulated AI environments.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/og/products.png',
    canonical: 'https://ferz.ai/products',
    type: 'website',
  },
  '/products/delia': {
    title: 'DELIA: FERZ\'s Patent-Pending Implementation of Constraint Determinism | FERZ',
    description: 'DELIA is FERZ\'s patent-pending implementation of the Constraint Determinism pathway. The architecture is designed for regulated environments where AI outputs must conform to bounded, codified constraints with cryptographically verifiable evidence. The constraint set is flat by design; conflicts resolve deterministically by global priority, with no hierarchical propagation between rules. The architecture specifies an independently replayable record for every governance decision.',
    ogTitle: 'DELIA: FERZ\'s Patent-Pending Implementation of Constraint Determinism | FERZ',
    ogDescription: 'DELIA is FERZ\'s patent-pending implementation of the Constraint Determinism pathway. The architecture is designed for regulated environments where AI outputs must conform to bounded, codified constraints with cryptographically verifiable evidence. The constraint set is flat by design; conflicts resolve deterministically by global priority, with no hierarchical propagation between rules. The architecture specifies an independently replayable record for every governance decision.',
    ogSiteName: 'FERZ',
    twitterTitle: 'DELIA: FERZ\'s Patent-Pending Implementation of Constraint Determinism | FERZ',
    twitterDescription: 'DELIA is FERZ\'s patent-pending implementation of the Constraint Determinism pathway. The architecture is designed for regulated environments where AI outputs must conform to bounded, codified constraints with cryptographically verifiable evidence. The constraint set is flat by design; conflicts resolve deterministically by global priority, with no hierarchical propagation between rules. The architecture specifies an independently replayable record for every governance decision.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/og/delia.png',
    canonical: 'https://ferz.ai/products/delia',
    type: 'website',
  },
  '/products/lasof': {
    title: 'LASO(f): FERZ\'s Patent-Pending Implementation of Semantic Determinism | FERZ',
    description: 'LASO(f) is FERZ\'s patent-pending implementation of the Semantic Determinism pathway. The architecture is designed for regulated environments where AI outputs and actions require deterministic governance and replayable evidence. A governance decision in one dimension cannot quietly contradict a decision in another. The architecture specifies an independently replayable record for every governance decision.',
    ogTitle: 'LASO(f): FERZ\'s Patent-Pending Implementation of Semantic Determinism | FERZ',
    ogDescription: 'LASO(f) is FERZ\'s patent-pending implementation of the Semantic Determinism pathway. The architecture is designed for regulated environments where AI outputs and actions require deterministic governance and replayable evidence. A governance decision in one dimension cannot quietly contradict a decision in another. The architecture specifies an independently replayable record for every governance decision.',
    ogSiteName: 'FERZ',
    twitterTitle: 'LASO(f): FERZ\'s Patent-Pending Implementation of Semantic Determinism | FERZ',
    twitterDescription: 'LASO(f) is FERZ\'s patent-pending implementation of the Semantic Determinism pathway. The architecture is designed for regulated environments where AI outputs and actions require deterministic governance and replayable evidence. A governance decision in one dimension cannot quietly contradict a decision in another. The architecture specifies an independently replayable record for every governance decision.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/og/lasof.png',
    canonical: 'https://ferz.ai/products/lasof',
    type: 'website',
  },
  '/products/lasof/lasof-ag': {
    title: 'LASO(f)-AG | Deterministic Action Validation for AI Governance | FERZ',
    description: 'LASO(f)-AG extends the LASO(f) framework to govern AI actions with deterministic validation, ensuring safety, compliance, and ethical alignment in real-time.',
    ogTitle: 'LASO(f)-AG | Deterministic Action Validation for AI Governance | FERZ',
    ogDescription: 'LASO(f)-AG extends the LASO(f) framework to govern AI actions with deterministic validation, ensuring safety, compliance, and ethical alignment in real-time.',
    ogSiteName: 'FERZ',
    twitterTitle: 'LASO(f)-AG | Deterministic Action Validation for AI Governance | FERZ',
    twitterDescription: 'LASO(f)-AG extends the LASO(f) framework to govern AI actions with deterministic validation, ensuring safety, compliance, and ethical alignment in real-time.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/wp-content/uploads/2025/04/las-banner-logo.png',
    canonical: 'https://ferz.ai/products/lasof',
    type: 'website',
  },
  '/products/causacore': {
    title: "CausaCore: FERZ's Patent-Pending Implementation of Causal Determinism | FERZ",
    h1: 'CausaCore',
    description: "CausaCore is FERZ's patent-pending implementation of the Causal Determinism pathway. The architecture supports independent operation as a deterministic causal modeling framework, and within the FERZ stack supplies causal structure that governance engines bind to, audit, and enforce. The architecture specifies multi-engine causal modeling with a deterministic engine-selection function, generating causal structure across multi-tier and cross-domain systems. Every result carries an explainable causal pathway that is independently traceable from input to causal conclusion.",
    ogTitle: "CausaCore: FERZ's Patent-Pending Implementation of Causal Determinism | FERZ",
    ogDescription: "CausaCore is FERZ's patent-pending implementation of the Causal Determinism pathway. The architecture supports independent operation as a deterministic causal modeling framework, and within the FERZ stack supplies causal structure that governance engines bind to, audit, and enforce.",
    ogSiteName: 'FERZ',
    twitterTitle: "CausaCore: FERZ's Patent-Pending Implementation of Causal Determinism | FERZ",
    twitterDescription: "CausaCore is FERZ's patent-pending implementation of the Causal Determinism pathway. The architecture supports independent operation as a deterministic causal modeling framework, and within the FERZ stack supplies causal structure that governance engines bind to, audit, and enforce.",
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/og/causacore.png',
    canonical: 'https://ferz.ai/products/causacore',
    type: 'article',
  },
  '/products/strata-g': {
    title: 'STRATA-G: FERZ\'s Published Recursive Governance Architecture | FERZ',
    description: 'STRATA-G is FERZ\'s published recursive governance architecture for highly autonomous AI systems. Published as defensive prior art, STRATA-G describes how governance, constraint enforcement, explainability, emergency coordination, adaptation, and security interact as a unified system. Individual FERZ engines implement specific operational capabilities within that broader architecture.',
    ogTitle: 'STRATA-G: FERZ\'s Published Recursive Governance Architecture',
    ogDescription: 'STRATA-G is FERZ\'s published recursive governance architecture for highly autonomous AI systems. Published as defensive prior art, STRATA-G describes how governance, constraint enforcement, explainability, emergency coordination, adaptation, and security interact as a unified system. Individual FERZ engines implement specific operational capabilities within that broader architecture.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/og/strata-g.png',
    canonical: 'https://ferz.ai/products/strata-g',
    type: 'website',
  },
  '/products/vectara-f': {
    title: 'VECTARA(f): FERZ\'s Published Multi-Domain Governance Architecture | FERZ',
    description: 'VECTARA(f) is FERZ\'s published multi-domain governance architecture for highly autonomous AI systems, and the broadest of FERZ\'s published governance frameworks. Published as defensive prior art, VECTARA(f) describes how safety, cross-domain emergency coordination, cultural knowledge integration, and accountable decision-making compose into one governance architecture spanning multiple domains, jurisdictions, and stakeholder communities. Individual FERZ engines implement specific operational capabilities within that broader architecture, and the companion architecture STRATA-G is the minimalist, recursive distillation of the same governance vision.',
    ogTitle: 'VECTARA(f): FERZ\'s Published Multi-Domain Governance Architecture',
    ogDescription: 'VECTARA(f) is FERZ\'s published multi-domain governance architecture for highly autonomous AI systems, and the broadest of FERZ\'s published governance frameworks. Published as defensive prior art, VECTARA(f) describes how safety, cross-domain emergency coordination, cultural knowledge integration, and accountable decision-making compose into one governance architecture spanning multiple domains, jurisdictions, and stakeholder communities. Individual FERZ engines implement specific operational capabilities within that broader architecture, and the companion architecture STRATA-G is the minimalist, recursive distillation of the same governance vision.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/og/vectara-f.png',
    canonical: 'https://ferz.ai/products/vectara-f',
    type: 'website',
  },
  '/products/ferz-behavioral-engine': {
    title: 'FERZ Behavioral Engine: FERZ\'s Patent-Pending Implementation of Adaptive Determinism | FERZ',
    description: 'FERZ Behavioral Engine is FERZ\'s patent-pending implementation of the Adaptive Determinism pathway. The architecture is designed for deployments where AI outputs must adapt to operational behavioral context while remaining bounded by mathematically governed adaptation ceilings. The architecture specifies multi-domain trajectory state modeling, deterministic rule-based modifier selection, and profile-defined ceilings on adaptation strength, so that adaptation remains inside the codified governance envelope rather than drifting outside it. Every adaptation carries an explainable rationale and an independently replayable record of the behavioral state, the modifiers applied, and the ceiling in force.',
    ogTitle: 'FERZ Behavioral Engine: FERZ\'s Patent-Pending Implementation of Adaptive Determinism',
    ogDescription: 'FERZ Behavioral Engine is FERZ\'s patent-pending implementation of the Adaptive Determinism pathway. The architecture is designed for deployments where AI outputs must adapt to operational behavioral context while remaining bounded by mathematically governed adaptation ceilings. The architecture specifies multi-domain trajectory state modeling, deterministic rule-based modifier selection, and profile-defined ceilings on adaptation strength, so that adaptation remains inside the codified governance envelope rather than drifting outside it. Every adaptation carries an explainable rationale and an independently replayable record of the behavioral state, the modifiers applied, and the ceiling in force.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ Behavioral Engine: FERZ\'s Patent-Pending Implementation of Adaptive Determinism',
    twitterDescription: 'FERZ Behavioral Engine is FERZ\'s patent-pending implementation of the Adaptive Determinism pathway. The architecture is designed for deployments where AI outputs must adapt to operational behavioral context while remaining bounded by mathematically governed adaptation ceilings. The architecture specifies multi-domain trajectory state modeling, deterministic rule-based modifier selection, and profile-defined ceilings on adaptation strength, so that adaptation remains inside the codified governance envelope rather than drifting outside it. Every adaptation carries an explainable rationale and an independently replayable record of the behavioral state, the modifiers applied, and the ceiling in force.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/og/ferz-behavioral-engine.png',
    canonical: 'https://ferz.ai/products/ferz-behavioral-engine',
    type: 'website',
  },
  '/products/constitutional-blockchain-architecture': {
    title: 'Constitutional Blockchain: FERZ\'s Patent-Pending Implementation of Consensus Determinism | FERZ',
    description: 'Constitutional Blockchain is FERZ\'s patent-pending implementation of the Consensus Determinism pathway. The architecture is designed for deployment in regulated environments where the authority to set the governing rules, validate the decision record, and halt operation must be distributed across multiple independent loci rather than held at a single point. By design, no single locus can change the governing rules or force a halt alone, and the distributed authority resolves constitutional decisions under a fixed rule. The architecture specifies a signed, append-only, independently verifiable record of every governance decision.',
    ogTitle: 'Constitutional Blockchain: FERZ\'s Patent-Pending Implementation of Consensus Determinism',
    ogDescription: 'Constitutional Blockchain is FERZ\'s patent-pending implementation of the Consensus Determinism pathway. The architecture is designed for deployment in regulated environments where the authority to set the governing rules, validate the decision record, and halt operation must be distributed across multiple independent loci rather than held at a single point. By design, no single locus can change the governing rules or force a halt alone, and the distributed authority resolves constitutional decisions under a fixed rule. The architecture specifies a signed, append-only, independently verifiable record of every governance decision.',
    ogSiteName: 'FERZ',
    twitterTitle: 'Constitutional Blockchain: FERZ\'s Patent-Pending Implementation of Consensus Determinism',
    twitterDescription: 'Constitutional Blockchain is FERZ\'s patent-pending implementation of the Consensus Determinism pathway. The architecture is designed for deployment in regulated environments where the authority to set the governing rules, validate the decision record, and halt operation must be distributed across multiple independent loci rather than held at a single point. By design, no single locus can change the governing rules or force a halt alone, and the distributed authority resolves constitutional decisions under a fixed rule. The architecture specifies a signed, append-only, independently verifiable record of every governance decision.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/og/constitutional-blockchain.png',
    canonical: 'https://ferz.ai/products/constitutional-blockchain-architecture',
    type: 'website',
  },
  '/products/bias-constraint-engine': {
    title: 'BiasConstraint Engine - Real-Time AI Bias Detection & Mitigation | FERZ',
    description: 'BiasConstraint Engine provides real-time cognitive bias detection and mitigation through Formula of Fate mathematical framework, four-domain analysis, and Objectivity Index scoring with tamper-evident audit trails.',
    ogTitle: 'BiasConstraint Engine - Real-Time AI Bias Detection & Mitigation | FERZ',
    ogDescription: 'BiasConstraint Engine provides real-time cognitive bias detection and mitigation through Formula of Fate mathematical framework, four-domain analysis, and Objectivity Index scoring.',
    ogSiteName: 'FERZ',
    twitterTitle: 'BiasConstraint Engine - Real-Time AI Bias Detection & Mitigation | FERZ',
    twitterDescription: 'BiasConstraint Engine provides real-time cognitive bias detection and mitigation through Formula of Fate mathematical framework, four-domain analysis, and Objectivity Index scoring.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/products/bias-constraint-engine',
    type: 'website',
  },
  '/products/how-it-works': {
    title: 'How FERZ Works: An Applied Overview | FERZ',
    description: 'FERZ sits at the point where AI outputs, decisions, and actions become operationally consequential. It does not replace the AI agent, the model, the application, the IAM layer, or the system of record. The FERZ architecture comprises five pathway engines. The deployed engines produce signed evidence of the decisions or outputs they govern, and all five share a common interoperability model and signed-record discipline.',
    ogTitle: 'How FERZ Works: An Applied Overview | FERZ',
    ogDescription: 'FERZ sits at the point where AI outputs, decisions, and actions become operationally consequential. It does not replace the AI agent, the model, the application, the IAM layer, or the system of record. The FERZ architecture comprises five pathway engines. The deployed engines produce signed evidence of the decisions or outputs they govern, and all five share a common interoperability model and signed-record discipline.',
    twitterTitle: 'How FERZ Works | FERZ',
    twitterDescription: 'FERZ sits at the point where AI outputs, decisions, and actions become operationally consequential. It does not replace the AI agent, the model, the application, the IAM layer, or the system of record. The FERZ architecture comprises five pathway engines. The deployed engines produce signed evidence of the decisions or outputs they govern, and all five share a common interoperability model and signed-record discipline.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/og/how-it-works.png',
    canonical: 'https://ferz.ai/products/how-it-works',
    type: 'article',
  },

  // ─── ARTICLES & ARCHIVE ──────────────────────────────────────────────────────
  '/articles': {
    title: 'Articles and Publications | FERZ',
    description: "Explore FERZ's latest insights on deterministic AI governance, mathematical certainty, and regulatory compliance. Expert analysis for enterprise leaders.",
    ogTitle: 'Articles and Publications | FERZ',
    ogDescription: "Explore FERZ's latest insights on deterministic AI governance, mathematical certainty, and regulatory compliance. Expert analysis for enterprise leaders.",
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/articles',
    type: 'website',
  },
  '/archive': {
    title: 'Archive | FERZ Working Papers',
    description: 'Public index of FERZ working papers.',
    ogTitle: 'Archive | FERZ Working Papers',
    ogDescription: 'Public index of FERZ working papers.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/archive',
    type: 'website',
  },

  // ─── INDUSTRIES ──────────────────────────────────────────────────────────────
  '/industries': {
    title: 'FERZ | Industries — Deterministic AI Governance for Regulated Markets',
    description: 'Deterministic AI governance infrastructure for regulated industries. Healthcare, financial services, insurance, and government & defense. Cryptographic proof, not probabilistic confidence.',
    ogTitle: 'FERZ | Industries — Deterministic AI Governance for Regulated Markets',
    ogDescription: 'Deterministic AI governance infrastructure for regulated industries. Healthcare, financial services, insurance, and government & defense.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ | Industries — Deterministic AI Governance for Regulated Markets',
    twitterDescription: 'Deterministic AI governance infrastructure for regulated industries. Healthcare, financial services, insurance, and government & defense.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/industries',
    type: 'website',
  },
  '/industries/healthcare': {
    title: 'FERZ | AI Governance for Healthcare & Pharma',
    description: 'FDA-aligned AI governance with cryptographic audit trails. PCCP-style change control. HIPAA compliance built in. Deterministic governance for clinical decision support and medical AI.',
    ogTitle: 'FERZ | AI Governance for Healthcare & Pharma',
    ogDescription: 'FDA-aligned AI governance with cryptographic audit trails. PCCP-style change control. HIPAA compliance built in.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ | AI Governance for Healthcare & Pharma',
    twitterDescription: 'FDA-aligned AI governance with cryptographic audit trails. PCCP-style change control. HIPAA compliance built in.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/industries/healthcare',
    type: 'website',
  },
  '/industries/financial-services': {
    title: 'FERZ | AI Governance for Financial Services',
    description: 'Audit-grade AI governance for financial services. Designed for SEC and FINRA examination readiness. Algorithmic trading governance, bias testing, and explainability for regulatory review.',
    ogTitle: 'FERZ | AI Governance for Financial Services',
    ogDescription: 'Audit-grade AI governance for financial services. Designed for SEC and FINRA examination readiness.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ | AI Governance for Financial Services',
    twitterDescription: 'Audit-grade AI governance for financial services. Designed for SEC and FINRA examination readiness.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/industries/financial-services',
    type: 'website',
  },
  '/industries/insurance': {
    title: 'FERZ | AI Governance for Insurance',
    description: 'Bias-constrained underwriting AI with audit evidence. Designed for state regulatory examination readiness. Claims processing governance and actuarial model transparency.',
    ogTitle: 'FERZ | AI Governance for Insurance',
    ogDescription: 'Bias-constrained underwriting AI with audit evidence. Designed for state regulatory examination readiness.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ | AI Governance for Insurance',
    twitterDescription: 'Bias-constrained underwriting AI with audit evidence. Designed for state regulatory examination readiness.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/industries/insurance',
    type: 'website',
  },
  '/industries/government-and-defense': {
    title: 'FERZ | AI Governance for Government & Defense',
    description: 'Deterministic AI governance infrastructure for government and defense. Authorization-grade decision control with reviewable evidence. Designed for constrained and mission-critical environments.',
    ogTitle: 'FERZ | AI Governance for Government & Defense',
    ogDescription: 'Deterministic AI governance infrastructure for government and defense. Authorization-grade decision control with reviewable evidence.',
    ogSiteName: 'FERZ',
    twitterTitle: 'FERZ | AI Governance for Government & Defense',
    twitterDescription: 'Deterministic AI governance infrastructure for government and defense. Authorization-grade decision control with reviewable evidence.',
    twitterSite: '@ferz_ai',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/industries/government-and-defense',
    type: 'website',
  },

  // ─── FERZ ADVISORY ───────────────────────────────────────────────────────────
  '/ferz-advisory': {
    title: 'FERZ | Deterministic AI Governance Advisory',
    description: 'FERZ Advisory prepares organizations for deterministic AI governance in regulated industries. Strategic engagements that bridge to platform adoption, not perpetual consulting.',
    ogTitle: 'FERZ | Deterministic AI Governance Advisory',
    ogDescription: 'FERZ Advisory prepares organizations for deterministic AI governance in regulated industries. Strategic engagements that bridge to platform adoption, not perpetual consulting.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/ferz-advisory',
    type: 'website',
  },
  '/ferz-advisory/governance-readiness': {
    title: 'FERZ | Governance Readiness Assessment',
    description: 'Audit current AI deployments, identify governance gaps, and map to regulatory requirements. Deliverable: gap analysis and FERZ adoption roadmap.',
    ogTitle: 'FERZ | Governance Readiness Assessment',
    ogDescription: 'Audit current AI deployments, identify governance gaps, and map to regulatory requirements. Deliverable: gap analysis and FERZ adoption roadmap.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/ferz-advisory/governance-readiness',
    type: 'website',
  },
  '/ferz-advisory/policy-rule-inventory': {
    title: 'FERZ | Policy & Rule Inventory',
    description: 'Document existing implicit and explicit rules, style guides, and compliance requirements before FERZ codification. Deliverable: comprehensive rule inventory ready for platform deployment.',
    ogTitle: 'FERZ | Policy & Rule Inventory',
    ogDescription: 'Document existing implicit and explicit rules, style guides, and compliance requirements before FERZ codification. Deliverable: comprehensive rule inventory ready for platform deployment.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/ferz-advisory/policy-rule-inventory',
    type: 'website',
  },
  '/ferz-advisory/regulatory-gap-analysis': {
    title: 'FERZ | Regulatory Gap Analysis',
    description: 'Map current state to applicable frameworks such as EU AI Act, FDA AI guidance, and SEC requirements. Deliverable: compliance roadmap with FERZ integration points.',
    ogTitle: 'FERZ | Regulatory Gap Analysis',
    ogDescription: 'Map current state to applicable frameworks such as EU AI Act, FDA AI guidance, and SEC requirements. Deliverable: compliance roadmap with FERZ integration points.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/ferz-advisory/regulatory-gap-analysis',
    type: 'website',
  },
  '/ferz-advisory/pre-implementation': {
    title: 'FERZ | Pre-Implementation Planning',
    description: 'Detailed roadmap for FERZ adoption including change management, stakeholder alignment, and success metrics. De-risk platform investment before commitment.',
    ogTitle: 'FERZ | Pre-Implementation Planning',
    ogDescription: 'Detailed roadmap for FERZ adoption including change management, stakeholder alignment, and success metrics. De-risk platform investment before commitment.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/ferz-advisory/pre-implementation',
    type: 'website',
  },

  // ─── METHODOLOGIES ───────────────────────────────────────────────────────────
  '/methodologies': {
    title: 'FERZ | Methodologies',
    description: 'FERZ methodologies for deterministic AI governance. Understand the governance landscape or explore our technical frameworks for authorization, knowledge representation, and cognitive enhancement.',
    ogTitle: 'FERZ | Methodologies',
    ogDescription: 'FERZ methodologies for deterministic AI governance. Understand the governance landscape or explore our technical frameworks for authorization, knowledge representation, and cognitive enhancement.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/methodologies',
    type: 'website',
  },
  '/methodologies/what-deterministic-governance-means': {
    title: 'What Deterministic AI Governance Means | FERZ',
    description: 'Deterministic AI governance enforces policy at runtime through non-bypassable authorization, producing cryptographic proof-carrying decisions that enable independent third-party verification. Learn how it differs from monitoring, logging, guardrails, and observability.',
    ogTitle: 'What Deterministic AI Governance Means',
    ogDescription: 'Deterministic AI governance enforces policy at runtime through non-bypassable authorization, producing cryptographic proof-carrying decisions that enable independent third-party verification.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/methodologies/what-deterministic-governance-means',
    type: 'website',
  },
  '/methodologies/methodology-portfolio': {
    title: 'FERZ | Methodology Portfolio',
    description: 'Technical frameworks for deterministic AI governance: Four Tests Standard (4TS), AI Capsule, Semantic Condensation Methodology, and Meta-Recursive Cognitive Framework.',
    ogTitle: 'FERZ | Methodology Portfolio',
    ogDescription: 'Technical frameworks for deterministic AI governance: Four Tests Standard (4TS), AI Capsule, Semantic Condensation Methodology, and Meta-Recursive Cognitive Framework.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/methodologies/methodology-portfolio',
    type: 'website',
  },
  '/methodologies/ai-capsule': {
    title: 'AI Capsule™ Methodology | FERZ',
    description: 'Proprietary AI Capsule™ methodology transforms enterprise knowledge into machine-readable constitutional artifacts. Exclusive FERZ consulting. Schedule assessment.',
    ogTitle: 'AI Capsule™ Methodology | FERZ',
    ogDescription: 'Proprietary AI Capsule™ methodology transforms enterprise knowledge into machine-readable constitutional artifacts. Exclusive FERZ consulting.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/methodologies/ai-capsule',
    type: 'website',
  },
  '/methodologies/mrcf': {
    title: 'MRCF: Meta-Recursive Cognition Framework | FERZ',
    description: 'Proprietary MRCF methodology for structured human-AI cognitive enhancement. Mathematical recursive dialogue, meta-validation protocols, and authority retention. Schedule assessment.',
    ogTitle: 'MRCF: Meta-Recursive Cognition Framework | FERZ',
    ogDescription: 'Proprietary MRCF methodology for structured human-AI cognitive enhancement. Mathematical recursive dialogue, meta-validation protocols, and authority retention.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/methodologies/mrcf',
    type: 'website',
  },
  '/methodologies/scm': {
    title: 'Semantic Condensation Methodology | FERZ',
    description: 'Proprietary SCM methodology for deterministic document compression. 94-97% compression with 100% structured data preservation, 90%+ semantic content. Patent-protected framework.',
    ogTitle: 'Semantic Condensation Methodology | FERZ',
    ogDescription: 'Proprietary SCM methodology for deterministic document compression. 94-97% compression with 100% structured data preservation, 90%+ semantic content.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/methodologies/scm',
    type: 'website',
  },
  '/methodologies/four-tests-standard-4ts': {
    title: 'Four Tests Standard (4TS): Verifiable AI Governance',
    description: '4TS converts AI governance from post-hoc narratives to mechanically verifiable proofs. Vendor-neutral standard with Proof-Carrying Decisions, deterministic replay, and public conformance testing.',
    ogTitle: 'Four Tests Standard (4TS): Verifiable AI Governance',
    ogDescription: 'Convert AI governance from performance theater to mechanically verifiable proof. Vendor-neutral standard with public conformance testing.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/assets/4ts/og-image.png',
    canonical: 'https://ferz.ai/governance/four-tests-standard',
    type: 'article',
  },
  '/methodologies/four-tests-standard-4ts/': {
    title: 'Four Tests Standard (4TS): Verifiable AI Governance',
    description: '4TS converts AI governance from post-hoc narratives to mechanically verifiable proofs. Vendor-neutral standard with Proof-Carrying Decisions, deterministic replay, and public conformance testing.',
    ogTitle: 'Four Tests Standard (4TS): Verifiable AI Governance',
    ogDescription: 'Convert AI governance from performance theater to mechanically verifiable proof. Vendor-neutral standard with public conformance testing.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/assets/4ts/og-image.png',
    canonical: 'https://ferz.ai/governance/four-tests-standard',
    type: 'article',
  },

  // ─── MISC ────────────────────────────────────────────────────────────────────
 '/ip-portfolio': {
  title: 'Intellectual Property Portfolio | FERZ',
  titleTag: 'Intellectual Property Portfolio | FERZ',
  h1: 'The Intellectual Property Behind Deterministic AI Governance',
  description: 'FERZ protects deterministic AI governance through a layered portfolio of patents, defensive publications, and an open standard, structured around the five pathway engines, the cross-cutting engine, and the published governance architectures that implement it.',
  ogTitle: 'Intellectual Property Portfolio | FERZ',
  ogDescription: 'FERZ protects deterministic AI governance through a layered portfolio of patents, defensive publications, and an open standard, structured around the five pathway engines, the cross-cutting engine, and the published governance architectures that implement it.',
  twitterTitle: 'Intellectual Property Portfolio | FERZ',
  twitterDescription: 'FERZ protects deterministic AI governance through a layered portfolio of patents, defensive publications, and an open standard, structured around the five pathway engines, the cross-cutting engine, and the published governance architectures that implement it.',
  image: 'https://ferz.ai/og/ip-portfolio.png',
  canonical: 'https://ferz.ai/ip-portfolio',
  type: 'website',
},
  '/ai-integrity-statement': {
    title: 'AI-Augmented Creative Integrity | FERZ',
    description: 'FERZ AI-Augmented Creative Integrity Declaration.',
    ogTitle: 'AI-Augmented Creative Integrity | FERZ',
    ogDescription: 'FERZ AI-Augmented Creative Integrity Declaration.',
    ogSiteName: 'FERZ',
    image: 'https://ferz.ai/Logo.svg',
    canonical: 'https://ferz.ai/ai-integrity-statement',
    type: 'website',
  },

  // ─── LEGACY SERVICE REDIRECTS (kept for backward compat) ────────────────────
  '/services-overview': {
    title: 'AI Governance Services | FERZ',
    description: 'FERZ transforms enterprise AI from probabilistic risk into mathematically guaranteed advantage. Deterministic services for compliance and transformation.',
    canonical: 'https://ferz.ai/ferz-advisory',
    type: 'website',
  },
  '/services-overview/ai-consulting': {
    title: 'AI Consulting for Regulated Industries | FERZ',
    description: "Transform enterprise AI from probabilistic risk to regulation-ready systems through FERZ's constitutional governance frameworks. Mathematical certainty. Schedule assessment.",
    canonical: 'https://ferz.ai/ferz-advisory',
    type: 'website',
  },
  '/services-overview/it-innovation-modernization': {
    title: 'AI-Ready IT Modernization | FERZ',
    description: 'Federal-proven IT transformation services with deterministic AI governance. Constitutional compliance frameworks, audit-ready modernization, and mathematical certainty.',
    canonical: 'https://ferz.ai/ferz-advisory/governance-readiness',
    type: 'website',
  },
  '/services-overview/strategic-advisory-services': {
    title: 'Strategic AI Advisory | FERZ',
    description: 'Federal-proven strategic advisory services with deterministic AI governance. Constitutional compliance frameworks, executive AI strategy, and mathematical certainty.',
    canonical: 'https://ferz.ai/ferz-advisory/pre-implementation',
    type: 'website',
  },
  '/services-overview/ai-enablement-strategy': {
    title: 'AI Enablement Strategy | FERZ',
    description: "Transform enterprise AI adoption with FERZ's deterministic enablement strategy. Constitutional AI roadmaps, regulatory readiness, and mathematical certainty.",
    canonical: 'https://ferz.ai/ferz-advisory/governance-readiness',
    type: 'website',
  },
  '/services-overview/design-of-ai-governance-models': {
    title: 'Constitutional AI Governance Design: Federal-Proven Frameworks | FERZ',
    description: 'Federal-proven constitutional AI governance design services delivering deterministic frameworks, mathematical guarantees, and regulatory compliance for enterprise AI systems.',
    canonical: 'https://ferz.ai/ferz-advisory/pre-implementation',
    type: 'website',
  },
  '/services-overview/within-paradigm-improvements': {
    title: 'Within-Paradigm AI Improvements | FERZ',
    description: 'Systematic AI improvement services with deterministic governance. Constitutional compliance frameworks, systematic enhancement, and mathematical certainty.',
    canonical: 'https://ferz.ai/ferz-advisory/policy-rule-inventory',
    type: 'website',
  },
  '/services-overview/strategic-advisory-services/ai-governance-executive-guides': {
    title: 'AI Governance Executive Guide Series | Evidence-Based AI Governance | FERZ',
    description: 'The AI Governance Executive Guide Series provides evidence-based governance frameworks for financial services, healthcare, federal programs, and government contractors.',
    canonical: 'https://ferz.ai/ferz-advisory',
    type: 'website',
  },
}
