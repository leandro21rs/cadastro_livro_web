import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Injectable()
export class NodeService {

  constructor(private http: HttpClient) { }

  getCondicoes() {
    return this.http.get<any>('assets/data/condicoes.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }

  getMunicipios() {
    return this.http.get<any>('assets/data/municipios.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }

  getCNAE() {
    return this.http.get<any>('assets/data/cnae.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }
}
