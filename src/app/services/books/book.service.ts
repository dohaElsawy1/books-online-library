import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBookDetails } from 'src/app/models/ibookdetails';

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
    return this.http.get<IBookDetails>(`${this.url}/works/${bookId}.json`);
    // return this.http.get<any>(`${this.API_URL}/works/${workId}.json`);

  }
  // getBookBySearchName(searchValue: string): Observable<any> {
  //   return this.http.get<any>(`${this.url}/search.json?q=${searchValue}`)
  // }
  searchBooks(searchKey: string, searchQuery: string): Observable<any> {
    const searchUrl = `${this.url}/search.json?${searchKey}=${encodeURIComponent(searchQuery)}`;
    return this.http.get<any>(searchUrl);
  }
}
