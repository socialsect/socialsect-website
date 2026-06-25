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
  webpack: (config) => {
    config.resolve.alias['react-router-dom'] = path.join(__dirname, 'src/lib/router-shim.jsx')
    return config
  },
  turbopack: {
    resolveAlias: {
      'react-router-dom': './src/lib/router-shim.jsx',
    },
  },
}

export default nextConfig
