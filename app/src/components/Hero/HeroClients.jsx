import { visibleClients } from '../../data/content'
import { DEMO_MODE } from '../../data/config'
import './HeroClients.css'

export default function HeroClients() {
  if (!visibleClients.length) return null
  return <div className="hero-clients" role="region" aria-label={DEMO_MODE ? 'Clientes de ejemplo para demostración' : 'Clientes'}>
    <div className="hero-clients__window">
      <div className="hero-clients__track">
        {[0, 1].map(copy => <div className="hero-clients__group" key={copy} aria-hidden={copy === 1 || undefined}>
          {visibleClients.map(client => <a key={client.id} href={client.url} aria-label={copy === 0 ? client.name : undefined} tabIndex={copy === 1 ? -1 : undefined}><img src={client.logo} alt="" /></a>)}
        </div>)}
      </div>
    </div>
  </div>
}
