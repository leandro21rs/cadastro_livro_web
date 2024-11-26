import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {Livro, LivroDTO } from './livros-model';



@Injectable({
    providedIn: 'root'
})
export class LivrosService {

    private baseUrl = environment.auth_api+'livros';
    private username = environment.username;
    private password = environment.password;

    constructor(private http: HttpClient) {}

    private createHeaders(): HttpHeaders {
        const credentials = btoa(`${this.username}:${this.password}`);
        return new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        });
    }

    // Obter todos os livros
    findAll(): Observable<Livro[]> {
        return this.http.get<Livro[]>(this.baseUrl, {
        headers: this.createHeaders(),
        withCredentials: true,
    });
    }

    // Obter livro por ID
    findById(id: number): Observable<Livro> {
        return this.http.get<Livro>(`${this.baseUrl}/${id}`, {
            headers: this.createHeaders(),
            withCredentials: true,
        });
    }

    // Atualizar livro
    atualizarLivro(id: number, livroDTO: LivroDTO): Observable<Livro> {
        return this.http.put<Livro>(`${this.baseUrl}/${id}`, livroDTO, {
            headers: this.createHeaders(),
            withCredentials: true,
        });
    }

    // Deletar livro por ID
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`, {
            headers: this.createHeaders(),
            withCredentials: true,
        });
    }

    // Salvar novo livro
    salvarLivro(livroDTO: LivroDTO): Observable<Livro> {
        return this.http.post<Livro>(this.baseUrl, livroDTO, {
            headers: this.createHeaders(),
            withCredentials: true,
        });
    }
}
