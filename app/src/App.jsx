import { useCallback, useEffect, useRef, useState } from 'react'
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
  useEffect(() => {
    if (isDemoPage) frameRef.current?.scrollTo({ top: 0, behavior: 'instant' })
    else if (hash) requestAnimationFrame(() => {
      const frame = frameRef.current
      const story = storyRef.current
      const targetPhase = { '#inicio': 0, '#productos': 2, '#preguntas-frecuentes': 3 }[hash]
      if (targetPhase !== undefined && frame && story?.classList.contains('story-stage--active')) {
        const top = frame.scrollTop + story.getBoundingClientRect().top - frame.getBoundingClientRect().top
        frame.scrollTo({ top: top + (story.offsetHeight - frame.clientHeight) * targetPhase / 5, behavior: 'smooth' })
      } else document.getElementById(hash.slice(1))?.scrollIntoView()
    })
  }, [hash, isDemoPage])
  useEffect(() => {
    const frame = frameRef.current
    const story = storyRef.current
    if (!frame || !story || isDemoPage) return undefined
    const media = matchMedia('(min-width: 1051px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)')
    const hero = story.querySelector('.hero')
    const clients = story.querySelector('.clients')
    const products = story.querySelector('.products')
    const faq = story.querySelector('.faq')
    const cta = story.querySelector('.cta-final')
    const footer = story.querySelector('.footer')
    if (!hero || !clients || !products || !faq || !cta || !footer) return undefined
    const clamp = (value) => Math.max(0, Math.min(1, value))
    const progressBetween = (value, start, end) => clamp((value - start) / (end - start))
    let animationFrame
    const update = () => {
      animationFrame = undefined
      if (!media.matches) return
      const distance = story.offsetHeight - frame.clientHeight
      const progress = clamp((frame.getBoundingClientRect().top - story.getBoundingClientRect().top) / distance)
      const phase = progress * 5
      const first = clamp(phase / 2)
      const heroOut = progressBetween(first, .08, .38)
      const clientsIn = progressBetween(first, .18, .32)
      const clientsOut = progressBetween(first, .36, .5)
      const headingIn = progressBetween(first, .38, .62)
      const copyIn = progressBetween(first, .48, .74)
      const visualIn = progressBetween(first, .59, .86)
      const productsOut = progressBetween(phase, 2.12, 2.78)
      const faqIn = progressBetween(phase, 2.3, 2.95)
      const faqOut = progressBetween(phase, 3.15, 3.78)
      const ctaIn = progressBetween(phase, 3.3, 3.95)
      const footerIn = progressBetween(phase, 4.3, 4.95)
      story.style.setProperty('--hero-out', heroOut)
      story.style.setProperty('--clients-opacity', Math.min(clientsIn, 1 - clientsOut))
      story.style.setProperty('--heading-in', headingIn)
      story.style.setProperty('--copy-in', copyIn)
      story.style.setProperty('--visual-in', visualIn)
      story.style.setProperty('--products-out', productsOut)
      story.style.setProperty('--faq-in', faqIn)
      story.style.setProperty('--faq-intro-in', progressBetween(phase, 2.3, 2.7))
      story.style.setProperty('--faq-list-in', progressBetween(phase, 2.48, 2.95))
      story.style.setProperty('--faq-out', faqOut)
      story.style.setProperty('--cta-in', ctaIn)
      story.style.setProperty('--cta-label-in', progressBetween(phase, 3.3, 3.55))
      story.style.setProperty('--cta-title-in', progressBetween(phase, 3.4, 3.7))
      story.style.setProperty('--cta-copy-in', progressBetween(phase, 3.52, 3.83))
      story.style.setProperty('--cta-button-in', progressBetween(phase, 3.62, 3.95))
      story.style.setProperty('--footer-in', footerIn)
      story.style.setProperty('--footer-bottom-in', progressBetween(phase, 4.55, 4.95))
      hero.inert = heroOut > .75
      clients.inert = clientsIn < .8 || clientsOut > .2
      products.inert = visualIn < .85 || productsOut > .15
      faq.inert = faqIn < .85 || faqOut > .15
      cta.inert = ctaIn < .85
      footer.inert = footerIn < .85
    }
    const scheduleUpdate = () => {
      if (animationFrame === undefined) animationFrame = requestAnimationFrame(update)
    }
    const configure = () => {
      story.classList.toggle('story-stage--active', media.matches)
      if (media.matches) {
        story.style.setProperty('--story-height', `${frame.clientHeight}px`)
        scheduleUpdate()
      } else {
        hero.inert = false
        clients.inert = false
        products.inert = false
        faq.inert = false
        cta.inert = false
        footer.inert = false
      }
    }
    const resizeObserver = new ResizeObserver(configure)
    resizeObserver.observe(frame)
    media.addEventListener('change', configure)
    frame.addEventListener('scroll', scheduleUpdate, { passive: true })
    configure()
    return () => {
      resizeObserver.disconnect()
      media.removeEventListener('change', configure)
      frame.removeEventListener('scroll', scheduleUpdate)
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
    }
  }, [isDemoPage])
  return <>
    <Navbar onDiagnosticClick={openDiagnostic} />
    <div className="page-frame" ref={frameRef} tabIndex={0} aria-label="Contenido de la página">
      {isDemoPage ? <><DemoPage path={hash} /><Footer onDiagnosticClick={openDiagnostic} /></> : <main><div className="story-stage" ref={storyRef}><div className="story-stage__viewport"><Hero onDiagnosticClick={openDiagnostic} /><ClientsMarquee /><ProductsCarousel /><FAQSection /><CTAFinal onDiagnosticClick={openDiagnostic} /><Footer onDiagnosticClick={openDiagnostic} /></div></div></main>}
    </div>
    {DEMO_MODE && <span className="demo-badge">Modo demostración</span>}
    {DEMO_MODE ? isDiagnosticOpen && <DemoDiagnosticDialog onClose={closeDiagnostic} /> : <DiagnosticDialog isOpen={isDiagnosticOpen} onClose={closeDiagnostic} />}
  </>
}
