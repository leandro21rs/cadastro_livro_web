import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Autor} from './autor-model';



@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private baseUrl = environment.auth_api+'autores';
  private username = environment.username;
  private password = environment.password;

  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    const credentials = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
        Authorization: `Basic ${credentials}`,
    });
}

  // Obter todos os autores
  findAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.baseUrl, {
        headers: this.createHeaders(),
    });
  }

  // Obter autor por ID
  findById(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.baseUrl}/${id}`, {
        headers: this.createHeaders(),
    });
  }

  // Salvar novo autor
  save(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.baseUrl, autor, {
        headers: this.createHeaders(),
    });
  }

  // Atualizar autor
  update(id: number, autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.baseUrl}/${id}`, autor, {
        headers: this.createHeaders(),
    });
  }

  // Deletar autor
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
        headers: this.createHeaders(),
    });
  }
}
