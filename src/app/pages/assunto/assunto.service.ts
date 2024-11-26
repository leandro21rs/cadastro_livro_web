import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Assunto} from './assunto-model';



@Injectable({
  providedIn: 'root',
})
export class AssuntoService {
    private baseUrl = environment.auth_api+'assuntos'; 
    private username = environment.username;
    private password = environment.password;

    constructor(private http: HttpClient) {}

    private createHeaders(): HttpHeaders {
        const credentials = btoa(`${this.username}:${this.password}`);
        return new HttpHeaders({
            Authorization: `Basic ${credentials}`,
        });
    }

  // Obter todos os assuntos
  findAll(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.baseUrl, {
        headers: this.createHeaders(),
    });
  }

  // Obter assunto por ID
  findById(id: number): Observable<Assunto> {
    return this.http.get<Assunto>(`${this.baseUrl}/${id}`, {
        headers: this.createHeaders(),
    });
  }

  // Salvar novo assunto
  save(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.baseUrl, assunto, {
        headers: this.createHeaders(),
    });
  }

  // Atualizar assunto
  update(id: number, assunto: Assunto): Observable<Assunto> {
    return this.http.put<Assunto>(`${this.baseUrl}/${id}`, assunto, {
        headers: this.createHeaders(),
    });
  }

  // Deletar assunto
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
        headers: this.createHeaders(),
    });
  }
}
