import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError, Observable, of, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/config/config-service';
import { AppsConfig } from 'src/app/config/apps-config';


const headers = new HttpHeaders()
  .set('Content-Type', 'application/json');
const serverUrl  = environment.auth_api + '/authenticate';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  config: AppsConfig;

  constructor(private http: HttpClient, private configService: ConfigService) { }


  authenticate(data: any): Observable<any> {
    this.config = this.configService.readConfig();
    return this.http.post(this.config.auth_api + '/authenticate', data).pipe(
      tap((response: any) => {
        console.log("Auth: " + JSON.stringify(response));
      })
    );

  }
}
