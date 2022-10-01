import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './core/components/heroes';
import { HeroDetailsComponent } from './core/components/hero-details';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { NotFoundComponent } from './core/components/not-found';
import { AuthGuard } from './auth/guards';

const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hero/:id',
    component: HeroDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hero/new',
    component: HeroDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'material',
    loadChildren: () =>
      import('./core/material/material.module').then((m) => m.MaterialModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
