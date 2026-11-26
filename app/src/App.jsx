import { useCallback, useEffect, useRef, useState } from 'react'
import { DEMO_MODE } from './data/config'
import { visiblePortfolio } from './data/content'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Capabilities from './components/Capabilities/Capabilities'
import ProductsCarousel from './components/ProductsCarousel/ProductsCarousel'
import FAQSection from './components/FAQSection/FAQSection'
import CTAFinal from './components/CTAFinal/CTAFinal'
import Footer from './components/Footer/Footer'
import DemoDiagnosticDialog from './components/DiagnosticDialog/DemoDiagnosticDialog'
import DemoPage from './components/DemoPage/DemoPage'

export default function App() {
  const [contact, setContact] = useState(null)
  const [hash, setHash] = useState(window.location.hash)
  const [navigationCount, setNavigationCount] = useState(0)
  const frameRef = useRef(null)
  const storyRef = useRef(null)
  const openDiagnostic = useCallback((context = {}) => setContact({ source: context.source || 'general', reason: context.reason || '', initiativeId: context.initiativeId || '' }), [])
  const closeDiagnostic = useCallback(() => setContact(null), [])
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)
    const repeatNavigation = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (link && link.getAttribute('href') === window.location.hash) {
        setNavigationCount((count) => count + 1)
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    }
    window.addEventListener('hashchange', updateHash)
    document.addEventListener('click', repeatNavigation)
    return () => { window.removeEventListener('hashchange', updateHash); document.removeEventListener('click', repeatNavigation) }
  }, [])
  const isDemoPage = DEMO_MODE && hash.startsWith('#demo/')
  const compactStage = visiblePortfolio.length === 0
  const portfolioStage = visiblePortfolio.length > 0
  useEffect(() => {
    if (isDemoPage) frameRef.current?.scrollTo({ top: 0, behavior: 'instant' })
    else if (hash) requestAnimationFrame(() => {
      const frame = frameRef.current
      const story = storyRef.current
      const anchor = hash.startsWith('#portfolio/') ? '#productos' : hash
      const targetProgress = (portfolioStage
        ? { '#inicio': 0, '#capacidades': .24, '#optimizacion-operativa': .24, '#ingenieria-tecnologia': .24, '#desarrollo-estrategico': .24, '#productos': .43, '#preguntas-frecuentes': .62 }
        : compactStage
        ? { '#inicio': 0, '#capacidades': .32, '#optimizacion-operativa': .32, '#ingenieria-tecnologia': .32, '#desarrollo-estrategico': .32, '#preguntas-frecuentes': .57 }
        : { '#inicio': 0, '#capacidades': .29, '#optimizacion-operativa': .29, '#ingenieria-tecnologia': .29, '#desarrollo-estrategico': .29, '#productos': .39, '#preguntas-frecuentes': .6 })[anchor]
      if (targetProgress !== undefined && frame && story && getComputedStyle(story).getPropertyValue('--story-height').trim()) {
        const top = frame.scrollTop + story.getBoundingClientRect().top - frame.getBoundingClientRect().top
        frame.scrollTo({ top: top + (story.offsetHeight - frame.clientHeight) * targetProgress, behavior: 'smooth' })
      } else document.getElementById(anchor.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const target = document.getElementById(anchor.slice(1))
      if (target?.matches('article[tabindex]')) {
        if (targetProgress !== undefined && story && getComputedStyle(story).getPropertyValue('--story-height').trim()) {
          window.setTimeout(() => { if (window.location.hash === hash) target.focus({ preventScroll: true }) }, 800)
        } else target.focus({ preventScroll: true })
      }
    })
  }, [hash, isDemoPage, navigationCount, compactStage, portfolioStage])
  return <>
    <Navbar onDiagnosticClick={() => openDiagnostic({ source: 'header' })} />
    <div className="page-frame" ref={frameRef} tabIndex={0} aria-label="Contenido de la página">
      {isDemoPage ? <><DemoPage path={hash} /><Footer onDiagnosticClick={() => openDiagnostic({ source: 'footer' })} /></> : <main><div className={`story-stage${compactStage || portfolioStage ? ' story-stage--active' : ''}${compactStage ? ' story-stage--compact' : ''}${portfolioStage ? ' story-stage--portfolio' : ''}`} ref={storyRef}><div className="story-stage__viewport"><Hero onDiagnosticClick={() => openDiagnostic({ source: 'hero' })} /><Capabilities showPortfolio={visiblePortfolio.length > 0} /><ProductsCarousel onDiagnosticClick={openDiagnostic} hash={hash} /><FAQSection /><div className="closing-section"><CTAFinal onDiagnosticClick={() => openDiagnostic({ source: 'cta-final' })} /><Footer onDiagnosticClick={() => openDiagnostic({ source: 'footer' })} /></div></div></div></main>}
    </div>
    {DEMO_MODE && <span className="demo-badge">Modo demostración</span>}
    {contact && <DemoDiagnosticDialog key={`${contact.source}-${contact.initiativeId}`} onClose={closeDiagnostic} contact={contact} available={DEMO_MODE} />}
  </>
}
