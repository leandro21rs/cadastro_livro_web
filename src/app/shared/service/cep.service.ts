import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CepService {
  private cepApi = environment.cep_api;

  constructor(
    private http: HttpClient
  ) { }

  getCep(cep: string): Observable<FormGroup> {
    this.cepApi = `${this.cepApi}/${cep}/json`;
    return this.http.get<FormGroup>(this.cepApi);
  }

}
