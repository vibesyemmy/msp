import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NavigationComponent } from "./navigation.component";
import { AuthService } from '../../../services/auth.service';

@NgModule({
    declarations: [NavigationComponent],
    imports: [BrowserModule, RouterModule],
    exports: [NavigationComponent],
    providers: [AuthService]
})

export class NavigationModule { }