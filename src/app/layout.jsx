/* eslint-disable react-refresh/only-export-components */

import Script from 'next/script'
import Providers from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PodcastBanner from '@/components/PodcastBanner'
import GrowthAuditorLauncher from '@/components/growth-auditor/GrowthAuditorLauncher'
import { getSeoConfig } from '@/lib/seo'
import '@/globals.css'

// Global site-level schemas injected on every page (org + website)
const globalSchemas = getSeoConfig('/').schemas.slice(0, 2)

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#695AF2',
}

export const metadata = {
  metadataBase: new URL('https://gosocialsect.com'),
  title: 'Socialsect : Patient Acquisition Systems for Private Medical Practices',
  description:
    'We embed into your practice, diagnose exactly where patients are falling through the gaps, and build the system that closes them. Website, paid growth, SEO, brand, booking systems  one team. No packages. US & UK.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    siteName: 'Socialsect',
    locale: 'en_US',
    type: 'website',
    title: 'Socialsect : Patient Acquisition Systems for Private Medical Practices',
    description:
      'We embed into your practice, diagnose exactly where patients are falling through the gaps, and build the system that closes them. Website, paid growth, SEO, brand, booking systems  one team. No packages. US & UK.',
    url: 'https://gosocialsect.com/',
    images: [
      {
        url: 'https://gosocialsect.com/social-share.webp',
        width: 1200,
        height: 630,
        alt: 'Socialsect - private medical practice growth',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thesocialsect',
    creator: '@thesocialsect',
    title: 'Socialsect : Patient Acquisition Systems for Private Medical Practices',
    description:
      'We embed into your practice, diagnose exactly where patients are falling through the gaps, and build the system that closes them. Website, paid growth, SEO, brand, booking systems  one team. No packages. US & UK.',
    images: ['https://gosocialsect.com/social-share.webp'],
  },
  icons: {
    icon: [
      { url: '/icons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Socialsect',
  },
  other: {
    'linkedin:url': 'https://gosocialsect.com/',
    'linkedin:title': 'Socialsect : Patient Acquisition Systems for Private Medical Practices',
    'linkedin:description':
      'We embed into your practice, diagnose exactly where patients are falling through the gaps, and build the system that closes them. Website, paid growth, SEO, brand, booking systems  one team. No packages. US & UK.',
    'pinterest:url': 'https://gosocialsect.com/',
    'pinterest:media': 'https://gosocialsect.com/social-share.webp',
    'pinterest:description':
      'Socialsect : Patient Acquisition Systems for Private Medical Practices',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('hasSeenIntro')) {
                  document.documentElement.dataset.hasSeenIntro = '1';
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var d = document;
                // Intercept appendChild to defer stylesheets BEFORE they're added to DOM
                var origAppendChild = Node.prototype.appendChild;
                Node.prototype.appendChild = function(child) {
                  if (child && child.tagName && child.tagName.toLowerCase() === 'link' &&
                      child.rel === 'stylesheet' && child.href &&
                      child.href.indexOf('googleapis') === -1 && child.media !== 'print') {
                    child.media = 'print';
                    child.addEventListener('load', function(){ this.media = 'all'; });
                  }
                  return origAppendChild.call(this, child);
                };
                // Defer any existing stylesheets
                var existing=d.querySelectorAll('link[rel=stylesheet]');
                for(var i=0;i<existing.length;i++){
                  var e=existing[i];
                  if(e.href&&e.href.indexOf('googleapis')===-1&&e.media!=='print'){
                    try{ if(e.sheet)continue }catch(x){}
                    e.media='print';
                    e.onload=function(){this.media='all'};
                  }
                }
              })();
            `,
          }}
        />
        {globalSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            suppressHydrationWarning
          />
        ))}
        {/* Fonts load via @font-face with font-display:swap — no preload to avoid bandwidth contention */}
        {/* Preconnect hints for third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Non-blocking Google Fonts: print media ensures it doesn't block paint */}
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body>
        <Providers>
          <div className="app-shell">
            <Navbar />
            {children}
            <PodcastBanner />
            <GrowthAuditorLauncher />
            <Footer />
          </div>
        </Providers>
        <Script
          type="module"
          src="https://unpkg.com/ionicons@7/dist/ionicons/ionicons.esm.js"
          strategy="afterInteractive"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-DT57D4YWRB" strategy="lazyOnload" />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DT57D4YWRB');
          `}
        </Script>
      </body>
    </html>
  )
}
