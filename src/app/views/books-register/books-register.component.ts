import { BooksService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-books-register',
  templateUrl: './books-register.component.html',
  styleUrls: ['./books-register.component.scss']
})
export class BooksRegisterComponent implements OnInit {

  book;
  bookForm: FormGroup;
  authors = [
    {value: '0', viewValue: 'Robert Kiyosaki'},
    {value: '1', viewValue: 'Pedro Nunes'},
    {value: '2', viewValue: 'Jessica Andrade'}
  ];

  editors = [
    {value: '0', viewValue: 'AltaBooks'},
    {value: '1', viewValue: 'Teste Editor'},
    {value: '2', viewValue: 'Sextou'}
  ];

  constructor(private booksService: BooksService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      publishDate: ['', Validators.required],
      authorName: ['', Validators.required],
      editorName: ['', Validators.required],
    });
  }

  bookRegister(): any {
    const params = {
      bookName: this.bookForm.value.bookName,
      publishDate: this.bookForm.value.publishDate,
      authorName: this.bookForm.value.authorName,
      editorName: this.bookForm.value.editorName
    };
    console.log(params)
    this.booksService.sendBook(params).subscribe(
      (data) => {
        this.toastr.success('Livro adicionado com sucesso');
        console.log(data);
      },
      (error) => {
        this.toastr.error('Erro ao adicionar livro');
        console.log(error);
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
