import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'register',
	templateUrl: 'register.template.html'
})
export class registerComponent {
	@ViewChild('f') registerForm: NgForm;
	hasErrors = false;
	constructor(private authService:AuthService){}

	submit() {
		delete this.registerForm.value.tos;
		delete this.registerForm.value.confirm;
		let cred = this.registerForm.value;
		cred.username = cred.username.toLowerCase();
		this.authService.signup(cred).subscribe((res) => {
			this.hasErrors != res;
		 }, (err) => {
			this.hasErrors = true;
		});
	}
}