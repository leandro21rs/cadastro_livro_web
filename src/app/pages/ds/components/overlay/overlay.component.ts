import { Component, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { SuperComponent } from 'src/app/core/components/super-component';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent extends SuperComponent {

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'overlay');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'overlay');
  }
}
