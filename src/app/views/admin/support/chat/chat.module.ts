import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { MessageService } from '../../../../services/message.service';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../../../../components/common/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { ChatStartComponent } from './chat-start/chat-start.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    PipesModule,
    RouterModule
  ],
  declarations: [ChatRoomsComponent, ChatRoomComponent, ChatStartComponent],
  exports: [ChatRoomsComponent],
  providers: [MessageService]
})
export class ChatModule { }
