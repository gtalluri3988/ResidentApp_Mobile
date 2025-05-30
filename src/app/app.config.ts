import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, ErrorHandler } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './Shared/Interceptors/auth.interceptors';
import { spinnerInterceptor } from './Shared/Interceptors/spinner.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { httpErrorInterceptor } from './Shared/Interceptors/http-error.interceptor';
import { CommonModule } from '@angular/common';
import { Idle, IdleExpiry, SimpleExpiry } from '@ng-idle/core';



export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(FormsModule), importProvidersFrom(CommonModule), Idle,
  { provide: IdleExpiry, useClass: SimpleExpiry },
  provideHttpClient(withInterceptors([authInterceptor]), withInterceptors([spinnerInterceptor])), // Register Interceptor
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withHashLocation()),
  provideClientHydration(), provideAnimationsAsync(), ReactiveFormsModule,
  provideHttpClient(withInterceptors([httpErrorInterceptor]))]
};
export const AppSettings = {
  //apiUrl: 'https://localhost:7225/api',
  apiUrl: 'http://103.27.86.226/CSAApi/api',
  environment: 'production'
  // environment: 'production'
};
