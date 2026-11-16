import { useState } from 'react'
import { navigation } from '../../data/content'
import logoBlanco from '../../assets/logoBlanco.svg'
import './Navbar.css'

export default function Navbar({ onDiagnosticClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = navigation.filter((item) => item.href)
  return (
    <header className="navbar">
      <a className="navbar__logo" href="#inicio" aria-label="TALAVERA, inicio"><img src={logoBlanco} alt="TALAVERA" /></a>
      <nav className="navbar__links" aria-label="Navegación principal">
        {navigation.map((item) => item.href ? <a key={item.label} href={item.href}>{item.label}</a> : <span key={item.label} className="navbar__unavailable">{item.label}</span>)}
      </nav>
      <button className="button button--header" onClick={onDiagnosticClick}>Diagnóstico estratégico</button>
      <button className="navbar__toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Cerrar' : 'Menú'}</button>
      {menuOpen && <nav id="mobile-menu" className="navbar__mobile" aria-label="Navegación móvil">
        {links.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        {navigation.filter((item) => !item.href).map((item) => <span className="navbar__unavailable" key={item.label}>{item.label}</span>)}
        <button className="button" onClick={() => { setMenuOpen(false); onDiagnosticClick() }}>Diagnóstico estratégico</button>
      </nav>}
    </header>
  )
}
