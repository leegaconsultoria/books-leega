import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HelperService } from '../_helpers/helper.service';

@Injectable()
export class BooksService {
  constructor(private http: Http, private helper: HelperService) {}

  sendBook(book): any {
    const url = environment.apiBooks + `/authors`;
    return this.helper.httpPost(url, book);
  }

  getAllBooks(): any {
    const url = environment.apiBooks + `/authors`;
    return this.helper.httpGet(url);
  }

  deleteBook(bookId): any {
    const url = environment.apiBooks + `/authors`;
    return this.helper.httpPut(url, bookId);
  }

}
