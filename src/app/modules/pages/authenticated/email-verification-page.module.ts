import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@app/guards/auth.guard';
import {EmailVerificationPageComponent} from '@app/views/pages/authenticated/email-verification-page/email-verification-page.component';

const routes: Routes = [
  {
    path: '',
    component: EmailVerificationPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    EmailVerificationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EmailVerificationPageModule { }
