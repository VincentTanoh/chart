import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ViewTravelPageComponent} from '../../views/pages/view-travel-page/view-travel-page.component';

const routes: Routes = [
  {
    path: '',
    component: ViewTravelPageComponent
  }
];

@NgModule({
  declarations: [
    ViewTravelPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewTravelPageModule { }
