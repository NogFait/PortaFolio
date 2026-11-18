/** Tamano de la tile en el bento. Define el span de columnas y el aspect-ratio
 *  de la imagen. Las filas tienen que cerrar en 12: feature+side, half+half,
 *  third+third+third. */
export type ProjectSize = 'feature' | 'side' | 'half' | 'third';

export type Project = {
    id:string;
    size?:ProjectSize;
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