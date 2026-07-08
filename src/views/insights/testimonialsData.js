import { BOOK_A_CALL_FORM } from '../../constants/routes.js'

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

export const FEATURED_VIDEOS = [
 
  {
    id: 'tyson-dirksen-featured',
    specialty: 'aesthetics',
    duration: '0:34',
    specialtyLabel: 'Evolve Group',
    name: 'Tyson Dirksen',
    practice: 'Evolve Group',
    quote: "Tyson: Worked with Socialsect to refine our patient intake and conversion  short, sharp, and honest.",
    referenceHref: BOOK_A_CALL_FORM,
    referenceLabel: 'Request a reference call',
    videoSrc: '/tyson.mp4',
    poster: '/posters/tyson.png',
  },
]

/** Hidden until written permission is confirmed. */
export const CURATED_VIDEOS = [
  {
    id: 'tyson-dirksen',
    specialty: 'aesthetics',
    specialtyLabel: 'Evolve Group',
    duration: '0:34',
    name: 'Tyson Dirksen',
    practice: 'Evolve Group',
    quote: "Tyson: Worked with Socialsect to refine our patient intake and conversion  short, sharp, and honest.",
    videoSrc: '/tyson.mp4',
    poster: '/posters/tyson.png',
  },
  {
    id: 'marcus-webb-proof',
    specialty: 'aesthetics',
    specialtyLabel: 'Cosmetic surgery · Manchester, UK',
    duration: '0:52',
    name: 'Dr. Marcus Webb',
    practice: 'Private practice',
    quote:
      "I cut my consultation volume by 20% and increased revenue by 35%. The patients we filtered out were never going to book anyway. We just hadn't built a way to know that before they arrived.",
    videoSrc: '/t2.mp4',
    poster: '/posters/t2.png',
    metrics: [
      { value: '+35%', label: 'Revenue on fewer consultations' },
      { value: '2.7×', label: 'Consultation-to-surgery conversion' },
      { value: '+62%', label: 'Combination procedure bookings' },
    ],
    talkToHref: '/references/marcus-webb',
    referenceHref: '/contact/reference',
  },
]

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
