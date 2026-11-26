import { useState } from 'react'
import './DevicePreview.css'
import brandLogo from '../../assets/brand/talavera-white.png'

function PhoneScreen({ item }) {
  const lots = item.id === 'cclf'
  return <div className="device-phone__interface">
    <div className="device-phone__masthead"><img src={brandLogo} alt="TALAVERA" /> <span aria-hidden="true">☰</span></div>
    <p>{lots ? 'MASTERPLAN' : 'OPERACIÓN'}</p>
    <strong>{item.name}</strong>
    {lots && <svg viewBox="0 0 220 170" aria-label="Masterplan conceptual"><path d="M15 135 40 35 110 15 190 40 205 110 140 155 65 150Z M40 35 65 85 15 135 M110 15 110 70 65 85 65 150 M190 40 150 80 110 70 M205 110 150 80 140 155 M65 85 140 115 150 80" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>}
    {(lots ? ['Disponibilidad', 'Reservas', 'Ventas'] : ['Inmuebles', 'Contratos', 'Pagos', 'Mantenimiento']).map(label => <div className="device-phone__row" key={label}><span>{label}</span><span aria-hidden="true">›</span></div>)}
    <small>VISTA CONCEPTUAL</small>
  </div>
}

export default function DevicePreview({ item }) {
  const [view, setView] = useState('desktop')
  const mobile = item.previewDevices?.includes('mobile')
  const choices = mobile ? [['desktop', 'Computadora'], ['mobile', 'Teléfono'], ['both', 'Ambas']] : [['desktop', 'Computadora']]
  return <div className="device-preview">
    <div className="device-preview__selector" role="group" aria-label={`Vista de ${item.name}`} onKeyDown={event => event.stopPropagation()}>
      {choices.map(([value, label]) => <button type="button" key={value} aria-pressed={view === value} onClick={() => setView(value)}>{label}</button>)}
    </div>
    <div className={`device-preview__stage device-preview__stage--${view}`}>
      {view !== 'mobile' && <div className="device-laptop" role="img" aria-label={`Vista conceptual de ${item.name} en una computadora portátil`}>
        <div className="device-laptop__lid"><span className="device-laptop__camera" /><div className="device-laptop__screen"><img src={item.image} alt={item.imageAlt} /></div></div>
        <div className="device-laptop__base" />
      </div>}
      {mobile && view !== 'desktop' && <div className="device-phone" role="img" aria-label={`Propuesta conceptual de ${item.name} en un teléfono`}><div className="device-phone__screen"><PhoneScreen item={item} /></div><span className="device-phone__camera" /><span className="device-phone__home" /></div>}
    </div>
  </div>
}
