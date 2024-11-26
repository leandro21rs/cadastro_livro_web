import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parcelamento } from '../../../interfaces/Parcelamento';
import { ParcelamentoService } from '../../../services/parcelamento.service';
import { InfoSelecaoGuias } from '../../../interfaces/InfoSelecaoGuia';
import { GuiaDeclaracao } from '../../../interfaces/GuiaDeclaracao';
import { ResponsavelParcelamento } from '../../../interfaces/ResponsavelParcelamento';
import { InfosParcelamento } from '../../../interfaces/InfosParcelamento';
import { NumParcela } from '../../../interfaces/NumParcela';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SuperComponent } from 'src/app/core/components/super-component';

@Component({
  selector: 'app-steps-consulta-resultado',
  templateUrl: './steps-consulta-resultado.component.html',
  styleUrls: ['./steps-consulta-resultado.component.css']
})
export class StepsConsultaResultadoComponent extends SuperComponent {
  items: MenuItem[];
  activeIndex: number = 0;

  tiposParcelamento: Parcelamento[];
  selectedtipoParcelamento: any = null;

  infoSelecaoGuias: InfoSelecaoGuias;

  guiasDeclaracao: GuiaDeclaracao[];
  guiaDeclaracao: any;
  selectedGuias: GuiaDeclaracao[];

  minimoParcelavel: number = 265.95;
  totalDeclaracoes: number = 93000;
  
  responsavelParcelamento: ResponsavelParcelamento[];
  selectedResponsavel: any = null;
  
  numParcelas: NumParcela[];
  selectedNumParcelas: NumParcela;

  infosParcelamento: InfosParcelamento[];

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private parcelamentoService: ParcelamentoService,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.parcelamentoService.getTiposParcelamento()
    .subscribe({
      next: (res) => {
        const { data } = res;
        this.tiposParcelamento = data;
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });
        
    this.parcelamentoService.getInfoSelecaoGuias()
    .subscribe({
      next: (res) => {
        const { data } = res;
        this.infoSelecaoGuias = data[0];
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.parcelamentoService.getGuiasDeclaracao()
    .subscribe({
      next: (res) => {
        const { data } = res;
        this.guiasDeclaracao = data;
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.parcelamentoService.getResponsavelParcelamento()
    .subscribe({
      next: (res) => {
        const { data } = res;
        this.responsavelParcelamento = data;
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.parcelamentoService.getInfosParcelamento()
    .subscribe({
      next: (res) => {
        const { data } = res;
        this.infosParcelamento = data;
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.parcelamentoService.getNumParcelas()
    .subscribe({
      next: (res) => {
        const { data } = res;
        this.numParcelas = data;
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.items = [
      {
        label: 'Consultar declaração',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Seleção de guias',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Responsável legal',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      },
      {
        label: 'Parcelamento',
        command: (event: any) => {
          this.activeIndex = 3;
        }
      },
      {
        label: 'Termo de aceite',
        command: (event: any) => {
          this.activeIndex = 4;
        }
      }
    ];

    this.renderer.addClass(document.body, 'steps-consulta-resultado');
  }

  nextPage() {
    if(this.activeIndex == 0){
      this.activeIndex = 1;
    } else if(this.activeIndex == 1){
      this.activeIndex = 2;
    } else if(this.activeIndex == 2){
      this.activeIndex = 3;
    } else if(this.activeIndex == 3){
      this.activeIndex = 4;
    }
  }

  prevPage() {
    if(this.activeIndex == 1){
      this.activeIndex = 0;
    } else if(this.activeIndex == 2){
      this.activeIndex = 1;
    } else if(this.activeIndex == 3){
      this.activeIndex = 2;
    } else if(this.activeIndex == 4){
      this.activeIndex = 3;
    }
  }

  complete() {
    this.router.navigate(['/ds/template/confirmacao']).then(e => {
      console.log(e);
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'steps-consulta-resultado');
  }

}