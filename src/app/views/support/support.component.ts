import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit, OnDestroy {
  @ViewChild('f') testForm: NgForm;
  sub:Subscription;
  messages = [];

  constructor(private authService:AuthService, private msService:MessageService) { }

  ngOnInit() {
    this.sub = this.msService.getTestimonials(10).subscribe(
      (m) => this.messages = m
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUserId() {
    return JSON.parse(this.authService.currentUser().get()).id;
  }

  onSubmit() {
    let m = this.testForm.value;
    let message:any = {};

    message.text = m.text;
    message.type = 2;
    message.from = this.msService.u(this.getUserId());

    this.testForm.resetForm()

    this.msService.sendTestimonial(message).subscribe(); 
  }

}
