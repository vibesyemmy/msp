import { PipesModule } from './../../components/common/pipes/pipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { FormsModule } from '@angular/forms';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { UserUtil } from '../../user.util';
import { UserService } from '../../services/user.service';
import { TicketsComponent } from './tickets/tickets.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { MessageService } from '../../services/message.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule, 
    IboxtoolsModule, 
    FormsModule,
    PipesModule
  ],
  declarations: [SupportComponent, TicketsComponent, TestimonialComponent],
	providers: [UserUtil, UserService, MessageService]
})
export class SupportModule { 
  constructor() {
  }
}
