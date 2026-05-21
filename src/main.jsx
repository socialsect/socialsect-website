import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { enableResourcePrefetch } from './lib/performance.js'

// Enable resource prefetching after page loads
window.addEventListener('load', enableResourcePrefetch)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
