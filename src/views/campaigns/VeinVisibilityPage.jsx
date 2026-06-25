import React from 'react';
import CampaignLandingPage from './CampaignLandingPage';

export const veinVisibilityContent = {
  pagePath: '/where-your-vein-clinic-is-going-wrong',
  pageTitle: 'Vein Clinic Visibility Snapshot',
  eyebrow: 'FREE VEIN CLINIC VISIBILITY SNAPSHOT',
  headline: (
    <>
      How visible is your <em>vein clinic</em> in your local market?
    </>
  ),
  subheadline:
    'See how your vein clinic compares against nearby competitors and uncover visibility gaps that may be costing you consultations.',
  formIntro:
    "Enter your clinic website and email. We'll analyze your visibility, online reputation, patient journey, and opportunities that may be costing your clinic new consultations.",
  quote:
    "Most vein clinics don't have a lead problem. They have a visibility and conversion problem.",
  trustMetrics: [
    { value: '2,971', label: 'Leads generated' },
    { value: '700+', label: 'Consultations booked' },
    { value: '$5.27', label: 'Average cost per lead' },
    { value: 'NY Metro Vein Medical', label: 'Featured client' },
  ],
  featuresTitle: 'What your snapshot shows',
  features: [
    {
      number: '01',
      title: 'Visibility Score',
      description: 'Google visibility, local SEO, and Maps presence compared with nearby vein clinics.',
    },
    {
      number: '02',
      title: 'Website Performance',
      description: 'Speed, mobile experience, and technical performance for patients searching on any device.',
    },
    {
      number: '03',
      title: 'Patient Trust',
      description: 'Reviews, testimonials, and online reputation signals that influence consultation decisions.',
    },
    {
      number: '04',
      title: 'Booking Experience',
      description: 'CTA visibility, forms, phone number placement, and booking friction on your site.',
    },
  ],
  whyTitle: 'Why this matters for vein clinics',
  whyIntro:
    'Vein treatment patients compare multiple clinics before booking. They weigh reviews, website clarity, mobile experience, and how easy it is to request a consultation. Small visibility and conversion gaps can quietly cost high-value appointments every month.',
  whyPoints: [
    { title: 'Local visibility', detail: 'determines whether patients find your clinic when searching for vein treatment' },
    { title: 'Review gap', detail: 'can push patients toward competitors with stronger social proof' },
    { title: 'Mobile experience', detail: 'matters because many vein patients search and book from their phones' },
    { title: 'Booking friction', detail: 'on CTAs, forms, or phone placement can reduce consultation requests' },
  ],
  finalCtaTitle: 'Find out where your clinic stands',
  finalCtaSubheadline: 'Generate your free Vein Clinic Visibility Snapshot',
  finalCtaLabel: 'Generate My Vein Clinic Snapshot',
  speedCalculatorProps: {
    formName: 'vein_visibility_snapshot',
    contentName: 'Vein Clinic Visibility Snapshot',
    niche: 'vein-clinic',
    submitLabel: 'Generate My Vein Clinic Snapshot →',
    loadingTitle: 'Analyzing your local visibility…',
    reportTitle: 'Your Vein Clinic Visibility Snapshot',
    websitePlaceholder: 'Clinic website URL',
    emailPlaceholder: 'Practice email',
    metricLabels: {
      visibility: 'Visibility Score',
      performance: 'Website Performance',
      mobile: 'Patient Trust',
      booking: 'Booking Experience',
    },
    opportunityNote:
      'Based on average vein treatment values and nearby market demand.',
    resetButtonLabel: 'Analyze Another Vein Clinic',
    nextSteps: [
      '{email}',
      'If we identify meaningful opportunities, our team may send a few practical recommendations.',
      'No obligation. No sales pitch.',
    ],
  },
};

export default function VeinVisibilityPage() {
  return <CampaignLandingPage {...veinVisibilityContent} />;
}
