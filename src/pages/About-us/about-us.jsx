import "./about-us.css"
import { Helmet } from 'react-helmet-async';
import ProfileCard from "../../components/profile-card/profilecard"
import ChromaGrid from "../../components/chrome-grid/chroma-grid";
import TargetCursor from "../../components/targetcursor/cursor";

import {useState} from "react";
import { MusicToggleButton, Skiper25 } from "../../components/musictoggle/musictoggle";
import {ChevronDown ,ChevronUp} from "lucide-react";
const methodSteps = [
  { label: "Step 1", title: "Codification of Conceptual DNA", desc: "Capture founder intent, non-negotiables, audience, voice, and proof in a one-page spec." },
  { label: "Step 2", title: "Outcome Contract", desc: "Define the result we're aiming for and the acceptance criteria that make it true." },
  { label: "Step 3", title: "Operating Frame", desc: "Map attention → action → value; choose the minimum path to prove the outcome." },
  { label: "Step 4", title: "Minimum Proving Unit", desc: "Ship the smallest release that can validate the outcome—fast, focused, reversible." },
  { label: "Step 5", title: "Evidence Loop", desc: "Instrument end-to-end and review real receipts (not screenshots)." },
  { label: "Step 6", title: "Compound & Steward", desc: "Keep winners, fix bottlenecks, and stack the next sprint—staying true to the DNA." },
];

const proof = [
  { stat: "700+", label: "Booked consults", note: "Clinic; $5–$6 CPL sustained" },
  { stat: "$100K+", label: "Revenue in 90 days", note: "eCom; paid + organic loop" },
  { stat: "90+", label: "Core Web Vitals", note: "On key pages; measured in GA4" },
];

const principles = [
  { title: "Outcomes over optics", desc: "If it doesn't move revenue or bookings, we don't ship it." },
  { title: "Evidence, not opinions", desc: "Decisions ride on GA4, GSC, pixels, UTMs, CRM." },
  { title: "Smallest proving move", desc: "We ship the MPU first—fast, focused, reversible." },
  { title: "Single owner", desc: "Founder-led delivery; one point of contact." },
  { title: "Plain language", desc: "Clear promises, clear reports, no jargon." },
  { title: "Stewardship", desc: "Protect brand, budget, and time—always." },
];

const faqs = [
  { q: "How fast before we see movement?", a: "Ads: days. SEO: weeks to months (quick wins in 30–60 days). Apps: V1 in ~30 days." },
  { q: "Who does the work?", a: "A small, senior team—founder-led. No hand-offs." },
  { q: "What do you measure?", a: "Leads, booked calls, and revenue by channel; DAU/TTFV for apps." },
  { q: "What if it isn't working?", a: "We change the variable—offer, page, audience, content—and show the data." },
];
const items = [
   
    {
      image: "/team/gurshaan.png",
      title: "Gurshaan Singh",
      subtitle: "Meta Ads Specialist",
      handle: "@gurshaan",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(145deg, #F59E0B, #000)",
      url: "https://linkedin.com/in/gurshaan"
    },
    {
      image: "/team/prateek.png",
      title: "Prateek Muthreja",
      subtitle: "UI/UX Design Expert",
      handle: "@prateekux",
      borderColor: "#EC4899",
      gradient: "linear-gradient(145deg, #EC4899, #000)",
      url: "https://dribbble.com/prateekux"
    },
    {
      image: "/team/sushant.png",
      title: "Sushant Dubey",
      subtitle: "SEO Strategist",
      handle: "@sushantseo",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://linkedin.com/in/sushantseo"
    },
    {
      image: "/team/vatsal.png",
      title: "Vatsal",
      subtitle: "Marketing & Communications Intern",
      handle: "@vatsal",
      borderColor: "#EF4444",
      gradient: "linear-gradient(145deg, #EF4444, #000)",
      url: "https://linkedin.com/in/prajwalreddy"
    },
    {
      image: "/team/prajwal.png",
      title: "Prajwal",
      subtitle: "Marketing & Communications Intern",
      handle: "@prajwalreddy",
      borderColor: "#EF4444",
      gradient: "linear-gradient(145deg, #EF4444, #000)",
      url: "https://linkedin.com/in/prajwalreddy"
    },
    {
      image: "/team/khwaish.png",
      title: "Khwaish",
      subtitle: "Project Coordinator",
      handle: "@khwaisali",
      borderColor: "#06B6D4",
      gradient: "linear-gradient(145deg, #06B6D4, #000)",
      url: "https://linkedin.com/in/khwaisali"
    },

    {
      image: "/team/himanshu.png",
      title: "Himanshu ",
      subtitle: "Email Marketing Team Lead",
      handle: "@himanshulead",
      borderColor: "#F43F5E",
      gradient: "linear-gradient(145deg, #F43F5E, #000)",
      url: "https://linkedin.com/in/himanshulead"
    },
    {
      image: "/team/faraz.png",
      title: "Faraz ",
      subtitle: "Full-Stack Developer",
      handle: "@farazkhan",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://github.com/farazkhan"
    },
    {
      image: "/team/sarojini.png",
      title: "Sarojini ",
      subtitle: "Email Marketing Specialist",
      handle: "@sarojinidas",
      borderColor: "#EAB308",
      gradient: "linear-gradient(145deg, #EAB308, #000)",
      url: "https://linkedin.com/in/sarojinidas"
    },
    {
      image: "/team/mohan.png",
      title: "Mohan Raj",
      subtitle: "Email Marketing Specialist",
      handle: "@mohanraj",
      borderColor: "#6366F1",
      gradient: "linear-gradient(145deg, #6366F1, #000)",
      url: "https://linkedin.com/in/mohanraj"
    },
    {
      image: "/team/neha.png",
      title: "Neha",
      subtitle: "Research & Insights Associate",
      handle: "@nehagupta",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(145deg, #8B5CF6, #000)",
      url: "https://linkedin.com/in/nehagupta"
    },
    {
      image: "/team/sapnarani.png",
      title: "Sapna Rani",
      subtitle: "Email Marketing Specialist",
      handle: "@sapnarani",
      borderColor: "#14B8A6",
      gradient: "linear-gradient(145deg, #14B8A6, #000)",
      url: "https://linkedin.com/in/sapnarani"
    }

  ];
  
const About = () => {
    return (
        <div className="about-container">
            <TargetCursor />
            <Helmet>
                <title>About Socialsect - Digital Growth Team | Founder-Led Agency</title>
                <meta name="description" content="Meet the Socialsect team - founder-led digital growth agency with proven results. 700+ booked consults, $100K+ revenue in 90 days, 90+ Core Web Vitals. Learn about our method and team." />
                <meta name="keywords" content="about Socialsect, digital marketing team, founder-led agency, growth marketing team, digital strategy team, web development team, SEO experts" />
                <link rel="canonical" href="https://goSocialsect.com/about-us" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://goSocialsect.com/about-us" />
                <meta property="og:title" content="About Socialsect - Digital Growth Team | Founder-Led Agency" />
                <meta property="og:description" content="Meet the Socialsect team - founder-led digital growth agency with proven results. 700+ booked consults, $100K+ revenue in 90 days." />
                <meta property="og:image" content="https://goSocialsect.com/purplelogo.png" />
                <meta property="og:site_name" content="Socialsect" />
                
                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://goSocialsect.com/about-us" />
                <meta property="twitter:title" content="About Socialsect - Digital Growth Team | Founder-Led Agency" />
                <meta property="twitter:description" content="Meet the Socialsect team - founder-led digital growth agency with proven results. 700+ booked consults, $100K+ revenue in 90 days." />
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
                        "@type": "AboutPage",
                        "@id": "https://goSocialsect.com/about-us#webpage",
                        "url": "https://goSocialsect.com/about-us",
                        "name": "About Socialsect - Digital Growth Team | Founder-Led Agency",
                        "description": "Meet the Socialsect team - founder-led digital growth agency with proven results. 700+ booked consults, $100K+ revenue in 90 days, 90+ Core Web Vitals.",
                        "isPartOf": {
                          "@id": "https://goSocialsect.com/#website"
                        },
                        "about": {
                          "@id": "https://goSocialsect.com/#organization"
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
                              "name": "About Us",
                              "item": "https://goSocialsect.com/about-us"
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
                        "description": "Founder-led digital growth agency with proven results. 700+ booked consults, $100K+ revenue in 90 days, 90+ Core Web Vitals.",
                        "foundingDate": "2020",
                        "founders": [
                          {
                            "@type": "Person",
                            "name": "Rayansh Singh",
                            "jobTitle": "Founder & CEO",
                            "description": "Founder-led approach with two owners, no hand-offs"
                          }
                        ],
                        "address": {
                          "@type": "PostalAddress",
                          "addressCountry": "US"
                        },
                        "contactPoint": {
                          "@type": "ContactPoint",
                          "contactType": "customer service",
                          "url": "https://goSocialsect.com/contact"
                        },
                        "employee": [
                          {
                            "@type": "Person",
                            "name": "Rayansh Singh",
                            "jobTitle": "Founder & CEO"
                          }
                        ],
                        "sameAs": [
                          "https://goSocialsect.com",
                          "https://goSocialsect.com/about-us",
                          "https://goSocialsect.com/services"
                        ]
                      }
                    ]
                  })}
                </script>
            </Helmet>
            {/* Team Section */}
            <div className="about-hero">
                <h1>Who you'll work with</h1>
                <p>Founder-led. Two owners. No hand-offs</p>
                <div className="about-cards">
                    <div className="cursor-target">
                        <ProfileCard
                            name="Rayansh Singh"
                            title="Founder"
                            handle="ray"
                            status="Online"
                            contactText="Contact Me"
                            avatarUrl="/rayansh.png"
                            iconUrl="/purplelogo.png"
                            showUserInfo={true}
                            enableTilt={true}
                            enableMobileTilt={false}
                            onContactClick={() => console.log('Contact clicked')}
                        />
                    </div>
                    <div className="cursor-target">
                        <ProfileCard
                            name="Aakash Menon"
                            title="CEO"
                            handle="Sky"
                            status="Online"
                            contactText="Contact Me"
                            avatarUrl="/aakashmenon.png"
                            iconUrl="/purplelogo.png"
                            showUserInfo={true}
                            enableTilt={true}
                            enableMobileTilt={false}
                            onContactClick={() => console.log('Contact clicked')}
                        />
                    </div>
                </div>
            </div>
            <section className="about-section about-chroma-grid">
                <div className="section-header">
                    <h2 className="section-title">Our Team</h2>
                    <p className="section-subtitle">The brilliant minds behind Socialsect</p>
                </div>
                <div className="cursor-target">
                    <ChromaGrid 
                        items={items}
                        radius={300}
                        damping={0.45}
                        fadeOut={0.6}
                        ease="power3.out"
                    />
                </div>
            </section>
            {/* Founder with Lanyard Side by Side */}
            <section className="about-section founder-lanyard">
                <div className="founder-lanyard-container">
                    <div className="about-founder-note">
                        <h2>Why we started Socialsect</h2>
                        <p>We kept seeing teams spend on "marketing" without a working system. Socialsect is our answer: codify a founder's intent, ship the smallest release that proves it, and scale what the data confirms.</p>
                        <ul className="about-bullets">
                            <li>Systems, not stunts.</li>
                            <li>Evidence over opinions.</li>
                            <li>Stewardship of brand, budget, and time.</li>
                        </ul>
                        <a className="about-cta cursor-target" href="/case-studies" target="_blank">Know More</a>
                    </div>
                    <div className="about-placeholder cursor-target">
                        <div className="about-music-toggle">
                            <Skiper25 />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Method */}
            <section className="about-section about-method">
                <h2>Our Method</h2>
                <div className="about-steps">
                    {methodSteps.map((step, index) => (
                        <div key={index} className="about-step cursor-target">
                            <span className="about-step-label">{step.label}</span>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Proof Strip */}
            <section className="about-section about-proof">
                <div className="about-proof-strip">
                    {proof.map((item, index) => (
                        <div key={index} className="about-proof-item cursor-target">
                            <div className="about-proof-stat">{item.stat}</div>
                            <div className="about-proof-label">{item.label}</div>
                            <div className="about-proof-note">{item.note}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Principles */}
            <section className="about-section about-principles">
                <h2>How We Operate</h2>
                <div className="about-principles-grid">
                    {principles.map((principle, index) => (
                        <div key={index} className="about-principle cursor-target">
                            <h3>{principle.title}</h3>
                            <p>{principle.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="about-section about-faq">
                <div className="about-section-header">
                    <h2>Frequently Asked Questions</h2>
                    <p className="about-section-subtitle">Find answers to common questions about our services and process</p>
                </div>
                <div className="about-faq-container">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.q} answer={faq.a} />
                    ))}
                </div>
            </section>

            {/* CTA Band */}
            <div className="about-cta-band">
                <p>Get a growth plan you can execute this month.</p>
                <div className="about-cta-buttons">
                    <a href="/lets-build" className="about-cta about-cta-primary cursor-target">Get My Growth Plan</a>
                    <a href="/case-studies" className="about-cta about-cta-secondary cursor-target">See Case Studies</a>
                </div>
            </div>
        </div>
    )
}

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`about-faq-item cursor-target ${isOpen ? 'active' : ''}`}>
      <div 
        className="about-faq-header"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
      >
        <h3>{question}</h3>
        <div className="about-faq-icon">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      <div className="about-faq-content">
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default About;