import { useEffect, useRef, useState } from 'react'
import { visiblePortfolio } from '../../data/content'
import './DiagnosticDialog.css'

export default function DemoDiagnosticDialog({ onClose, contact, available }) {
  const panel = useRef(null)
  const closeButton = useRef(null)
  const [complete, setComplete] = useState(false)
  const [reason, setReason] = useState(contact.reason)
  const [initiativeId, setInitiativeId] = useState(contact.initiativeId)
  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const controls = panel.current?.querySelectorAll('button, input, textarea, select, a[href]')
      if (!controls?.length) return
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls[controls.length - 1].focus() }
      else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) { event.preventDefault(); controls[0].focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = previousOverflow; if (previousFocus?.isConnected) previousFocus.focus() }
  }, [onClose])
  const submit = (event) => { event.preventDefault(); event.currentTarget.reset(); setComplete(true) }
  return <div className="diagnostic-dialog" role="presentation" onMouseDown={onClose}><section ref={panel} className="diagnostic-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="diagnostic-title" onMouseDown={(event) => event.stopPropagation()}>
    <div className="diagnostic-dialog__header"><div><p className="diagnostic-dialog__eyebrow">{available ? 'Demostración' : 'Contacto'}</p><h2 id="diagnostic-title" className="diagnostic-dialog__title">Iniciar conversación</h2></div><button ref={closeButton} className="diagnostic-dialog__close" type="button" onClick={onClose} aria-label="Cerrar formulario">×</button></div>
    <p className="diagnostic-dialog__intro">Contá qué necesitás resolver, qué producto o proyecto te interesa o qué oportunidad querés explorar.</p>
    {available ? <><p className="diagnostic-dialog__intro">Este formulario es una simulación: los datos no se envían ni se guardan.</p>
    <form className="diagnostic-dialog__form" onSubmit={submit} autoComplete="off" onChange={() => setComplete(false)}>
      <div className="diagnostic-dialog__grid"><label>Nombre<input name="name" placeholder="Tu nombre" required /></label><label>Correo electrónico<input name="email" type="email" placeholder="nombre@empresa.com" required /></label></div>
      <label>Organización <span className="diagnostic-dialog__optional">(opcional)</span><input name="organization" placeholder="Nombre de la organización" /></label>
      <label>Motivo de consulta<select name="need" value={reason} onChange={(event) => setReason(event.target.value)} required><option value="" disabled>Seleccioná una opción</option><option>Necesidad empresarial</option><option>Producto o proyecto</option><option>Colaboración estratégica</option></select></label>
      {reason === 'Producto o proyecto' && visiblePortfolio.length > 0 && <label>Iniciativa de interés <span className="diagnostic-dialog__optional">(opcional)</span><select name="initiative" value={initiativeId} onChange={(event) => setInitiativeId(event.target.value)}><option value="">Seleccioná una iniciativa</option>{visiblePortfolio.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>}
      <label>Contexto de la consulta<textarea name="context" rows="3" required placeholder="Describí brevemente tu situación, objetivo o iniciativa." /></label>
      <p className="diagnostic-dialog__intro">No incluyas información confidencial ni datos personales de terceros.</p>
      {complete && <p className="diagnostic-dialog__status" role="status">Simulación completada. No se envió ni almacenó ninguna solicitud.</p>}
      <div className="diagnostic-dialog__actions"><button className="diagnostic-dialog__submit" type="submit">Simular solicitud</button><button className="diagnostic-dialog__cancel" type="button" onClick={onClose}>Cancelar</button></div>
    </form></> : <p className="diagnostic-dialog__status" role="status">El canal de contacto no está disponible en este momento.</p>}
  </section></div>
}
