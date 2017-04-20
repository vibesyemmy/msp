import { UserService } from '../../../services/user.service';
import { ChatWidgetComponent } from './chat-widget.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from '../../../services/message.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  declarations: [ChatWidgetComponent],
  exports:[ChatWidgetComponent],
  providers: [UserService, AuthService, MessageService]
})
export class ChatWidgetModule { }
