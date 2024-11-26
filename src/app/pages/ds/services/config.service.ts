import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from '../interfaces/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  config: AppConfig = {
    theme: 'lara-light-blue',
    dark: false,
    inputStyle: 'outlined'
  };

  private configUpdate = new Subject<AppConfig>();

  configUpdate$ = this.configUpdate.asObservable();

  updateConfig(config: AppConfig) {
    this.config = config;
    this.configUpdate.next(config);
  }

  getConfig() {
    return this.config;
  }
}
