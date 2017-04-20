import { AuthService } from './../../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { Subscription } from 'rxjs/Rx';
import { UserService } from '../../../services/user.service';
declare var jQuery: any;

@Component({
	selector: 'topnavbar',
	templateUrl: 'topnavbar.template.html'
})
export class TopnavbarComponent implements OnInit, OnDestroy {
	text = "Log out";
	_trialEndsAt;

  _diff: number;

  _days: number;

  _hours: number;

  _minutes: number;

  _seconds: number;

	sub:Subscription;
	constructor(private authService:AuthService, private userService: UserService) {}

	ngOnInit() {
		this.sub = this.userService.comingSoon().subscribe((x) => {
			this._diff = x;
      this._days = this.userService.getDays(x);
      this._hours = this.userService.getHours(x);
      this._minutes = this.userService.getMinutes(x);
      this._seconds = this.userService.getSeconds(x);
    });
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	logout() {
		this.authService.logout();
	}

	toggleNavigation(): void {
		jQuery("body").toggleClass("mini-navbar");
		smoothlyMenu();
	}

}
