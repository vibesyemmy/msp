import { TransactionsModule } from './transactions/transactions.module';
import { TransactionService } from '../../services/transaction.service';
import { PipesModule } from '../../components/common/pipes/pipes.module';
import { UserService } from './../../services/user.service';
import { UserSearchBarModule } from './../../components/common/user-search-bar/user-search-bar.module';
import { FormsModule } from '@angular/forms';
import { FlotModule } from '../../components/charts/flot-chart.directive';
import { AdminTransactionListModule } from './transactions/admin-transaction-list/admin-transaction-list.module';
import { SupportModule } from './support/support.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersListModule } from './admin-users-list/admin-users-list.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMatchingComponent } from './admin-matching/admin-matching.component';
import { AdminMatchingEditComponent } from './admin-matching/admin-matching-edit/admin-matching-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IboxtoolsModule } from '../../components/common/iboxtools/iboxtools.module';
import { ToastModule, ToastOptions } from 'ng2-toastr';
import { CustomOption } from '../../toastr.options';

@NgModule({
  imports: [
    CommonModule,
    AdminUsersListModule,
    AdminTransactionListModule,
    SupportModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlotModule,
    IboxtoolsModule,
    UserSearchBarModule,
    PipesModule,
    TransactionsModule,
    ToastModule.forRoot()
  ],
  declarations: [AdminMatchingComponent, AdminMatchingEditComponent, AdminDashboardComponent],
  providers: [UserService, TransactionService, { provide: ToastOptions, useClass: CustomOption }]
})
export class AdminModule { }
