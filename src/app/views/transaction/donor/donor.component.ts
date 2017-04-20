import { Subscription, Observable } from 'rxjs/Rx';
import { UserUtil } from '../../../user.util';
import { TransactionService } from '../../../services/transaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { default as swal } from 'sweetalert2'
import { Box } from '../../../components/common/models/box';

import * as moment from 'moment';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit, OnDestroy {
  d:Box[] = [];
  history:Box[] = [];
  today = moment().format('LLLL');
  sub:Subscription;

  constructor(private txService:TransactionService, private userUtil:UserUtil) {
  }

  ngOnInit() {

    this.sub = Observable.timer(0, 5000).flatMap(()=> {
      return this.txService.getMyDonations();
    }).flatMap((res) =>{
      this.d = res;
      return this.txService.getDonationHistory();
    }).subscribe(
      (res) => this.history = res,
      (err) => console.log(err)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getDeadline(date) {
    let start = moment(date).add("3", "d");
    let now = Date.parse(new Date().toString());

    let ex:boolean = now - Date.parse(start.toISOString()) > 0;

    if (!ex) {
      console.log(ex, now - Date.parse(start.toISOString()));
    }
    return {
      expire: now - Date.parse(start.toISOString()) < 0,
      start: moment(start).format("MMM DD, YYYY h:mm a")
    };
  }

  getPlan(plan:number) {
    return this.userUtil.getPay(plan);
  }

}
