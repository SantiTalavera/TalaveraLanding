import './CTAFinal.css'

export default function CTAFinal() {
  return (
    <section id="contacto" className="cta-final">
      <div className="cta-final__container">
        <p className="cta-final__eyebrow">
          Esto no se resuelve con otra herramienta. Se resuelve diseñando el
          sistema correcto.
        </p>

        <h2 className="cta-final__title">
          Si tu operación depende de herramientas sueltas, el problema no es
          menor. Probablemente ya lo estés sintiendo en tiempo, decisiones o
          conflictos.
        </h2>

        <div className="cta-final__actions">
          <button id="cta-explore" className="cta-final__btn-primary">
            Explorar solución HOAs
          </button>
          <button id="cta-diagnostic" className="cta-final__btn-secondary">
            Solicitar diagnóstico
          </button>
        </div>
      </div>
    </section>
  )
}
