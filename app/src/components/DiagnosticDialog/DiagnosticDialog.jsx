import { useEffect, useRef, useState } from 'react'
import './DiagnosticDialog.css'

const INITIAL_FORM = {
  name: '',
  email: '',
  organization: '',
  context: '',
}

const DIAGNOSTIC_EMAIL = import.meta.env.VITE_DIAGNOSTIC_EMAIL

export default function DiagnosticDialog({ isOpen, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle')
  const closeButtonRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll('button, input, textarea, select, a[href]')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setStatus('idle')
  }

  const updateContext = (event) => {
    updateField(event)
    event.target.style.height = 'auto'
    event.target.style.height = `${event.target.scrollHeight}px`
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!DIAGNOSTIC_EMAIL) {
      setStatus('configuration')
      return
    }

    const subject = `Consulta TALAVERA - ${form.organization}`
    const body = [
      `Nombre: ${form.name}`,
      `Email: ${form.email}`,
      `Organización: ${form.organization || 'No indicada'}`,
      '',
      'Contexto:',
      form.context,
    ].join('\n')

    window.location.href = `mailto:${DIAGNOSTIC_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('prepared')
  }

  return (
    <div className="diagnostic-dialog" role="presentation" onMouseDown={onClose}>
      <section
        ref={panelRef}
        className="diagnostic-dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnostic-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="diagnostic-dialog__header">
          <div>
            <p className="diagnostic-dialog__eyebrow">Contacto</p>
            <h2 id="diagnostic-title" className="diagnostic-dialog__title">
              Iniciar conversación
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            className="diagnostic-dialog__close"
            type="button"
            onClick={onClose}
            aria-label="Cerrar formulario"
          >
            ×
          </button>
        </div>

        <p className="diagnostic-dialog__intro">
          Contá qué necesitás resolver, qué producto o proyecto te interesa o qué oportunidad querés explorar.
        </p>

        <form className="diagnostic-dialog__form" onSubmit={handleSubmit}>
          <div className="diagnostic-dialog__grid">
            <label>
              Nombre
              <input name="name" autoComplete="name" required value={form.name} onChange={updateField} />
            </label>
            <label>
              Correo electrónico
              <input name="email" type="email" autoComplete="email" required value={form.email} onChange={updateField} />
            </label>
          </div>

          <label>
            Organización <span className="diagnostic-dialog__optional">(opcional)</span>
            <input
              name="organization"
              autoComplete="organization"
              placeholder="Nombre de la organización"
              value={form.organization}
              onChange={updateField}
            />
          </label>

          <label>
            Contexto de la consulta
            <textarea
              name="context"
              rows="2"
              required
              placeholder="Describí brevemente tu situación, objetivo o iniciativa."
              value={form.context}
              onChange={updateContext}
            />
          </label>

          {status === 'configuration' && (
            <p className="diagnostic-dialog__status" role="status">
              El canal de contacto no está disponible en este momento.
            </p>
          )}
          {status === 'prepared' && (
            <p className="diagnostic-dialog__status" role="status">
              Si tenés un cliente de correo configurado, podés revisar y enviar la solicitud desde allí.
            </p>
          )}

          <div className="diagnostic-dialog__actions">
            <button className="diagnostic-dialog__submit" type="submit">
              Preparar consulta
            </button>
            <button className="diagnostic-dialog__cancel" type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
