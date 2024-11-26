import { Component, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SuperComponent } from 'src/app/core/components/super-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../interfaces/Product';
import { SelectItem } from 'primeng/api';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent extends SuperComponent {
  formulario!: FormGroup;
  activeState: boolean[] = [true, false, false];
  submitted: boolean = false;
  sexos: any[];
  products: Product[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  textLorem: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  constructor(
    protected modalService: NgbModal,
    protected router: Router,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private productService: ProdutoService
  ) {
    super(modalService, router)
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      sexo: [null, Validators.required],
      renda: [null, Validators.required],
      email: [null, Validators.required],
      assunto: [null, Validators.required],
      mensagem: [null, Validators.required],
    });

    this.sexos = [
      { name: 'Feminino', key: 'F' },
      { name: 'Masculino', key: 'M' }
    ];

    this.renderer.addClass(document.body, 'accordion');

    this.productService.getProducts().subscribe({
      next: (res) => {
        const { data } = res;
        this.products = data
      },
      error: (err) => {
        console.log("err: ", err);
      }
    });

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onTabClose(event) {
  }

  onTabOpen(event) {
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }

  onSubmit() {
    this.submitted = true;

    if (this.formulario.valid) {
      this.formulario.reset();
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar(): void {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.controls[campo].valid && (this.formulario.controls[campo].touched || this.formulario.controls[campo].dirty);
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');

    if (campoEmail?.touched && campoEmail?.value) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(campoEmail?.value)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  popularDadosForm(dados: any) {
    if (dados.erro == true) {
      alert(dados.erro);
      return;
    }

    this.formulario.patchValue({
      rua: dados.logradouro,
      cep: dados.cep,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      rua: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null
    })
  }

  onChange(nome: string) {
    switch (nome) {
      case 'nome':
      case 'rua':
      case 'bairro':
      case 'cidade':
      case 'estado':
      case 'complemento':
        this.formulario.get(nome)?.setValue(this.formulario.get(nome)?.value.replace(/[^a-zA-ZçÇãâáôõ ]+/g, ''));
        break;
      case 'numero':
      case 'cep':
        this.formulario.get(nome)?.setValue(this.formulario.get(nome)?.value.replace(/[^0-9]+/g, ''));
        break;
      default:
        break
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'accordion');
  }

}
