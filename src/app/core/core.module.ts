import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from './material/material.module';

import { HeroesComponent } from './components/heroes';
import { DashboardComponent } from './components/dashboard';
import { HeroDetailsComponent } from './components/hero-details';
import { NotFoundComponent } from './components/not-found';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './components/loader';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptor } from './interceptors/http-error';
import { LoaderInterceptor } from './interceptors/loader';
import { ConfirmComponent } from './components/confirm';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SearchComponent } from './components/search';

const COMPONENTS = [
  HeroesComponent,
  DashboardComponent,
  HeroDetailsComponent,
  NotFoundComponent,
  LoaderComponent,
  ConfirmComponent,
  SearchComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HttpClientModule, LoaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoaderInterceptor,
    //   multi: true,
    // },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been imported in AppModule.');
    }
  }
}
