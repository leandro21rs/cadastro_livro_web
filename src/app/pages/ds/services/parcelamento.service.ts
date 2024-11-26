import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parcelamento } from '../interfaces/Parcelamento';
import { InfoSelecaoGuias } from '../interfaces/InfoSelecaoGuia';
import { GuiaDeclaracao } from '../interfaces/GuiaDeclaracao';
import { ResponsavelParcelamento } from '../interfaces/ResponsavelParcelamento';
import { InfosParcelamento } from '../interfaces/InfosParcelamento';
import { NumParcela } from '../interfaces/NumParcela';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelamentoService {

  constructor(
    private http: HttpClient
  ) { }

  getTiposParcelamento(): Observable<{data: Parcelamento[]}> {
    return this.http.get<{data: Parcelamento[]}>('assets/data/tiposParcelamento.json')
      .pipe(
        // tap(console.log)
      )
  }

  getInfoSelecaoGuias(): Observable<{data: InfoSelecaoGuias}> {
    return this.http.get<{data: InfoSelecaoGuias}>('assets/data/infoSelecaoGuias.json')
      .pipe(
        // tap(console.log)
      );
  }

  getGuiasDeclaracao(): Observable<{data: GuiaDeclaracao[]}> {
    return this.http.get<{data: GuiaDeclaracao[]}>('assets/data/guiasDeclaracao.json')
      .pipe(
        // tap(console.log)
      )
  }

  getResponsavelParcelamento(): Observable<{data: ResponsavelParcelamento[]}> {
    return this.http.get<{data: ResponsavelParcelamento[]}>('assets/data/responsavelParcelamento.json')
    .pipe(
      // tap(console.log)
    )
  }

  getInfosParcelamento(): Observable<{data: InfosParcelamento[]}> {
    return this.http.get<{data: InfosParcelamento[]}>('assets/data/infosParcelamento.json')
    .pipe(
      // tap(console.log)
    )
  }

  getNumParcelas(): Observable<{data: NumParcela[]}> {
    return this.http.get<{data: NumParcela[]}>('assets/data/numParcelas.json')
    .pipe(
      // tap(console.log)
    )
  }
}
