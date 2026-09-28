import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"
import { useBreakpoint } from "../hooks/useMediaQuery"

type FormData = {
  nombre: string
  mail: string
  asunto: string
  mensaje: string
}

const FieldError = ({ id, message }: { id: string; message?: string }) => {
  if (!message) return null
  return (
    <span id={id} role="alert" style={{
      fontFamily: 'var(--font-body)',
      fontSize: '0.75rem',
      color: 'var(--danger)',
      paddingLeft: '0.25rem'
    }}>
      {message}
    </span>
  )
}

const ContactForm = () => {
  const { isMobile } = useBreakpoint()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.nombre,
          email: data.mail,
          subject: data.asunto,
          message: data.mensaje,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      reset()
      toast.success('Mensaje enviado', {
        description: 'Gracias por contactarme. Te responderé a la brevedad.',
      })
    } catch (error) {
      console.error("Error al enviar", error)
      toast.error('Error al enviar', {
        description: 'Hubo un problema. Escribime directo a chirinocalderonfausto@gmail.com.',
      })
    }
  }

  const inputStyle = (hasError: boolean, extra: Record<string, unknown> = {}) => ({
    width: '100%',
    padding: isMobile ? '0.75rem' : '1rem',
    background: 'rgba(6, 14, 32, 0.5)',
    border: `1px solid ${hasError ? 'var(--danger)' : 'rgba(255, 255, 255, 0.05)'}`,
    borderRadius: '0.75rem',
    color: 'var(--on-surface)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    boxSizing: 'border-box' as const,
    ...extra,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '1rem' : '1.5rem'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: isMobile ? '1rem' : '1.5rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="nombre" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--outline)',
            paddingLeft: '0.25rem'
          }}>
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            {...register("nombre", { required: 'Contame cómo te llamás' })}
            placeholder="Tu Nombre"
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? 'nombre-error' : undefined}
            style={inputStyle(!!errors.nombre)}
            className="form-input-new"
          />
          <FieldError id="nombre-error" message={errors.nombre?.message} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="mail" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--outline)',
            paddingLeft: '0.25rem'
          }}>
            Email
          </label>
          <input
            id="mail"
            type="email"
            {...register("mail", {
              required: 'Necesito tu email para responderte',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ese email no parece válido' },
            })}
            placeholder="email@ejemplo.com"
            aria-invalid={!!errors.mail}
            aria-describedby={errors.mail ? 'mail-error' : undefined}
            style={inputStyle(!!errors.mail)}
            className="form-input-new"
          />
          <FieldError id="mail-error" message={errors.mail?.message} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="asunto" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--outline)',
          paddingLeft: '0.25rem'
        }}>
          Asunto
        </label>
        <select
          id="asunto"
          {...register("asunto")}
          style={inputStyle(false, {
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23c7c4d7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem',
          })}
          className="form-input-new"
        >
          <option value="">Seleccioná una opción</option>
          <option value="proyecto">Consulta sobre proyecto</option>
          <option value="laboral">Oportunidad laboral</option>
          <option value="otro">Otros</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label htmlFor="mensaje" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--outline)',
          paddingLeft: '0.25rem'
        }}>
          Mensaje
        </label>
        <textarea
          id="mensaje"
          {...register("mensaje", { required: 'Contame un poco sobre tu proyecto' })}
          placeholder="Contame sobre tu proyecto..."
          rows={5}
          aria-invalid={!!errors.mensaje}
          aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
          style={inputStyle(!!errors.mensaje, { resize: 'vertical', minHeight: '100px' })}
          className="form-input-new"
        />
        <FieldError id="mensaje-error" message={errors.mensaje?.message} />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="hero-btn"
          style={{
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
            color: '#1000a9',
            fontWeight: 700,
            fontSize: '0.9375rem',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, opacity 0.2s ease',
            boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.3)',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
          <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>send</span>
        </button>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--outline)',
          textAlign: 'center',
          marginTop: '0.75rem',
          marginBottom: 0
        }}>
          Te respondo a la brevedad
        </p>
      </div>
    </form>
  )
}

export default ContactForm
