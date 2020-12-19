import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ViewCarrierPageComponent} from '../../views/pages/view-carrier-page/view-carrier-page.component';

const routes: Routes = [
  {
    path: '',
    component: ViewCarrierPageComponent
  }
];

@NgModule({
  declarations: [
    ViewCarrierPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewCarrierPageModule { }
