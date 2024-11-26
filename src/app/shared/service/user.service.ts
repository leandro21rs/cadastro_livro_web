import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppsConfig } from 'src/app/config/apps-config';
import { ConfigService } from 'src/app/config/config-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  config: AppsConfig;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.config = this.configService.readConfig();
   }

  getPublicContent(): Observable<any> {
    return this.http.get(this.config.auth_api + '/funcionalidades/publico', { responseType: 'text' });
  }

  getFuncionalidadeBasica(): Observable<any> {
    return this.http.get(this.config.auth_api + '/funcionalidades/basica', { responseType: 'text' });
  }

  getFuncionalidade1(): Observable<any> {
    return this.http.get(this.config.auth_api + '/funcionalidades/funcionalidade1', { responseType: 'text' });
  }

  getFuncionalidade2(): Observable<any> {
    return this.http.get(this.config.auth_api + '/funcionalidades/funcionalidade2', { responseType: 'text' });
  }

  getFuncionalidade3(): Observable<any> {
    return this.http.get(this.config.auth_api + '/funcionalidades/funcionalidade3', { responseType: 'text' });
  }

  getFuncionalidadeDiretoria(): Observable<any> {
    return this.http.get(this.config.auth_api + '/funcionalidades/diretoria', { responseType: 'text' });
  }

  getSistemasPerfis(): Observable<any> {
    return this.http.get<any>('assets/data/sistemasPerfis.json', { responseType: 'json' });
  }
}
