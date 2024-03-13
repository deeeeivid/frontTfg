import {ApplicationConfig, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import localeES from "@angular/common/locales/es";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

registerLocaleData(localeES, 'es');
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), {
    provide: LOCALE_ID,
    useValue: 'es'
  }, provideAnimationsAsync()]
};


