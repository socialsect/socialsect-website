export const SPECIALTY_FILTERS = [
  { id: 'all', label: 'All specialties' },
  { id: 'orthopaedics', label: 'Orthopaedics' },
  { id: 'aesthetics', label: 'Aesthetics' },
  { id: 'medical', label: 'Medical practice' },
  { id: 'medspa', label: 'MedSpa' },
  { id: 'dentistry', label: 'Dentistry' },
  { id: 'private-equity', label: 'Private equity' },
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
  referenceHref: 'https://miamishoulderinstitute.com/',
  referenceLabel: 'Talk to Dr. Badia',
  videoSrc: null,
}

export const CURATED_VIDEOS = [
  {
    id: 'mehra',
    specialty: 'aesthetics',
    duration: '0:52',
    specialtyLabel: 'Aesthetics · United States',
    name: 'Dr. Mehra',
    practice: 'Mehra Aesthetics',
    quote:
      'The diagnostic phase alone was worth more than six months with our previous agency.',
    videoSrc: null,
  },
  {
    id: 'goldman',
    specialty: 'medical',
    duration: '0:38',
    specialtyLabel: 'Medical practice · United States',
    name: 'Dr. Goldman',
    practice: 'Goldman Medical',
    quote: 'They don\u2019t send vanity reports. They send results. That\u2019s all I ever wanted.',
    videoSrc: null,
  },
]

export const COMMUNITY_VIDEOS = [
  {
    id: 'community-medspa',
    specialty: 'medspa',
    duration: '0:31',
    name: 'Dr. [Name]',
    role: 'MedSpa · London, UK',
    date: 'Submitted May 2026',
    videoSrc: null,
  },
  {
    id: 'community-dental',
    specialty: 'dentistry',
    duration: '0:44',
    name: 'Dr. [Name]',
    role: 'Dental practice · Chicago, US',
    date: 'Submitted April 2026',
    videoSrc: null,
  },
]

export const SUBMIT_STEPS = [
  {
    step: '1',
    title: 'You receive a link',
    body: 'Socialsect sends you a personalised submission link. It opens a simple recording page  no app download, no login.',
  },
  {
    step: '2',
    title: 'Record under 60 seconds',
    body: 'Use your phone or laptop camera. Say what you\u2019d say to another practice owner who asked about Socialsect. That\u2019s it.',
  },
  {
    step: '3',
    title: 'It goes live on this page',
    body: 'We review it and publish it here within 24 hours. No editing. No approval back and forth. What you recorded is what gets published.',
  },
]

export const SUBMIT_TIPS = [
  'What your practice was struggling with before working with Socialsect',
  'What specifically changed after working together',
  'What you\u2019d tell another practice owner who asked about Socialsect',
]
