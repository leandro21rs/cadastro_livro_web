import { Component, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProdutoService } from '../../../services/produto.service';
import { ConfirmationService } from 'primeng/api';
import { ProductOrderSmall } from '../../../interfaces/ProductOrderSmall';
import { Products } from '../../../interfaces/Products';
import { SuperComponent } from 'src/app/core/components/super-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-edit-expansion',
  templateUrl: './table-edit-expansion.component.html',
  styleUrls: ['./table-edit-expansion.component.css']
})
export class TableEditExpansionComponent extends SuperComponent {
  submitted: boolean;
  productDialog: boolean;
  warningDialog: boolean = false;
  dangerDialog: boolean = false;
  products: Products[];
  product: ProductOrderSmall;
  productId: any;
  statuses = [
    { label: "Delivered", value: "DELIVERED" },
    { label: "Pending", value: "PENDING" },
    { label: "Returned", value: "RETURNED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];
  statuses2 = [
    { label: "In stock", value: "INSTOCK" },
    { label: "Low stock", value: "LOWSTOCK" },
    { label: "Out of stock", value: "OUTOFSTOCK" },
  ];
  categories = [
    { label: "Accessories", value: "Accessories" },
    { label: "Fitness", value: "Fitness" },
    { label: "Clothing", value: "Clothing" },
    { label: "Electronics", value: "Electronics" },
  ];
  msgs: any = [];
  clonedProducts: { [s: string]: ProductOrderSmall; } = {};

  constructor(
    private confirmationService: ConfirmationService,
    private productService: ProdutoService,
    private renderer: Renderer2,
    protected modalService: NgbModal,
    protected router: Router,
  ) { 
    super(modalService, router)
  }

  ngOnInit(): void {
    this.productService.getProductsWithOrdersSmall().subscribe({
      next: (res) => {
        const { data } = res;
        this.products = data
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.renderer.addClass(document.body, 'table-expansion-edit');
  }

  addMessages(message) {
    this.msgs = [
      message
    ];
  }

  clearMessages() {
    this.msgs = [];
  }

  editProduct(order, productId) {
    this.productId = productId;
    this.product = { ...order };
    this.productDialog = true;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  findIndexByOrdersId(id: string, position): number {
    let index = -1;
    for (let i = 0; i < this.products[position].orders.length; i++) {
      if (this.products[position].orders[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.customer.trim()) {
      if (this.product.id) {
        let position =  this.findIndexById(this.productId);
        if(position == -1){
          this.productDialog = false;
          this.warningDialog = true;
          return;
        }

        let orderPosition = this.findIndexByOrdersId(this.product.id, position);
        if(orderPosition == -1) {
          this.productDialog = false;
          this.warningDialog = true;
          return;
        }
        this.products[position].orders[orderPosition] = this.product;
      }
      else {
        this.product.id = this.createId();
        this.products.push(this.product);
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = { };
      let message =  {severity:'success', summary:'Sucesso', detail:'Dado editado com sucesso!'};
      this.addMessages(message);
      setTimeout(() => { 
        this.clearMessages();
      }, 3000);
      
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  onRowEditInit(product: Products) {    
    this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(product: Products) {
    if (product.price > 0) {
      delete this.clonedProducts[product.id];

      let message =  {severity:'success', summary:'Sucesso', detail:'Dado editado com sucesso!'};
      this.addMessages(message);
      setTimeout(() => { 
        this.clearMessages();
      }, 3000);
    }
    else {
      let message =  {severity:'warn', summary:'Atenção', detail:'Não foi possível editar este dado!'};
      this.addMessages(message);
      setTimeout(() => { 
        this.clearMessages();
      }, 3000);
    }
  }

  onRowEditCancel(product: Products, index: number) {
    this.products[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }

  deleteProductOrder(order, productId) {
    let position = this.findIndexById(productId);

    if(position == -1) {
      this.dangerDialog = true;
      return;
    }

    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir o pedido do cliente ' + order.customer + '?',
      header: 'Confirmação',
      accept: () => {
        let newOrders = this.products[position].orders.filter(val => val.id !== order.id);
        this.products = this.products.map(val => {
          if(val.id == productId) {
            this.products[position].orders = newOrders;
          }

          return val;
        })
        this.product = {};

        let message =  {severity:'success', summary:'Sucesso', detail:'Dado excluído com sucesso!'};
        this.addMessages(message);
        setTimeout(() => { 
          this.clearMessages();
        }, 3000);
      }
    });
  }

  deleteProduct(product) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir ' + product.name + '?',
      header: 'Confirmação',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};

        let message =  {severity:'success', summary:'Sucesso', detail:'Dado excluído com sucesso!'};
        this.addMessages(message);
        setTimeout(() => { 
          this.clearMessages();
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'table-expansion-edit');
  }
}
