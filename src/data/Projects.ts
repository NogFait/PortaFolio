import type { Project } from "../types/ProjectType";

/**
 * El orden del array ES el orden del bento, y los `size` de cada fila tienen
 * que cerrar en 12 columnas:
 *   feature (8) + side (4)
 *   half (6) + half (6)
 *   third (4) + third (4) + third (4)
 *
 * Para agregar un proyecto: lo metes en la posicion que corresponda con su
 * `size`, cuidando que la fila siga sumando 12. Para cambiar de proyecto
 * estrella, movelo al principio y pasale `size: 'feature'`.
 */
export const projects: Project[] = [
    {
        id:"3",
        size:'feature',
        titulo:"CodeBase Doctor IA",
        descripcion:"Analiza un repositorio público de GitHub dentro de un sandbox aislado y devuelve un puntaje de 0 a 100 en seis dimensiones de ingeniería, cada una con su explicación y su etiqueta de confianza.",
        imagen:"/codebasedoctor.png",
        objectFit: 'cover',
        bgColor: '#0a1628',
        tecnologias:["NestJS", "TypeScript", "React", "Prisma", "Docker"],
        link:"https://github.com/NogFait/CodeBaseDoctor",
        problema:"Evaluar la salud de un repositorio ajeno lleva horas de lectura manual, y las métricas sueltas (tests, linters, scanners de seguridad) nunca se traducen en una señal única y comparable.",
        solucion:"Monorepo hexagonal en NestJS: la API encola el análisis en BullMQ y un worker clona el repo en un contenedor sin red —nunca ejecuta su código— para correr Semgrep, OSV-Scanner y un juez LLM en paralelo. 489 tests con TDD estricto.",
    },
    {
        id:"2",
        size:'side',
        titulo:"FoodStore",
        descripcion:"Sistema de gestión de stock con autenticación de usuarios e integración de pasarela de pagos",
        imagen:"/FoodStore.png",
        objectFit: 'contain',
        bgColor: '#000000',
        tecnologias:["React", "TypeScript", "Python", "FastAPI"],
        link:"https://github.com/NogFait/FoodStore",
    },
    {
        id:"1",
        size:'half',
        titulo:"Client Flow",
        descripcion:"Sistema Web para autonomos para gestion de clientes y sus proyectos ",
        imagen:"/ClientFlow.png",
        objectFit: 'contain',
        bgColor: '#ffffff',
        tecnologias:["React", "TypeScript", "Vite", "CSS", "Supabase"],
        link:"https://client-flow-xi.vercel.app/",
        problema:"Los autónomos suelen gestionar clientes y proyectos con planillas sueltas o herramientas genéricas que no se adaptan a su flujo de trabajo diario.",
        solucion:"Un sistema web a medida con autenticación de usuarios donde cada autónomo centraliza sus clientes, proyectos y su estado de avance en un solo lugar.",
    },
    {
        id:"4",
        size:'half',
        titulo:"Studio Glam",
        descripcion:"Sitio web premium con diseño elegante y sistema de reservas vía WhatsApp, pensado para proyectar la identidad de un salón de belleza de alta gama en Mendoza.",
        imagen:"/studioglam.png",
        objectFit: 'cover',
        bgColor: '#201815',
        tecnologias:["React", "TypeScript", "Vite", "CSS"],
        link:"https://studio-glam-landing.vercel.app",
    },
]
