import { Component, Renderer2 } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PrimeIcons } from "primeng/api";
import { DataChartService } from '../../services/data-chart.service';
import { InfoDashboardService } from '../../services/info-dashboard.service';
import { Gre } from '../../interfaces/Gre';
import { Pagamento } from '../../interfaces/Pagamento';
import { ComponentsService } from 'src/app/shared/service/components.service';
import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { MenuItem } from 'primeng/api';
import { UltimasAtividadesService } from '../../services/ultimas-atividades.service';
import { AcessoUsuario } from '../../interfaces/AcessoUsuario';
import { Apostilamento } from '../../interfaces/Apostilamento';
import { Restituicao } from '../../interfaces/Restituicao';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],
})
export class HomeDashboardComponent extends SuperComponent {
  data1: any;
  data2: any;
  data3: any;
  chartOptions: any;
  events: any;
  dataOption: number;
  invoicing: string;
  gresEmVencimento: Gre;
  gresPagas: Gre;
  prevFaturamento: Pagamento;
  pagamentosConf: Pagamento;
  allGresEmVencimento: Gre[];
  allGresPagas: Gre[];
  allPrevFaturamento: Pagamento[];
  allPagamentosConf: Pagamento[];
  components?: any;
  comp?: any;
  comp2?: any;
  servicos: any;
  servicos2: any;
  isFound: boolean = true;
  pesquisou: boolean = false;
  isLoggedIn: boolean = false;
  username = '';
  items: MenuItem[];
  type: number;
  acessoUsuario: AcessoUsuario = null;
  apostilamento: Apostilamento = null;
  restituicao: Restituicao = null;

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2,
    private dataChartService: DataChartService,
    private infoDashboardService: InfoDashboardService,
    private componentsService: ComponentsService,
    private tokenStorageService: TokenStorageService,
    private ultimasAtividadesService: UltimasAtividadesService
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'home-dashboard');
    this.dataOption = 3;
    this.invoicing = 'MENSAL';

    this.infoDashboardService.getGresEmVencimento().subscribe({
      next: (res) => {
        const { data } = res;
        if(data.length > 0) {
          this.allGresEmVencimento = data;
          let info = data.filter(val => val.id == '1');
          this.gresEmVencimento = info[0];
        }
      },
      error: (err) => {
        console.log("err: ", err);
      }
    })

    this.infoDashboardService.getGresPagas().subscribe({
      next: (res) => {
        const { data } = res;
        if (data.length > 0) {
          this.allGresPagas = data;
          let info = data.filter(val => val.id == '1');
          this.gresPagas = info[0];
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.infoDashboardService.getPrevFaturamento().subscribe({
      next: (res) => {
        const { data } = res;
        if (data.length > 0) {
          this.allPrevFaturamento = data;
          let info = data.filter(val => val.id == '3');
          let v = info[0].valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          let obj = { ...info[0], valor: v };
          this.prevFaturamento = obj;
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.infoDashboardService.getPagamentosConf().subscribe({
      next: (res) => {
        const { data } = res;
        if (data.length > 0) {
          this.allPagamentosConf = data;
          let info = data.filter(val => val.id == '2');
          let v = info[0].valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          let obj = { ...info[0], valor: v };
          this.pagamentosConf = obj;
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.dataChartService.getDataChart1().subscribe({
      next: (res) => {
        const { data } = res;
        this.fillChart(data[0], 1);
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    })

    this.dataChartService.getDataChart2().subscribe({
      next: (res) => {
        const { data } = res;
        this.fillChart(data[0], 2);
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    })

    this.dataChartService.getDataChart3().subscribe({
      next: (res) => {
        const { data } = res;
        this.fillChart(data[0], 3);
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    })

    this.chartOptions = {
      responsive: true,
      ticks: {
        stepSize: 100
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
            color: '#ebedef'
          },
          ticks: {
            color: '#495057'
          }
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
            color: '#ebedef'
          },
          ticks: {
            color: '#495057'
          },
          min: 0,
          max: 1000,
        }
      }
    };

    this.events = [
      {
        status: true,
        principal: "Arquivo Bradesco Rajada Importado",
        date: "14h25",
        info: "USUÁRIO IMPORTAÇÃO",
        icon: PrimeIcons.INFO_CIRCLE,
        color: "#377dff",
        message: "15 Pagamentos Confirmados"
      },
      {
        status: true,
        principal: "Acesso de Usuário Concedido",
        date: "14h25",
        info: "NÉLIO ALBERTO",
        icon: PrimeIcons.USER,
        color: "#377dff",
        message: "Usuário Fernando Caovilla foi criado e acessos concedidos"
      },
      {
        status: false,
        principal: "Arquivo Bradesco Rajada Importado",
        date: "14h25",
        info: "USUÁRIO IMPORTAÇÃO",
        icon: PrimeIcons.INFO_CIRCLE,
        color: "#377dff",
        message: "0 Registros Importados ERRO: 500"
      }
    ];

    this.ultimasAtividadesService.getAcessoUsuario().subscribe({
      next: (res) => {
        const { data } = res;
        if (data.length > 0) {
          this.acessoUsuario = data[0];
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    })

    this.ultimasAtividadesService.getApostilamento().subscribe({
      next: (res) => {
        const { data } = res;
        if (data.length > 0) {
          this.apostilamento = data[0];
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    })

    this.ultimasAtividadesService.getRestituicao().subscribe({
      next: (res) => {
        const { data } = res;
        if (data.length > 0) {
          this.restituicao = data[0];
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    })

    this.componentsService.getComponents()
      .subscribe({
        next: (res) => {
          const { data } = res;
          if (data) {
            let arr = [];
            let obj = {};
            for (let i = 0; i < 3; i++) {
              obj = data[i];
  
              arr.push(obj);
            }
            this.comp = arr;
          }
        }, 
        error: (err) => {
          console.log("err: ", err);
        }
      })

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.username = this.tokenStorageService.getUser().username;
      const user = this.tokenStorageService.getUser();
      if (user) this.listarServicos();
    }

    this.items = [
      {
        label: 'Hoje',
        icon: 'pi pi-calendar',
        command: () => {
          let typeDay = 1;
          this.getType(typeDay);
        }
      },
      {
        label: 'Semanal',
        icon: 'pi pi-calendar',
        command: () => {
          let typeDay = 2;
          this.getType(typeDay);
        }
      },
      {
        label: 'Mensal',
        icon: 'pi pi-calendar',
        command: () => {
          let typeDay = 3;
          this.getType(typeDay);
        }
      }
    ];
  }

  fillChart(data, chartOp) {
    let info = {
      labels: data.labels,
      datasets: [{
        type: 'line',
        label: 'Pagas',
        borderColor: '#42A5F5',
        borderWidth: 2,
        fill: true,
        data: data.datas1
      }, {
        type: 'bar',
        label: 'Vencidas',
        backgroundColor: '#66BB6A',
        data: data.datas2,
        borderColor: 'white',
        borderWidth: 2
      },]
    };
    if (chartOp == 1) {
      this.data1 = info;
    } else if (chartOp == 2) {
      this.data2 = info;
    } else {
      this.data3 = info;
    }
  }

  getType(typeDay) {
    if (this.type == 1) {
      if (this.allGresEmVencimento.length > 0) {
        let info = this.allGresEmVencimento.filter(val => val.id == typeDay);
        this.gresEmVencimento = info[0];
      }
    } else if (this.type == 2) {
      if (this.allGresPagas.length > 0) {
        let info = this.allGresPagas.filter(val => val.id == typeDay);
        this.gresPagas = info[0];
      }
    } else if (this.type == 3) {
      if (this.allPrevFaturamento.length > 0) {
        let info = this.allPrevFaturamento.filter(val => val.id == typeDay);
        let v = info[0].valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        let obj = { ...info[0], valor: v };
        this.prevFaturamento = obj;
      }
    } else {
      if (this.allPagamentosConf.length > 0) {
        let info = this.allPagamentosConf.filter(val => val.id == typeDay);
        let v = info[0].valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        let obj = { ...info[0], valor: v }
        this.pagamentosConf = obj;
      }
    }
  }

  changeDate(e, menu, num) {
    menu.toggle(e);
    this.type = num;
  }

  setChartOption(value: number) {
    if (value == 1) {
      this.dataOption = 1;
      this.invoicing = 'HOJE';
    } else if (value == 2) {
      this.dataOption = 2;
      this.invoicing = 'SEMANAL';
    } else {
      this.dataOption = 3;
      this.invoicing = 'MENSAL';
    }
  }

  listarServicos() {
    let sistemas = this.tokenStorageService.getSystemSSA().sistemas;
    let arr = [];
    let obj = {};
    for (let i = 0; i < 3; i++) {
      obj = sistemas[i];

      arr.push(obj);
    }
    this.servicos = arr;
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'home-dashboard');
  }
}