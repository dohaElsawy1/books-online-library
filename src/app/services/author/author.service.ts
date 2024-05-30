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
    console.log('Fetching author details for key:', authorKey); // Debugging line
    return this.http.get<Author>(`${this.url}/authors/${authorKey}.json`).pipe(
      tap(author => console.log('Author details response:', author)), // Debugging line
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
    // const limit = 50;
    // const initialUrl = `${this.url}/authors/${authorKey}/works.json?limit=${limit}`;

    // return this.http.get<any>(initialUrl).pipe(
    //   tap(response => console.log('Initial works response:', response)), // Debugging line
    //   expand(response => {
    //     const nextOffset = (response.offset || 0) + response.entries.length;
    //     return nextOffset < response.size
    //       ? this.http.get<any>(`${this.url}/authors/${authorKey}/works.json?limit=${limit}&offset=${nextOffset}`)
    //       : of(null);
    //   }),
    //   takeWhile(response => response !== null),
    //   map(response => response ? response.size : 0), // Extract size instead of length of entries
    //   reduce((acc, size) => acc + size, 0), // Accumulate sizes instead of counts
    //   tap({
    //     next: totalCount => console.log('Total works count:', totalCount), // Debug total count
    //     complete: () => console.log('Total works count logging completed') // Debug completion
    //   }),
    //   catchError(error => {
    //     console.error('Error fetching author works:', error);
    //     return of(0);
    //   })
    // );
    const initialUrl = `${this.url}/authors/${authorKey}/works.json?limit=1000`; // Fetch all works

  return this.http.get<any>(initialUrl).pipe(
    tap(response => console.log('Initial works response:', response)), // Debugging line
    map(response => response ? response.size : 0), // Extract size from initial response
    tap({
      next: totalCount => console.log('Total works count:', totalCount), // Debug total count
      complete: () => console.log('Total works count logging completed') // Debug completion
    }),
    catchError(error => {
      console.error('Error fetching author works:', error);
      return of(0);
    })
  );
  }

}
