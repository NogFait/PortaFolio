import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"
import Swal from "sweetalert2"

type FormData = {
  nombre: string
  mail: string
  asunto: string
  mensaje: string
}

const ContactForm = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
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
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: 'Gracias por contactarme. Te responderé a la brevedad.',
        confirmButtonColor: '#c0c1ff',
        background: '#131b2e',
        color: '#dae2fd',
        iconColor: '#4edea3',
      })
    } catch (error) {
      console.error("Error al enviar", error)
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar',
        text: 'Hubo un problema. Intentá de nuevo.',
        confirmButtonColor: '#c0c1ff',
        background: '#131b2e',
        color: '#dae2fd',
        iconColor: '#ff6b6b',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{
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
          <label style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#908fa0',
            paddingLeft: '0.25rem'
          }}>
            Nombre
          </label>
          <input
            type="text"
            {...register("nombre", { required: true })}
            placeholder="Tu Nombre"
            style={{
              width: '100%',
              padding: isMobile ? '0.75rem' : '1rem',
              background: 'rgba(6, 14, 32, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '0.75rem',
              color: '#dae2fd',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            className="form-input-new"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#908fa0',
            paddingLeft: '0.25rem'
          }}>
            Email
          </label>
          <input
            type="email"
            {...register("mail", { required: true })}
            placeholder="email@ejemplo.com"
            style={{
              width: '100%',
              padding: isMobile ? '0.75rem' : '1rem',
              background: 'rgba(6, 14, 32, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '0.75rem',
              color: '#dae2fd',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              transition: 'all 0.3s ease',
              boxSizing: 'border-box'
            }}
            className="form-input-new"
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.625rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#908fa0',
          paddingLeft: '0.25rem'
        }}>
          Asunto
        </label>
        <select
          {...register("asunto")}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'rgba(6, 14, 32, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '0.75rem',
            color: '#dae2fd',
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23c7c4d7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.75rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
          className="form-input-new"
        >
          <option value="">Seleccioná una opción</option>
          <option value="proyecto">Consulta sobre proyecto</option>
          <option value="laboral">Oportunidad laboral</option>
          <option value="otro">Otros</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.625rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#908fa0',
          paddingLeft: '0.25rem'
        }}>
          Mensaje
        </label>
        <textarea
          {...register("mensaje", { required: true })}
          placeholder="Contame sobre tu proyecto..."
          rows={5}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'rgba(6, 14, 32, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '0.75rem',
            color: '#dae2fd',
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
            resize: 'vertical',
            minHeight: '100px'
          }}
          className="form-input-new"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="hero-btn"
        style={{
          width: '100%',
          padding: '1rem',
          background: 'linear-gradient(135deg, #c0c1ff, #8083ff)',
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
          transition: 'all 0.3s ease',
          boxShadow: '0 0 20px rgba(192, 193, 255, 0.3)',
          opacity: isSubmitting ? 0.7 : 1
        }}
      >
        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>send</span>
      </button>
    </form>
  )
}

export default ContactForm