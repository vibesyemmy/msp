import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

import 'chart.js';
import { FlotChartDirective } from '../../components/charts/flot-chart.directive';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
declare var jQuery: any;

@Component({
	selector: 'mianView',
	templateUrl: 'main-view.template.html'
})
export class mainViewComponent implements OnInit, OnDestroy {
	totalDonation = 295000;
	currentMatches = 2;
	prevDonations = 2;
	prevBenefits = 3;
	recentTransactions = [
		{
			fullname: 'Monica Seun',
			createdAt: new Date(),
			plan: 1
		}
	];

	_trialEndsAt;

  _diff: number;

  _days: number;

  _hours: number;

  _minutes: number;

  _seconds: number;

	sub:Subscription;

	constructor(private userService: UserService) { }

	// Main Chart

	ngOnInit() {
		let doc = document.documentElement;
		doc.classList.remove('full');
		this.sub = Observable.timer(0, 5000).flatMap(() =>{
			return this.userService.getDashboard();
		}).subscribe(
			(res) => this.setupDashboard(res),
			(err) => console.log(err)
		);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	setupDashboard(data?: {
		totalDonation?: number,
		currentMatches?: number,
		prevDonations?: number,
		prevBenefits?: number,
		recentTransactions?: [{
			fullname: string,
			createdAt: Date,
			plan: number
		}]
	}) {
		this.currentMatches = data.currentMatches;
		this.prevBenefits = data.prevBenefits;
		this.prevDonations = data.prevDonations;
		this.recentTransactions = data.recentTransactions;
		this.totalDonation = data.totalDonation;
	}

	public getPlanAmmount(plan): number {
		switch (plan) {
			case 1: {
				return 10000;
			}
			case 2: {
				return 25000;
			}
			case 3: {
				return 50000;
			}
			case 4: {
				return 100000;
			}
		}
	}

	public flotDataset: Array<any> = [
		[[0, 4], [1, 8], [2, 5], [3, 10], [4, 4], [5, 16], [6, 5], [7, 11], [8, 6], [9, 11], [10, 30], [11, 10], [12, 13], [13, 4], [14, 3], [15, 3], [16, 6]],
		[[0, 1], [1, 0], [2, 2], [3, 0], [4, 1], [5, 3], [6, 1], [7, 5], [8, 2], [9, 3], [10, 2], [11, 1], [12, 0], [13, 2], [14, 8], [15, 0], [16, 0]]
	];

	public flotOptions: any =
	{
		series: {
			lines: {
				show: true,
				fillColor: {
					colors: [
						{ opacity: 1 },
						{ opacity: 1 }
					]
				},
				fill: true
			},
			points: {
				width: 0.1,
				show: false
			}
		},
		grid: {
			show: false,
			borderWidth: 0
		},
		legend: {
			show: false
		},
		xaxis: {
			tickDecimal: 0
		}
	};

	

}