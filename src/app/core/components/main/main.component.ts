import { Component, OnInit } from '@angular/core';
import { FilterService, MenuItem, PrimeNGConfig } from 'primeng/api';
import { TokenStorageService } from '../../../shared/service/token-storage.service';
import { Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/config/config-service';
import { AppsConfig } from 'src/app/config/apps-config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  usuario = "";
  showFuncionalidadeBasica = false;
  showFuncionalidade2 = false;
  showFuncionalidade1 = false;
  showFuncionalidade3 = false;
  showFuncionalidadeDiretoria = false;
  username: string;
  items: MenuItem[];
  display: boolean = false;
  systemName: string = "LIVROS";
  windowHeight: number = window.innerHeight * .8;
  isHome: boolean = false;
  nome: string = '';

  groupedCities: any[];
  filteredGroups: any[];
  selectedMenuItem: any;

  config: AppsConfig;
  urlssa: string = '';

  constructor(
    private primengConfig: PrimeNGConfig,
    private tokenStorageService: TokenStorageService,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private filterService: FilterService,
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.config = this.configService.readConfig();
    this.urlssa = this.config.url_ssa;
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showFuncionalidadeBasica = this.roles.includes('basica');
      this.showFuncionalidade1 = this.roles.includes('Funcionalidade 1');
      this.showFuncionalidade2 = this.roles.includes('Funcionalidade 2');
      this.showFuncionalidade3 = this.roles.includes('Funcionalidade 3');
      this.showFuncionalidadeDiretoria = this.roles.includes('diretoria');

      this.username = user.username;
      this.nome = this.tokenStorageService.getUser().username;


      const codApp = this.tokenStorageService.getActiveProfile().codigoApp;
      const sistema = this.tokenStorageService.getSystemSSA().data.sistemas.find((sist: any) => sist.codigoApp == codApp);

    }
    this.primengConfig.ripple = false;
    this.carregarMenu();
  }

  ngDoCheck() {
    if (this.router.url == '/livro-web') {
      this.addBodyClass('home');
      this.removeBodyClass('page');
    } else {
      this.addBodyClass('page');
      this.removeBodyClass('home');
    }
  }

  goToPage() {
    if (this.selectedMenuItem) {
      this.router.navigate([this.selectedMenuItem.routerLink], { relativeTo: this.route });
      this.filteredGroups = [];
      this.selectedMenuItem = null;
      this.display = false;
    }
  }


  filterGroupedMenu(event) {
    let query = event.query;
    let filteredGroups = [];

    for (let optgroup of this.items) {
      let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, "contains");
      if (filteredSubOptions && filteredSubOptions.length) {
        filteredGroups.push({
          label: optgroup.label,
          items: filteredSubOptions
        });
      }
    }

    this.filteredGroups = filteredGroups;
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  private carregarMenu() {
    this.items = [
      {
        label: 'Cadastros',
        items: [
          { label: 'Livro', routerLink: '/livros' },
          { label: 'Assunto', routerLink: '/assuntos' },
          { label: 'Autor', routerLink: '/autores' }
        ]
      }
    ]

    const userActive = this.tokenStorageService.getActiveProfile();

    if (this.isLoggedIn && userActive) {
      const idPerfil = userActive.idPerfil;
      const perfis = this.tokenStorageService.getSystemSSA().data.perfis;
      const menus = perfis.find((perfil: any) => perfil.idPerfil == idPerfil);
      menus.menus.map((menu: any) => this.items.push(menu));
    }

    if (this.isLoggedIn) {
      this.items.push({})
      this.tokenStorageService.saveMenus(this.items);
    }

    if (this.isLoggedIn) {
      let arr = []; 
      
      let arrRoles = JSON.parse(window.sessionStorage.getItem('auth-user'));
      for(let role of arrRoles.roles) {
        let r = role.replace("_", " ").toLowerCase();

        let obj = { label: r, title: r, routerLink: '!#' };

        arr.push(obj);
      }

      this.items = [
        {
          label: 'Acessos',
          items: arr
        }
      ]
            
      this.tokenStorageService.saveMenus(this.items);
    } 
  }

  login(): void {
  }

  onShowMenu({ display }) {
    this.display = display;
  }

  addBodyClass(bodyClass: string) {
    this.renderer.addClass(document.body, bodyClass);
  }

  removeBodyClass(bodyClass: string) {
    this.renderer.removeClass(document.body, bodyClass);
  }

  ngOnDestroy() {
    this.removeBodyClass('home');
    this.removeBodyClass('page');
  }
}
