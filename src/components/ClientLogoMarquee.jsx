'use client'

import React, { useMemo } from 'react';
import './ClientLogoMarquee.css';

const LOGOS = [
  { src: '/client-logos/interface1.webp', alt: 'The Interface Specialist Clinic logo', href: 'https://interfaceclinic.co.uk/' },
  { src: '/client-logos/msi.webp', alt: 'Miami Shoulder Institute logo', href: 'https://miamishoulderinstitute.com/' },
  { src: '/client-logos/nymv.webp', alt: 'NY Metrovein Medical logo', href: 'https://www.nymetrovein.com/' },
  { src: '/client-logos/III.webp', alt: 'International Implant Institute logo', href: 'https://intlimplantinstitute.com/' },
  { src: '/client-logos/visage.webp', alt: 'Visage Polyclinic logo', href: 'https://visagepolyclinicdubai.com/' },
  { src: '/client-logos/enliven.webp', alt: 'Enliven Counselling Center logo', href: 'https://www.enlivencounsellingcenter.com/' },
  { src: '/client-logos/physioexpert.webp', alt: 'Physioexpert Dubai logo', href: 'https://physioexpertdubai.com/' },
  { src: '/client-logos/wellcube.webp', alt: 'Wellcube logo', href: 'https://wellcube.life/' },
  { src: '/client-logos/sawsan-awartani.webp', alt: 'Dr. Sawsan Awartani logo', href: 'https://drsawsanawartani.com/' },
  { src: '/client-logos/modern-aestheticss.webp', alt: 'Modern Aestheticss logo', href: 'https://modernaestheticss.com/' },
  { src: '/client-logos/tdc-dental.webp', alt: 'TDC Dental Clinic logo', href: 'https://tdcdental.ae/' },
  { src: '/client-logos/white-clinic.webp', alt: 'White Clinic Dubai logo', href: 'https://whiteclinic.ae/' },
  { src: '/client-logos/zee-longevity.webp', alt: 'Zee Longevity logo', href: 'https://zlongevity.ae/' },
  { src: '/client-logos/novosculpt.webp', alt: 'Novosculpt logo', href: 'https://novosculpt.us/' },
  { src: '/client-logos/traverso-hand.webp', alt: 'Traverso Hand logo', href: 'https://traversohand.com/' },
];

const MIN_TILES_PER_HALF = 18;

/** Logos exported on black; screen blend removes the plate on white strips */
function needsScreenBlend(src) {
  return /nymv|III\.png/i.test(src);
}

function isWideLogo(src) {
  return /III/i.test(src);
}

function buildSeamlessTrack(logos) {
  const source = logos.length > 0 ? logos : LOGOS;
  const half = [];
  let i = 0;
  while (half.length < MIN_TILES_PER_HALF) {
    half.push(source[i % source.length]);
    i += 1;
  }
  return [...half, ...half];
}

export default function ClientLogoMarquee() {
  const trackLogos = useMemo(() => buildSeamlessTrack(LOGOS), []);

  return (
    <section className="client-logo-marquee" aria-label="Client logos">
      <div className="client-logo-marquee__inner">
        {/* <p className="client-logo-marquee__heading">Trusted by:</p> */}
        <div className="client-logo-marquee__viewport">
          <div className="client-logo-marquee__track">
            {trackLogos.map(({ src, alt, href }, i) => {
              return (
                <div
                  className={`client-logo-marquee__item${
                    needsScreenBlend(src) ? ' client-logo-marquee__item--screen' : ''
                  }${isWideLogo(src) ? ' client-logo-marquee__item--wide' : ''}`}
                  key={`${src}-${i}`}
                >
                  <a
                    className="client-logo-marquee__link"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={src} alt={alt} loading="lazy" decoding="async" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
