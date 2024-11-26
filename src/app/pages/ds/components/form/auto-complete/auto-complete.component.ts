import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilterService } from "primeng/api";
import { SuperComponent } from 'src/app/core/components/super-component';
import { PaisService } from '../../../services/pais.service';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent extends SuperComponent {
  selectedCountry: any;
  countries: any[];
  filteredCountries: any[];
  selectedCountries: any[];
  selectedCountryAdvanced: any[];
  groupedCities: any[];
  filteredGroups: any[];

  constructor(
    private paisService: PaisService,
    private spinnerService: NgxSpinnerService,
    protected modalService: NgbModal,
    protected router: Router,
    private filterService: FilterService,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.paisService.getCountriesName().subscribe({
      next: (res) => {
        const { data } = res;
        this.countries = data;
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.groupedCities = [
      {
        label: "Germany",
        value: "de",
        items: [
          { label: "Berlin", value: "Berlin" },
          { label: "Frankfurt", value: "Frankfurt" },
          { label: "Hamburg", value: "Hamburg" },
          { label: "Munich", value: "Munich" }
        ]
      },
      {
        label: "USA",
        value: "us",
        items: [
          { label: "Chicago", value: "Chicago" },
          { label: "Los Angeles", value: "Los Angeles" },
          { label: "New York", value: "New York" },
          { label: "San Francisco", value: "San Francisco" }
        ]
      },
      {
        label: "Japan",
        value: "jp",
        items: [
          { label: "Kyoto", value: "Kyoto" },
          { label: "Osaka", value: "Osaka" },
          { label: "Tokyo", value: "Tokyo" },
          { label: "Yokohama", value: "Yokohama" }
        ]
      }
    ];

    this.renderer.addClass(document.body, 'autocomplete');
  }

  filterCountry(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  filterGroupedCity(event) {
    let query = event.query;
    let filteredGroups = [];

    for (let optgroup of this.groupedCities) {
      let filteredSubOptions = this.filterService.filter(
        optgroup.items,
        ["label"],
        query,
        "contains"
      );
      if (filteredSubOptions && filteredSubOptions.length) {
        filteredGroups.push({
          label: optgroup.label,
          value: optgroup.value,
          items: filteredSubOptions
        });
      }
    }

    this.filteredGroups = filteredGroups;
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'autocomplete');
  }
}
