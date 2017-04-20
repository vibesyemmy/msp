import { UserUtil } from '../../../../user.util';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Box } from '../../../../components/common/models/box';
import { TransactionService } from '../../../../services/transaction.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

@Component({
  selector: 'app-admin-transaction-list',
  templateUrl: './admin-transaction-list.component.html',
  styleUrls: ['./admin-transaction-list.component.css']
})
export class AdminTransactionListComponent implements OnInit, OnDestroy {

  tranx:Box[] = [];

  tranxSubscription: Subscription;
  intervalObservable;

  initInterval:number = 1000*30;

  constructor(private txService:TransactionService, private userUtil:UserUtil) {
  }

  ngOnInit() {
    this.intervalObservable = Observable.timer(0, 1000*60);
    let source = this.intervalObservable.flatMap(() => this.txService.getTransactions());

    this.tranxSubscription = source.subscribe(
      (boxes:Box[]) => {
        this.txService.loading$.next(false);
        this.tranx = boxes;
      },
      (err) => console.log(err)
    )
  }

  ngOnDestroy() {
    this.tranxSubscription.unsubscribe();
  }

  getPlan(plan:number) {
    return this.userUtil.getPlan(plan);
  }

  getConfirmationStatus(status:number) {
    return this.userUtil.getConfirmationStatus(status);
  }

}
