import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models/iauthor';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url = 'https://openlibrary.org';
  constructor(private http: HttpClient) { }

  getAuthorDetails(authorKey: string): Observable<Author> {
    return this.http.get<Author>(`${this.url}/authors/${authorKey}.json`);
  }

}
