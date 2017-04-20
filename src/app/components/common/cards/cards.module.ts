import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { TooltipModule } from 'ngx-bootstrap';

import { TransactionService } from '../../../services/transaction.service';
import { GhCardComponent } from './gh-card/gh-card.component';
import { UserUtil } from '../../../user.util';
import { PhCardComponent } from './ph-card/ph-card.component';
@NgModule({
  declarations: [GhCardComponent, PhCardComponent],
  imports: [
    BrowserModule,
    RouterModule,
    TooltipModule.forRoot()
  ],
  exports: [GhCardComponent, PhCardComponent],
  providers: [TransactionService, UserUtil]
})
export class CardsModule {}