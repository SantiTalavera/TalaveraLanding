import { useState } from 'react'
import { clients } from '../../data/content'
import './ClientsMarquee.css'

export default function ClientsMarquee() {
  const [paused, setPaused] = useState(false)
  const available = clients.filter((client) => client.logo && client.url)
  if (!available.length) return null

  // Distribute each organization once; repeated tiles are visual copies only.
  const rows = Array.from({ length: 3 }, (_, row) => available.filter((_, index) => index % 3 === row))
  const renderRow = (items, row) => {
    if (!items.length) return <div className="clients__row" key={row} />
    return <div className="clients__row" key={row}>
      <div className="clients__track">
        {[0, 1, 2].map((block) => <div className="clients__track-block" key={block}>
          {[0, 1, 2].map((repeat) => items.map((client) => {
            const duplicate = block !== 0 || repeat !== 0
            return <a className="clients__card" key={`${repeat}-${client.id}`} href={client.url} target="_blank" rel="noopener noreferrer" aria-label={duplicate ? undefined : client.name} aria-hidden={duplicate || undefined} tabIndex={duplicate ? -1 : undefined}>
              <img src={client.logo} alt="" />
            </a>
          }))}
        </div>)}
      </div>
    </div>
  }

  return <section className="clients" aria-labelledby="clients-heading">
    <div className={`clients__viewport${paused ? ' clients__viewport--paused' : ''}`} role="region" aria-label="Organizaciones">
      <div className="clients__intro">
        <h2 id="clients-heading">El valor se construye en conjunto</h2>
        <p>Relaciones que conectan conocimiento, ingeniería y nuevas oportunidades de desarrollo</p>
      </div>
      <div className="clients__composition">
        <div className="clients__side">{rows.map(renderRow)}</div>
      </div>
      {available.length > 1 && <div className="clients__controls">
        <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused} aria-label={paused ? 'Reanudar movimiento de organizaciones' : 'Pausar movimiento de organizaciones'}>{paused ? '▶' : 'Ⅱ'}</button>
      </div>}
    </div>
  </section>
}
