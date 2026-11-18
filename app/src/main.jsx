import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './mobile.css'
import './theme.css'

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
    const headerLogo = document.querySelector('.navbar__logo img')
    const loadingLogo = loader.querySelector('.page-loader__panel img')
    if (headerLogo && loadingLogo && !reducedMotion && !window.matchMedia('(max-width: 750px)').matches) {
      const target = headerLogo.getBoundingClientRect()
      const source = loadingLogo.getBoundingClientRect()
      const logoStart = 8 / 644
      loader.style.setProperty('--logo-dx', `${target.left + target.width * logoStart - (source.left + source.width * logoStart)}px`)
      loader.style.setProperty('--logo-dy', `${target.top + target.height / 2 - (source.top + source.height / 2)}px`)
      headerLogo.style.visibility = 'hidden'
    }
    loader.classList.add('is-opening')
    const duration = reducedMotion ? 0 : window.matchMedia('(max-width: 750px)').matches ? 200 : 1500
    window.setTimeout(() => {
      root.inert = false
      if (headerLogo) headerLogo.style.visibility = ''
      loader.remove()
    }, duration)
  }, remaining)
})

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
