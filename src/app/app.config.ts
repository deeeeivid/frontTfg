import {ApplicationConfig, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import localeES from "@angular/common/locales/es";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {TokenInterceptor} from "./usuarios/interceptors/token.interceptor";
import {AuthInterceptor} from "./usuarios/interceptors/auth.interceptor";

registerLocaleData(localeES, 'es');
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    {provide: LOCALE_ID, useValue: 'es'},
    importProvidersFrom(HttpClientModule),
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ]
};


