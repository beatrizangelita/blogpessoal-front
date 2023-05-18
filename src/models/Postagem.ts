import { Tema } from "./Tema";
import { Usuario } from "./Usuario";

export interface Postagem{
    id: number;
    titulo: string;
    texto: string;
    data: Date;
    tema: Tema;
    usuario: Usuario;
    
}