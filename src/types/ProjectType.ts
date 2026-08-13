export type Project = {
    id:string;
    titulo:string;
    descripcion:string;
    imagen:string;
    objectFit?: 'cover' | 'contain';
    objectPosition?: string;
    bgColor?: string;
    tecnologias?:string[];
    link?:string;
    problema?: string;
    solucion?: string;
    resultados?: { label: string; value: string }[];
}