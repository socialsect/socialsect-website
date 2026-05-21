import React, { useMemo } from 'react';
import {
  SiCalendly,
  SiGoogle,
  SiGoogleanalytics,
  SiGooglesearchconsole,
  SiHubspot,
  SiMeta,
  SiSemrush,
  SiShopify,
  SiWordpress,
  SiZapier,
} from 'react-icons/si';
import './ToolsPartnersMarquee.css';

const PARTNER_LOGOS = [
  { id: 'meta', label: 'Meta', Icon: SiMeta },
  { id: 'google', label: 'Google', Icon: SiGoogle },
  { id: 'wordpress', label: 'WordPress', Icon: SiWordpress },
  { id: 'shopify', label: 'Shopify', Icon: SiShopify },
  { id: 'hubspot', label: 'HubSpot', Icon: SiHubspot },
  { id: 'zapier', label: 'Zapier', Icon: SiZapier },
  { id: 'gohighlevel', label: 'GoHighLevel', src: '/partner-logos/gohighlevel.svg' },
  { id: 'calendly', label: 'Calendly', Icon: SiCalendly },
  { id: 'ga4', label: 'Google Analytics 4', Icon: SiGoogleanalytics },
  { id: 'search-console', label: 'Google Search Console', Icon: SiGooglesearchconsole },
  { id: 'semrush', label: 'Semrush', Icon: SiSemrush },
];

const MIN_TILES_PER_HALF = 22;

function buildSeamlessTrack(items) {
  const half = [];
  let i = 0;
  while (half.length < MIN_TILES_PER_HALF) {
    half.push(items[i % items.length]);
    i += 1;
  }
  return [...half, ...half];
}

function PartnerLogo({ partner }) {
  if (partner.Icon) {
    const Icon = partner.Icon;
    return <Icon className="tools-partners-marquee__icon" aria-hidden="true" />;
  }

  return (
    <img
      src={partner.src}
      alt=""
      className="tools-partners-marquee__img"
      loading="lazy"
      decoding="async"
    />
  );
}

export default function ToolsPartnersMarquee() {
  const trackItems = useMemo(() => buildSeamlessTrack(PARTNER_LOGOS), []);

  return (
    <section className="tools-partners-marquee" aria-label="Tools and partners">
      <div className="tools-partners-marquee__inner">
        <p className="tools-partners-marquee__heading">Tools &amp; partners</p>
        <div className="tools-partners-marquee__viewport">
          <div className="tools-partners-marquee__track">
            {trackItems.map((partner, i) => (
              <div className="tools-partners-marquee__item" key={`${partner.id}-${i}`}>
                <PartnerLogo partner={partner} />
                <span className="tools-partners-marquee__sr-only">{partner.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
