import { Component, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import { ExportToCsv } from 'export-to-csv';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuperComponent } from 'src/app/core/components/super-component';
import { Product } from '../../../interfaces/Product';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent extends SuperComponent {
  items: MenuItem[];
  productDialog: boolean;
  products: Product[];
  product: Product;
  selectedProducts: Product[] = [];
  submitted: boolean;
  display: boolean = false;
  cols: any[];
  exportColumns: any[];
  msgs: any = [];

  constructor(
    private confirmationService: ConfirmationService,
    private productService: ProdutoService,
    private spinnerService: NgxSpinnerService,
    protected modalService: NgbModal,
    protected router: Router,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    let statusType = [];
    this.productService.getProducts().subscribe({
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
      { field: 'category', header: 'Category' },
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'description', header: 'Description' },
      { field: 'id', header: 'Id' },
      { field: 'inventorystatus', header: 'Inventory Status' },
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'rating', header: 'Rating' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

    this.items = [{
      label: 'Exportar',
      items: [
        {
          label: 'PDF',
          icon: 'pi pi-file-pdf',
          command: () => {
            this.exportPdf();
          }
        },
        {
          label: 'CSV',
          icon: 'pi pi-file',
          command: () => {
            this.exportCSV();
          }
        },
        {
          label: 'XLS',
          icon: 'pi pi-file-excel',
          command: () => {
            this.exportExcel();
          }
        }
      ]
    }, {
      label: 'Excluir',
      items: [
        {
          label: 'Excluir',
          icon: 'pi pi-times',
          command: () => {
            this.deleteSelectedProducts();
          }
        }
      ]
    }];

    this.renderer.addClass(document.body, 'crud');
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  
  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Tem certeza de que deseja excluir ' + product.name + '?',
      header: 'Confirmação',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        let message =  {severity:'success', summary:'Sucesso', detail:'Dado excluído com sucesso!'};
        this.addMessages(message);
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        let message =  {severity:'success', summary:'Sucesso', detail:'Dado editado com sucesso!'};
        this.addMessages(message);
      }
      else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        let message =  {severity:'success', summary:'Sucesso', detail:'Dado criado com sucesso!'};
        this.addMessages(message);
      }
      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  editProduct(product: Product) {
    this.product = { ...product };
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

  deleteSelectedProducts() {
    if (this.selectedProducts.length > 0) {
      this.confirmationService.confirm({
        message: 'Tem certeza de que deseja excluir os produtos selecionados?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.products = this.products.filter(val => !this.selectedProducts.includes(val));
          this.selectedProducts = null;
          let message =  {severity:'success', summary:'Sucesso', detail:'Dado excluído com sucesso!'};
          this.addMessages(message);
        }
      });
    } else {
      this.display = true;
    }
  }

  exportPdf() {
    const doc = new jsPDF('l', 'mm', 'a4');
    const head = this.cols.map(col => col.header);
    const header = [head];
    let data = [];

    if(this.selectedProducts.length > 0) {
      data = this.selectedProducts.map((valor) => [
        valor.category,
        valor.code,
        valor.description,
        valor.id,
        valor.inventoryStatus,
        valor.name,
        valor.price,
        valor.quantity,
        valor.rating
      ])
    } else {
      data = this.products.map((valor) => [
        valor.category,
        valor.code,
        valor.description,
        valor.id,
        valor.inventoryStatus,
        valor.name,
        valor.price,
        valor.quantity,
        valor.rating
      ])
    }

    autoTable(doc, {
      head: header,
      body: data,
      didDrawCell: (data) => { },
    });

    doc.save('table.pdf');
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      if(this.selectedProducts.length > 0) {
        const worksheet = xlsx.utils.json_to_sheet(this.selectedProducts);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
      } else {
        const worksheet = xlsx.utils.json_to_sheet(this.products);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
      }
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);

    if(this.selectedProducts.length > 0) {
      csvExporter.generateCsv(this.selectedProducts);
    } else {
      csvExporter.generateCsv(this.products);
    }
  }

  addMessages(message) {
    this.msgs = [
      message
    ];
    setTimeout(() => { 
      this.clearMessages();
    }, 3000);
  }

  clearMessages() {
    this.msgs = [];
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'crud');
  }
}
