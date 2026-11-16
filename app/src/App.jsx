import { useCallback, useEffect, useState } from 'react'
import { DEMO_MODE } from './data/config'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import ClientsMarquee from './components/ClientsMarquee/ClientsMarquee'
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
  const openDiagnostic = useCallback(() => setIsDiagnosticOpen(true), [])
  const closeDiagnostic = useCallback(() => setIsDiagnosticOpen(false), [])
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])
  const isDemoPage = DEMO_MODE && hash.startsWith('#demo/')
  useEffect(() => {
    if (isDemoPage) window.scrollTo(0, 0)
    else if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
  }, [hash, isDemoPage])
  return <>
    <Navbar onDiagnosticClick={openDiagnostic} />
    {isDemoPage ? <DemoPage path={hash} /> : <main><Hero onDiagnosticClick={openDiagnostic} /><ClientsMarquee /><ProductsCarousel /><FAQSection /><CTAFinal onDiagnosticClick={openDiagnostic} /></main>}
    <Footer onDiagnosticClick={openDiagnostic} />
    {DEMO_MODE && <span className="demo-badge">Modo demostración</span>}
    {DEMO_MODE ? isDiagnosticOpen && <DemoDiagnosticDialog onClose={closeDiagnostic} /> : <DiagnosticDialog isOpen={isDiagnosticOpen} onClose={closeDiagnostic} />}
  </>
}
