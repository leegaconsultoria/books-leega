import { Injectable } from '@angular/core';
import {  Headers,  Response, RequestOptions, Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HelperService {
    teste;
    constructor(private http: Http) { }

    public httpPost(url, body): any{
        const res = this.http.post(url, body)
            .pipe(map((response: Response) => {
                return response.json();
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                   console.log(err);
                } else {
                  return throwError(err);
                }
            }));

        return res;
    }

    public httpGet(url): any{
        const res = this.http.get(url)
            .pipe(map((response: Response) => {
                return response.json();
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                   console.log(err);
                } else {
                  return throwError(err);
                }
            }));

        return res;
    }

    public httpPut(url, body): any{
        const res = this.http.put(url, body)
            .pipe(map((response: Response) => {
                return response.json();
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                   console.log(err);
                } else {
                  return throwError(err);
                }
            }));

        return res;
    }

    public httpDelete(url): any{
        const res = this.http.delete(url)
            .pipe(map((response: Response) => {
                return response.json();
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                   console.log(err);
                } else {
                  return throwError(err);
                }
            }));

        return res;
    }
}
