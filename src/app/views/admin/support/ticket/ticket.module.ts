import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from './ticket-list/ticket-list.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [TicketListComponent],
  exports: [TicketListComponent]
})
export class TicketModule { }
