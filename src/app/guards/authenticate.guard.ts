import { state } from '@angular/core/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private router:Router) {}
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    if (!localStorage.getItem('currentUser')) {
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
      // logged in so return true
    }
    return true;
  }
}
