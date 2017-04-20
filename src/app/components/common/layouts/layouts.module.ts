import { UserService } from '../../../services/user.service';
import { IsAdminGuard } from './../../../guards/is-admin.guard';
import { AuthenticateGuard } from './../../../guards/authenticate.guard';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";


import { ToastModule, ToastOptions } from 'ng2-toastr';
import { CustomOption } from '../../../toastr.options';

import { blankComponent } from "./blank.component";
import { basicComponent } from "./basic.component";

import { NavigationModule } from "../navigation/navigation.module";
import { TopnavbarModule } from "../topnavbar/topnavbar.module";
import { FooterModule } from "../footer/footer.module";
import { AbstractComponent } from './abstract/abstract.component';
import { ChatWidgetModule } from '../chat-widget/chat-widget.module';
import { environment } from '../../../../environments/environment';

@NgModule({
    declarations: [blankComponent, basicComponent, AbstractComponent],
    imports: [
        BrowserModule, 
        RouterModule, 
        NavigationModule, 
        TopnavbarModule, 
        FooterModule,
        ChatWidgetModule,
        ToastModule.forRoot()
     ],
    exports: [blankComponent, basicComponent],
    providers: [AuthenticateGuard, IsAdminGuard, { provide: ToastOptions, useClass: CustomOption }, UserService]
})

export class LayoutsModule { }
