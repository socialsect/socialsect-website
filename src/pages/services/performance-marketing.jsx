import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './website-development.css';
import {
  Target,
  BarChart3,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Search,
  Settings,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Monitor,
  Database
} from 'lucide-react';
import ContactForm from '../../components/contact-form/ContactForm';
import RotatingText from '../../components/rotating-text/text';
import TargetCursor from '../../components/targetcursor/cursor';

const PerformanceMarketing = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const services = [
    {
      icon: <Search size={24} />,
      title: 'Paid Search Advertising (PPC)',
      description: 'High-intent keyword targeting across Google Ads, Bing Ads and other platforms to drive qualified leads at optimal CPC.',
      features: [
        'Keyword research and targeting',
        'Ad creation and copywriting',
        'Bid strategy optimization',
        'Landing page optimization'
      ]
    },
    {
      icon: <Users size={24} />,
      title: 'Social Media Advertising',
      description: 'Precision targeting on social platforms to reach users most likely to engage or convert.',
      features: [
        'Facebook & Instagram Ads',
        'LinkedIn Ads (B2B)',
        'Twitter & TikTok Ads',
        'Retargeting campaigns'
      ]
    },
    {
      icon: <Monitor size={24} />,
      title: 'Display & Programmatic Advertising',
      description: 'Increase visibility and conversions with real-time bidding, audience targeting and effective placements.',
      features: [
        'High-impact display creatives',
        'Programmatic ad management',
        'Geo-targeting',
        'Remarketing strategies'
      ]
    },
    {
      icon: <Shield size={24} />,
      title: 'Affiliate & Partner Marketing',
      description: 'Leverage trusted partners; pay only for successful actions like leads or sales.',
      features: [
        'Affiliate recruitment & management',
        'Commission structure optimization',
        'Performance tracking & reporting'
      ]
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Marketing',
      description: 'Data-driven email strategies to nurture leads and drive repeat business.',
      features: [
        'Segmented lists & personalization',
        'Automations for lead nurturing',
        'Performance tracking & optimization'
      ]
    },
    {
      icon: <Zap size={24} />,
      title: 'Conversion Rate Optimization (CRO)',
      description: 'Turn traffic into customers with experimentation and experience optimization.',
      features: [
        'A/B and multivariate testing',
        'Heatmap analysis',
        'Funnel optimization',
        'User behavior analysis'
      ]
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Analytics & Reporting',
      description: 'Advanced tracking to monitor KPIs, ROAS and outcomes for continuous optimization.',
      features: [
        'Real-time dashboards',
        'Custom performance reports',
        'Actionable insights'
      ]
    }
  ];

  const benefits = [
    { icon: <BarChart3 size={24} />, title: 'Measurable ROI', description: 'Track every campaign to ensure budgets deliver tangible results.' },
    { icon: <Target size={24} />, title: 'Targeted Reach', description: 'Reach the right audience at the right time with precision.' },
    { icon: <Settings size={24} />, title: 'Optimized Campaigns', description: 'Continuous monitoring and A/B testing to maximize performance.' },
    { icon: <TrendingUp size={24} />, title: 'Scalable Growth', description: 'Scale campaigns efficiently based on performance metrics.' }
  ];

  const process = [
    { step: '01', title: 'Research & Audience Analysis', description: 'Understand market, competitors and audience behavior.' },
    { step: '02', title: 'Strategy Development', description: 'Build custom campaigns aligned with KPIs and goals.' },
    { step: '03', title: 'Campaign Execution', description: 'Launch across platforms with precise targeting.' },
    { step: '04', title: 'Optimization & Testing', description: 'Continuously optimize for maximum ROI.' },
    { step: '05', title: 'Analytics & Reporting', description: 'Provide detailed insights and performance tracking.' }
  ];

  const industries = [
    'E-commerce & Retail',
    'Healthcare & Clinics',
    'Real Estate & Property',
    'B2B Services & SaaS',
    'Education & Training Institutes',
    'Local Service Providers'
  ];

  const faqs = [
    { question: 'What is performance marketing?', answer: 'A results-driven strategy where you pay only when specific actions (clicks, leads, sales) occur.' },
    { question: 'How do you measure campaign success?', answer: 'Through KPIs like conversion rate, CPA, ROAS and overall ROI.' },
    { question: 'Can you handle multi-platform campaigns?', answer: 'Yes, across search, social, display, programmatic and email.' },
    { question: 'Is it suitable for small businesses?', answer: 'Absolutely. It enables budget allocation based on measurable results.' },
    { question: 'When will I see results?', answer: 'Initial insights and improvements often appear within 4–6 weeks.' }
  ];

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <Fragment>
      <Helmet>
        <title>Performance Marketing Agency | ROI-Driven Ad Campaigns – Socialsect</title>
        <meta name="description" content="Maximize ROI with Socialsect's performance marketing services. From paid ads to remarketing, we run data-driven campaigns that convert clicks into customers." />
        <meta name="keywords" content="performance marketing agency, ROI-driven ads, digital advertising services, conversion-focused marketing, PPC management, paid search, display advertising, remarketing" />
        <link rel="canonical" href="https://goSocialsect.com/services/performance-marketing" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/services/performance-marketing" />
        <meta property="og:title" content="Performance Marketing Agency | ROI-Driven Ad Campaigns – Socialsect" />
        <meta property="og:description" content="Maximize ROI with Socialsect's performance marketing services. From paid ads to remarketing, we run data-driven campaigns that convert clicks into customers." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/services/performance-marketing" />
        <meta property="twitter:title" content="Performance Marketing Agency | ROI-Driven Ad Campaigns – Socialsect" />
        <meta property="twitter:description" content="Maximize ROI with Socialsect's performance marketing services. From paid ads to remarketing, we run data-driven campaigns that convert clicks into customers." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Performance Marketing Services",
            "description": "ROI-driven digital advertising services that maximize conversions and deliver measurable business growth through data-driven performance marketing campaigns.",
            "provider": {
              "@type": "Organization",
              "name": "Socialsect",
              "url": "https://goSocialsect.com"
            },
            "serviceType": "Performance Marketing",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Performance Marketing Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Paid Search Advertising (PPC)",
                    "description": "High-intent keyword targeting across Google Ads and Bing Ads"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Social Media Advertising",
                    "description": "Precision targeting on social platforms for maximum engagement"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Display & Programmatic Advertising",
                    "description": "Real-time bidding and audience targeting for increased visibility"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      <TargetCursor />

      {/* Hero */}
      <section className="webdev-hero">
        <div className="webdev-hero-content">
          <h1 className="webdev-hero-title">
            Performance Marketing Services That Drive Measurable Growth
            <br />
            <span className="highlight">– Socialsect</span>
          </h1>
          <p className="webdev-hero-subtitle">
            In the ever-evolving digital landscape, businesses need strategies that guarantee results. Our performance marketing services deliver measurable growth, maximize ROI, and accelerate success. Every dollar is tracked, measured, and optimized.
          </p>
          <div className="webdev-stats-grid">
            <div className="webdev-stat-item">
              <div className="webdev-stat-number">ROI</div>
              <div className="webdev-stat-label">Measured</div>
            </div>
            <div className="webdev-stat-item">
              <div className="webdev-stat-number">A/B</div>
              <div className="webdev-stat-label">Testing</div>
            </div>
            <div className="webdev-stat-item">
              <div className="webdev-stat-number">24/7</div>
              <div className="webdev-stat-label">Optimization</div>
            </div>
          </div>
          <div className="webdev-cta-buttons">
            <a target="_blank" href="/lets-build" className="webdev-cta-primary cursor-target">
              Start Your Campaign
              <ArrowRight size={20} />
            </a>
            <a target="_blank" href="/case-studies" className="webdev-cta-secondary cursor-target">View Case Studies</a>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="webdev-why-choose">
        <div className="webdev-section-header">
          <h2>Why Choose Performance Marketing for Your Business?</h2>
          <p>Results-driven marketing where you pay for outcomes like clicks, leads or sales.</p>
        </div>
        <div className="webdev-benefits-grid">
          {benefits.map((b, i) => (
            <div key={i} className="webdev-benefit-item cursor-target">
              {b.icon}
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="webdev-services">
        <div className="webdev-section-header">
          <h2>Our Performance Marketing Services</h2>
          <p>Full-suite, outcome-oriented services tailored to your objectives.</p>
        </div>
        <div className="webdev-services-grid">
          {services.map((service, index) => (
            <div key={index} className="webdev-service-card cursor-target">
              <div className="webdev-service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="webdev-service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="webdev-process">
        <div className="webdev-section-header">
          <h2>Our Performance Marketing Approach</h2>
          <p>Full-stack approach ensuring every campaign delivers measurable results.</p>
        </div>
        <div className="webdev-process-steps">
          {process.map((step, index) => (
            <div key={index} className="webdev-process-step cursor-target">
              <div className="webdev-step-number">{step.step}</div>
              <div className="webdev-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="webdev-industries">
        <div className="webdev-section-header">
          <h2>Industries We Serve</h2>
          <p>Solutions tailored to each industry’s unique audience and goals.</p>
        </div>
        <div className="webdev-industries-grid">
          {industries.map((industry, index) => (
            <div key={index} className="webdev-industry-item cursor-target">
              <CheckCircle size={20} />
              <span>{industry}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="webdev-faq">
        <div className="webdev-section-header">
          <h2>FAQs About Performance Marketing Services</h2>
          <p>Answers to common questions about our performance marketing solutions</p>
        </div>
        <div className="webdev-faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`webdev-faq-item ${openFaq === index ? 'active' : ''}`}>
              <div
                className="webdev-faq-header cursor-target"
                onClick={() => toggleFaq(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleFaq(index)}
              >
                <h3>{faq.question}</h3>
                <div className="webdev-faq-icon">
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              <div className="webdev-faq-content">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <ContactForm />

      {/* CTA */}
      <section className="webdev-bottom-cta">
        <div className="webdev-cta-content">
          <h2>Get Started with Socialsect Performance Marketing Services</h2>
          <p>We combine creativity, technology and analytics to deliver real results. Increase leads, sales and visibility with data-driven campaigns.</p>
          <div className="webdev-cta-buttons">
            <a  href="/contact" className="webdev-cta-primary cursor-target">
              Contact Socialsect
              <ArrowRight size={20} />
            </a>
            <a className="webdev-cta-secondary cursor-target" href="https://calendly.com/rayansh-gosocialsect/30min" target="_blank">Schedule a Consultation</a>
          </div>
        </div>
      </section>

      {/* Rotating Text */}
      <div className="webdev-solution-container">
        <span className="webdev-solution-text">Your One Stop Solution for</span>
        <RotatingText
          texts={[
            'Performance Marketing',
            'PPC Campaigns',
            'Social Ads',
            'Programmatic Advertising',
            'Affiliate Marketing',
            'Email Marketing',
            'Analytics & Reporting'
          ]}
          mainClassName="webdev-rotating-text"
          staggerFrom={'last'}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-120%' }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div>
      <TargetCursor />
    </Fragment>
  );
};

export default PerformanceMarketing;


