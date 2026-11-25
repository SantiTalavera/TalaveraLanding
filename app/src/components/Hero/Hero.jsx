import HeroVisual from './HeroVisual'
import './Hero.css'

export default function Hero({ onDiagnosticClick }) {
  return <section id="inicio" className="hero">
    <HeroVisual />
    <h1>Ingeniería de sistemas para el negocio inmobiliario.</h1>
    <p>Mejores decisiones, operaciones mejor estructuradas y nuevas capacidades para el desarrollo de negocios inmobiliarios.</p>
    <button className="button" onClick={onDiagnosticClick}>Iniciar conversación</button>
  </section>
}
