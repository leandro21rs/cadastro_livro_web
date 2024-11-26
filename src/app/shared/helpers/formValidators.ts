import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AbstractControl, Validators } from '@angular/forms';

export class FormValidations {
    static isValidCpf() {
        return (control: AbstractControl): Validators => {
            const cpf = control.value;
            if (cpf && cpf !== ""){
                if(cpf.length < 11) {
                    return null;
                }

                if (
                    cpf == "00000000000" ||
                    cpf == "11111111111" ||
                    cpf == "22222222222" ||
                    cpf == "33333333333" ||
                    cpf == "44444444444" ||
                    cpf == "55555555555" ||
                    cpf == "66666666666" ||
                    cpf == "77777777777" ||
                    cpf == "88888888888" ||
                    cpf == "99999999999"
                ){
                    return { cpfNotValid: true };
                }
                    
                // Valida 1o digito
                let add = 0;
                for (var i = 0; i < 9; i++){
                    add += parseInt(cpf.charAt(i)) * (10 - i);
                } 
                rev = 11 - (add % 11);

                if (rev == 10 || rev == 11) {
                    rev = 0;
                }

                if (rev != parseInt(cpf.charAt(9))) {
                    return { cpfNotValid: true };
                }

                // Valida 2o digito
                add = 0;
                for (i = 0; i < 10; i++) {
                    add += parseInt(cpf.charAt(i)) * (11 - i);
                }

                var rev = 11 - (add % 11);
                if (rev == 10 || rev == 11) {
                    rev = 0;
                }

                if (rev != parseInt(cpf.charAt(10))) {
                    return { cpfNotValid: true };
                }
            }
            
            return null;
        }
    };

    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
        console.log(fieldName);
        console.log(validatorName);
        console.log(validatorValue);


        const config = {
          'required': `${fieldName} é obrigatório.`,
          'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
          'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
          'isValidCpf': 'CPF inválido.',
          'emailInvalido': 'Email já cadastrado!',
          'equalsTo': 'Campos não são iguais',
          'pattern': 'Campo inválido'
        };
    
        return config[validatorName];
      }
}