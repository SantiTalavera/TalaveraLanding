import './Hero.css'

const HERO_BG_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA14E0-OOHcL1XoiuRzDZgs8tOjDe6SaOhWwjGpo-4OwnN8wGecJbZSSfbxOEq7cDBD0TgIU53_w5K3cNJHwH1MctQLT7tp6-76kYw8C1EVtfkw5tKAXPOsppSzNyAwfoRlypGWbkGwYzy3KqIDT2KqBkZ8LC0NwYEF7R5FXtfk-hL3Wa8MCfG44KJ9yKAy4foFTkLn5p8QMZhj0iKpHIxcXKbwSeHkLUNZC1rSNtPlwKMHUQ3i-P5C01inLVAPZ7rcXnXh6OSqPQI7'

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Background Image */}
      <div className="hero__bg">
        <img
          src={HERO_BG_URL}
          alt="Abstract architectural lines"
          className="hero__bg-img"
        />
      </div>

      {/* Content */}
      <div className="hero__content">
        <p className="hero__label">Sistemas de Operación</p>

        <h1 className="hero__title">
          Sistemas para ordenar operaciones complejas en real estate.
        </h1>

        <p className="hero__subtitle">
          Diseño e implemento estructuras con trazabilidad, control y claridad
          para organizaciones donde Excel y WhatsApp ya no alcanzan,
          especialmente en operaciones con múltiples actores, decisiones y flujo
          de información crítico.
          <br /><br />
          <span className="hero__subtitle-emphasis">
            Cuando esto no está resuelto, aparecen conflictos, pérdida de
            control y decisiones que impactan directamente en el negocio.
          </span>
        </p>

        <div className="hero__actions">
          <a id="hero-cta-primary" className="hero__btn-primary" href="#soluciones">
            Ver soluciones
          </a>
          <a id="hero-cta-secondary" className="hero__btn-tertiary" href="#metodo">
            Ver cómo funciona
          </a>
        </div>
      </div>

    </section>
  )
}
