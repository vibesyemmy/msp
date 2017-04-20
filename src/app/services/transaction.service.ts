import { Observable } from 'rxjs/Rx';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../components/common/models/User';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Box } from '../components/common/models/box';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TransactionService {
  cu = null;
  public loading$ = new Subject<boolean>();
  constructor(private user: User, private http: Http, private router: Router) {
    this.init();
  }

  init() {
    this.cu = JSON.parse(localStorage.getItem('currentUser'));
    // this.user= <User>cu != null ? cu : null;
  }

  getTransaction(id:string):Observable<Box> {
    this.loading$.next(true);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    let options = new RequestOptions({
      headers: headers,
      params: {
        include: ["donor", "beneficiary"]
      }
    });
    return this.http.get('/1/classes/Box/'+id, options)
    .map((res:Response) => <Box>res.json());
  }

  getTransactions(limit?:number, skip?:number):Observable<Box[]> {
    this.loading$.next(true);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    let options = new RequestOptions({
      headers: headers,
      params: {
        where: {
          confirmation_status: {
            "$ne": 2
          }
        },
        limit: limit,
        skip:skip,
        include: ["donor", "beneficiary"]
      }
    });

    return this.http.get('/1/classes/Box', options)
    .map((res:Response) => <Box[]>res.json().results);
  }

  match(plan:any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    headers.append('X-Parse-Master-Key', '8zqndJmKVnQER6aXsnWR');
    let options = new RequestOptions({
      headers: headers
    });

    let body = {
      plan: plan,
      limit: 10
    }

    return this.http.post('/1/jobs/match', body, options).map((res:Response) => res.json());
  }

  uploadPop(file: any, oId: string, message:any) {
    let authToken = this.cu.token;
    let headers = new Headers({ 'Content-Type': file.type });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({
      headers: headers
    });

    return this.http.post('/1/files/' + file.name, file, options)
      .map((res: Response) => res.json())
      .flatMap((file) => {
        let f = {
          "__type": "File",
          "name": file.name,
          "url": file.url
        };
        return this.updateBox(oId, 1, f);
      })
      .flatMap((res) => this.sendNoti(message, '/socket/pop'))
      .map((res:Response) => res.json());
  }

  sendNoti(message:any, endpoint:string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(endpoint, {message:message}, options);
  }

  confirm(id:string, message) {
    let authToken = this.cu.token;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({
      headers: headers
    });

    return this.updateBox(id, 2)
      .flatMap((res) => this.sendNoti(message, '/socket/confirm'))
      .map((res:Response) => res.json());
  }

  updateBox(id:string, status:number, file?:{}) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    let options = new RequestOptions({
      headers: headers
    });

    let body:{
      confirmation_status:number;
      timer_status:number;
      pop?:{};
    } = {
      confirmation_status: status,
      timer_status: status
    }

    if (file) {
      body.pop = file;
    }

    return this.http.put('/1/classes/Box/'+id, body, options).map((res:Response) => res.json());
  }

  getMyDonors(): Observable<Box[]> {
    let u = {};
    let authToken = this.cu.token;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Session-Token', authToken);
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({
      headers: headers,
      params: {
        "where": {
          "beneficiary": this.u(this.cu.id),
          "confirmation_status": {
            "$lt": 2
          }
        },
        include: ["donor", "beneficiary"],
        limit: 3
      }
    });
    return this.http.get('/1/classes/Box', options)
      .map((res: Response) => {
        return <Box[]>res.json().results;
      });
  }

  getBenefitHistory() {
    let u = {};
    let authToken = this.cu.token;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Session-Token', authToken);
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({
      headers: headers,
      params: {
        "where": {
          "beneficiary": this.u(this.cu.id),
          "confirmation_status": 2
        },
        include: ["donor", "beneficiary"],
        limit: 5
      }
    });
    return this.http.get('/1/classes/Box', options)
      .map((res: Response) => {
        return <Box[]>res.json().results;
      });
  }

  getMyDonations(): Observable<Box[]> {
    let u = {};
    let authToken = this.cu.token;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Session-Token', authToken);
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({
      headers: headers,
      params: {
        "where": {
          "donor": this.u(this.cu.id),
          "confirmation_status": {
            "$lt": 2
          }
        },
        include: ["donor", "beneficiary"],
        limit: 2
      }
    });
    return this.http.get('/1/classes/Box', options)
      .map((res: Response) => {
        return <Box[]>res.json().results;
      });
  }

  getDonationHistory() {
    let u = {};
    let authToken = this.cu.token;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Session-Token', authToken);
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({
      headers: headers,
      params: {
        "where": {
          "donor": this.u(this.cu.id),
          "confirmation_status": 2
        },
        include: ["donor", "beneficiary"],
        limit: 5
      }
    });
    return this.http.get('/1/classes/Box', options)
      .map((res: Response) => {
        return <Box[]>res.json().results;
      });
  }

  u(id) {
    return {
      "__type": "Pointer",
      "className": "_User",
      "objectId": id
    };
  }

}
