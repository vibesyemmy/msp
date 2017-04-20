import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './../../../services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchBarComponent } from './user-search-bar.component';
import { UserService } from '../../../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule
  ],
  declarations: [UserSearchBarComponent],
  exports: [UserSearchBarComponent],
  providers: [UserService, AuthService]
})
export class UserSearchBarModule { }
