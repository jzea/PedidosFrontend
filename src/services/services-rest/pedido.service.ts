
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service'
import { Observable } from 'rxjs/Observable';
import { Pedido } from '../../models/pedido.model';

@Injectable()
export class PedidoService {
  static END_POINT = '/pedidos';

  constructor(private httpService: HttpService) {
  }

  create(pedido:Pedido): Observable<any> {
    return this.httpService.post(PedidoService.END_POINT,pedido);
  }

}
