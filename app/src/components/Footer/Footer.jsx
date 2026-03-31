import './Footer.css'
import logoBlanco from '../../assets/logoBlanco.svg'

const FOOTER_LINKS = [
  { label: 'Sitemap', href: '#' },
  { label: 'Privacidad', href: '#' },
  { label: 'Legal', href: '#' },
]

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <img src={logoBlanco} alt="TALAVERA" className="footer__logo-img" />
          <p className="footer__description">
            Consultoría de sistemas y optimización de procesos operativos para
            real estate.
          </p>
        </div>

        <div className="footer__right">
          <div className="footer__links">
            {FOOTER_LINKS.map((link) => (
              <a key={link.label} className="footer__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <p className="footer__copyright">
            © 2024 TALAVERA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
