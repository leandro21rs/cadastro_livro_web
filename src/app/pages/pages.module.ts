import { NgModule } from '@angular/core';
import { CustomerModule } from './ds/customer.module';
import { CommonModule } from '@angular/common';
import { LivrosHomeComponent } from './livros/livros-home/livros-home.component';
import { AssuntoComponent } from './assunto/assunto.component'; 
import { AutorComponent } from './autor/autor.component'; 
import { CardModule } from 'primeng/card';
import {  HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    LivrosHomeComponent,
    AssuntoComponent,
    AutorComponent
  ],
  imports: [
    CustomerModule,
    CommonModule,
    CardModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    MultiSelectModule,
    SelectButtonModule,
    TabViewModule,
    InputTextModule,
    DialogModule,
    CheckboxModule,
    ReactiveFormsModule,
    CalendarModule,
    MessagesModule
  ]
})
export class PagesModule { }
