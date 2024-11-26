

export class AuditoriaDTO {
    id: number;
    dados: string;
    secoes: string;
    filtro: string;
    usuario: string;
    idOrigem: Number;
    dataCriacao: Date;
    dataFiltro: string;

    constructor() {
        this.id = null;
        this.dados = null;
        this.secoes = null;
        this.filtro = null;
        this.usuario = null;
        this.idOrigem = null;
        this.dataFiltro = null;
        this.dataCriacao = null;
    }
}