import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RadioValue } from '../interfaces/RadioValue';


@Injectable({
  providedIn: 'root'
})
export class RadioValuesService {
  constructor(private http: HttpClient) { }

  getRadioValues(): Observable<{data: RadioValue[]}> {
    return this.http.get<{data: RadioValue[]}>('assets/data/radio-values.json')
      .pipe(
        // tap(console.log)
      )
  }
}