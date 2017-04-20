import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import * as moment from 'moment'; 

import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, OnDestroy {
  @ViewChild('f') ticketForm: NgForm;
  sub:Subscription;
  messages = [];

  constructor(private authService:AuthService, private msService:MessageService) { }

  ngOnInit() {
    this.sub = this.msService.getTickets(JSON.parse(this.authService.currentUser().get()).id)
    .subscribe(
      (m) => this.messages = m
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUserId() {
    return JSON.parse(this.authService.currentUser().get()).id;
  }

  onSubmit() {
    let m = this.ticketForm.value;
    let message:any = {};

    message.text = m.text;
    message.type = 1;
    message.from = this.msService.u(this.getUserId());

    this.ticketForm.resetForm()

    this.msService.sendTicket(message).subscribe(); 
  }

}
