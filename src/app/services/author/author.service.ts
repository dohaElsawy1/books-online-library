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
    // console.log('Fetching author details for key:', authorKey); // Debugging line
    return this.http.get<Author>(`${this.url}/authors/${authorKey}.json`).pipe(
      // tap(author => console.log('Author details response:', author)), // Debugging line
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

    const initialUrl = `${this.url}/authors/${authorKey}/works.json?limit=1000`; // Fetch all works

    return this.http.get<any>(initialUrl).pipe(
    // tap(response => console.log('Initial works response:', response)), // Debugging line
    map(response => response ? response.size : 0), // Extract size from initial response
    tap({
      // next: totalCount => console.log('Total works count:', totalCount), // Debug total count
      // complete: () => console.log('Total works count logging completed') // Debug completion
    }),
    catchError(error => {
      console.error('Error fetching author works:', error);
      return of(0);
    })
  );
  }
  getAuthorSubjects(authorName: string): Observable<string[]> {
    const apiUrl = `${this.url}/search/authors.json?q=${encodeURIComponent(authorName)}`;
    console.log('Author subjects API URL:', apiUrl); // Log the constructed URL

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
