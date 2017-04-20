import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loginComponent } from "./login.component";
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap';

import { NotAuthenticatedGuard } from './../../guards/authenticated.guard';

@NgModule({
    declarations: [loginComponent],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        BrowserAnimationsModule,
        AlertModule.forRoot()
    ],
    providers: [AuthService, NotAuthenticatedGuard]
})

export class LoginModule { }