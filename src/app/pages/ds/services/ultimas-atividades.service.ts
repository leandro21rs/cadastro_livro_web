import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AcessoUsuario } from '../interfaces/AcessoUsuario';
import { Apostilamento } from '../interfaces/Apostilamento';
import { Restituicao } from '../interfaces/Restituicao';
import { Observable } from 'rxjs';
// import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UltimasAtividadesService {

  constructor(
    private http: HttpClient
  ) { }

  getAcessoUsuario(): Observable<{data: AcessoUsuario[]}> {
    return this.http.get<{data: AcessoUsuario[]}>('assets/data/acessoUsuario.json')
      .pipe(
        // tap(console.log)
      )
  }

  getApostilamento(): Observable<{data: Apostilamento[]}> {
    return this.http.get<{data: Apostilamento[]}>('assets/data/apostilamento.json')
    .pipe(
      // tap(console.log)
    )
  }

  getRestituicao(): Observable<{data: Restituicao[]}> {
    return this.http.get<{data: Restituicao[]}>('assets/data/restituicao.json')
      .pipe(
        // tap(console.log)
      )
  }
}
