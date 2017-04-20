import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Injectable()
export class LandingGuard implements CanActivate {
  constructor(private router:Router) {}
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.router.navigate(['/dashboard']);
    } else {
      // not logged in so redirect to login page
      return true;
    }
  }
}