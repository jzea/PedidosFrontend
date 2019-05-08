import { Empresa } from './empresa.model';
export interface CategoriaEmpresa {
    category:string;
    empresas:Empresa[];
    expanded?:boolean;
}