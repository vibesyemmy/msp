import { IsSuspendedGuard } from './../../../guards/is-suspended.guard';
import { CardsModule } from './../../../components/common/cards/cards.module';
import { AuthenticateGuard } from './../../../guards/authenticate.guard';
import { IboxtoolsModule } from './../../../components/common/iboxtools/iboxtools.module';
import { NgModule } from '@angular/core';
import { DonorComponent } from './donor.component';
import { BrowserModule } from '@angular/platform-browser';
import { FlotModule } from '../../../components/charts/flot-chart.directive';
import { TransactionService } from '../../../services/transaction.service';
import { User } from '../../../components/common/models/User';
import { IsActiveGuard } from '../../../guards/is-active.guard';
import { UserUtil } from '../../../user.util';
import { LaunchGuard } from '../../../guards/launch.guard';

@NgModule({
	declarations: [DonorComponent],
	imports: [BrowserModule, FlotModule, IboxtoolsModule, CardsModule],
	providers: [AuthenticateGuard, IsActiveGuard, IsSuspendedGuard, LaunchGuard, TransactionService, User, UserUtil]
})
export class DonorModule {
  
}