import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './website-development.css';
import {
  BookOpen,
  Search,
  Target,
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  PenTool,
  Mail,
  Layout,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import ContactForm from '../../components/contact-form/ContactForm';
import RotatingText from '../../components/rotating-text/text';
import TargetCursor from '../../components/targetcursor/cursor';

const ContentStrategy = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const services = [
    {
      icon: <BarChart3 size={24} />, title: 'Content Audit & Analysis',
      description: 'Assess current content, identify gaps, and uncover opportunities for improvement.',
      features: [
        'Evaluate existing content performance',
        'Analyze competitors’ strategies',
        'Identify gaps & opportunities',
        'Actionable improvement plan'
      ]
    },
    {
      icon: <Search size={24} />, title: 'SEO Content Strategy',
      description: 'Rank higher with keyword-driven, structured content that attracts organic traffic.',
      features: [
        'Keyword research & mapping',
        'On-page SEO optimization',
        'Competitor benchmarking',
        'Featured snippets structuring'
      ]
    },
    {
      icon: <Layout size={24} />, title: 'Content Planning & Editorial Calendar',
      description: 'Plan consistent, timely content across channels aligned to business goals.',
      features: [
        'Topic ideation',
        'Cross-channel scheduling',
        'Campaign integration',
        'Seasonal & trend planning'
      ]
    },
    {
      icon: <FileText size={24} />, title: 'Blog & Article Development',
      description: 'High-quality, SEO-optimized blogs and articles for authority and engagement.',
      features: [
        'SEO-optimized articles',
        'Authoritative content',
        'Compelling headlines & metas',
        'Internal links & CTAs'
      ]
    },
    {
      icon: <Target size={24} />, title: 'Website & Landing Page Content',
      description: 'Conversion-focused copy for websites, landing and product pages.',
      features: [
        'Value-driven copywriting',
        'Persuasive CTAs',
        'SEO-friendly structure',
        'Visuals & storytelling'
      ]
    },
    {
      icon: <Users size={24} />, title: 'Social Media Content Strategy',
      description: 'Platform-specific content to drive engagement and brand visibility.',
      features: [
        'Platform-specific planning',
        'Posts, graphics, videos',
        'Campaign-driven strategies',
        'Performance analytics'
      ]
    },
    {
      icon: <Mail size={24} />, title: 'Content for Email & Marketing Campaigns',
      description: 'Lead-nurturing email content and campaign copy that converts.',
      features: [
        'Personalized emails',
        'Campaign-focused copy',
        'Newsletters',
        'Lead nurturing sequences'
      ]
    },
    {
      icon: <BarChart3 size={24} />, title: 'Analytics & Reporting',
      description: 'Data-driven tracking of performance, engagement, and ROI.',
      features: [
        'Real-time dashboards',
        'Traffic/engagement/conversion reports',
        'Optimization recommendations',
        'Identify top-performing content'
      ]
    }
  ];

  const benefits = [
    { icon: <TrendingUp size={24} />, title: 'Increase Brand Awareness', description: 'Reach the right audience with the right message at the right time.' },
    { icon: <Search size={24} />, title: 'Improve SEO Rankings', description: 'Optimize content to drive organic traffic and visibility.' },
    { icon: <Target size={24} />, title: 'Generate Leads & Conversions', description: 'Educate, inform, and persuade potential customers.' },
    { icon: <BookOpen size={24} />, title: 'Build Authority & Trust', description: 'Position your brand as an industry leader.' },
    { icon: <Users size={24} />, title: 'Support Marketing Efforts', description: 'Align content with performance marketing and sales.' }
  ];

  const industries = [
    'Healthcare & Clinics',
    'E-commerce & Retail',
    'Real Estate & Property',
    'Education & E-learning',
    'Finance & FinTech',
    'B2B & SaaS Companies',
    'Local Service Providers'
  ];

  const faqs = [
    { question: 'What is a content strategy?', answer: 'A plan defining what content you create, who it targets, and how it drives business objectives.' },
    { question: 'How can content strategy improve SEO?', answer: 'By optimizing for keywords, structuring pages, and creating high-quality content to boost search visibility.' },
    { question: 'Do you create content for social platforms?', answer: 'Yes, platform-specific strategies and posts for maximum engagement.' },
    { question: 'How often should content strategy be updated?', answer: 'Quarterly or semi-annually to reflect trends, analytics, and audience behavior.' },
    { question: 'Can you help with lead generation campaigns?', answer: 'Absolutely. Our content nurtures leads and converts prospects.' }
  ];

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <Fragment>
      <Helmet>
        <title>Content Strategy & Marketing Services | Socialsect – Drive Engagement</title>
        <meta name="description" content="Boost brand authority with Socialsect's content strategy services. From blogs and SEO content to video strategy, we create content that connects and converts." />
        <meta name="keywords" content="content strategy agency, content marketing services, SEO content, business content strategy, content creation, editorial calendar, blog writing, content optimization" />
        <link rel="canonical" href="https://goSocialsect.com/services/content-strategy" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/services/content-strategy" />
        <meta property="og:title" content="Content Strategy & Marketing Services | Socialsect – Drive Engagement" />
        <meta property="og:description" content="Boost brand authority with Socialsect's content strategy services. From blogs and SEO content to video strategy, we create content that connects and converts." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/services/content-strategy" />
        <meta property="twitter:title" content="Content Strategy & Marketing Services | Socialsect – Drive Engagement" />
        <meta property="twitter:description" content="Boost brand authority with Socialsect's content strategy services. From blogs and SEO content to video strategy, we create content that connects and converts." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Content Strategy Services",
            "description": "Comprehensive content strategy and marketing services that boost brand authority, drive engagement, and convert audiences through strategic content creation and optimization.",
            "provider": {
              "@type": "Organization",
              "name": "Socialsect",
              "url": "https://goSocialsect.com"
            },
            "serviceType": "Content Strategy",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Content Strategy Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Content Audit & Analysis",
                    "description": "Assess current content performance and identify improvement opportunities"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SEO Content Strategy",
                    "description": "Keyword-driven content strategy for organic traffic growth"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Blog & Article Development",
                    "description": "High-quality, SEO-optimized content for authority building"
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
            Content Strategy Services That Drive Engagement & Conversions
            <br />
            <span className="highlight">– Socialsect</span>
          </h1>
          <p className="webdev-hero-subtitle">
            Content is the cornerstone of business success. We create compelling, relevant, and results-driven content that engages audiences, builds authority, and drives measurable growth.
          </p>
          <div className="webdev-cta-buttons">
            <a href="/lets-build" className="webdev-cta-primary cursor-target">
              Start Your Strategy
              <ArrowRight size={20} />
            </a>
            <a href="/case-studies" className="webdev-cta-secondary cursor-target">View Case Studies</a>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="webdev-why-choose">
        <div className="webdev-section-header">
          <h2>Why Your Business Needs a Professional Content Strategy</h2>
          <p>More than blogs or posts: a cohesive plan aligned with your business objectives.</p>
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
          <h2>Our Content Strategy Services</h2>
          <p>End-to-end strategy and creation designed to maximize ROI and visibility.</p>
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

      {/* Industries */}
      <section className="webdev-industries">
        <div className="webdev-section-header">
          <h2>Industries We Serve</h2>
          <p>Custom content strategies aligned to your audience and goals.</p>
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
          <h2>FAQs About Content Strategy Services</h2>
          <p>Answers to common questions about our content strategy solutions</p>
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
          <h2>Get Started with Socialsect Content Strategy Services</h2>
          <p>We combine creativity, SEO expertise, and data-driven insights to craft content that engages and converts.</p>
          <div className="webdev-cta-buttons">
            <a href="/contact" className="webdev-cta-primary cursor-target">
              Contact Socialsect
              <ArrowRight size={20} />
            </a>
            <a href="https://calendly.com/rayansh-gosocialsect/30min" target="_blank" className="webdev-cta-secondary cursor-target">Schedule a Consultation</a>
          </div>
        </div>
      </section>

      {/* Rotating Text */}
      <div className="webdev-solution-container">
        <span className="webdev-solution-text">Your One Stop Solution for</span>
        <RotatingText
          texts={[
            'Content Strategy',
            'SEO Content',
            'Editorial Calendars',
            'Blogs & Articles',
            'Website Copy',
            'Social Content',
            'Email & Campaign Content'
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

export default ContentStrategy;


