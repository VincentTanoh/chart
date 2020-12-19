import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegisterPageComponent} from '@app/views/pages/guest/register-page/register-page.component';
import {GuestGuard} from '@app/guards/guest.guard';
import {ReactiveFormsModule} from '@angular/forms';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: RegisterPageComponent,
    canActivate: [ GuestGuard ]
  }
];

@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    Ng2TelInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule
  ]
})
export class RegisterPageModule { }
