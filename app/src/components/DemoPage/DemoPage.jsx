import { clients, products, portfolio } from '../../data/content'
import './DemoPage.css'

const titles = {
  soluciones: 'Soluciones', recursos: 'Recursos', soporte: 'Soporte',
  legales: 'Información legal', terminos: 'Términos y condiciones', privacidad: 'Política de privacidad',
  publicaciones: 'Publicaciones', perspectivas: 'Perspectivas', centro: 'Centro de soporte',
  redes: 'Redes sociales', linkedin: 'LinkedIn', instagram: 'Instagram',
}
export default function DemoPage({ path }) {
  const parts = path.replace(/^#demo\/?/, '').split('/').filter(Boolean)
  const last = parts.at(-1)
  const product = [...portfolio, ...products].find((item) => item.slug === last || item.id === last)
  const client = clients.find((item) => item.id === last)
  const title = product?.name || client?.name || titles[last] || 'Vista de demostración'
  return <main className="demo-page"><div className="demo-page__inner"><p className="section-label">TALAVERA / Modo demostración</p><h1>{title}</h1><p>{product?.description || 'Esta vista representa un destino provisional del prototipo. Su contenido y su dirección se definirán antes del lanzamiento.'}</p>{product?.image && <img src={product.image} alt={product.imageAlt || "Representación visual demostrativa del producto"} />}<a className="demo-page__back" href="#inicio">← Volver a la página principal</a></div></main>
}
