import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

// import { User } from '../_models/user.model';

@Component({
  selector: 'books-component',
  templateUrl: './books.template.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books = [];
  author = [];
  dtOptions: DataTables.Settings = {};
  bookName;
  valueBook;

  public constructor(private booksService: BooksService, private toastr: ToastrService) {}

  public ngOnInit(): any {
    this.loadingBooks();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: {
        emptyTable: 'Nenhum registro encontrado',
        info: 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
        infoEmpty: 'Mostrando 0 até 0 de 0 registros',
        infoFiltered: '(Filtrados de _MAX_ registros)',
        infoPostFix: '',
        lengthMenu: '_MENU_ resultados por página',
        loadingRecords: 'Carregando...',
        processing: 'Processando...',
        zeroRecords: 'Nenhum registro encontrado',
        search: 'Pesquisar',
        paginate: {
          next: 'Próximo',
          previous: 'Anterior',
          first: 'Primeiro',
          last: 'Último',
        },
        aria: {
          sortAscending: ': Ordenar colunas de forma ascendente',
          sortDescending: ': Ordenar colunas de forma descendente',
        },
      },
    };
    // this.books = [
    //   {
    //     id: 1,
    //     name: 'Livro 1',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Robert Kiyosaki',
    //         cpf: '334.555.770-20',
    //       },
    //     ],
    //     publicationDate: '21/01/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 2,
    //     name: 'Livro 2',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Pedro Nunes',
    //         cpf: '222.346.555-20',
    //       },
    //     ],
    //     publicationDate: '22/02/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 3,
    //     name: 'Livro 3',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Jessica Andrade',
    //         cpf: '246.234.700-55',
    //       },
    //     ],
    //     publicationDate: '23/03/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 4,
    //     name: 'Livro 4',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Fernanda Couto',
    //         cpf: '111.345.455-77',
    //       },
    //     ],
    //     publicationDate: '24/04/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 5,
    //     name: 'Livro 5',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Lima Kiyosaki',
    //         cpf: '323.346.123-20',
    //       },
    //     ],
    //     publicationDate: '25/05/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 6,
    //     name: 'Livro 6',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Luis 2',
    //         cpf: '385.265.785-20',
    //       },
    //     ],
    //     publicationDate: '26/06/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 7,
    //     name: 'Livro 7',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Ana 1',
    //         cpf: '324.566.777-20',
    //       },
    //     ],
    //     publicationDate: '27/07/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 8,
    //     name: 'Livro 8',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Joao 3',
    //         cpf: '246.346.700-20',
    //       },
    //     ],
    //     publicationDate: '28/08/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 9,
    //     name: 'Livro 9',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Rosana Lima',
    //         cpf: '232.122.432-20',
    //       },
    //     ],
    //     publicationDate: '29/09/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 10,
    //     name: 'Livro 10',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Paulo 5',
    //         cpf: '435.678.978-20',
    //       },
    //     ],
    //     publicationDate: '30/10/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 11,
    //     name: 'Teste1',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Maria 4',
    //         cpf: '246.346.700-20',
    //       },
    //     ],
    //     publicationDate: '20/02/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    //   {
    //     id: 12,
    //     name: 'Teste1',
    //     authorSet: [
    //       {
    //         id: 1,
    //         name: 'Ana Kiyosaki',
    //         cpf: '246.346.700-20',
    //       },
    //     ],
    //     publicationDate: '20/01/2020',
    //     isbnNumber: 9781586210915,
    //     editor: {
    //       id: 1,
    //       name: 'teste',
    //     },
    //   },
    // ];
  }

  loadingBooks(): any {
    this.booksService.getAllBooks().subscribe(
      (data) => {
        this.books = data.books;
        console.log('data', data)
      },
      (error) => {
        this.toastr.error('Erro ao carregar livros');
        console.log('error', error);
      }
    );
  }

  getBook(book): any {
    this.bookName = book.name;
  }

  deleteBook(bookId): any {
    this.booksService.deleteBook(bookId).subscribe(
      (data) => {
        this.toastr.success('Livro removido com sucesso');
        console.log(data);
      },
      (error) => {
        this.toastr.error('Erro ao remover livro');
        console.log(error);
      }
    );
  }
}
