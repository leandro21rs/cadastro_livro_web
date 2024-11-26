export interface Autor {
    codAu: number;
    nome: string;
}

export interface Assunto {
    codAs: number;
    descricao: string;
}

export interface Livro {
    titulo: string;
    editora: string;
    edicao: number;
    anoPublicacao: string;
    valor: number;
}

  
  export interface LivroDTO {
    livro: Livro;
    autorIds: number[];
    assuntoIds: number[];
  }

  export interface LivroResponse {
    cod?: number;
    titulo: string;
    editora: string;
    edicao: number;
    anoPublicacao: string;
    valor: number;
    autores: Autor[];
    assuntos: Assunto[];
}
