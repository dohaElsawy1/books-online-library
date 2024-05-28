import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/books/book.service';
import { IBookDetails } from 'src/app/models/ibookdetails';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  book: IBookDetails | undefined;
  authorNames: string = '';

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  nngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookDetails(bookId).subscribe((data: IBookDetails) => {
        this.book = data;
        if (this.book.authors) {
          this.authorNames = this.book.authors.map(author => author.name).join(', ');
        }
      });
    }
  }
}
