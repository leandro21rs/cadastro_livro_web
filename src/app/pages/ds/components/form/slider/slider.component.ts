import { Component } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent extends SuperComponent {
  val1: number;
  val2: number = 50;
  val3: number;
  val4: number;
  rangeValues: number[] = [20,80];

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
  ) { 
    super(modalService, router)
  }

  ngOnInit(): void {
  }

}
