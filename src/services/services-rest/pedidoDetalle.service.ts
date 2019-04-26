
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service'
import { Observable } from 'rxjs/Observable';
import { PedidoDetalle } from '../../models/pedidoDetalle.model';

@Injectable()
export class PedidoDetalleService {
  static END_POINT = '/pedidodetalles';

  constructor(private httpService: HttpService) {
  }

  create(pedidoDetalle:PedidoDetalle): Observable<any> {
    return this.httpService.post(PedidoDetalleService.END_POINT,pedidoDetalle);
  }

}
