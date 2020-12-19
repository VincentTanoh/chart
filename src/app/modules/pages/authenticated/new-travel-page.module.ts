import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@app/guards/auth.guard';
import {NewTravelPageComponent} from '@app/views/pages/authenticated/new-travel-page/new-travel-page.component';

const routes: Routes = [
  {
    path: '',
    component: NewTravelPageComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  declarations: [
    NewTravelPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NewTravelPageModule { }
