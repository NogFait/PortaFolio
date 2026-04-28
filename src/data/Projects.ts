import type { Project } from "../types/ProjectType";

export const projects: Project[] = [
    {
    id:"1",
    titulo:"FoodStore",
    descripcion:"Sistema de gestión de stock con autenticación de usuarios e integración de pasarela de pagos",
    imagen:"./src/assets/FoodStore.png",
    tecnologias:["React", "TypeScript", "Python", "FastAPI"],
    link:"https://github.com/NogFait/FoodStore",
},
{
    id:"2",
    titulo:"Aegis Guard",
    descripcion:"Seguridad para Kubernetes",
    imagen:"/images/aegis.png",
    tecnologias:["Python", "Docker", "Kubernetes", "Redis"],
    link:"#",
},
{
    id:"3",
    titulo:"Hydra Mesh",
    descripcion:"Red distribuida",
    imagen:"/images/hydra.png",
    tecnologias:["Go", "gRPC", "PostgreSQL"],
    link:"#",
},
]