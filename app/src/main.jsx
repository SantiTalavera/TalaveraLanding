import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './mobile.css'
import './theme.css'
import './story-motion.css'
import './editorial.css'

const loader = document.getElementById('page-loader')
const root = document.getElementById('root')
const startedAt = performance.now()
root.inert = true

const pageLoaded = document.readyState === 'complete'
  ? Promise.resolve()
  : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
const timeout = new Promise((resolve) => window.setTimeout(resolve, 8000))

Promise.race([Promise.all([pageLoaded, document.fonts.ready]), timeout]).then(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const remaining = Math.max(0, (reducedMotion ? 0 : 400) - (performance.now() - startedAt))
  window.setTimeout(() => {
    loader.classList.add('is-opening')
    const duration = reducedMotion ? 0 : 900
    window.setTimeout(() => {
      root.inert = false
      loader.remove()
    }, duration)
  }, remaining)
})

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
