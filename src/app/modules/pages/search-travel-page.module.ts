import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SearchTravelPageComponent} from '../../views/pages/search-travel-page/search-travel-page.component';

const routes: Routes = [
  {
    path: '',
    component: SearchTravelPageComponent
  }
];

@NgModule({
  declarations: [
    SearchTravelPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchTravelPageModule { }
