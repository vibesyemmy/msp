import { Component, OnInit, OnDestroy } from '@angular/core';
import { Box } from '../../../components/common/models/box';
import { TransactionService } from '../../../services/transaction.service';
import { Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { UserUtil } from '../../../user.util';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit, OnDestroy {
  b:Box[] = [];
  history:Box[] = [];

  sub:Subscription;

  constructor(private txService:TransactionService, private userUtil:UserUtil) {
  }

  ngOnInit() {
    this.sub = Observable.timer(0, 1000*30).flatMap(() => {
      return this.txService.getMyDonors()
    }).flatMap((res) =>{
      this.b = res;
      return this.txService.getBenefitHistory()
    }).subscribe(
      (res) => {
        this.history = res;
      },
      (err) => console.log(err)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getPay(plan:number) {
    return this.userUtil.getPay(plan);
  }

}
