import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './index.css';
import { ArrowRight } from 'lucide-react';
import SpotlightCard from '../../components/spotlight-card/card';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const services = [
  {  title: 'SEO', path: '/case-studies/seo', description: 'Organic growth, visibility, and search dominance.', img: '/images/4.png' },
  {  title: 'Performance Marketing', path: '/case-studies/performance-marketing', description: 'PPC, paid social, ROAS-focused wins.', img: '/images/2.png' },
  {  title: 'Website Development', path: '/case-studies/website-development', description: 'High-performing sites and experiences.', img: '/images/3.png' },
  {  title: 'Web and Mobile App Development', path: '/case-studies/app-development', description: 'Mobile and web apps that scale.', img: '/images/1.png' },
  {  title: 'GTM Strategy', path: '/case-studies/gtm', description: 'Launches that maximize adoption.', img: '/images/2.png' },
];

const metrics = [
  { label: 'Projects Delivered', value: '1000+' },
  { label: 'Avg. ROAS (Paid)', value: '4.2x' },
  { label: 'Avg. SEO Growth', value: '+140%' },
  { label: 'Core Web Vitals Pass', value: '95%' },
];

const latest = [
  { title: 'D2C ROAS 5.2x in 90 Days', summary: 'Paid social + search + creative testing', path: '/case-studies/performance-marketing', img: '/images/2.png' },
  { title: 'SaaS Organic +180%', summary: 'Technical SEO + topical authority', path: '/case-studies/seo', img: '/images/4.png' },
  { title: 'CVR +28% After Rebuild', summary: 'Next.js + UX + CRO program', path: '/case-studies/website-development', img: '/images/3.png' },
];

const CaseStudiesIndex = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Fragment>
      <Helmet>
        <title>Case Studies | Digital Marketing Success Stories – Socialsect</title>
        <meta name="description" content="Explore our digital marketing case studies showcasing real results: 1000+ projects delivered, 4.2x average ROAS, 140% SEO growth. See how we drive success for businesses." />
        <meta name="keywords" content="digital marketing case studies, SEO case studies, performance marketing case studies, web development case studies, marketing success stories, ROI case studies" />
        <link rel="canonical" href="https://goSocialsect.com/case-studies" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://goSocialsect.com/case-studies" />
        <meta property="og:title" content="Case Studies | Digital Marketing Success Stories – Socialsect" />
        <meta property="og:description" content="Explore our digital marketing case studies showcasing real results: 1000+ projects delivered, 4.2x average ROAS, 140% SEO growth." />
        <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
        <meta property="og:site_name" content="Socialsect" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://goSocialsect.com/case-studies" />
        <meta property="twitter:title" content="Case Studies | Digital Marketing Success Stories – Socialsect" />
        <meta property="twitter:description" content="Explore our digital marketing case studies showcasing real results: 1000+ projects delivered, 4.2x average ROAS, 140% SEO growth." />
        <meta property="twitter:image" content="https://goSocialsect.com/purplelogo.png" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Socialsect" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": "https://goSocialsect.com/case-studies#webpage",
                "url": "https://goSocialsect.com/case-studies",
                "name": "Case Studies | Digital Marketing Success Stories – Socialsect",
                "description": "Explore our digital marketing case studies showcasing real results: 1000+ projects delivered, 4.2x average ROAS, 140% SEO growth. See how we drive success for businesses.",
                "isPartOf": {
                  "@id": "https://goSocialsect.com/#website"
                },
                "mainEntity": {
                  "@type": "ItemList",
                  "name": "Digital Marketing Case Studies",
                  "description": "Collection of successful digital marketing case studies and client results",
                  "numberOfItems": 5,
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "SEO Case Studies",
                      "url": "https://goSocialsect.com/case-studies/seo"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Performance Marketing Case Studies",
                      "url": "https://goSocialsect.com/case-studies/performance-marketing"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "Website Development Case Studies",
                      "url": "https://goSocialsect.com/case-studies/website-development"
                    },
                    {
                      "@type": "ListItem",
                      "position": 4,
                      "name": "App Development Case Studies",
                      "url": "https://goSocialsect.com/case-studies/app-development"
                    },
                    {
                      "@type": "ListItem",
                      "position": 5,
                      "name": "Content Strategy Case Studies",
                      "url": "https://goSocialsect.com/case-studies/content-strategy"
                    }
                  ]
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://goSocialsect.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Case Studies",
                      "item": "https://goSocialsect.com/case-studies"
                    }
                  ]
                }
              },
              {
                "@type": "Organization",
                "@id": "https://goSocialsect.com/#organization",
                "name": "Socialsect",
                "url": "https://goSocialsect.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://goSocialsect.com/purplelogo.png",
                  "width": 200,
                  "height": 200
                },
                "description": "Digital growth partner with proven results: 1000+ projects delivered, 4.2x average ROAS, 140% SEO growth.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "100",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <section className="webdev-hero">
        <div className="webdev-hero-content">
          <h1 className="webdev-hero-title">Case Studies</h1>
          <p className="webdev-hero-subtitle">Proof over promises. Explore real outcomes from SEO, Performance Marketing, Web/App Development, Content Strategy, GTM, and more.</p>
          <div className="csi-chips" aria-label="Browse services">
            {services.map((s, i) => (
              <button
                key={s.title}
                className={`csi-chip ${i === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="webdev-services">
        <div className="webdev-section-header">
          <h2>Browse by Service</h2>
          <p>Select a service to view its case studies</p>
        </div>
        <div className="csi-scroll">
          <div className="csi-rail">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                className="csi-tile cursor-target-large"
                initial={{ width: 110, height: 360 }}
                animate={{ width: activeIndex === idx ? 620 : 140, height: 460 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="csi-bg" style={{ backgroundImage:`url(${s.img})`, filter: activeIndex === idx ? 'none' : 'grayscale(0.2)' }} />
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="csi-overlay" />
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="csi-content"
                    >
                      <div className="csi-icon">{s.title.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                      <h2 className="csi-title">{s.title} Case Studies</h2>
                      <p className="csi-desc">{s.description} See how we planned, executed, and measured impact with transparent KPIs.</p>
                      <Link to={s.path} className="csi-cta ">
                        View case studies <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics strip */}
      <section className="csi-metrics">
        <div className="csi-metrics-grid">
          {metrics.map((m) => (
            <div key={m.label} className="csi-metric">
              <div className="csi-metric-value">{m.value}</div>
              <div className="csi-metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO-friendly content section */}
      <section className="csi-content-wrap">
        <div className="csi-section">
          <h2>Socialsect Case Studies: Outcomes We Can Stand Behind</h2>
          <p>
            Dive into real-world transformations across SEO, performance marketing, website and app development, content strategy, and GTM. Each case details the problem, the approach, and the measurable impact — from traffic and rankings to ROAS, conversion rate, Core Web Vitals, and retention.
          </p>
        </div>
        <div className="csi-section">
          <h3>What You’ll Learn From Our Case Studies</h3>
          <ul>
            <li>How technical SEO, content clusters, and digital PR drive sustained organic growth</li>
            <li>How ROAS-first media mixes reduce CPA while scaling qualified demand</li>
            <li>How modern web/app stacks lift Core Web Vitals, UX, and conversion rate</li>
            <li>How GTM strategy aligns positioning, pricing, channels, and enablement</li>
            <li>How content strategy builds topical authority and accelerates pipeline velocity</li>
          </ul>
        </div>
        <div className="csi-section">
          <h3>Industries We’ve Helped</h3>
          <p>
            From SaaS and e-commerce to healthcare, education, and local services — our playbooks adapt to your market, audience, and goals. Browse by service above to see outcomes that map to your stage and constraints.
          </p>
        </div>

        {/* Latest highlights grid */}
        <div className="csi-section">
          <h3>Latest Highlights</h3>
          <div className="csi-latest-grid">
            {latest.map((l) => (
              <Link key={l.title} to={l.path} className="csi-latest-card ">
                <div className="csi-latest-img" style={{ backgroundImage:`url(${l.img})` }} />
                <div className="csi-latest-body">
                  <h4>{l.title}</h4>
                  <p>{l.summary}</p>
                  <span className="csi-cta">Read case study <ArrowRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CaseStudiesIndex;


