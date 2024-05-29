import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id'); // bookId
    const prefixedBookId = `OL${bookId}W`;
    // console.log('work ID from route: ', workId); // debug
    console.log('book id:', prefixedBookId); // debug
    if (prefixedBookId) { // bookId
      this.bookService.getBookDetails(prefixedBookId).subscribe( // bookId
        (data: IBookDetails) => {
          console.log('Book Details:', data); // debug 
          this.book = data;
          this.authorNames = this.book.authors?.map(author => author.name).join(', ') || 'Unknown';
        },
        error => {
          console.error('Error fetching book details:', error); 
        }
      );
    }
  }
  getAuthorNames(): string {
    return this.book?.authors?.map(author => author.name).join(', ') ||  'unknown';
  }
  
}
