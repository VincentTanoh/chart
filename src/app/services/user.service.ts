import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '@app/models/user';
import {apiRoute} from '@app/helpers/api-routes';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(data: any): Observable<User> {
    return this.http.post<User>(apiRoute('auth/register'), data).pipe(
      map((user: any): User => {
        return User.dataToUser(user);
      })
    );
  }
}
