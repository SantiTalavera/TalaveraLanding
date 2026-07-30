import './Diagnostico.css'

const PAIN_POINTS = [
  'manejás información en Excel',
  'coordinás procesos por WhatsApp',
  'tomás decisiones sin historial claro',
  'dependés de personas clave para que todo funcione',
]

export default function Diagnostico() {
  return (
    <section id="diagnostico" className="diagnostico section-padding">
      <div className="diagnostico__left">
        <h2 className="diagnostico__label">El diagnóstico</h2>
        <h3 className="diagnostico__title">El problema no es la herramienta.</h3>
      </div>

      <div className="diagnostico__right">
        <p className="diagnostico__statement">
          Es la forma en la que está organizada la operación.
        </p>

        <div className="diagnostico__block">
          <p className="diagnostico__block-title">Si hoy:</p>
          <ul className="diagnostico__list">
            {PAIN_POINTS.map((item) => (
              <li key={item} className="diagnostico__list-item">
                — {item}
              </li>
            ))}
          </ul>
          <p className="diagnostico__observation">
            Esto no es solo desorden. Es pérdida de control sobre la operación.
            Todo esto escala mal. Y cuanto más crece la operación, peor funciona.
          </p>
        </div>
      </div>
    </section>
  )
}
