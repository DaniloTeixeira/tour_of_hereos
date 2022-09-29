import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './core/components/heroes';
import { HeroDetailsComponent } from './core/components/hero-details';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { NotFoundComponent } from './core/components/not-found';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'heroes',
  },
  { path: 'hero/:id', component: HeroDetailsComponent },
  { path: 'hero/new', component: HeroDetailsComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },

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
