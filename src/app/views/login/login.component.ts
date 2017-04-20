import { NgForm } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
	selector: 'login',
	templateUrl: 'login.template.html',
	styleUrls: ['./login.component.css']
})
export class loginComponent {
	@ViewChild('f') loginForm: NgForm;
	hasErrors = false;
	constructor(private authService: AuthService) {
		// this.toastr.setRootViewContainerRef(vcr);
	}

	showError() {
		this.hasErrors = true;
	}

	onSubmit() {
		let cred = this.loginForm.value;
		cred.username = cred.username.toLowerCase();
		this.authService.login(cred).subscribe((res) => {
			// window.location.href = "/dashboard";
		}, (err) => {
			this.showError();
			console.error(err);
		});
	}
}