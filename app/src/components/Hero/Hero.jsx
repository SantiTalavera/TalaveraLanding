import './Hero.css'
import HeroClients from './HeroClients'

export default function Hero({ onDiagnosticClick }) {
  return <section id="inicio" className="hero">
    <div className="hero__photograph" aria-hidden="true">
      <div className="hero__sky"><span /><span /></div>
    </div>
    <div className="hero__heading">
      <h1>Ingeniería de sistemas para el negocio inmobiliario.</h1>
    </div>
    <div className="hero__bottom">
      <div className="hero__intro">
        <p>Mejores decisiones, operaciones mejor estructuradas y nuevas capacidades para el desarrollo de negocios inmobiliarios.</p>
        <button className="button" onClick={onDiagnosticClick}>Iniciar conversación<span aria-hidden="true">↗</span></button>
      </div>
    </div>
    <HeroClients />
  </section>
}
