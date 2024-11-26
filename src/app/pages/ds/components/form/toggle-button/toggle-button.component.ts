import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent extends SuperComponent {
  toggleChecked1: boolean = false;
  toggleChecked2: boolean = true;

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'togglebutton');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'togglebutton');
  }
}
