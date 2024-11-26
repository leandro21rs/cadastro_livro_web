import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidations } from 'src/app/shared/helpers/formValidators';
import { MessageInterface } from '../../interfaces/MessageInterface';

@Component({
  selector: 'app-form-validators',
  templateUrl: './form-validators.component.html',
  styleUrls: ['./form-validators.component.css']
})
export class FormValidatorsComponent {
  formulario: FormGroup;
  submit: boolean = false;
  msg: MessageInterface[];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [
        Validators.required
      ]],
      cpf: [null,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          FormValidations.isValidCpf()
        ]
      ],
      rg: [null, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ]]
    })
  }

  onSubmit() {
    // console.log(this.formulario.get('cpf').value);
    // console.log(this.formulario.get('nome').value);
    // console.log(this.formulario.get('rg').value);

    if (this.formulario.valid) {
      this.msg = [
        { severity: 'success', summary: 'Sucesso', detail: 'Dados enviados com sucesso' },
      ];
    } else {
      this.msg = [
        { severity: 'error', summary: 'Dados incorretos', detail: 'O formulário não foi encaminhado' },
      ];

      Object.keys(this.formulario.controls).forEach((v) => {
        const control = this.formulario.get(v);

        control.markAsDirty();
      })
    }


  }

  isValidTouched(v) {
    return !this.formulario.get(v).valid && this.formulario.get(v).touched;
  }
}