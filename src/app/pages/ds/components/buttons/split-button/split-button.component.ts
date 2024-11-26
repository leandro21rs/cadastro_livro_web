import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuperComponent } from 'src/app/core/components/super-component';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-split-button',
  templateUrl: './split-button.component.html',
  styleUrls: ['./split-button.component.css']
})
export class SplitButtonComponent extends SuperComponent {
  items: MenuItem[];

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {
          this.update();
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          this.delete();
        }
      },
      {
        label: 'Angular.io', icon: 'pi pi-info', command: () => {
          this.info();
        }
      },
      { separator: true },
      {
        label: 'Setup', icon: 'pi pi-cog', command: () => {
          this.info();
        }
      }
    ];

    this.renderer.addClass(document.body, 'buttonsplit');
  }

  save(severity: string) { }

  update() { }

  delete() { }

  info() { }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'buttonsplit');
  }
}
