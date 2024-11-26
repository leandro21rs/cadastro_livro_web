import { Injectable } from '@angular/core';

import { AuditoriaDTO } from '../../beneficio/model/auditoria-dto';
import { BeneficioDTO } from '../../beneficio/model/beneficio-dto';

@Injectable()
export class TicketService {

    beneficioForm = {
        listas: {
            tiposBeneficios: [],
            beneficios: [],
            beneficiosConcomitantes: [],
            regimes: [],
            municipios: [],
            cnaes: [],
            taxas: [],
            condicoes: [],
            documentos: []
        },
        beneficio: {
            id: null,
            titulo: null,
            descricao: null,
            dataInicioVigencia: null,
            dataFimVigencia: null,
            ativo: null,
            legislacoes: [],
            indeterminado: null,
            change: false,
            exigencias: null,
            condicoes: null,
            historicos: null,
            auditoria: null,
            caracteristica: {
                id: null,
                cnaes: [],
                change: false,
                municipios: [],
                beneficios: [],
                caraterGeral: null,
                regimesApuracao: null,
                tiposBeneficios: [],
                isAlteraRegimeApuracao: null,
                naturezaEstabelecimento: null,
                localidadesBeneficiadas: null,
                beneficiosConcomitante: [],
                isPrejudicaFruicaoBeneficio: null,
                atvEconomicaCaraterExclusivo: null,
                mcLocalidades: null,
                mcAtvEconomica: null,
                isExerceAtvEconomicaEspecifica: null,
            },
            requisitos: {
                id: null,
                exigeTaxa: null,
                change: false,
                taxas: [],
                taxaDevida: null,
                exigeRegularidadeCastral: null,
                exigeRCSociosRequerente: null,
                exigeRegularidadeFiscal: null,
                exigeRFSociosRequerente: null,
                mcRegularidadeFiscal: null,
                mcRegularidadeCadastral: null,
                documentos: [],
                exigeAssinatura: null,
                exigeContribuinteSubstituto: null,
                condicoes: [],
                condicionantes: null,
                modeloTermo: null,
                fruicaoAntecipada: null,
                exigencias: [],
                requisitosDocumentos: []
            }
        },
        beneficioOld: {
            beneficioOld: new BeneficioDTO,
        },
        auditoria: {
            auditoria: new AuditoriaDTO,
        }
    };

    getTicketInformation() {
        return this.beneficioForm;
    }

    setTicketInformation(beneficioForm) {
        this.beneficioForm = beneficioForm;
    }

    // complete() {
    //      this.confirmacao.next(this.beneficioForm.beneficio);
    // }

    clean() {
        this.beneficioForm = null;
    }
}