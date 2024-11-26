// Modules
import { CustomerRoutingModule } from './customer-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { CheckboxModule } from 'primeng/checkbox';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { StepsModule } from 'primeng/steps';
import { TreeTableModule } from 'primeng/treetable';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PasswordModule } from 'primeng/password';
import { TimelineModule } from 'primeng/timeline';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { DataViewModule } from 'primeng/dataview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { SliderModule } from 'primeng/slider';
import { SharedModule } from 'src/app/shared/shared.module';

// Components 
import { MessagesComponent } from './components/mensagens/messages/messages.component';
import { TooltipComponent } from './components/overlay/tooltip/tooltip.component';
import { AccordionComponent } from './components/panel/accordion/accordion.component';
import { TreeTableComponent } from './components/tables/tree-table/tree-table.component';
import { TableComponent } from './components/tables/table/table.component';
import { ProductDetailedComponent } from './components/tables/table/product-detailed/product-detailed.component';
import { InputComponent } from './components/form/input/input.component';
import { AutoCompleteComponent } from './components/form/auto-complete/auto-complete.component';
import { CalendarComponent } from './components/form/calendar/calendar.component';
import { ChipsComponent } from './components/form/chips/chips.component';
import { RadioButtonComponent } from './components/form/radio-button/radio-button.component';
import { CheckBoxComponent } from './components/form/check-box/check-box.component';
import { ListBoxComponent } from './components/form/list-box/list-box.component';
import { DropdownComponent } from './components/form/dropdown/dropdown.component';
import { MultiselectComponent } from './components/form/multiselect/multiselect.component';
import { ToggleButtonComponent } from './components/form/toggle-button/toggle-button.component';
import { SelectButtonComponent } from './components/form/select-button/select-button.component';
import { ButtonTypesComponent } from './components/buttons/button-types/button-types.component';
import { SplitButtonComponent } from './components/buttons/split-button/split-button.component';
import { FormComponent } from './components/form/form.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { DialogComponent } from './components/overlay/dialog/dialog.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { TimelineComponent } from './components/dados/timeline/timeline.component';
import { CrudComponent } from './components/tables/crud/crud.component';
import { TableStateComponent } from './components/tables/table-state/table-state.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { ChartsComponent } from './components/charts/charts.component';
import { TabviewComponent } from './components/panel/tabview/tabview.component';
import { PanelComponent } from './components/panel/panel.component';
import { DoughnutChartComponent } from './components/charts/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { PolarAreaComponent } from './components/charts/polar-area/polar-area.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { RadarChartComponent } from './components/charts/radar-chart/radar-chart.component';
import { ComboChartComponent } from './components/charts/combo-chart/combo-chart.component';
import { TableRowExpandedComponent } from './components/tables/table-row-expanded/table-row-expanded.component';
import { StepsCadastroComponent } from './components/menu/steps-cadastro/steps-cadastro.component';
import { StepsConsultaComponent } from './components/menu/steps-consulta/steps-consulta.component';
import { TableVerticalComponent } from './components/tables/table-vertical/table-vertical.component';
import { ResponsiveTableComponent } from './components/tables/responsive-table/responsive-table.component';
import { StepsConsultaResultadoComponent } from './components/menu/steps-consulta-resultado/steps-consulta-resultado.component';
import { FilterTableComponent } from './components/tables/filter-table/filter-table.component';
import { KnobComponent } from './components/form/knob/knob.component';
import { HomeBasicComponent } from './template/home-basic/home-basic.component';
import { HomeDashboardComponent } from './template/home-dashboard/home-dashboard.component';
import { TableInlineChartComponent } from './components/tables/table-inline-chart/table-inline-chart.component';
import { FilterServiceComponent } from './utilities/filter-service/filter-service.component';
import { SliderComponent } from './components/form/slider/slider.component';
import { FormValidatorsComponent } from './components/form-validators/form-validators.component';
import { ConfirmComponent } from './components/menu/confirm/confirm.component';
import { AtividadesPendentesComponent } from './template/home-dashboard/atividades-pendentes/atividades-pendentes.component';
import { UploadFileComponent } from './components/file/upload-file/upload-file.component';
import { TableEditExpansionComponent } from './components/tables/table-edit-expansion/table-edit-expansion.component';
import { TableEditDetailedComponent } from './components/tables/table-edit-expansion/table-edit-detailed/table-edit-detailed.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MessageModule,
    MessagesModule,
    NgbModule,
    PaginatorModule,
    PanelMenuModule,
    TieredMenuModule,
    TabMenuModule,
    TooltipModule,
    ToastrModule.forRoot(),
    ToastModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputMaskModule,
    TabViewModule,
    RadioButtonModule,
    TableModule,
    CustomerRoutingModule,
    DialogModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    FileUploadModule,
    AutoCompleteModule,
    ChipsModule,
    CheckboxModule,
    ListboxModule,
    MultiSelectModule,
    ToggleButtonModule,
    SelectButtonModule,
    InputTextareaModule,
    AccordionModule,
    StepsModule,
    TreeTableModule,
    SplitButtonModule,
    PasswordModule,
    TimelineModule,
    MenuModule,
    TagModule,
    ChartModule,
    DataViewModule,
    InputSwitchModule,
    KnobModule,
    SliderModule,
    SharedModule
  ],
  declarations: [
    MessagesComponent,
    TooltipComponent,
    AccordionComponent,
    TreeTableComponent,
    TableComponent,
    ProductDetailedComponent,
    InputComponent,
    AutoCompleteComponent,
    CalendarComponent,
    ChipsComponent,
    RadioButtonComponent,
    CheckBoxComponent,
    ListBoxComponent,
    DropdownComponent,
    MultiselectComponent,
    ToggleButtonComponent,
    SelectButtonComponent,
    ButtonTypesComponent,
    SplitButtonComponent,
    FormComponent,
    ButtonsComponent,
    DialogComponent,
    OverlayComponent,
    TimelineComponent,
    CrudComponent,
    TableStateComponent,
    BarChartComponent,
    ChartsComponent,
    TabviewComponent,
    PanelComponent,
    DoughnutChartComponent,
    LineChartComponent,
    PolarAreaComponent,
    PieChartComponent,
    RadarChartComponent,
    ComboChartComponent,
    TableRowExpandedComponent,
    StepsCadastroComponent,
    StepsConsultaComponent,
    TableVerticalComponent,
    ResponsiveTableComponent,
    StepsConsultaResultadoComponent,
    FilterTableComponent,
    KnobComponent,
    HomeBasicComponent,
    HomeDashboardComponent,
    TableInlineChartComponent,
    FilterServiceComponent,
    SliderComponent,
    FormValidatorsComponent,
    ConfirmComponent,
    AtividadesPendentesComponent,
    UploadFileComponent,
    TableEditExpansionComponent,
    TableEditDetailedComponent
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CustomerModule { }
