import { Component } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent extends SuperComponent {
  checked: boolean = false;
  selectedCities: string[] = []; 
  categories: any[] = [{ name: 'Accounting', key: 'A' }, { name: 'Marketing', key: 'M' }, { name: 'Production', key: 'P' }, { name: 'Research', key: 'R' }];

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void { 
    this.renderer.addClass(document.body, 'checkbox');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'checkbox');
  }
}
