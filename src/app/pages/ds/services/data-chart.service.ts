import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { DadosGrafico } from '../interfaces/DadosGrafico';

@Injectable({
  providedIn: 'root'
})
export class DataChartService {

  constructor(
    private http: HttpClient
  ) { }

  getDataChart1(): Observable<{data: DadosGrafico}> {
    return this.http.get<{data: DadosGrafico}>('assets/data/dadosGrafico1.json')
      .pipe(
        // tap(console.log)
      )
  }

  getDataChart2(): Observable<{data: DadosGrafico}> {
    return this.http.get<{data: DadosGrafico}>('assets/data/dadosGrafico2.json')
      .pipe(
        // tap(console.log)
      )
  }

  getDataChart3(): Observable<{data: DadosGrafico}> {
    return this.http.get<{data: DadosGrafico}>('assets/data/dadosGrafico3.json')
      .pipe(
        // tap(console.log)
      )
  }
}

