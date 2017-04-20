import { TransactionService } from '../../../services/transaction.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastsManager, Toast } from 'ng2-toastr';

import { User } from '../../../components/common/models/User';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('f') matchForm: NgForm;
  @ViewChild('s') smsForm: NgForm;

  wordCount:number = 0;
  user:User = null;
  users:User[] = [];
  donors:User[] = [];

  keyCount:number = 0;
  username:string = "";

  isSending:boolean = false;

  constructor(private userService:UserService, 
  private toastr: ToastsManager, vRef: ViewContainerRef,
  private txService:TransactionService) { 
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
  }

  checkUser(username:string) {
    if(username.length > 4) {
      // TODO : Check by username
      this.username = username.trim();
    }
  }

  getUsers(key) {
    this.keyCount++;
    if (key.length > 3) {
      this.userService.searchUsers(key).subscribe(
        (users:User[]) => {
          this.user = null;
          this.donors = [];
          this.users = users;
        },
        (err) => console.error(err)
      );
    }
  }

  onBackspace(value:{statue:boolean, key:string}) {
    if (value.key.length < 4) {
      this.clear();
    }
  }

  clear() {
    this.users = [];
    this.user = null;
    this.donors = [];
  }

  setWordCount(text:string) {
    this.wordCount = text.length;
  }

  setUser(user:User) {
    this.user = user;
    this.userService.getDonors(user).subscribe((donors) =>{
      this.donors = donors;
    });
  }

  setDonor(donor:User) {
    if (donor.role == 0 || donor.role == 1 ) {
      this.toastr.error('You can\'t match an admin to donate!', 'Oops!');
    } else {
      this.userService.match(this.user, donor).subscribe(
        (res) => {
          this.toastr.success('Match complete', 'Success');
          this.clear();
        },
        (err) => {
          this.toastr.error('Match failed', 'Oops!');
          this.clear();
        }
      );
    }
  }

  match() {
    console.log(this.matchForm.value.plan);
    this.txService.match(this.matchForm.value.plan).subscribe(
      (res) => {
        // this.matchForm.value.plan = "";
        this.toastr.success('Batch match complete.', 'Success');
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  sendSms() {
    let message = this.smsForm.value;
    if (message.type == 0) {
      message.username = this.username;
    }
    this.isSending = true;
    this.toastr.info('Message is being sent.', 'Wait');
    this.userService.send(message).subscribe(
      (res) => {
        this.isSending = false;
        this.toastr.success('Message sent.', 'Success');
      },
      (err) => {
        this.isSending = false;
        this.toastr.error('Message failed.', 'Oops');
      }
    );
    // console.log(this.smsForm.value);
  }

}
