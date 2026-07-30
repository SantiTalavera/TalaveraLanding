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

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
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

    const subject = `Diagnóstico estratégico - ${form.organization}`
    const body = [
      `Nombre: ${form.name}`,
      `Email: ${form.email}`,
      `Organización: ${form.organization || 'No indicada'}`,
      '',
      'Contexto:',
      form.context,
    ].join('\n')

    window.location.href = `mailto:${DIAGNOSTIC_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  return (
    <div className="diagnostic-dialog" role="presentation" onMouseDown={onClose}>
      <section
        className="diagnostic-dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="diagnostic-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="diagnostic-dialog__header">
          <div>
            <p className="diagnostic-dialog__eyebrow">Diagnóstico estratégico</p>
            <h2 id="diagnostic-title" className="diagnostic-dialog__title">
              Empecemos por la operación.
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            className="diagnostic-dialog__close"
            type="button"
            onClick={onClose}
            aria-label="Cerrar diagnóstico"
          >
            ×
          </button>
        </div>

        <p className="diagnostic-dialog__intro">
          Contá brevemente qué hoy necesita orden. Te respondo por correo para
          evaluar si tiene sentido avanzar.
        </p>

        <form className="diagnostic-dialog__form" onSubmit={handleSubmit}>
          <div className="diagnostic-dialog__grid">
            <label>
              Nombre
              <input name="name" autoComplete="name" required value={form.name} onChange={updateField} />
            </label>
            <label>
              Email de trabajo
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
            ¿Qué parte de la operación necesita orden?
            <textarea
              name="context"
              rows="2"
              required
              placeholder="Objetivo, contexto o problema actual."
              value={form.context}
              onChange={updateContext}
            />
          </label>

          {status === 'configuration' && (
            <p className="diagnostic-dialog__status" role="status">
              Falta configurar el correo receptor del diagnóstico antes de publicar.
            </p>
          )}
          {status === 'sent' && (
            <p className="diagnostic-dialog__status" role="status">
              Se abrió tu cliente de correo con la solicitud completa.
            </p>
          )}

          <div className="diagnostic-dialog__actions">
            <button className="diagnostic-dialog__submit" type="submit">
              Enviar solicitud
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
