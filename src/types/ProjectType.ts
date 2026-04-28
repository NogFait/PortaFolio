export type Project = {
    id:string;
    titulo:string;
    descripcion:string;
    imagen:string;
    tecnologias?:string[]; // Para Tech Chips
    link?:string;
}