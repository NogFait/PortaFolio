export type Project = {
    id:string;
    titulo:string;
    descripcion:string;
    imagen:string;
    tamaño:"small"|"medium"|"large";
    tecnologias?:string[]; // Para Tech Chips
    link?:string;
}