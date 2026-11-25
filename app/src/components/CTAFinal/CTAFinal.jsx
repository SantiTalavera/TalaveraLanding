import './CTAFinal.css'
export default function CTAFinal({ onDiagnosticClick }) {
  return <section className="cta-final"><div><p className="section-label">Una conversación para avanzar</p><h2>¿Qué querés resolver o desarrollar?</h2><p>Compartí una necesidad de tu negocio, consultá por un producto o proyecto, o planteá una oportunidad de colaboración.</p><button className="button" onClick={onDiagnosticClick}>Iniciar conversación</button></div></section>
}
