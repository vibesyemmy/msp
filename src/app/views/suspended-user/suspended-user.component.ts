import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suspended-user',
  templateUrl: './suspended-user.component.html',
  styleUrls: ['./suspended-user.component.css']
})
export class SuspendedUserComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
