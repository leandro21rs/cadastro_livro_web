import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/Product';
import { ProdutoService } from '../../../services/produto.service';
import { Renderer2 } from '@angular/core';
import { SuperComponent } from 'src/app/core/components/super-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.css']
})
export class ResponsiveTableComponent extends SuperComponent {
  products: Product[];

  cols: any[];

  constructor(
    private productService: ProdutoService,
    private renderer: Renderer2,
    protected modalService: NgbModal,
    protected router: Router
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    let statusType = [];
    this.productService.getProductsSmall().subscribe({
      next: (res) => {
        const { data } = res;
        if (data.length > 0) {
          data?.map((valor) => {
            let obj = {};
            switch (valor?.inventoryStatus) {
              case "INSTOCK":
                obj = { ...valor, "tagType": "success" }
                break;
              case "LOWSTOCK":
                obj = { ...valor, "tagType": "danger" }
                break;
              case "OUTOFSTOCK":
                obj = { ...valor, "tagType": "warning" }
                break;
              default:
                obj = { ...valor, "tagType": "info" }
            }
            statusType.push(obj);
          })
          this.products = statusType;
        }
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.cols = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'inventoryStatus', header: 'Status' },
        { field: 'rating', header: 'Rating' }
    ];

    this.renderer.addClass(document.body, 'table-responsive');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'table-responsive');
  }

}
