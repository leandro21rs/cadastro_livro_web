import { BrowserModule, Title } from '@angular/platform-browser';

import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';

import { authInterceptorProviders } from './shared/helpers/auth.interceptor';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { ConfigService } from './config/config-service';
import { AppsConfig } from './config/apps-config';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';

export function initializerFn(configService: ConfigService) {
  return () => {
    return configService.setConfig();
  };
}

registerLocaleData(ptBr, 'pt');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    CoreModule,
    CommonModule,
    CardModule,
    TranslateModule.forRoot(),
    ChartModule,
    CardModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    SelectButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // providers: [authInterceptorProviders, Title],
  providers: [ authInterceptorProviders, Title,
    {
      provide: AppsConfig,
      deps: [HttpClient],
      useExisting: ConfigService
    },
    { //bootstap process
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: initializerFn
    },
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
