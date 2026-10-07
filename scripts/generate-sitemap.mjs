import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
import { allServices } from '../src/assets/service-content-matrix/allServices.js'
import { allSpecialties } from '../src/assets/specialty-content-matrix/content-matrix.js'
import { regionLandingPageMap } from '../src/views/dermatologists/regionLandingData.js'
import { ormLandingPageMap } from '../src/views/orthopaedic/ormLandingData.js'
import { plasticSurgeonLandingPageMap } from '../src/views/plastic-surgeons/plasticSurgeonLandingData.js'
import { dentistLandingPageMap } from '../src/views/dentists/dentistLandingData.js'
import { orthopaedicSeoLandingPageMap } from '../src/views/orthopaedic-surgeons/orthopaedicSurgeonsSeoData.js'
import { dubaiRegionPageMap } from '../src/views/dubai/dubaiRegionData.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const siteUrl = 'https://gosocialsect.com'
const today = new Date().toISOString().split('T')[0]

// Sanity client setup
const sanity = createClient({
  projectId: 'nj6mz3im',
  dataset: 'production',
  apiVersion: '2025-05-30',
  useCdn: true,
})

/** Core public pages present in the Next.js app router. */
const staticRoutes = [
  '/',
  '/services',
  '/services/brand/content-library',
  '/products',
  '/how-we-work',
  '/who-we-help',
  '/results',
  '/about',
  '/insights',
  '/insights/blog',
  '/insights/testimonials',
  '/insights/resources',
  '/book-a-call',
  '/dubai',
  '/uae',
  '/privacy-policy',
  '/where-your-implant-practice-is-going-wrong',
  '/where-your-vein-clinic-is-going-wrong',
]

/**
 * Public marketing-agency landing pages under
 * /marketing-agency-for-dermatologists/* (Next.js static routes).
 * Not part of regionLandingPageMap — listed here so the sitemap is complete.
 */
const marketingAgencyDermRoutes = [
  '/marketing-agency-for-dermatologists/dubai',
  '/marketing-agency-for-dermatologists/dubai-marina',
  '/marketing-agency-for-dermatologists/downtown-dubai',
  '/marketing-agency-for-dermatologists/jumeirah',
  '/marketing-agency-for-dermatologists/business-bay',
  '/marketing-agency-for-dermatologists/dubai-healthcare-city',
  '/marketing-agency-for-dermatologists/al-barsha',
  '/marketing-agency-for-dermatologists/palm-jumeirah',
  '/marketing-agency-for-dermatologists/jbr',
  '/marketing-agency-for-dermatologists/sheikh-zayed-road',
]

/** Static UAE derm SEO page that is not in regionLandingPageMap. */
const extraDermSeoRoutes = ['/seo-services-for-dermatologists/dubai']

const serviceRoutes = allServices.map(({ path: routePath }) => routePath)
const specialtyRoutes = allSpecialties.map(({ slug }) => `/who-we-help/${slug}`)
const regionLandingRoutes = Object.values(regionLandingPageMap).map(({ path: routePath }) => routePath)
const ormLandingRoutes = Object.values(ormLandingPageMap).map(({ path: routePath }) => routePath)
const plasticSurgeonLandingRoutes = Object.values(plasticSurgeonLandingPageMap).map(({ path: routePath }) => routePath)
const dentistLandingRoutes = Object.values(dentistLandingPageMap).map(({ path: routePath }) => routePath)
const orthopaedicSeoLandingRoutes = Object.values(orthopaedicSeoLandingPageMap).map(({ path: routePath }) => routePath)
const dubaiRegionRoutes = Object.values(dubaiRegionPageMap).map(({ path: routePath }) => routePath)

// Fetch published blog articles + authors from Sanity
let blogRoutes = []
let authorRoutes = []

try {
  const articles = await sanity.fetch(`*[_type == "post"] {
    "slug": slug.current,
    publishedAt,
    updatedAt,
    _updatedAt,
    robots
  }`)

  blogRoutes = articles
    .filter((article) => article.slug && !(article.robots && String(article.robots).includes('noindex')))
    .map((article) => ({
      path: `/insights/blog/${article.slug}`,
      lastmod: article.updatedAt || article.publishedAt || article._updatedAt || today,
    }))

  console.log(`✓ Fetched ${blogRoutes.length} articles from Sanity`)
} catch (error) {
  console.error('✗ Failed to fetch articles from Sanity:', error.message)
  console.log('Continuing with static routes only...')
}

try {
  const authors = await sanity.fetch(`*[_type == "author"] { "slug": slug.current }`)
  authorRoutes = authors
    .filter((author) => author.slug)
    .map((author) => `/insights/blog/author/${author.slug}`)
  console.log(`✓ Fetched ${authorRoutes.length} authors from Sanity`)
} catch (error) {
  console.error('✗ Failed to fetch authors from Sanity:', error.message)
}

const staticPathSet = new Set([
  ...staticRoutes,
  ...marketingAgencyDermRoutes,
  ...extraDermSeoRoutes,
  ...serviceRoutes,
  ...specialtyRoutes,
  ...regionLandingRoutes,
  ...ormLandingRoutes,
  ...plasticSurgeonLandingRoutes,
  ...dentistLandingRoutes,
  ...orthopaedicSeoLandingRoutes,
  ...dubaiRegionRoutes,
])

const routes = [...staticPathSet]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (routePath) => `  <url>
    <loc>${siteUrl}${routePath === '/' ? '' : routePath}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
${blogRoutes
  .map(
    ({ path: routePath, lastmod }) => `  <url>
    <loc>${siteUrl}${routePath}</loc>
    <lastmod>${typeof lastmod === 'string' ? lastmod.split('T')[0] : today}</lastmod>
  </url>`,
  )
  .join('\n')}
${authorRoutes
  .map(
    (routePath) => `  <url>
    <loc>${siteUrl}${routePath}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await fs.writeFile(path.join(rootDir, 'public', 'sitemap.xml'), sitemap)

const total =
  routes.length + blogRoutes.length + authorRoutes.length
console.log(`✓ Sitemap generated successfully (${total} URLs)`)
