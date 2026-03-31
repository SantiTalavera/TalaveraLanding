import './Principios.css'

const PRINCIPLES = [
  'Sin trazabilidad no hay control.',
  'Sin sistema hay conflicto.',
  'El software debe simplificar, no complicar.',
  'La implementación define el resultado.',
  'Ordenar la operación impacta en el negocio.',
]

export default function Principios() {
  return (
    <section id="metodo" className="principios section-padding">
      <div className="principios__label-col">
        <h2 className="principios__label">Principios</h2>
      </div>

      <div className="principios__content">
        <div className="principios__list">
          {PRINCIPLES.map((principle) => (
            <div key={principle} className="principios__item">
              <p className="principios__text">{principle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
