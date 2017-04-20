import { OrderBy } from '../components/common/pipes/order-by.pipe';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';

import { Router } from '@angular/router';
import { TransactionService } from './transaction.service';

import * as moment from 'moment';

@Injectable()
export class MessageService {

  constructor(private http: Http, private router: Router, private txService: TransactionService) {
  }

  private tId = new Subject<string>();
  private uId = new Subject<string>();
  private fullName = new Subject<string>();

  tid = this.tId.asObservable();
  uid = this.uId.asObservable();
  fName = this.fullName.asObservable();

  setTID(tid) {
    this.tId.next(tid);
  }

  setUID (uid) {
    this.uId.next(uid);
  }

  setFullname(fname) {
    this.fullName.next(fname);
  }

  sendTicket(message:any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({headers: headers});

    return this.http.post('/1/classes/Message', message, options).map((res:Response) => res.json());
  }
  
  sendTestimonial(message:any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');

    let options = new RequestOptions({headers: headers});

    return this.http.post('/1/classes/Message', message, options).map((res:Response) => res.json());
  }

  getTickets(userId) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    let options = new RequestOptions({
      headers: headers,
      params: {
        where: {
          "$or": [
            {
              from: this.u(userId)
            },
            {
              to: this.u(userId)
            }
          ],
          type: 1
        },
        limit: 10,
        include: ['from', 'to'],
        order: '-createdAt'
      }
    });
    return Observable.timer(0, 1000*30)
    .flatMap(() => this.http.get('/1/classes/Message', options))
    .map((res:Response) => res.json().results);
  }

  getTestimonials(limit:number) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    let options = new RequestOptions({
      headers: headers,
      params: {
        where: {
          type: 2
        },
        limit: limit,
        include: ['from'],
        order: '-createdAt'
      }
    });
    return Observable.timer(0, 1000*15)
    .flatMap(() => this.http.get('/1/classes/Message', options))
    .map((res:Response) => res.json().results);
  }

  getThread(userId) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    let options = new RequestOptions({
      headers: headers,
      params: {
        where: {
          from: this.u(userId)
        },
        limit: 1
      }
    });
    return this.http.get('/1/classes/Thread', options).map((res: Response) => {
      return res.json().results[0]
    });
  }

  sendChatFromClient(
    message: string,
    threadId,
    fromId,
    type: number,
    fromEmail: string
  ) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    let options = new RequestOptions({
      headers: headers,
      params: {
        where: {
          from: this.u(fromId)
        },
        limit: 1
      }
    });
    // Get threadId
    return this.sendChat(message, threadId, fromId, null, 0, fromEmail)
      .map((res: Response) => res.json());
  }

  sendChat(message: string, threadId: string, fromId, userId: string, type: number, email: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    let options = new RequestOptions({
      headers: headers
    });

    let t: any = {};
    return this.http.post('/1/classes/Message', this.message(threadId, fromId, message, type), options)
      .map((res: Response) => t.res = res.json())
      .flatMap((t) => {
        t.lastMessage = {
          "__type": "Date",
          "iso": moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")
        }
        // console.log(t.lastMessage);
        return this.http.put('/1/classes/Thread/' + threadId, { lastMessage: t.lastMessage }, options);
      })
      .flatMap((res: Response) => {
        // console.log(email);
        return this.txService.sendNoti({
          from: fromId,
          email: email,
          to: userId == null ? "support" : userId,
          res: t.res,
          message: message
        }, '/socket/support');
      });
  }

  getThreads() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    let options = new RequestOptions({
      headers: headers,
      params: {
        order: '-lastMessage',
        include: ["from"],
        limit: 10
      }
    });
    return this.http.get('/1/classes/Thread', options).map((res: Response) => res.json().results);
  }

  getThreadMessages(threadId) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-Parse-Application-Id', 'VMvhutWAGNpk78QXprTt');
    let options = new RequestOptions({
      headers: headers,
      params: {
        where: {
          type: 0,
          thread: this.thread(threadId)
        },
        order: 'createdAt',
        include: ["from"],
        limit: 999
      }
    });

    return this.http.get('/1/classes/Message', options).map((res: Response) => res.json().results);
  }

  thread(id) {
    return {
      "__type": "Pointer",
      "className": "Thread",
      "objectId": id
    };
  }

  u(id) {
    return {
      "__type": "Pointer",
      "className": "_User",
      "objectId": id
    };
  }

  message(t, f, text, type: number) {
    return {
      thread: this.thread(t),
      from: this.u(f),
      text: text,
      type: type
    }
  }


}