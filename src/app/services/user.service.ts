import { User } from './../components/common/models/User';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Bank } from '../views/minor-view/minor-view.component';

@Injectable()
export class UserService {
  _trialEndsAt;
  _diff: number;
  constructor(private http: Http, private router:Router) {
  }

  send(message) {
    let headers = new Headers({ 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
     return this.http.post('/api/sms', message, options).map((res:Response) => {
       return res.json();
     });
  }

  updateUser(id:string, authToken, opts:any) {
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Parse-Session-Token', authToken);
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({ headers: headers });

    console.log(opts);

    return this.http.put('/1/classes/_User/'+id, opts, options).map((res:Response) => res.json());
  }

  getDashboard():Observable<{}> {
    let user = JSON.parse(localStorage.getItem('currentUser')) != null ? JSON.parse(localStorage.getItem('currentUser')) : {};
    let authToken = user.token;
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Parse-Session-Token', authToken);
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({ headers: headers });

    return this.http.post('/1/functions/dashboard', null, options).map((res:Response) =>{
      return res.json().result;
    });
  }

  searchUsers(key):Observable<User[]> {
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({ headers: headers });
    return this.http.post('/1/functions/searchUsers', {q:key}, options)
      .map((res:Response) => res.json().result);
  }

  match(benex:User, donor:User) {
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({ headers: headers });
    return this.http.post('/1/classes/Box', this.box(benex, donor), options)
      .map((res:Response) => {
        return res.json();
    });
  }

  getDonors(user:User):Observable<User[]> {
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let params = new URLSearchParams();

    let q = {
      "objectId": {
        "$ne" : user.objectId,
      },
      "role" : 4,
      "active": true,
      "suspended": false,
      "plan" : user.plan,
      "confirmation_count": 0
    }
    params.append("where", JSON.stringify(q));

    let options = new RequestOptions({ headers: headers });
    options.params = params;

    return this.http.get('/1/classes/_User', options)
      .map((res:Response) => <User[]>res.json().results);
  }

  me():Observable<Bank> {
    let user = JSON.parse(localStorage.getItem('currentUser')) != null ? JSON.parse(localStorage.getItem('currentUser')) : {};
    let authToken = user.token;
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Parse-Session-Token', authToken);
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({ headers: headers });

    return this.http.get('/1/users/me', options)
      .map((res:Response) => <Bank>res.json());
  }

  u(id) {
    return {
      "__type": "Pointer",
      "className": "_User",
      "objectId": id
    };
  }

  box(benex:User, donor:User) {
    return {
      "beneficiary" : this.u(benex.objectId),
      "donor" : this.u(donor.objectId),
      "confirmation_status": 0,
      "timer_status" : 0,
      "plan": benex.plan
    }
  }

  isRecyclable() {
    return Observable.timer(0, 1000*60).flatMap(() => {
      return this.getMe();
    }).map((user) => {
      if (user.confirmation_count == 2 && user.benefit_count == 3 && user.role > 1) {
        return true;
      } else {
        return false;
      }
    })
  }

  getMe() {
    let user = JSON.parse(localStorage.getItem('currentUser')) != null ? JSON.parse(localStorage.getItem('currentUser')) : {};
    let authToken = user.token;
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('X-Parse-Session-Token', authToken);
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({ headers: headers });

    return this.http.get('/1/users/me', options)
      .map((res:Response) => res.json());
  }

  comingSoon(){
    this._trialEndsAt = "2017-04-19:12:00";
    return Observable.interval(1000).map((x) => {
      return this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
    });
  }

  getDays(t) {
		return Math.floor(t / (1000 * 60 * 60 * 24));
	}

	getHours(t) {
		return Math.floor((t / (1000 * 60 * 60)) % 24);
	}

	getMinutes(t) {
		return Math.floor((t / 1000 / 60) % 60);
	}

	getSeconds(t) {
		return Math.floor((t / 1000) % 60);
	}
}