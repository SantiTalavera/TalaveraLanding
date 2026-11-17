import { useRef, useState } from 'react'
import { DEMO_MODE } from '../../data/config'
import { portfolio } from '../../data/content'
import './ProductsCarousel.css'

export default function ProductsCarousel() {
  const available = portfolio.filter((item) => item.visibility === 'public' || (DEMO_MODE && item.visibility === 'demo'))
  const [index, setIndex] = useState(0)
  const touchStart = useRef(null)
  if (!available.length) return null
  const item = available[index]
  const move = (step) => setIndex((current) => (current + step + available.length) % available.length)
  const onKeyDown = (event) => {
    if (available.length < 2) return
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
  }
  return <section id="productos" className="products" aria-labelledby="products-heading">
    <div className="products__top"><div><h2 id="products-heading">Sistemas y proyectos</h2><p>Tecnología aplicada a operaciones reales del sector inmobiliario.</p></div><span>{String(index + 1).padStart(2, '0')} / {String(available.length).padStart(2, '0')}</span></div>
    <div className="products__slide" role="region" aria-roledescription="carrusel" aria-label="Sistemas y proyectos" tabIndex={available.length > 1 ? 0 : undefined} onKeyDown={onKeyDown} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => { if (touchStart.current !== null && available.length > 1) { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1) } touchStart.current = null }}>
      <div className="products__copy" key={item.id} aria-live="polite"><p className="products__eyebrow">{item.category}</p><p className="products__name">{item.name}{item.status === 'proyectado' && ' / Proyectado'}</p><h3>{item.headline}</h3><p className="products__description">{item.description}</p>{item.landingUrl && <a className="products__link" href={item.landingUrl}>{item.ctaLabel} <span aria-hidden="true">↗</span></a>}</div>
      <div className="products__visual" key={item.id + '-visual'}>{item.image && <img src={item.image} alt={item.imageAlt} />}</div>
    </div>
    {available.length > 1 && <div className="products__controls" aria-label="Navegación de iniciativas"><button aria-label="Iniciativa anterior" onClick={() => move(-1)}>←</button><div>{available.map((entry, i) => <button key={entry.id} className={`products__dot ${i === index ? 'products__dot--active' : ''}`} aria-label={`Ir a ${entry.name}`} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)} />)}</div><button aria-label="Iniciativa siguiente" onClick={() => move(1)}>→</button></div>}
  </section>
}
