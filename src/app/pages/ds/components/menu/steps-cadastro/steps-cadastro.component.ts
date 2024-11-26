import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SuperComponent } from 'src/app/core/components/super-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steps-cadastro',
  templateUrl: './steps-cadastro.component.html',
  styleUrls: ['./steps-cadastro.component.css']
})
export class StepsCadastroComponent extends SuperComponent {
  items: MenuItem[];
  activeIndex: number = 0;

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2,
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dados pessoais',
        command: () => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Dados da empresa',
        command: () => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Confirmação',
        command: () => {
          this.activeIndex = 2;
        }
      }
    ];

    this.renderer.addClass(document.body, 'steps-cadastro');
  }

  nextPage() {
    if (this.activeIndex == 0) {
      this.activeIndex = 1;
    } else if (this.activeIndex == 1) {
      this.activeIndex = 2;
    }
  }

  prevPage() {
    if (this.activeIndex == 1) {
      this.activeIndex = 0;
    } else if (this.activeIndex == 2) {
      this.activeIndex = 1;
    }
  }

  complete() {
    this.activeIndex = 0;
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'steps-cadastro');
  }
}
