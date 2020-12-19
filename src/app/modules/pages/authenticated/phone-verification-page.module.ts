import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@app/guards/auth.guard';
import {PhoneVerificationPageComponent} from '@app/views/pages/authenticated/phone-verification-page/phone-verification-page.component';

const routes: Routes = [
  {
    path: '',
    component: PhoneVerificationPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    PhoneVerificationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PhoneVerificationPageModule { }
