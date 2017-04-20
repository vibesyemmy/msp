import { AdminTransactionModule } from './../admin-transaction/admin-transaction.module';
import { TransactionService } from '../../../../services/transaction.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTransactionListComponent } from './admin-transaction-list.component';
import { AdminTransactionComponent } from '../admin-transaction/admin-transaction.component';
import { UserUtil } from '../../../../user.util';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    AdminTransactionModule,
    RouterModule,
    BrowserModule
  ],
  declarations: [AdminTransactionListComponent],
  exports:[AdminTransactionComponent],
  providers: [TransactionService, UserUtil]
})
export class AdminTransactionListModule { }
