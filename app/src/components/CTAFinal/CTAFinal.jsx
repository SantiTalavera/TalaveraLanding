import './CTAFinal.css'
export default function CTAFinal({ onDiagnosticClick }) {
  return <section className="cta-final"><div><p className="section-label">Una conversación para avanzar</p><h2>La próxima mejora de tu operación comienza con una decisión.</h2><p>Analicemos tu operación y las oportunidades de mejorar su estructura, trazabilidad y capacidad de crecimiento.</p><button className="button" onClick={onDiagnosticClick}>Diagnóstico estratégico</button></div></section>
}
