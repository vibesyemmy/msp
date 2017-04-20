import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Box } from '../../../../components/common/models/box';
import { UserUtil } from './../../../../user.util';
import { TransactionService } from '../../../../services/transaction.service';

@Component({
  selector: 'app-admin-transaction',
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.css']
})
export class AdminTransactionComponent implements OnInit {

  box:Box = new Box();

  isLoading = false;
  
  constructor(public userUtil:UserUtil, private txService:TransactionService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.txService.loading$.subscribe(
      (status) => this.isLoading = status
    );

    this.route.params.flatMap((params:Params) => {
      let id = params['id'];
      return this.txService.getTransaction(id);
    }).subscribe(
      (b:Box) => {
        this.txService.loading$.next(false);
        this.box = b;
        console.log(this.box);
      },
      (err) => console.log(err)
    );
  }

  getGrav(email) {
    return this.userUtil.getGrav(email);
  }

  getConfirmationStatus(status) {
    return this.userUtil.getConfirmationStatus(status);
  }

}
