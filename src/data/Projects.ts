import type { Project } from "../types/ProjectType";

export const projects: Project[] = [
    {
    id:"1",
    titulo:"FoodStore",
    descripcion:"Sistema de gestión de stock con autenticación de usuarios e integración de pasarela de pagos",
    imagen:"/FoodStore.png",
    tecnologias:["React", "TypeScript", "Python", "FastAPI"],
    link:"https://github.com/NogFait/FoodStore",
},
{
    id:"2",
    titulo:"Studio Glam",
    descripcion:"Sitio web premium para salón de alta gama en Mendoza.",
    imagen:"/studioglam.png",
    tecnologias:["React", "Typescript", "Vite", "CSS"],
    link:"https://studio-glam-landing.vercel.app",
},
{
    id:"3",
    titulo:"El Tornillo",
    descripcion:"Landing para ferretería con diseño moderno y enfoque en usabilidad.",
    imagen:"/eltornillo.png",
    tecnologias:["React", "Typescript", "Vite", "CSS"],
    link:"https://el-tornillo-landing.vercel.app/",
},
]