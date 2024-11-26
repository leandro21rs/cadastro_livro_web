import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListarDadosPdfService {

  constructor(
    private http: HttpClient
  ) { }

  getRevavamValues(): Observable<{data: any}> {
    return this.http.get<{data: any}>('assets/data/renavam.json')
    .pipe(
      // tap(console.log)
    )
  }

  getTotalRevavam(): Observable<{data: any}> {
    return this.http.get<{data: any}>('assets/data/totalRenavam.json')
    .pipe(
      // tap(console.log)
    )
  }
}
