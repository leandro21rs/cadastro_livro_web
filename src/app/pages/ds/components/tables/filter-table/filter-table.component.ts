import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../interfaces/Customer';
import { Representative } from '../../../interfaces/Representative';
import { Renderer2 } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent extends SuperComponent {

  customers: Customer[];

  representatives: Representative[];

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(
    private customerService: CustomerService,
    private renderer: Renderer2,
    protected modalService: NgbModal,
    protected router: Router 
  ) {
    super(modalService, router)
  }

  ngOnInit() {
    this.customerService.getCustomersLarge().subscribe({
      next: (res) => {
        const { data } = res;
        this.customers = data;
        this.loading = false;

        this.customers.forEach(
          customer => (customer.date = new Date(customer.date))
        );
      },
      error: (err) => {
        console.log('err: ', err);
      }
    });

    this.representatives = [
      { name: "Amy Elsner", image: "amyelsner.png" },
      { name: "Anna Fali", image: "annafali.png" },
      { name: "Asiya Javayant", image: "asiyajavayant.png" },
      { name: "Bernardo Dominic", image: "bernardodominic.png" },
      { name: "Elwin Sharvill", image: "elwinsharvill.png" },
      { name: "Ioni Bowcher", image: "ionibowcher.png" },
      { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      { name: "Onyama Limba", image: "onyamalimba.png" },
      { name: "Stephen Shaw", image: "stephenshaw.png" },
      { name: "XuXue Feng", image: "xuxuefeng.png" }
    ];

    this.statuses = [
      { label: "Unqualified", value: "unqualified", badge: 'danger' },
      { label: "Qualified", value: "qualified", badge: 'success' },
      { label: "New", value: "new", badge: 'primary' },
      { label: "Negotiation", value: "negotiation", badge: 'warning' },
      { label: "Renewal", value: "renewal", badge: 'secondary' },
      { label: "Proposal", value: "proposal", badge: 'warning' }
    ];

    this.renderer.addClass(document.body, 'table-filter');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'table-filter');
  }
}
