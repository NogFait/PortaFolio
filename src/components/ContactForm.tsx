import type { ContactFormType } from "../types/ContactFormType";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ContactFormType>();

  const onSubmit = async (data: ContactFormType) => {
    try {
      await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: data.nombre,
        email: data.mail,
        message: data.mensaje,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    reset();
    } catch (error) {
      console.error("Error al enviar", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form-card" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '1.5rem',
      background: 'linear-gradient(145deg, #222a3d 0%, #2d3449 100%)',
      borderRadius: '1rem',
      boxShadow: '0 15px 60px rgba(218, 226, 253, 0.08), 0 0 150px rgba(192, 193, 255, 0.05)',
      border: '1px solid rgba(192, 193, 255, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#c7c4d7',
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>Nombre</label>
        <input
          type="text"
          className="form-input"
          {...register("nombre", { required: true })}
          placeholder="Tu nombre"
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#c7c4d7',
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>Email</label>
        <input
          type="email"
          className="form-input"
          {...register("mail", { required: true })}
          placeholder="tu@email.com"
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#c7c4d7',
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>Mensaje</label>
        <textarea
          className="form-input"
          {...register("mensaje", { required: true })}
          placeholder="Escribí tu mensaje..."
          rows={3}
          style={{
            minHeight: '80px',
            resize: 'vertical'
          }}
        />
      </div>

      <button
        type="submit"
        className="form-submit-btn"
        disabled={isSubmitting}
        style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', marginTop: 0 }}
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje →"}
      </button>
    </form>
  );
};

export default ContactForm;
