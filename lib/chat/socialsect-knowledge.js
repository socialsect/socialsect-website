/**
 * Socialsect company knowledge base for the conversational assistant
 */

export const SOCIALSECT_INFO = {
  tagline: 'Patient Acquisition Systems for Private Medical Practices',
  
  about: `Socialsect embeds into your practice, diagnoses exactly where patients are falling through the gaps, and builds the system that closes them. We handle website, paid growth, SEO, brand, and booking systems — one team. No packages. US & UK.`,

  services: [
    {
      name: 'Website Design & Development',
      description: 'Custom healthcare websites optimized for patient conversion, mobile-responsive, HIPAA-compliant, and SEO-ready from day one.'
    },
    {
      name: 'Paid Advertising',
      description: 'Google Ads, Facebook/Instagram advertising, and LinkedIn campaigns designed to attract your ideal patients. We handle compliance and attribution.'
    },
    {
      name: 'SEO for Healthcare',
      description: 'Local SEO, content strategy, technical optimization, and reputation management to get you found by patients searching for your services.'
    },
    {
      name: 'Brand & Positioning',
      description: 'Logo design, brand messaging, patient testimonials, and positioning to differentiate your practice in a competitive market.'
    },
    {
      name: 'Patient Booking Systems',
      description: 'Integration of appointment booking, forms, and workflows to reduce friction in the patient acquisition funnel.'
    }
  ],

  process: [
    {
      step: 1,
      title: 'Diagnosis',
      description: 'We audit your website, patient journey, current marketing, and competitive landscape to identify revenue leaks.'
    },
    {
      step: 2,
      title: 'Strategy',
      description: 'We build a custom growth plan focused on the highest-impact opportunities for your practice.'
    },
    {
      step: 3,
      title: 'Build',
      description: 'Our team designs, develops, and launches the website, ads, SEO strategy, and booking systems.'
    },
    {
      step: 4,
      title: 'Optimize',
      description: 'We monitor performance, test improvements, and continuously refine your patient acquisition system.'
    }
  ],

  industriesServed: [
    'Dermatology',
    'Orthopedics',
    'Plastic Surgery',
    'Dental',
    'Aesthetics & Med Spa',
    'Behavioral Health',
    'General Practice',
    'Specialty Clinics'
  ],

  results: {
    description: 'Our clients typically see:',
    metrics: [
      '2-3x more website visitors',
      '40-60% improvement in appointment booking rate',
      '25-35% increase in new patient inquiries',
      'Paid advertising ROAS: 3-8x',
      'Average patient lifetime value increase: 50%+'
    ]
  },

  pricing: 'We work on custom packages tailored to your practice size and goals. No generic packages. Let\'s discuss what you need.',

  team: 'We\'re a small, expert team of web developers, digital marketers, and healthcare growth specialists. Every client works with the core team.',

  location: 'US & UK based. We work with practices worldwide.'
}

export function getServiceInfo(query) {
  const queryLower = query.toLowerCase()
  
  for (const service of SOCIALSECT_INFO.services) {
    if (queryLower.includes(service.name.toLowerCase()) || 
        queryLower.includes(service.name.split(' ')[0].toLowerCase())) {
      return service
    }
  }
  
  return null
}

export function getSocialsectResponse(userQuery) {
  const query = userQuery.toLowerCase()

  // About Socialsect
  if (query.includes('who are you') || query.includes('tell me about') || query.includes('what is socialsect')) {
    return {
      type: 'about',
      content: `${SOCIALSECT_INFO.tagline}\n\n${SOCIALSECT_INFO.about}\n\nWe work with practices in: ${SOCIALSECT_INFO.industriesServed.join(', ')}.`
    }
  }

  // Services
  if (query.includes('service') || query.includes('what do you') || query.includes('offer')) {
    const services = SOCIALSECT_INFO.services.map(s => `• **${s.name}**: ${s.description}`).join('\n\n')
    return {
      type: 'services',
      content: `Here's what we offer:\n\n${services}`
    }
  }

  // Process
  if (query.includes('process') || query.includes('how do you') || query.includes('how does this work')) {
    const processSteps = SOCIALSECT_INFO.process
      .map(p => `**${p.step}. ${p.title}**\n${p.description}`)
      .join('\n\n')
    return {
      type: 'process',
      content: `Our process:\n\n${processSteps}`
    }
  }

  // Results
  if (query.includes('result') || query.includes('case study') || query.includes('social proof') || query.includes('roi')) {
    const metrics = SOCIALSECT_INFO.results.metrics.map(m => `• ${m}`).join('\n')
    return {
      type: 'results',
      content: `${SOCIALSECT_INFO.results.description}\n\n${metrics}\n\nResults vary by practice, but we focus on high-impact, measurable improvements.`
    }
  }

  // Pricing
  if (query.includes('price') || query.includes('cost') || query.includes('package')) {
    return {
      type: 'pricing',
      content: `${SOCIALSECT_INFO.pricing}`
    }
  }

  // Team
  if (query.includes('team') || query.includes('who works') || query.includes('support')) {
    return {
      type: 'team',
      content: `${SOCIALSECT_INFO.team}\n\nLocation: ${SOCIALSECT_INFO.location}`
    }
  }

  return null
}
