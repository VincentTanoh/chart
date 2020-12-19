// https://medium.com/@monkov/angular-using-httpinterceptor-for-token-refreshing-3f04ea2ccb81
import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {apiRoute} from '@app/helpers/api-routes';
import {AuthenticationService} from '@app/services/authentication.service';
import {appRoutes} from '@app/helpers/routes';
import addSecondsToNow from '@app/helpers/functions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {}

  private static addApiAuthToken(request: HttpRequest<unknown>): HttpRequest<any> {
    // get token from memory
    const token = localStorage.getItem('os_access_token');
    // if no token then do not set the header
    // If calling outside domain then do not add token
    if (!token || !request.url.match(environment.osApi.url)) {
      return request;
    }

    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
  }

  refreshAccessToken(): Observable<any> {
    const params = {
      refreshToken: localStorage.getItem('os_refresh_token'),
      scope: '',
    };

    return this.http.post(apiRoute('auth/refresh'), params).pipe(
      tap(
        (data) => {
          localStorage.setItem('os_refresh_token', data.refresh_token);
          localStorage.setItem('os_token_expires_in', addSecondsToNow(data.expires_in));
        },
        error => {
          throwError(error);  // We may need throw the error
        }
      )
    );
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.match(environment.osApi.url)) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {

        if (error.status === 401) {
          const token = localStorage.getItem('os_refresh_token');

          if (token) {
            // Token refreshing
            this.refreshAccessToken().pipe(
              tap(
                () => {
                  return next.handle(request).pipe(
                    catchError((err): any => {
                      return throwError(err);
                    })
                  );
                },
                err => {
                  return throwError(err);  // Forward the error
                }
              ),
              catchError((err): any => {
                this.authService.logout();  // logout from app TODO Logout() peut creer une boucle infini
                this.router.navigate([appRoutes.login]).then(r => {});  // redirect to login page
              })
            );
          }
          else {
            // logout from app
            localStorage.removeItem('current_user');
            localStorage.setItem('logged_in', 'false');
            this.router.navigate([appRoutes.login]).then(r => {});  // redirect to login page
          }
        }
        return throwError(error);  // throw the error
      })
    );
  }
}
