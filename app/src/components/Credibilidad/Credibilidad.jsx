import './Credibilidad.css'

const CREDIBILITY_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCGwordVfo7nzjDT_NwvS019x8r3ywjrdTy37M0IgOEXfqnLfypiQ4DOOfzqi6MxOMUteNe2xKe8vSugAhbc4fvBvDdKNS2CdWCwbTesORC-Rrwiiw35TbF8FUgzrzkOsodjvnzByxcdX6-sTMsx2enRS0C6KXqkLleINoxIsjuXcm3WL_-xyB3RjBxuRjwkz82DIWps9jvULmK4uQy3SJ3NTk524k_Y41-nXtFaK_Yv4jqOlIfkVRraHcmxbC_HjpJwv0IfzdIfICi'

export default function Credibilidad() {
  return (
    <section id="credibilidad" className="credibilidad section-padding">
      <div className="credibilidad__container">
        <div className="credibilidad__image-wrapper">
          <img
            src={CREDIBILITY_IMG}
            alt="Arquitectura"
            className="credibilidad__image"
          />
        </div>

        <div className="credibilidad__text">
          <p className="credibilidad__quote">
            "No trabajo sobre supuestos. Trabajo sobre problemas reales que hoy
            se resuelven con Excel, WhatsApp y procesos desordenados,
            especialmente en entornos donde la operación impacta directamente en
            dinero, decisiones y conflictos."
          </p>
          <p className="credibilidad__emphasis">
            El enfoque no es agregar software. Es construir sistema.
          </p>
        </div>
      </div>
    </section>
  )
}
