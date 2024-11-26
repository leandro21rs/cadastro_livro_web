import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TooltipComponent } from './components/overlay/tooltip/tooltip.component';
import { AccordionComponent } from './components/panel/accordion/accordion.component';
import { TreeTableComponent } from './components/tables/tree-table/tree-table.component';
import { TableComponent } from './components/tables/table/table.component';
import { ProductDetailedComponent } from './components/tables/table/product-detailed/product-detailed.component';
import { TimelineComponent } from './components/dados/timeline/timeline.component';
import { CrudComponent } from './components/tables/crud/crud.component';
import { TableStateComponent } from './components/tables/table-state/table-state.component';
import { ChartsComponent } from './components/charts/charts.component';
import { TabviewComponent } from './components/panel/tabview/tabview.component';
import { globals } from 'src/environments/globals';
import { TableRowExpandedComponent } from './components/tables/table-row-expanded/table-row-expanded.component';
import { StepsCadastroComponent } from './components/menu/steps-cadastro/steps-cadastro.component';
import { StepsConsultaComponent } from './components/menu/steps-consulta/steps-consulta.component';
import { ResponsiveTableComponent } from './components/tables/responsive-table/responsive-table.component';
import { StepsConsultaResultadoComponent } from './components/menu/steps-consulta-resultado/steps-consulta-resultado.component';
import { FilterTableComponent } from './components/tables/filter-table/filter-table.component';
import { SplitButtonComponent } from './components/buttons/split-button/split-button.component';
import { ButtonTypesComponent } from './components/buttons/button-types/button-types.component';
import { AutoCompleteComponent } from './components/form/auto-complete/auto-complete.component';
import { CalendarComponent } from './components/form/calendar/calendar.component';
import { CheckBoxComponent } from './components/form/check-box/check-box.component';
import { ChipsComponent } from './components/form/chips/chips.component';
import { DropdownComponent } from './components/form/dropdown/dropdown.component';
import { InputComponent } from './components/form/input/input.component';
import { ListBoxComponent } from './components/form/list-box/list-box.component';
import { MultiselectComponent } from './components/form/multiselect/multiselect.component';
import { RadioButtonComponent } from './components/form/radio-button/radio-button.component';
import { SelectButtonComponent } from './components/form/select-button/select-button.component';
import { ToggleButtonComponent } from './components/form/toggle-button/toggle-button.component';
import { MessagesComponent } from './components/mensagens/messages/messages.component';
import { DialogComponent } from './components/overlay/dialog/dialog.component';
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

@Injectable({ providedIn: 'root' })
export class ClienteResolve {

  constructor() { }
}

const nomeSistema = globals.systemName;
const routes: Routes = [
  {
    path: 'form/formValidators',
    component: FormValidatorsComponent
  },
  {
    path: 'component/messages',
    component: MessagesComponent
  },
  {
    path: 'component/tooltip',
    component: TooltipComponent
  },
  {
    path: 'form/slider',
    component: SliderComponent
  },
  {
    path: 'form/knob',
    component: KnobComponent
  },
  {
    path: 'template/steps-consulta',
    component: StepsConsultaComponent
  },
  {
    path: 'table/tree',
    component: TreeTableComponent
  },
  {
    path: 'template/table',
    component: TableComponent
  },
  {
    path: 'component/product/:id',
    component: ProductDetailedComponent
  },
  {
    path: 'form/autocomplete',
    component: AutoCompleteComponent
  },
  {
    path: 'form/calendar',
    component: CalendarComponent
  },
  {
    path: 'form/checkbox',
    component: CheckBoxComponent
  },
  {
    path: 'form/chips',
    component: ChipsComponent
  },
  {
    path: 'form/dropdown',
    component: DropdownComponent
  },
  {
    path: 'form/input',
    component: InputComponent
  },
  {
    path: 'form/listbox',
    component: ListBoxComponent
  },
  {
    path: 'form/multiselect',
    component: MultiselectComponent
  },
  {
    path: 'form/radiobutton',
    component: RadioButtonComponent
  },
  {
    path: 'form/selectbutton',
    component: SelectButtonComponent
  },
  {
    path: 'form/togglebutton',
    component: ToggleButtonComponent
  },
  {
    path: 'component/button',
    component: ButtonTypesComponent
  },
  {
    path: 'component/buttonsplit',
    component: SplitButtonComponent
  },
  {
    path: 'component/timeline',
    component: TimelineComponent
  },
  {
    path: 'utilities/filter-service',
    component: FilterServiceComponent
  },
  {
    path: 'table/filter',
    component: FilterTableComponent
  },
  {
    path: 'template/crud',
    component: CrudComponent
  },
  {
    path: 'table/state',
    component: TableStateComponent
  },
  {
    path: 'component/charts',
    component: ChartsComponent
  },
  {
    path: 'component/dialog',
    component: DialogComponent
  },
  {
    path: 'component/tabview',
    component: TabviewComponent
  },
  {
    path: 'component/accordion',
    component: AccordionComponent
  },
  {
    path: 'table/inline-chart',
    component: TableInlineChartComponent
  },
  {
    path: 'table/responsive',
    component: ResponsiveTableComponent
  },
  // {
  //   path: 'component/scroll-vertical-table',
  //   component: TableVerticalComponent
  // },
  {
    path: 'template/table-row-expansion',
    component: TableRowExpandedComponent
  },
  {
    path: 'template/table-row-expansion-edit',
    component: TableEditExpansionComponent
  },
  // {
  //   path: 'template/steps-pesquisa',
  //   component: StepsPesquisaComponent
  // },
  {
    path: 'template/steps-cadastro',
    component: StepsCadastroComponent
  },
  {
    path: 'template/steps-consulta-resultado',
    component: StepsConsultaResultadoComponent
  },
  {
    path: 'template/confirmacao',
    component: ConfirmComponent 
  },
  {
    path: 'template/table-row-expansion-edit',
    component: TableEditExpansionComponent
  },
  {
    path: 'template/table-expansion-edit/:id',
    component: TableEditDetailedComponent
  },
  { 
    path: 'template/homebasic',
    component: HomeBasicComponent
  },
  {
    path: 'template/homedashboard',
    component: HomeDashboardComponent
  },
  {
    path: 'template/pending-activities',
    component: AtividadesPendentesComponent
  },
  {
    path: 'file/upload',
    component: UploadFileComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
