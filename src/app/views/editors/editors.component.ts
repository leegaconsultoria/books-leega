import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss']
})
export class EditorsComponent implements OnInit {
  editors = []
  dtOptions: DataTables.Settings = {};
  editorName
  editorId

  constructor(private booksService: BooksService, private toastr: ToastrService, private route: Router) { }

  ngOnInit(): void {
    this.loadingEditors();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language: {
        emptyTable: "Nenhum registro encontrado",
        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 até 0 de 0 registros",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        infoPostFix: "",
        lengthMenu: "_MENU_ resultados por página",
        loadingRecords: "Carregando...",
        processing: "Processando...",
        zeroRecords: "Nenhum registro encontrado",
        search: "Pesquisar",
        paginate: {
          next: "Próximo",
          previous: "Anterior",
          first: "Primeiro",
          last: "Último"
        },
        aria: {
          sortAscending: ": Ordenar colunas de forma ascendente",
          sortDescending: ": Ordenar colunas de forma descendente"
        }
      }
    };
  
  }

  loadingEditors(): any {
    this.booksService.getAllEditors().subscribe(
      data => {
        this.editors = data.data.editors;
        console.log('editors', data)
      },
      (error) => {
        this.toastr.error('Erro ao carregar autores');
        console.log('error', error);
      }
    );
  }

  deleteEditor(editorId): any {
    this.booksService.deleteEditor(editorId).subscribe(
      (data) => {
        this.toastr.success('Editor removido com sucesso');
        console.log(data);
        this.loadingEditors()
      },
      (error) => {
        this.toastr.error('Erro ao remover Editor');
        console.log(error);
      }
    );
  }

  getEditor(editor): any {
    this.editorName = editor.name;
    this.editorId = editor.id
  }

  editEditor() {
    this.booksService.editEditor(this.editorId, this.editorName).subscribe(
      data => {
        this.toastr.success('Editado com sucesso');
        this.loadingEditors();
      }, error => {
        this.toastr.error('Erro ao editar');
      }
    )
  }

}
