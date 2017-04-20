import { UserUtil } from './../../user.util';
import { Subscription } from 'rxjs/Rx';
import { MessageService } from './../../services/message.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { topScroll } from '../../app.helpers';
declare var jQuery:any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  messages = [];
  sub:Subscription
  constructor(private msService:MessageService, private userUtil:UserUtil) { }

  ngOnInit() {
    jQuery('body').addClass('landing-page no-skin-config');
    topScroll();

    this.sub = this.msService.getTestimonials(3).subscribe(
      (m) => this.messages = m
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getGrav(email) {
    return this.userUtil.getGrav(email);
  }

}
