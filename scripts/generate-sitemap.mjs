import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
import { allServices } from '../src/assets/service-content-matrix/allServices.js'
import { allSpecialties } from '../src/assets/specialty-content-matrix/content-matrix.js'
import { regionLandingPageMap } from '../src/views/dermatologists/regionLandingData.js'
import { ormLandingPageMap } from '../src/views/orthopaedic/ormLandingData.js'
import { plasticSurgeonLandingPageMap } from '../src/views/plastic-surgeons/plasticSurgeonLandingData.js'

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

const staticRoutes = [
  '/',
  '/services',
  '/how-we-work',
  '/who-we-help',
  '/results',
  '/about',
  '/insights',
  '/insights/testimonials',
  '/insights/resources',
  '/book-a-call',
]

const serviceRoutes = allServices.map(({ path: routePath }) => routePath)
const specialtyRoutes = allSpecialties.map(({ slug }) => `/who-we-help/${slug}`)
const regionLandingRoutes = Object.values(regionLandingPageMap).map(({ path: routePath }) => routePath)
const ormLandingRoutes = Object.values(ormLandingPageMap).map(({ path: routePath }) => routePath)
const plasticSurgeonLandingRoutes = Object.values(plasticSurgeonLandingPageMap).map(({ path: routePath }) => routePath)

// Fetch blog articles from Sanity
let blogRoutes = []
try {
  const articles = await sanity.fetch(`*[_type == "post"] {
    "slug": slug.current,
    publishedAt,
    updatedAt,
    _updatedAt
  }`)
  
  blogRoutes = articles.map(article => ({
    path: `/insights/blog/${article.slug}`,
    lastmod: article.updatedAt || article.publishedAt || article._updatedAt || today
  }))
  
  console.log(`✓ Fetched ${blogRoutes.length} articles from Sanity`)
} catch (error) {
  console.error('✗ Failed to fetch articles from Sanity:', error.message)
  console.log('Continuing with static routes only...')
}

const routes = [...staticRoutes, ...serviceRoutes, ...specialtyRoutes, ...regionLandingRoutes, ...ormLandingRoutes, ...plasticSurgeonLandingRoutes]

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
</urlset>
`

await fs.writeFile(path.join(rootDir, 'public', 'sitemap.xml'), sitemap)
console.log('✓ Sitemap generated successfully')
