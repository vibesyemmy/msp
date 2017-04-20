import { Subscription } from 'rxjs/Rx';
import { Component, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastsManager, Toast } from 'ng2-toastr';

import { UserService } from '../../../services/user.service';
import { detectBody } from '../../../app.helpers';
import { AuthService } from '../../../services/auth.service';
import { Box } from '../models/box';

import * as io from "socket.io-client";

declare var jQuery: any;

@Component({
	selector: 'basic',
	templateUrl: 'basic.template.html',
	host: {
		'(window:resize)': 'onResize()'
	}
})
export class basicComponent implements OnInit, OnDestroy {

	socket = io();

	subscription: Subscription;

	constructor(
		private router: Router,
		private authService: AuthService,
		private userService: UserService,
		private toastr: ToastsManager, vRef: ViewContainerRef
	) {
		this.toastr.setRootViewContainerRef(vRef);
	}

	public ngOnInit(): any {
		detectBody();
		this.subscription = this.userService.isRecyclable().subscribe(
			(isRecyclable) =>{
				console.log(isRecyclable)
				if (isRecyclable) {
					this.router.navigate(['/recycle']);
				}
			}
		);
		let u = JSON.parse(this.authService.currentUser().get());
		this.socket.on('confirm-pop-upload', (message) => {
			console.log(message, u);
			if (u.id === message.to) {
				this.toastr.info('A donor has uploaded their proof of payment', 'POP Uploaded', {
					toastLife: 300000,
					dismiss: 'click'
				});
			}
		});
		this.socket.on('pay-confirm', (message) => {
			if (u.id === message.to)
			this.toastr.success('Your payment has been confirmed.', 'Payment Confirmed', {
				toastLife: 300000,
				dismiss: 'click'
			});
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	public onResize() {
		detectBody();
	}

	activeRoute(routename: string): boolean {
		return this.router.url.indexOf(routename) > -1;
	}

	logout() {
		this.authService.logout();
	}
}