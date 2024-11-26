import { Component, OnInit } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent extends SuperComponent {
  basicData: any;
  basicOptions: any;
  stackedOptions: any;

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
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: '2° conjunto de dados',
          backgroundColor: '#FFA726',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    // this.stackedOptions = {
    //   tooltips: {
    //     mode: 'index',
    //     intersect: false
    //   },
    //   responsive: true,
    //   scales: {
    //     xAxes: [{
    //       stacked: true,
    //     }],
    //     yAxes: [{
    //       stacked: true
    //     }]
    //   }
    // };

    this.basicOptions = {
      responsive: true,
      grid: {
        offset: false
      },
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
