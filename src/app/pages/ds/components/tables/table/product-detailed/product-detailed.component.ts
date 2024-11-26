import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../../services/produto.service';
import { Product } from '../../../../interfaces/Product';

import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-product-detailed',
  templateUrl: './product-detailed.component.html',
  styleUrls: ['./product-detailed.component.css']
})
export class ProductDetailedComponent implements OnInit {
  id: number;
  product: Product[];
  products: Product[];
  basicData: any;
  basicOptions: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProdutoService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    let months = this.getMonths(6);

    this.route.params.subscribe((params: any) => {
      this.id = params['id'];

      this.productService.getProduct(this.id).subscribe(res => {
        const { data } = res;
        this.product = data;

        data.map((valor) => {
          this.basicData = {
            labels: months,
            datasets: [
              {
                label: 'Histórico de preço nos últimos 6 meses',
                // backgroundColor: '#42A5F5',
                data: valor?.historicPrice,
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
              }
            ]
          };

          return this.basicData
        })

        return this.product;
      }
      );
    })
  }

  getMonths(qtd) {
    let today = new Date();
    let actualMonth = today.getMonth();
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    let ret = [];

    for (let i = 0; i < qtd; i++) {
      ret.push(months[actualMonth]);

      actualMonth -= 1;
      if (actualMonth < 0) {
        actualMonth = 11;
      }
    }

    ret = ret.reverse();

    return ret;
  }
}
