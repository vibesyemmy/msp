import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.css']
})
export class RecycleComponent implements OnInit, OnDestroy {

  _endTime: number;

  _diff: number;

  _hours: number;

  _minutes: number;

  _seconds: number;

  sub: Subscription
  showPlan = false;

  user: any;

  plan = {
    id: 1,
    value: "&#8358;20,000"
  };

  plans = [
    {
      id: 1,
      value: "&#8358;20,000"
    },
    {
      id: 2,
      value: "&#8358;50,000"
    },
    {
      id: 3,
      value: "&#8358;100,000"
    }
  ];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    let doc = document.documentElement;
    doc.classList.add('full');

    this.sub = Observable.interval(1000).map((x) => { })
      .flatMap((u) => {
        return this.userService.getMe();
      }).map((u) => {
        this.user = u;
        let ed = moment(this.user.recycleTicker.iso).add(3, 'h').format("YYYY-MM-DD HH:mm");
        // console.log(this.user.recycleTicker.iso);
        this._endTime = Date.parse(ed);
        this._endTime
        this._diff = this._endTime - Date.parse(new Date().toString());
      }).subscribe((x) => {
        // console.log(this._diff);

        this._hours = this.getHours(this._diff);
        this._minutes = this.getMinutes(this._diff);
        this._seconds = this.getSeconds(this._diff);

        if (this._diff <= 0) {
          this.suspend();
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showPlans() {
    this.showPlan = !this.showPlan;
  }

  renew() {
    let opts = this.opts();
    let user = JSON.parse(localStorage.getItem("currentUser"));

    this.userService.updateUser(user.id, user.token, opts).subscribe(
      (s) => location.href = '/dashboard',
      (err) => console.log(err)
    );
  }

  changePackage() {
    let opts = this.opts(1, true);
    let user = JSON.parse(localStorage.getItem("currentUser"));

    this.userService.updateUser(user.id, user.token, opts).subscribe(
      (s) => location.href = '/dashboard',
      (err) => console.log(err)
    );
  }

  suspend() {
    let opts = this.opts(this.plan.id);
    let user = JSON.parse(localStorage.getItem("currentUser"));
    this.userService.updateUser(user.id, user.token, opts);
    console.log("suspend");
    this.sub.unsubscribe();
  }

  opts(plan?: number, suspend?:boolean) {
    let opt: any = {};
    if (plan) {
      opt.plan = +plan;
    }

    if(suspend) {
      opt.suspended = suspend;
    }

    opt.confirmation_count = 0;
    opt.benefit_count = 0;

    return opt;
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }

}
