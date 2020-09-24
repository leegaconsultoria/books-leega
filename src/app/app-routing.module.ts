import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthorRegisterComponent } from './views/author-register/author-register.component';
import { AuthorsComponent } from './views/authors/authors.component';
import { BooksRegisterComponent } from './views/books-register/books-register.component';
import { BooksComponent } from './views/books/books.component';
import { EditorRegisterComponent } from './views/editor-register/editor-register.component';
import { EditorsComponent } from './views/editors/editors.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent,
    children: [
      { path: 'books', component: BooksComponent },
      { path: 'books-register', component: BooksRegisterComponent },
      { path: 'authors', component: AuthorsComponent },
      { path: 'editors', component: EditorsComponent },
      { path: 'author-register', component: AuthorRegisterComponent },
      { path: 'editor-register', component: EditorRegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
