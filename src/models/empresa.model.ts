import { Categoria } from './categoria.model';
export interface Empresa {
    codempresa:number,
    nombre:string,
    imagen:string,
    categoria?: Categoria,
}