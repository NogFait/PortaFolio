import type { Project } from "../types/ProjectType";

export const projects: Project[] = [
    {
        id:"1",
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
    id:"2",
    titulo:"FoodStore",
    descripcion:"Sistema de gestión de stock con autenticación de usuarios e integración de pasarela de pagos",
    imagen:"/FoodStore.png",
    objectFit: 'contain',
    bgColor: '#000000',
    tecnologias:["React", "TypeScript", "Python", "FastAPI"],
    link:"https://github.com/NogFait/FoodStore",
},
{
    id:"3",
    titulo:"El Tornillo",
    descripcion:"Landing page moderna y responsiva para ferretería, con catálogo visual de herramientas y materiales de construcción, diseño optimizado para conversión y navegación intuitiva.",
    imagen:"/eltornillo.png",
    objectFit: 'cover',
    objectPosition: 'top',
    bgColor: '#221d1d',
    tecnologias:["React", "TypeScript", "Vite", "CSS"],
    link:"https://el-tornillo-landing.vercel.app/",
    problema:"Ferretería sin presencia digital, dependiente del boca en boca y sin forma de mostrar su catálogo a clientes potenciales antes de visitar el local.",
    solucion:"Landing page con catálogo visual navegable por categorías, pensada para conversión, que le da presencia online al negocio.",
},
{
    id:"4",
    titulo:"Studio Glam",
    descripcion:"Sitio web premium con diseño elegante y sistema de reservas vía WhatsApp, pensado para proyectar la identidad de un salón de belleza de alta gama en Mendoza.",
    imagen:"/studioglam.png",
    bgColor: '#201815',
    tecnologias:["React", "TypeScript", "Vite", "CSS"],
    link:"https://studio-glam-landing.vercel.app",
},

]