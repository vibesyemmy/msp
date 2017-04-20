import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AdminTransactionComponent } from './admin-transaction.component';
import { TransactionService } from '../../../../services/transaction.service';
import { UserUtil } from '../../../../user.util';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  declarations: [AdminTransactionComponent],
  exports:[AdminTransactionComponent],
  providers:[UserUtil, TransactionService]
})
export class AdminTransactionModule { }
