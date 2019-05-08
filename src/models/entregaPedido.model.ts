import {Pedido } from './pedido.model';
import  {User} from './user.model';
export interface EntregaPedido{
    codentregapedido:number,
    codpedido:Pedido,
    codusuario:User,
    estado:string
}