import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["above-direction-logos-jesus.trycloudflare.com"],
    host: true
  },
  assetsInclude: ['**/*.glb', '**/*.mp3', '**/*.wav', '**/*.ogg']
}) 