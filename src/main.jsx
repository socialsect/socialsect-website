import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ScrollToTop from './components/ScrollToTop.jsx'
import StagingGate from './components/StagingGate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <StagingGate>
          <App />
        </StagingGate>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
