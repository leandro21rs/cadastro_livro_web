import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Customer } from '../interfaces/Customer';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomersMedium(): Observable<{data: Customer[]}> {
    return this.http.get<{data: Customer[]}>('assets/data/customers-medium.json')
      .pipe(
        // tap(console.log)
      )
  }

  getCustomersLarge(): Observable<{data: Customer[]}> {
    return this.http.get<{data: Customer[]}>('assets/data/customers-large.json')
      .pipe(
        // tap(console.log)
      )
}
}
