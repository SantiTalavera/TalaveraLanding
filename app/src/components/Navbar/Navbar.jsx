import { useEffect, useRef, useState } from 'react'
import { portfolio } from '../../data/content'
import { DEMO_MODE } from '../../data/config'
import logoBlanco from '../../assets/logoBlanco.svg'
import './Navbar.css'

export default function Navbar({ onDiagnosticClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState(null)
  const [darkMode, setDarkMode] = useState(() => document.documentElement.dataset.theme === 'dark')
  const headerRef = useRef(null)
  const hasPortfolio = portfolio.some((item) => item.visibility === 'public' || (DEMO_MODE && item.visibility === 'demo'))
  const categories = [
    { label: 'Capacidades', entries: [{ label: 'Optimización operativa', href: '#optimizacion-operativa' }, { label: 'Ingeniería y tecnología', href: '#ingenieria-tecnologia' }, { label: 'Desarrollo estratégico', href: '#desarrollo-estrategico' }] },
    ...(hasPortfolio ? [{ label: 'Portfolio', entries: [{ label: 'Explorar portfolio', href: '#productos' }] }] : []),
    { label: 'Firma', entries: [{ label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' }, { label: 'Contacto', action: 'diagnostic' }] },
  ]

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) { setOpenCategory(null); setMenuOpen(false) }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && (openCategory || menuOpen)) {
        event.preventDefault()
        if (openCategory) {
          headerRef.current?.querySelector(`[data-category="${openCategory}"]`)?.focus()
          setOpenCategory(null)
        } else {
          setMenuOpen(false)
          headerRef.current?.querySelector('.navbar__toggle')?.focus()
        }
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => { document.removeEventListener('pointerdown', handlePointerDown); document.removeEventListener('keydown', handleKeyDown) }
  }, [openCategory, menuOpen])

  const closeMenus = () => { setOpenCategory(null); setMenuOpen(false) }
  const openDiagnostic = () => { closeMenus(); onDiagnosticClick() }
  const themeToggle = <button className="navbar__theme" type="button" aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'} title={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'} onClick={() => setDarkMode((current) => !current)}><span aria-hidden="true">{darkMode ? '☀' : '☾'}</span></button>
  const renderCategories = (location) => categories.map((category) => {
    const isOpen = openCategory === `${location}-${category.label}`
    const id = `navbar-${location}-${category.label.toLowerCase()}`
    return <div className="navbar__category" key={category.label}>
      <button className="navbar__category-toggle" type="button" data-category={`${location}-${category.label}`} aria-expanded={isOpen} aria-controls={id} onMouseEnter={() => { if (location === 'desktop' && window.matchMedia('(hover: hover)').matches) setOpenCategory(`${location}-${category.label}`) }} onClick={(event) => { if (location === 'desktop' && event.detail !== 0 && window.matchMedia('(hover: hover)').matches) return; setOpenCategory(isOpen ? null : `${location}-${category.label}`) }}>
        {category.label}<span className="navbar__chevron" aria-hidden="true" />
      </button>
      {isOpen && <div className="navbar__dropdown" id={id}>
        {category.entries.map((entry) => entry.href
          ? <a key={entry.label} href={entry.href} onClick={closeMenus}>{entry.label}</a>
          : entry.action === 'diagnostic'
            ? <button key={entry.label} type="button" onClick={openDiagnostic}>{entry.label}</button>
            : <span className="navbar__dropdown-unavailable" key={entry.label}>{entry.label}</span>)}
        {category.entries.length === 0 && <span className="navbar__dropdown-unavailable">Próximamente</span>}
      </div>}
    </div>
  })

  return (
    <header className="navbar" ref={headerRef} onMouseLeave={() => setOpenCategory((current) => current?.startsWith('desktop-') ? null : current)}>
      <a className="navbar__logo" href="#inicio" aria-label="TALAVERA, inicio" onClick={closeMenus}><img src={logoBlanco} alt="TALAVERA" /></a>
      <nav className="navbar__links" aria-label="Navegación principal">{renderCategories('desktop')}</nav>
      <div className="navbar__actions">{themeToggle}<button className="button button--header" onClick={openDiagnostic}>Iniciar conversación</button></div>
      <button className="navbar__toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => { setMenuOpen(!menuOpen); setOpenCategory(null) }}>{menuOpen ? 'Cerrar' : 'Menú'}</button>
      {menuOpen && <nav id="mobile-menu" className="navbar__mobile" aria-label="Navegación móvil">
        {renderCategories('mobile')}
        <div className="navbar__mobile-actions">{themeToggle}<button className="button" onClick={openDiagnostic}>Iniciar conversación</button></div>
      </nav>}
    </header>
  )
}
