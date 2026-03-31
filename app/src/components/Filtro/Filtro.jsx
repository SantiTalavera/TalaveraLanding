import './Filtro.css'

const CRITERIA = [
  'hay múltiples actores tomando decisiones',
  'la operación impacta en dinero y conflictos',
  'el desorden ya empezó a ser un problema real',
]

export default function Filtro() {
  return (
    <section id="filtro" className="filtro section-padding">
      <div className="filtro__container">
        <p className="filtro__eyebrow">
          Este tipo de problema aparece en operaciones que ya alcanzaron cierto
          nivel de complejidad.
        </p>
        <h3 className="filtro__title">No es para todos.</h3>

        <div className="filtro__body">
          <p className="filtro__intro">
            Trabajo con organizaciones donde:
          </p>

          <ul className="filtro__list">
            {CRITERIA.map((item) => (
              <li key={item} className="filtro__list-item">
                <span className="filtro__dash">—</span>
                <p className="filtro__list-text">{item}</p>
              </li>
            ))}
          </ul>

          <p className="filtro__disclaimer">
            Si ese no es el caso, esto probablemente no sea necesario.
          </p>
        </div>
      </div>
    </section>
  )
}
