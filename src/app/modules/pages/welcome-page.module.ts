import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {WelcomePageComponent} from '../../views/pages/welcome-page/welcome-page.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent
  }
];

@NgModule({
  declarations: [
    WelcomePageComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule
    ]
})
export class WelcomePageModule { }
