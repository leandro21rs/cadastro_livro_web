import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Renderer2 } from '@angular/core';
import { MenuItemConsultaService } from '../../../services/menu-item-consulta.service';
import { Router } from '@angular/router';
import { SuperComponent } from 'src/app/core/components/super-component';

@Component({
  selector: 'app-steps-consulta',
  templateUrl: './steps-consulta.component.html',
  styleUrls: ['./steps-consulta.component.css']
})
export class StepsConsultaComponent extends SuperComponent {
  items: MenuItem[];
  activeIndex: number = 0;
  personTypes: any[] = [{ name: 'Pessoa Física', key: 1 }, { name: 'Pessoa Jurídica', key: 2 }];
  selectedPersonType: any = null;
  personTypeKey: number = 1;

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2,
    private menuItemConsultaService: MenuItemConsultaService 
  ) { 
    super(modalService, router)
  }

  ngOnInit(): void {
    this.items = this.menuItemConsultaService.getMenuItemFull();
    this.renderer.addClass(document.body, 'steps-consulta');
  }

  nextPage() {
    if(this.activeIndex == 0){
      if(this.selectedPersonType){
        if(this.selectedPersonType.key == 1){
          this.personTypeKey = 1;
          this.items = this.menuItemConsultaService.getMenuItemPF();
        } else {
          this.personTypeKey = 2;
          this.items = this.menuItemConsultaService.getMenuItemPJ();
        }
      } else{
        this.items = this.menuItemConsultaService.getMenuItemFull();
      }
      this.activeIndex = 1;
    } else if(this.activeIndex == 1){
      this.activeIndex = 2;
    }
  }

  prevPage() {
    if(this.activeIndex == 1){
      this.activeIndex = 0;
      this.items = this.menuItemConsultaService.getMenuItemFull();
    } else if(this.activeIndex == 2){
      this.activeIndex = 1;
    }
  }

  complete() {
    this.activeIndex = 0;
    this.items = this.menuItemConsultaService.getMenuItemFull();
    this.selectedPersonType = null;
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'steps-consulta');
  }
}
