import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors = []
  dtOptions: DataTables.Settings = {};
  editAuthorData
  authorId
  authorName
  authorCPF


  constructor(private booksService: BooksService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadingAuthors()
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

  loadingAuthors(): any {
    this.booksService.getAllAuthors().subscribe(
      data => {
        this.authors = data.data.authors;
        console.log('data', data)
      },
      (error) => {
        this.toastr.error('Erro ao carregar autores');
        console.log('error', error);
      }
    );
  }

  deleteAuthor(authorId): any {
    this.booksService.deleteAuthor(authorId).subscribe(
      (data) => {
        this.toastr.success('Autor removido com sucesso');
        console.log(data);
        this.loadingAuthors()
      },
      (error) => {
        this.toastr.error('Erro ao remover autor');
        console.log(error);
      }
    );
  }

  getAuthor(author): any {
    this.authorName = author.name
    this.authorCPF = author.cpf
    this.editAuthorData = {
      name:  this.authorName,
      cpf: this.authorCPF
    }
    this.authorId = author.id
  }

  editAuthor() {
    this.booksService.editAuthor(this.authorId, {name: this.authorName, cpf: this.authorCPF}).subscribe(
      data => {
        console.log(this.authorName)
        console.log(this.authorCPF)
        console.log(this.editAuthorData)
        this.toastr.success('Editado com sucesso');
        this.loadingAuthors();
      }, error => {
        console.log("errorauthor", error)
        this.toastr.error('Erro ao editar');
      }
    )
  }

}
