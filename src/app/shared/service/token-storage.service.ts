import { Injectable, EventEmitter } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_SYSTEM_SSA = 'auth-system-ssa';
const USER_ACTIVE_PROFILE = 'auth-user-active-profile';
const MENUS = 'serv-menus';
const SYSTEM_NAME = 'system-name';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private static menusApp = new EventEmitter<any>();

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public isTokenExpired() {
    if (!this.getToken())
      return false;

    const expiry = this.getUser().expiry;
    const expration = new Date(expiry).getTime() / 1000;
    return (Math.floor((new Date).getTime() / 1000)) >= expration;
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  // Implementação de Sistemas/Perfil
  public saveSystemSSA(systemSSA: any) {
    window.sessionStorage.removeItem(USER_SYSTEM_SSA);
    window.sessionStorage.setItem(USER_SYSTEM_SSA, JSON.stringify(systemSSA));
  }

  public getSystemSSA() {
    return JSON.parse(window.sessionStorage.getItem(USER_SYSTEM_SSA));
  }

  public saveActiveProfile(profileSSA: any) {
    window.sessionStorage.removeItem(USER_ACTIVE_PROFILE);
    window.sessionStorage.setItem(USER_ACTIVE_PROFILE, JSON.stringify(profileSSA));
  }

  public getActiveProfile() {
    return JSON.parse(window.sessionStorage.getItem(USER_ACTIVE_PROFILE));
  }

  public saveMenus(menus: any) {
    window.sessionStorage.removeItem(MENUS);
    window.sessionStorage.setItem(MENUS, JSON.stringify(menus));
  }

  public getMenus() {
    return JSON.parse(window.sessionStorage.getItem(MENUS));
  }

}
