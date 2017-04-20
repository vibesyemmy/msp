import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { countDown } from '../../app.helpers';

declare var jQuery:any;

@Component({
  selector: 'app-coming',
  templateUrl: './coming.component.html',
  styleUrls: ['./coming.component.css']
})
export class ComingComponent implements OnInit {
  _trialEndsAt;

  _diff: number;

  _days: number;

  _hours: number;

  _minutes: number;

  _seconds: number;
  constructor() { }

  ngOnInit() {
    this._trialEndsAt = "2017-04-18:11:00";
    Observable.interval(1000).map((x) => {
      this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
    }).subscribe((x) => {
      this._days = this.getDays(this._diff);
      this._hours = this.getHours(this._diff);
      this._minutes = this.getMinutes(this._diff);
      this._seconds = this.getSeconds(this._diff);
    });

    countDown();
  }

  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
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
