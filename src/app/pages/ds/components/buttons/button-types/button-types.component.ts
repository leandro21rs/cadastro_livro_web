import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Renderer2 } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';

@Component({
  selector: 'app-button-types',
  templateUrl: './button-types.component.html',
  styleUrls: ['./button-types.component.css']
})
export class ButtonTypesComponent extends SuperComponent {
  loading: any[] = [false, false, false, false];

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'buttons');
  }

  load(valor) {
    switch (valor) {
      case 0:
        this.setLoading(valor);
        break;
      case 1:
        this.setLoading(valor);
        break;
      case 2:
        this.setLoading(valor);
        break;
      case 3:
        this.setLoading(valor);
        break;
    }
  }

  setLoading(valor) {
    this.loading[valor] = true;
    setTimeout(() => {
      this.loading[valor] = false;
    }, 1000)
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'buttons');
  }
}
