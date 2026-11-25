import logoBlanco from '../../assets/logoBlanco.svg'
import { socialLinks, portfolio } from '../../data/content'
import { DEMO_MODE } from '../../data/config'
import './Footer.css'
export default function Footer({ onDiagnosticClick }) {
  const hasPortfolio = portfolio.some((item) => item.visibility === 'public' || (DEMO_MODE && item.visibility === 'demo'))
  const sections = { Capacidades: [{ label: 'Optimización operativa', href: '#optimizacion-operativa' }, { label: 'Ingeniería y tecnología', href: '#ingenieria-tecnologia' }, { label: 'Desarrollo estratégico', href: '#desarrollo-estrategico' }], ...(hasPortfolio ? { Portfolio: [{ label: 'Productos y proyectos', href: '#productos' }] } : {}), Firma: [{ label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' }] }
  return <footer className="footer" role="contentinfo"><div className="footer__layout"><div className="footer__brand"><img src={logoBlanco} alt="TALAVERA" /><p className="footer__descriptor">Real Estate Systems</p><p>Ingeniería aplicada al negocio inmobiliario.</p></div><div className="footer__right"><nav className="footer__columns" aria-label="Navegación del pie de página">{Object.entries(sections).map(([title, links]) => <div key={title}><h2>{title}</h2>{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}{title === 'Firma' && <button onClick={onDiagnosticClick}>Contacto</button>}</div>)}</nav>{socialLinks.length > 0 && <div className="footer__social">{socialLinks.map((link) => <a key={link.href} href={link.href} >{link.label}</a>)}</div>}</div></div><div className="footer__bottom">© {new Date().getFullYear()} TALAVERA. Todos los derechos reservados. <span>Real Estate Systems</span></div></footer>
}
