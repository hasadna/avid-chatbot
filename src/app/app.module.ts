import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HatoolLibModule } from 'hatool';

import * as Sentry from '@sentry/browser';
import { MainPageComponent } from './main-page/main-page.component';
import { Routes, RouterModule } from '@angular/router';
import { LtrDirective } from './ltr.directive';

// Sentry.init({
//   dsn: 'https://x@sentry.io/y'
// });

// @Injectable()
// export class SentryErrorHandler implements ErrorHandler {
//   constructor() {}
//   handleError(error) {
//     const eventId = Sentry.captureException(error.originalError || error);
//     Sentry.showReportDialog({ eventId });
//   }
// }

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LtrDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HatoolLibModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    // {provide: ErrorHandler, useClass: SentryErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
