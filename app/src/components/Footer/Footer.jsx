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
        </div>

        <div className="footer__right">
          <div className="footer__links">
            {FOOTER_LINKS.map((link) => (
              <a key={link.label} className="footer__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <button
            className="footer__cta"
            type="button"
            onClick={onDiagnosticClick}
          >
            Diagnóstico estratégico
          </button>
          <p className="footer__copyright">
            © 2026 TALAVERA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
