import { TokenStorageService } from 'src/app/shared/service/token-storage.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   @Input() systemName: string = "";


  userName: string;
  currentPage: string;

  constructor(
    protected tokenStorage: TokenStorageService,
    private title: Title  
  ) { }

  @Output() showMenu = new EventEmitter<object>();

  ngOnInit() {
    const user = this.tokenStorage.getUser();

    if (user) {
      const codApp = this.tokenStorage.getActiveProfile().codigoApp;
      const sistema = this.tokenStorage.getSystemSSA().data.sistemas.find((sist: any) => sist.codigoApp == codApp);
      // this.systemName = sistema.label;
    }

    this.currentPage = this.title.getTitle();
    if(this.currentPage){
      this.currentPage = this.currentPage.split(" -")[0];
    }
  }

  ngDoCheck() {
    this.currentPage = this.title.getTitle();
    if(this.currentPage){
      this.currentPage = this.currentPage.split(" -")[0];
    }
  }

  onHide() {
    this.showMenu.emit({ display: false });
  }

  onShow() {
    this.showMenu.emit({ display: true });
  }

}
