import { useEffect, useId } from 'react'
import workspace from '../../assets/photography/systems-workspace-wide.jpg'
import './Capabilities.css'

export default function Capabilities({ showPortfolio }) {
  const visualId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  useEffect(() => {
    const image = new Image()
    image.src = workspace
    // Decode before the first scroll transition rather than during its fade-in.
    image.decode().catch(() => {})
  }, [])
  return <section id="capacidades" className="capabilities" aria-labelledby="capabilities-title">
    <div className="capabilities__photograph" aria-hidden="true">
      <svg className="capabilities__workspace" viewBox="0 0 1774 887" preserveAspectRatio="xMaxYMid slice" focusable="false">
        <defs>
          <clipPath id={`${visualId}-terminal`}><path d="M1296 591 1674 584 1676 654 1225 660Z" /></clipPath>
        </defs>
        <g className="capabilities__terminal" clipPath={`url(#${visualId}-terminal)`}>
          <path className="capabilities__terminal-cursor" d="M1381 650l2.5-.05-.6 3.5-2.5 .05Z" fill="#d9e7e4" />
        </g>
      </svg>
      <div className="capabilities__window-clouds"><span className="capabilities__cloud-layer" /><span className="capabilities__cloud-layer" /></div>
    </div>
    <div className="capabilities__content">
      <h2 id="capabilities-title">Capacidades</h2>
      <div className="capabilities__grid">
        <article id="optimizacion-operativa" tabIndex={-1}><h3>Optimizar lo existente</h3><p>Identificar oportunidades de mejora y rediseñar procesos, flujos de información y mecanismos de decisión para mejorar el desempeño de una operación.</p></article>
        <article id="ingenieria-tecnologia" tabIndex={-1}><h3>Construir nuevas capacidades</h3><p>Diseñar, desarrollar e implementar sistemas y productos tecnológicos adaptados a las necesidades específicas del negocio.</p></article>
        <article id="desarrollo-estrategico" tabIndex={-1}><h3>Desarrollar oportunidades</h3><p>Evaluar la viabilidad de nuevas iniciativas y explorar oportunidades de negocio y colaboración donde la ingeniería pueda aportar valor.</p></article>
      </div>
      {showPortfolio && <a className="capabilities__link" href="#productos">Explorar portfolio →</a>}
    </div>
  </section>
}
