import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from './material/material.module';

import { HeroesComponent } from './components/heroes';
import { MessageComponent } from './components/message';
import { DashboardComponent } from './components/dashboard';
import { HeroDetailsComponent } from './components/hero-details';
import { NotFoundComponent } from './components/not-found';
import { HttpClientModule } from '@angular/common/http';

const COMPONENTS = [
  HeroesComponent,
  MessageComponent,
  DashboardComponent,
  HeroDetailsComponent,
];

@NgModule({
  declarations: [COMPONENTS, NotFoundComponent],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  exports: [MaterialModule, HttpClientModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been imported in AppModule.');
    }
  }
}
