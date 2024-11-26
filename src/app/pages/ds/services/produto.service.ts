import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  productNames: string[] = [
    "Bamboo Watch",
    "Black Watch",
    "Blue Band",
    "Blue T-Shirt",
    "Bracelet",
    "Brown Purse",
    "Chakra Bracelet",
    "Galaxy Earrings",
    "Game Controller",
    "Gaming Set",
    "Gold Phone Case",
    "Green Earbuds",
    "Green T-Shirt",
    "Grey T-Shirt",
    "Headphones",
    "Light Green T-Shirt",
    "Lime Band",
    "Mini Speakers",
    "Painted Phone Case",
    "Pink Band",
    "Pink Purse",
    "Purple Band",
    "Purple Gemstone Necklace",
    "Purple T-Shirt",
    "Shoes",
    "Sneakers",
    "Teal T-Shirt",
    "Yellow Earbuds",
    "Yoga Mat",
    "Yoga Set",
  ];

  constructor(private http: HttpClient) { }

  getProductsSmall(): Observable<{data: Product[]}> {
    return this.http.get<{data: Product[]}>('assets/data/products-small.json')
      .pipe(
        // tap(console.log)
      )
  }

  getProducts(): Observable<{data: Product[]}> {
    return this.http.get<{data: Product[]}>('assets/data/produtos.json')
    .pipe(
      // tap(console.log)
    )
  }

  getProduct(id): Observable<{data: Product[]}> {
    return this.http.get<{data: Product[]}>('assets/data/produtos.json')
    .pipe(
      // tap(console.log)
    )
  }

  getProductsWithOrdersSmall(): Observable<{data: Product[]}> {
    return this.http.get<{data: Product[]}>('assets/data/products-orders-small.json')
    .pipe(
      // tap(console.log)
    )
  }

  // getProductWithOrdersSmall(id) {
  //   return this.http.get<any>('assets/data/products-orders-small.json')
  //     .toPromise()
  //     .then(res => <Product[]>res.data?.filter(v => v.id == id))
  //     .then(data => { return data; });
  // }

  getProductWithOrdersSmall(id): Observable<{data: Product[]}> {
    return this.http.get<{data: Product[]}>('assets/data/products-orders-small.json')
      .pipe(
        tap((response) => {
          return response.data?.filter(v => v.id == id);
        })
      )
  }

  generatePrduct(): Product {
    const product: Product = {
      id: this.generateId(),
      name: this.generateName(),
      description: "Product Description",
      price: this.generatePrice(),
      quantity: this.generateQuantity(),
      category: "Product Category",
      inventoryStatus: this.generateStatus(),
      rating: this.generateRating()
    };

    product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-') + ".jpg";;
    return product;
  }

  generateId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName() {
    return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generatePrice() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }

  generateStatus() {
    return this.status[Math.floor(Math.random() * Math.floor(3))];
  }

  generateRating() {
    return Math.floor(Math.random() * Math.floor(5) + 1);
  }

}
