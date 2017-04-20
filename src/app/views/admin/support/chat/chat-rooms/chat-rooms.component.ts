import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms/src/directives';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

import { UserUtil } from './../../../../../user.util';
import { MessageService } from './../../../../../services/message.service';

import * as moment from 'moment';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent implements OnInit, OnDestroy {

  threads = [];
  thread = null;

  threadId;
  userId;

  message = "";

  lastMessage:string = "";

  threadSubscription: Subscription;

  constructor(public userUtil: UserUtil, private route: ActivatedRoute, private msService: MessageService, private router: Router) {
    this.msService.tid.subscribe(
      (t) => this.threadId = t
    );
    this.msService.uid.subscribe(
      (u) => this.userId = u
    );
  }

  ngOnInit() {
    const intervalObservable = Observable.interval(3000);
    this.threadSubscription = intervalObservable.flatMap((i: number) => {
      return this.msService.getThreads();
    }).subscribe(
      (r) => {
        {
          this.threads = r;
          this.lastMessage = moment(this.threads[0].lastMessage.iso).format('MMM-DD:HH:mm');
        }
      },
      (err) => console.log(err)
    );
  }

  ngOnDestroy() {
    this.threadSubscription.unsubscribe();
  }

  selectThread(thread) {
    this.thread = thread;
  }

  gravatarUrl(email) {
    return this.userUtil.getGrav(email);
  }

  doSendEvent(event: boolean, m: NgModel) {
    if (event) {
      m.reset();
    }
  }

  goTo(tid, uid) {
    this.router.navigate(['/admin/support', tid, uid]);
  }

  send(message, m) {
    m.value = "";
    if (this.threadId && this.userId) {
      this.msService.sendChat(message, this.threadId, JSON.parse(localStorage.getItem("currentUser")).id, this.userId, 0, 'support@instanttouch.net')
        .subscribe(
        (t) => {
          m.value = "";
        }
        );
    }
  }

}
