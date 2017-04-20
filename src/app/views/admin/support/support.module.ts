import { ChatModule } from './chat/chat.module';
import { TicketModule } from './ticket/ticket.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSupportComponent } from './support.component';

@NgModule({
  imports: [
    CommonModule,
    TicketModule,
    ChatModule
  ],
  declarations: [AdminSupportComponent]
})
export class SupportModule { }
