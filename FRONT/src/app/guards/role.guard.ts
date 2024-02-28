import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(private readonly authenticationService: AuthenticationService,
    private readonly router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(route);;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRole(childRoute);
  }

  checkRole(route: ActivatedRouteSnapshot): boolean{
    const user = this.authenticationService.getCurrentUserValue()
    if((user && route.data['role'] && route.data['role'].indexOf(user.role) > -1)){
      return true;
    }
    this.router.navigate(['/'])
    return false;
  }
}
