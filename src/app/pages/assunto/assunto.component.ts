import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssuntoService } from './assunto.service';
import { MessageService } from 'primeng/api';
import {Assunto} from './assunto-model';

@Component({
  selector: 'app-assunto',
  templateUrl: './assunto.component.html',
  styleUrls: ['./assunto.component.css'],
})
export class AssuntoComponent implements OnInit {
  assuntoForm: FormGroup;
  assuntos: Assunto[] = [];
  isEditing: boolean = false;
  selectedAssuntoId?: number;
  loading: boolean = false;

  constructor(
    private assuntoService: AssuntoService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listarAssuntos();
    this.assuntoForm = this.formBuilder.group({
      descricao: ['', Validators.required],
    });
  }

  listarAssuntos(): void {
    this.loading = true;
    this.assuntoService.findAll().subscribe({
      next: (res) => {
        this.assuntos = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os assuntos.',
        });
      },
    });
  }

  salvarAssunto(): void {
    if (this.assuntoForm.valid) {
      const assunto: Assunto = {
        codAs: 0, // ID será atribuído pelo backend após salvar
        descricao: this.assuntoForm.value.descricao,
      };

      this.loading = true;
      if (this.isEditing && this.selectedAssuntoId != null) {
        this.assuntoService.update(this.selectedAssuntoId, assunto).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Assunto atualizado com sucesso!',
            });
            this.resetForm();
            this.listarAssuntos();
          },
          error: () => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao atualizar o assunto.',
            });
          },
        });
      } else {
        this.assuntoService.save(assunto).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Assunto salvo com sucesso!',
            });
            this.resetForm();
            this.listarAssuntos();
          },
          error: () => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao salvar o assunto.',
            });
          },
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Por favor, preencha todos os campos obrigatórios.',
      });
    }
  }

  editarAssunto(assunto: Assunto): void {
    this.assuntoForm.setValue({
      descricao: assunto.descricao,
    });

    this.selectedAssuntoId = assunto.codAs;
    this.isEditing = true;
  }

  deletarAssunto(id: number): void {
    this.assuntoService.delete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Assunto excluído com sucesso!',
        });
        this.listarAssuntos();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir o assunto.',
        });
      },
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedAssuntoId = undefined;
    this.assuntoForm.reset({
      descricao: '',
    });
  }
}
