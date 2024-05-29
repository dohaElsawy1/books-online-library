import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/nav-bar/navbar/navbar.component';
import { FavoritesComponent } from './components/favorites/favorites/favorites.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HomeComponent } from './components/home/home/home.component';
import { BooksComponent } from './components/books/books/books.component';
import { FormsModule } from '@angular/forms';
import { BookDetailsComponent } from './components/bookDetails/book-details/book-details.component';
import { AuthordetailsComponent } from './components/authordetails/authordetails/authordetails.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FavoritesComponent,
    FooterComponent,
    HomeComponent,
    BooksComponent,
    BookDetailsComponent,
    AuthordetailsComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
