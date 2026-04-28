import type { Project } from "../types/ProjectType";

export const projects: Project[] = [
    {
    id:"1",
    titulo:"Nexus Core Engine",
    descripcion:"Sistema financiero de alta performance",
    imagen:"/images/nexus.png",
    tamaño:"large",
    tecnologias:["React", "TypeScript", "Node.js", "FastAPI"],
    link:"#",
},
{
    id:"2",
    titulo:"Aegis Guard",
    descripcion:"Seguridad para Kubernetes",
    imagen:"/images/aegis.png",
    tamaño:"medium",
    tecnologias:["Python", "Docker", "Kubernetes", "Redis"],
    link:"#",
},
{
    id:"3",
    titulo:"Hydra Mesh",
    descripcion:"Red distribuida",
    imagen:"/images/hydra.png",
    tamaño:"small",
    tecnologias:["Go", "gRPC", "PostgreSQL"],
    link:"#",
},
]