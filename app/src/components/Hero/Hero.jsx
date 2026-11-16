import HeroVisual from './HeroVisual'
import './Hero.css'

export default function Hero({ onDiagnosticClick }) {
  return <section id="inicio" className="hero">
    <HeroVisual />
    <h1>Sistemas para operaciones complejas en real estate.</h1>
    <p>Diseño e implemento sistemas que aportan estructura, control y trazabilidad a operaciones inmobiliarias de alto valor.</p>
    <button className="button" onClick={onDiagnosticClick}>Diagnóstico estratégico</button>
  </section>
}
