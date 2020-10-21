import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'moment/locale/pt-br';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-author-register',
  templateUrl: './author-register.component.html',
  styleUrls: ['./author-register.component.scss']
})
export class AuthorRegisterComponent implements OnInit {
  authorForm

  constructor(private booksService: BooksService, private toastr: ToastrService, private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authorForm = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
    });
  }

  authorRegister(): any {
    const params = {
      name: this.authorForm.value.name,
      cpf: this.authorForm.value.cpf,
    };
    console.log('params', params)
    console.log("authorForm", this.authorForm)
    this.booksService.sendAuthor(params).subscribe(
      (data) => {
        this.toastr.success('Autor adicionado com sucesso');
        this.route.navigate(["/authors"])
        console.log(data);
      },
      (error) => {
        this.toastr.error('Erro ao adicionar Autor');
        console.log(error);
      }
    );
  }

}
