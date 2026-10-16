import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    VITE_SANITY_PROJECT_ID: process.env.VITE_SANITY_PROJECT_ID,
    VITE_SANITY_DATASET: process.env.VITE_SANITY_DATASET,
    VITE_SANITY_API_VERSION: process.env.VITE_SANITY_API_VERSION,
  },

  // Enable critical CSS inlining via critters
  experimental: {
    optimizeCss: true,
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [480, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // cache optimized images for 24h
  },

  // Performance headers + Security headers
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/team/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/products/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/posters/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)\\.(webp|avif|svg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Security headers for all routes (Best Practices)
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
        ],
      },
    ]
  },

  // 301 redirects: old URL structure -> corrected nested structure (65 URLs)
  async redirects() {
    return [
      { source: '/seo-services-aesthetic-cosmetic-medicine-dubai', destination: '/seo-services-aesthetic-cosmetic-medicine/dubai', permanent: true },
      { source: '/seo-services-aesthetic-cosmetic-medicine-dubai-marina', destination: '/seo-services-aesthetic-cosmetic-medicine/dubai-marina', permanent: true },
      { source: '/seo-services-aesthetic-cosmetic-medicine-downtown-dubai', destination: '/seo-services-aesthetic-cosmetic-medicine/downtown-dubai', permanent: true },
      { source: '/seo-services-aesthetic-cosmetic-medicine-jumeirah', destination: '/seo-services-aesthetic-cosmetic-medicine/jumeirah', permanent: true },
      { source: '/seo-services-aesthetic-cosmetic-medicine-business-bay', destination: '/seo-services-aesthetic-cosmetic-medicine/business-bay', permanent: true },
      { source: '/seo-services-aesthetic-cosmetic-medicine-dubai-healthcare-city', destination: '/seo-services-aesthetic-cosmetic-medicine/dubai-healthcare-city', permanent: true },
      { source: '/seo-services-aesthetic-cosmetic-medicine-al-barsha', destination: '/seo-services-aesthetic-cosmetic-medicine/al-barsha', permanent: true },
      { source: '/seo-services-aesthetic-cosmetic-medicine-palm-jumeirah', destination: '/seo-services-aesthetic-cosmetic-medicine/palm-jumeirah', permanent: true },
      { source: '/seo-services-aesthetic-cosmetic-medicine-jbr', destination: '/seo-services-aesthetic-cosmetic-medicine/jbr', permanent: true },
      { source: '/seo-services-aesthetic-cosmetic-medicine-sheikh-zayed-road', destination: '/seo-services-aesthetic-cosmetic-medicine/sheikh-zayed-road', permanent: true },
      { source: '/marketing-agency-aesthetic-cosmetic-medicine-dubai', destination: '/marketing-agency-aesthetic-cosmetic-medicine/dubai', permanent: true },
      { source: '/marketing-agency-aesthetic-cosmetic-medicine-dubai-marina', destination: '/marketing-agency-aesthetic-cosmetic-medicine/dubai-marina', permanent: true },
      { source: '/marketing-agency-aesthetic-cosmetic-medicine-downtown-dubai', destination: '/marketing-agency-aesthetic-cosmetic-medicine/downtown-dubai', permanent: true },
      { source: '/marketing-agency-aesthetic-cosmetic-medicine-jumeirah', destination: '/marketing-agency-aesthetic-cosmetic-medicine/jumeirah', permanent: true },
      { source: '/marketing-agency-aesthetic-cosmetic-medicine-business-bay', destination: '/marketing-agency-aesthetic-cosmetic-medicine/business-bay', permanent: true },
      { source: '/marketing-agency-for-dental-dubai', destination: '/marketing-agency-for-dental/dubai', permanent: true },
      { source: '/marketing-agency-for-dental-dubai-marina', destination: '/marketing-agency-for-dental/dubai-marina', permanent: true },
      { source: '/marketing-agency-for-dental-downtown-dubai', destination: '/marketing-agency-for-dental/downtown-dubai', permanent: true },
      { source: '/marketing-agency-for-dental-jumeirah', destination: '/marketing-agency-for-dental/jumeirah', permanent: true },
      { source: '/marketing-agency-for-dental-business-bay', destination: '/marketing-agency-for-dental/business-bay', permanent: true },
      { source: '/marketing-agency-for-dental-dubai-healthcare-city', destination: '/marketing-agency-for-dental/dubai-healthcare-city', permanent: true },
      { source: '/marketing-agency-for-dental-al-barsha', destination: '/marketing-agency-for-dental/al-barsha', permanent: true },
      { source: '/marketing-agency-for-dental-palm-jumeirah', destination: '/marketing-agency-for-dental/palm-jumeirah', permanent: true },
      { source: '/marketing-agency-for-dental-jbr', destination: '/marketing-agency-for-dental/jbr', permanent: true },
      { source: '/marketing-agency-for-dental-sheikh-zayed-road', destination: '/marketing-agency-for-dental/sheikh-zayed-road', permanent: true },
      { source: '/marketing-agency-ivf-fertility-dubai', destination: '/marketing-agency-ivf-fertility/dubai', permanent: true },
      { source: '/marketing-agency-ivf-fertility-dubai-marina', destination: '/marketing-agency-ivf-fertility/dubai-marina', permanent: true },
      { source: '/marketing-agency-ivf-fertility-downtown-dubai', destination: '/marketing-agency-ivf-fertility/downtown-dubai', permanent: true },
      { source: '/marketing-agency-ivf-fertility-jumeirah', destination: '/marketing-agency-ivf-fertility/jumeirah', permanent: true },
      { source: '/marketing-agency-ivf-fertility-business-bay', destination: '/marketing-agency-ivf-fertility/business-bay', permanent: true },
      { source: '/marketing-agency-ivf-fertility-dubai-healthcare-city', destination: '/marketing-agency-ivf-fertility/dubai-healthcare-city', permanent: true },
      { source: '/marketing-agency-ivf-fertility-al-barsha', destination: '/marketing-agency-ivf-fertility/al-barsha', permanent: true },
      { source: '/marketing-agency-ivf-fertility-palm-jumeirah', destination: '/marketing-agency-ivf-fertility/palm-jumeirah', permanent: true },
      { source: '/marketing-agency-ivf-fertility-jbr', destination: '/marketing-agency-ivf-fertility/jbr', permanent: true },
      { source: '/marketing-agency-ivf-fertility-sheikh-zayed-road', destination: '/marketing-agency-ivf-fertility/sheikh-zayed-road', permanent: true },
      { source: '/seo-services-for-dentists-in-new-york', destination: '/seo-services-for-dentists/new-york', permanent: true },
      { source: '/seo-services-for-dentists-in-los-angeles', destination: '/seo-services-for-dentists/los-angeles', permanent: true },
      { source: '/seo-services-for-dentists-in-miami', destination: '/seo-services-for-dentists/miami', permanent: true },
      { source: '/seo-services-for-dentists-in-chicago', destination: '/seo-services-for-dentists/chicago', permanent: true },
      { source: '/seo-services-for-dentists-in-houston', destination: '/seo-services-for-dentists/houston', permanent: true },
      { source: '/seo-services-for-dentists-in-dallas', destination: '/seo-services-for-dentists/dallas', permanent: true },
      { source: '/seo-services-for-dentists-in-phoenix', destination: '/seo-services-for-dentists/phoenix', permanent: true },
      { source: '/seo-services-for-dentists-in-atlanta', destination: '/seo-services-for-dentists/atlanta', permanent: true },
      { source: '/seo-services-for-dentists-in-seattle', destination: '/seo-services-for-dentists/seattle', permanent: true },
      { source: '/seo-services-for-dentists-in-boston', destination: '/seo-services-for-dentists/boston', permanent: true },
      { source: '/seo-services-orthopaedic-surgeons-new-york', destination: '/seo-services-orthopaedic-surgeons/new-york', permanent: true },
      { source: '/seo-services-orthopaedic-surgeons-los-angeles', destination: '/seo-services-orthopaedic-surgeons/los-angeles', permanent: true },
      { source: '/seo-services-orthopaedic-surgeons-miami', destination: '/seo-services-orthopaedic-surgeons/miami', permanent: true },
      { source: '/seo-services-orthopaedic-surgeons-chicago', destination: '/seo-services-orthopaedic-surgeons/chicago', permanent: true },
      { source: '/seo-services-orthopaedic-surgeons-houston', destination: '/seo-services-orthopaedic-surgeons/houston', permanent: true },
      { source: '/seo-services-orthopaedic-surgeons-dallas', destination: '/seo-services-orthopaedic-surgeons/dallas', permanent: true },
      { source: '/seo-services-orthopaedic-surgeons-phoenix', destination: '/seo-services-orthopaedic-surgeons/phoenix', permanent: true },
      { source: '/seo-services-orthopaedic-surgeons-atlanta', destination: '/seo-services-orthopaedic-surgeons/atlanta', permanent: true },
      { source: '/seo-services-orthopaedic-surgeons-seattle', destination: '/seo-services-orthopaedic-surgeons/seattle', permanent: true },
      { source: '/seo-services-orthopaedic-surgeons-boston', destination: '/seo-services-orthopaedic-surgeons/boston', permanent: true },
      { source: '/seo-services-for-plastic-surgeons-new-york', destination: '/seo-services-for-plastic-surgeons/new-york', permanent: true },
      { source: '/seo-services-for-plastic-surgeons-los-angeles', destination: '/seo-services-for-plastic-surgeons/los-angeles', permanent: true },
      { source: '/seo-services-for-plastic-surgeons-miami', destination: '/seo-services-for-plastic-surgeons/miami', permanent: true },
      { source: '/seo-services-for-plastic-surgeons-chicago', destination: '/seo-services-for-plastic-surgeons/chicago', permanent: true },
      { source: '/seo-services-for-plastic-surgeons-houston', destination: '/seo-services-for-plastic-surgeons/houston', permanent: true },
      { source: '/seo-services-for-plastic-surgeons-dallas', destination: '/seo-services-for-plastic-surgeons/dallas', permanent: true },
      { source: '/seo-services-for-plastic-surgeons-phoenix', destination: '/seo-services-for-plastic-surgeons/phoenix', permanent: true },
      { source: '/seo-services-for-plastic-surgeons-atlanta', destination: '/seo-services-for-plastic-surgeons/atlanta', permanent: true },
      { source: '/seo-services-for-plastic-surgeons-seattle', destination: '/seo-services-for-plastic-surgeons/seattle', permanent: true },
      { source: '/seo-services-for-plastic-surgeons-boston', destination: '/seo-services-for-plastic-surgeons/boston', permanent: true },
    ]
  },

  webpack: (config, { isServer }) => {
    config.resolve.alias['react-router-dom'] = path.join(__dirname, 'src/lib/router-shim.jsx')

    // Remove polyfills for modern browsers (Chrome 92+, Firefox 90+, Safari 15.4+)
    if (!isServer) {
      const originalEntry = config.entry
      config.entry = async () => {
        const entries = await originalEntry()
        if (entries['polyfills']) {
          delete entries['polyfills']
        }
        return entries
      }
    }

    return config
  },
  turbopack: {
    resolveAlias: {
      'react-router-dom': './src/lib/router-shim.jsx',
    },
  },
}

export default nextConfig
