import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-editor-register',
  templateUrl: './editor-register.component.html',
  styleUrls: ['./editor-register.component.scss']
})
export class EditorRegisterComponent implements OnInit {
  editorForm

  constructor(private formBuilder: FormBuilder, private booksService: BooksService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.editorForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  editorRegister() {
    const params = {
      name: this.editorForm.value.name,
    };
    console.log('params', params)
    this.booksService.sendEditor(params).subscribe(
      (data) => {
        this.toastr.success('Autor adicionado com sucesso');
        this.route.navigate(["/editors"])
        console.log(data);
      },
      (error) => {
        this.toastr.error('Erro ao adicionar editor');
        console.log(error);
      }
    );
  }

}
