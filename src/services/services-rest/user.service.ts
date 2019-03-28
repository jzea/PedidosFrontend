
import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service'
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

@Injectable()
export class UserService {
  static END_POINT = '/usuario';

  constructor(private httpService: HttpService) {
  }

  logIn(user: User): Observable<any> {
    return this.httpService.post(UserService.END_POINT + '/login', user);
  }

}
