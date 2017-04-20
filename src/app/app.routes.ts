import { TicketsComponent } from './views/support/tickets/tickets.component';
import { RecycleComponent } from './views/recycle/recycle.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { AdminTransactionComponent } from './views/admin/transactions/admin-transaction/admin-transaction.component';
import { AdminTransactionListComponent } from './views/admin/transactions/admin-transaction-list/admin-transaction-list.component';
import { TransactionsComponent } from './views/admin/transactions/transactions.component';
import { ChatRoomComponent } from './views/admin/support/chat/chat-room/chat-room.component';
import { AdminSupportComponent } from './views/admin/support/support.component';
import { ComingComponent } from './views/coming/coming.component';
import { AdminMatchingEditComponent } from './views/admin/admin-matching/admin-matching-edit/admin-matching-edit.component';
import { AdminMatchingComponent } from './views/admin/admin-matching/admin-matching.component';
import { IsActiveGuard } from './guards/is-active.guard';
import { SuspendedUserComponent } from './views/suspended-user/suspended-user.component';
import { InactiveUserComponent } from './views/inactive-user/inactive-user.component';
import { LandingComponent } from './views/landing/landing.component';
import { AuthenticateGuard } from './guards/authenticate.guard';
import { NgModule } from '@angular/core';
import { AbstractComponent } from './components/common/layouts/abstract/abstract.component';
import { Routes } from "@angular/router";
import { mainViewComponent } from "./views/main-view/main-view.component";
import { minorViewComponent } from "./views/minor-view/minor-view.component";
import { loginComponent } from "./views/login/login.component";
import { registerComponent } from "./views/register/register.component";
import { blankComponent } from "./components/common/layouts/blank.component";
import { basicComponent } from './components/common/layouts/basic.component';
import { DonorComponent } from './views/transaction/donor/donor.component';
import { BeneficiaryComponent } from './views/transaction/beneficiary/beneficiary.component';
import { SupportComponent } from './views/support/support.component';
import { NotAuthenticatedGuard } from './guards/authenticated.guard';
import { IsSuspendedGuard } from './guards/is-suspended.guard';
import { LandingGuard } from './guards/landing.guard';
import { AdminDashboardComponent } from './views/admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersListComponent } from './views/admin/admin-users-list/admin-users-list.component';
import { LaunchGuard } from './guards/launch.guard';
import { ChatStartComponent } from './views/admin/support/chat/chat-start/chat-start.component';


export const ROUTES: Routes = [
  // Main redirect
  { path: '', component: LandingComponent, canActivate: [LandingGuard], pathMatch: 'full' },

  // App views
  {
    path: '', component: basicComponent,
    children: [
      { path: 'dashboard', component: mainViewComponent, canActivate: [ IsSuspendedGuard, IsActiveGuard, AuthenticateGuard] },
      { path: 'testimonial', component: SupportComponent, canActivate: [ IsSuspendedGuard, IsActiveGuard, AuthenticateGuard] },
      { path: 'ticket', component: TicketsComponent, canActivate: [ IsSuspendedGuard, IsActiveGuard, AuthenticateGuard]},
      {
        path: 'user', component: AbstractComponent,
        canActivate: [AuthenticateGuard],
        children: [
          { path: 'profile', component: minorViewComponent }
        ]
      }
    ]
  },
  {
    path: 'transaction', component: basicComponent, canActivate: [AuthenticateGuard,  IsActiveGuard, IsSuspendedGuard],
    children: [
      { path: 'donor', component: DonorComponent },
      { path: 'beneficiary', component: BeneficiaryComponent }
    ]
  },
  {
    path: '', component: blankComponent,
    children: [
      { path: 'login', component: loginComponent, canActivate: [NotAuthenticatedGuard] },
      { path: 'register', component: registerComponent, canActivate: [NotAuthenticatedGuard] },
      { path: 'inactive', component: InactiveUserComponent },
      { path: 'suspended', component: SuspendedUserComponent },
      { path: 'recycle', component: RecycleComponent, canActivate: [AuthenticateGuard, IsActiveGuard, IsSuspendedGuard] },
      { path: '404', component: PageNotFoundComponent }
      // { path: 'coming', component: ComingComponent }
    ]
  },
  { path: 'admin', redirectTo: 'admin/dash', pathMatch: 'full' },
  {
    path: 'admin',
    component: basicComponent,
    canActivate: [IsAdminGuard],
    children: [
      {
        path: 'dash',
        component: AdminDashboardComponent,
        children: [
          {
            path: 'matching',
            component: AdminMatchingComponent,
            children: [
              {
                path: 'new',
                component: AdminMatchingEditComponent
              },
              {
                path: ':id/edit',
                component: AdminMatchingEditComponent
              }
            ]
          },
          {
            path: 'transactions',
            component: AdminTransactionListComponent
          },
          {
            path: 'users', component: AdminUsersListComponent
          }
        ]
      },
      { 
        path: 'support', 
        component: AdminSupportComponent,
        children: [
          { path: '', component: ChatStartComponent },
          { path: ':tid/:uid', component: ChatRoomComponent }
        ]
      },
      { path: 'transactions', redirectTo: 'transactions/list', pathMatch: 'full' },
      {
        path : 'transactions', component: TransactionsComponent,
        children: [
          { path: 'list', component: AdminTransactionListComponent},
          { path: ':id', component: AdminTransactionComponent }
        ]
      }
    ]
  },

  // Handle all other routes
  { path: '**', redirectTo: '404' }
];
