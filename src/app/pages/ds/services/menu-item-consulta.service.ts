import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MenuItemConsultaService {
  items: MenuItem[];
  activeIndex: number = 0;

  constructor() { }

  getMenuItemFull() {
    this.items = [
      {
        label: 'Consultar',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Responsável',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Confirmação',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];

    return this.items;
  }

  getMenuItemPF() {
    this.items = [
      {
        label: 'Consultar',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Pessoa responsável',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Confirmação',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];

    return this.items;
  }

  getMenuItemPJ() {
    this.items = [
      {
        label: 'Consultar',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Empresa responsável',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Confirmação',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];

    return this.items;
  }
}
