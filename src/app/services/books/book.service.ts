import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { IBookDetails, Author } from 'src/app/models/ibookdetails';
import { map, mergeMap } from 'rxjs';

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
  // getBookDetails(bookId: string): Observable<any> {
  //   // const prefixedBookId = `OL${bookId}W`;
  //   return this.http.get<IBookDetails>(`${this.url}/works/${bookId}.json`);
  //   // return this.http.get<any>(`${this.API_URL}/works/${workId}.json`);

  // }

  getBookDetails(key: string): Observable<IBookDetails> {
    return this.http.get<IBookDetails>(`${this.url}/works/${key}.json`).pipe(
      mergeMap((book: IBookDetails) => {
        const authorObservables = book.authors.map(authorEntry =>
          this.http.get<Author>(`${this.url}${authorEntry.author.key}.json`)
        );
        return forkJoin(authorObservables).pipe(
          map((authors: Author[]) => {
            book.authors = book.authors.map(authorEntry => {
              const author = authors.find(a => a.key === authorEntry.author.key);
              return {
                ...authorEntry,
                name: author?.name || 'Unknown'
              };
            });
            return book;
          })
        );
      })
    );
  }








  
  // getBookBySearchName(searchValue: string): Observable<any> {
  //   return this.http.get<any>(`${this.url}/search.json?q=${searchValue}`)
  // }
  searchBooks(searchKey: string, searchQuery: string): Observable<any> {
    const searchUrl = `${this.url}/search.json?${searchKey}=${encodeURIComponent(searchQuery)}`;
    return this.http.get<any>(searchUrl);
  }
}
