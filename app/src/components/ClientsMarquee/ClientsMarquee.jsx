import { clients } from '../../data/content'
import { DEMO_MODE } from '../../data/config'
import './ClientsMarquee.css'

export default function ClientsMarquee() {
  const available = clients.filter((client) => client.logo && client.url)
  if (!available.length) return null
  return <section className="clients" aria-label="Clientes">
    <h2 className="section-label">Organizaciones{DEMO_MODE && ' / demostración'}</h2>
    <div className="clients__viewport"><div className="clients__track">
      {[0, 1].map((copy) => <div className="clients__group" key={copy} aria-hidden={copy === 1 || undefined}>
        {available.map((client) => <a key={client.id} href={client.url} target="_blank" rel="noopener noreferrer" tabIndex={copy === 1 ? -1 : undefined} aria-label={client.name}><img src={client.logo} alt={client.name} /></a>)}
      </div>)}
    </div></div>
  </section>
}
