import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  searchQuery: string = '';
  searchKey: string = 'title';
  isSearch: boolean = false;
  // totalItems: number = 0;
  // searchTerm: string = ''; 

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
  this.getBooks();
  }
getBooks(): void{
  this.bookService.getBooks().subscribe((data: any) => {
    // this.books = data.works.slice(0,9);
    this.books = data.works.slice(0, 9).map((book: IBooks) => ({
      ...book,
      authorNames: book.authors.map((author: Author) => author.name).join(', ')
    }));
  });
}


  viewDetails(bookId: number): void {
    // this.router.navigate(['/book', bookId]); 
    this.router.navigate(['/book', bookId], { queryParams: { bookId: bookId }})
  }


  

  searchBooks(): void {
    if (this.searchQuery.trim()) {
      this.bookService.searchBooks(this.searchKey, this.searchQuery).subscribe({
        next: (data: any) => {
          this.isSearch = true;
          this.books = data.docs.slice(0, 9).map((book: IBooks) => ({
            ...book,
            authorNames: book.authors ? book.authors.map((author) => author.name).join(', ') : 'Unknown Author'
          }));
        },
        error: (error: any) => {
          console.error('Error fetching search results:', error);
        }
      });
    } else {
      console.error('Search query cannot be empty');
    }
  }



 
}
