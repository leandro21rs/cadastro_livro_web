import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  messages = [
    { codigo: 'MSG0001', message: 'Nenhum registro encontrado' },
    { codigo: 'MSG0002', message: 'Campo obrigatório não preenchido' },
    { codigo: 'MSG0003', message: 'Registro inserido com sucesso' },
    { codigo: 'MSG0004', message: 'Erro na gravação do registro' },
    { codigo: 'MSG0005', message: 'Favor preencher os campos corretamente' }
  ];

  /**
   * Método responsável por montar uma mensagem de notificação
   * @param codigoMensgem 
   * @returns 
   */
  public getMensagem(codigoMensgem: string): string {
    let retorno: string;
    this.messages.filter(item => {
      if (item.codigo === codigoMensgem) {
        retorno = item.message;
      }
    });
    return retorno;
  }
}
