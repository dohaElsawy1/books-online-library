import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from 'src/app/models/iauthor';
import { expand, map, reduce, catchError, tap, takeWhile } from 'rxjs/operators';
// import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url = 'https://openlibrary.org';
  constructor(private http: HttpClient) { }

  getAuthorDetails(authorKey: string): Observable<Author> {
    // return this.http.get<Author>(`${this.url}/authors/${authorKey}.json`);
    // console.log('Fetching author details for key:', authorKey); // debug
    return this.http.get<Author>(`${this.url}/authors/${authorKey}.json`).pipe(
      // tap(author => console.log('Author details response:', author)), // debug
      catchError(error => {
        console.error('Error fetching author details:', error);
        throw error;
      })
    );
  }

  // getAuthorWorksCount(authorKey: string): Observable<Author> {
  //   return this.http.get<Author>(`${this.url}/authors/${authorKey}/works.json`);
  // }
  
  getAuthorWorksCount(authorKey: string): Observable<number> {

    const initialUrl = `${this.url}/authors/${authorKey}/works.json?limit=1000`; 

    return this.http.get<any>(initialUrl).pipe(
    // tap(response => console.log('Initial works response:', response)), // debug
    map(response => response ? response.size : 0), 
    tap({
      // next: totalCount => console.log('Total works count:', totalCount), // debug
      // complete: () => console.log('Total works count logging completed') // debug
    }),
    catchError(error => {
      console.error('Error fetching author works:', error);
      return of(0);
    })
  );
  }
  getAuthorSubjects(authorName: string): Observable<string[]> {
    const apiUrl = `${this.url}/search/authors.json?q=${encodeURIComponent(authorName)}`;
    console.log('Author subjects API URL:', apiUrl); // debug

    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        const docs = response.docs;
        if (docs && docs.length > 0) {
          const firstAuthor = docs[0];
          return firstAuthor.top_work ? firstAuthor.top_work.subject : [];
        } else {
          return [];
        }
      })
    );
  }

}
