import { useEffect, useRef, useState } from 'react'
import './DiagnosticDialog.css'

export default function DemoDiagnosticDialog({ onClose }) {
  const panel = useRef(null)
  const closeButton = useRef(null)
  const [complete, setComplete] = useState(false)
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
    <div className="diagnostic-dialog__header"><div><p className="diagnostic-dialog__eyebrow">Diagnóstico estratégico / Demostración</p><h2 id="diagnostic-title" className="diagnostic-dialog__title">Empecemos por la operación.</h2></div><button ref={closeButton} className="diagnostic-dialog__close" type="button" onClick={onClose} aria-label="Cerrar diagnóstico">×</button></div>
    <p className="diagnostic-dialog__intro">Este formulario es una simulación: los datos no se envían ni se guardan.</p>
    <form className="diagnostic-dialog__form" onSubmit={submit} autoComplete="off" onChange={() => setComplete(false)}>
      <div className="diagnostic-dialog__grid"><label>Nombre<input name="name" required /></label><label>Correo electrónico<input name="email" type="email" required /></label></div>
      <label>Organización<input name="organization" /></label>
      <label>Tipo de necesidad<select name="need" defaultValue="" required><option value="" disabled>Seleccioná una opción</option><option>Producto existente</option><option>Consultoría estratégica</option><option>Proyecto específico</option><option>Colaboración</option><option>Otra necesidad</option></select></label>
      <label>Descripción breve<textarea name="context" rows="3" required placeholder="Contanos brevemente sobre la operación." /></label>
      {complete && <p className="diagnostic-dialog__status" role="status">Simulación completada. No se envió ni almacenó ninguna solicitud.</p>}
      <div className="diagnostic-dialog__actions"><button className="diagnostic-dialog__submit" type="submit">Simular solicitud</button><button className="diagnostic-dialog__cancel" type="button" onClick={onClose}>Cancelar</button></div>
    </form>
  </section></div>
}
