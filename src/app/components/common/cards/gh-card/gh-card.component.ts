import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../../../../services/transaction.service';
import { UserUtil } from '../../../../user.util';
import { Box } from '../../models/box';

import { default as swal } from 'sweetalert2'
import * as io from "socket.io-client";
import { AuthService } from '../../../../services/auth.service';

@Component({
	selector: 'app-gh-card',
	templateUrl: './gh-card.component.html',
	styleUrls: ['./gh-card.component.css']
})
export class GhCardComponent implements OnInit {
	@Input() box: Box;
	@Input() awaiting: boolean = false;
	@Input() status?: {};

	socket = io('/socket');

	constructor(private userUtil: UserUtil, private txService: TransactionService, private authService: AuthService) { }

	ngOnInit() {

	}

	getPlan() {
		return this.userUtil.getPay(this.box.plan);
	}

	decline() {
		let service = this.txService;
		let box = this.box;
		let io = this.socket;
		let asvic = this.authService;
		swal({
			title: 'Are you sure?',
			text: "Your account will be deleted!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
			confirmButtonClass: 'btn btn-success m-r-sm',
			cancelButtonClass: 'btn btn-danger',
			buttonsStyling: false,
			preConfirm: function () {
				return new Promise((resolve, reject) => {
					service.updateBox(box.objectId, 3).subscribe(
						(res) => resolve(),
						(err) => console.log("Crap")
					)
				})
			},
			allowOutsideClick: false
		}).then(function () {
			swal(
				'Deleted!',
				'Your account has been deleted.',
				'error'
			).then(() => {
				asvic.logout();
			})
		}, function (dismiss) {
			// dismiss can be 'cancel', 'overlay',
			// 'close', and 'timer'
			if (dismiss === 'cancel') {
				swal(
					'Cancelled',
					'Please confirm this pledge.',
					'error'
				)
			}
		})

	}

	makePayment(id: string) {
		let service = this.txService;
		let box = this.box;
		let io = this.socket;
		let message = {
			type: "pop_upload",
			to: box.beneficiary.objectId
		}
		swal({
			title: 'Upload Pop',
			input: 'file',
			inputAttributes: {
				accept: 'image/*'
			},
			showCancelButton: true,
			confirmButtonText: 'Submit',
			showLoaderOnConfirm: true,
			preConfirm: function (file) {
				return new Promise(function (resolve, reject) {
					service.uploadPop(file, id, message).subscribe(
						(res) => {
							box.confirmation_status = 1;
							box.timer_status = 1;
							resolve();
						},
						(err) => {
							console.log(err);
							reject('Pop upload failed.');
						}
					);
					// setTimeout(function () {
					//   if (!file) {
					//     reject('Please choose an image.')
					//   } else {
					//     resolve()
					//   }
					// }, 2000)
				})
			},
			allowOutsideClick: false
		}).then(function (email) {
			swal({
				type: 'success',
				title: 'Proof of payment uploaded!',
				html: box.beneficiary.firstname + " " + box.beneficiary.lastname + " has been notified."
			})
		});
	}

}
