import { Component, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Product } from '../../../interfaces/Product';

import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-table-row-expanded',
  templateUrl: './table-row-expanded.component.html',
  styleUrls: ['./table-row-expanded.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class TableRowExpandedComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProdutoService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    let statusType = [];

    this.productService.getProductsWithOrdersSmall().subscribe({
      next: (res) => {
        const { data } = res;

        if (data.length > 0) {
          data?.map((valor) => {
            let obj = {};
  
            switch (valor?.inventoryStatus) { 
              case "DELIVERED":
                obj = { ...valor, "tagType": "success" }
                break;
              case "INSTOCK":
                obj = { ...valor, "tagType": "success" }
                break;
              case "LOWSTOCK":
                obj = { ...valor, "tagType": "danger" }
                break;
              case "OUTOFSTOCK":
                obj = { ...valor, "tagType": "warning" }
                break;
              case "PENDING":
                obj = { ...valor, "tagType": "warning" }
                break;
                case "RETURNED":
                obj = { ...valor, "tagType": "info" }
                break;
              case "CANCELLED":
                obj = { ...valor, "tagType": "danger" }
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

    this.renderer.addClass(document.body, 'table-row-expansion');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'table-row-expansion');
  }
}
