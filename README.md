# Fausto Chirino - Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/EmailJS-FF6B6B?style=for-the-badge&logo=mail-dot-ru&logoColor=white" alt="EmailJS" />
</p>

<p align="center">
  <strong>"Construyendo sistemas reales, no solo interfaces."</strong>
</p>

---

## 🎨 Design System: "The Compiled Architect"

Este portfolio implementa un design system premium inspirado en la precisión técnica y la sofisticación editorial.

### Características principales:
- ✅ **Dark Theme Profundo**: Slate oscuro (#0b1326) con acentos Indigo y Emerald
- ✅ **Tipografía Dual**: Plus Jakarta Sans (editorial) + Inter (legibilidad) + JetBrains Mono (técnico)
- ✅ **Glassmorphism**: Efectos de vidrio con `backdrop-filter: blur()`
- ✅ **Bento Grid Asimétrico**: Layout que rompe la sensación de template
- ✅ **No-Line Rule**: Sin bordes de 1px sólidos para seccionado - usamos shifts de background
- ✅ **Gradientes Signature Glow**: 45° linear-gradient para CTAs

---

## 🛠️ Tech Stack

| Tecnología | Uso en el proyecto |
|--------------|----------------------|
| **React 19** | Biblioteca principal para UI |
| **TypeScript** | Tipado estático para mayor seguridad |
| **Vite 8** | Build tool ultrarrápido |
| **Tailwind CSS v4** | Framework de utilidades y design tokens |
| **EmailJS** | Envío de emails desde el cliente |
| **React Hook Form** | Manejo de formularios con validación |

---

## 📂 Estructura del Proyecto

```
portafolio/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Hero.tsx         # Sección principal con gradiente
│   │   ├── Projects.tsx      # Grid de proyectos
│   │   ├── ProjectCard.tsx  # Cards de proyectos
│   │   ├── About.tsx         # Sobre mí
│   │   ├── ContactForm.tsx  # Formulario de contacto
│   │   └── Footer.tsx       # Pie de página
│   ├── data/               # Datos estáticos
│   ├── types/              # Tipos de TypeScript
│   ├── index.css           # Estilos globales y variables CSS
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Entry point
├── public/                 # Archivos públicos
├── openspec/              # Documentación de cambios (OpenSpec)
├── .env                   # Variables de entorno (EmailJS) - IGNORADO
├── package.json
└── vite.config.ts
```

---

## 🔧 Instalación y Uso

### Prerrequisitos:
- Node.js ≥ 18
- pnpm (recomendado) o npm

### Pasos:

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/NogFait/Portafolio.git
   cd Portafolio
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   # o npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_EMAILJS_SERVICE_ID=tu_service_id
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key
   ```
   
   > Obtén estas credenciales en [EmailJS.com](https://www.emailjs.com/)

4. **Ejecutar en modo desarrollo**
   ```bash
   pnpm dev
   # o npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

5. **Build para producción**
   ```bash
   pnpm build
   # o npm run build
   ```
   Los archivos estarán en la carpeta `dist/`.

---

## 🌐 Deploy

Este proyecto está optimizado para despliegue en:
- **Vercel** (recomendado para Vite/React)
- **Netlify**
- **GitHub Pages**

Solo necesitás conectar tu repo y configurar el build command: `pnpm build` y output directory: `dist`.

> ⚠️ **IMPORTANTE**: No subas el archivo `.env` al repo. Configurá las variables de entorno en la plataforma de deploy.

---

## 🎨 Design Tokens (CSS Variables)

```css
:root {
  /* Surface Colors */
  --surface: #0b1326;
  --surface-container-low: #131b2e;
  --surface-container-high: #222a3d;
  --surface-container-highest: #2d3449;
  
  /* Primary (Indigo) */
  --primary: #c0c1ff;
  --primary-container: #8083ff;
  
  /* Secondary (Emerald) */
  --secondary: #4edea3;
  --secondary-container: #00a572;
  
  /* Text */
  --on-surface: #dae2fd;
  --on-surface-variant: #c7c4d7;
}
```

---

## 📧 Contacto

- **Email**: [chirinocalderonfausto@gmail.com](mailto:chirinocalderonfausto@gmail.com)
- **LinkedIn**: [fausto-chirino-76b7572b6](https://www.linkedin.com/in/fausto-chirino-76b7572b6)
- **GitHub**: [NogFait](https://github.com/NogFait)

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

<p align="center">
  <strong>Hecho con ❤️ por Fausto Chirino</strong><br/>
  <em>"The Compiled Architect" - Donde el código se encuentra con el diseño.</em>
</p>
