import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutorService} from './autor.service';
import {Autor} from './autor-model';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css'],
})
export class AutorComponent implements OnInit {
  autores: Autor[] = [];
  autorForm: FormGroup;
  isEditing: boolean = false;
  selectedAutorId?: number;
  loading: boolean = false;

  constructor(
    private autorService: AutorService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listarAutores();

    // Inicializa o formulário com validação
    this.autorForm = this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  listarAutores(): void {
    this.loading = true;
    this.autorService.findAll().subscribe({
      next: (res) => {
        this.autores = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os autores.',
        });
      },
    });
  }

  salvarAutor(): void {
    if (this.autorForm.valid) {
      const autor: Autor = { ...this.autorForm.value };

      this.loading = true;
      if (this.isEditing && this.selectedAutorId != null) {
        this.autorService.update(this.selectedAutorId, autor).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Autor atualizado com sucesso!',
            });
            this.resetForm();
            this.listarAutores();
          },
          error: () => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao atualizar o autor.',
            });
          },
        });
      } else {
        this.autorService.save(autor).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Autor salvo com sucesso!',
            });
            this.resetForm();
            this.listarAutores();
          },
          error: () => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao salvar o autor.',
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

  editarAutor(autor: Autor): void {
    this.autorForm.setValue({
      nome: autor.nome,
    });

    this.selectedAutorId = autor.codAu;
    this.isEditing = true;
  }

  deletarAutor(id: number): void {
    this.autorService.delete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Autor excluído com sucesso!',
        });
        this.listarAutores();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir o autor.',
        });
      },
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedAutorId = undefined;
    this.autorForm.reset({
      nome: '',
    });
  }
}
