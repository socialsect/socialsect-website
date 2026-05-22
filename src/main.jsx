import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { enableResourcePrefetch, deferNonCriticalStyles } from './lib/performance.js'

// Enable resource prefetching after page loads
window.addEventListener('load', enableResourcePrefetch)

// Defer non-critical styles once the document is interactive to avoid render blocking
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', deferNonCriticalStyles)
} else {
  deferNonCriticalStyles()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
