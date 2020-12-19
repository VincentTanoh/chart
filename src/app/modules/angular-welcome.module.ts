import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularWelcomeComponent} from '@app/views/pages/angular-welcome/angular-welcome.component';
import {
  NgAisClearRefinementsModule,
  NgAisConfigureModule,
  NgAisHitsModule, NgAisInstantSearchModule,
  NgAisPaginationModule,
  NgAisRefinementListModule,
  NgAisSearchBoxModule
} from 'angular-instantsearch';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: AngularWelcomeComponent
  }
];


@NgModule({
  declarations: [
    AngularWelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgAisPaginationModule,
    NgAisConfigureModule,
    NgAisHitsModule,
    NgAisSearchBoxModule,
    NgAisRefinementListModule,
    NgAisInstantSearchModule,
    NgAisClearRefinementsModule
  ]
})
export class AngularWelcomeModule { }
