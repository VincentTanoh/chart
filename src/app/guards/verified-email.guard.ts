import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '@app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class VerifiedEmailGuard implements CanActivate {
  constructor(private authService: AuthenticationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.authService.currentUserValue;
    if (user === null) { return false; }
    if (user.verifiedEmail()) { return true; }
    return false;  // TODO: send message to page
  }
}
