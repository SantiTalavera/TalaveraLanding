import './Soluciones.css'

const CARDS = [
  {
    id: 'hoas',
    title: 'HOAs / Clubes de campo',
    description:
      'Ordena la comercialización, elimina conflictos en reservas y da trazabilidad completa sobre cada decisión dentro del sistema. Permite operar con claridad, reducir conflictos internos y tomar decisiones con información real.',
    cta: 'Ver sistema',
    active: true,
  },
  {
    id: 'desarrollos',
    title: 'Desarrollos inmobiliarios',
    description:
      'Control y estructura en la gestión de unidades y decisiones estratégicas.',
    cta: 'Próximamente',
    active: false,
    opacity: 'medium',
  },
  {
    id: 'administracion',
    title: 'Administración / operación',
    description:
      'Sistemas integrados para operar equipos masivos con claridad y control absoluto.',
    cta: 'Próximamente',
    active: false,
    opacity: 'low',
  },
]

export default function Soluciones() {
  return (
    <section id="soluciones" className="soluciones section-padding">
      <div className="soluciones__header">
        <div className="soluciones__header-text">
          <h2 className="soluciones__label">Soluciones</h2>
          <p className="soluciones__subtitle">
            Arquitectura aplicada a segmentos específicos.
          </p>
        </div>
      </div>

      <div className="soluciones__grid">
        {CARDS.map((card) => (
          <div
            key={card.id}
            id={`solution-${card.id}`}
            className={`soluciones__card ${
              !card.active ? `soluciones__card--${card.opacity}` : ''
            }`}
          >
            <div>
              <h4
                className={`soluciones__card-title ${
                  !card.active ? `soluciones__card-title--dimmed` : ''
                }`}
              >
                {card.title}
              </h4>
              <p
                className={`soluciones__card-desc ${
                  !card.active ? `soluciones__card-desc--dimmed` : ''
                }`}
              >
                {card.description}
              </p>
            </div>

            {card.active ? (
              <button className="soluciones__card-cta">
                {card.cta}
                <span className="soluciones__card-line" />
              </button>
            ) : (
              <span className="soluciones__card-soon">{card.cta}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
