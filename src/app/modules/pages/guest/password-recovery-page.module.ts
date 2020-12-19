import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PasswordRecoveryPageComponent} from '@app/views/pages/guest/password-recovery-page/password-recovery-page.component';
import {GuestGuard} from '@app/guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    component: PasswordRecoveryPageComponent,
    canActivate: [GuestGuard]
  }
];

@NgModule({
  declarations: [
    PasswordRecoveryPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PasswordRecoveryPageModule { }
