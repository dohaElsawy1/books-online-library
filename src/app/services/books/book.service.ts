import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private API_URL = 'https://openlibrary.org/subjects/finance.json?limit=9';
  constructor( private http:HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }
  getBookDetails(bookId: string): Observable<any> {
    const prefixedBookId = `OL${bookId}W`;
    return this.http.get<any>(`${this.API_URL}/works/${prefixedBookId}.json`);
    // return this.http.get<any>(`${this.API_URL}/works/${workId}.json`);

  }

}
