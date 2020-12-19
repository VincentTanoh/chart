import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/guest/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/guest/register-page.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'search-travel',
    loadChildren: () => import('./pages/search-travel-page.module').then(m => m.SearchTravelPageModule)
  },
  {
    path: 'view-carrier',
    loadChildren: () => import('./pages/view-carrier-page.module').then(m => m.ViewCarrierPageModule)
  },
  {
    path: 'view-travel',
    loadChildren: () => import('./pages/view-travel-page.module').then(m => m.ViewTravelPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome-page.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./pages/guest/password-recovery-page.module').then(m => m.PasswordRecoveryPageModule)
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GuestModule { }
