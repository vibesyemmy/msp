import { UserUtil } from './../../../user.util';
import { LaunchGuard } from './../../../guards/launch.guard';
import { CardsModule } from './../../../components/common/cards/cards.module';
import { NgModule } from '@angular/core';
import { BeneficiaryComponent } from './beneficiary.component';
import { BrowserModule } from '@angular/platform-browser';
import { FlotModule } from '../../../components/charts/flot-chart.directive';
import { IboxtoolsModule } from '../../../components/common/iboxtools/iboxtools.module';
import { AuthenticateGuard } from '../../../guards/authenticate.guard';
import { TransactionService } from '../../../services/transaction.service';
import { User } from '../../../components/common/models/User';
@NgModule({
  declarations: [BeneficiaryComponent],
	imports: [BrowserModule, FlotModule, IboxtoolsModule, CardsModule],
	providers: [AuthenticateGuard, TransactionService, User, LaunchGuard, UserUtil]
})
export class BeneficiaryModule {}