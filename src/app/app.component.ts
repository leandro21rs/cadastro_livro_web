import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TokenStorageService } from './shared/service/token-storage.service';
import { AppsConfig } from './config/apps-config';

const languagePTBR = require('../assets/i18n/pt.json').primeng;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  nomeSistema = 'Design System';

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private tokenStorageService: TokenStorageService
    ,private appsConfig: AppsConfig
  ) {
    //TODO: remover apos teste
    console.log('Início Teste config >>>>');
    console.log(appsConfig);
    console.log('Fim Teste config >>>>');
  }

  items: MenuItem[];

  ngOnInit() {
    this.titleService.setTitle(this.nomeSistema);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      if (!!this.tokenStorageService.getToken()) {
        const codApp = this.tokenStorageService.getActiveProfile().codigoApp;
        const sistema = this.tokenStorageService.getSystemSSA().data.sistemas.find((sist: any) => sist.codigoApp == codApp);
        // this.nomeSistema = sistema.label;
      }

      switch (event.url) {
        case '/':
          this.titleService.setTitle(this.nomeSistema);
          break;        
        default:
          this.titleService.setTitle(this.nomeSistema);
      }
    });

    //REFERE-SE A CONFIGURAÇÃO DO PRIMENG (NÃO REMOVER)
    this.primengConfig.ripple = false;

    this.primengConfig.setTranslation(languagePTBR);
    this.carregarMenu();
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  private carregarMenu() {
    this.items = [
      {
        label: 'Administrar Sistema',
        items: [
          // {
          //   label: 'Cadastro',
          //   items: [
          { label: 'Usuário', routerLink: 'pesquisar-usuario' },
          { label: 'Benefício', routerLink: 'pesquisar-beneficio' }
        ]
        //   }
        // ]
      }
    ]
  }
}
