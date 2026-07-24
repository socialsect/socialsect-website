'use client'

import React, { useMemo } from 'react';
import './ClientLogoMarquee.css';

const logoUrlModules = import.meta.glob(
  '../../public/client-logos/*.{png,jpg,jpeg,svg}',
  { eager: true, import: 'default', query: '?url' }
);

/** Public URLs if glob finds nothing (e.g. misconfigured build)  files in public/client-logos/ */
const FALLBACK_LOGO_SRCS = [
  '/client-logos/interface1.webp',
  '/client-logos/msi.webp',
  '/client-logos/nymv.webp',
  '/client-logos/III.webp',
];

const MIN_TILES_PER_HALF = 18;

/** Logos exported on black; screen blend removes the plate on white strips */
function needsScreenBlend(src) {
  return /nymv|III\.png/i.test(src);
}

function isWideLogo(src) {
  return /III/i.test(src);
}

function getLogoUrlsFromGlob() {
  const urls = Object.values(logoUrlModules).filter(Boolean);
  const hasInterfaceSvg = urls.some((u) => /interface\.svg/i.test(u));
  return urls
    .filter((u) => !(hasInterfaceSvg && /interface\.png/i.test(u)))
    .sort();
}

function buildSeamlessTrack(urls) {
  const source = urls.length > 0 ? urls : FALLBACK_LOGO_SRCS;
  const half = [];
  let i = 0;
  while (half.length < MIN_TILES_PER_HALF) {
    half.push(source[i % source.length]);
    i += 1;
  }
  return [...half, ...half];
}

export default function ClientLogoMarquee() {
  const logos = useMemo(() => getLogoUrlsFromGlob(), []);
  const displaySrcs = logos.length > 0 ? logos : FALLBACK_LOGO_SRCS;
  const trackLogos = useMemo(() => buildSeamlessTrack(displaySrcs), [displaySrcs]);

  return (
    <section className="client-logo-marquee" aria-label="Client logos">
      <div className="client-logo-marquee__inner">
        {/* <p className="client-logo-marquee__heading">Trusted by:</p> */}
        <div className="client-logo-marquee__viewport">
          <div className="client-logo-marquee__track">
            {trackLogos.map((src, i) => {
              return (
                <div
                  className={`client-logo-marquee__item${
                    needsScreenBlend(src) ? ' client-logo-marquee__item--screen' : ''
                  }${isWideLogo(src) ? ' client-logo-marquee__item--wide' : ''}`}
                  key={`${src}-${i}`}
                >
                  <img src={src} alt="" loading="lazy" decoding="async" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
