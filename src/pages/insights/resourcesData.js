export const RESOURCE_TYPES = [
  { id: 'all', label: 'All resources' },
  { id: 'guide', label: 'Guide' },
  { id: 'template', label: 'Template' },
  { id: 'checklist', label: 'Checklist' },
  { id: 'report', label: 'Report' },
]

export const RESOURCE_SPECIALTY_OPTIONS = [
  { id: 'all', label: 'All specialties' },
  { id: 'all-specialties', label: 'All specialties (content)' },
  { id: 'orthopaedics', label: 'Orthopaedics' },
  { id: 'medspa', label: 'MedSpa' },
  { id: 'dermatology', label: 'Dermatology' },
  { id: 'dentistry', label: 'Dentistry' },
  { id: 'aesthetics', label: 'Aesthetics' },
  { id: 'us-uk', label: 'US + UK' },
]

export const TYPE_LEGEND = [
  { type: 'guide', label: 'Guide', hint: 'In-depth · 10–30 pages' },
  { type: 'template', label: 'Template', hint: 'Ready to use · editable files' },
  { type: 'checklist', label: 'Checklist', hint: 'Quick reference · 1–2 pages' },
  { type: 'report', label: 'Report', hint: 'Original research · data-backed' },
]

export const MOST_DOWNLOADED = [
  { type: 'guide', title: 'Practice Growth Diagnostic' },
  { type: 'checklist', title: 'Pre-slow-season checklist', badgeLabel: 'Checklist' },
  { type: 'report', title: '2025 marketing report' },
]

export const GATE_SPECIALTY_OPTIONS = [
  'All specialties',
  'Orthopaedics',
  'MedSpa',
  'Dermatology',
  'Dentistry',
  'Aesthetics',
  'Other',
]

export const DOWNLOAD_STEPS = [
  {
    step: '1',
    title: 'Request it:',
    body: 'Click download and enter your email in the popup.',
  },
  {
    step: '2',
    title: 'We send it:',
    body: 'We email the resource to you shortly after you submit the form.',
  },
  {
    step: '3',
    title: 'No spam:',
    body: "That\'s it. No drip campaign and no extra marketing emails from this form.",
  },
]

export const FEATURED_RESOURCE = {
  id: 'growth-diagnostic',
  type: 'guide',
  title:
    'The Practice Growth Diagnostic: find exactly where your patient acquisition is leaking',
  shortTitle: 'The Practice Growth Diagnostic',
  description:
    'A self-assessment framework used in every Socialsect onboarding. 20 questions. Clear output. Takes 20 minutes and tells you exactly where your practice is losing patients before they book. Used by practice owners across the US and UK before and after working with agencies.',
  format: 'PDF · 12 pages',
  time: '20 minutes to complete',
  specialty: 'All specialties',
  gated: false,
  badge: 'Most downloaded',
  coverLabel: 'PDF · 12 pages',
}

export const RESOURCES = [
  {
    id: 'slow-season-checklist',
    type: 'checklist',
    title: 'Pre-slow-season checklist: what to have in place 8 weeks before your quiet period',
    description:
      'The exact checklist Socialsect runs for clients before every seasonal dip. One page. Actionable. Specific to private practice. No filler.',
    meta: 'PDF · 1 page · All specialties',
    gated: false,
    cta: 'Download free',
    specialty: 'all-specialties',
  },
  {
    id: 'website-brief',
    type: 'template',
    title: 'Private practice website brief: what to tell your developer before they start',
    description:
      'Most practice websites fail because the brief was wrong. This template fixes that before the first conversation with any developer or agency.',
    meta: 'PDF · 6 pages · All specialties',
    gated: true,
    cta: 'Get free',
    specialty: 'all-specialties',
  },
  {
    id: 'patient-acquisition-guide',
    type: 'guide',
    title: 'The private practice patient acquisition guide: what works in 2025 and what doesn\u2019t',
    description:
      'A comprehensive breakdown of every channel: what it costs, what it converts, and which specialties it works best for.',
    meta: 'PDF · 24 pages · All specialties',
    gated: true,
    cta: 'Get free',
    specialty: 'all-specialties',
  },
  {
    id: 'website-conversion-checklist',
    type: 'checklist',
    title: 'Website conversion checklist: 15 things your practice website needs to be doing',
    description:
      'Audit your current website in 30 minutes. If more than 5 of these are missing, you\u2019re losing patients at the first touchpoint.',
    meta: 'PDF · 2 pages · All specialties',
    gated: false,
    cta: 'Download free',
    specialty: 'all-specialties',
  },
  {
    id: 'marketing-report-2025',
    type: 'report',
    title: 'Private medical practice marketing report: what 50 practice owners told us in 2025',
    description:
      'Original research. What practices are spending, what\u2019s working, and the biggest challenges they face going into 2026.',
    meta: 'PDF · 18 pages · US + UK',
    gated: true,
    cta: 'Get free',
    specialty: 'us-uk',
  },
  {
    id: 'performance-template',
    type: 'template',
    title: 'Monthly practice performance report template: measure what matters',
    description:
      'Stop receiving reports full of impressions. This template shows you what to track and what to ask your agency for every single month.',
    meta: 'Spreadsheet · Google Sheets · All specialties',
    gated: false,
    cta: 'Download free',
    specialty: 'all-specialties',
  },
]

export function filterResources(resources, { typeId, specialtyId }) {
  return resources.filter((resource) => {
    if (typeId !== 'all' && resource.type !== typeId) return false
    if (specialtyId === 'all') return true
    if (specialtyId === 'all-specialties') {
      return resource.specialty === 'all-specialties'
    }
    if (specialtyId === 'us-uk') {
      return resource.specialty === 'us-uk' || resource.specialty === 'all-specialties'
    }
    return resource.specialty === specialtyId || resource.specialty === 'all-specialties'
  })
}
