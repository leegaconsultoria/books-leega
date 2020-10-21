import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/pt-br';

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
  authors
  editors
  editBookForm: FormGroup
  authorsIds = new FormControl();

  public constructor(private booksService: BooksService, private toastr: ToastrService, private formBuilder: FormBuilder) {}

  public ngOnInit(): any {
    this.loadingAuthors();
    this.loadingEditors();
    this.editBookForm = this.formBuilder.group({
      name: ['', Validators.required],
      publicationDate: ['', Validators.required],
      authors: ['', Validators.required],
      editor: ['', Validators.required],
    });
    moment(this.editBookForm.value.publishDate).format("DD-MM-YYYY")
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
  }

  loadingBooks(): any {
    this.booksService.getAllBooks().subscribe(
      data => {
        this.books = data.data.books;
        console.log('data', this.books)
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

  loadingAuthors(): any {
    this.booksService.getAllAuthors().subscribe(
      data => {
        this.authors = data.data.authors;
        console.log('authorsModal', this.authors)
      },
      (error) => {
        this.toastr.error('Erro ao carregar autores');
        console.log('error', error);
      }
    );
  }

  loadingEditors(): any {
    this.booksService.getAllEditors().subscribe(
      data => {
        this.editors = data.data.editors;
        console.log('data', data)
      },
      (error) => {
        this.toastr.error('Erro ao carregar livros');
        console.log('error', error);
      }
    );
  }

  deleteBook(bookId): any {
    this.booksService.deleteBook(bookId).subscribe(
      (data) => {
        this.toastr.success('Livro removido com sucesso');
        console.log(data);
        this.loadingBooks()
      },
      (error) => {
        this.toastr.error('Erro ao remover livro');
        console.log(error);
      }
    );
  }
}
