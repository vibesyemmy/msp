import { RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { IboxtoolsComponent } from '../../components/common/iboxtools/iboxtools.component';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { mainViewComponent } from "./main-view.component";
import { FlotModule } from '../../components/charts/flot-chart.directive';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';

@NgModule({
	declarations: [mainViewComponent],
	imports: [BrowserModule, FlotModule, IboxtoolsModule, RouterModule],
	providers: [TransactionService]
})

export class MainViewModule { }