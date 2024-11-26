import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SuperComponent } from 'src/app/core/components/super-component';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent extends SuperComponent {
  values1: string[];
  values2: string[];

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'chips');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'chips');
  }
}