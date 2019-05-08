
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service'
import { Observable } from 'rxjs/Observable';
import { EntregaPedido } from '../../models/entregaPedido.model';

@Injectable()
export class EntregaPedidoService {
  static END_POINT = '/entregapedidos';

  constructor(private httpService: HttpService) {
  }

  findByCodUsuario(codUsuario): Observable<any> {
    return this.httpService.get(EntregaPedidoService.END_POINT + '/usuario/' + 5);
  }

}
