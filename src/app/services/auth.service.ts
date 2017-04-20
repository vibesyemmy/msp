import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { TransactionService } from './transaction.service';

@Injectable()
export class AuthService {

  constructor(private http: Http, private router:Router, tx:TransactionService) { }

  isAuthenticated() {
    return JSON.parse(this.currentUser().get()).token ? true : false;
  }
  isAdmin() {
    return JSON.parse(this.currentUser().get()).role == 0 || 
    JSON.parse(this.currentUser().get()).role == 1 ? true : false;
  }

  verify(code) {
    let options = this.getOptions();
    return this.http.post('/1/functions/verify', {code:code}, options).map((res:Response) =>{
      let user = JSON.parse(localStorage.getItem("currentUser"));
      user.active = true;
      this.currentUser().set(JSON.stringify(user));
      // this.router.navigate(['/dashboard']);
      location.href = '/dashboard';
    });
  }

  currentUser() {
    let functions = {
      get: ():string =>{
        return localStorage.getItem("currentUser");
      }, 
      set: (user) =>{
        localStorage.setItem("currentUser", user);
      },
      delete: () =>{
        localStorage.removeItem("currentUser");
      }
    }
    return functions;
  }

  signup(cred) {
    let user:Object = {}
    cred.username = cred.username.trim();
    return this.http.post('/api/new', cred).map((res:Response) => {
      this.currentUser().set(res.json());
      user = res.json();
      return this.resendCode(); 
    }).map((res) =>{
      // this.router.navigate(['/dashboard']);
      location.href = '/dashboard';
      return true;
    });
  }

  login(cred) {
    cred.username = cred.username.trim();
    return this.http.post('/api/', cred).map((res:Response) => {
      this.currentUser().set(res.json());
      // this.router.navigate(['/dashboard']);
      location.href = '/dashboard';
    });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.currentUser().delete();
    this.router.navigate(['/']);
  }

  resendCode():Observable<boolean> {
    let options = this.getOptions();

    return this.http.post('/1/functions/resendCode', null, options).map((res:Response) =>{
      return <boolean>res.json().sent;
    });
  }

  getOptions():RequestOptions {
    let user = JSON.parse(this.currentUser().get());

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    headers.append('X-Parse-Session-Token', user.token);

    let options = new RequestOptions({ headers: headers });

    return options;
  }

}
