import React, { useState } from "react";
import SpotlightCard from "../spotlight-card/card";
import { Code, BarChart2, Search } from "lucide-react";
import "./about.css";

const serviceDetails = {
  "App Development": {
    heading: "Build the product that powers growth.",
    content:
      "We design and ship web apps that load fast, feel simple, and tie directly to revenue. You’ll get a clear user flow, a working first version, and analytics wired end-to-end so you can see what’s used and what isn’t.",
    pills: [
      "React / Next.js","Node/API","Postgres/Prisma","Auth & roles","Stripe payments",
      "File uploads","Admin dashboard","Analytics (GA4)","API integrations",
      "Notifications","CI/CD","Vercel/Render","Caching","Tests",
    ],
  },
  "Performance Marketing": {
    heading: "Make ad spend pay for itself.",
    content:
      "We turn clicks into booked appointments and sales. Offers, landing pages, and tracking are aligned; creatives are tested fast; budgets move to what’s working.",
    pills: [
      "Meta Ads","Google Search","YouTube","Retargeting","Offer + landing page",
      "Lead forms","Pixels/CAPI","UTMs","Calendly/CRM","Creative testing",
      "Audiences/lookalikes","Budget pacing","Daily checks","Weekly reports",
    ],
  },
  "SEO Services": {
    heading: "Own the searches that matter.",
    content:
      "We map what buyers actually type, fix the site so Google can crawl it, and publish pages that answer the query and convert—then we compound with internal links and weekly content.",
    pills: [
      "Keyword map","Site structure","Technical audit","Core Web Vitals 90+",
      "Schema","Internal linking","Service pages","Location pages","FAQ pages",
      "Content calendar","Backlinks/HARO","Google Search Console","XML sitemaps",
      "robots.txt","Reviews & citations",
    ],
  },
};

const services = [
  {
    title: "App Development",
    description: "Build fast, reliable web apps your customers actually use",
    icon: <Code size={48} />,
  },
  {
    title: "Performance Marketing",
    description: "Turn ad spend into booked appointments and sales.",
    icon: <BarChart2 size={48} />,
  },
  {
    title: "SEO Services",
    description: "Own the searches your buyers make before they buy.",
    icon: <Search size={48} />,
  },
];

const About = () => {
  // ✅ Default: App Development open
  const [activeService, setActiveService] = useState("App Development");

  return (
    <section className="spotlight-section">
      <div className="spotlight-grid">
        {services.map((service, index) => (
          <SpotlightCard
            key={index}
            className={`spotlight-card ${
              activeService === service.title ? "active" : ""
            }`}
            spotlightColor="#695af1"
            onClick={() => setActiveService(service.title)}
          >
            <div className="spotlight-content">
              <div className="service-icon1">{service.icon}</div>
              <h3 className="spotlight-title">{service.title}</h3>
              <p className="spotlight-description">{service.description}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Expanded Details Section */}
      {activeService && (
        <div className="service-details">
          <div className="service-details-content">
            <h2>{serviceDetails[activeService].heading}</h2>
            <p>{serviceDetails[activeService].content}</p>
          </div>
          <div className="service-pills">
            {serviceDetails[activeService].pills.map((pill, i) => (
              <span key={i} className="pill">
                {pill}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
