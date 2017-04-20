import { LaunchGuard } from './../../guards/launch.guard';
import { EqualvalidatorModule } from '../../components/validators/equalvalidator/equalvalidator.module';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { minorViewComponent } from "./minor-view.component";

import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { FormsModule } from '@angular/forms';

import { UserUtil } from '../../user.util';
import { UserService } from '../../services/user.service';
import { ToastModule } from 'ng2-toastr';

@NgModule({
	declarations: [minorViewComponent],
	imports: [BrowserModule, IboxtoolsModule, FormsModule, EqualvalidatorModule, ToastModule.forRoot()],
	providers: [UserUtil, UserService, LaunchGuard]
})

export class MinorViewModule {
	constructor() {
	}
}