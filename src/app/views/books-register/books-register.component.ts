import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-register',
  templateUrl: './books-register.component.html',
  styleUrls: ['./books-register.component.scss']
})
export class BooksRegisterComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
