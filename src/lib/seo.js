import { matchPath } from './match-path.js'
import { allSpecialties } from '../assets/specialty-content-matrix/content-matrix.js'
import { SERVICE_PILLARS } from '../views/services/servicesRegistry.js'
import { getServiceData } from '../views/services/serviceData.js'
import { getSpecialtyData } from '../views/who-we-help/specialtyData.js'
import { getRegionLandingData } from '../views/dermatologists/regionLandingData.js'
import { getOrmLandingData } from '../views/orthopaedic/ormLandingData.js'
import { getPlasticSurgeonLandingData } from '../views/plastic-surgeons/plasticSurgeonLandingData.js'
import { getDentistLandingData } from '../views/dentists/dentistLandingData.js'
import { getOrthopaedicSeoLandingData } from '../views/orthopaedic-surgeons/orthopaedicSurgeonsSeoData.js'
import { SEO_PAGE_META_OVERRIDES } from './seoPageMeta.js'

const SITE_NAME = 'Socialsect'
const SITE_URL = 'https://gosocialsect.com'
const DEFAULT_IMAGE = `${SITE_URL}/social-share.webp`
const LINKEDIN_URL = 'https://www.linkedin.com/company/socialsect'
const INSTAGRAM_URL = 'https://www.instagram.com/thesocialsect/'
const CONTACT_EMAIL = 'hello@gosocialsect.com'
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const NOINDEX_ROBOTS = 'noindex, nofollow, noarchive'

function absoluteUrl(pathname = '/') {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (normalizedPath === '/') {
    return SITE_URL
  }
  return `${SITE_URL}${normalizedPath}`
}

function trimToSentence(text, maxLength = 160) {
  if (!text) return ''
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized

  const sliced = normalized.slice(0, maxLength - 1)
  const lastSpace = sliced.lastIndexOf(' ')
  const output = lastSpace > maxLength * 0.6 ? sliced.slice(0, lastSpace) : sliced
  return `${output.replace(/[\s,;:.-]+$/u, '')}…`
}

function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, url }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: url,
    })),
  }
}

function buildPageSchema({ title, description, canonicalUrl, type = 'WebPage' }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: 'en-US',
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
  }
}

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/logo.svg`,
    image: DEFAULT_IMAGE,
    description:
      'Socialsect helps private medical practices in the US and UK grow with websites, SEO, paid media, brand, and clear reporting.',
    email: CONTACT_EMAIL,
    sameAs: [LINKEDIN_URL, INSTAGRAM_URL],
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: CONTACT_EMAIL,
        availableLanguage: ['English'],
        areaServed: ['US', 'GB'],
      },
    ],
  }
}

function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  }
}

function buildFaqSchema(faqs) {
  if (!faqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}

function buildItemList(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  }
}

function applyPageMetaOverrides(config, pathname) {
  const override = SEO_PAGE_META_OVERRIDES[pathname]
  if (!override) return config

  return {
    ...config,
    ...override,
  }
}

function buildSpecializedServiceSchema(specialty) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalService',
    name: `${specialty.specialtyLabel} Marketing & Web Services`,
    description: specialty.hero?.headline || specialty.specialtyLabel,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    specialty: specialty.specialtyLabel,
  }
}

function buildServiceDetailSchema(service, pillar) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.serviceLabel,
    description: service.description || service.serviceLabel,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    category: pillar,
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    serviceType: service.serviceLabel,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      description: 'Custom pricing based on practice scope and goals',
    },
  }
}

function homeConfig() {
  const canonicalUrl = absoluteUrl('/')
  const title = 'Socialsect :Patient Acquisition Systems for Private Medical Practices'
  const description =
    'We embed into your practice, diagnose exactly where patients are falling through the gaps, and build the system that closes them. Website, paid growth, SEO, brand, booking systems  one team. No packages. US & UK.'

  return {
    title,
    description,
    canonicalUrl,
    image: DEFAULT_IMAGE,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['private medical practice marketing', 'healthcare SEO', 'practice websites', 'medical marketing agency'],
    schemas: [buildWebsiteSchema(), buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function servicesConfig() {
  const canonicalUrl = absoluteUrl('/services')
  const title = 'Digital services for private medical practices | Socialsect'
  const description =
    'From practice websites and booking systems to paid growth and brand work, Socialsect builds the digital infrastructure private medical practices need.'

  const itemList = buildItemList(
    SERVICE_PILLARS.map((pillar) => ({
      name: pillar.label,
      url: `${canonicalUrl}#${pillar.id}`,
    })),
  )

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['practice websites', 'medical SEO', 'paid advertising', 'healthcare branding'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl, type: 'CollectionPage' }), itemList],
  }
}

function productsConfig() {
  const canonicalUrl = absoluteUrl('/products')
  const title = 'Whisper and Client Dashboard for practice teams | Socialsect'
  const description =
    'See how Whisper and Client Dashboard help practice teams capture anonymous feedback, keep clients informed, and keep work documented across every project.'

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['practice products', 'client dashboard', 'anonymous feedback', 'practice management'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function serviceDetailConfig(pathname, params) {
  const data = getServiceData(params.pillar, params.service)
  if (!data) return servicesConfig()

  const canonicalUrl = absoluteUrl(pathname)
  const title = `${data.serviceLabel} for private medical practices | Socialsect`
  const description = trimToSentence(
    data.hero?.subcopy?.[0] ?? data.included?.description ?? data.hero?.headline ?? '',
    160,
  )
  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Services', url: absoluteUrl('/services') },
    { name: data.pillarLabel, url: absoluteUrl(`/services#${data.pillar}`) },
    { name: data.serviceLabel, url: canonicalUrl },
  ])

  const faqSchema = buildFaqSchema(data.faqs)
  const serviceSchema = buildServiceDetailSchema(data, data.pillarLabel)

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: [data.serviceLabel, data.pillarLabel, 'private medical practice growth', 'healthcare marketing'],
    schemas: [
      buildOrganizationSchema(),
      buildPageSchema({ title, description, canonicalUrl }),
      breadcrumbs,
      serviceSchema,
      ...(faqSchema ? [faqSchema] : []),
    ],
  }
}

function servicesPillarConfig(pathname, params) {
  const label = params.pillar.charAt(0).toUpperCase() + params.pillar.slice(1)
  const canonicalUrl = absoluteUrl(pathname)
  const title = `${label} services coming soon | Socialsect`
  const description = `This ${label.toLowerCase()} section is coming soon.`

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: NOINDEX_ROBOTS,
    ogType: 'website',
    tags: ['coming soon', 'private medical practice marketing'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function howWeWorkConfig() {
  const canonicalUrl = absoluteUrl('/how-we-work')
  const title = 'How Socialsect works with private practices | Socialsect'
  const description =
    'See the process behind every Socialsect engagement: discovery, strategy, build, launch, and monthly iteration for private medical practices.'

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['agency process', 'private practice marketing process', 'healthcare growth system'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function whoWeHelpConfig() {
  const canonicalUrl = absoluteUrl('/who-we-help')
  const title = 'Private medical specialties we help grow | Socialsect'
  const description =
    'Socialsect works with orthopaedic surgeons, dermatologists, medspa owners, dentists, ophthalmologists, and other private medical practices.'

  const itemList = buildItemList(
    allSpecialties.map(({ slug, data }) => ({
      name: data.specialtyLabel,
      url: absoluteUrl(`/who-we-help/${slug}`),
    })),
  )

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['private medical specialties', 'healthcare marketing', 'specialty practice growth'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl, type: 'CollectionPage' }), itemList],
  }
}

function specialtyConfig(pathname, params) {
  const data = getSpecialtyData(params.specialty)
  if (!data) return whoWeHelpConfig()

  const canonicalUrl = absoluteUrl(pathname)
  const title = `${data.specialtyLabel} marketing for private practices | Socialsect`
  const description = trimToSentence(data.hero?.subcopy?.[0] ?? data.hero?.headline ?? '', 160)
  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: absoluteUrl('/') },
    { name: 'Who we help', url: absoluteUrl('/who-we-help') },
    { name: data.specialtyLabel, url: canonicalUrl },
  ])

  const specialtySchema = buildSpecializedServiceSchema(data)

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: [data.specialtyLabel, 'private practice marketing', 'healthcare SEO'],
    schemas: [
      buildOrganizationSchema(),
      buildPageSchema({ title, description, canonicalUrl }),
      breadcrumbs,
      specialtySchema,
    ],
  }
}

function resultsConfig() {
  const canonicalUrl = absoluteUrl('/results')
  const title = 'Measured results from private practice growth campaigns | Socialsect'
  const description =
    'Real numbers, real practice owners, and proof you can verify. See how Socialsect improves enquiry quality, conversion, and booked appointments.'

  const resultsAggregateSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '1',
    reviewAspect: 'Private Practice Growth Results',
    description: description,
  }

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['case studies', 'private practice results', 'healthcare marketing proof'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl, type: 'CollectionPage' }), resultsAggregateSchema],
  }
}

function aboutConfig() {
  const canonicalUrl = absoluteUrl('/about')
  const title = 'About Socialsect | built for private medical practices'
  const description =
    'Meet the founder and team behind Socialsect, the growth partner focused on helping private medical practices grow with clarity and accountability.'

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rayansh',
    jobTitle: 'Founder',
    worksFor: {
      '@id': `${SITE_URL}/#organization`,
    },
    url: canonicalUrl,
    image: `${SITE_URL}/team/rayansh.webp`,
    alumniOf: 'Socialsect',
  }

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'profile',
    tags: ['about Socialsect', 'healthcare marketing founder', 'private practice growth'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl, type: 'AboutPage' }), personSchema],
  }
}

function insightsConfig() {
  const canonicalUrl = absoluteUrl('/insights')
  const title = 'Insights for private medical practices | Socialsect'
  const description =
    'Articles, testimonials, and free resources built for private medical practices that want practical advice on growth, conversion, and acquisition.'

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['private practice insights', 'healthcare blog', 'patient acquisition resources'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl, type: 'CollectionPage' })],
  }
}

function testimonialsConfig() {
  const canonicalUrl = absoluteUrl('/insights/testimonials')
  const title = 'Client testimonials from private medical practices | Socialsect'
  const description =
    'Watch unscripted testimonials from private practice owners who worked with Socialsect on SEO, conversion, paid growth, and web projects.'

  const testimonialsSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGallery',
    name: title,
    description,
    url: canonicalUrl,
  }

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['client testimonials', 'video testimonials', 'private medical practice results'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl, type: 'CollectionPage' }), testimonialsSchema],
  }
}

function resourcesConfig() {
  const canonicalUrl = absoluteUrl('/insights/resources')
  const title = 'Free resources for private medical practices | Socialsect'
  const description =
    'Guides, templates, checklists, and reports used by Socialsect in live engagements, available free to private medical practices.'

  const resourceCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'ResourceCollection',
    name: title,
    description,
    url: canonicalUrl,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
  }

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['free marketing resources', 'practice growth templates', 'healthcare checklists'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl, type: 'CollectionPage' }), resourceCollectionSchema],
  }
}

function blogConfig() {
  const canonicalUrl = absoluteUrl('/insights/blog')
  const title = 'Private practice growth blog coming soon | Socialsect'
  const description =
    'The Socialsect blog is being built. When it launches, it will cover patient acquisition, SEO, seasonality, and practice growth.'

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: title,
    description,
    url: canonicalUrl,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
  }

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: NOINDEX_ROBOTS,
    ogType: 'website',
    tags: ['coming soon', 'private practice blog'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl }), blogSchema],
  }
}

function bookCallConfig() {
  const canonicalUrl = absoluteUrl('/book-a-call')
  const title = 'Book a practice audit | Socialsect'
  const description =
    'Tell us about your practice and we will tell you honestly whether we can help. Start with a free practice audit and an intro call.'

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['book a call', 'practice audit', 'healthcare consultation'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl, type: 'ContactPage' })],
  }
}

function clientPortalConfig() {
  const canonicalUrl = absoluteUrl('/client-portal')
  const title = 'Client portal coming soon | Socialsect'
  const description =
    'A private client portal for Socialsect clients is coming soon. Campaigns, SEO, website progress, leads, reports, and invoices will live here.'

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: NOINDEX_ROBOTS,
    ogType: 'website',
    tags: ['client portal', 'coming soon'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function avivaConfig() {
  const canonicalUrl = absoluteUrl('/aviva')
  const title = 'Private observation for Aviva Medical Spa | Socialsect'
  const description =
    'A private, personalized observation page prepared for Ava Franzoni and Aviva Medical Spa by Socialsect.'

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: NOINDEX_ROBOTS,
    ogType: 'website',
    tags: [],
    schemas: [buildPageSchema({ title, description, canonicalUrl })],
  }
}

function regionLandingConfig(pathname, params) {
  const data = getRegionLandingData(params.pageSlug)
  if (!data) {
    return notFoundConfig()
  }

  const canonicalUrl = absoluteUrl(pathname)
  const title = data.metaTitle
  const description = data.metaDescription

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: data.tags ?? ['dermatologist SEO', 'healthcare SEO', 'local SEO'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function ormLandingConfig(pathname, params) {
  const data = getOrmLandingData(params.pageSlug)
  if (!data) {
    return notFoundConfig()
  }

  const canonicalUrl = absoluteUrl(pathname)
  const title = data.metaTitle
  const description = data.metaDescription

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: data.tags ?? ['orthopaedic ORM', 'healthcare reputation', 'review management'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function plasticSurgeonLandingConfig(pathname, params) {
  const data = getPlasticSurgeonLandingData(params.pageSlug)
  if (!data) {
    return notFoundConfig()
  }

  const canonicalUrl = absoluteUrl(pathname)
  const title = data.metaTitle
  const description = data.metaDescription

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: data.tags ?? ['plastic surgeon marketing', 'healthcare marketing', 'cosmetic surgery SEO'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function dentistLandingConfig(pathname) {
  const slug = pathname.replace(/^\//, '')
  const data = getDentistLandingData(slug)
  if (!data) {
    return notFoundConfig()
  }

  const canonicalUrl = absoluteUrl(pathname)
  const title = data.metaTitle
  const description = data.metaDescription

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: data.tags ?? ['dentist SEO', 'dental SEO', 'local SEO for dentists'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function orthopaedicSeoLandingConfig(pathname) {
  const slug = pathname.replace(/^\//, '')
  const data = getOrthopaedicSeoLandingData(slug)
  if (!data) {
    return notFoundConfig()
  }

  const canonicalUrl = absoluteUrl(pathname)
  const title = data.metaTitle
  const description = data.metaDescription

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: data.tags ?? ['orthopaedic SEO', 'orthopedic SEO', 'orthopedic surgeon SEO'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}
function plasticSeoLandingConfig(pathname) {
  const slug = pathname.replace(/^\//, '')
  const data = getPlasticSurgeonLandingData(slug)
  if (!data) {
    return notFoundConfig()
  }

  const canonicalUrl = absoluteUrl(pathname)
  const title = data.metaTitle
  const description = data.metaDescription

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: data.tags ?? ['plastic surgeon SEO', 'plastic surgery SEO', 'cosmetic surgery SEO'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}
function visibilityConfig() {
  const canonicalUrl = absoluteUrl('/where-your-implant-practice-is-going-wrong')
  const title = 'Free Implant Practice Visibility Snapshot | Socialsect'
  const description = 'See how your implant practice compares to local competitors. Get your free visibility audit showing reviews gap, competitor position, and missed patient opportunities.'

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['implant dentistry', 'visibility audit', 'practice marketing', 'implant practice', 'dental visibility'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function veinVisibilityConfig() {
  const canonicalUrl = absoluteUrl('/where-your-vein-clinic-is-going-wrong')
  const title = 'Free Vein Clinic Visibility Snapshot | Socialsect'
  const description =
    'See how your vein clinic compares to local competitors. Get your free visibility snapshot covering local SEO, patient trust, website performance, and booking experience.'

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['vein clinic', 'visibility audit', 'vascular marketing', 'vein treatment', 'local SEO'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function notFoundConfig() {
  const canonicalUrl = absoluteUrl('/404')
  const title = 'Page not found | Socialsect'
  const description = 'The page you are looking for does not exist. Explore the Socialsect site or book a practice audit.'

  return {
    title,
    description,
    canonicalUrl,
    image: `${SITE_URL}/social-share-404.webp`,
    robots: NOINDEX_ROBOTS,
    ogType: 'website',
    tags: ['404', 'page not found'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function dubaiConfig() {
  const canonicalUrl = absoluteUrl('/dubai')
  const title = 'Socialsect Dubai | Patient Acquisition Systems for Private Medical Practices in the UAE'
  const description =
    'Proven in the US & UK, now in Dubai. Socialsect embeds into private medical practices, diagnoses exactly where patients fall through the gaps, and builds the system that closes them. Websites, paid growth, SEO, brand. One team. No packages.'

  return {
    title,
    description,
    canonicalUrl,
    image: DEFAULT_IMAGE,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['Dubai medical marketing', 'UAE healthcare marketing', 'private medical practice Dubai', 'patient acquisition Dubai'],
    schemas: [buildWebsiteSchema(), buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function uaeConfig() {
  const canonicalUrl = absoluteUrl('/uae')
  const title = 'Socialsect UAE | Patient Acquisition for Private Medical Practices'
  const description =
    'Before we talk about marketing, tell us about your clinic. Socialsect embeds into private medical practices in the UAE, diagnoses where patients fall through the gaps, and builds the system that closes them. One team. No packages. Let\u2019s have karak.'

  return {
    title,
    description,
    canonicalUrl,
    image: DEFAULT_IMAGE,
    robots: DEFAULT_ROBOTS,
    ogType: 'website',
    tags: ['UAE medical marketing', 'Dubai clinic marketing', 'private medical practice UAE', 'patient acquisition UAE', 'healthcare marketing Dubai'],
    schemas: [buildWebsiteSchema(), buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl })],
  }
}

function privacyPolicyConfig() {
  const canonicalUrl = absoluteUrl('/privacy-policy')
  const title = 'Privacy Policy | Socialsect'
  const description =
    'Read the Socialsect privacy policy covering how we collect, use, and protect your personal data.'

  return {
    title,
    description,
    canonicalUrl,
    image: DEFAULT_IMAGE,
    robots: 'noindex, nofollow',
    ogType: 'website',
    tags: [],
    schemas: [buildPageSchema({ title, description, canonicalUrl })],
  }
}

export function getBlogArticleSeo(pathname, params, articleData) {
  const canonicalUrl = absoluteUrl(`/insights/blog/${params.slug}`)
  const title = (articleData?.title ? `${articleData.title} | Socialsect` : 'Socialsect Blog | Healthcare Marketing Insights')
  const description = articleData?.description || articleData?.excerpt || 'Expert articles for private medical practice growth, SEO, paid media, and website conversion from Socialsect.'
  const image = articleData?.image || DEFAULT_IMAGE

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleData?.title || title,
    description,
    url: canonicalUrl,
    image,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@id': `${SITE_URL}/#organization` },
    ...(articleData?.publishedAt && { datePublished: articleData.publishedAt }),
    ...(articleData?.updatedAt && { dateModified: articleData.updatedAt }),
  }

  return {
    title,
    description,
    canonicalUrl,
    image,
    robots: articleData?.robots || DEFAULT_ROBOTS,
    ogType: 'article',
    tags: ['blog article', 'private medical practice marketing', 'healthcare SEO'],
    schemas: [buildOrganizationSchema(), buildWebsiteSchema(), articleSchema],
  }
}

function blogArticleConfig(pathname, params) {
  const canonicalUrl = absoluteUrl(`/insights/blog/${params.slug}`)
  const title = 'Socialsect blog article'
  const description =
    'Expert articles for private medical practice growth, SEO, paid media, and website conversion from Socialsect.'

  return {
    title,
    description,
    canonicalUrl,
    image: undefined,
    robots: DEFAULT_ROBOTS,
    ogType: 'article',
    tags: ['blog article', 'private medical practice marketing', 'healthcare SEO'],
    schemas: [buildOrganizationSchema(), buildPageSchema({ title, description, canonicalUrl, type: 'Article' })],
  }
}

/**
 * Convert a getSeoConfig result to a Next.js Metadata object.
 * Use this in generateMetadata() or static metadata exports.
 */
export function toNextMetadata(cfg) {
  const ogImageUrl = cfg.image
    ? cfg.image
    : `${SITE_URL}/api/og?title=${encodeURIComponent(cfg.title)}&description=${encodeURIComponent(cfg.description || '')}&type=${cfg.ogType || 'website'}`
  const imageArr = [{ url: ogImageUrl, width: 1200, height: 630, alt: cfg.title }]

  return {
    title: cfg.title,
    description: cfg.description,
    robots: cfg.robots,
    alternates: { canonical: cfg.canonicalUrl },
    openGraph: {
      siteName: SITE_NAME,
      locale: 'en_US',
      type: cfg.ogType ?? 'website',
      title: cfg.title,
      description: cfg.description,
      url: cfg.canonicalUrl,
      images: imageArr,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@thesocialsect',
      creator: '@thesocialsect',
      title: cfg.title,
      description: cfg.description,
      images: imageArr.map((i) => i.url),
    },
    other: {
      'linkedin:url': cfg.canonicalUrl,
      'linkedin:title': cfg.title,
      'linkedin:description': cfg.description,
    },
  }
}

export function getSeoConfig(pathname) {
  const cleanPath = pathname.replace(/\/+$/, '') || '/'

  const exactMatches = [
    { path: '/', config: homeConfig },
    { path: '/services', config: servicesConfig },
    { path: '/products', config: productsConfig },
    { path: '/how-we-work', config: howWeWorkConfig },
    { path: '/who-we-help', config: whoWeHelpConfig },
    { path: '/results', config: resultsConfig },
    { path: '/about', config: aboutConfig },
    { path: '/insights', config: insightsConfig },
    { path: '/insights/testimonials', config: testimonialsConfig },
    { path: '/insights/resources', config: resourcesConfig },
    { path: '/insights/blog', config: blogConfig },
    { path: '/book-a-call', config: bookCallConfig },
    { path: '/client-portal', config: clientPortalConfig },
    { path: '/aviva', config: avivaConfig },
    { path: '/dubai', config: dubaiConfig },
    { path: '/uae', config: uaeConfig },
    { path: '/where-your-implant-practice-is-going-wrong', config: visibilityConfig },
    { path: '/where-your-vein-clinic-is-going-wrong', config: veinVisibilityConfig },
    { path: '/privacy-policy', config: privacyPolicyConfig },
  ]

  for (const { path, config } of exactMatches) {
    if (matchPath(path, cleanPath)) {
      return applyPageMetaOverrides(config(), cleanPath)
    }
  }

  const serviceDetailMatch = matchPath('/services/:pillar/:service', cleanPath)
  if (serviceDetailMatch) {
    return applyPageMetaOverrides(serviceDetailConfig(cleanPath, serviceDetailMatch.params), cleanPath)
  }

  const servicePillarMatch = matchPath('/services/:pillar', cleanPath)
  if (servicePillarMatch) {
    return applyPageMetaOverrides(servicesPillarConfig(cleanPath, servicePillarMatch.params), cleanPath)
  }

  const specialtyMatch = matchPath('/who-we-help/:specialty', cleanPath)
  if (specialtyMatch) {
    return applyPageMetaOverrides(specialtyConfig(cleanPath, specialtyMatch.params), cleanPath)
  }

  const regionLandingMatch = matchPath('/seo-services-for-dermatologists/:pageSlug', cleanPath)
  if (regionLandingMatch) {
    return applyPageMetaOverrides(regionLandingConfig(cleanPath, regionLandingMatch.params), cleanPath)
  }

  const ormLandingMatch = matchPath('/orm-for-orthopaedic-surgeons/:pageSlug', cleanPath)
  if (ormLandingMatch) {
    return applyPageMetaOverrides(ormLandingConfig(cleanPath, ormLandingMatch.params), cleanPath)
  }

  const plasticSurgeonLandingMatch = matchPath('/healthcare-marketing-for-plastic-surgeons/:pageSlug', cleanPath)
  if (plasticSurgeonLandingMatch) {
    return applyPageMetaOverrides(plasticSurgeonLandingConfig(cleanPath, plasticSurgeonLandingMatch.params), cleanPath)
  }

  const dentistLandingMatch = matchPath('/seo-services-for-dentists-in-new-york', cleanPath) ||
    matchPath('/seo-services-for-dentists-in-los-angeles', cleanPath) ||
    matchPath('/seo-services-for-dentists-in-miami', cleanPath) ||
    matchPath('/seo-services-for-dentists-in-chicago', cleanPath) ||
    matchPath('/seo-services-for-dentists-in-houston', cleanPath) ||
    matchPath('/seo-services-for-dentists-in-dallas', cleanPath) ||
    matchPath('/seo-services-for-dentists-in-phoenix', cleanPath) ||
    matchPath('/seo-services-for-dentists-in-seattle', cleanPath) ||
    matchPath('/seo-services-for-dentists-in-boston', cleanPath) ||
    matchPath('/seo-services-for-dentists-in-atlanta', cleanPath)
  if (dentistLandingMatch) {
    return applyPageMetaOverrides(dentistLandingConfig(cleanPath), cleanPath)
  }

  const orthopaedicSeoLandingMatch = matchPath('/seo-services-orthopaedic-surgeons-los-angeles', cleanPath) ||
    matchPath('/seo-services-orthopaedic-surgeons-new-york', cleanPath) ||
    matchPath('/seo-services-orthopaedic-surgeons-miami', cleanPath) ||
    matchPath('/seo-services-orthopaedic-surgeons-chicago', cleanPath) ||
    matchPath('/seo-services-orthopaedic-surgeons-houston', cleanPath) ||
    matchPath('/seo-services-orthopaedic-surgeons-dallas', cleanPath) ||
    matchPath('/seo-services-orthopaedic-surgeons-phoenix', cleanPath) ||
    matchPath('/seo-services-orthopaedic-surgeons-atlanta', cleanPath) ||
    matchPath('/seo-services-orthopaedic-surgeons-seattle', cleanPath) ||
    matchPath('/seo-services-orthopaedic-surgeons-boston', cleanPath)
  if (orthopaedicSeoLandingMatch) {
    return applyPageMetaOverrides(orthopaedicSeoLandingConfig(cleanPath), cleanPath)
  }

  const plasticSeoLandingMatch = matchPath('/seo-services-for-plastic-surgeons-new-york', cleanPath) ||
    matchPath('/seo-services-for-plastic-surgeons-los-angeles', cleanPath) ||
    matchPath('/seo-services-for-plastic-surgeons-miami', cleanPath) ||
    matchPath('/seo-services-for-plastic-surgeons-chicago', cleanPath) ||
    matchPath('/seo-services-for-plastic-surgeons-houston', cleanPath) ||
    matchPath('/seo-services-for-plastic-surgeons-dallas', cleanPath) ||
    matchPath('/seo-services-for-plastic-surgeons-phoenix', cleanPath) ||
    matchPath('/seo-services-for-plastic-surgeons-atlanta', cleanPath) ||
    matchPath('/seo-services-for-plastic-surgeons-seattle', cleanPath) ||
    matchPath('/seo-services-for-plastic-surgeons-boston', cleanPath)
  if (plasticSeoLandingMatch) {
    return applyPageMetaOverrides(plasticSeoLandingConfig(cleanPath), cleanPath)
  }

  const articleMatch = matchPath('/insights/blog/:slug', cleanPath)
  if (articleMatch) {
    return applyPageMetaOverrides(blogArticleConfig(cleanPath, articleMatch.params), cleanPath)
  }

  return applyPageMetaOverrides(notFoundConfig(), cleanPath)
}
