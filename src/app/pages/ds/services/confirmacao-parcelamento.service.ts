import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GuiasParceladas } from '../interfaces/GuiasParceladas';
import { Parcela } from '../interfaces/Parcela';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoParcelamentoService {

  constructor(
    private http: HttpClient
  ) { }

  getGuiasParceladas(): Observable<{data: GuiasParceladas[]}> {
    return this.http.get<{data: GuiasParceladas[]}>('assets/data/guiasParceladas.json')
    .pipe(
      // tap(console.log)
    )
  }

  getParcelas(): Observable<{data: Parcela[]}> {
    return this.http.get<{data: Parcela[]}>('assets/data/parcelas.json')
    .pipe(
      // tap(console.log)
    )
  }

  getDadosParcelamento(): Observable<{data: any}> {
    return this.http.get<{data: any}>('assets/data/dadosParcelamento.json')
      .pipe(
        // tap(console.log)
      )
  }
}
