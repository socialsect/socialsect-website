import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './website-development.css';
import {
  Target,
  BarChart3,
  Search,
  Users,
  Layers,
  LineChart,
  Megaphone,
  ShoppingCart,
  Handshake,
  Map,
  Globe,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import ContactForm from '../../components/contact-form/ContactForm';
import RotatingText from '../../components/rotating-text/text';
import SpotlightCard from '../../components/spotlight-card/card';

const GTMPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const benefits = [
    { icon: <Target size={24} />, title: 'Market Validation', description: 'Identify and target the right customer segments for optimal product adoption.' },
    { icon: <DollarSign size={24} />, title: 'Revenue Growth', description: 'Accelerate sales with clear messaging and effective distribution channels.' },
    { icon: <Layers size={24} />, title: 'Competitive Advantage', description: 'Position your product strategically against competitors.' },
    { icon: <LineChart size={24} />, title: 'Risk Mitigation', description: 'Minimize launch risks with data-driven insights and scenario planning.' },
    { icon: <Globe size={24} />, title: 'Scalable Growth', description: 'Establish processes that support long-term expansion and market penetration.' }
  ];

  const services = [
    {
      icon: <Search size={24} />, title: 'Market Research & Analysis',
      description: 'Understanding your market is the foundation of a successful GTM strategy. We conduct in-depth market research and competitor analysis to inform every decision.',
      features: [
        'Customer segmentation and persona development',
        'Competitor benchmarking and gap analysis',
        'Market trends and demand forecasting',
        'Product-market fit assessment'
      ]
    },
    {
      icon: <Megaphone size={24} />, title: 'Product Positioning & Messaging',
      description: 'Effective messaging ensures your product resonates with your target audience. We develop compelling positioning strategies that differentiate your product in the market.',
      features: [
        'Unique value proposition (UVP) creation',
        'Messaging frameworks tailored for customer segments',
        'Brand storytelling and content alignment',
        'Competitive positioning strategies'
      ]
    },
    {
      icon: <DollarSign size={24} />, title: 'Pricing & Revenue Strategy',
      description: 'Pricing is critical. We design pricing models and revenue strategies that maximize adoption while maintaining profitability.',
      features: [
        'Value-based and competitive pricing analysis',
        'Subscription, freemium, and tiered pricing models',
        'Revenue forecasting and profit optimization',
        'Pricing strategy for different market segments'
      ]
    },
    {
      icon: <Map size={24} />, title: 'Channel Strategy & Distribution',
      description: 'Selecting the right channels is essential for reaching your audience effectively. We design distribution strategies that ensure accessibility and visibility.',
      features: [
        'Online and offline channel selection',
        'Partnerships and reseller strategy',
        'Digital marketing and e-commerce integration',
        'Omni-channel planning for maximum reach'
      ]
    },
    {
      icon: <BarChart3 size={24} />, title: 'Marketing & Launch Campaigns',
      description: 'Integrated marketing campaigns that generate awareness, engagement, and conversions, tailored to your GTM objectives.',
      features: [
        'Paid media campaigns (PPC, social ads, programmatic)',
        'Content marketing and SEO strategies',
        'Email marketing and lead nurturing',
        'Launch event planning and PR support'
      ]
    },
    {
      icon: <Handshake size={24} />, title: 'Sales Enablement & Training',
      description: 'Empower your sales team with the right tools and knowledge to convert leads into customers.',
      features: [
        'Sales collateral and presentations',
        'CRM setup and integration',
        'Sales team onboarding and training',
        'Performance tracking and feedback loops'
      ]
    },
    {
      icon: <LineChart size={24} />, title: 'Analytics, Reporting & Optimization',
      description: 'Continuous measurement is key. We monitor KPIs, optimize campaigns, and refine your strategy.',
      features: [
        'Real-time dashboards for performance tracking',
        'Lead, conversion, and revenue metrics',
        'Customer feedback analysis',
        'Recommendations for ongoing optimization'
      ]
    }
  ];

  const industries = [
    'Technology & SaaS',
    'E-commerce & Retail',
    'Healthcare & Pharmaceuticals',
    'Finance & FinTech',
    'Education & EdTech',
    'Consumer Goods & Services',
    'Startups & Scale-ups'
  ];

  const faqs = [
    { question: 'What is a Go-to-Market (GTM) strategy?', answer: 'A GTM strategy is a detailed plan that defines how a business launches a product or service, identifies target markets, and positions it for maximum adoption and revenue growth.' },
    { question: 'How does Socialsect create a GTM strategy?', answer: 'We combine market research, competitor analysis, product positioning, pricing, channel selection, marketing campaigns, and sales enablement to create a holistic strategy.' },
    { question: 'Can Socialsect handle multi-market launches?', answer: 'Yes, we develop GTM strategies for global or multi-region launches, including localization, geo-targeting, and cross-channel campaigns.' },
    { question: 'How long does it take to develop a GTM strategy?', answer: 'Depending on complexity, GTM strategies can take 4–12 weeks from research to execution planning.' },
    { question: 'Will my GTM strategy be data-driven?', answer: 'Absolutely. Every decision is backed by analytics, market insights, and performance metrics to ensure measurable success.' }
  ];

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  return (
    <Fragment>
      <Helmet>
        <title>Go-to-Market Strategy Services | Business Launch Experts – Socialsect</title>
        <meta name="description" content="Launch smarter with Socialsect's Go-to-Market (GTM) services. We help businesses with market research, positioning, competitor analysis, and digital growth strategies." />
        <meta name="keywords" content="go-to-market strategy, GTM services, market research agency, digital launch strategy, product launch, market entry strategy, business strategy consulting" />
        <link rel="canonical" href="https://goSocialsect.com/services/gtm" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/services/gtm" />
        <meta property="og:title" content="Go-to-Market Strategy Services | Business Launch Experts – Socialsect" />
        <meta property="og:description" content="Launch smarter with Socialsect's Go-to-Market (GTM) services. We help businesses with market research, positioning, competitor analysis, and digital growth strategies." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/services/gtm" />
        <meta property="twitter:title" content="Go-to-Market Strategy Services | Business Launch Experts – Socialsect" />
        <meta property="twitter:description" content="Launch smarter with Socialsect's Go-to-Market (GTM) services. We help businesses with market research, positioning, competitor analysis, and digital growth strategies." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Go-to-Market Strategy Services",
            "description": "Comprehensive GTM strategy services that help businesses launch products successfully through market research, positioning, competitor analysis, and digital growth strategies.",
            "provider": {
              "@type": "Organization",
              "name": "Socialsect",
              "url": "https://goSocialsect.com"
            },
            "serviceType": "Business Strategy",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Go-to-Market Strategy Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Market Research & Analysis",
                    "description": "In-depth market research and competitor analysis for informed decision making"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Product Positioning & Messaging",
                    "description": "Compelling positioning strategies that differentiate products in the market"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Channel Strategy & Distribution",
                    "description": "Distribution strategies for optimal market reach and visibility"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
     

      {/* Hero with premium visual */}
      <section className="webdev-hero">
        <div className="webdev-hero-content">
          <h1 className="webdev-hero-title">
            Go-to-Market (GTM) Strategy Services – Socialsect
          </h1>
          <p className="webdev-hero-subtitle">
            Launching a new product or service successfully requires more than a great idea—it demands a strategically executed Go-to-Market (GTM) plan. At Socialsect, our GTM services help businesses of all sizes design and execute data-driven strategies that maximize market impact, accelerate adoption, and drive measurable growth. Whether you’re a startup introducing your first product or an established company expanding into new markets, our GTM strategy services ensure that your product reaches the right audience at the right time with the right message.
          </p>
          <div className="webdev-cta-buttons">
            <a href="/lets-build" className="webdev-cta-primary cursor-target">
              Start Your GTM Plan
              <ArrowRight size={20} />
            </a>
            <a href="/case-studies/gtm" className="webdev-cta-secondary cursor-target">View Playbooks</a>
          </div>
        </div>
      </section>

      <section className="webdev-feature-showcase">
        <div className="webdev-feature-decorator decorator-1"></div>
        <div className="webdev-feature-decorator decorator-2"></div>
        <div className="webdev-feature-container">
          <div className="webdev-feature-header">
            <h2>Built For Impactful Launches</h2>
            <p>Leverage market research, positioning, and performance marketing in one integrated GTM engine.</p>
          </div>
       
        </div>
      </section>

      {/* Why GTM */}
      <section className="webdev-why-choose">
        <div className="webdev-section-header">
          <h2>Why Your Business Needs a Go-to-Market Strategy</h2>
          <p>A well-defined GTM strategy aligns your business objectives, product positioning, and marketing tactics to ensure a successful launch.</p>
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
          <h2>Our GTM Services</h2>
          <p>We offer a comprehensive suite of Go-to-Market strategy services designed to deliver results at every stage of your product launch.</p>
        </div>
        <div className="webdev-services-grid">
          {services.map((service, index) => (
            <SpotlightCard key={index} className="webdev-service-card cursor-target" spotlightColor="rgba(106, 90, 241, 0.25)">
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
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="webdev-industries">
        <div className="webdev-section-header">
          <h2>Industries We Serve</h2>
          <p>Tailored GTM strategies for your market and audience.</p>
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
          <h2>FAQs About Go-to-Market Strategy Services</h2>
          <p>Everything you need to know to plan a successful launch</p>
        </div>
        <div className="webdev-faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`webdev-faq-item ${openFaq === index ? 'active' : ''}`}>
              <div className="webdev-faq-header cursor-target" onClick={() => toggleFaq(index)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleFaq(index)}>
                <h3>{faq.question}</h3>
                <div className="webdev-faq-icon">{openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
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
          <h2>Get Started with Socialsect GTM Strategy Services</h2>
          <p>We combine market expertise, martech, and data-driven insights to deliver GTM strategies that ensure adoption and measurable growth.</p>
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
            'GTM Strategy',
            'Market Research',
            'Positioning & Messaging',
            'Pricing Strategy',
            'Channel Planning',
            'Launch Campaigns',
            'Sales Enablement',
            'Analytics & Optimization'
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
    </Fragment>
  );
};

export default GTMPage;


