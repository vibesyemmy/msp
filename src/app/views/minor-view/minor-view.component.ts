import { UserService } from '../../services/user.service';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { md5 } from '../../md5';
import { UserUtil } from '../../user.util';
import { NgForm } from '@angular/forms';

import { ToastsManager, Toast } from 'ng2-toastr';

interface User {
 password: string;
 confirmPassword: string;
}

export interface IBank {
	bank: string;
	account_number: string;
	phone: string;
	firstname: string;
	lastname: string;
	account_name: string;
}

export class Bank implements IBank {
  public bank: string;
  public account_number: string;
  public phone: string;
  public firstname: string;
  public lastname: string;
  public account_name: string;
}


@Component({
	selector: 'minorView',
	templateUrl: 'minor-view.template.html'
})
export class minorViewComponent implements OnInit {
	@ViewChild('p') pForm: NgForm;
	@ViewChild('b') bForm: NgForm;
	currentUser = null;
	gravatarUrl = "";
	public user: User;
	public bank: Bank;
	
	constructor(public userUtil:UserUtil, private userService:UserService, private toastr: ToastsManager, vRef: ViewContainerRef) {
		this.toastr.setRootViewContainerRef(vRef);
	}

	ngOnInit() {
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		this.gravatarUrl = this.userUtil.getGravatar(this.currentUser);

		// initialize user
		this.user = {
			password: '',
			confirmPassword: ''
		}

		this.bank = {
			account_number: '',
			bank: '',
			phone: '',
			firstname: '',
			lastname: '',
			account_name: ''
		}

		this.userService.me().subscribe((b:Bank) => {
			this.bank = b;
			this.bank.account_name = this.bank.firstname+ ' ' + this.bank.lastname
		}, (err) => console.error(err));

	}

	changePassword() {
		let password = this.pForm.value.password;
		let usr = JSON.parse(localStorage.getItem("currentUser")); 
		this.userService.updateUser(usr.id, usr.token, {password: password}).subscribe(
			(res) => {
				this.toastr.success('Password Changed');
				this.pForm.resetForm();
				usr.token = res.sessionToken;
				localStorage.setItem("currentUser", JSON.stringify(usr));
			},
			(err) => this.toastr.error('Password was not changed')
		);
	}

	updateAccount() {

	}
}