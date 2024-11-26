import { Component, Renderer2 } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ExportToCsv } from 'export-to-csv';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SuperComponent } from 'src/app/core/components/super-component';
import { Product } from '../../../interfaces/Product';
import { Country } from '../../../interfaces/Country';
import { ProdutoService } from '../../../services/produto.service';
import { PaisService } from '../../../services/pais.service';
import { HelpersService } from 'src/app/shared/service/helpers.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    providers: [ConfirmationService]
})
export class TableComponent extends SuperComponent {
    date1: Date;
    date2: Date;
    historicProduct: boolean;
    productDialog: boolean;
    products: Product[];
    productsTMP: Product[];
    product: Product;
    selectedProducts: Product[] = [];
    submitted: boolean;
    statuses: any[];
    status: any[] = [];
    categories: any[];
    category: any[] = [];
    productName: string;
    productsResult: boolean = false;
    basicData: any;
    basicOptions: any;
    totalSales: number = 0;
    countries: Country[];
    selectedCountries: Country[] = [];
    allProductsName: any[];
    selectedProductName: any[] = [];
    isAdvancedSearch: boolean = false;
    stocks: any[] = [];
    selectedStocks: any;
    selectedStocksTMP: any;
    items: any;
    display: boolean = false;
    dataHoje: Date;
    prodToExport: Product[];
    selectedRadioOption: any = null;
    options: any[] = [{ name: 'Mais vendido', key: '4' }, { name: 'Menos vendido', key: '5' }];
    selectedCompanies: any = null;
    companies: any[] = [{ name: 'Empresa 1', key: '1' }, { name: 'Empresa 2', key: '2' }, { name: 'Empresa 3', key: '3' }];
    value2: number = 50;

    constructor(
        private productService: ProdutoService,
        private confirmationService: ConfirmationService,
        protected modalService: NgbModal,
        protected router: Router,
        private countryService: PaisService,
        private spinnerService: NgxSpinnerService,
        private helpersService: HelpersService,
        private renderer: Renderer2
    ) {
        super(modalService, router)
    }

    ngOnInit() {
        this.countryService.getCountriesName().subscribe({
            next: (res) => {
                const { data } = res;
                this.countries = data;
            }, 
            error: (err) => {
              console.log("err: ", err);
            }
        });

        this.productService.getProducts().subscribe({
            next: (res) => {
                const { data } = res;
                this.prodToExport = data
            }, 
            error: (err) => {
              console.log("err: ", err);
            }
          });

        let months = this.helpersService.getMonths(6);
        let statusType = [];
        let arrProductsName = [];
        this.productService.getProducts().subscribe({
            next: (res) => {
                const { data } = res;

                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        this.totalSales += data[i].sales;
                    }
    
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
                                                label: 'Histórico de preço nos últimos 6 meses',
                                                // backgroundColor: '#42A5F5',
                                                data: valor.historicPrice,
                                                fill: false,
                                                borderColor: '#42A5F5',
                                                tension: .4
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
                                                label: 'Histórico de preço nos últimos 6 meses',
                                                // backgroundColor: '#42A5F5',
                                                data: valor.historicPrice,
                                                fill: false,
                                                borderColor: '#42A5F5',
                                                tension: .4
                                            },
                                        ]
                                    }
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
                                                label: 'Histórico de preço nos últimos 6 meses',
                                                // backgroundColor: '#42A5F5',
                                                data: valor.historicPrice,
                                                fill: false,
                                                borderColor: '#42A5F5',
                                                tension: .4
                                            },
                                        ]
                                    }
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
                                                label: 'Histórico de preço nos últimos 6 meses',
                                                // backgroundColor: '#42A5F5',
                                                data: valor.historicPrice,
                                                fill: false,
                                                borderColor: '#42A5F5',
                                                tension: .4
                                            },
                                        ]
                                    }
                                }
                        }
                        statusType.push(obj);
                        let objName = {};
                        objName = { label: valor.name, value: valor.name };
                        arrProductsName.push(objName);
                    })
                }
                this.products = statusType;
                this.productsTMP = statusType;
                this.allProductsName = arrProductsName;
            }, 
            error: (err) => {
              console.log("err: ", err);
            }
        });

        this.basicData = {
            labels: this.helpersService.getMonths(6),
            datasets: [
                {
                    label: 'My First dataset',
                    // backgroundColor: '#42A5F5',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                },
                {
                    label: 'My Second dataset',
                    // backgroundColor: '#FFA726',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: .4
                }
            ]
        };

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' },
            { label: 'ZERO', value: 'zero' },
        ];

        this.categories = [
            { label: 'Accessories', value: 'accessories' },
            { label: 'Clothing', value: 'clothing' },
            { label: 'Eletronics', value: 'eletronis' },
            { label: 'Fitness', value: 'fitness' },
            { label: 'Computer', value: 'computer' },
        ];

        this.stocks = [
            { label: 'De 1 até 10 quantidades', min: 1, max: 10 },
            { label: 'De 10 até 20 quantidades', min: 10, max: 20 },
            { label: 'De 20 até 30 quantidades', min: 20, max: 30 },
            { label: 'De 30 até 40 quantidades', min: 30, max: 40 },
            { label: 'De 40 até 50 quantidades', min: 40, max: 50 },
            { label: 'De 50 até 60 quantidades', min: 50, max: 60 },
            { label: 'De 60 até 70 quantidades', min: 60, max: 70 },
            { label: 'De 70 até 80 quantidades', min: 70, max: 80 },
            { label: 'De 80 até 90 quantidades', min: 80, max: 90 },
            { label: 'De 90 até 100 quantidades', min: 90, max: 100 }
        ]

        this.items = [{
            label: 'Ações',
            items: [
                {
                    label: 'Gerar relatório mensal',
                    icon: 'pi pi-file',
                    command: () => {
                        this.gerarRelatorioMensal();
                    }
                },
                {
                    label: 'Gerar relatório de estoque',
                    icon: 'pi pi-file',
                    command: () => {
                        this.gerarRelatorioEstoque();
                    }
                }
            ]
        }
        ];
        this.renderer.addClass(document.body, 'table-search');
    }

    registrarEstoque() {
        if (this.selectedProducts.length > 0) {

        }
    }

    registrarSaída() {
        if (this.selectedProducts.length > 0) {

        }
    }

    gerarRelatorioMensal() {
        if (this.selectedProducts.length > 0) {
            this.exportPdf('mensal');
        } else {
            this.display = true;
        }
    }

    gerarRelatorioEstoque() {
        if (this.selectedProducts.length > 0) {
            this.exportPdf('estoque');
        } else {
            this.display = true;
        }
    }

    getStocksQuantities() {
        let arrQtd = [];

        for (let i = 0; i < 100; i++) {
            arrQtd.push({ qtd: i + 1 });
        }

        return arrQtd;
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            accept: () => {
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                this.selectedProducts = null;
            }
        });
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter(val => val.id !== product.id);
                this.product = {};
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    hideHistoricDialog() {
        this.historicProduct = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
            }
            else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
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

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    searchProduct() {
        this.products = this.productsTMP;
        this.productsResult = false;
        this.selectedStocksTMP = [this.selectedStocks];

        if ((this.status.length > 0) || (this.category.length > 0) || (this.productName) || (this.selectedProductName.length > 0) || (this.selectedCountries.length > 0) || (this.selectedStocks)) {
            this.products = this.products.filter(val => {
                var ret = false;
                if (this.status.length > 0) {
                    this.status.map(stat => {
                        if (ret == false) {
                            ret = (val.inventoryStatus.toLowerCase() == stat.value);
                            return;
                        } else {
                            this.setProductsResult();
                        }
                    })
                }

                if (this.category.length > 0) {
                    this.category.map(cat => {
                        if (!ret) {
                            ret = (val.category.toLowerCase() == cat.value);
                            return;
                        } else {
                            this.setProductsResult();
                        }
                    })
                }

                if (this.productName) {
                    ret = val.name.toLowerCase().includes(this.productName.toLowerCase());
                } else {
                    this.setProductsResult();
                }

                if (this.selectedProductName.length > 0) {
                    this.selectedProductName.map(nam => {
                        if (!ret) {
                            ret = (val.name.toLowerCase() == nam.value.toLowerCase());
                            return;
                        } else {
                            this.setProductsResult();
                        }
                    })
                }

                if (this.isAdvancedSearch) {
                    if (this.selectedCountries.length > 0) {
                        this.selectedCountries.map(cont => {
                            if (ret == false) {
                                ret = (val.manufacturingCountry.toLowerCase().includes(cont.name.toLowerCase()));
                                return;
                            } else {
                                this.setProductsResult();
                            }
                        })
                    }

                    if (this.selectedStocksTMP.length > 0) {
                        this.selectedStocksTMP.map(stock => {
                            if (ret == false) {
                                ret = (val.quantity >= stock?.min && val.quantity <= stock?.max);
                                return;
                            } else {
                                this.setProductsResult();
                            }
                        })
                    }
                }
                return ret;
            });
        }
    }

    advancedSearch() {
        if (!this.isAdvancedSearch) {
            this.isAdvancedSearch = true;

            return;
        }

        this.isAdvancedSearch = false;
    }

    setProductsResult() {
        this.productsResult = true;
    }

    openProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
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

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.prodToExport);
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

    exportPdf(valor) {
        let cols = [];
        let header = [];
        let data = [];
        const doc = new jsPDF('l', 'mm', 'a4');
        var img = new Image();
        img.src = 'assets/images/logo.jpg';

        this.dataHoje = new Date();

        let hoje = this.dataHoje.getDate();
        let mes = this.dataHoje.getMonth() + 1;
        let ano = this.dataHoje.getFullYear();
        let nomeMes = '';

        switch (mes) {
            case 1:
                nomeMes = "Janeiro";
                break;
            case 2:
                nomeMes = "Fevereiro";
                break;
            case 3:
                nomeMes = "Março";
                break;
            case 4:
                nomeMes = "Abril";
                break;
            case 5:
                nomeMes = "Maio";
                break;
            case 6:
                nomeMes = "Junho";
                break;
            case 7:
                nomeMes = "Julho";
                break;
            case 8:
                nomeMes = "Agosto";
                break;
            case 9:
                nomeMes = "Setembro";
                break;
            case 10:
                nomeMes = "Outubro";
                break;
            case 11:
                nomeMes = "Novembro";
                break;
            case 12:
                nomeMes = "Dezembro";
                break;
            default:
                nomeMes = "Mês inexistente";
        }

        doc.addImage(img, 'JPEG', 130, 5, 30, 30, 'logo', 'NONE', 0);

        if (valor == 'estoque') {
            cols = [
                { field: 'month', header: 'Month' },
                { field: 'category', header: 'Category' },
                { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
                { field: 'description', header: 'Description' },
                { field: 'id', header: 'Id' },
                { field: 'inventorystatus', header: 'Inventory Status' },
                { field: 'name', header: 'Name' },
                { field: 'price', header: 'Price' },
                { field: 'quantity', header: 'Quantity' },
            ]

            const head = cols.map(col => col.header);
            header = [head];
            let month = 'Maio';

            data = this.selectedProducts.map((valor) => [
                month,
                valor.category,
                valor.code,
                valor.description,
                valor.id,
                valor.inventoryStatus,
                valor.name,
                valor.price,
                valor.quantity
            ]);

            doc.text('RELATÓRIO MENSAL DE ESTOQUE', 100, 45);
            doc.setFontSize(10);
            doc.text(`Rio de Janeiro, ${hoje} de ${nomeMes} de ${ano}`, 225, 55);

        } else if (valor == 'mensal') {
            cols = [
                { field: 'month', header: 'Month' },
                { field: 'category', header: 'Category' },
                { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
                { field: 'description', header: 'Description' },
                { field: 'id', header: 'Id' },
                { field: 'inventorystatus', header: 'Inventory Status' },
                { field: 'name', header: 'Name' },
                { field: 'price', header: 'Price' },
                { field: 'quantity', header: 'Quantity' },
                { field: 'rating', header: 'Rating' },
                { field: 'sales', header: 'Sales' },
                { field: 'total', header: 'Total' }
            ]

            const head = cols.map(col => col.header);
            header = [head];
            let month = 'Maio';
            let total = '';
            let valorTotal = 0;

            data = this.selectedProducts.map((valor) => {

                valorTotal = (valor.sales * valor.price) + valorTotal;
                return [
                    month,
                    valor.category,
                    valor.code,
                    valor.description,
                    valor.id,
                    valor.inventoryStatus,
                    valor.name,
                    valor.price,
                    valor.quantity,
                    valor.rating,
                    valor.sales,
                    total = `R$${valor.sales * valor.price}`
                ]
            });

            doc.text('RELATÓRIO MENSAL DE VENDAS', 100, 45);
            doc.setFontSize(10);
            doc.text(`Rio de Janeiro, ${hoje} de ${nomeMes} de ${ano}`, 225, 55);
        }

        autoTable(doc, {
            head: header,
            body: data,
            margin: { top: 60 },
            didDrawPage: function (data) {
                data.settings.margin.top = 10
            },
            didDrawCell: (data) => { },
        });


        doc.save('table.pdf');
    }

    openHistoric(product: Product) {
        this.product = { ...product };
        this.historicProduct = true;
    }

    ngOnDestroy() {
        this.renderer.removeClass(document.body, 'table-search');
    }
}
