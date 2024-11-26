import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gre } from '../interfaces/Gre';
import { Pagamento } from '../interfaces/Pagamento';
import { Observable } from 'rxjs';
// import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoDashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getGresEmVencimento(): Observable<{data: Gre[]}> {
    return this.http.get<{data: Gre[]}>('assets/data/gresEmVencimento.json')
    .pipe(
      // tap(console.log)
    )
  }

  getGresPagas(): Observable<{data: Gre[]}> {
    return this.http.get<{data: Gre[]}>('assets/data/gresPagas.json')
    .pipe(
      // tap(console.log)
    )
  }

  getPrevFaturamento(): Observable<{data: Pagamento[]}> {
    return this.http.get<{data: Pagamento[]}>('assets/data/prevFaturamento.json')
      .pipe(
        // tap(console.log)
      )
  }

  getPagamentosConf(): Observable<{data: Pagamento[]}> {
    return this.http.get<{data: Pagamento[]}>('assets/data/pagamentosConf.json')
      .pipe(
        // tap(console.log)
      )
  }
}
