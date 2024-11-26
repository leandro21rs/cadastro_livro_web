import { Injectable } from '@angular/core';

/**
 * Serviço de armazenamento em sessionStorage de dados de retorno de ações do usúario.
 * Exemplo: retorno de busca, filtro de busca, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class PesquisaStorageService {

  private storage: Storage;

  /**
   * @ignore
   */
  constructor() {
    this.storage = window.sessionStorage;
  }

  /**
   * Salva os dados na sessionStorage
   * @param key  Nome atribuido ao conjunto de dados a serem armazenados
   * @param value  Conjunto de dados ou objeto a ser armazenado
   */
  set(key: string, value: any) {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  get(key: string) {
    if (this.storage && this.storage.getItem(key) !== null) {
      return JSON.parse(this.storage.getItem(key));
    } else {
      return null;
    }
  }

  remove(key: string) {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    } else {
      return false;
    }
  }

  clear() {
    this.storage.clear()
  }

}
