import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.css']
})
export class KnobComponent extends SuperComponent {
  value1: number = 0;
  value2: number = 50;
  value3: number = 75;
  value4: number = 10;
  value5: number = 40;
  value6: number = 60;
  value7: number = 40;
  value8: number = 60;
  value9: number = 50;

  constructor(
    private renderer: Renderer2,
    protected modalService: NgbModal,
    protected router: Router
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'knob');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'knob');
  }
}