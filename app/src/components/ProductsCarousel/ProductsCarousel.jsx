import { useRef, useState } from 'react'
import { products } from '../../data/content'
import './ProductsCarousel.css'

export default function ProductsCarousel() {
  const available = products.filter((product) => product.status === 'active')
  const [index, setIndex] = useState(0)
  const touchStart = useRef(null)
  if (!available.length) return null
  const product = available[index]
  const move = (step) => setIndex((current) => (current + step + available.length) % available.length)
  const onKeyDown = (event) => {
    if (available.length < 2) return
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
  }
  return <section id="productos" className="products" aria-labelledby="products-heading">
    <div className="products__top"><h2 id="products-heading" className="section-label">Productos</h2><span>{String(index + 1).padStart(2, '0')} / {String(available.length).padStart(2, '0')}</span></div>
    <div className="products__slide" role="region" aria-roledescription="carrusel" aria-label="Productos" tabIndex={available.length > 1 ? 0 : undefined} onKeyDown={onKeyDown} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => { if (touchStart.current !== null && available.length > 1) { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 50) move(delta < 0 ? 1 : -1) } touchStart.current = null }}>
      <div className="products__copy" aria-live="polite"><p className="products__eyebrow">{product.category || 'Sistema modular'}</p><h3>{product.name}</h3><p className="products__description">{product.description}</p>{product.landingUrl && <a className="products__link" href={product.landingUrl}>Ver más <span aria-hidden="true">↗</span></a>}</div>
      <div className="products__visual" aria-hidden="true">{product.image ? <img src={product.image} alt="" /> : <div className="products__mark"><span>Talavera</span><strong>HOA</strong><span>Real Estate Systems</span></div>}</div>
    </div>
    {available.length > 1 && <div className="products__controls" aria-label="Navegación de productos"><button aria-label="Producto anterior" onClick={() => move(-1)}>←</button><div>{available.map((item, i) => <button key={item.id} className={`products__dot ${i === index ? 'products__dot--active' : ''}`} aria-label={`Ir a ${item.name}`} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)} />)}</div><button aria-label="Producto siguiente" onClick={() => move(1)}>→</button></div>}
  </section>
}
