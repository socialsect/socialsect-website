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
  Database,
  Facebook,
  Instagram,
  Eye,
  MousePointer
} from 'lucide-react';
import ContactForm from '../../components/contact-form/ContactForm';
import RotatingText from '../../components/rotating-text/text';
import TargetCursor from '../../components/targetcursor/cursor';

const MetaAdsPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const services = [
    {
      icon: <Facebook size={24} />,
      title: 'Facebook Advertising',
      description: 'Strategic Facebook ads that drive engagement, leads, and conversions with precise targeting.',
      features: [
        'Lead generation campaigns',
        'Brand awareness ads',
        'Conversion optimization',
        'Retargeting campaigns'
      ]
    },
    {
      icon: <Instagram size={24} />,
      title: 'Instagram Advertising',
      description: 'Visual storytelling through Instagram ads that capture attention and drive action.',
      features: [
        'Story and feed ads',
        'Shopping and collection ads',
        'Reels advertising',
        'Influencer partnerships'
      ]
    },
    {
      icon: <Target size={24} />,
      title: 'Audience Targeting',
      description: 'Advanced targeting strategies to reach your ideal customers across Meta platforms.',
      features: [
        'Custom audience creation',
        'Lookalike audiences',
        'Interest-based targeting',
        'Behavioral targeting'
      ]
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Campaign Optimization',
      description: 'Continuous optimization to maximize ROI and improve campaign performance.',
      features: [
        'A/B testing',
        'Bid optimization',
        'Creative testing',
        'Performance monitoring'
      ]
    },
    {
      icon: <Eye size={24} />,
      title: 'Creative Design',
      description: 'Compelling ad creatives that stop the scroll and drive conversions.',
      features: [
        'Video ad production',
        'Image ad design',
        'Copywriting',
        'Brand consistency'
      ]
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Analytics & Reporting',
      description: 'Comprehensive reporting and insights to track performance and optimize results.',
      features: [
        'Real-time dashboards',
        'Conversion tracking',
        'ROI analysis',
        'Performance reports'
      ]
    }
  ];

  const benefits = [
    { icon: <BarChart3 size={24} />, title: 'Measurable ROI', description: 'Track every campaign to ensure budgets deliver tangible results.' },
    { icon: <Target size={24} />, title: 'Precise Targeting', description: 'Reach the right audience at the right time with advanced targeting options.' },
    { icon: <Settings size={24} />, title: 'Optimized Campaigns', description: 'Continuous monitoring and A/B testing to maximize performance.' },
    { icon: <TrendingUp size={24} />, title: 'Scalable Growth', description: 'Scale campaigns efficiently based on performance metrics.' }
  ];

  const process = [
    { step: '01', title: 'Audience Research & Strategy', description: 'Analyze your target market and develop a comprehensive Meta ads strategy.' },
    { step: '02', title: 'Campaign Setup & Creative Development', description: 'Create compelling ad creatives and set up optimized campaigns.' },
    { step: '03', title: 'Launch & Monitor', description: 'Launch campaigns and monitor performance in real-time.' },
    { step: '04', title: 'Optimize & Scale', description: 'Continuously optimize for better results and scale successful campaigns.' },
    { step: '05', title: 'Report & Analyze', description: 'Provide detailed insights and recommendations for future growth.' }
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
    { question: 'What types of Meta Ads do you manage?', answer: 'We manage all Meta ad formats including Facebook ads, Instagram ads, Messenger ads, and Audience Network campaigns.' },
    { question: 'How do you measure campaign success?', answer: 'Through KPIs like ROAS, CPA, CTR, conversion rate, and overall ROI across all campaigns.' },
    { question: 'Can you target international audiences?', answer: 'Yes, we can target audiences globally including USA, UK, Europe, Australia, and other markets.' },
    { question: 'Do you handle retargeting campaigns?', answer: 'Absolutely. We create sophisticated retargeting campaigns to re-engage visitors and increase conversions.' },
    { question: 'When will I see results?', answer: 'Initial results often appear within 1-2 weeks, with significant improvements typically visible within 4-6 weeks.' }
  ];

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <Fragment>
      <Helmet>
        <title>Meta Ads Services | Facebook & Instagram Advertising – Socialsect</title>
        <meta name="description" content="Maximize ROI with Socialsect's Meta Ads services. Expert Facebook and Instagram advertising campaigns that drive conversions and scale your business growth." />
        <meta name="keywords" content="Meta ads services, Facebook advertising, Instagram ads, social media advertising, Meta ads agency, Facebook ads management, Instagram marketing, social media marketing, paid social media" />
        <link rel="canonical" href="https://goSocialsect.com/services/meta-ads" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/services/meta-ads" />
        <meta property="og:title" content="Meta Ads Services | Facebook & Instagram Advertising – Socialsect" />
        <meta property="og:description" content="Maximize ROI with Socialsect's Meta Ads services. Expert Facebook and Instagram advertising campaigns that drive conversions and scale your business growth." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/services/meta-ads" />
        <meta property="twitter:title" content="Meta Ads Services | Facebook & Instagram Advertising – Socialsect" />
        <meta property="twitter:description" content="Maximize ROI with Socialsect's Meta Ads services. Expert Facebook and Instagram advertising campaigns that drive conversions and scale your business growth." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Meta Ads Services",
            "description": "Expert Facebook and Instagram advertising services that maximize ROI and drive measurable business growth through strategic Meta ads campaigns.",
            "provider": {
              "@type": "Organization",
              "name": "Socialsect",
              "url": "https://goSocialsect.com"
            },
            "serviceType": "Social Media Advertising",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Meta Ads Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Facebook Advertising",
                    "description": "Strategic Facebook ads campaigns for lead generation and conversions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Instagram Advertising",
                    "description": "Visual Instagram ads that capture attention and drive action"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Audience Targeting",
                    "description": "Advanced targeting strategies to reach ideal customers"
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
            Meta Ads Services That Drive Measurable Growth
            <br />
            <span className="highlight">– Socialsect</span>
            </h1>
          <p className="webdev-hero-subtitle">
            In the competitive world of social media advertising, businesses need strategies that guarantee results. Our Meta Ads services deliver measurable growth, maximize ROI, and accelerate success across Facebook and Instagram.
          </p>
          <div className="webdev-stats-grid">
            <div className="webdev-stat-item">
              <div className="webdev-stat-number">ROAS</div>
              <div className="webdev-stat-label">Optimized</div>
            </div>
            <div className="webdev-stat-item">
              <div className="webdev-stat-number">A/B</div>
              <div className="webdev-stat-label">Testing</div>
            </div>
            <div className="webdev-stat-item">
              <div className="webdev-stat-number">24/7</div>
              <div className="webdev-stat-label">Monitoring</div>
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
          <h2>Why Choose Meta Ads for Your Business?</h2>
          <p>Results-driven advertising where you reach billions of users across Facebook and Instagram.</p>
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
          <h2>Our Meta Ads Services</h2>
          <p>Full-suite, outcome-oriented services tailored to your advertising objectives.</p>
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
          <h2>Our Meta Ads Approach</h2>
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
          <p>Solutions tailored to each industry's unique audience and goals.</p>
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
          <h2>FAQs About Meta Ads Services</h2>
          <p>Answers to common questions about our Meta advertising solutions</p>
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
          <h2>Get Started with Socialsect Meta Ads Services</h2>
          <p>We combine creativity, technology and analytics to deliver real results. Increase leads, sales and visibility with data-driven campaigns.</p>
          <div className="webdev-cta-buttons">
            <a href="/contact" className="webdev-cta-primary cursor-target">
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
            'Meta Advertising',
            'Facebook Ads',
            'Instagram Ads',
            'Social Media Marketing',
            'Lead Generation',
            'Conversion Optimization',
            'Audience Targeting'
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

export default MetaAdsPage;
