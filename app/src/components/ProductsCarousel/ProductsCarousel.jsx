import { useEffect, useRef, useState } from 'react'
import { CONTACT_AVAILABLE } from '../../data/config'
import { visiblePortfolio } from '../../data/content'
import { isSafeDestination } from '../../data/policy'
import './ProductsCarousel.css'
import DevicePreview from './DevicePreview'

function selectedIndex(available) {
    const id = window.location.hash.startsWith('#portfolio/') ? window.location.hash.slice('#portfolio/'.length) : ''
    return Math.max(0, available.findIndex((entry) => entry.id === id))
}

export default function ProductsCarousel({ onDiagnosticClick }) {
  const available = visiblePortfolio
  const [index, setIndex] = useState(() => selectedIndex(available))
  const touchStart = useRef(null)
  useEffect(() => {
    const selectFromHash = () => setIndex(selectedIndex(available))
    window.addEventListener('hashchange', selectFromHash)
    return () => window.removeEventListener('hashchange', selectFromHash)
  }, [available])
  if (!available.length) return null
  const item = available[index]
  const comingSoon = item.comingSoon === true || item.landingEnabled !== true
  const move = (step) => setIndex((current) => (current + step + available.length) % available.length)
  const onKeyDown = (event) => {
    if (available.length < 2) return
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
  }
  return <section id="productos" className="products" aria-labelledby="products-heading">
    <div className="products__top"><div><h2 id="products-heading">Productos y proyectos</h2><p>Distintas aplicaciones de la ingeniería al negocio inmobiliario.</p></div></div>
    <div className="products__slide" role="region" aria-roledescription="carrusel" aria-label="Productos y proyectos" tabIndex={available.length > 1 ? 0 : undefined} onKeyDown={onKeyDown} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => { if (touchStart.current !== null && available.length > 1) { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1) } touchStart.current = null }}>
      <div className="products__copy" key={item.id} aria-live="polite"><p className="products__name">{item.name}{item.status === 'proyectado' && ' / Proyectado'}</p><div className="products__meta">{comingSoon && <span className="products__status">Próximamente</span>}<p className="products__eyebrow">{item.category}</p></div><h3>{item.headline}</h3><p className="products__description">{item.description}</p>{item.landingEnabled === true && isSafeDestination(item.landingUrl) ? <a className="products__link" href={item.landingUrl}>{item.ctaLabel} <span aria-hidden="true">↗</span></a> : CONTACT_AVAILABLE && <button type="button" className="products__link" onClick={() => onDiagnosticClick({ source: 'portfolio', reason: 'Producto o proyecto', initiativeId: item.id })}>{item.status === 'proyectado' ? 'Consultar por el producto' : 'Consultar por el proyecto'} <span aria-hidden="true">↗</span></button>}</div>
      <div className="products__visual"><DevicePreview key={item.id} item={item} />
    {available.length > 1 && <div className="products__controls" aria-label="Navegación de iniciativas"><button aria-label="Iniciativa anterior" onClick={() => move(-1)}>←</button><button aria-label="Iniciativa siguiente" onClick={() => move(1)}>→</button></div>}
      </div>
    </div>
  </section>
}
