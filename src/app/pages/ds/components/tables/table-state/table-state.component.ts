import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SuperComponent } from 'src/app/core/components/super-component';

import { Customer } from '../../../interfaces/Customer';

import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-table-state',
  templateUrl: './table-state.component.html',
  styleUrls: ['./table-state.component.css']
})
export class TableStateComponent extends SuperComponent {
  customers1: Customer[] = [];

  selectedCustomer1: Customer;

  constructor(
    private customerService: CustomerService,
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit() {
    let statusType = [];
    this.customerService.getCustomersMedium().subscribe({
      next: (res) => {
        const { data } = res;
        
        if (data.length > 0) {

          data?.map((valor) => {
            let obj = {};
  
            switch (valor?.status) {
              case "qualified":
                obj = { ...valor, "tagType": "success" }
                break;
              case "unqualified":
                obj = { ...valor, "tagType": "danger" }
                break;
              case "negotiation":
                obj = { ...valor, "tagType": "warning" }
                break;
              case "renewal":
                obj = { ...valor, "tagType": "primary" }
                break;
              case "new":
                obj = { ...valor, "tagType": "info" }
                break;
              default:
                obj = { ...valor, "tagType": "info" }
            }
  
            statusType.push(obj);
          })
  
          this.customers1 = statusType;
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.renderer.addClass(document.body, 'table-state');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'table-state');
  }
}
