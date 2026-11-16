import logoBlanco from '../../assets/logoBlanco.svg'
import { footerLinks, socialLinks, products } from '../../data/content'
import './Footer.css'
export default function Footer({ onDiagnosticClick }) {
  const sections = { ...footerLinks, Productos: products.filter((item) => item.status === 'active' && item.landingUrl).map((item) => ({ label: item.name, href: item.landingUrl })) }
  return <footer className="footer"><div className="footer__layout"><div className="footer__brand"><img src={logoBlanco} alt="TALAVERA" /><p className="footer__descriptor">Real Estate Systems</p><p>Sistemas para aportar estructura y claridad a operaciones complejas en real estate.</p></div><div className="footer__right"><nav className="footer__columns" aria-label="Navegación del pie de página">{Object.entries(sections).map(([title, links]) => <div key={title}><h2>{title}</h2>{links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}{title === 'Soporte' && <button onClick={onDiagnosticClick}>Contacto</button>}</div>)}</nav>{socialLinks.length > 0 && <div className="footer__social">{socialLinks.map((link) => <a key={link.href} href={link.href} >{link.label}</a>)}</div>}</div></div><div className="footer__bottom">© {new Date().getFullYear()} TALAVERA. Todos los derechos reservados. <span>Real Estate Systems</span></div></footer>
}
