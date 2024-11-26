import { Injectable } from '@angular/core';
import { AppsConfig } from './apps-config';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configuration: AppsConfig;


  constructor(private http: HttpClient) { }

  setConfig(): Promise<AppsConfig> {
    return this.http.get<AppsConfig>('./assets/config/config.json')
      .toPromise()
      .then(config => this.configuration = config);
  }

  readConfig(): AppsConfig {
    return this.configuration;
  }

}
