import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { devApiPlugin } from './server/dev-api-plugin.js'

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
    plugins: [react(), devApiPlugin()],
    build: {
      cssMinify: false,
    },
    server: {
      host: true,
      allowedHosts: true,
    },
  }
})
