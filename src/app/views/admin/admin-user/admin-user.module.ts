import { UserService } from './../../../services/user.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserComponent } from './admin-user.component';
import { User } from '../../../components/common/models/User';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  declarations: [AdminUserComponent],
  exports: [AdminUserComponent],
  providers:[User, UserService]
})
export class AdminUserModule { }
