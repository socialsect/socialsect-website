export const BLOG_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'patient-acquisition', label: 'Patient acquisition' },
  { id: 'seasonality', label: 'Seasonality' },
  { id: 'website-seo', label: 'Website + SEO' },
  { id: 'paid-ads', label: 'Paid ads' },
  { id: 'brand-creative', label: 'Brand + creative' },
  { id: 'practice-operations', label: 'Practice operations' },
  { id: 'by-specialty', label: 'By specialty' },
]

export const BLOG_CATEGORY_OPTIONS = [
  { id: 'all', label: 'All categories' },
  ...BLOG_CATEGORIES.filter((c) => c.id !== 'all'),
]

export const BLOG_SPECIALTY_OPTIONS = [
  { id: 'all', label: 'All specialties' },
  { id: 'all-specialties', label: 'All specialties (content)' },
  { id: 'orthopaedics', label: 'Orthopaedics' },
  { id: 'medspa', label: 'MedSpa' },
  { id: 'dermatology', label: 'Dermatology' },
  { id: 'dentistry', label: 'Dentistry' },
  { id: 'aesthetics', label: 'Aesthetics' },
]

export const SIDEBAR_SPECIALTIES = [
  'Orthopaedics',
  'MedSpa',
  'Dermatology',
  'Dentistry',
  'Aesthetics',
]

export const POPULAR_POSTS = [
  { id: 'slow-january', title: 'Why your slow January isn\u2019t a seasonality problem' },
  { id: 'meta-leads', title: 'The real reason your Meta leads don\u2019t show up' },
  { id: 'google-vs-meta', title: 'Google vs Meta for medical practices' },
  { id: 'website-convert', title: 'What a private practice website needs to convert' },
]

export const BLOG_ARTICLES = [
  {
    id: 'slow-january',
    slug: 'slow-january-seasonality',
    category: 'Patient acquisition',
    categoryId: 'patient-acquisition',
    specialty: 'all-specialties',
    specialtyLabel: 'All specialties',
    title: 'Why your slow January isn\u2019t a seasonality problem \u2014 it\u2019s a planning problem',
    excerpt:
      'Most practices react to slow months. The ones that don\u2019t have one thing in common: a system that anticipated it three months earlier.',
    readTime: '8 min read',
    featured: 'main',
  },
  {
    id: 'meta-leads',
    slug: 'meta-leads-no-show',
    category: 'Lead quality',
    categoryId: 'paid-ads',
    specialty: 'all-specialties',
    specialtyLabel: 'All specialties',
    title: 'The real reason your Meta leads don\u2019t show up \u2014 and it\u2019s not the ads',
    excerpt:
      'Lead volume is rarely the problem. Show rate and qualification are \u2014 and they start before the ad account.',
    readTime: '7 min read',
    featured: 'secondary',
  },
  {
    id: 'website-convert',
    slug: 'practice-website-convert',
    category: 'Website + SEO',
    categoryId: 'website-seo',
    specialty: 'all-specialties',
    specialtyLabel: 'All specialties',
    title: 'What a private practice website actually needs to convert',
    excerpt:
      'Most practice sites are built for credibility. The ones that grow are built for decision-making.',
    readTime: '6 min read',
    featured: 'secondary',
  },
  {
    id: 'google-vs-meta',
    slug: 'google-vs-meta-medical',
    category: 'Paid ads',
    categoryId: 'paid-ads',
    specialty: 'all-specialties',
    specialtyLabel: 'All specialties',
    title: 'Google vs Meta for medical practices \u2014 which one actually delivers patients',
    excerpt:
      'The answer depends on your specialty and where patients are in the decision process.',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 'no-shows',
    slug: 'reduce-no-shows',
    category: 'Practice operations',
    categoryId: 'practice-operations',
    specialty: 'all-specialties',
    specialtyLabel: 'All specialties',
    title: 'How to reduce no-show rates without adding to your front desk\u2019s workload',
    excerpt:
      'No-shows are a system problem. Most practices try to solve them with phone calls.',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: 'medspa-2025',
    slug: 'medspa-patient-acquisition-2025',
    category: 'By specialty',
    categoryId: 'by-specialty',
    specialty: 'medspa',
    specialtyLabel: 'MedSpa owners',
    title: 'MedSpa patient acquisition in 2025 \u2014 what\u2019s working and what\u2019s not',
    excerpt:
      'The MedSpa market has changed. What worked two years ago is underperforming.',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 'brand-matters',
    slug: 'practice-brand-matters',
    category: 'Brand + creative',
    categoryId: 'brand-creative',
    specialty: 'all-specialties',
    specialtyLabel: 'All specialties',
    title: 'Why your practice brand matters more than you think \u2014 and less than consultants say',
    excerpt:
      'Brand isn\u2019t about logos. It\u2019s about what a patient decides before they speak to you.',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 'five-pages',
    slug: 'five-website-pages',
    category: 'Website + SEO',
    categoryId: 'website-seo',
    specialty: 'all-specialties',
    specialtyLabel: 'All specialties',
    title: 'The 5 pages every private practice website needs \u2014 and what should be on each one',
    excerpt:
      'Most practice websites have too many pages doing too little. Here\u2019s what actually matters.',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 'ortho-insurance',
    slug: 'orthopaedic-insurance-leads',
    category: 'By specialty',
    categoryId: 'by-specialty',
    specialty: 'orthopaedics',
    specialtyLabel: 'Orthopaedics',
    title: 'Orthopaedic patient acquisition: why insurance pre-qualification changes everything',
    excerpt:
      'Out-of-network orthopaedic practices lose 60\u201370% of leads to insurance friction. Here\u2019s the fix.',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 'q4-planning',
    slug: 'q4-patient-acquisition',
    category: 'Seasonality',
    categoryId: 'seasonality',
    specialty: 'all-specialties',
    specialtyLabel: 'All specialties',
    title: 'Planning patient acquisition for Q4 before August ends',
    excerpt:
      'The practices that fill November and December start building demand in late summer \u2014 not in October.',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 'seo-local',
    slug: 'local-seo-specialists',
    category: 'Website + SEO',
    categoryId: 'website-seo',
    specialty: 'dermatology',
    specialtyLabel: 'Dermatology',
    title: 'Local SEO for specialist practices: what actually moves the ranking needle',
    excerpt:
      'Generic SEO advice fails specialists. Authority, procedure pages, and geographic intent do the work.',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 'dental-implants',
    slug: 'dental-implant-leads',
    category: 'By specialty',
    categoryId: 'by-specialty',
    specialty: 'dentistry',
    specialtyLabel: 'Dentistry',
    title: 'Dental implant lead quality: why cost per lead is the wrong metric',
    excerpt:
      'Implant cases need consultation show rate and case acceptance \u2014 not cheaper clicks.',
    readTime: '5 min read',
    featured: false,
  },
]

export const FEATURED_MAIN = BLOG_ARTICLES.find((a) => a.featured === 'main')
export const FEATURED_SECONDARY = BLOG_ARTICLES.filter((a) => a.featured === 'secondary')

export function filterArticles(articles, { categoryId, specialtyId, search }) {
  const q = search.trim().toLowerCase()
  return articles.filter((article) => {
    if (categoryId !== 'all' && article.categoryId !== categoryId) return false
    if (specialtyId === 'all-specialties') {
      if (article.specialty !== 'all-specialties') return false
    } else if (specialtyId !== 'all') {
      if (article.specialty !== specialtyId && article.specialty !== 'all-specialties') {
        return false
      }
    }
    if (q) {
      const haystack = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

export function getGridArticles(articles) {
  return articles.filter((a) => !a.featured)
}
