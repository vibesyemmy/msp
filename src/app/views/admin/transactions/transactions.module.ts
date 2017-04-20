import { UserUtil } from './../../../user.util';
import { UserService } from '../../../services/user.service';
import { TransactionService } from './../../../services/transaction.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  declarations: [TransactionsComponent],
  providers: [TransactionService, AuthService, UserService, UserUtil]
})
export class TransactionsModule { }
