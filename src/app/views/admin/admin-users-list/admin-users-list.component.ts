import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../components/common/models/User';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent implements OnInit {
  @Input()
  users:User[] = [];

  @Input("choosable")
  clickable:boolean = false;

  @Input()
  maxInbox:number = 0;

  @Output("onUserClick")
  userClick = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

  onUserClick(user) {
    this.userClick.emit(user);
  }

}
