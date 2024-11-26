import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/pages/ds/interfaces/Products';
import { ProdutoService } from 'src/app/pages/ds/services/produto.service';
import { SuperComponent } from 'src/app/core/components/super-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-edit-detailed',
  templateUrl: './table-edit-detailed.component.html',
  styleUrls: ['./table-edit-detailed.component.css']
})
export class TableEditDetailedComponent extends SuperComponent {
  id: number;
  product = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProdutoService,
    protected modalService: NgbModal,
    protected router: Router,
  ) { 
    super(modalService, router)
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];

      this.productService.getProductWithOrdersSmall(this.id).subscribe({
        next: (res) => {
          const { data } = res;
          this.product = data;
          /*if(data.length > 0) {
            data.map(v => {
              if(v.id == this.id.toString()) {
                console.log("v");
                console.log(v);
                this.product.push(v);
                return;
              } 
            })

            this.product = [];
          } else {
            this.product = [];
          }*/
        }, 
        error: (err) => {
          console.log("err: ", err);
        }
      });
    });

    // console.log(this.product)
  } 

}
