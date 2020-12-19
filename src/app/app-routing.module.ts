import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularWelcomeComponent} from '@app/views/pages/angular-welcome/angular-welcome.component';
import {NotFoundErrorPageComponent} from '@app/views/pages/not-found-error-page/not-found-error-page.component';

const routes: Routes = [
  {
    path: 'angular-welcome',
    component: AngularWelcomeComponent
  },
  {
    path: '',
    loadChildren: () => import('./modules/guest.module').then(m => m.GuestModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/authenticated.module').then(m => m.AuthenticatedModule)
  },
  {
    path: '**',
    component: NotFoundErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
