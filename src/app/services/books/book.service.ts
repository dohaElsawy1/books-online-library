import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  // private API_URL = 'https://openlibrary.org/subjects/finance.json?limit=9';
  private url = 'https://openlibrary.org';
  constructor( private http:HttpClient) { }

  getBooks(): Observable<any> {
    // return this.http.get<any>(this.API_URL);
    return this.http.get<any>(`${this.url}/subjects/finance.json?limit=9`);
  }
  getBookDetails(bookId: string): Observable<any> {
    // const prefixedBookId = `OL${bookId}W`;
    return this.http.get<any>(`${this.url}/works/${bookId}.json`);
    // return this.http.get<any>(`${this.API_URL}/works/${workId}.json`);

  }

}
