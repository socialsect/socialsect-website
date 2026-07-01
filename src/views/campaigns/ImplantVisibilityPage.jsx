'use client'

import React from 'react';
import CampaignLandingPage from './CampaignLandingPage';

export const implantVisibilityContent = {
  pagePath: '/where-your-implant-practice-is-going-wrong',
  pageTitle: 'Implant Practice Visibility Snapshot',
  eyebrow: 'Implant Practice Visibility Snapshot',
  headline: (
    <>
      How visible is your <em>implant practice</em> in your local market?
    </>
  ),
  subheadline:
    'See how your practice compares against other implant providers nearby and uncover visibility gaps that may be costing you consultations.',
  quote:
    "Most implant practices don't have a lead problem. They have a visibility and conversion gap.",
  trustMetrics: [
    { value: '10,000+', label: 'Consultations booked' },
    { value: '$10M+', label: 'Pipeline generated' },
    { value: '4.2x', label: 'Average client ROI' },
    { value: '60s', label: 'Snapshot generation' },
  ],
  featuresTitle: 'What your snapshot shows',
  features: [
    {
      number: '01',
      title: 'Visibility Score',
      description: 'See how easy your practice is to find compared with nearby implant providers.',
    },
    {
      number: '02',
      title: 'Review Gap',
      description: 'Compare your review count and rating against competitors patients may see first.',
    },
    {
      number: '03',
      title: 'Competitor Position',
      description: 'Understand which practices are likely winning attention in your local market.',
    },
    {
      number: '04',
      title: 'Missed Consult Opportunity',
      description:
        'Estimate where better visibility and booking flow could create more patient inquiries.',
    },
  ],
  whyTitle: 'Why this matters for implant practices',
  whyIntro:
    'Implant patients rarely choose the first practice they see. They compare reviews, websites, trust signals, financing, before-and-after proof, and how easy it is to book. Small gaps in visibility and conversion can quietly cost high-value consultations every month.',
  whyPoints: [
    { title: 'Visibility', detail: 'determines if patients even find you in local search' },
    { title: 'Trust signals', detail: '(reviews, credentials, before/afters) influence comparison' },
    { title: 'Booking friction', detail: 'determines who moves from browsers to bookers' },
    { title: 'One missed consult', detail: 'can cost $8,000—$15,000 in case value' },
  ],
  finalCtaTitle: 'Find out where your practice stands',
  finalCtaSubheadline: 'Generate your free Implant Practice Visibility Snapshot',
  finalCtaLabel: 'Generate My Snapshot',
  speedCalculatorProps: {
    formName: 'visibility_snapshot',
    contentName: 'Visibility Snapshot',
    submitLabel: 'Generate My Visibility Snapshot →',
    loadingTitle: 'Analyzing your local visibility…',
  },
};

export default function ImplantVisibilityPage() {
  return <CampaignLandingPage {...implantVisibilityContent} />;
}
