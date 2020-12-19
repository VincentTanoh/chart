// https://blog.angular-university.io/angular-jwt-authentication/
// https://github.com/cornflourblue/angular-8-jwt-authentication-example/blob/master/src/app/_services/authentication.service.ts
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '@app/models/user';
import {apiRoute} from '@app/helpers/api-routes';
import {shareReplay, tap} from 'rxjs/operators';
import {environment} from '@environments/environment';
import * as moment from 'moment';
import addSecondsToNow from '@app/helpers/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(private http: HttpClient) {
    const data = JSON.parse(localStorage.getItem('current_user'));
    const user = data ? User.dataToUser(data) : null;
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(apiRoute('auth/login'), {
      grant_type: 'password',
      client_id: environment.osApi.appId,
      client_secret: environment.osApi.apiKey,
      email: username,
      password,
      scope: ''
    })
      .pipe(
        tap(
          (data) => this.setSession(data),
          error => throwError(error),
        ),
        shareReplay()
      );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('logged_in') === 'true' &&
      moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  setSession(data): void {
    const user = User.dataToUser(data.user);
    localStorage.setItem('os_refresh_token', data.refresh_token);
    localStorage.setItem('current_user', JSON.stringify(user));
    localStorage.setItem('logged_in', 'true');
    localStorage.setItem('os_token_expires_in', addSecondsToNow(data.expires_in));
    this.currentUserSubject.next(user);
    return data;
  }

  logout(): void {
    // revoke token
    this.http.post(apiRoute('auth/logout'), {}).subscribe(
      data => {
        // remove user from local storage to log user out
        localStorage.removeItem('os_refresh_token');
        localStorage.removeItem('current_user');
        localStorage.setItem('logged_in', 'false');
        this.currentUserSubject.next(null);
      },
      error => {
        console.log(error);
      }
    );
  }

  getExpiration(): any {
    const expiresAt = localStorage.getItem('os_token_expires_in');
    return moment(expiresAt);
  }
}
