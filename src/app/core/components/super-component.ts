import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Message } from 'primeng/api';
import { AuditoriaDTO } from 'src/app/shared/model/auditoria-dto';

@Component({
    selector: 'app-usuario',
    template: ''
})
export class SuperComponent implements OnInit {

    closeResult: string;
    isEdicao: boolean;
    modalReference: NgbModalRef;
    auditoria: AuditoriaDTO;
    msgs: Message[];

    constructor(
        protected modalService: NgbModal,
        protected router: Router
    ) {
        this.isEdicao = false;
    }

    /**
     * Método responsável pela inicialização
     */
    ngOnInit(): void {
    }

    /**
     * Método responsável por montar mensagens de notificação
     * @param severity
     * @param detail
     */
    notificacao(severity: string, detail: string) {
        //error - para erros
        //success - para quando for salvo com sucesso
        //warn - para exibir alguma mensagem de atenção
        //info - para nofificar alguma informação para usuário
        this.msgs = [];
        this.msgs.push({ severity: severity, detail: detail });
    }

    /**
     * Método responsável por limpar as mensagens
     */
    clearNotificacao() {
        this.msgs = [];
    }

    /**
     * Método responsável por abrir um modal de tamanho padrão
     * @param content
     */
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    /**
     * Método responsável por abrir um modal grande
     * @param content
     */
    openLg(content) {
        this.modalReference = this.modalService.open(content, { size: 'lg' });
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    /**
     * Método responsável por abrir um modal extra grande
     * @param content
     */
    openXl(content) {
        this.modalReference = this.modalService.open(content, { size: 'xl' });
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    /**
     * Método responsável por identificar como o modal foi fechado
     * @param reason
     * @returns
     */
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    /**
     * Método responsável pela navegação entre páginas
     * @param url
     */
    public navigate(url: string) {
        this.router.navigate([`/${url}`]);
    }

    /**
     * Método responsável pela navegação entre páginas
     * @param url
     * @param id
     * @param edicao
     */
    public navigateParams(url: string, id: number) {
        this.router.navigate([`/${url}`, id], { queryParams: { id } });
    }

    /**
     * Método responsável por fechar um modal
     */
    public close() {
        this.modalService.dismissAll();
    }
}
