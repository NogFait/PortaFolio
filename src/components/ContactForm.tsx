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
    <form onSubmit={handleSubmit(onSubmit)} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2.5rem',
      background: 'linear-gradient(145deg, #222a3d 0%, #2d3449 100%)',
      borderRadius: '1rem',
      boxShadow: '0 15px 60px rgba(218, 226, 253, 0.08), 0 0 150px rgba(192, 193, 255, 0.05)',
      border: '1px solid rgba(192, 193, 255, 0.15)',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 25px 80px rgba(218, 226, 253, 0.12), 0 0 200px rgba(192, 193, 255, 0.08)';
      e.currentTarget.style.border = '1px solid rgba(192, 193, 255, 0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 15px 60px rgba(218, 226, 253, 0.08), 0 0 150px rgba(192, 193, 255, 0.05)';
      e.currentTarget.style.border = '1px solid rgba(192, 193, 255, 0.15)';
    }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#c7c4d7',
          marginBottom: '0.25rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>Nombre</label>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '1rem 1.25rem',
            backgroundColor: '#060e20',
            color: '#dae2fd',
            border: '1px solid rgba(192, 193, 255, 0.1)',
            borderRadius: '0.75rem',
            fontFamily: '"Inter", sans-serif',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box'
          }}
          {...register("nombre", { required: true })}
          placeholder="Tu nombre"
          onFocus={(e) => {
            e.currentTarget.style.border = '1px solid #c0c1ff';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(192, 193, 255, 0.3), 0 0 20px rgba(192, 193, 255, 0.2)';
            e.currentTarget.style.backgroundColor = '#0b1326';
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = '1px solid rgba(192, 193, 255, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.backgroundColor = '#060e20';
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#c7c4d7',
          marginBottom: '0.25rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>Email</label>
        <input
          type="email"
          style={{
            width: '100%',
            padding: '1rem 1.25rem',
            backgroundColor: '#060e20',
            color: '#dae2fd',
            border: '1px solid rgba(192, 193, 255, 0.1)',
            borderRadius: '0.75rem',
            fontFamily: '"Inter", sans-serif',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box'
          }}
          {...register("mail", { required: true })}
          placeholder="tu@email.com"
          onFocus={(e) => {
            e.currentTarget.style.border = '1px solid #c0c1ff';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(192, 193, 255, 0.3), 0 0 20px rgba(192, 193, 255, 0.2)';
            e.currentTarget.style.backgroundColor = '#0b1326';
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = '1px solid rgba(192, 193, 255, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.backgroundColor = '#060e20';
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: '#c7c4d7',
          marginBottom: '0.25rem',
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>Mensaje</label>
        <textarea
          style={{
            width: '100%',
            padding: '1rem 1.25rem',
            backgroundColor: '#060e20',
            color: '#dae2fd',
            border: '1px solid rgba(192, 193, 255, 0.1)',
            borderRadius: '0.75rem',
            fontFamily: '"Inter", sans-serif',
            fontSize: '1rem',
            minHeight: '150px',
            resize: 'vertical',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box'
          }}
          {...register("mensaje", { required: true })}
          placeholder="Escribí tu mensaje..."
          rows={5}
          onFocus={(e) => {
            e.currentTarget.style.border = '1px solid #c0c1ff';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(192, 193, 255, 0.3), 0 0 20px rgba(192, 193, 255, 0.2)';
            e.currentTarget.style.backgroundColor = '#0b1326';
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = '1px solid rgba(192, 193, 255, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.backgroundColor = '#060e20';
          }}
        />
      </div>

      <button 
        type="submit" 
        style={{
          width: '100%',
          padding: '1.125rem 2rem',
          background: 'linear-gradient(45deg, #c0c1ff, #8083ff)',
          color: '#1000a9',
          border: 'none',
          borderRadius: '0.75rem',
          fontFamily: '"Inter", sans-serif',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          opacity: isSubmitting ? 0.7 : 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 30px rgba(192, 193, 255, 0.4)',
          transform: 'scale(1)',
          marginTop: '0.5rem',
          letterSpacing: '0.02em'
        }}
        disabled={isSubmitting}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = 'scale(1.03)';
            e.currentTarget.style.boxShadow = '0 0 50px rgba(192, 193, 255, 0.6)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(192, 193, 255, 0.4)';
          }
        }}
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje →"}
      </button>
    </form>
  );
};

export default ContactForm;