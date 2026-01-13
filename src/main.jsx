import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // Import HashRouter
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* This fixes the 404s on GitHub Pages */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)