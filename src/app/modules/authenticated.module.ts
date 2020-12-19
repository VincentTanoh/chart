import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/authenticated/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'new-travel',
    loadChildren: () => import('./pages/authenticated/new-travel-page.module').then(m => m.NewTravelPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/authenticated/settings-page.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/authenticated/email-verification-page.module').then(m => m.EmailVerificationPageModule)
  },
  {
    path: 'verify-phone',
    loadChildren: () => import('./pages/authenticated/phone-verification-page.module').then(m => m.PhoneVerificationPageModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticatedModule { }
