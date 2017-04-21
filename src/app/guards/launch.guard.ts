import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LaunchGuard implements CanActivate {
  endDate = Date.parse("2017-04-24:12:00");
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var t3 = this.endDate - Date.parse(new Date().toString());
    if (t3 > 0) {
      // logged in so return true
      // location.href = '/coming';
      console.log(t3);
      this.router.navigate(['/coming']);
    } else {
      // not logged in so redirect to login page
      return true;
    }
  }


}