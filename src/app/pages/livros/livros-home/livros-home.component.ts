import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LivrosService} from './livros.service';
import { AssuntoService} from '../../assunto/assunto.service';
import { AutorService} from '../../autor/autor.service';
import {Livro, LivroDTO, LivroResponse} from './livros-model';
import {Assunto} from '../../assunto/assunto-model';
import {Autor} from '../../autor/autor-model';

@Component({
  selector: 'app-livros-home',
  templateUrl: './livros-home.component.html',
  styleUrls: ['./livros-home.component.css'],
})
export class LivrosHomeComponent implements OnInit {
  livros: Livro[] = [];
  assuntos: Assunto[] = [];
  autores: Autor[] = [];
  livroForm: FormGroup;
  isEditing: boolean = false;
  selectedLivroId?: number;
  loading: boolean = false;

  constructor(
    private livrosService: LivrosService,
    private assuntoService: AssuntoService,
    private autorService: AutorService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listarLivros();
    this.listarAssuntos();
    this.listarAutores();

    this.livroForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      editora: ['', Validators.required],
      edicao: [1, [Validators.required, Validators.min(1)]],
      anoPublicacao: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      autorIds: [[]],
      assuntoIds: [[]],
    });
  }

  listarLivros(): void {
    this.loading = true;
    this.livrosService.findAll().subscribe({
      next: (res) => {
        this.livros = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os livros.',
        });
      },
    });
  }

  listarAssuntos(): void {
    this.assuntoService.findAll().subscribe({
      next: (res) => {
        this.assuntos = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os assuntos.',
        });
      },
    });
  }

  listarAutores(): void {
    this.autorService.findAll().subscribe({
      next: (res) => {
        this.autores = res;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os autores.',
        });
      },
    });
  }

  salvarLivro(): void {
    if (this.livroForm.valid) {
      const livroDTO: LivroDTO = this.processarLivroForm(this.livroForm);
  
      this.loading = true;
      if (this.isEditing && this.selectedLivroId != null) {
        this.livrosService.atualizarLivro(this.selectedLivroId, livroDTO).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Livro atualizado com sucesso!',
            });
            this.resetForm();
            this.listarLivros();
          },
          error: () => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao atualizar o livro.',
            });
          },
        });
      } else {
        this.livrosService.salvarLivro(livroDTO).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Livro salvo com sucesso!',
            });
            this.resetForm();
            this.listarLivros();
          },
          error: () => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao salvar o livro.',
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

  processarLivroForm(livroForm: FormGroup): LivroDTO {   
    const livro: Livro = {
        titulo: livroForm.value.titulo,
        editora: livroForm.value.editora,
        edicao: livroForm.value.edicao,
        anoPublicacao: livroForm.value.anoPublicacao,
        valor: livroForm.value.valor,
    };


 
    const autorIds = livroForm.value.autorIds.map((autor: any) =>
        typeof autor === 'number' ? autor : autor.codAu
    );


    const assuntoIds = livroForm.value.assuntoIds.map((assunto: any) =>
        typeof assunto === 'number' ? assunto : assunto.codAs
    );

    return {
        livro,
        autorIds,
        assuntoIds,
    };
}
 
  editarLivro(livro: LivroResponse): void {
    this.livroForm.setValue({
      titulo: livro.titulo,
      editora: livro.editora,
      edicao: livro.edicao,
      anoPublicacao: livro.anoPublicacao,
      valor: livro.valor,
      autorIds: livro.autores,  
      assuntoIds: livro.assuntos 
    });

    this.selectedLivroId = livro.cod;
    this.isEditing = true;
}
  
 
  deletarLivro(id: number): void {
    this.livrosService.delete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Livro excluído com sucesso!',
        });
        this.listarLivros();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir o livro.',
        });
      }
    });
}
  

  resetForm(): void {
    this.isEditing = false;
    this.selectedLivroId = undefined;
    this.livroForm.reset({
      titulo: '',
      editora: '',
      edicao: 1,
      anoPublicacao: '',
      valor: 0,
      autorIds: [],
      assuntoIds: [],
    });
}
}
