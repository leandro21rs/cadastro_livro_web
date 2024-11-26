import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.component.html',
  styleUrls: ['./select-button.component.css']
})
export class SelectButtonComponent extends SuperComponent {
  stateOptions = [
    { label: 'On', value: 'on' },
    { label: 'Off', value: 'off' }
  ];
  selectedButton: any;
  selectButtonValues = [
    { name: 'Option 1', value: 1 },
    { name: 'Option 2', value: 2 },
    { name: 'Option 3', value: 3 },
  ];
  selectedButtonMValue: any;

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.selectedButton = this.stateOptions[0].value;

    this.renderer.addClass(document.body, 'selectbutton');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'selectbutton');
  }
}
