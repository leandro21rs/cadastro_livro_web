import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResultMessage } from 'src/app/pages/ds/interfaces/ResultMessage';
import { ConfirmacaoParcelamentoService } from 'src/app/pages/ds/services/confirmacao-parcelamento.service';
import { GuiasParceladas } from 'src/app/pages/ds/interfaces/GuiasParceladas';
import { Parcela } from 'src/app/pages/ds/interfaces/Parcela';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import imgJson from '../../../../../../assets/images/img.json';
import { ListarDadosPdfService } from 'src/app/pages/ds/services/listar-dados-pdf.service';
import { Router } from '@angular/router';
import { ParcelamentoService } from 'src/app/pages/ds/services/parcelamento.service';
import { InfoSelecaoGuias } from 'src/app/pages/ds/interfaces/InfoSelecaoGuia';
import { DadosParcelamento } from 'src/app/pages/ds/interfaces/DadosParcelamento';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @ViewChild('main') el!: ElementRef;
  msg: Array<ResultMessage>;
  guias: Array<GuiasParceladas>;
  parcelas: Array<Parcela>;
  body: Array<any> = [];
  body2: Array<any> = [];
  infoSelecaoGuias: InfoSelecaoGuias = {
    numDeclaracao: '',
    natureza: '',
    dataInventario: '',
    situacao: '',
    transmitente: '',
    dataNascimento: '',
    dataObito: '',
    estadoCivil: '',
    regime: '',
    dataUniao: ''
  };
  dadosParcelamento: DadosParcelamento = {
    nParcelanento: '',
    requerente: '',
    responsavel: '',
    nDeclaracao: '',
    tipo: '',
    parcelas: 0,
    valorParcela: 0,
    totalParcelado: 0
  };

  constructor(
    private confirmacaoParcelamentoService: ConfirmacaoParcelamentoService,
    private listarDadosPdfService: ListarDadosPdfService,
    private router: Router,
    private parcelamentoService: ParcelamentoService
  ) { }

  ngOnInit(): void {
    this.msg = [{ severity: 'success', summary: '', detail: 'Parcelamento n° 2021.000840-1 deferido com sucesso!' }];

    this.confirmacaoParcelamentoService.getGuiasParceladas().subscribe({
      next: (res) => {
        const { data } = res;
        this.guias = data;
      },
      error: (err) => {
        console.log("err: ", err);
      }
    }
      
      //data => this.guias = data
    
    );
    this.confirmacaoParcelamentoService.getParcelas().subscribe({
      next: (res) => {
        const { data } = res;
        this.parcelas = data;
      },
      error: (err) => {
        console.log("err: ", err);
      }
    });
    this.confirmacaoParcelamentoService.getDadosParcelamento().subscribe({
      next: (res) => {
        const { data } = res;
        this.dadosParcelamento = data[0];
      }, 
      error: (err) => {
        console.log('err: ', err);
      }
    });

    this.parcelamentoService.getInfoSelecaoGuias().subscribe({
      next: (res) => {
        const { data } = res;
        this.infoSelecaoGuias = data[0];
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.listarDadosPdfService.getRevavamValues().subscribe({
      next: (res) => {
        const { data } = res;
        if (data) {
          for (let val of data) {
            const rows = new Array();
  
            rows.push({ text: `${val.exercicio}`, style: 'cellCenter' });
            rows.push({ text: `${val.valor}`, style: 'cellCenter' });
            rows.push({ text: `${val.multa}`, style: 'cellCenter' });
            rows.push({ text: `${val.juros}`, style: 'cellCenter' });
            rows.push({ text: `${val.total}`, style: 'cellCenter' });
  
  
            this.body.push(rows);
          }
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });


    this.listarDadosPdfService.getTotalRevavam().subscribe({
      next: (res) => {
        const { data } = res;
        if (data) {
          for (let val of data) {
            const rows = new Array();
  
            rows.push({ text: ``, style: 'cellCenter' });
            rows.push({ text: `${val.totalOriginal}`, style: 'cellCenter' });
            rows.push({ text: `${val.totalMulta}`, style: 'cellCenter' });
            rows.push({ text: `${val.totalJuros}`, style: 'cellCenter' });
            rows.push({ text: `${val.totalParcelado}`, style: 'cellCenter' });
  
            this.body2.push(rows);
          }
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });
  }

  imprimir() {
    // estrutura do PDF
    const documentDefinition = {
      pageSize: {
        width: 595.28,
        height: 'auto'
      },
      content: [
        {
          style: 'header',
          columns: [
            {
              image: imgJson.logo,
              fit: [150, 150],
              alignment: 'left'
            },
            {
              text: 'Parcelamento de débito de IPVA', alignment: 'right', margin: [0, 8, 0, 0]
            },
          ]
        },
        { canvas: [{ type: 'line', x1: -1, y1: 0, x2: 515, y2: 0, lineWidth: 1, marginTop: 5 }] },
        {
          style: 'tableExample',
          table: {
            widths: [135, '*', '*'],
            body: [
              [
                { text: 'N° do parcelamento', color: 'black', bold: true, style: 'cellLeft' },
                { text: 'Requerente', style: 'cellLeft' },
                { text: 'Responsável pelo parcelamento', style: 'cellLeft' }
              ],
              [
                { text: '999-999-999', color: 'black', bold: true, style: 'cellLeft' },
                { text: 'Fulano da Silva Oliveira (999.999.999-99)', style: 'cellLeft' },
                { text: 'Fulano da Silva Oliveira (999.999.999-99)', style: 'cellLeft' }
              ]
            ]
          },
          layout: 'headerLineOnly',
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Nº do RENAVAM', style: 'cellLeft' },
                { text: 'Tipo de parcelamento', style: 'cellLeft' },
                { text: 'Parcelas', style: 'cellLeft' },
                { text: 'Valor da parcela', style: 'cellLeft' },
                { text: 'Total parcelado', style: 'cellLeft' }
              ],
              [
                { text: '99.999.99-9', style: 'cellLeft' },
                { text: 'Recupera IPVA 2021', style: 'cellLeft' },
                { text: '6', style: 'cellLeft' },
                { text: 'R$ 1.033,34', style: 'cellLeft' },
                { text: 'R$6.200,00', style: 'cellLeft' }
              ]
            ]
          },
          layout: 'headerLineOnly',
        },
        { canvas: [{ type: 'line', x1: -1, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
        { text: '', margin: [0, 0, 0, 20] },
        { text: 'RENAVAM 78.198-72-9', style: 'title' },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Exercício', bold: true, color: '#000', style: 'cellCenter' },
                { text: 'Valor original', bold: true, color: '#000', style: 'cellCenter' },
                { text: 'Multa', bold: true, color: '#000', style: 'cellCenter' },
                { text: 'Juros', bold: true, color: '#000', style: 'cellCenter' },
                { text: 'Total', bold: true, color: '#000', style: 'cellCenter' }
              ],
              ...this.body
            ]
          },
          // layout: 'headerLineOnly',
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
            hLineWidth: function (i, node) {
              return (i === 1) ? 1 : 0;
            },
            vLineWidth: function (i, node) {
              return 0;
            },
          }
        },
        { text: '', margin: [0, -15, 0, 0] },
        { canvas: [{ type: 'line', x1: -1, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: '', style: 'cellCenter' },
                { text: 'Total original', bold: true, color: '#000', style: 'cellCenter' },
                { text: 'Total de multa', bold: true, color: '#000', style: 'cellCenter' },
                { text: 'Total de juros', bold: true, color: '#000', style: 'cellCenter' },
                { text: 'Total parcelado', bold: true, color: '#000', style: 'cellCenter' }
              ],
              ...this.body2
            ]
          },
          layout: 'headerLineOnly'
        },
        { text: 'Termo de aceite', style: 'title' },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
        { text: '\nO requerente acima qualificado, nos termos da legislação pertinente, solicita o parcelamento do(s) débito(s), acima discriminados, junto à Receita Estadual.', style: 'text' },
        { text: '\nDeclara estar ciente dos termos e condições da Resolução n° XX/2022, e que:\n\n', style: 'text' },
        {
          ol: [],
          style: 'olText'
        },
        { text: '\nDeclaro que li e aceito os Termos de aceite acima.\n\n\n', style: 'text' },
        {
          columns: [
            {
              width: 50,
              image: imgJson.qrCode,
              fit: [65, 65],
              margin: [0, 0, 0, 0]
            },
            {
              width: 200,
              text: 'Número do documento\n9999999999999\n\nCódigo de autenticidade*\nA380909GBF999',
              margin: [40, 2.5, 0, 0]
            },
            {
              width: '*',
              text: ''
            },
            {
              width: 100,
              text: 'Data da emissão\n99/99/9999',
              margin: [0, 2.5, 0, 0]
            }
          ],
          style: 'text'
        },
        { text: '\n\nPara verificar a autenticidade deste documento acesse:' },
        { text: '\n* Todo documento emitido pelo sistema contém o código de autenticidade ao lado e não recebe assinatura manual. Para garantir a autenticidade do documento emitido pelo Sistema, digite o código de autenticidade no campo específico para recuperar o documento emitido. O documento recuperado deverá ser validado em teor e forma com a versão de posse do usuário.', style: 'text' },
      ],
      styles: {
        header: {
          fontSize: 15,
          bold: true,
          marginBottom: 20
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          fontSize: 8.5,
          fontWeight: 200,
          color: '#363636'
        },
        cellCenter: {
          alignment: 'center'
        },
        cellRight: {
          alignment: 'right'
        },
        cellLeft: {
          alignment: 'left'
        },
        title: {
          fontSize: 12,
          bold: true
        },
        olText: {
          fontSize: 10,
          color: '#363636'
        },
        text: {
          fontSize: 10,
          color: '#363636'
        }
      }
    };
    pdfMake.createPdf(documentDefinition).print();
  }

  novoParcelamento() {
    this.router.navigate(['/ds/template/steps-consulta-resultado']);
  }

}
