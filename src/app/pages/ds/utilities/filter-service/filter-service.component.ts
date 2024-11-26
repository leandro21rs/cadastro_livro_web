import { Component, OnInit } from '@angular/core';
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";
import { Car } from '../../interfaces/Car';
import { CarService } from '../../services/car.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-filter-service',
  templateUrl: './filter-service.component.html',
  styleUrls: ['./filter-service.component.css']
})
export class FilterServiceComponent implements OnInit {
  cars: Car[];

  cols: any[];

  matchModeOptions: SelectItem[];

  value: any;

  constructor(
    private carService: CarService,
    private filterService: FilterService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const customFilterName = "custom-equals";

    this.filterService.register(
      customFilterName,
      (value, filter): boolean => {
        if (filter === undefined || filter === null || filter.trim() === "") {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.toString() === filter.toString();
      }
    );

    this.cols = [
      { field: "year", header: "Ano" },
      { field: "brand", header: "Marca" },
      { field: "color", header: "Cor" },
      { field: "vin", header: "Vin" }
    ];

    this.matchModeOptions = [
      { label: "Igual a", value: customFilterName },
      { label: "Começa com", value: FilterMatchMode.STARTS_WITH },
      { label: "Contém", value: FilterMatchMode.CONTAINS }
    ];

    this.carService.getCarsMedium().subscribe({
      next: (res) => {
        const { data } = res;
        this.cars = data;
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.renderer.addClass(document.body, 'filter-service');
  }

  file() {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'filter-service');
  }
}
