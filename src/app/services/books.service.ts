import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HelperService } from '../_helpers/helper.service';

@Injectable()
export class BooksService {
  constructor(private helper: HelperService) {}

  sendBook(book): any {
    const url = environment.apiBooks + `/books/`;
    return this.helper.httpPost(url, book);
  }

  getAllBooks(): any {
    const url = environment.apiBooks + `/books/`;
    return this.helper.httpGet(url);
  }

  deleteBook(bookId): any {
    const url = environment.apiBooks + `/books/${bookId}`;
    return this.helper.httpDelete(url);
  }

  editBook(bookId): any {
    const url = environment.apiBooks + `/books/${bookId}`;
    return this.helper.httpPut(url, bookId);
  }

  sendAuthor(author): any {
    const url = environment.apiBooks + `/authors`;
    return this.helper.httpPost(url, author);
  }

  getAllAuthors(): any {
    const url = environment.apiBooks + `/authors`;
    return this.helper.httpGet(url);
  }

  deleteAuthor(authorId): any {
    const url = environment.apiBooks + `/authors/${authorId}`;
    return this.helper.httpDelete(url);
  }

  editAuthor(authorId): any {
    const url = environment.apiBooks + `/authors/${authorId}`;
    return this.helper.httpPut(url, authorId);
  }

  sendEditor(editor): any {
    const url = environment.apiBooks + `/editors`;
    return this.helper.httpPost(url, editor);
  }

  getAllEditors(): any {
    const url = environment.apiBooks + `/editors`;
    return this.helper.httpGet(url);
  }

  deleteEditor(editorId): any {
    const url = environment.apiBooks + `/editors/${editorId}`;
    return this.helper.httpDelete(url);
  }

  editEditor(editorId): any {
    const url = environment.apiBooks + `/editors/${editorId}`;
    return this.helper.httpPut(url, editorId);
  }

}
