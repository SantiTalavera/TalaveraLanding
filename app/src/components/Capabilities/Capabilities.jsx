import './Capabilities.css'

export default function Capabilities({ showPortfolio }) {
  return <section id="capacidades" className="capabilities" aria-labelledby="capabilities-title">
    <div className="capabilities__content">
      <h2 id="capabilities-title">Capacidades</h2>
      <div className="capabilities__grid">
        <article id="optimizacion-operativa"><h3>Optimizar lo existente</h3><p>Identificar oportunidades de mejora y rediseñar procesos, flujos de información y mecanismos de decisión para mejorar el desempeño de una operación.</p></article>
        <article id="ingenieria-tecnologia"><h3>Construir nuevas capacidades</h3><p>Diseñar, desarrollar e implementar sistemas y productos tecnológicos adaptados a las necesidades específicas del negocio.</p></article>
        <article id="desarrollo-estrategico"><h3>Desarrollar oportunidades</h3><p>Evaluar la viabilidad de nuevas iniciativas y explorar oportunidades de negocio y colaboración donde la ingeniería pueda aportar valor.</p></article>
      </div>
      {showPortfolio && <a className="capabilities__link" href="#productos">Explorar portfolio →</a>}
    </div>
  </section>
}
