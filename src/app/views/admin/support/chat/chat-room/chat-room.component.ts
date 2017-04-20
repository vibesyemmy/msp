import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UserUtil } from '../../../../../user.util';
import { MessageService } from '../../../../../services/message.service';

import * as moment from 'moment';
import * as io from "socket.io-client";

import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  @Output()
  onSend: EventEmitter<boolean> = new EventEmitter<boolean>();

  message: string = "";

  messages = [];
  userId;
  threadId;

  socket = io();

  constructor(private msService: MessageService, public userUtil: UserUtil, private route: ActivatedRoute) { }

  init(userId, messages, scroll) {
    this.socket.on('incoming_message_chat', function (data) {
      // console.log(data.from, userId);
      if (data.from === userId || (data.to === userId && (data.from === 'support' || data.from === JSON.parse(localStorage.getItem("currentUser")).id))) {
        let m: any = {};
        // 2017-04-14T19:38:09
        m.createdAt = moment(data.res.createdAt).format('YYYY-MM-DDTHH:mm:ss');
        m.from = {};
        m.from.objectId = data.from;
        m.from.lemail = data.email;
        m.text = data.message;
        messages.push(m);
        scroll;
      }
    });
  }

  ngOnInit() {
    this.scrollToBottom();
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params['uid'];
        this.threadId = params['tid'];
        this.msService.setTID(this.threadId);
        this.msService.setUID(this.userId);
        this.msService.getThreadMessages(this.threadId).subscribe(
          (res) => {
            this.messages = res;
            this.init(this.userId, this.messages, this.scrollToBottom());
            // this.msService.setFullname()
            this.scrollToBottom();
          },
          (err) => console.log(err)
        );
      }
    );
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();

  }

  setThreadId(id, userId) {
    this.userId = userId;
    this.threadId = id;
    this.msService.getThreadMessages(id).subscribe(
      (res) => {
        this.messages = res;
        this.scrollToBottom();
      },
      (err) => console.log(err)
    );
  }

  timeAgo(date) {
    return moment(date).fromNow();
  }

  send(text) {
    let m: any = {};
    // 2017-04-14T19:38:09
    m.createdAt = moment().format('YYYY-MM-DDTHH:mm:ss');
    m.from = {};
    m.from.objectId = JSON.parse(localStorage.getItem("currentUser")).id;
    m.from.lemail = JSON.parse(localStorage.getItem("currentUser")).email;
    m.text = text;
    this.messages.push(m);
    this.scrollToBottom();
    this.message = "";
    if (!this.threadId) {
      this.onSend.emit(false);
    } else {
      this.msService.sendChat(text, this.threadId, JSON.parse(localStorage.getItem("currentUser")).id, this.userId, 0, 'support@instanttouch.net')
        .subscribe(
        (t) => this.onSend.emit(true)
        );
    }

  }

  setGravatar(email) {
    return this.userUtil.getGrav(email);
  }

  getPosition(id) {
    if (id === this.userId) {
      return "left";
    } else {
      return "right";
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
