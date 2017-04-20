import { md5 } from './../../../md5';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsAdminGuard } from '../../../guards/is-admin.guard';
import { AuthService } from '../../../services/auth.service';

import { smoothlyMenu } from '../../../app.helpers';

declare var jQuery: any;

@Component({
	selector: 'navigation',
	templateUrl: 'navigation.template.html'
})

export class NavigationComponent implements OnInit {
	currentUser = null;
	constructor(private router: Router, private authService:AuthService) {
	}

	ngAfterViewInit() {
		jQuery('#side-menu').metisMenu();
	}

	toggleNavigation(): void {
		jQuery("body").toggleClass("mini-navbar");
		smoothlyMenu();
	}

	activeRoute(routename: string): boolean {
		return this.router.url.indexOf(routename) > -1;
	}

	getGravatar(user: any) {
		let e = user != null ? user.email : '';
		return 'https://www.gravatar.com/avatar/'+ md5(e);
	}

	logout() {
		this.authService.logout();
	}

	public ngOnInit(): void {
		this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
		jQuery('#side-menu').metisMenu();
	}
}