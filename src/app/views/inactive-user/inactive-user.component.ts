import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.css']
})
export class InactiveUserComponent implements OnInit {
  @ViewChild('f') c: NgForm;
  isCodeSent = false;
  codeSendingFailed = false;
  hasErrors:boolean = false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  onSubmit() {
    let code = this.c.value.code;
    this.authService.verify(code).subscribe();
  }

  resend() {
    this.authService.resendCode().subscribe(
      (sent) => this.isCodeSent = true,
      (err) => this.codeSendingFailed = true
    );
  }

}
