
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service'
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

@Injectable()
export class EmpresaService {
  static END_POINT = '/empresa';

  constructor(private httpService: HttpService) {
  }

  findAll(): Observable<any> {
    return this.httpService.get(EmpresaService.END_POINT);
  }

}
