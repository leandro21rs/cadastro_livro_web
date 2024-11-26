import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuperComponent } from 'src/app/core/components/super-component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends SuperComponent {
  basicData: any;
  basicOptions: any;

  constructor(
    protected modalService: NgbModal,
    protected router: Router
  ) {
    super(modalService, router)
  }

  ngOnInit() {
    this.basicData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [
        {
          label: '1° conjunto de dados',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          backgroundColor: '#42A5F5',
          tension: .4
        },
        {
          label: '2° conjunto de dados',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          backgroundColor: '#FFA726',
          tension: .4
        }
      ]
    };

    this.basicOptions = {
      responsive: true,
      ticks: {
        stepSize: 10
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          }
        },
        y: {
          grid: {
            display: false,
            drawBorder: false
          },
          min: 0,
          max: 100,
        },
      }
    }
  }

}
