import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { allServices } from '../src/assets/service-content-matrix/allServices.js'
import { allSpecialties } from '../src/assets/specialty-content-matrix/content-matrix.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const siteUrl = 'https://gosocialsect.com'
const today = '2026-05-22'

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

const routes = [...staticRoutes, ...serviceRoutes, ...specialtyRoutes]

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
</urlset>
`

await fs.writeFile(path.join(rootDir, 'public', 'sitemap.xml'), sitemap)
