import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../interfaces/Customer';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-table-vertical',
  templateUrl: './table-vertical.component.html',
  styleUrls: ['./table-vertical.component.css']
})
export class TableVerticalComponent implements OnInit {
  customers: Customer[];

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerService.getCustomersMedium().subscribe({
      next: (res) => {
        const { data } = res;
        this.customers = data;
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });
  }

}
