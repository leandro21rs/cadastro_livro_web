import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../interfaces/Car';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCarsMedium(): Observable<{data: Car[]}> {
      return this.http.get<{data: Car[]}>('assets/data/cars-medium.json')
      .pipe(
        // tap(console.log)
      )
  }
}
