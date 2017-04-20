import { LaunchGuard } from './../../guards/launch.guard';
import { RouterModule } from '@angular/router';
import { LandingGuard } from '../../guards/landing.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { LandingComponent } from './landing.component';
import { MessageService } from '../../services/message.service';
import { UserUtil } from '../../user.util';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  declarations: [LandingComponent],
  providers:[LandingGuard, LaunchGuard, Location, MessageService, UserUtil]
})
export class LandingModule { }
