/* eslint-disable react-refresh/only-export-components */

import Script from 'next/script'
import Providers from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import GrowthAuditorLauncher from '@/components/growth-auditor/GrowthAuditorLauncher'
import { getSeoConfig } from '@/lib/seo'
import '@/globals.css'
import '@/index.css'
import '@/fonts.css'
import '@/App.css'

// Global site-level schemas injected on every page (org + website)
const globalSchemas = getSeoConfig('/').schemas.slice(0, 2)

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#695AF2',
}

export function generateMetadata() {
  const isReviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE === 'true'

  if (isReviewMode) {
    return {
      title: 'Socialsect : Patient Acquisition Systems for Private Medical Practices',
      description:
        'We embed into your practice, diagnose exactly where patients are falling through the gaps, and build the system that closes them. Website, paid growth, SEO, brand, booking systems  one team. No packages. US & UK.',
      robots: 'noindex, nofollow, noarchive, nosnippet',
      openGraph: {
        siteName: 'Socialsect',
        locale: 'en_US',
        type: 'website',
        title: 'Socialsect : Patient Acquisition Systems for Private Medical Practices',
        description:
          'We embed into your practice, diagnose exactly where patients are falling through the gaps, and build the system that closes them. Website, paid growth, SEO, brand, booking systems  one team. No packages. US & UK.',
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
    }
  }

  return {
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
}

export default function RootLayout({ children }) {
  const isReviewMode = process.env.NEXT_PUBLIC_REVIEW_MODE === 'true'

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

        {!isReviewMode && globalSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            suppressHydrationWarning
          />
        ))}
      </head>
      <body>
        <Providers>
          <div className="app-shell">
            <Navbar />
            {children}

            <GrowthAuditorLauncher />
            <Footer />
          </div>
        </Providers>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('requestIdleCallback' in window) {
                requestIdleCallback(function() {
                  var s = document.createElement('script');
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-DT57D4YWRB';
                  s.async = true;
                  document.head.appendChild(s);
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-DT57D4YWRB');
                }, { timeout: 3000 });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
