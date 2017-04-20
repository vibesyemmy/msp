import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { default as swal } from 'sweetalert2'

import { Box } from './../../models/box';
import { TransactionService } from './../../../../services/transaction.service';
import { UserUtil } from '../../../../user.util';

@Component({
  selector: 'app-ph-card',
  templateUrl: './ph-card.component.html',
  styleUrls: ['./ph-card.component.css']
})
export class PhCardComponent implements OnInit {

  @Input() box:Box;

  @Output()
  confirm:EventEmitter<Box> = new EventEmitter<Box>();

  constructor(private userUtil: UserUtil, private txService:TransactionService) { }

  getPlan() {
    return this.userUtil.getPay(this.box.plan);
  }

  c() {
    let service = this.txService;
    let box = this.box;
    let message = {
      type: "pay-confirm",
      to: box.donor.objectId
    }
    swal({
      title: "Confirm Payment",
      html: "<p>Please ensure that you have received payment before confirming!<p>",
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve, reject) =>{
          service.confirm(box.objectId, message).subscribe(
            (res) => {
              box.confirmation_status = 2;
              box.timer_status = 2;
              resolve();
            },
            (err) => {
              // console.log(err);
              reject('Confirmation failed.');
            }
          );
        })
      },
      allowOutsideClick: false
    }).then(() =>{
      swal(({
        type: 'success',
        title: 'Payment confirmed!',
        html: box.donor.firstname + " " + box.donor.lastname + " has been notified."
      }));
    }).catch((err) =>{

    });

  }

  ngOnInit() {
  }

}
