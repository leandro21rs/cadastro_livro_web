import { Component } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AcessoUsuario } from '../../../interfaces/AcessoUsuario';
import { Apostilamento } from '../../../interfaces/Apostilamento';
import { Restituicao } from '../../../interfaces/Restituicao';
import { UltimasAtividadesService } from '../../../services/ultimas-atividades.service';

@Component({
  selector: 'app-atividades-pendentes',
  templateUrl: './atividades-pendentes.component.html',
  styleUrls: ['./atividades-pendentes.component.css']
})
export class AtividadesPendentesComponent extends SuperComponent {
  acessoUsuarios: AcessoUsuario[] = [];
  apostilamentos: Apostilamento[] = [];
  restituicoes: Restituicao[] = [];

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private ultimasAtividadesService: UltimasAtividadesService
  ) { 
    super(modalService, router)
  }

  ngOnInit(): void {
    this.ultimasAtividadesService.getAcessoUsuario().subscribe({
      next: (res) => {
        const { data } = res;
        if(data.length > 0) {
          this.acessoUsuarios = data;
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.ultimasAtividadesService.getApostilamento().subscribe({
      next: (res) => {
        const { data } = res;
        if(data.length > 0) {
          this.apostilamentos = data;
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.ultimasAtividadesService.getRestituicao().subscribe({
      next: (res) => {
        const { data } = res;
        if(data.length > 0) {
          this.restituicoes = data;
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });
  }


}
