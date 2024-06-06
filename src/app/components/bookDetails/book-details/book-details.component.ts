import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/books/book.service';
import { IBookDetails } from 'src/app/models/ibookdetails';
import { Author } from 'src/app/models/ibooks';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  // book: IBookDetails | undefined;
  // authorNames: string = '';
  defaultCover = 'assets/default-cover.png';
  book: any;

  constructor(private route: ActivatedRoute, private bookService: BookService, private favoritesService: FavoritesService, private toastr: ToastrService) { }


  ngOnInit(): void {
  //   const bookId = this.route.snapshot.paramMap.get('id'); // bookId
  //   // console.log(bookId); //debug
  //   // const prefixedBookId = `OL${bookId}W`;
  //   // console.log('work ID from route: ', workId); // debug
  //   console.log('book id:', bookId); // debug
  //   if (bookId) { // bookId
  //     this.bookService.getBookDetails(bookId).subscribe( // bookId
  //       (data: IBookDetails) => {
  //         console.log('Book Details:', data); // debug 
  //         this.book = data;
  //         this.authorNames = this.book.authors?.map(author => author.name).join(', ') || 'Unknown';
  //       },
  //       error => {
  //         console.error('Error fetching book details:', error); 
  //       }
  //     );
  //   }
  // }
  // getAuthorNames(): string {
  //   return this.book?.authors?.map(author => author.name).join(', ') ||  'unknown';
  // }
  const bookId = this.route.snapshot.paramMap.get('id');
  console.log('book id:',bookId); // debug
    if (bookId) {
      this.bookService.getBookDetails(bookId).subscribe({
        next: (book: any) => {
          console.log('book: ',book);
          this.book = book;
        },
        error: (error: any) => {
          console.error('Error fetching book details:', error);
        }
      });
    }
  }
  getFirstPublishYear(book: any): number | string {
    if (book.first_publish_year) {
      return book.first_publish_year;
    }
    if (book.created) {
      return new Date(book.created.value).getFullYear();
    }
    return 'Unknown';
  }

  addToFavorites(): void {
    if (this.book) {
      this.favoritesService.addToFavorites(this.book);
      this.toastr.success('Book added to wishlist!');
    }
  }

  removeFromFavorites(): void {
    if (this.book) {
      this.favoritesService.removeFromFavorites(this.book);
      this.toastr.success('Book removed from wishlist!');
    }
  }

  isBookInFavorites(): boolean {
    return this.book ? this.favoritesService.isBookInFavorites(this.book) : false;
  }

}
