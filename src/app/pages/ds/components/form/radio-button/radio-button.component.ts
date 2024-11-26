import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SuperComponent } from 'src/app/core/components/super-component';
import { RadioValuesService } from '../../../services/radio-values.service';
import { RadioValue } from '../../../interfaces/RadioValue';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent extends SuperComponent {
  selectedRadioValue: RadioValue = null;
  radioValues: RadioValue[] = [];
  city: any;

  constructor(
    private radioValuesService: RadioValuesService,
    private spinnerService: NgxSpinnerService,
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.radioValuesService.getRadioValues().subscribe({
      next: (res) => {
        const { data } = res;
        this.radioValues = data;
        this.spinnerService.hide();
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.renderer.addClass(document.body, 'radiobutton');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'radiobutton');
  }
}
