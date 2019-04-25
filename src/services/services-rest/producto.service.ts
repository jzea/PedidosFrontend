
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service'
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

@Injectable()
export class ProductoService {
  static END_POINT = '/productos';

  constructor(private httpService: HttpService) {
  }

  findByCodEmpresa(id: number): Observable<any> {
    return this.httpService.get(ProductoService.END_POINT + '/empresa/' + id);
  }
  findAll(): Observable<any> {
    return this.httpService.get(ProductoService.END_POINT);
  }
}
