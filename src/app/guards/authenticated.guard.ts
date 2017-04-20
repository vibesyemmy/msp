import { AuthService } from './../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router) {

  }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/dashboard']);
    } else {
      return true;
    }
  }
}