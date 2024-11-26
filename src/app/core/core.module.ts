import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserModule } from '@angular/platform-browser';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { HeaderComponent } from './components/main/header/header.component';
import { FooterComponent } from './components/main/footer/footer.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PaginatorModule,
    PanelMenuModule,
    TieredMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    CheckboxModule,
    AccordionModule,
    CalendarModule,
    TooltipModule,
    ToastrModule.forRoot(),
    ButtonModule,
    NgxSpinnerModule,
    SidebarModule,
    SlideMenuModule,
    ChartModule,
    MenuModule,
    AutoCompleteModule
  ]
})
export class CoreModule { }
