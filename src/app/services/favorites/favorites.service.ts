import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import { IBookDetails } from 'src/app/models/ibookdetails';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private wishlist: IBookDetails[] = [];
  private readonly STORAGE_KEY = 'wishlist';
  // private wishlistSubject: BehaviorSubject<IBookDetails[]> = new BehaviorSubject<IBookDetails[]>(this.wishlist);

  constructor() {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    const storedWishlist = localStorage.getItem(this.STORAGE_KEY);
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  }

  private saveWishlist(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.wishlist));
  }

  
  getFavorites(): IBookDetails[] {
    return this.wishlist;
  }

  addToFavorites(book: IBookDetails): void {
    const index = this.wishlist.findIndex(b => b.key === book.key);
    if (index === -1) {
      this.wishlist.push(book); 
      console.log('Book added:', book);
      console.log('Updated wishlist:', this.wishlist);
      // this.wishlistSubject.next(this.wishlist); // notify subscribers
    }
    // this.wishlist.push(book);
    // this.wishlistSubject.next(this.wishlist);
  }



  removeFromFavorites(book: IBookDetails): void {
    this.wishlist = this.wishlist.filter(b => b.key !== book.key);
    // this.wishlistSubject.next(this.wishlist); // Notify subscribers

  }




  isBookInFavorites(book: IBookDetails): boolean {
    return this.wishlist.some(b => b.key === book.key);
  }



}
