import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SuperComponent } from 'src/app/core/components/super-component';
import { PaisService } from '../../../services/pais.service';
import { Country } from '../../../interfaces/Country';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent extends SuperComponent {
  selectedCountries: Country[];
  selectedCountries1: string[] = [];
  items: any[];
  item: string;
  cities: any[];
  countries: Country[];
  selectedCities1: any;
  selectedCities2: any;

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private countryService: PaisService,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.countryService.getCountriesName().subscribe({
      next: (res) => {
        const { data } = res;
        this.countries = data;
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.countries = [
      { name: "Australia", code: "AU" },
      { name: "Brazil", code: "BR" },
      { name: "China", code: "CN" },
      { name: "Egypt", code: "EG" },
      { name: "France", code: "FR" },
      { name: "Germany", code: "DE" },
      { name: "India", code: "IN" },
      { name: "Japan", code: "JP" },
      { name: "Spain", code: "ES" },
      { name: "United States", code: "US" }
    ];

    this.cities = [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" }
    ];

    this.renderer.addClass(document.body, 'multiselect');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'multiselect');
  }
}
