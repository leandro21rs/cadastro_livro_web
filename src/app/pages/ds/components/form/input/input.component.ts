import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Renderer2 } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent extends SuperComponent {
  disabled: boolean = true;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  value6: string;
  value7: string = 'Disabled';
  value8: string;

  password1: string;
  password2: string;
  password3: string;

  inputMaskValue1: string;
  inputMaskValue2: string;
  inputMaskValue3: string;

  inputNumber1: number;

  inputNumberValue1: number;
  inputNumberValue2: number;
  inputNumberValue3: number;
  inputNumberValue4: number;
  inputNumberValue5: number;
  inputNumberValue6: number;
  inputNumberValue7: number;

  textAreaValue: string;

  checked1: boolean = false;
  checked2: boolean = true;

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'inputs');
  }
  
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'inputs');
  }
}
