import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { devApiPlugin } from './server/dev-api-plugin.js'
import criticalCssPlugin from 'vite-plugin-critical-css'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const parentDir = path.resolve(__dirname, '..')

export default defineConfig(({ mode }) => {
  // Load .env from socialsect-website/ and repo root (parent)
  const env = {
    ...loadEnv(mode, parentDir, ''),
    ...loadEnv(mode, __dirname, ''),
  }
  Object.assign(process.env, env)

  return {
    plugins: [
      react(),
      devApiPlugin(),
      criticalCssPlugin({
        dimensions: [
          { width: 375, height: 812 }, // mobile
        ],
        deferStylesheets: true,
        timeout: 30000,
      }),
    ],
    build: {
      cssMinify: true,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor'
              if (id.includes('lucide-react')) return 'lucide-vendor'
              return 'vendor'
            }
          },
        },
      },
      chunkSizeWarningLimit: 1500,
      minify: 'terser',
    },
    server: {
      host: true,
      allowedHosts: true,
    },
  }
})
