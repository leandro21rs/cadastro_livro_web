import { Component, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
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
import { HelpersService } from 'src/app/shared/service/helpers.service';


@Component({
  selector: 'app-table-inline-chart',
  templateUrl: './table-inline-chart.component.html',
  styleUrls: ['./table-inline-chart.component.css']
})
export class TableInlineChartComponent extends SuperComponent {
  items: MenuItem[];

  productDialog: boolean;
  products: Product[];
  product: Product;
  selectedProducts: Product[] = [];

  submitted: boolean;

  display: boolean = false;

  basicData: any;

  basicOptions: any;

  cols: any[];
  exportColumns: any[];
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private productService: ProdutoService,
    private spinnerService: NgxSpinnerService,
    protected modalService: NgbModal,
    protected router: Router,
    private helpersService: HelpersService,
    private renderer: Renderer2
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        const { data } = res;

        this.products = data;
      }, 
      error: (err) => {
        console.log("err: ", err);
      }
    });

    let months = this.helpersService.getMonths(12);
    months = [months[2], months[5], months[8], months[11]]
    let statusType = [];
    let arrProductsName = [];
    let todayDate = new Date();
    let year = todayDate.getFullYear();

    this.productService.getProducts().subscribe({
      next: (res) => {
        const { data } = res;
        if (data.length > 0) {
          data?.map((valor) => {
            let obj = {};
  
            switch (valor?.inventoryStatus) {
              case "INSTOCK":
                obj = {
                  ...valor,
                  "tagType": "success",
                  "basicData": {
                    labels: months,
                    datasets: [
                      {
                        label: 'Evolução de vendas',
                        backgroundColor: '#42A5F5',
                        data: valor.salesEvolution,
                        barThickness: 15,
                      },
                    ]
                  }
                }
                break;
              case "LOWSTOCK":
                obj = {
                  ...valor,
                  "tagType": "warning",
                  "basicData": {
                    labels: months,
                    datasets: [
                      {
                        label: 'Evolução de vendas',
                        backgroundColor: '#42A5F5',
                        data: valor.salesEvolution,
                        barThickness: 15,
                      },
                    ]
                  },
                }
                break;
              case "OUTOFSTOCK":
                obj = {
                  ...valor,
                  "tagType": "danger",
                  "basicData": {
                    labels: months,
                    datasets: [
                      {
                        label: 'Evolução de vendas',
                        backgroundColor: '#42A5F5',
                        data: valor.salesEvolution,
                        barThickness: 15,
                      },
                    ]
                  },
                }
                break;
              default:
                obj = {
                  ...valor,
                  "tagType": "info",
                  "basicData": {
                    labels: months,
                    datasets: [
                      {
                        label: 'Evolução de vendas',
                        backgroundColor: '#42A5F5',
                        data: valor.salesEvolution,
                        barThickness: 15,
                      },
                    ]
                  },
                }
            }
            statusType.push(obj);
  
            let objName = {};
  
            objName = { label: valor.name, value: valor.name };
  
            arrProductsName.push(objName);
          })
        }
        this.products = statusType;
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

      // 'CATEGORY', 'CODE', 'DESCRIPTION', 'ID', 'INVENTORY STATUS', 'NAME', 'PRICE', 'QUANTITY', 'RATING'
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

    this.basicOptions = {
      responsive: true,
      plugins: {
        legend: false
      },
      grid: {
        offset: false
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: false
          },
          ticks: {
            display: false
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
            drawTicks: false
          },
          ticks: {
            display: false
          },
          min: 0,
          max: 100,
        },
      }
      // scales: {
      //   yAxes: [{
      //     display: true,
      //     scaleLabel: {
      //       show: false,
      //       labelString: ''
      //     },
      //     ticks: {
      //       beginAtZero: true,
      //       max: 100,
      //       min: 0,
      //       display: false,
      //       // padding: 50
      //     },
      //     scaleShowLabels: false,
      //     gridLines: {
      //       display: false,
      //     },
      //     angleLines: {
      //       display: false
      //     }
      //   }],
      //   xAxes: [{
      //     // categoryPercentage: 1,
      //     // barPercentage: 1,
      //     ticks: {
      //       display: false,
      //       beginAtZero: 0,
      //     },
      //     gridLines: {
      //       display: false
      //     }
      //   }]
      // }
      // tooltips: {
      //   backgroundColor: '#1e90ff'
      // }
    }

    this.renderer.addClass(document.body, 'table-inline-chart');
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
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Removido', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
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
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Removido', life: 3000 });
        }
      });
    } else {
      this.display = true;

      // this.confirmationService.confirm({
      //   message: 'Não há produtos selecionado!',
      //   header: 'Confirmação',
      //   icon: 'pi pi-exclamation-triangle',
      //   // accept: () => {
      //   //   this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      //   //   this.selectedProducts = null;
      //   //   this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto Removido', life: 3000 });
      //   // }
      // });
    }
  }

  exportPdf() {
    const doc = new jsPDF('l', 'mm', 'a4');

    const head = this.cols.map(col => col.header);
    const header = [head]

    const data = this.products.map((valor) => [
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

    autoTable(doc, {
      head: header,
      body: data,
      didDrawCell: (data) => { },
    });

    doc.save('table.pdf');
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.products);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "products");
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

    csvExporter.generateCsv(this.products);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'table-inline-chart');
  }
}