import { Component, OnInit } from '@angular/core';
import { Author, IBooks } from 'src/app/models/ibooks';
import { BookService } from 'src/app/services/books/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  books: any[] = [];
  defaultCover = 'assets/default-cover.png';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: any) => {
      // this.books = data.works.slice(0,9);
      this.books = data.works.slice(0, 9).map((book: IBooks) => ({
        ...book,
        authorNames: book.authors.map((author: Author) => author.name).join(', ')
      }));
    });
  }

}
