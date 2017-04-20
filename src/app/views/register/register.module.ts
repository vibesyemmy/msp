import { EqualvalidatorModule } from '../../components/validators/equalvalidator/equalvalidator.module';
import { AuthService } from './../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { registerComponent } from "./register.component";
import { NotAuthenticatedGuard } from '../../guards/authenticated.guard';

@NgModule({
    declarations: [registerComponent],
    imports: [
        BrowserModule, 
        RouterModule,
        FormsModule,
        EqualvalidatorModule,
        AlertModule.forRoot()],
    providers: [NotAuthenticatedGuard, AuthService]
})

export class RegisterModule { }