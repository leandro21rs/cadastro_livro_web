import { Component, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuperComponent } from 'src/app/core/components/super-component';
import { Router } from '@angular/router';
import { ComponentsService } from 'src/app/shared/service/components.service';

@Component({
  selector: 'app-home-basic',
  templateUrl: './home-basic.component.html',
  styleUrls: ['./home-basic.component.css']
})
export class HomeBasicComponent extends SuperComponent {
  components?: any;
  comp?: any;
  isFound: boolean = true;

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2,
    private componentsService: ComponentsService
  ) {
    super(modalService, router);
  }

  ngOnInit() {
    this.componentsService.getComponentsHomeBasic()
      .subscribe({
        next: (res) => {
          const { data } = res;
          if (data) {
            this.comp = data;
  
            this.listarComponents();
          }
        },
        error: (err) => {
          console.log("err: ", err);
        }
      })
    this.renderer.addClass(document.body, 'home-basic');
  }

  listarComponents(busca: string = "") {
    const filter = this.comp?.filter((servico) => {
      let position = `${servico.label} ${servico.descricaoApp}`.toLowerCase().search(busca.toLowerCase());
      if (position >= 0) return servico;
    });
    this.isFound = filter.length === 0;
    this.components = filter;

    // console.log(this.components)
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'home-basic');
  }

}
