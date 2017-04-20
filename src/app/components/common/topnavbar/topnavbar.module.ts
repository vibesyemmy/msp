import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TopnavbarComponent } from "./topnavbar.component";
import { AuthService } from '../../../services/auth.service';
import { UserSearchBarModule } from '../user-search-bar/user-search-bar.module';
import { UserService } from '../../../services/user.service';

@NgModule({
    declarations: [TopnavbarComponent],
    imports: [BrowserModule, RouterModule, UserSearchBarModule],
    exports: [TopnavbarComponent],
    providers: [AuthService, UserService]
})

export class TopnavbarModule { }