import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {allowedHosts:["72b3-2402-e280-2248-336-508-2da6-cbff-4cc7.ngrok-free.app"]}
})
