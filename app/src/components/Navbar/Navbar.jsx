import { useState } from 'react'
import './Navbar.css'
import logoBlanco from '../../assets/logoBlanco.svg'

const NAV_LINKS = [
  { label: 'Sistema', href: '#sistema' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Método', href: '#metodo' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav id="main-nav" className={`navbar ${menuOpen ? 'navbar--open' : ''}`}>
      {/* Logo */}
      <div className="navbar__logo">
        <img src={logoBlanco} alt="TALAVERA" className="navbar__logo-img" />
      </div>

      {/* Desktop links */}
      <div className="navbar__links">
        {NAV_LINKS.map((link) => (
          <a key={link.label} className="navbar__link" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      {/* Desktop CTA */}
      <a id="nav-cta" className="navbar__cta navbar__cta--desktop" href="#contacto">
        Diagnóstico estratégico
      </a>

      {/* Hamburger button (mobile) */}
      <button
        id="nav-hamburger"
        className="navbar__hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Abrir menú"
        aria-expanded={menuOpen}
      >
        <span className="navbar__bar" />
        <span className="navbar__bar" />
        <span className="navbar__bar" />
      </button>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            className="navbar__drawer-link"
            href={link.href}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <a
          className="navbar__cta navbar__cta--mobile"
          href="#contacto"
          onClick={closeMenu}
        >
          Diagnóstico estratégico
        </a>
      </div>
    </nav>
  )
}
