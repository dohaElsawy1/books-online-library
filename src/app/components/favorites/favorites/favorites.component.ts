import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookDetails } from 'src/app/models/ibookdetails';
import { IBooks } from 'src/app/models/ibooks';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  // wishlist: any;
  defaultCover = 'assets/default-cover.png';
  book: any;
  wishlist: IBookDetails[] = [] ;
  // wishlist$: Observable<IBookDetails[]>;


  constructor(private favoritesService: FavoritesService) {
    // this.wishlist$ = this.favoritesService.getFavorites();
   }
  
  ngOnInit(): void {
    this.loadWishlist();
    // this.wishlist$ = this.favoritesService.wishlist$;

  }

  loadWishlist(): void {
    this.wishlist = this.favoritesService.getFavorites();
    // this.wishlist$.subscribe(wishlist => {
    //   this.wishlist = wishlist;
    // });
    
  }

  removeFromFavorites(book: IBookDetails): void {
    if (confirm(`Are you sure you want to remove "${book.title}" from your wishlist?`)) {
      this.favoritesService.removeFromFavorites(book);
      this.loadWishlist();
    }
  }


  
}
