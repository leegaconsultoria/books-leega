import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-register',
  templateUrl: './books-register.component.html',
  styleUrls: ['./books-register.component.scss']
})
export class BooksRegisterComponent implements OnInit {

  book;
  bookForm: FormGroup;
  authorsIds = new FormControl();
  authors
  editors

  constructor(private route: Router, private booksService: BooksService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
     this.loadingAuthors();
     this.loadingEditors();
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      publicationDate: ['', Validators.required],
      authors: ['', Validators.required],
      editor: ['', Validators.required],
    });
    moment(this.bookForm.value.publishDate).format("DD-MM-YYYY")
    console.log(this.bookForm.value.publishDate)
  }

  bookRegister(): any {
    const localeStringDate = this.bookForm.value.publicationDate.toLocaleString()
    const publicationDate = moment(localeStringDate).format('YYYY-DD-MM')
    const params = {
      name: this.bookForm.value.name,
      publicationDate: publicationDate,
      authors: this.authorsIds.value,
      editor: Number(this.bookForm.value.editor),
      isbnNumber: 9781586210915
    };
    console.log('params', params)
    console.log("booksform", this.bookForm)
    this.booksService.sendBook(params).subscribe(
      (data) => {
        this.toastr.success('Livro adicionado com sucesso');
        this.route.navigate(["/books"])
        console.log(data);
      },
      (error) => {
        this.toastr.error('Erro ao adicionar livro');
        console.log(error);
      }
    );
  }

  loadingAuthors(): any {
    this.booksService.getAllAuthors().subscribe(
      data => {
        this.authors = data.data.authors;
        console.log('authors', this.authors)
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

  isValidCpf(): any {
    return (control: AbstractControl): Validators => {
      const document = control.value.replace('.', '').replace('.', '').replace('-', '');
      document.trim().replace('.', '').replace('.', '').replace('-', '');
      if (document) {

        let isEquals = true;

        for (let i = 1; i < document.length && isEquals; i++) {
          if (document[i] !== document[0]) {
            isEquals = false;
          }
        }

        if (isEquals || document === '12345678909') {
          return { documentNotValid: true };
        }

        const inumbers: number[] = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < document.length; i++) {
          inumbers.push(Number(document[i].toString()));
        }

        let sum = 0;
        let rest;
        let verifierDigits: string;

        // document
        if (document.length === 11) {
          for (let i = 0; i < 9; i++) {
            sum += (10 - i) * inumbers[i];
          }
          rest = sum % 11;
          rest = (rest < 2) ? 0 : (11 - rest);
          verifierDigits = rest.toString();

          sum = 0;
          for (let i = 0; i < 10; i++) {
            sum += (11 - i) * inumbers[i];
          }
          rest = sum % 11;
          rest = (rest < 2) ? 0 : (11 - rest);
          verifierDigits += rest.toString();

          return null;
        }
      }
      return null;
    }
  }

}
