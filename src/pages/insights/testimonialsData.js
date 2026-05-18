export const SPECIALTY_FILTERS = [
  { id: 'all', label: 'All specialties' },
  { id: 'orthopaedics', label: 'Orthopaedics' },
  { id: 'aesthetics', label: 'Aesthetics' },
  { id: 'medical', label: 'Medical practice' },
  { id: 'medspa', label: 'MedSpa' },
  { id: 'dentistry', label: 'Dentistry' },
]

export const HERO_STATS = [
  { value: '3+', label: 'Video testimonials' },
  { value: 'US & UK', label: 'Practices represented' },
  { value: '<60s', label: 'Each video' },
  { value: '0', label: 'Scripts used' },
]

export const FEATURED_VIDEO = {
  id: 'badia',
  specialty: 'orthopaedics',
  duration: '0:47',
  durationLabel: '47 seconds',
  specialtyLabel: 'Orthopaedic surgery · Miami, FL',
  name: 'Dr. Badia',
  practice: 'Miami Sports & Interventional',
  quote:
    'Before Socialsect we were getting hundreds of leads. What we weren\u2019t getting was patients who showed up and moved forward with care. That was the gap. That\u2019s what they fixed.',
  referenceHref: '/book-a-call',
  referenceLabel: 'Request a reference call',
  videoSrc: null,
}

/** Hidden until written permission is confirmed. */
export const CURATED_VIDEOS = []

/** Hidden until real submissions are approved for publication. */
export const COMMUNITY_VIDEOS = []

export const SUBMIT_STEPS = [
  {
    step: '1',
    title: 'You receive a link',
    body: 'Socialsect sends you a personalized submission link. It opens a simple recording page, no app download, no login.',
  },
  {
    step: '2',
    title: 'Record under 60 seconds',
    body: 'Use your phone or laptop camera. Say what you\u2019d say to another practice owner who asked about Socialsect. That\u2019s it.',
  },
  {
    step: '3',
    title: 'It goes live on this page',
    body: 'We review it and publish it here within 24 hours. If we have any questions, we\u2019ll reach out first. What you recorded is what we publish.',
  },
]

export const SUBMIT_TIPS = [
  'What your practice was struggling with before working with Socialsect',
  'What specifically changed after working together',
  'What you\u2019d tell another practice owner who asked about Socialsect',
]
