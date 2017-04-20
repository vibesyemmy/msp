import { Subscription, Observable } from 'rxjs/Rx';
import { MessageService } from './../../../services/message.service';
import { Message } from './../models/Message';
import * as io from "socket.io-client";
import { 
  Component, 
  OnInit, 
  Input, 
  trigger, 
  state,
  style, 
  transition, 
  animate, 
  ViewChild, 
  ElementRef,
  AfterViewChecked } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [
    trigger("chatState", [
      state('hidden', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform : 'translateY(50px)'
        }),
        animate(100)
      ])
    ])
  ]
})
export class ChatWidgetComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  @Input('canShow')
  show:boolean;

  state = 'hidden';

  public openChat = false;

  messages:Message[] = []; 

  threadId:string;

  socket = io();

  sub:Subscription;

  constructor(
      private userService:UserService, 
      private authService:AuthService,
      private msService:MessageService
    ) {
      this.msService.getThread(JSON.parse(localStorage.getItem("currentUser")).id).subscribe(
        (r) => {
          this.threadId = r.objectId;
          this.init()
        },
        (err) => console.log(err)
      );
     }

  init() {
    this.scrollToBottom();
    this.socket.on('incoming_message_chat', function (data) {
      // let u = JSON.parse(localStorage.getItem("currentUser"));
      // if(data.to === JSON.parse(localStorage.getItem("currentUser")).id) {
      //   let message:Message = new Message();
      //   message.text = data.text;
      //   message.isRead = false;
      //   message.id = data.objectId;
      //   message.author = {id: data.objectId, username: 'Support'};
      //   message.sentAt = new Date(data.createdAt);
      //   this.messages.push(message);
      // }
      this.scrollToBottom();
    }.bind(this));
  }

  ngOnInit() {
    if (this.show) {
      this.openChat = false;
    }

    let user = JSON.parse(localStorage.getItem("currentUser"));

    this.sub = Observable.timer(0, 5000).flatMap(()=> {
      return this.msService.getThread(user.id);
    }).map((res) =>{
      return this.msService.getThreadMessages(res.objectId);
    }).subscribe(
      (res:any) => {
        for (let i = 0; i < res.length; i++) {
          let message:Message = new Message();
          message.text = res.text;
          message.isRead = false;
          message.id = res.objectId;
          if (res.from.objectId == user.id) {
            message.author = {id: res.objectId, username: 'me'};
          } else {
            message.author = {id: res.objectId, username: 'Support'};
          }
          message.sentAt = new Date(res.createdAt);
          this.messages.push(message);
        }
      }
    )
    
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  toggleChat() {
    if(!this.openChat && !this.authService.isAdmin()) {
      this.openChat = true;
    } else {
      this.openChat = false;
    }
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  getShow() {
    if (this.openChat) {
      return 'block';
    }
    return 'none';
  }

  addMessage(message:string, mm, f:NgForm) 
  {
    if (message) {
      let u = JSON.parse(this.authService.currentUser().get());
      let m = new Message({
        author: {id: u.id, username: u.username},
        isRead: true,
        text: message
      });
      this.messages.push(m); 
      f.reset();
      mm.value = "";
      this.msService.sendChatFromClient(message, this.threadId, u.id, 0, u.email).subscribe();
      this.scrollToBottom();
    }
  }

  getAuthor(message:Message):string {
    return message.author.id == JSON.parse(this.authService.currentUser().get()).id ? 'right' : 'left';
  }

}
