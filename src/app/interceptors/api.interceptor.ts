import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  private static addApiKey(request: HttpRequest<unknown>): HttpRequest<any> {
    // If calling outside domain then do not add token
    if (!request.url.match(environment.osApi.url)) {
      return request;
    }

    // get lang from memory
    const lang = localStorage.getItem('lang') ?? 'fr';
    return request.clone({
      headers: request.headers
        .set('x-app-id', environment.osApi.appId)
        .set('x-api-key', environment.osApi.apiKey)
        .set('Accept', 'application/json')
        .set('x-lang', lang)
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = ApiInterceptor.addApiKey(request);
    return next.handle(request);
  }
}
