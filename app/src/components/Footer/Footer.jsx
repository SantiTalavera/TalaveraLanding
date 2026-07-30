import './Footer.css'
import logoBlanco from '../../assets/logoBlanco.svg'

const FOOTER_LINKS = [
  { label: 'Sistema', href: '#sistema' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Método', href: '#metodo' },
]

export default function Footer({ onDiagnosticClick }) {
  return (
    <footer id="footer" className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <img src={logoBlanco} alt="TALAVERA" className="footer__logo-img" />
          <p className="footer__descriptor">Real Estate Systems</p>
          <p className="footer__statement">
            Sistemas para operaciones complejas en real estate.
          </p>
        </div>

        <nav className="footer__navigation" aria-label="Navegación del pie de página">
          <p className="footer__heading">Navegación</p>
          <div className="footer__links">
            {FOOTER_LINKS.map((link) => (
              <a key={link.label} className="footer__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="footer__contact">
          <p className="footer__heading">Contacto</p>
          <p className="footer__contact-copy">
            Si la operación ya necesita más estructura, conversemos.
          </p>
          <button
            className="footer__cta"
            type="button"
            onClick={onDiagnosticClick}
          >
            Diagnóstico estratégico
          </button>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2026 TALAVERA. Todos los derechos reservados.</p>
        <p>Real Estate Systems</p>
      </div>
    </footer>
  )
}
