import { UserService } from './services/user.service';
import { AdminModule } from './views/admin/admin.module';
import { EqualValidatorDirective } from './components/validators/equal.validator.directive';
import { AuthenticateGuard } from './guards/authenticate.guard';
import { SupportModule } from './views/support/support.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { LayoutsModule } from './components/common/layouts/layouts.module';
import { MainViewModule } from './views/main-view/main-view.module';
import { MinorViewModule } from './views/minor-view/minor-view.module';
import { LoginModule } from './views/login/login.module';
import { RegisterModule } from './views/register/register.module';
import { ROUTES } from './app.routes';
import { AuthService } from './services/auth.service';
import { DonorComponent } from './views/transaction/donor/donor.component';
import { BeneficiaryComponent } from './views/transaction/beneficiary/beneficiary.component';
import { FlotChartDirective } from './components/charts/flot-chart.directive';
import { DonorModule } from './views/transaction/donor/donor.module';
import { BeneficiaryModule } from './views/transaction/beneficiary/beneficiary.module';
import { LandingModule } from './views/landing/landing.module';
import { InactiveUserComponent } from './views/inactive-user/inactive-user.component';
import { SuspendedUserComponent } from './views/suspended-user/suspended-user.component';
import { AlertModule } from 'ngx-bootstrap';
import { ComingComponent } from './views/coming/coming.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { RecycleComponent } from './views/recycle/recycle.component';

@NgModule({
  declarations: [
    AppComponent,
    InactiveUserComponent,
    SuspendedUserComponent,
    ComingComponent,
    PageNotFoundComponent,
    RecycleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,


    // Views
    MainViewModule,
    MinorViewModule,
    LoginModule,
    RegisterModule,
    DonorModule,
    BeneficiaryModule,
    SupportModule,
    LandingModule,
    LayoutsModule,
    AdminModule,
    AlertModule.forRoot(),

    RouterModule.forRoot(ROUTES)
  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthService, AuthenticateGuard],
  providers: [AuthService, AuthenticateGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
