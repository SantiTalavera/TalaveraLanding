import './Proposito.css'

const PILLARS = [
  { num: '01', label: 'Estructuran procesos' },
  { num: '02', label: 'Registran decisiones' },
  { num: '03', label: 'Eliminan fricción' },
  { num: '04', label: 'Permiten escalar' },
]

export default function Proposito() {
  return (
    <section id="sistema" className="proposito section-padding">
      <div className="proposito__container">
        <p className="proposito__eyebrow">Propósito</p>
        <p className="proposito__sub-eyebrow">
          Este tipo de problema aparece en operaciones que ya alcanzaron cierto
          nivel de complejidad.
        </p>
        <h3 className="proposito__title">Diseño sistemas que:</h3>

        <div className="proposito__grid">
          {PILLARS.map((pillar) => (
            <div key={pillar.num} className="proposito__pillar">
              <p className="proposito__num">{pillar.num}</p>
              <h4 className="proposito__pillar-label">{pillar.label}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
