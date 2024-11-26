import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class BodyClassNameService {

  constructor(
    private titleService: Title
  ) { }

  getBodyClassName() {
    let nome = '';

    if(this.titleService.getTitle().length > 0){
      nome = this.titleService.getTitle();
      nome = (nome.normalize('NFD').toLowerCase().split(" -")[0]);
      nome = nome.replace(/[\u0300-\u036f]/g, "");
      nome = nome.split(" ").join("-");
      if(nome == 'design-system'){
        nome = '';
      }
    } else {
      nome = '';
    }

    return nome;
  }
}
