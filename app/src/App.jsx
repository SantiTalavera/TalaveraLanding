import { useCallback, useEffect, useRef, useState } from 'react'
import { DEMO_MODE } from './data/config'
import { clients, portfolio } from './data/content'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import ClientsMarquee from './components/ClientsMarquee/ClientsMarquee'
import Capabilities from './components/Capabilities/Capabilities'
import ProductsCarousel from './components/ProductsCarousel/ProductsCarousel'
import FAQSection from './components/FAQSection/FAQSection'
import CTAFinal from './components/CTAFinal/CTAFinal'
import Footer from './components/Footer/Footer'
import DiagnosticDialog from './components/DiagnosticDialog/DiagnosticDialog'
import DemoDiagnosticDialog from './components/DiagnosticDialog/DemoDiagnosticDialog'
import DemoPage from './components/DemoPage/DemoPage'

export default function App() {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false)
  const [hash, setHash] = useState(window.location.hash)
  const frameRef = useRef(null)
  const storyRef = useRef(null)
  const openDiagnostic = useCallback(() => setIsDiagnosticOpen(true), [])
  const closeDiagnostic = useCallback(() => setIsDiagnosticOpen(false), [])
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])
  const isDemoPage = DEMO_MODE && hash.startsWith('#demo/')
  const hasStageContent = clients.some((client) => client.logo && client.url)
    && portfolio.some((item) => item.visibility === 'public' || (DEMO_MODE && item.visibility === 'demo'))
  useEffect(() => {
    if (isDemoPage) frameRef.current?.scrollTo({ top: 0, behavior: 'instant' })
    else if (hash) requestAnimationFrame(() => {
      const frame = frameRef.current
      const story = storyRef.current
      const targetProgress = { '#inicio': 0, '#capacidades': .29, '#optimizacion-operativa': .29, '#ingenieria-tecnologia': .29, '#desarrollo-estrategico': .29, '#productos': .39, '#preguntas-frecuentes': .6 }[hash]
      if (targetProgress !== undefined && frame && story && getComputedStyle(story).getPropertyValue('--story-height').trim()) {
        const top = frame.scrollTop + story.getBoundingClientRect().top - frame.getBoundingClientRect().top
        frame.scrollTo({ top: top + (story.offsetHeight - frame.clientHeight) * targetProgress, behavior: 'smooth' })
      } else document.getElementById(hash.slice(1))?.scrollIntoView()
    })
  }, [hash, isDemoPage])
  return <>
    <Navbar onDiagnosticClick={openDiagnostic} />
    <div className="page-frame" ref={frameRef} tabIndex={0} aria-label="Contenido de la página">
      {isDemoPage ? <><DemoPage path={hash} /><Footer onDiagnosticClick={openDiagnostic} /></> : <main><div className={`story-stage${hasStageContent ? ' story-stage--active' : ''}`} ref={storyRef}><div className="story-stage__viewport"><Hero onDiagnosticClick={openDiagnostic} /><ClientsMarquee /><Capabilities showPortfolio={portfolio.some((item) => item.visibility === 'public' || (DEMO_MODE && item.visibility === 'demo'))} /><ProductsCarousel onDiagnosticClick={openDiagnostic} /><FAQSection /><CTAFinal onDiagnosticClick={openDiagnostic} /><Footer onDiagnosticClick={openDiagnostic} /></div></div></main>}
    </div>
    {DEMO_MODE && <span className="demo-badge">Modo demostración</span>}
    {DEMO_MODE ? isDiagnosticOpen && <DemoDiagnosticDialog onClose={closeDiagnostic} /> : <DiagnosticDialog isOpen={isDiagnosticOpen} onClose={closeDiagnostic} />}
  </>
}
