import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuperComponent } from 'src/app/core/components/super-component';

@Component({
  selector: 'app-polar-area',
  templateUrl: './polar-area.component.html',
  styleUrls: ['./polar-area.component.css']
})
export class PolarAreaComponent extends SuperComponent {
  data: any;
  chartOptions: any;

  constructor(
    protected modalService: NgbModal,
    protected router: Router
  ) {
    super(modalService, router)
  }
  ngOnInit() {
    this.data = {
      datasets: [{
        data: [
          11,
          16,
          7,
          3,
          14
        ],
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#FF6384",
          "#7E57C2"
        ],
        label: 'My dataset'
      }],
      labels: [
        "Azul",
        "Verde",
        "Amarelo",
        "Rosa",
        "Roxo"
      ]
    };
  }

}
