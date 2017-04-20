import { AdminUserModule } from '../admin-user/admin-user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersListComponent } from './admin-users-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../../../components/common/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    AdminUserModule,
    BrowserModule,
    PipesModule
  ],
  declarations: [AdminUsersListComponent],
  exports:[AdminUsersListComponent]
})
export class AdminUsersListModule { }
